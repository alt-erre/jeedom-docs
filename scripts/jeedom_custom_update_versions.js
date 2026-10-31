/**
 * Personnalisation avancée Jeedom 4.4 / 4.5 / 4.6 (custom.js)
 * Affichage dynamique des versions SemVer pour les plugins alt-erre dans le Centre de mise à jour
 * À coller dans : Système -> Personnalisation avancée -> Desktop (custom.js) -> Activer
 *
 * Fonctionnement (compatible avec le .htaccess et la Content-Security-Policy de Jeedom 4.6) :
 * - Interroge en local (same-origin PHP) : plugins/<pluginId>/plugin_info/configuration.php?alt_versions_manifest=1
 *   qui lit sur le disque de votre Jeedom les fichiers info.json de tous les plugins alt* installés ("local")
 *   et récupère côté serveur (via PHP cURL) le manifeste public jeedom-docs/versions.json ("remote").
 * - Inclut un repli initial pour l'affichage immédiat avant la première mise à jour des plugins.
 */
(function () {
  'use strict';

  // Repli initial uniquement tant qu'aucun plugin n'a encore reçu l'endpoint PHP alt_versions_manifest
  var FALLBACK_LOCAL = {
    '61753dd': '0.1.0-beta.7', 'ff78bb0': '0.1.0-beta.11', 'dad3df9': '0.1.0-beta.5',
    '51ec9d7': '0.1.0-beta.6', 'cdd7b1e': '0.1.0-beta.4', '4369555': '0.1.0-beta.5',
    '3d5c851': '0.1.0-beta.2', 'da50879': '0.1.0-beta.5', '150cb5d': '0.1.0-beta.1',
    '2616ebc': '0.1.0-beta.2', '333b3cd': '0.1.0-beta.6', 'e16d6bc': '0.1.0-beta.2',
    '0f08f89': '0.1.0-beta.16', '0f357d3': '0.1.0-beta.11', '03a7774': '0.1.0-beta.4',
    'b5bcefb': '0.1.0-beta.6', '4f10fe5': '0.1.0-beta.14', 'd41f292': '0.1.0-beta.2',
    '47be630': '0.1.0-beta.16', '3b17a6a': '0.1.0-beta.8', '30a358f': '0.1.0-beta.2',
    'f997903': '0.1.0-beta.2'
  };
  var FALLBACK_REMOTE = {
    'altairmedia': '0.1.0-beta.8', 'altarlo': '0.1.0-beta.12', 'altbambulab': '0.1.0-beta.6',
    'altcambridgeaudio': '0.1.0-beta.7', 'altcellular': '0.1.0-beta.1', 'altdenon': '0.1.0-beta.5',
    'alteducartable': '0.1.0-beta.6', 'althue': '0.1.0-beta.3', 'altios': '0.1.0-beta.2',
    'altjvcprojector': '0.1.0-beta.6', 'altnetguard': '0.1.0-beta.2', 'altnuki': '0.1.0-beta.2',
    'altplaystation': '0.1.0-beta.3', 'altpronote': '0.1.0-beta.7', 'altroborock': '0.1.0-beta.3',
    'altsamsungtv': '0.1.0-beta.17', 'altsiemens': '0.1.0-beta.12', 'altsonos': '0.1.0-beta.5',
    'altswitch': '0.1.0-beta.7', 'alttvdashboard': '0.1.0-beta.15', 'alttwinkly': '0.1.0-beta.3',
    'alttydom': '0.1.0-beta.17', 'altxbox': '0.1.0-beta.9'
  };

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

      var localVer = dynamicLocalMap[key]
        || FALLBACK_LOCAL[shortLocal]
        || (shortLocal === shortRemote ? (dynamicRemoteMap[key] || FALLBACK_REMOTE[key]) : '')
        || '';

      var remoteVer = (shortRemote === shortLocal && localVer)
        ? localVer
        : (dynamicRemoteMap[key] || FALLBACK_REMOTE[key] || '');

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
