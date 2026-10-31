# Changelog — Alt Serrure & Accès (Nuki) (`altNuki`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.3] — 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.2] — 2026-10-31 (Canal Beta)

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
