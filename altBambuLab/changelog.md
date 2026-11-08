# Changelog - Alt Bambu Lab (`altBambuLab`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.11] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.10] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.9] - 2026-11-07 (Canal Beta)

### Optimisé & Corrigé
- **Sobriété Apache / MariaDB & Protection anti-empilement des callbacks HTTP (`resources/altBambuLabd.py`, `core/php/jeeAltBambuLab.php`, `core/class/altBambuLab.class.php`)** :
  - **Filtrage par delta et hystérésis (`_compute_delta_state`)** : suppression de l'envoi inconditionnel d'état complet toutes les `2 s` lorsque l'imprimante est au repos (`IDLE`) sans changement utile, ajout d'une hystérésis sur les grandeurs analogiques bruitées (`1,0 °C` au repos / `0,3 °C` en chauffe ou impression sur les températures, `3 dBm` sur le signal Wi-Fi, `2 %` sur l'humidité AMS) et transmission uniquement des clés modifiées.
  - **Coalescence et sérialisation stricte des requêtes HTTP (`_flush_pending_loop`)** : fusion en mémoire des mises à jour MQTT par équipement et envoi séquentiel garanti (`1` seule requête HTTP active maximum vers Apache à tout instant, réessai différé de `2 s` en cas de surcharge SQL) éliminant tout empilement de workers Apache.
  - **Pré-chargement SQL groupé dans `applyPrinterState()` et garde-fous PHP** : lecture unique des commandes `info` de l'équipement (`$this->getCmd('info')`, `1` requête SQL au lieu de jusqu'à `39` `SELECT` unitaires sur la table `cmd`) et ajout de `@ignore_user_abort(false)` / `@set_time_limit(30)` dans `jeeAltBambuLab.php`.

## [0.1.0-beta.8] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altBambuLab.html`, `core/template/mobile/altBambuLab.html`, `core/class/altBambuLab.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.7] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.6] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.6` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.5] - 2026-10-30 (Canal Beta)

### Corrigé
- **Port socket interne dédié `55101` et migration automatique anti-conflit (`core/class/altBambuLab.class.php`, `plugin_info/install.php`)** :
  - Attribution du port TCP local dédié **`55101`** (`DEFAULT_SOCKET_PORT = 55101`) au démon `altBambuLabd.py` afin d'éviter toute collision de port (`[Errno 98] address already in use`) avec les démons des autres plugins de la gamme `alt-erre` (`55093` utilisé par `altRoborock`, `55099` utilisé par `altNuki`).
  - Migration transparente et automatique des ports `55093` et `55099` vers `55101` dès l'appel à `altBambuLab::getSocketPort()` au démarrage du démon ou lors de la mise à jour du plugin.

## [0.1.0-beta.4] - 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action & Protection anti-double-clic (Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (*Pause*, *Reprendre*, *Stop*, *Vitesses d'impression*, *Éclairage*, *Ventilateurs*).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Ajout d'un verrouillage anti-double-clic (`1,5 s`) sur les commandes critiques d'impression (*Pause*, *Reprendre*, *Stop*).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.3] - 2026-10-21 (Canal Beta)

### Corrigé
- **Stabilité de la connexion MQTT TLS et suppression du battement d'état `Prêt` ↔ `Hors-ligne` (`resources/altBambuLabd.py`, `core/class/altBambuLab.class.php`)** :
  - **Extraction automatique du Numéro de série via le certificat TLS X.509 (`extract_serial_from_tls_cert`)** : lorsque le numéro de série n'est pas encore renseigné dans l'équipement, le démon l'extrait automatiquement depuis le certificat TLS (`Subject CN`) présenté par l'imprimante sur le port `8883` (ou via SSDP unicast/multicast) et l'enregistre dans l'équipement Jeedom avant la souscription MQTT.
  - **Suppression de la souscription wildcard `device/+/report`** : le broker MQTT embarqué de la Bambu Lab P1S refusant les souscriptions avec joker `+` et fermant immédiatement la connexion TCP, le démon souscrit désormais exclusivement au topic nominal `device/<SERIAL>/report` (avec normalisation automatique en majuscules).
  - **Filtrage des échos `M-SEARCH` lors du scan SSDP (`discover_bambu_printers_ssdp`)** : ignore les requêtes `M-SEARCH` reçues en écho local sur les ports UDP `2021`/`1990` et n'accepte que les réponses `NOTIFY` / `HTTP/1.1 200 OK` authentiques des imprimantes Bambu Lab.
  - **Temporisation anti-battement (`_on_connected_async` / `_schedule_offline_state`)** : attend la réception du premier rapport MQTT avant d'émettre l'état initial (évitant l'affichage d'un état `Prêt` à `0°/0°C` factice), espace le `pushall` initial de `400 ms` après le `SUBSCRIBE` pour ménager l'ESP32 de la P1S, et applique un debounce de `8 s` sur les micro-déconnexions Wi-Fi.

## [0.1.0-beta.2] - 2026-10-21 (Canal Beta)

### Corrigé
- **Migration vers `paho.mqtt.client.CallbackAPIVersion.VERSION2` (`resources/altBambuLabd.py`)** :
  - Remplacement de `CallbackAPIVersion.VERSION1` par `CallbackAPIVersion.VERSION2` (avec rétrocompatibilité `paho-mqtt 1.x` et extraction unifiée des objets `ReasonCode` dans `_on_mqtt_connect` et `_on_mqtt_disconnect`) afin de supprimer l'avertissement `DeprecationWarning: Callback API version 1 is deprecated` au démarrage du démon.
  - Affichage systématique des messages `INFO` de démarrage et d'état de connexion MQTT TLS dans le log `altBambuLab_deamon` même lorsque le niveau de log du plugin est laissé sur `Défaut`.

## [0.1.0-beta.1] - 2026-10-20 (Canal Beta)

### Ajouté
- **Supervision et pilotage 100 % en local des imprimantes 3D Bambu Lab (spécialement la P1S et son AMS)** :
  - Démon Python asynchrone `altBambuLabd.py` connecté au broker **MQTT sur TLS local (`port 8883`)** de l'imprimante (`bblp` + `LAN Access Code` à 8 caractères), avec fusion en mémoire des deltas JSON (`device/<SERIAL>/report`) et gestion anti-flood du processeur ESP32 de la P1S.
  - Auto-découverte réseau **SSDP (`ports UDP 2021 / 1990`)** détectant l'adresse IP, le modèle (`P1S`, `P1P`, `X1C`, `X1E`, `A1`, `A1 Mini`) et le numéro de série, complétée par l'auto-détection du numéro de série dès le premier message MQTT si laissé vide.
- **Prise en charge complète de l'AMS (1 AMS - 4 Bobines : Slots A1 à A4)** :
  - Remontée temps réel de la bobine active (`ams_active_slot`, `ams_active_label`), de l'indice d'humidité (`1` à `5`) et de la température interne de l'AMS.
  - Commandes dédiées pour chacun des 4 emplacements de bobines : matériau (`PLA`, `PETG`, `ABS`, `ASA`, `TPU`, `PA-CF`...), couleur hexadécimale (`#RRGGBB`) et niveau restant (`%`).
- **Contrôle thermique et ventilation spécifique P1S** :
  - Températures et consignes de la **Buse (`0..300 °C`)** et du **Plateau (`0..110 °C`)**.
  - Pilotage indépendant des **3 ventilateurs de la P1S** : *Ventilateur Pièce*, *Ventilateur Auxiliaire* et *Ventilateur Chambre*.
  - Commandes de contrôle d'impression (*Pause*, *Reprendre*, *Stop*), d'éclairage **LED de chambre** (*On*, *Off*, *Toggle*), de **Profil de vitesse** (*Silencieux 50%*, *Standard 100%*, *Sport 124%*, *Ludicrous 166%*), de *Homing (`G28`)* et de *Déchargement filament*.
- **Décodeur natif Snapshot Caméra P1S (`port 6000` TLS) & Vignettes 3MF (`port 990` FTPS)** :
  - Capture directe d'images JPEG depuis le flux caméra binaire TLS (`port 6000`) de la P1S sans dépendance externe (`ffmpeg` / Docker), exploitable dans le widget, dans les scénarios/notifications Jeedom (`snapshot_path`) et dans le plugin officiel *Caméra* (`core/php/snapshot.php`).
  - Extraction automatique de la miniature PNG du fichier `.3mf` en cours d'impression via le serveur FTPS implicite (`port 990`).
- **Widgets personnalisés Dashboard & Mobile « Dark Glass » (Charte `alt-erre`)** :
  - En-tête intégré avec contrôle rapide de la LED de chambre, tiroir Caméra `16:9` dépliable, carte d'état avec vignette `.3mf` et barre de progression, bandeau thermique P1S, bandeau visuel des 4 bobines AMS aux couleurs réelles `#RRGGBB` et sélecteurs de vitesse/préchauffage.
  - Support des 5 thèmes de couleur (`Noir Dark Glass`, `Blanc Light Glass`, `Bleu`, `Ambre`, `Rouge`).

### Sécurité & Conformité
- Transmission du `LAN Access Code` et de la clé API au démon via un fichier temporaire verrouillé en `chmod 0600` dans `jeedom::getTmpFolder('altBambuLab')` et supprimé dès lecture / à l'arrêt (`@unlink`), sans aucune exposition dans `ps aux` ni dans les logs.
- Protection du répertoire `data/snapshots` par `.htaccess` (`Require all denied`) et contrôle d'authentification dans `core/php/snapshot.php`.
