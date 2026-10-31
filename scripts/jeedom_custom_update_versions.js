/**
 * Personnalisation avancée Jeedom 4.4 / 4.5 / 4.6 (custom.js)
 * Affichage des versions SemVer pour les plugins alt-erre dans le Centre de mise à jour
 * À coller dans : Système -> Personnalisation avancée -> Desktop (custom.js) -> Activer
 */
(function () {
  'use strict';

  var COMMITS_MAP = {"6ddca5b":"0.1.0-beta.8","61753dd":"0.1.0-beta.7","bc44b01":"0.1.0-beta.6","94b76bd":"0.1.0-beta.5","1f9b1c2":"0.1.0-beta.4","a6adeb8":"0.1.0-beta.3","d8460b5":"0.1.0-beta.3","09c31c5":"0.1.0-beta.3","63a88c5":"0.1.0-beta.2","30e8940":"0.1.0-beta.1","e7de30d":"0.1.0-beta.12","ff78bb0":"0.1.0-beta.11","dfd8f61":"0.1.0-beta.10","21bae64":"0.1.0-beta.9","29bca03":"0.1.0-beta.8","b53c85b":"0.1.0-beta.7","2443056":"0.1.0-beta.6","7d1265b":"0.1.0-beta.5","c708024":"0.1.0-beta.4","25a2e72":"0.1.0-beta.3","c42b6d7":"0.1.0-beta.2","0941a3c":"0.1.0-beta.1","a799e5e":"0.1.0-beta.6","dad3df9":"0.1.0-beta.5","820ce47":"0.1.0-beta.4","a5c1d9c":"0.1.0-beta.3","7075d22":"0.1.0-beta.3","55391ac":"0.1.0-beta.2","b1c085f":"0.1.0-beta.1","412d2cb":"0.1.0-beta.7","51ec9d7":"0.1.0-beta.6","6acb7f2":"0.1.0-beta.5","a5e053f":"0.1.0-beta.4","205e00f":"0.1.0-beta.4","e8f04d4":"0.1.0-beta.4","088f0a1":"0.1.0-beta.3","b688ba8":"0.1.0-beta.2","5f8a047":"0.1.0-beta.1","39dc647":"0.1.0-beta.5","cdd7b1e":"0.1.0-beta.4","1856e23":"0.1.0-beta.3","234be4c":"0.1.0-beta.2","d21c3b9":"0.1.0-beta.1","7739473":"0.1.0-beta.1","136a313":"0.1.0-beta.1","a834b00":"0.1.0-beta.6","4369555":"0.1.0-beta.5","9d86e0b":"0.1.0-beta.4","22f15c4":"0.1.0-beta.3","d9533f5":"0.1.0-beta.2","511f909":"0.1.0-beta.1","5e1e9fd":"0.1.0-beta.3","3d5c851":"0.1.0-beta.2","7eb350f":"0.1.0-beta.1","30a368f":"0.1.0-beta.2","a4f5715":"0.1.0-beta.1","d3784e6":"0.1.0-beta.6","da50879":"0.1.0-beta.5","b6e44d3":"0.1.0-beta.4","2c95a1d":"0.1.0-beta.4","204b563":"0.1.0-beta.4","c5043ba":"0.1.0-beta.3","a0e6d71":"0.1.0-beta.2","c8d2ae8":"0.1.0-beta.1","ee5a5e3":"0.1.0-beta.2","137e9f6":"0.1.0-beta.1","de9d9a8":"0.1.0-beta.2","150cb5d":"0.1.0-beta.1","7c9fb71":"0.1.0-beta.3","2616ebc":"0.1.0-beta.2","3a732cd":"0.1.0-beta.1","ee8e625":"0.1.0-beta.1","4cf0dfd":"0.1.0-beta.7","333b3cd":"0.1.0-beta.6","bdb7302":"0.1.0-beta.5","3e37cd3":"0.1.0-beta.4","6664a82":"0.1.0-beta.3","b353adf":"0.1.0-beta.2","db09884":"0.1.0-beta.1","2df4121":"0.1.0-beta.3","e16d6bc":"0.1.0-beta.2","57fef57":"0.1.0-beta.1","bbd15f6":"0.1.0-beta.1","d414baa":"0.1.0-beta.1","bef1b69":"0.1.0-beta.17","0f08f89":"0.1.0-beta.16","2c5bca5":"0.1.0-beta.15","001eddf":"0.1.0-beta.14","74347b6":"0.1.0-beta.13","66d138b":"0.1.0-beta.13","dc68a71":"0.1.0-beta.13","6faeab2":"0.1.0-beta.13","c5b0f2b":"0.1.0-beta.12","81d365a":"0.1.0-beta.11","824259c":"0.1.0-beta.10","33613dd":"0.1.0-beta.9","47371e7":"0.1.0-beta.8","f8d44b9":"0.1.0-beta.7","a372da9":"0.1.0-beta.6","b37a713":"0.1.0-beta.5","b335e89":"0.1.0-beta.4","dec52ad":"0.1.0-beta.3","bea61a5":"0.1.0-beta.2","45ede8d":"0.1.0-beta.1","6b0d49c":"0.1.0-beta.12","0f357d3":"0.1.0-beta.11","eca85fc":"0.1.0-beta.10","89040a6":"0.1.0-beta.9","29e3053":"0.1.0-beta.8","6351500":"0.1.0-beta.7","26ae503":"0.1.0-beta.7","c5b81bb":"0.1.0-beta.7","0821567":"0.1.0-beta.7","87cea9d":"0.1.0-beta.6","9e299e6":"0.1.0-beta.5","98220ad":"0.1.0-beta.4","9c04632":"0.1.0-beta.3","7878ba1":"0.1.0-beta.2","c6c0c9d":"0.1.0-beta.1","667dd65":"0.1.0-beta.1","2234995":"0.1.0-beta.1","19efb0b":"0.1.0-beta.5","03a7774":"0.1.0-beta.4","80d2e35":"0.1.0-beta.3","018e78c":"0.1.0-beta.2","869779c":"0.1.0-beta.1","3b731d1":"0.1.0-beta.7","b5bcefb":"0.1.0-beta.6","c90f154":"0.1.0-beta.5","2ca51ae":"0.1.0-beta.4","068b5ad":"0.1.0-beta.3","c3cdc9e":"0.1.0-beta.2","6da199a":"0.1.0-beta.1","c810782":"0.1.0-beta.15","4f10fe5":"0.1.0-beta.14","72b3bbc":"0.1.0-beta.13","63302e7":"0.1.0-beta.12","ac98dce":"0.1.0-beta.11","5ba1f7b":"0.1.0-beta.10","a8f8939":"0.1.0-beta.9","c30e300":"0.1.0-beta.8","55e9035":"0.1.0-beta.7","aae98a5":"0.1.0-beta.6","de40f58":"0.1.0-beta.6","443f5dc":"0.1.0-beta.5","f48b334":"0.1.0-beta.4","0c6564f":"0.1.0-beta.3","dd1982a":"0.1.0-beta.2","9c8d7b2":"0.1.0-beta.1","a12eb6f":"0.1.0-beta.3","d41f292":"0.1.0-beta.2","3fd69a4":"0.1.0-beta.1","7f5aa13":"0.1.0-beta.17","47be630":"0.1.0-beta.16","5c9f14d":"0.1.0-beta.15","6d508a4":"0.1.0-beta.14","1d8c16a":"0.1.0-beta.13","c715720":"0.1.0-beta.12","3bb773e":"0.1.0-beta.11","c323c71":"0.1.0-beta.10","0527e70":"0.1.0-beta.9","635939a":"0.1.0-beta.8","3335155":"0.1.0-beta.7","5793190":"0.1.0-beta.6","dbf6777":"0.1.0-beta.5","a01239c":"0.1.0-beta.4","c15b7cd":"0.1.0-beta.3","ef0f18b":"0.1.0-beta.2","adc842e":"0.1.0-beta.1","341d320":"0.1.0-beta.9","3b17a6a":"0.1.0-beta.8","010292b":"0.1.0-beta.7","d4c1f98":"0.1.0-beta.6","30dc117":"0.1.0-beta.5","ed58cd4":"0.1.0-beta.4","7b2eb87":"0.1.0-beta.3","e9c3052":"0.1.0-beta.2","9dce8f7":"0.1.0-beta.1"};
  var LATEST_MAP = {"altairmedia":"0.1.0-beta.8","altarlo":"0.1.0-beta.12","altbambulab":"0.1.0-beta.6","altcambridgeaudio":"0.1.0-beta.7","altcellular":"0.1.0-beta.1","altdenon":"0.1.0-beta.5","alteducartable":"0.1.0-beta.6","althue":"0.1.0-beta.3","altios":"0.1.0-beta.2","altjvcprojector":"0.1.0-beta.6","altnetguard":"0.1.0-beta.2","altnuki":"0.1.0-beta.2","altplaystation":"0.1.0-beta.3","altpronote":"0.1.0-beta.7","altroborock":"0.1.0-beta.3","altsamsungtv":"0.1.0-beta.17","altsiemens":"0.1.0-beta.12","altsonos":"0.1.0-beta.5","altswitch":"0.1.0-beta.7","alttvdashboard":"0.1.0-beta.15","alttwinkly":"0.1.0-beta.3","alttydom":"0.1.0-beta.17","altxbox":"0.1.0-beta.9"};
  var remoteFetched = false;

  function refreshRemoteManifest() {
    if (remoteFetched) return;
    remoteFetched = true;
    fetch('https://raw.githubusercontent.com/alt-erre/jeedom-docs/main/versions.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || typeof data !== 'object') return;
        if (data._commits && typeof data._commits === 'object') {
          Object.keys(data._commits).forEach(function (sha) {
            COMMITS_MAP[sha.toLowerCase()] = String(data._commits[sha]).trim();
          });
        }
        Object.keys(data).forEach(function (k) {
          if (k.indexOf('_') !== 0 && typeof data[k] === 'string') {
            LATEST_MAP[k.toLowerCase()] = data[k].trim();
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
    refreshRemoteManifest();

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

      if (shortLocal) {
        var localVer = COMMITS_MAP[shortLocal] || (shortLocal === shortRemote ? LATEST_MAP[pluginId.toLowerCase()] : '') || '';
        renderSemVerBadge(tds[2], localVer, shortLocal, rawLocal);
      }
      if (shortRemote) {
        var remoteVer = COMMITS_MAP[shortRemote] || LATEST_MAP[pluginId.toLowerCase()] || '';
        renderSemVerBadge(tds[3], remoteVer, shortRemote, rawRemote);
      }
    });
  }

  setInterval(enhanceUpdateTable, 600);
  document.addEventListener('DOMContentLoaded', enhanceUpdateTable);
})();
