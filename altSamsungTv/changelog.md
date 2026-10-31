# Changelog — Alt Samsung TV (`altSamsungTv`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.18] — 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.17] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.17` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.16] — 2026-10-27 (Canal Beta)

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, en `%`, par défaut `100 %`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant*).
  - **Abaissement immédiat & Surveillance temps réel (Auto-clamp)** : abaisse immédiatement le volume du téléviseur via UPnP `RenderingControl` s'il est supérieur au nouveau plafond lors du changement de mode ou si un utilisateur dépasse ce plafond avec la télécommande Samsung.
  - **Bridage visuel sur le widget Dashboard** : la borne `max` du curseur de volume s'adapte en temps réel au plafond actif.

## [0.1.0-beta.15] — 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) au clic sur tous les boutons des widgets **Dashboard & Mobile** (Alimentation, Mode Art, D-Pad, pavé numérique, volume, chaînes, transport, téléversement Photo et vignettes d'œuvres).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) de l'en-tête du widget.

## [0.1.0-beta.14] — 2026-10-23 (Canal Beta)

### Ajouté
- **Téléversement direct d'une œuvre / photo depuis le widget (Galerie smartphone ou fichier local)** :
  - Ajout du bouton **`Photo`** (<i class="fas fa-upload"></i>) dans la section *Galerie The Frame* du widget **Dashboard** et du bouton d'envoi (<i class="fas fa-upload"></i>) sur le widget **Mobile**.
  - Sur **smartphone / tablette (iOS & Android)**, le clic ouvre le sélecteur natif permettant de choisir directement une photo dans la **Photothèque / Galerie de photos**, de **Prendre une photo** ou de **Choisir un fichier** ; sur **ordinateur**, il ouvre l'explorateur de fichiers local.
  - Barre d'aperçu intégrée au widget avec vignette, saisie d'un **nom personnalisé** (pré-rempli avec le nom du fichier) et reprise automatique du **passe-partout (`Matte`)** sélectionné dans le widget.
  - **Normalisation automatique côté navigateur (`<canvas>` 4K UHD `3840 px` max, JPEG `90 %`)** : convertit à la volée les photos de galerie smartphone (`HEIC`, `WebP`, photos 12–48 MP volumineuses) en JPEG standard ~1 Mo afin de garantir la compatibilité avec le socket D2D de *The Frame* et d'éviter tout blocage lié à `upload_max_filesize` de PHP.
  - Mise à jour immédiate après envoi : affichage instantané de l'œuvre sur *The Frame*, ajout automatique dans la liste déroulante `Œuvre` du widget et rafraîchissement en direct de la miniature d'aperçu.

## [0.1.0-beta.13] — 2026-10-21 (Canal Beta)

### Modifié
- **Épuration du widget Dashboard & repli automatique de la barre d'outils du navigateur** :
  - Suppression de la ligne de saisie `Web (https://...)` dans le widget Dashboard (les firmwares Samsung Tizen 2021–2025 bloquant l'injection d'URL externe `metaTag` dans `org.tizen.browser` au profit de la page d'accueil configurée dans le navigateur).
  - Envoi automatique de `KEY_DOWN` après le lancement de **Internet Browser** depuis le sélecteur d'applications (`App`) afin de replier la barre d'adresse et d'afficher la page d'accueil en plein écran.

## [0.1.0-beta.12] — 2026-10-21 (Canal Beta)

### Corrigé
- **Ouverture d'URL dans le navigateur Web Samsung Internet (`open_url`) sur Tizen 2020–2025+** :
  - Ajout de la détection et du lancement au premier plan via l'API REST locale `/api/v2/applications/<id>` sur l'ensemble des identifiants Tizen du navigateur (`org.tizen.browser`, `3201907018784`, `3202010022079`) avant et pendant l'émission WebSocket `ed.apps.launch` (`NATIVE_LAUNCH` + `DEEP_LINK` avec `metaTag`), évitant que la sortie du *Mode Art* ne relance simplement la dernière application TV active (ex. YouTube).
  - Redémarrage automatique du démon Python (`altSamsungTvd.py`) lors de la mise à jour du plugin (`altSamsungTv_update()`).

## [0.1.0-beta.11] — 2026-10-20 (Canal Beta)

### Ajouté
- **Ouverture d'URL dans le navigateur Web intégré en plein écran (`open_url`)** :
  - Ajout de la commande action Jeedom **`Ouvrir URL (Navigateur)`** (`open_url`, sous-type *message*) permettant d'ouvrir n'importe quelle URL (`https://...` ou `http://...`, ex. Design Jeedom, flux caméra, page météo) directement dans le navigateur intégré **Samsung Internet** (`org.tizen.browser`) via l'événement WebSocket local `ed.apps.launch` (`metaTag`).
  - **Mode plein écran automatique** : sortie automatique du *Mode Art* si actif, puis envoi différé d'une impulsion `KEY_DOWN` après le chargement de la page afin de faire descendre le focus hors de la barre supérieure et déclencher le repli automatique de la barre d'URL et des onglets (désactivable en passant `normal` dans le champ *Titre* de la commande).
  - Ajout d'un champ rapide **Web (`https://...`)** avec bouton d'ouverture directe dans le widget Dashboard.

## [0.1.0-beta.10] — 2026-10-20 (Canal Beta)

### Ajouté
- **Détection de l'orientation de l'écran (*Paysage* / *Portrait*) et rotation motorisée (The Frame)** :
  - **Commandes Info Jeedom** : ajout de `Orientation (Code)` (`orientation` : `landscape` ou `portrait`) et `Orientation (Libellé)` (`orientation_label` : `Paysage` ou `Portrait`), alimentées en temps réel via le canal WebSocket `com.samsung.art-app` (`get_current_rotation` / `current_rotation_status` / `rotation_changed`) aussi bien en mode *Démon WebSocket* qu'en mode *Local direct*.
  - **Adaptation visuelle dynamique des widgets (Dashboard & Mobile)** : bascule automatique du ratio de la vignette d'aperçu entre **`16:9` horizontal** (`landscape`) et **`9:16` vertical** (`portrait`), avec affichage du badge d'orientation (`Paysage` / `Portrait`) dans la carte d'état.
  - **Commande Action « Pivoter l'écran (Support motorisé) » (`rotate_screen`)** : ajout de l'action Jeedom et du bouton dédié dans l'en-tête *Galerie The Frame* pour piloter les supports muraux et pieds motorisés Samsung *Auto-Rotating* (`VG-ARAB22WMT` / `VG-ARAB43STD`) via un appui maintenu `KEY_MULTI_VIEW` (`Hold` 3,5 s).

## [0.1.0-beta.9] — 2026-10-20 (Canal Beta)

### Corrigé
- **Rendu visuel fidèle à la base `altAirMedia` (Contours, Dégradés, D-Pad & Boutons ronds)** :
  - Alignement exact des variables CSS (`--stv-bg`, `--stv-card`, `--stv-card-border`), ajout du contour extérieur `1px solid rgba(255, 255, 255, 0.20) !important` (`border-radius: 16px !important`), de la barre d'en-tête bord-à-bord avec filet de séparation, et verrouillage de `border-radius: 50% !important` sur les boutons circulaires, le D-Pad (`28px !important`) et le bouton central `OK` (`50% !important`) face aux surcharges CSS de Jeedom Core.
  - Suppression du retour à la ligne sur les libellés `SOURCE` / `APP` (`white-space: nowrap !important`).

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
