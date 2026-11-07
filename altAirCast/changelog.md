# Changelog - Alt Diffusion, Sons & Multiroom (AirPlay) (`altAirCast`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.

## [0.1.0-beta.23] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.22] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altAirCast.html`, `core/template/mobile/altAirCast.html`, `core/class/altAirCast.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.21] - 2026-11-05

### Corrigé & Optimisé
- **Suppression du rectangle gris clair derrière le curseur de volume sur les widgets Dashboard & Mobile (`core/template/dashboard/altAirCast.html`, `core/template/mobile/altAirCast.html`)** :
  - Ajout d'ancres `id="altAirCast_#id#"` / `id="altAirCast_mob_#id#"` et de sélecteurs `:is(#altAirCast_#id#, #div_mainContainer #altAirCast_#id#)` à spécificité `(2, 1, 0)` surpassant la règle globale de Jeedom Core 4.4-4.6 (`#div_mainContainer ... div.eqLogic-widget input:not([type=checkbox]):not([type=radio]):not(.dial) { background-color: var(--el-defaultColor) !important; }`) qui peignait un bloc rectangulaire gris clair de `22 px` sous la piste fine de `5 px`.
  - Normalisation complète WebKit/Safari et Firefox en blocs séparés avec `!important`, variables `--attr-min` / `--attr-max` / `--control-value`, calcul CSS `progress()` avec repli `@supports not (opacity: progress(1, 0, 100))` et support bidirectionnel `:dir(rtl)`.
- **Maintien continu des flux Webradio sans coupure au bout de quelques minutes (`resources/altaircastd.py`)** :
  - **Isolation stricte du protocole `RAOP` en diffusion audio (`_connect_speaker(..., for_raop_stream=True)`)** : désactive désormais `Protocol.AirPlay` (en plus de `Companion` et `MRP`, tout en conservant les identifiants d'appairage) lorsqu'un service `RAOP` est présent. Sur HomePod, `Protocol.AirPlay` ouvrait auparavant une seconde connexion TCP/HTTP inactive sur le port `7000` que le HomePod refermait pour inactivité après 2 à 4 minutes, entraînant la fermeture globale de la session `pyatv` et l'arrêt de la radio.
  - **Suppression du timeout global implicite de `300 s` (5 minutes) sur `aiohttp.ClientSession`** (`ClientTimeout(total=None, sock_connect=10)`) et gestion isolée de la session RTSP par `pyatv`.
  - **Rétro-pression événementielle (`LivePcmAudioSource.wait_writable`), garde-fou anti-gel (`-rw_timeout 10000000` + lecture bornée à `12 s`) et double reconnexion automatique amont/aval** : suspend proprement la lecture du tube `ffmpeg` dès `2,0 s` de tampon (reprise à `1,5 s`), relance jusqu'à `8` fois `ffmpeg` avec backoff progressif en cas de micro-coupure Internet, et reconnecte automatiquement la session RAOP d'une enceinte avec pré-tampon mémoire glissant (`recent_pcm`) si le HomePod réinitialise sa connexion RTSP en cours d'écoute.
- **Accélération marquée de l'exécution des sons et bruitages sur Jeedom Luna (`resources/altaircastd.py`, `resources/sound_synth.py`, `core/template/dashboard/altAirCast.html`)** :
  - **Source mémoire directe `StaticPcmAudioSource` + cache LRU borné en RAM (`<= 8` sons, `<= 1,5 Mo`)** : lit instantanément les fichiers `.wav` 44,1 kHz 16 bits sans `miniaudio` ni `ThreadPoolExecutor`, rogne en mémoire le silence d'attaque excédentaire à `25 ms` (sans réécriture sur l'eMMC), et réduit le silence initial par défaut à `40 ms` dans `sound_synth.py`.
  - **Suppression du double handshake `Pair-Verify` AirPlay (`350` à `800 ms` économisés)**, **parallélisation non bloquante du callback HTTP vers Jeedom** (`150` à `450 ms` gagnés avant l'ouverture RAOP tout en garantissant l'ordre chronologique `En cours -> Au repos`), **pré-chauffage d'arrière-plan** (`pyatv`, cache mDNS `60 min` et sons rapides épinglés pré-chargés après l'écriture de `deamon.pid`), abaissement de la pause inter-sessions à `60 ms` (`0 ms` au repos) et réduction de l'anti-rebond UI des boutons de sons rapides à `220 ms`.

## [0.1.0-beta.20] - 2026-11-05

### Corrigé & Optimisé
- **Fiabilisation intégrale des mises à jour, suppression des processus Python synchrones côté PHP et protection contre la saturation CPU/RAM (`core/class/altAirCast.class.php`, `plugin_info/install.php`, `plugin_info/pre_install.php`, `core/php/jeeAltAirCastPreview.php`, `resources/altaircastd.py`, `resources/sound_synth.py`)** :
  - **Zéro appel Python bloquant dans `getSoundsCatalog()`, `toHtml()`, `getKioskWidgetData()`, `altAirCast_update()` et `deamon_start()`** : élimine la tempête de processus `sound_synth.py` concurrents qui se déclenchait lors d'une mise à jour ajoutant de nouveaux sons embarqués (comme le saut `beta.17 -> beta.19`) et pouvait saturer les workers Apache / `jeeCron` si un fichier `.wav` restait manquant ou verrouillé.
  - **Ouverture instantanée du socket `55105` et écriture de `deamon.pid` en `< 80 ms` (`altaircastd.py`)** : déplace la synthèse des éventuels sons `.wav` manquants dans une tâche asynchrone d'arrière-plan non bloquante après le démarrage du serveur TCP, avec synthèse unitaire à la volée (`ensure_single_builtin_sound`) lors d'une lecture ou pré-écoute immédiate.
  - **Verrou inter-processus `fcntl.flock`, fichiers temporaires atomiques par PID/thread et accélération `5x` des ambiances (`sound_synth.py`)** : supprime toute collision `FileNotFoundError` / `PermissionError` sur les fichiers `.wav.tmp` partagés, purge automatiquement les `.tmp` orphelins et réduit le temps de synthèse complet des 26 sons.
  - **Alignement strict des permissions `www-data` vs `root` et détection démon zéro-fork via `/proc/<pid>/cmdline`** : lorsque `jeeUpdate.php` s'exécute sous `root`, répare automatiquement les droits `www-data:www-data` sur `data/` et `/tmp/jeedom/altAirCast`, lance `altaircastd.py` sous `www-data` (`sudo -n -u www-data`), gère l'arrêt d'un éventuel ancien démon `root` (`EPERM` + `stop_daemon` TCP + repli `system::getCmdSudo()`), supprime tout appel `ps auxww | grep` dans `isDaemonRunning()` et draine en continu `stderr` sur `ffmpeg` lors des écoutes Webradio prolongées.
- **Cohérence d'affichage des versions après une mise à jour interrompue (`plugin_info/configuration.php` & `jeedom_custom_update_versions.js`)** :
  - Détecte le cas où les fichiers d'une nouvelle version ont été copiés sur disque mais où la base Jeedom pointe encore sur l'ancien commit (`localSha != remoteSha` avec `info.json == remoteVer`), évitant d'afficher la nouvelle version SemVer à côté de l'ancien hash de commit dans la colonne *Version installée*.

## [0.1.0-beta.19] - 2026-11-04

### Corrigé & Optimisé
- **Refonte du moteur de streaming Webradio temps réel sur HomePod / AirPlay (`resources/altaircastd.py`)** :
  - **Source PCM directe asynchrone `LivePcmAudioSource` (`pcm_s16le` 44,1 kHz 16 bits stéréo)** : contourne le bogue arithmétique de `pyatv` (`BufferedIOBaseSource.CHUNK_SIZE = 1056` octets au lieu de `1408` octets par paquet RAOP de `352` trames, qui provoquait un remplissage partiel complété par `352` octets de zéros à `125 Hz` dès que le tampon descendait sous un paquet, puis des cycles de dégradation/récupération) ainsi que le double transcodage avec perte (`MP3/AAC -> ffmpeg MP3 -> miniaudio PCM`).
  - **Hystérésis anti-gigue (`1,00 s` de pré-tampon initial, reprise à `0,75 s`, anneau borné à `3,00 s` / `~516 Ko` par enceinte)** : émet des paquets complets de silence de confort (`1408` octets) avec fondu linéaire anti-clic de `8 ms` en cas de micro-coupure réseau au lieu de bloquer l'horloge RTP de `StreamClient` (évitant les rafales de rattrapage accéléré `4x`) et purge proprement `0,20 s` en cas de dérive d'horloge positive sans bloquer le tube `ffmpeg`.
  - **Zéro blocage après interruption d'une Webradio par un son ou changement de station** : élimine tout appel à `StreamReaderWrapper` / `ThreadPoolExecutor` sur le chemin principal (et garantit `feed_eof()` sur la liste immuable des lecteurs avant toute annulation en mode repli sans `ffmpeg`), sérialise les transitions par verrou asynchrone de Zone (`zone_locks`), envoie un arrêt RTSP gracieux (`remote_control.stop()` + délai de respiration `AirTunes` de `150 ms`) avant fermeture de socket, et désactive les tunnels `Companion`/`MRP` superflus lors d'une session purement RAOP (supprimant les collisions `Got response without having a request` sur HomePod).
  - **Cache mDNS unicast à TTL de 5 min avec invalidation automatique sur erreur et reconnexion amont transparente (`3` tentatives)** en cas de coupure distante du serveur radio.
- **Mémorisation de la dernière station et fiabilisation du bouton Lecture Webradio sur les widgets Dashboard & Mobile (`core/class/altAirCast.class.php`, `core/template/dashboard/altAirCast.html`, `core/template/mobile/altAirCast.html`)** :
  - Persistance en cache RAM Jeedom (`altAirCast::last_radio::<id>`) de la dernière station lancée, pré-sélection automatique dans la liste déroulante `#radios_options_html#` (même après interruption par un bruitage Soundboard ou une annonce TTS), repli serveur si `play_radio` est appelé sans paramètre `select`, remplacement du sélecteur non standard `option[value!=""]` et ajout du bouton **Relancer la Webradio** sur le widget Mobile.

## [0.1.0-beta.18] - 2026-11-04

### Ajouté
- **6 nouvelles créations sonores originales synthétisées hors-ligne pour HomePod / AirPlay (`resources/sound_synth.py`, `core/class/altAirCast.class.php`, `plugin_info/configuration.php`, `desktop/php/altAirCast.php`, `README.md`)** :
  - Porte le pack embarqué hors-ligne de **20 à 26 sons WAV `44,1 kHz` 16-bit** (`0 Ko` ajouté à l'archive Git, auto-généré localement uniquement pour les fichiers manquants sans réécrire l'existant sur l'eMMC, vectorisation C `array` de l'encodage PCM, 100 % création mathématique originale conforme aux CGU Market) :
    - **Jingles Domotique & Réveil** (également sélectionnables comme jingle d'introduction avant annonce vocale TTS) : *Jingle Interphone Doux* (`chime_intercom`), *Sonnette Domotique Cristalline* (`chime_crystal_door`) et *Réveil Aube Douce - Harpe* (`chime_dawn_harp`).
    - **Ambiances Naturelles & Relaxation** : *Pluie Douce sur Feuillage* (`ambient_gentle_rain`), *Ressac d'Océan Apaisant* (`ambient_ocean_surf`) et *Bruit Brun Profond - Cocooning* (`ambient_brown_noise`).

## [0.1.0-beta.17] - 2026-11-04

### Sécurité & Conformité CGU Jeedom Market
- **Durcissement sécurité et conformité CGU Jeedom Market (Articles 4.3, 4.8, 5.2 et 5.3)** :
  - **Liste blanche stricte `Content-Type: audio/*` et isolation `CSP sandbox` sur `core/php/jeeAltAirCastPreview.php`** : bloque toute réponse amont non-audio (`text/html`, `image/svg+xml`, `application/javascript` -> `HTTP 415/502`) afin d'empêcher tout rendu de contenu actif tiers sur l'origine Jeedom, et durcit les droits du micro-cache RAM `/tmp/jeedom/altAirCast/preview_cache` en `0700` / `0600`.
  - **Protection anti-SSRF IPv4 + IPv6 (`DNS_AAAA`)** dans `isSafePublicAudioUrl()` et `jeeAltAirCastPreview.php` sur la requête initiale comme à chaque redirection HTTP.
  - **Filtrage strict Domaine Public / `CC0` sur le repli `Wikimedia Commons` (`searchOnlineFreeSounds`)** : exclut les licences Copyleft (`CC-BY-SA`) ou à attribution obligatoire afin que 100 % des bruitages proposés à l'écoute et à l'import soient librement réutilisables sans contrainte de licence tierce.
  - **Documentation RGPD / Flux externes dans `README.md` (Art. 4.8)** : détaille explicitement les requêtes HTTPS ponctuelles déclenchées uniquement sur action de l'utilisateur (`sfxmint.com`, `commons.wikimedia.org`, `api.radio-browser.info`, `gTTS`) et l'absence totale de transmission de secrets ou données personnelles.

## [0.1.0-beta.16] - 2026-11-04

### Corrigé & Optimisé
- **Correction de la pré-écoute navigateur des bruitages en ligne CC0 et des Webradios sous la `Content-Security-Policy` de Jeedom (`desktop/js/altAirCast.js`, `core/php/jeeAltAirCastPreview.php`, `core/class/altAirCast.class.php`)** :
  - **Routage direct par le relais interne `'self'` dès le premier `player.play()`** : supprime la tentative préalable de chargement direct cross-origin (`https://sfxmint.com/...` ou `https://upload.wikimedia.org/...`), qui était bloquée par l'en-tête Apache `Content-Security-Policy: default-src 'self'` de Jeedom Core v4 et déclenchait une condition de course entre `player.onerror` et `play().catch()` (`NotSupportedError: Failed to load because no supported source was found`) annulant le basculement vers le relais.
  - **Micro-cache éphémère en RAM `tmpfs` avec support natif `HTTP 206 Partial Content` (`getCachedRemoteSfxPreview` & `altAirCast_serveLocalAudioWithRange`)** : télécharge une seule fois le bruitage distant en mémoire vive (`/tmp/jeedom/altAirCast/preview_cache/`, rotation LRU stricte `<= 6 fichiers` et `<= 1,8 Mo` compatible Jeedom Luna, contrôle anti-SSRF) afin de répondre aux sondages `Range: bytes=0-1` et `HEAD` exigés par Safari macOS/iOS, Chrome et Firefox comme pour un son local, puis réutilise instantanément ce fichier en RAM (`0 ms`) si l'utilisateur clique ensuite sur **Importer**.
  - **Compteur de séquence monotone anti-course (`aacPreviewState.seq`)** : empêche tout événement `onerror` ou rejet de promesse obsolète d'interrompre une nouvelle pré-écoute ou d'afficher une double alerte.
- **Compatibilité complète des icônes avec FontAwesome 5.15 de Jeedom Core v4 (`desktop/php/altAirCast.php`, `desktop/js/altAirCast.js`, `core/class/altAirCast.class.php`, `core/ajax/altAirCast.ajax.php`, `core/template/dashboard/altAirCast.html`, `resources/sound_synth.py`)** :
  - Remplacement des classes introduites uniquement dans FontAwesome 6 (`fa-radio`, `fa-volume-high`, `fa-triangle-exclamation`, `fa-shield-halved`, `fa-face-sad-tear`, `fa-face-laugh-squint`) par leurs équivalents universels FontAwesome 5/6 (`fa-podcast`, `fa-volume-up`, `fa-exclamation-triangle`, `fa-shield-alt`, `fa-sad-tear`, `fa-laugh-squint`).

## [0.1.0-beta.15] - 2026-11-04

### Documentation & Amélioré
- **Documentation complète du parcours de première installation et de l'auto-régénération des 20 sons embarqués (`README.md`, `core/class/altAirCast.class.php`)** :
  - Ajout d'une section dédiée **« Installation & Premier démarrage »** dans `README.md` détaillant l'installation des dépendances, le réglage réseau HomePod (*Maison*), l'allègement des sauvegardes Jeedom (`data/sounds/builtin` exclu tandis que `data/sounds/custom` est intégralement sauvegardé) et le cycle d'auto-synthèse hors-ligne en `< 0,2 s` lors d'une première installation ou après restauration de sauvegarde.
  - Contrôle unitaire des **20 fichiers `.wav`** dans `synthesizeMissingBuiltinSounds()` côté PHP (en plus du démon Python) afin que la suppression ou l'altération d'un seul son intermédiaire déclenche immédiatement sa régénération automatique à l'ouverture de l'interface ou du widget.

## [0.1.0-beta.14] - 2026-11-04

### Corrigé & Optimisé
- **Fiabilisation complète et accélération des mises à jour unitaires sous le seuil HTTP de 30 s (`plugin_info/install.php`, `plugin_info/pre_install.php`, `core/class/altAirCast.class.php`, `resources/altaircastd.py`, `.gitignore`)** :
  - **Allègement de 95 % de l'archive GitHub (`3,4 Mo -> ~150 Ko`)** : retrait du suivi Git des 20 fichiers audio `.wav` non compressés (`data/sounds/builtin/*.wav`, `3,0 Mo`) déjà synthétisés localement en `< 0,15 s` par `resources/sound_synth.py --init-builtin` (et exclus des sauvegardes via `backupExclude()`), supprimant `4 à 8 s` de téléchargement, décompression et déplacements inter-partitions lors de `update::doUpdate()`.
  - **Hooks `altAirCast_pre_update()` et `altAirCast_post_plugin_install()` anti-blocage démon** : amorce l'arrêt gracieux dès `preInstallUpdate()` et finalise l'extinction du démon dans un processus CLI neuf juste **avant** `$plugin->setIsEnable(1)`, ce qui court-circuite immédiatement tout ancien `deamon_stop()` encore chargé en mémoire Apache (y compris dès la transition depuis `0.1.0-beta.13`).
  - **Arrêt borné `< 1,0 s` du démon et suppression de `fuser -k 55105/tcp` (`deamon_stop()`, `altaircastd.py`)** : encadre la fermeture RTSP/AirPlay par des délais stricts (`0,3 s` sur le serveur socket + `0,8 s` sur les sessions actives) et remplace `fuser -k` par un ciblage exclusif du PID et de ses sous-processus `ffmpeg`.
  - **Zéro écriture SQL inutile lors des mises à jour (`upsertCmd()` & `$_inBulkUpdate`)** : ne réenregistre une commande existante en base MariaDB que si l'un de ses attributs a réellement évolué (passant de `31 UPDATE SQL` par Zone à `0` sur les équipements déjà à jour) et suspend les rechargements unitaires du démon pendant la boucle `altAirCast_update()`.

## [0.1.0-beta.13] - 2026-11-04

### Modifié & Amélioré
- **Refonte complète de l'explorateur de bruitages courts CC0 sans clé API et suppression de Freesound (`core/class/altAirCast.class.php`, `plugin_info/configuration.php`, `desktop/php/altAirCast.php`, `desktop/js/altAirCast.js`)** :
  - **Suppression complète de la dépendance et du champ `freesound_api_key`** dans la configuration du plugin (plus aucune clé API externe requise ni non testable).
  - **Nouveau moteur hybride 100 % effets sonores courts (`0,15 s` à `25 s`) sans voix parlées** : interroge en priorité le catalogue dédié de bruitages `SFXMint` (`CC0-1.0`, flux MP3 natifs compatibles Safari/iOS/AirPlay) avec repli filtré anti-dictionnaire (`isSpokenOrNonSfxAudio` excluant l'intégralité des prononciations vocales Lingua Libre `LL-Q...`, préfixes ISO du Wiktionnaire `Fr-...` / `En-us-...`, discours, interviews, pistes longues et fichiers MIDI).
  - **Traduction automatique Français -> Anglais des recherches (`translateSfxSearchQuery`)** : permet de chercher naturellement en français (*sonnette*, *chien*, *chat*, *applaudissements*, *rires*, *klaxon*, *sirène*, *gong*, *orage*, *arcade*, *tambour*, *minuterie*...), avec affichage de la durée exacte en secondes, validation par la touche `Entrée`, classement automatique dans la bonne catégorie Soundboard (`Jingle`, `Fun`, `Alerte`, `Ambiance`) à l'import et cache éphémère en RAM (`10 min`, max 15 requêtes).

## [0.1.0-beta.12] - 2026-11-04

### Corrigé & Optimisé
- **Suppression des fuites `Unclosed client session` et alignement des journaux `pyatv` (`resources/altaircastd.py`)** :
  - **Mutualisation de la session persistante `self.http_session` dans `pyatv.connect()` et `pyatv.pair()`** : évite l'allocation d'une nouvelle `aiohttp.ClientSession` interne par connexion AirPlay/HomePod et élimine les avertissements `ERROR Unclosed client session` au passage du ramasse-miettes Python.
  - **Fermeture asynchrone complète `_close_atv()` (`asyncio.shield`)** : attend proprement le `Set[asyncio.Task]` retourné par `atv.close()` lors de chaque fin de lecture, arrêt de Zone ou réglage de volume afin de clôturer proprement les sessions RTSP/AirTunes.
  - **Alignement du niveau de log racine et visibilité des erreurs de diffusion** : synchronise le logger racine et bride le bruit interne bénin de `pyatv` (`Got response without having a request`, gigue RAOP de quelques millisecondes) hors mode `Debug`, tout en journalisant en `ERROR` tout échec réel de connexion ou d'ouverture de Webradio afin qu'il reste visible même au niveau de log par défaut de Jeedom.

## [0.1.0-beta.11] - 2026-11-04

### Corrigé & Optimisé
- **Réparation de la diffusion des Webradios sur HomePod / HomePod mini et récepteurs AirPlay 1 & 2 (`resources/altaircastd.py`, `resources/install_apt.sh`, `core/class/altAirCast.class.php`, `core/template/mobile/altAirCast.html`)** :
  - **Pré-tamponnage initial de `64 Ko` (`PREBUFFER_STREAM_BYTES`) avant l'ouverture `atv.stream.stream_file()`** : supprime la condition de course où `BufferedReaderSource` et `miniaudio` tentaient d'initialiser le décodeur de façon synchrone sur un `StreamReader` encore vide (`0 octet`) avant la fin de la négociation TLS HTTP, provoquant un échec immédiat `miniaudio.DecodeError`.
  - **Double moteur Webradio (Transcodage léger `ffmpeg` + Alignement pur Python sur trames MPEG)** :
    - Lorsque `ffmpeg` est présent sur le système (installé par `resources/install_apt.sh`), un processus `ffmpeg` unique mutualisé décode à la volée tous les flux Webradios (**MP3, AAC, HE-AAC / `audio/aacp`, HLS `.m3u8`, OGG, FLAC**) en un flux continu `44,1 kHz` propre dès l'octet `0`, avec arrêt garanti sans processus orphelin dès l'arrêt de la Zone.
    - Même sans `ffmpeg` installé, le démon résout désormais les playlists `.m3u` / `.pls`, envoie des en-têtes lecteur compatibles (`Icy-MetaData: 0`), élimine les tags `ID3v2` surdimensionnés et aligne l'octet `0` des flux Icecast/Shoutcast (qui démarrent en milieu de trame) sur la première séquence vérifiée de 3 trames MPEG consécutives (`_align_audio_stream_start`).
  - **Métadonnées explicites `MediaMetadata` & volume de repli sécurisé (`getCurrentOrDefaultVolume`)** : transmet le nom de la station à `stream_file(..., metadata=...)` (affichage Now Playing sur HomePod/iOS et contournement du sondage `mediafile` bloquant), garantit un volume non muet (`45 %` par défaut si non initialisé) et réinitialise le sélecteur radio mobile à l'appui sur *Stop*.

## [0.1.0-beta.10] - 2026-11-03

### Corrigé & Ajouté
- **Réparation complète de la pré-écoute audio dans le navigateur (Safari macOS/iOS, Chrome, Firefox, Edge - HTTP & HTTPS)** :
  - **Flux PHP authentifié `core/php/jeeAltAirCastPreview.php`** : remplace l'accès direct à `data/sounds/` (bloqué en `403 Forbidden` par les règles Apache de sécurité Jeedom) tout en prenant en charge les requêtes partielles **`HTTP Range` (`206 Partial Content` / `Accept-Ranges: bytes`)** exigées par Safari macOS et iOS, sans jamais verrouiller la session PHP (`@session_write_close()`).
  - **Compatibilité native des sons libres Wikimedia Commons sur Safari (`searchOnlineFreeSounds`)** : bascule sur l'API `videoinfo` (`derivatives`) afin de servir et d'importer les dérivés transcodés **MP3 (`audio/mpeg`)** au lieu des fichiers `.ogg` Vorbis non décodés par WebKit/Safari.
  - **Relais sécurisé des flux Webradios `http://` sous `https://` (Mixed Content)** : relais à la volée borné (`90 s` max, protection stricte anti-SSRF interdisant toute IP locale/privée/loopback sur chaque redirection) pour pré-écouter les webradios `http://` même lorsque Jeedom est ouvert en `https://`.
  - **Mini-lecteur de pré-écoute visible et contrôleur JS sans doublon (`desktop/php/altAirCast.php`, `desktop/js/altAirCast.js`)** : barre de pré-écoute avec titre en cours, lecteur `<audio controls preload="none">`, bascule Lecture/Stop sur chaque bouton casque et délégation d'événements nommée (`.off('click.aacPreview')`) éliminant les `AbortError` lors de la navigation SPA Jeedom.

## [0.1.0-beta.9] - 2026-11-03

### Corrigé & Optimisé
- **Correction de l'erreur `Unknown error` et du décalage de version locale lors des mises à jour (`plugin_info/install.php`)** :
  - Suppression de l'appel synchrone bloquant `altAirCast::deamon_start()` et de `refreshWidget()` à l'intérieur de `altAirCast_update()`, qui interrompaient `update::doUpdate()` (timeout HTTP ou exception non interceptée) juste après l'extraction des fichiers mais **avant** l'enregistrement du nouveau hash `localVersion` en base MariaDB.
  - Encapsulation défensive complète de `altAirCast_update()`, invalidation immédiate d'OPcache (`opcache_invalidate`) sur les fichiers PHP du plugin et purge automatique des notifications d'erreur obsolètes du Centre de messages (`message::removeAll('altAirCast')`).
- **Suppression des ralentissements système et de la boucle d'erreurs cron du démon (`core/class/altAirCast.class.php`, `resources/altaircastd.py`, `resources/install_apt.sh`)** :
  - Correction de `isDaemonRunning()` et `deamon_stop()` avec le motif `[r]esources/altaircastd.py` afin d'éliminer tout auto-match du sous-shell `/bin/sh` (`dash`) lors de l'inspection des processus.
  - Réparation automatique et maintien des droits `www-data:www-data` (`775`) sur `/tmp/jeedom/altAirCast` dès le début et en sortie (`trap EXIT`) de `install_apt.sh` ainsi que dans `getRuntimeTmpDir()`, empêchant tout échec `PermissionError` lors de la création de `daemon_config.json` et `deamon.pid`.
  - Ajout de la clé de déduplication officielle Jeedom `'unableStartDeamon'` dans `deamon_start()` (plus aucune accumulation de centaines de messages d'erreur en base MariaDB), sondage rapide `usleep(500000)`, ouverture du port TCP `55105` avec `reuse_address=True` avant écriture du `deamon.pid` et libération immédiate du socket à l'arrêt (zéro conflit `Errno 98`).
  - Exécution de `install_apt.sh` sous priorité basse CPU/IO (`nice -n 19 ionice -c 3`), saut de `apt-get update` lorsque les paquets système sont déjà présents et réutilisation du `venv` sain avec `pip install --prefer-binary` pour ne jamais faire ramer Jeedom lors d'une mise à jour.
- **Manifeste de versions et badge SemVer + SHA Git sans verrou de session (`plugin_info/configuration.php`, `desktop/php/altAirCast.php`)** :
  - Ajout du point d'entrée JSON rapide `alt_versions_manifest=1` avec libération immédiate du verrou de session PHP (`@session_write_close()`) et affichage du badge `vX.Y.Z (commit)` dans l'administration du plugin.

## [0.1.0-beta.8] - 2026-11-03

### Optimisé (Audit approfondi des ressources - Jeedom Luna : RAM, `tmpfs`, eMMC & Apache/PHP)
- **Rétro-pression mémoire (`256 Ko` max/enceinte) et détachement immédiat des lecteurs en erreur (`_stream_url_to_speakers`)** :
  - Si une enceinte d'une Zone multi-enceintes se déconnecte en cours d'écoute Webradio pendant que les autres continuent, son tampon `StreamReader` est immédiatement détaché et purgé (zéro accumulation en RAM sur écoute longue).
  - Ajout d'une rétro-pression explicite à `256 Ko` par enceinte active afin que la lecture d'un gros fichier `.mp3` HTTP statique via `play_url` ne précharge jamais tout le fichier en RAM.
- **Double plafonnement strict `< 2 Mo` du cache TTS en RAM `tmpfs` (`prune_ephemeral_cache` & `deamon_stop`)** :
  - Le cache `/tmp/jeedom/altAirCast/tts_cache` est désormais borné simultanément en nombre de fichiers (`max 6`) **et** en volume cumulé (`1,75 Mo` max, soit strictement `< 2 Mo`), puis intégralement purgé à l'arrêt du démon.
- **Chargement paresseux (`_ensure_pyatv`) et expiration automatique des sessions PIN (`PAIRING_SESSION_TTL_SEC = 180 s`)** :
  - Import différé de `pyatv` (`cryptography`, `protobuf`, `zeroconf`, `miniaudio`) uniquement lors de la première opération AirPlay effective, pool `aiohttp.TCPConnector(limit=12)` borné, et fermeture automatique après 3 minutes de toute session d'appairage PIN restée ouverte.
- **Suppression des callbacks HTTP redondants vers Apache/PHP/MariaDB (`-67 %` lors d'un changement de flux)** :
  - Ajout de `notify_idle=False` dans `stop_zone()` et suivi de `was_cancelled` lors d'un remplacement de flux, d'un `Snooze` ou d'un arrêt de réveil afin de n'émettre qu'**un seul** appel HTTP vers `jeeAltAirCast.php` au lieu de 2 à 3 appels successifs.
- **Garde-fous RAM PHP et eMMC sur l'import de sons (`importOnlineSound`, `uploadCustomSound`)** :
  - Lecture bornée en flux (`maxlen = 10 Mo`) avant allocation mémoire PHP, vérification de taille à l'upload et écriture atomique POSIX complète (`fflush` + `fsync` + `rename`).

## [0.1.0-beta.7] - 2026-11-03

### Ajouté
- **Sélection personnalisable des sons rapides affichés sur le Widget par Zone (`configuration.widget_sounds`)** :
  - Possibilité de choisir librement pour chaque Zone quels sons de la Soundboard (embarqués ou importés depuis Wikimedia Commons / Freesound / fichiers `.mp3` personnels) apparaissent en boutons d'accès direct sur le widget Dashboard et Mobile :
    - Depuis l'onglet **« Zone & Enceintes Cibles »** (section *« Sons affichés en boutons rapides sur le Widget »*, avec compteur en temps réel et boutons *« Par défaut (6) »* / *« Aucun »*).
    - Ou directement en 1 clic via le bouton épingle **`Épingler` / `Sur le widget`** dans le tableau de l'onglet **« Soundboard Fun, Sons Libres & Webradios »**.
  - Tous les sons du catalogue restent par ailleurs accessibles à tout moment dans le menu déroulant *Sons* du widget (classés par catégories `<optgroup>`).

### Modifié & Corrigé
- **Refonte complète des Widgets Dashboard & Mobile selon la Charte Graphique Dark Glass `alt-erre` (`core/template/dashboard/altAirCast.html`, `core/template/mobile/altAirCast.html`)** :
  - Alignement intégral sur le design des autres plugins de la gamme (`altSonos`, `altAirMedia`) et les **9 thèmes officiels `alt-erre`** (`black` Dark Glass, `white` Light Glass, `blue`, `cyan`, `green`, `yellow`, `orange`, `red`, `purple`, avec migration automatique des anciens thèmes).
  - Ajout de l'en-tête intégré `.aac-header` avec boutons circulaires `26x26` (*Synchronisation Multiroom AirPlay 2*, *Tiroir Annonce TTS*, *Tiroir Réveil Matinal*, *Stop*, *Rafraîchir* avec rotation `.is-refreshing`), de la carte média `92px` avec vignette dynamique `74x74` + halo lumineux selon la source active (*Radio Live*, *Soundboard*, *Vocal TTS*, *Réveil*, *AirPlay 2*), et des tiroirs repliables *Annonce Vocale TTS* et *Réveil Matinal*.
  - Correction de toutes les surcharges CSS globales de Jeedom Core : contraste complet (`color-scheme`, `!important`) sur les `<select>` et `<input>`, empilement vertical propre des sélecteurs *Sons* / *Radio* sans troncature horizontale, et verrouillage des proportions du curseur de volume `<input type="range">` face au badge `Max 100%` (`.aac-vol-max-select`).
  - Vidage automatique du cache HTML du widget (`emptyCacheWidget()`) lors de la sauvegarde d'une Zone et lors des mises à jour du plugin.

## [0.1.0-beta.6] - 2026-11-02

### Corrigé
- **Correction de l'erreur MySQL `1062 Duplicate entry` lors de la création d'une Zone (`core/class/altAirCast.class.php`, `desktop/js/altAirCast.js`, `plugin_info/install.php`)** :
  - Suppression de la réentrance `postSave() -> checkAndUpdateCmd() -> refreshWidget() -> toHtml() -> postSave()` qui provoquait une double insertion simultanée des commandes en base (`Duplicate entry '*-Régler heure du réveil' for key 'unique'`).
  - Ajout d'un verrou anti-réentrance `$_inPostSave`, déplacement de toutes les initialisations `checkAndUpdateCmd()` en fin de `postSave()`, suppression de l'appel récursif `postSave()` dans `toHtml()`, et sécurisation directe de `upsertCmd()` via `cmd::byEqLogicIdAndLogicalId()` et `cmd::byEqLogicIdCmdName()` avec nettoyage des éventuelles commandes orphelines dans `postInsert()` et `install.php`.

## [0.1.0-beta.5] - 2026-11-02

### Ajouté
- **Widget Kiosk TV 10-Foot complet avec jaquette dynamique (`getKioskWidgetData()`, `kiosk_schema = 1`)** :
  - Refonte complète du contrat Niveau 2 pour **`altTvDashboard`** générant une pochette graphique Dark Glass dédiée selon la station radio active (*FIP*, *Jazz*, *France Inter*...), le *Soundboard* ou le groupement *AirPlay 2*.
  - Exposition 10-Foot de l'arrêt de diffusion, du volume bridé à `volume_max`, du groupement/dégroupement AirPlay 2, de l'activation du réveil audio ainsi que des sélecteurs directs *Radios Live* et *Soundboard & Carillons*.

## [0.1.0-beta.4] - 2026-11-02

### Optimisé (Sobriété Matérielle Jeedom Luna : CPU, RAM, Réseau & eMMC)
- **Zéro réveil CPU inutile sur l'horloge des réveils** (`_alarm_scheduler_loop`) :
  - Si aucun réveil n'est actif sur les Zones, la tâche d'horloge s'endort sur un événement noyau (`asyncio.Event`) avec **0 réveil CPU par heure (`0,00 % CPU`)**.
  - Lorsqu'un réveil est actif, l'attente est alignée exactement sur le début de la minute suivante (`:00`), divisant par 4 les réveils d'horloge tout en déclenchant à la seconde pile.
- **Mutualisation du flux HTTP Webradio multi-enceintes (`fan-out` mémoire)** :
  - Lorsqu'une Zone diffuse une Webradio sur $N$ enceintes simultanément, le démon n'ouvre qu'**une seule connexion HTTP/TLS** vers la station radio et distribue les paquets `8 Ko` en mémoire aux $N$ flux AirPlay.
- **Réutilisation des sessions `pyatv` ouvertes pendant le `Fade-in` et les changements de volume** :
  - Suppression des scans mDNS intermédiaires lors de la montée progressive du volume (`0 scan mDNS`, réglage direct sur la session ouverte) et réduction de 80 % des callbacks HTTP vers Apache/PHP pendant la rampe.
- **Callback groupé (`send_zones_batch`) et cache mémoire PHP par requête** :
  - Resynchronisation de toutes les Zones au démarrage en un seul appel HTTP groupé vers `jeeAltAirCast.php`, vérification statique sans fork Python dans `dependancy_info()` / `deamon_info()`, et mise en cache statique en RAM des catalogues JSON.

## [0.1.0-beta.3] - 2026-11-02

### Ajouté
- **Surcharges temporaires et programmation datée des réveils par scénario Jeedom** :
  - Nouvelles commandes **`Programmer réveil temporaire ou daté`** (`alarm_set_temp`), **`Annuler réveil temporaire`** (`alarm_clear_temp`) et **`Surcharge réveil temporaire active`** (`alarm_is_temp`).
  - Possibilité de modifier uniquement le **prochain déclenchement** d'un réveil (ex. `06:15`, `demain 08:30`, `2026-12-25 09:00`) ou de **sauter le prochain réveil** (`skip` / `off` un jour férié ou de congé) sans modifier l'heure habituelle de la semaine : une fois le réveil temporaire passé, la programmation régulière reprend automatiquement.
  - Prise en charge d'une **date unique optionnelle** (`once_date`) par réveil et ciblage de n'importe quel réveil secondaire depuis un scénario en précisant `#2`, `#3` dans le titre de la commande.

## [0.1.0-beta.2] - 2026-11-02

### Ajouté
- **Moteur de Réveils programmables & Briefing Matinal par Zone** :
  - Nouvel onglet **« Réveils & Briefing Matinal »** permettant de programmer un ou plusieurs réveils par Zone (Semaine, Week-end, jours personnalisés).
  - **Séquence combinée « Briefing Matinal TTS + Webradio »** : joue un jingle doux suivi de l'annonce vocale de l'heure et d'un message personnalisé (`#heure#`, `#jour#`, `#zone#`), puis lance automatiquement la Webradio choisie.
  - **Montée progressive du volume (`Fade-in`)** de `20 %` du volume cible jusqu'au volume nominal (plafonné par `volume_max`) sur une durée réglable (`0` à `600 s`).
  - **Fonctions `Snooze (+9 min)` et `Extinction automatique` (`auto_stop_min`)** intégrées dans le démon `altaircastd.py`.
  - **Nouvelles commandes Jeedom et bandeau Réveil sur le Widget Dashboard/Mobile** (`alarm_enabled`, `alarm_time`, `alarm_next`, `alarm_state`, `alarm_enable`, `alarm_disable`, `alarm_toggle`, `alarm_set_time`, `alarm_trigger_now`, `alarm_snooze`, `alarm_stop`).

## [0.1.0-beta.1] - 2026-11-02

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Diffusion, Sons & Multiroom (AirPlay)** (`altAirCast`).
- **Architecture par Zones / Groupes de diffusion** : chaque équipement Jeedom représente une Zone de diffusion dans laquelle on coche les enceintes et amplis cibles.
- **Découverte mDNS & Différenciation automatique AirPlay 1 vs AirPlay 2** :
  - Détection automatique du protocole (`AirPlay 1 (RAOP)` vs `AirPlay 2 (Multiroom)`), identification des appareils pouvant servir de Source Maître Apple Music (HomePod / Apple TV), appairage PIN interactif et import en lecture seule depuis `altAirMedia`.
- **Soundboard « Fun » & Synthétiseur de 20 sons embarqués hors-ligne** (`resources/sound_synth.py`) :
  - 5 Jingles d'annonce (*Carillon Gare 4 notes*, *Carillon Aéroport*, *Ding-Dong*, *Gong Zen*, *Double Clochette*), 10 bruitages Fun (*Ba-Dum-Tss*, *Trombone Triste*, *Fanfare*, *Level Up*, *Pièce Bonus*, *Game Over*, *Roulement de Tambour*, *Klaxon Airhorn*, *Tir Laser*, *Décompte 3-2-1 Go*), 3 Alertes et 2 Ambiances.
- **Explorateur intégré de Bibliothèques de Sons Libres en ligne (Sans clé API)** :
  - Recherche en direct, pré-écoute et téléchargement en 1 clic depuis `Wikimedia Commons Audio` (CC0 / CC-BY) et `Freesound.org` (clé API optionnelle), ainsi qu'import de fichiers personnels (`.mp3`, `.wav`, `.ogg`, `.flac`).
- **Moteur d'annonces vocales TTS avec Jingle d'introduction et amorçage anti-coupure** :
  - Assemblage à la volée en RAM (`/tmp/jeedom/altAirCast/tts_cache`, plafonné par rotation LRU à 8 fichiers) combinant `[Silence d'amorçage 350 ms] + [Jingle] + [Voix TTS]`.
- **Lecteur de Webradios & Recherche mondiale `Radio-Browser` (Sans clé API)** :
  - 10 stations préconfigurées (*Fun Radio*, *FIP*, *France Inter*, *RTL2*, *Nostalgie*, *NRJ*, *Nova*, *TSF Jazz*...) et moteur de recherche mondial en 1 clic.
- **Pont Multiroom AirPlay 2 & Apple Music** :
  - Groupement et dissociation matérielle des enceintes AirPlay 2 d'une Zone autour d'un HomePod ou d'une Apple TV maître.
- **Plafond de volume dynamique par mode (`volume_max` / `volume_max_set`)** et Widget Dashboard/Mobile « Dark Glass » avec 9 thèmes de couleur et compatibilité Kiosk TV 10-Foot (`getKioskWidgetData`).
- **Démon Python `asyncio` (`altaircastd.py`) sur le port dédié `55105`** :
  - Zéro secret dans `ps aux` (`daemon_config.json` `0600`), écritures atomiques POSIX et filtrage par delta des callbacks.
