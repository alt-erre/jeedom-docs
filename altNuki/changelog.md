# Changelog - Alt Serrure & Accès (Nuki) (`altNuki`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.7] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.6] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altNuki.html`, `core/template/mobile/altNuki.html`, `core/class/altNuki.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.5] - 2026-11-02 (Canal Beta)

### Ajouté & Amélioré
- **Auto-Apprentissage (Auto-Discovery) des codes et empreintes du Nuki Keypad physique (`autoLearnKeypadEntry()`)** :
  - Lorsqu'un membre du foyer déverrouille la serrure via le Nuki Keypad physique (1.0 ou 2.0 Fingerprint) en mode MQTT Local (`lockActionEvent`), tout nouvel identifiant `CodeId` ou `AuthId` est désormais automatiquement ajouté à la table de l'onglet **Clavier Nuki Keypad & Utilisateurs** avec le badge **`Auto-détecté - renommez-moi`**, et synchronisé entre la serrure et son équipement Keypad dédié.
  - Ajout d'un bouton **« Actualiser les codes auto-détectés »** dans l'onglet *Clavier Nuki Keypad & Utilisateurs* permettant de recharger en 1 clic les entrées nouvellement détectées sans recharger la page.
  - Visibilité par défaut activée sur les commandes **`Dernier CodeId Keypad`** (`last_keypad_code_id`) et **`Dernier AuthId Keypad`** (`last_keypad_auth_id`) de l'équipement Keypad dédié.
- **Documentation (`README.md`) enrichie** :
  - Ajout d'un comparatif détaillé **Nuki Bridge HTTP vs MQTT Local** (cohabitation Wi-Fi / Bridge sur les Smart Lock Pro, impact 0 % sur les piles et différences fonctionnelles pour le Keypad).
  - Documentation pas-à-pas de l'**auto-apprentissage des utilisateurs du Keypad physique** et de la distinction avec le pavé numérique virtuel à code PIN local du widget Jeedom.

## [0.1.0-beta.4] - 2026-11-01 (Canal Beta)

### Corrigé
- **Prévention et nettoyage automatique des serrures créées en double lors de la synchronisation initiale** :
  - Ajout d'un verrou fichier exclusif inter-processus (`flock(LOCK_EX)` sur `/tmp/jeedom/altNuki/sync.lock`) autour de `handleIncomingDeviceData()`, `handleIncomingBridgeData()` et `createOrUpdateKeypadForLock()` afin d'empêcher deux requêtes PHP concurrentes (`jeeAltNuki.php` + retour synchrone de `syncDevices()`, ou remontée simultanée Nuki Bridge + MQTT Local) de créer deux équipements identiques lorsque `object_id` vaut `NULL` (`Aucun`).
  - Fusion par `nuki_id_hex` (`get_merged_devices()`) dans le démon Python `altNukid.py` des équipements découverts à la fois via Nuki Bridge HTTP et via MQTT Local, et suppression du callback HTTP redondant lors d'un appel socket `sync_devices`.
  - Ajout d'une fonction de dédoublonnage automatique (`altNuki::deduplicateEquipments()`) exécutée à la mise à jour du plugin, à l'ouverture de la page du plugin et lors des synchronisations, qui conserve l'équipement principal (affecté à une pièce ou créé en premier), transfère la configuration Keypad éventuelle et supprime automatiquement le doublon.

## [0.1.0-beta.3] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.2] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.2` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.1] - 2026-10-27

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`) du plugin `Alt Serrure & Accès (Nuki)` (`altNuki`)** :
  - **Architecture hybride 100 % Locale (Zéro Cloud)** supportant simultanément :
    1. **L'API HTTP locale du Nuki Bridge** (`port 8080`, authentification chiffrée `SHA-256` `ts + nonce + token` avec repli automatique, découverte LAN automatique, appairage en 1 clic via `/auth` et récepteur HTTP local dédié aux Webhooks temps réel sur le port `55100`).
    2. **Le protocole MQTT Local natif Nuki** (`nuki/<id>/#` via `paho-mqtt`) pour les **Nuki Smart Lock 3.0 Pro, 4.0, 4.0 Pro et Smart Lock Ultra** connectées directement en Wi-Fi ou Thread/Matter sans Bridge matériel.
  - **Prise en charge complète de tous les appareils Nuki** :
    - **Nuki Smart Lock** (1.0, 2.0, 3.0, 3.0 Pro, 4.0, 4.0 Pro, Ultra) & **Nuki Smart Door / Box** (`lock`, `unlock`, `unlatch`, `lock_n_go`, `lock_n_go_unlatch`, `full_lock`, `toggle`, état moteur bloqué, niveau et charge batterie).
    - **Nuki Keypad 1.0 & Nuki Keypad 2.0 Fingerprint** :
      - Suivi intégré sur chaque serrure + création automatique d'un **équipement Jeedom Nuki Keypad dédié** (`nuki_keypad_<id>`).
      - Décodage temps réel de `lockActionEvent` (`LockAction,Trigger,AuthId,CodeId,AutoUnlock`) pour identifier instantanément l'utilisateur ayant déverrouillé par code à 6 chiffres ou empreinte biométrique, ou verrouillé via la touche retour (`←`).
      - Onglet d'administration **Clavier Nuki Keypad & Utilisateurs** permettant d'associer chaque `CodeId` / `AuthId` à un prénom, de définir des codes PIN locaux (hachés en `SHA-256`) avec plages de validité temporaires (Invités / Airbnb), de consulter le journal des 15 derniers passages (`keypad_history_json`) et de déclencher une alerte d'intrusion (`keypad_tamper_alert`) après $N$ codes erronés.
    - **Nuki Door Sensor** (capteur d'ouverture magnétique intégré à la serrure : `door_state`, `door_state_label`, `door_open` binaire inversable, `door_battery_critical`).
    - **Nuki Opener** (interphone connecté : ouverture gâche électrique `unlatch`, activation/désactivation *Ring to Open (RTO)* et *Mode Continu*, détection de sonnerie `ring_action_state`).
    - **Passerelle Nuki Bridge** (supervision `online`, `firmware`, `uptime`, `wlan_connected`, `connected_locks_count`, réenregistrement Webhook et redémarrage).
  - **Widgets personnalisés « Dark Glass » (`alt-erre` v1.2)** pour Dashboard et Mobile avec 9 thèmes de couleur, vignette SVG dynamique (cylindre rotatif Nuki, clavier biométrique Keypad, Opener, Bridge), pavé numérique PIN interactif et journal d'accès déroulant.
  - **Conformité stricte aux CGU du Jeedom Market** : zéro secret dans `ps aux` (`daemon_config.json` en `0600` supprimé à l'arrêt), hachage `SHA-256` des codes PIN et dépendances Python exclusivement permissives dans `resources/venv`.
