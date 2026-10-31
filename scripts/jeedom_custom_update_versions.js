/**
 * Personnalisation avancée Jeedom 4.4 / 4.5 / 4.6 (custom.js)
 * Affichage 100 % dynamique des versions SemVer pour les plugins alt-erre dans le Centre de mise à jour
 * À coller dans : Système -> Personnalisation avancée -> Desktop (custom.js) -> Activer
 *
 * Zéro nom de plugin, zéro version et zéro hash codés en dur :
 * - Interroge en local (same-origin PHP) : plugins/<pluginId>/plugin_info/configuration.php?alt_versions_manifest=1
 * - PHP lit dynamiquement sur le disque de votre Jeedom tous les fichiers plugins/alt*/plugin_info/info.json ("local")
 *   et récupère côté serveur (via PHP cURL) le manifeste public jeedom-docs/versions.json ("remote").
 */
(function () {
  'use strict';

  var dynamicLocalMap = {};
  var dynamicRemoteMap = {};
  var lastProbeTs = 0;
  var lastShaSignature = '';

  function probeServerManifest(pluginIds) {
    var now = Date.now();
    if (now - lastProbeTs < 15000 || !pluginIds.length) {
      return;
    }
    lastProbeTs = now;

    var idx = 0;
    function tryNext() {
      if (idx >= pluginIds.length) return;
      var pid = pluginIds[idx++];
      var url = 'plugins/' + pid + '/plugin_info/configuration.php?alt_versions_manifest=1&_=' + now;
      fetch(url, { cache: 'no-store', credentials: 'same-origin' })
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (txt) {
          if (!txt || txt.trim().indexOf('{') !== 0) {
            tryNext();
            return;
          }
          var data = JSON.parse(txt);
          if (data && data.state === 'ok') {
            if (data.local && typeof data.local === 'object') {
              dynamicLocalMap = data.local;
            }
            if (data.remote && typeof data.remote === 'object') {
              dynamicRemoteMap = data.remote;
            }
            enhanceUpdateTable(true);
          } else {
            tryNext();
          }
        })
        .catch(function () {
          tryNext();
        });
    }
    tryNext();
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

  function enhanceUpdateTable(skipProbe) {
    var table = document.getElementById('table_update');
    if (!table) return;

    var rows = table.querySelectorAll('tbody tr');
    var pluginIds = [];
    var sigParts = [];

    rows.forEach(function (tr) {
      var pluginId = extractPluginIdFromRow(tr);
      if (!pluginId || pluginId.indexOf('alt') !== 0) return;
      pluginIds.push(pluginId);

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

      sigParts.push(pluginId + ':' + shortLocal + ':' + shortRemote);
      var key = pluginId.toLowerCase();

      var localVer = dynamicLocalMap[key] || '';
      var remoteVer = (shortRemote === shortLocal && localVer)
        ? localVer
        : (dynamicRemoteMap[key] || '');

      if (shortLocal) {
        renderSemVerBadge(tds[2], localVer, shortLocal, rawLocal);
      }
      if (shortRemote) {
        renderSemVerBadge(tds[3], remoteVer, shortRemote, rawRemote);
      }
    });

    var newSig = sigParts.join('|');
    if (newSig !== lastShaSignature) {
      lastShaSignature = newSig;
      lastProbeTs = 0;
    }
    if (!skipProbe && pluginIds.length) {
      probeServerManifest(pluginIds);
    }
  }

  setInterval(function () { enhanceUpdateTable(false); }, 600);
  document.addEventListener('DOMContentLoaded', function () { enhanceUpdateTable(false); });
})();
