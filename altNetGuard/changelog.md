# Changelog - Alt Radar & Sécurité Réseau (`altNetGuard`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.10] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.9] - 2026-11-07 (Canal Beta)

### Ajouté & Optimisé
- **Bouton « Scan Approfondi » ciblé sur les éléments filtrés de l'onglet actif (`desktop/php/altNetGuard.php`, `desktop/js/altNetGuard.js`, `core/ajax/altNetGuard.ajax.php`, `core/class/altNetGuard.class.php`, `resources/altNetGuardd.py`)** :
  - Ajout d'un champ de filtrage instantané (`#in_filterInventoryTab`) et d'un bouton **« Scan Approfondi (N) »** dans le Centre de Contrôle permettant de lancer une inspection complète (`Ports TCP + Bannières HTTP/SSH + Reverse DNS + NetBIOS`) **exclusivement sur les appareils affichés/filtrés de l'onglet sur lequel l'utilisateur est positionné** (*Appareils Inconnus à Identifier*, *Appareils Connus*, *Invités (24h) & Ignorés* ou *Journal des Alertes d'Intrusion*), avec remontée groupée (`probe_batch_result`).
- **Coexistence pacifique avec les accessoires HomeKit IP (`hkControl` / Aqara FP2) & Sobriété des scans périodiques (`resources/altNetGuardd.py`, `core/class/altNetGuard.class.php`)** :
  - **Zéro réveil parasite des accessoires HomeKit IP en arrière-plan** : suppression de l'interrogation multicast `_hap._tcp.local` des rondes automatiques, déclenchement des découvertes multicast `mDNS`/`SSDP` uniquement à l'apparition d'un nouvel appareil non identifié ou lors d'un scan manuel, et arrêt des requêtes NetBIOS (`UDP 137`) / Reverse DNS répétées sur les appareils déjà identifiés (pré-alimentation du cache démon via `inventory_seed` au démarrage).
  - **Zéro sous-processus `ping` sur les équipements déjà `REACHABLE` dans la table ARP du noyau Linux** lors des rondes automatiques, divisant par 5 le nombre de processus `ping` par cycle tout en vérifiant les équipements en état `STALE`/`DELAY` avant de les déclarer hors-ligne.
  - **Hystérésis de rafraîchissement du widget Radar Principal (`refreshAllRadarEquipments`)** : mise à jour de `unknown_list_json`, `last_scan_time` et `scan_duration_ms` uniquement lors d'un changement réel d'état du réseau (ou toutes les `15 min`), éliminant les écritures inutiles dans le bus d'événements Jeedom à chaque ronde.

## [0.1.0-beta.8] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.7] - 2026-11-07 (Canal Beta)

### Optimisé & Corrigé
- **Sobriété Apache / MariaDB, CPU & eMMC sur Jeedom Luna (`resources/altNetGuardd.py`, `core/php/jeeAltNetGuard.php`, `core/class/altNetGuard.class.php`)** :
  - **Coalescence et sérialisation stricte des callbacks HTTP (`send_scan_report_coalesced` & verrou `flock` non-bloquant)** : garantie d'un seul appel HTTP actif maximum vers Apache (avec remplacement du rapport en attente en cas de ralentissement SQL et envoi asynchrone sur `ping_device`) et protection anti-chevauchement dans `jeeAltNetGuard.php` (`@ignore_user_abort(false)`, `@set_time_limit(30)`, `LOCK_EX | LOCK_NB`).
  - **Découverte ARP Layer-2 sans rafale de sous-processus `ping` (`perform_network_scan`)** : amorçage ARP noyau par datagrammes UDP non-bloquants (`zéro fork OS` sur les 254 IP du sous-réseau local) suivi d'une mesure de latence ICMP ciblée uniquement sur les hôtes actifs détectés en ARP, réduisant fortement la charge CPU du démon sur Jeedom Luna.
  - **Pré-chargement SQL groupé, hystérésis de latence et persistance RAM `tmpfs` (`inventory_runtime.json`)** : chargement unique des commandes `info` par équipement (`1` requête SQL au lieu de `12` à `15` `SELECT` sur `cmd`), hystérésis sur `latency_ms` (`>= 5 ms` et `>= 15 %`) et `last_seen` (`5 min` en maintien stable), et écriture sur l'eMMC uniquement lors d'un changement significatif d'inventaire (ou toutes les `15 min`).

## [0.1.0-beta.6] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altNetGuard.html`, `core/template/mobile/altNetGuard.html`, `core/class/altNetGuard.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.5] - 2026-11-06 (Canal Beta)

### Optimisé & Ajouté
- **Sobriété du scan réseau vis-à-vis des objets connectés IoT (`ESP32`/`ESP8266`) et de la Jeedom Luna (`resources/altNetGuardd.py`, `core/class/altNetGuard.class.php`)** :
  - Lecture préalable non-intrusive de la table ARP/Neighbor OS (`REACHABLE`, `DELAY`, `PERMANENT`) pour désactiver le repli TCP (`80`/`443`/`62078`) de `async_ping_host()` sur les équipements déjà actifs sur le LAN.
  - Réduction de la concurrence de `scan_tcp_ports()` de `36` à `6` connexions simultanées max pour préserver la pile `lwIP` des microcontrôleurs Wi-Fi, mémorisation des adresses MAC déjà sondées (`probed_macs`) afin de ne scanner les ports d'un appareil inconnu qu'à sa première découverte (ou lors d'un `deep_scan` manuel), et exécution non-bloquante des callbacks HTTP vers Jeedom via `run_in_executor()`.
  - Indexation en mémoire des équipements individuels (`buildDeviceEquipmentIndex()`) dans `findDeviceEquipment()` et mise en cache locale des paramètres d'alerte avant la boucle de traitement afin d'éliminer les requêtes SQL répétées par appareil scanné.
- **Enrichissement de la base OUI & du Fingerprinting IoT hors-ligne (`resources/oui_vendors.py`)** :
  - Ajout des préfixes MAC OUI et règles de détection pour **Aqara / Lumi**, **Meross**, **Somfy** et **Shelly**.

## [0.1.0-beta.4] - 2026-11-01 (Canal Beta)

### Corrigé
- **Création d'un équipement « Appareil Réseau Connu » (`Duplicate entry '*-Statut de confiance' for key 'unique'`)** :
  - Renommage de la commande `action/select` `trust_status_set` en **« Changer statut de confiance »** dans `createDeviceCommands()` afin d'éviter la collision d'unicité MySQL (`UNIQUE(eqLogic_id, name)`) avec la commande `info/string` `trust_status` (**« Statut de confiance »**).
  - Ajout d'une déduplication automatique du nom d'équipement proposé dans `createOrUpdateKnownEquipment()` (ajout du suffixe MAC ` (XX:YY)` en cas d'homonymie dans la même pièce Jeedom) pour éviter tout conflit lors de l'ajout de plusieurs appareils du même constructeur ou `hostname`.
  - Désactivation de l'historisation par défaut sur la commande volatile `latency_ms` (`isHistorized = 0`) pour préserver la mémoire flash eMMC (Jeedom Luna).

## [0.1.0-beta.3] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.2] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.2` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.1] - 2026-10-30

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`) du plugin `Alt Radar & Sécurité Réseau` (`altNetGuard`)** :
  - **Démon Python asynchrone 100 % Local LAN (`resources/altNetGuardd.py`)** :
    - Surveillance hybride non-intrusive combinant lecture de la table ARP / Neighbor OS (`ip neigh`, `arp -an`, `/proc/net/arp`), balayage **Ping Sweep & TCP ARP Primer** haute concurrence, découverte **mDNS / Bonjour (`.local`)**, **UPnP / SSDP (`friendlyName`, `manufacturer`, `modelName`)**, **NetBIOS Name Service (`UDP 137`)** et **Reverse DNS**.
    - Détection automatique du ou des sous-réseaux locaux IPv4 (`auto`) et de la passerelle par défaut.
  - **Architecture hybride à 2 rôles d'équipements Jeedom** :
    1. **Équipement global « Radar & Sécurité Réseau » (`netguard_radar_main`)** : compteurs temps réel (`total_online`, `known_online`, `known_offline`, `unknown_online`, `unknown_total`, `guest_online`), alerte binaire d'intrusion (`security_alert`), détails du dernier appareil inconnu détecté (`last_intrusion_ip`, `last_intrusion_mac`, `last_intrusion_vendor`, `last_intrusion_hostname`, `last_intrusion_time`, `last_intrusion_summary`), sélection du mode de surveillance (`smart`, `strict`, `night`, `mute`) et actions globales (`scan_now`, `deep_scan`, `ack_alerts`, `approve_all_unknown`, `clear_offline_unknown`).
    2. **Équipements individuels « Appareil Réseau Connu » (`netguard_dev_<MAC>`)** : suivi de présence par adresse MAC (`online`), adresse IPv4 (`ip`), changement d'IP (`ip_changed`), latence Ping (`latency_ms`), constructeur OUI (`vendor`), `hostname`, ports TCP ouverts (`open_ports`), bannière Web/SSH (`http_banner`), **Wake-on-LAN (`wol`)** et **Pont IP automatique (`sync_ip_bridges`)**.
  - **Outils d'identification active sur les appareils inconnus** :
    - Base **IEEE OUI** embarquée hors-ligne + lecture des bases OUI système.
    - Scan asynchrone des **34 ports TCP clés** et capture automatique du `<title>` HTTP/HTTPS, de l'en-tête `Server:` et de la bannière SSH.
    - Détection des **adresses MAC privées / aléatoires** (bit *Locally Administered* iOS/Android) avec corrélation par `Hostname` et statut **Invité temporaire (24h)** ou **Ignoré**.
    - Fingerprinting automatique en 15 catégories d'appareils avec icônes dédiées.
  - **Système d'alertes d'intrusion temps réel** :
    - Exécution automatique d'une commande de notification Jeedom (Mobile, Telegram, Mail, TTS...) avec variables personnalisables et publication dans le Centre de Messages Jeedom.
  - **Pont IP (Synchronisation automatique des changements d'IP DHCP)** vers les équipements d'autres plugins Jeedom.
  - **Widgets « Dark Glass » (`alt-erre` v1.2)** pour Dashboard et Mobile (9 thèmes de couleur) avec tiroir d'identification rapide des inconnus intégré au widget Radar + compatibilité **Kiosk TV 10-Foot (`getKioskWidgetData`)**.
  - **Conformité stricte aux CGU du Jeedom Market** : zéro secret dans `ps aux` (`daemon_config.json` en `0600` supprimé à l'arrêt), protection `.htaccess` des inventaires et zéro dépendance Copyleft GPL/AGPL.
