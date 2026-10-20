# Changelog — Alt Samsung TV (`altSamsungTv`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.8] — 2026-10-20 (Canal Beta)

### Amélioré
- **Vignette au format `16:9` et visuel dynamique par Source / Application dans la Carte État (Dashboard & Mobile)** :
  - Passage de la vignette de la carte État (`.stv-art-thumb-wrap` sur Dashboard `88×50 px`, `.stvm-art` sur Mobile `72×41 px`) au format écran **`16:9`** (`aspect-ratio: 16 / 9`).
  - En **Mode TV**, la vignette `16:9` adapte dynamiquement son icône, son libellé et son dégradé selon l'application ou l'entrée active (`Netflix`, `YouTube`, `Prime Video`, `Disney+`, `Apple TV`, `Apple Music`, `CANAL+`, `Oqee / Free TV`, `Molotov`, `Twitch`, `Spotify`, `Deezer`, `Plex`, `HDMI 1` à `HDMI 4`, `TV / TNT`, `Veille`).
  - En **Mode Art**, la vignette `16:9` affiche la miniature de l'œuvre *The Frame* encadrée du passe-partout (ou le visuel *Mode Art* doré).

## [0.1.0-beta.7] — 2026-10-20 (Canal Beta)

### Modifié
- **Harmonisation graphique des widgets Dashboard et Mobile (`alt-erre` Dark Glass)** :
  - Adoption du système de design unifié `alt-erre` (sur le modèle d'`altAirMedia`) : en-tête intégré `.stv-header`, barre segmentée des 3 états (*TV* / *Mode Art* / *Veille*), carte `.stv-frame-card` (`58×58 px` + `.stv-status-dot` + encadrement *The Frame* en Mode Art), télécommande à **D-Pad squircle central**, barre de volume `.stv-volume-box` et sélecteurs `.stv-select`.
  - Ajout du sélecteur de thème couleur par équipement (`Noir Dark Glass`, `Blanc`, `Bleu`, `Jaune`, `Rouge`).

## [0.1.0-beta.6] — 2026-10-20 (Canal Beta)

### Corrigé
- **Mode de communication « Local direct (Polling cron HTTP/UPnP/WS, sans démon) »** :
  - **Isolation par équipement (`shouldUseDaemon()`)** : les méthodes d'action et de rafraîchissement (`sendRemoteKey()`, `launchApp()`, `sendArtRequest()`, `changeMatte()`, `stepArtwork()`, `wakeUpTv()`, `ensureLocalThumbnail()`, `getTvInfo()`) vérifient désormais si l'équipement lui-même est configuré en mode `websocket` (`$this->shouldUseDaemon()`) au lieu de seulement tester si le processus global `altSamsungTvd.py` tourne en tâche de fond. Auparavant, lorsqu'un équipement était placé en mode *Local direct* alors que le démon du plugin était actif, le démon l'ignorait tandis que PHP lui déléguait toutes les commandes et sautait l'interrogation du Mode Art.
  - **Compatibilité TLS / OpenSSL 3.0+ en PHP (`DEFAULT:@SECLEVEL=0`)** : ajout de `'ciphers' => 'DEFAULT:@SECLEVEL=0'` et `'security_level' => 0` dans `directWsTransaction()` et `requestRestApi()` afin que les connexions WebSocket SSL (`wss://:8002`) et HTTPS directes en PHP vers le certificat auto-signé Samsung Tizen fonctionnent sous Debian 11/12 (OpenSSL 3.0+).
  - **Protocole WebSocket `com.samsung.art-app` en PHP (`ms.channel.ready` & session groupée)** : attente de l'événement `ms.channel.ready` avant l'envoi des requêtes Mode Art, gestion des trames WebSocket Ping/Pong/Close dans `readWsFrame()`, regroupement des requêtes `get_artmode_status` + `get_current_artwork` (+ `get_content_list`) sur une seule session WebSocket dans `getTvInfo()`, et téléchargement direct des miniatures D2D en PHP (`downloadThumbnailDirect()`) sans dépendre du démon.

## [0.1.0-beta.5] — 2026-10-19 (Canal Beta)

### Corrigé
- **Maintien de la sélection active dans les menus déroulants « Œuvre » et « Passe-partout (Matte) » du widget** :
  - L'œuvre en cours (`art_content_id`) est désormais pré-sélectionnée dès le chargement initial du widget (`toHtml()` + `syncArtworkSelectUI()`), reste sélectionnée lorsqu'on choisit une œuvre dans la liste déroulante, et se met à jour automatiquement lorsqu'on utilise les boutons *Précédent* / *Suivant* (`⏮` / `⏭`) ou la télécommande Samsung.
  - Le menu déroulant *Passe-partout (Matte)* synchronise désormais automatiquement la valeur active (`syncMatteSelectUI()`) et intègre les teintes additionnelles Samsung The Frame (`shadowbox_redorange`, `modern_redorange`, `flexible_redorange`, `shadowbox_black`, `modern_sand`, `modern_sage`, `modern_navy`, `modern_burgundy`).

## [0.1.0-beta.4] — 2026-10-19 (Canal Beta)

### Ajouté
- **Nommage personnalisé des œuvres du Mode Art (The Frame)** :
  - Ajout d'un bouton **`✏️` (Nommer / Renommer l'œuvre)** directement à côté de la liste déroulante des œuvres dans l'onglet *Studio The Frame* du widget Dashboard (permettant de remplacer les identifiants bruts `MY_F0018`, `MY_F0007`… par un nom lisible tel que *Photo Vacances*, *La Nuit étoilée*, etc.).
  - Ajout de la commande action `Mode Art : Renommer une œuvre` (`art_rename`), d'un champ facultatif *Nom de l'œuvre* lors du téléversement d'une image vers The Frame, et prise en compte automatique des renommages effectués dans l'onglet *Commandes* de Jeedom.

### Corrigé
- **Sélecteur « Passe-partout (Matte) » sur Samsung The Frame** :
  - Ajout de la méthode dédiée `changeMatte()` (`action="change_matte"` dans le démon WebSocket et en PHP) qui résout automatiquement l'identifiant de l'œuvre courante (`art_content_id` / `get_current_artwork` / catalogue), envoie `change_matte` (`matte_id` + `portrait_matte_id`) puis déclenche immédiatement un `select_image` (`show: true`) pour forcer le téléviseur The Frame à redessiner le passe-partout à l'écran, avec aperçu visuel dynamique du cadre dans le widget.
- **Aperçu miniature de l'œuvre en cours dans le cadre du widget** :
  - Correction de la prise en charge de l'événement `get_current_artwork` dans le démon WebSocket (`altSamsungTvd.py`), de l'alignement de l'UUID `conn_info.id` / `request_id`, de l'analyse booléenne `secured: "false"` sur le socket TCP D2D Tizen et de la résolution de l'IP locale lorsque le téléviseur renvoie `127.0.0.1` dans `conn_info`.
  - Ajout d'un contrôleur sécurisé (`core/php/altSamsungTvThumb.php`) pour servir les miniatures Mode Art aux sessions Jeedom authentifiées sans blocage HTTP 403 d'Apache sur le répertoire `/data/`, avec téléchargement D2D automatique à la volée (`ensureLocalThumbnail`) si la vignette n'est pas encore en cache.

## [0.1.0-beta.3] — 2026-10-19 (Canal Beta)

### Corrigé
- **Liste des œuvres du Studio The Frame (Mode Art)** :
  - Le démon WebSocket (`altSamsungTvd.py`) transmet désormais automatiquement le catalogue complet des œuvres (`art_catalog`, catégories générale, *Mes Photos* `MY-C0002` et *Favoris* `MY-C0004`) vers Jeedom dès la réception des événements `content_list` et `current_artwork` / `image_selected`.
  - Synchronisation automatique des commandes `art_item_<content_id>` dans `applyTvState()` et alimentation immédiate de la liste déroulante `— Choisir une œuvre —` du widget Dashboard/Mobile (avec prise en charge directe des identifiants `cid:<content_id>` en temps réel sans nécessiter de rechargement ni de clic manuel sur *Sync Galerie Art*).
- **Sortie de veille prolongée (*Deep Standby*) sur Samsung Smart TV & The Frame** :
  - Ajout d'une séquence de réveil dédiée multi-étapes (`wake_device` / `_run_wake_sequence()` dans le démon Python et `wakeUpTv()` en PHP) :
    1. Résolution automatique de l'adresse MAC Ethernet (RJ45) du boîtier *One Connect* via la table ARP locale (`/proc/net/arp`) en complément de l'adresse MAC Wi-Fi retournée par `/api/v2/`.
    2. Envoi de salves *Wake-on-LAN* (WoL) multi-ondes vers toutes les adresses MAC connues (broadcast global `255.255.255.255`, broadcast de sous-réseau `x.x.x.255` et unicast IP sur les ports UDP `9`, `7` et `2304`).
    3. Réveil instantané (`_wake_event`) des boucles WebSocket du démon dès la demande d'allumage, avec ouverture de connexions WebSocket *one-shot* à la demande lorsque le téléviseur est en veille réseau (`PowerState="standby"`).
    4. Dès que l'interface réseau Tizen répond après le WoL (`PowerState="standby"`), envoi automatique de `KEY_POWER` (`Click`) pour allumer la dalle, suivi de la bascule explicite vers la cible souhaitée (`set_artmode_status: off` pour le mode TV ou `on` pour le Mode Art).

## [0.1.0-beta.2] — 2026-10-19 (Canal Beta)

### Corrigé
- **Lancement des applications Smart TV (Tizen 2020–2025+ & démon WebSocket)** :
  - Correction de l'identifiant Tizen de **Free TV** (anciennement *OQEE by Free*, `3202103023185` / `3201510005981`) qui pointait par erreur vers l'ID d'**Apple Music** (`3201908019041`, désormais proposé comme commande distincte).
  - Mise à jour de l'identifiant officiel Tizen 2022–2025+ de **Twitch** (`3202203026841`, avec repli automatique sur `3201806016432` et `3201601007625`) ainsi que des IDs multi-générations pour `Disney+`, `CANAL+`, `Molotov`, `Prime Video` et `Netflix`.
  - En mode démon WebSocket (`altSamsungTvd.py`), `launch_app()` sonde désormais l'API REST locale (`GET :8001/api/v2/applications/<id>`) parmi tous les IDs candidats pour détecter la variante exacte installée sur le téléviseur, sort automatiquement du Mode Art sur The Frame, et combine `POST /api/v2/applications/<id>` (`Content-Length: 0`) et l'événement WebSocket `ed.apps.launch` (`DEEP_LINK` + `NATIVE_LAUNCH`).
  - Suppression de la double exécution en PHP (`launchApp()`) lorsque le démon WebSocket a déjà pris en charge la commande.
- **Sélection des sources HDMI sur Samsung The Frame** :
  - Les firmwares Tizen de la gamme **The Frame (2018–2025+)** ignorant les touches discrètes `KEY_HDMI1..4` sur l'API WebSocket locale (réservées par Samsung au Cloud SmartThings), les commandes `HDMI 1..4` sont désormais masquées par défaut sur les équipements The Frame au profit des sources locales fonctionnelles (`TV / TNT`, `HDMI (Basculer / Cycle)` et `Menu Sources`), avec sortie automatique du Mode Art et repli sur `KEY_HDMI`.
- **Widget Dashboard & Mobile (sélecteurs Sources & Applications)** :
  - Réinitialisation automatique des listes déroulantes `— Source —` et `— Application —` après chaque sélection afin de pouvoir recliquer plusieurs fois de suite sur `HDMI (Basculer / Cycle)` ou relancer la même application, et correction du rafraîchissement temps réel du titre d'entrée (`#input_id#`).

### Ajouté
- Ajout des applications **Apple Music** (`3201908019041`), **france.tv** (`3202103023232`), **TF1+** (`3202209028524`), **ARTE** (`3202011022316`) et **Max** (`3202301029760`), avec migration automatique des équipements existants.

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % en local des téléviseurs **Samsung Smart TV (Tizen)** et **The Frame** (HTTP, UPnP et WebSocket TLS `:8002` temps réel) sans dépendance au Cloud SmartThings.
- Prise en charge complète du **Mode Art de The Frame** : état actif, bascule TV/Art, réglage de la luminosité Mode Art, sélection des passe-partout (*Matte*), navigation dans la galerie et récupération de la vignette de l'œuvre affichée.
- Téléversement direct d'images locales ou d'URLs (`JPEG`/`PNG`) vers le Mode Art de The Frame via transfert local D2D.
- Lecture et contrôle exact du volume (`0-100 %`) et de la sourdine via l'API locale UPnP RenderingControl (`:9197`), sélection des sources HDMI, lancement direct des applications Tizen et télécommande complète.

### Sécurité & Conformité
- Transmission sécurisée du jeton d'appairage (`token`) au démon via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
