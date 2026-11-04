# Changelog - Alt Diffusion, Sons & Multiroom (AirPlay) (`altAirCast`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.

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
