/**
 * Personnalisation avancée Jeedom (custom.js) — Affichage des versions SemVer pour les plugins alt-erre
 * À coller dans : Système -> Personnalisation avancée -> Desktop (custom.js) -> Activer
 *
 * Fonctionnement :
 * - Dans le Centre de mise à jour (p=update), remplace visuellement les hash Git SHA-1
 *   (ex: "61753ddd218175b0...") par la version SemVer lisible suivie du hash court :
 *   ex: "v0.1.0-beta.7 (61753dd)"
 * - Si une mise à jour est disponible (statut UPDATE), interroge le manifeste public
 *   jeedom-docs/versions.json pour afficher également le numéro SemVer de la nouvelle version.
 * - N'altère jamais la base de données Jeedom (la détection OK / UPDATE reste 100 % native).
 */
(function () {
  'use strict';

  var localVersionCache = {};
  var remoteVersionsPromise = null;

  function fetchLocalPluginVersion(pluginId) {
    if (localVersionCache[pluginId] !== undefined) {
      return Promise.resolve(localVersionCache[pluginId]);
    }
    return fetch('plugins/' + pluginId + '/plugin_info/info.json', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok && pluginId === 'altSamsungTV') {
          return fetch('plugins/altSamsungTv/plugin_info/info.json', { cache: 'no-store' });
        }
        return r;
      })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (info) {
        var ver = (info && info.pluginVersion) ? String(info.pluginVersion).trim() : '';
        localVersionCache[pluginId] = ver;
        return ver;
      })
      .catch(function () {
        localVersionCache[pluginId] = '';
        return '';
      });
  }

  function fetchRemoteCatalogVersions() {
    if (remoteVersionsPromise) {
      return remoteVersionsPromise;
    }
    remoteVersionsPromise = fetch('https://raw.githubusercontent.com/alt-erre/jeedom-docs/main/versions.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (map) {
        var normalized = {};
        if (map && typeof map === 'object') {
          Object.keys(map).forEach(function (k) {
            normalized[k.toLowerCase()] = String(map[k]).trim();
          });
        }
        return normalized;
      })
      .catch(function () { return {}; });
    return remoteVersionsPromise;
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
    var cells = tr.querySelectorAll('td');
    if (cells.length < 2) return '';
    var nameText = cells[1].textContent || '';
    var m = nameText.match(/\((alt[A-Za-z0-9_]+)\)/);
    return m ? m[1] : '';
  }

  function formatBadge(span, semver, shortSha, fullSha) {
    if (!span || !semver) return;
    var verLabel = semver.indexOf('v') === 0 ? semver : ('v' + semver);
    var display = shortSha ? (verLabel + ' (' + shortSha + ')') : verLabel;
    if (span.textContent !== display) {
      span.textContent = display;
    }
    if (fullSha) {
      span.setAttribute('title', 'Version ' + verLabel + ' — Commit : ' + fullSha);
    }
  }

  function enhanceUpdateTable() {
    var table = document.getElementById('table_update');
    if (!table) return;
    var rows = table.querySelectorAll('tbody tr');
    if (!rows.length) return;

    rows.forEach(function (tr) {
      var pluginId = extractPluginIdFromRow(tr);
      if (!pluginId || pluginId.indexOf('alt') !== 0) return;

      var tds = tr.querySelectorAll('td');
      if (tds.length < 4) return;

      var localSpan = tds[2].querySelector('span.label:not(.updateAttr)') || tds[2].querySelector('span:not(.updateAttr)');
      var remoteSpan = tds[3].querySelector('span.label:not(.updateAttr)') || tds[3].querySelector('span:not(.updateAttr)');
      if (!localSpan || !remoteSpan) return;

      var rawLocal = localSpan.getAttribute('data-alt-raw') || localSpan.getAttribute('title') || localSpan.textContent.trim();
      var rawRemote = remoteSpan.getAttribute('data-alt-raw') || remoteSpan.getAttribute('title') || remoteSpan.textContent.trim();

      var shortLocal = extractShortSha(rawLocal);
      var shortRemote = extractShortSha(rawRemote);
      if (!shortLocal && !shortRemote) return;

      localSpan.setAttribute('data-alt-raw', rawLocal);
      remoteSpan.setAttribute('data-alt-raw', rawRemote);

      fetchLocalPluginVersion(pluginId).then(function (localSemVer) {
        if (localSemVer && shortLocal) {
          formatBadge(localSpan, localSemVer, shortLocal, rawLocal);
        }
        if (shortRemote && shortLocal && shortRemote === shortLocal && localSemVer) {
          formatBadge(remoteSpan, localSemVer, shortRemote, rawRemote);
        } else if (shortRemote) {
          fetchRemoteCatalogVersions().then(function (remoteMap) {
            var remoteSemVer = remoteMap[pluginId.toLowerCase()] || '';
            if (remoteSemVer) {
              formatBadge(remoteSpan, remoteSemVer, shortRemote, rawRemote);
            }
          });
        }
      });
    });
  }

  var observer = null;
  function initUpdateObserver() {
    enhanceUpdateTable();
    var tbody = document.querySelector('#table_update tbody');
    if (tbody && !tbody.getAttribute('data-alt-observed')) {
      tbody.setAttribute('data-alt-observed', '1');
      if (observer) observer.disconnect();
      observer = new MutationObserver(function () {
        enhanceUpdateTable();
      });
      observer.observe(tbody, { childList: true, subtree: false });
    }
  }

  document.addEventListener('DOMContentLoaded', initUpdateObserver);
  if (window.jQuery) {
    window.jQuery(document).on('ajaxComplete', function () {
      setTimeout(initUpdateObserver, 80);
    });
  }
  setTimeout(initUpdateObserver, 300);
})();
