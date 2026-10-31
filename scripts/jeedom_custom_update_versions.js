/**
 * Personnalisation avancée Jeedom 4.4 / 4.5 / 4.6 (custom.js)
 * Affichage dynamique des versions SemVer pour les plugins alt-erre dans le Centre de mise à jour
 * À coller dans : Système -> Personnalisation avancée -> Desktop (custom.js) -> Activer
 *
 * Zéro hash codé en dur :
 * - "Version installée" : lit directement plugins/<pluginId>/plugin_info/info.json sur votre Jeedom.
 * - "Dernière version"  :
 *     * Si le commit distant = le commit installé (statut OK) : affiche la même version que l'installée.
 *     * Si une mise à jour est disponible (statut UPDATE) : interroge le manifeste public
 *       jeedom-docs/versions.json (indexé par nom de plugin, ex. "altAirMedia": "0.1.0-beta.8").
 */
(function () {
  'use strict';

  var localVersionCache = {};
  var remoteLatestMap = {};
  var remoteFetchedAt = 0;

  function fetchLocalPluginVersion(pluginId, shortLocalSha) {
    var cacheKey = pluginId + ':' + (shortLocalSha || '');
    if (localVersionCache[cacheKey] !== undefined) {
      return Promise.resolve(localVersionCache[cacheKey]);
    }
    var url = 'plugins/' + pluginId + '/plugin_info/info.json?v=' + encodeURIComponent(shortLocalSha || Date.now());
    return fetch(url, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok && pluginId === 'altSamsungTV') {
          return fetch('plugins/altSamsungTv/plugin_info/info.json?v=' + encodeURIComponent(shortLocalSha || Date.now()), { cache: 'no-store' });
        }
        return r;
      })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (info) {
        var ver = (info && info.pluginVersion) ? String(info.pluginVersion).trim() : '';
        localVersionCache[cacheKey] = ver;
        return ver;
      })
      .catch(function () {
        localVersionCache[cacheKey] = '';
        return '';
      });
  }

  function ensureRemoteManifest() {
    var now = Date.now();
    if (now - remoteFetchedAt < 60000) {
      return;
    }
    remoteFetchedAt = now;
    fetch('https://raw.githubusercontent.com/alt-erre/jeedom-docs/main/versions.json?t=' + now, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || typeof data !== 'object') return;
        Object.keys(data).forEach(function (k) {
          if (typeof data[k] === 'string') {
            remoteLatestMap[k.toLowerCase()] = data[k].trim();
          }
        });
        enhanceUpdateTable();
      })
      .catch(function () {});
  }

  function extractShortSha(rawText) {
    if (!rawText) return '';
    var clean = rawText.replace(/\.+$/, '').trim();
    if (/^[0-9a-f]{7,40}$/i.test(clean)) {
      return clean.substring(0, 7).toLowerCase();
    }
    return '';
  }

  function extractPluginIdFromRow(tr) {
    var logicalAttr = tr.getAttribute('data-logicalid') || '';
    if (/^alt[A-Za-z0-9_]+$/.test(logicalAttr)) {
      return logicalAttr;
    }
    var tds = tr.querySelectorAll('td');
    if (tds.length < 2) return '';
    var nameText = tds[1].textContent || '';
    var m = nameText.match(/\((alt[A-Za-z0-9_]+)\)/);
    return m ? m[1] : '';
  }

  function renderSemVerBadge(td, semver, shortSha, rawSha) {
    var origSpan = td.querySelector('.updateAttr') || td.querySelector('span.label:not(.alt-semver-badge)');
    if (!origSpan) return;
    var verLabel = semver ? (semver.indexOf('v') === 0 ? semver : ('v' + semver)) : '';
    var text = verLabel ? (verLabel + ' (' + shortSha + ')') : shortSha;
    var title = (verLabel ? ('Version ' + verLabel + ' — ') : '') + 'Commit : ' + rawSha;

    var badge = td.querySelector('.alt-semver-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'label label-primary alt-semver-badge';
      origSpan.style.display = 'none';
      origSpan.parentNode.insertBefore(badge, origSpan.nextSibling);
    }
    if (badge.textContent !== text) {
      badge.textContent = text;
    }
    badge.setAttribute('title', title);
  }

  function enhanceUpdateTable() {
    var table = document.getElementById('table_update');
    if (!table) return;
    ensureRemoteManifest();

    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function (tr) {
      var pluginId = extractPluginIdFromRow(tr);
      if (!pluginId || pluginId.indexOf('alt') !== 0) return;

      var tds = tr.querySelectorAll('td');
      if (tds.length < 4) return;

      var localOrig = tds[2].querySelector('.updateAttr') || tds[2].querySelector('span.label:not(.alt-semver-badge)');
      var remoteOrig = tds[3].querySelector('.updateAttr') || tds[3].querySelector('span.label:not(.alt-semver-badge)');
      if (!localOrig || !remoteOrig) return;

      var rawLocal = (localOrig.getAttribute('title') || localOrig.textContent || '').trim();
      var rawRemote = (remoteOrig.getAttribute('title') || remoteOrig.textContent || '').trim();
      var shortLocal = extractShortSha(rawLocal);
      var shortRemote = extractShortSha(rawRemote);

      if (!shortLocal && !shortRemote) return;

      fetchLocalPluginVersion(pluginId, shortLocal).then(function (localSemVer) {
        if (shortLocal) {
          renderSemVerBadge(tds[2], localSemVer, shortLocal, rawLocal);
        }
        if (shortRemote) {
          var remoteSemVer = (shortRemote === shortLocal && localSemVer)
            ? localSemVer
            : (remoteLatestMap[pluginId.toLowerCase()] || '');
          renderSemVerBadge(tds[3], remoteSemVer, shortRemote, rawRemote);
        }
      });
    });
  }

  setInterval(enhanceUpdateTable, 600);
  document.addEventListener('DOMContentLoaded', enhanceUpdateTable);
})();
