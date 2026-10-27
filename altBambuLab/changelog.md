# Changelog — Alt Bambu Lab (`altBambuLab`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.4] — 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action & Protection anti-double-clic (Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (*Pause*, *Reprendre*, *Stop*, *Vitesses d'impression*, *Éclairage*, *Ventilateurs*).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Ajout d'un verrouillage anti-double-clic (`1,5 s`) sur les commandes critiques d'impression (*Pause*, *Reprendre*, *Stop*).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.3] — 2026-10-21 (Canal Beta)

### Corrigé
- **Stabilité de la connexion MQTT TLS et suppression du battement d'état `Prêt` ↔ `Hors-ligne` (`resources/altBambuLabd.py`, `core/class/altBambuLab.class.php`)** :
  - **Extraction automatique du Numéro de série via le certificat TLS X.509 (`extract_serial_from_tls_cert`)** : lorsque le numéro de série n'est pas encore renseigné dans l'équipement, le démon l'extrait automatiquement depuis le certificat TLS (`Subject CN`) présenté par l'imprimante sur le port `8883` (ou via SSDP unicast/multicast) et l'enregistre dans l'équipement Jeedom avant la souscription MQTT.
  - **Suppression de la souscription wildcard `device/+/report`** : le broker MQTT embarqué de la Bambu Lab P1S refusant les souscriptions avec joker `+` et fermant immédiatement la connexion TCP, le démon souscrit désormais exclusivement au topic nominal `device/<SERIAL>/report` (avec normalisation automatique en majuscules).
  - **Filtrage des échos `M-SEARCH` lors du scan SSDP (`discover_bambu_printers_ssdp`)** : ignore les requêtes `M-SEARCH` reçues en écho local sur les ports UDP `2021`/`1990` et n'accepte que les réponses `NOTIFY` / `HTTP/1.1 200 OK` authentiques des imprimantes Bambu Lab.
  - **Temporisation anti-battement (`_on_connected_async` / `_schedule_offline_state`)** : attend la réception du premier rapport MQTT avant d'émettre l'état initial (évitant l'affichage d'un état `Prêt` à `0°/0°C` factice), espace le `pushall` initial de `400 ms` après le `SUBSCRIBE` pour ménager l'ESP32 de la P1S, et applique un debounce de `8 s` sur les micro-déconnexions Wi-Fi.

## [0.1.0-beta.2] — 2026-10-21 (Canal Beta)

### Corrigé
- **Migration vers `paho.mqtt.client.CallbackAPIVersion.VERSION2` (`resources/altBambuLabd.py`)** :
  - Remplacement de `CallbackAPIVersion.VERSION1` par `CallbackAPIVersion.VERSION2` (avec rétrocompatibilité `paho-mqtt 1.x` et extraction unifiée des objets `ReasonCode` dans `_on_mqtt_connect` et `_on_mqtt_disconnect`) afin de supprimer l'avertissement `DeprecationWarning: Callback API version 1 is deprecated` au démarrage du démon.
  - Affichage systématique des messages `INFO` de démarrage et d'état de connexion MQTT TLS dans le log `altBambuLab_deamon` même lorsque le niveau de log du plugin est laissé sur `Défaut`.

## [0.1.0-beta.1] — 2026-10-20 (Canal Beta)

### Ajouté
- **Supervision et pilotage 100 % en local des imprimantes 3D Bambu Lab (spécialement la P1S et son AMS)** :
  - Démon Python asynchrone `altBambuLabd.py` connecté au broker **MQTT sur TLS local (`port 8883`)** de l'imprimante (`bblp` + `LAN Access Code` à 8 caractères), avec fusion en mémoire des deltas JSON (`device/<SERIAL>/report`) et gestion anti-flood du processeur ESP32 de la P1S.
  - Auto-découverte réseau **SSDP (`ports UDP 2021 / 1990`)** détectant l'adresse IP, le modèle (`P1S`, `P1P`, `X1C`, `X1E`, `A1`, `A1 Mini`) et le numéro de série, complétée par l'auto-détection du numéro de série dès le premier message MQTT si laissé vide.
- **Prise en charge complète de l'AMS (1 AMS — 4 Bobines : Slots A1 à A4)** :
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
