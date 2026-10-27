# Plugin Jeedom — Alt Audio (Cambridge) (`altCambridgeAudio`)

Plugin Jeedom permettant de piloter **100 % en local** les amplificateurs et lecteurs réseau **Cambridge Audio** utilisant la plateforme **StreamMagic (SMOIP)**, et plus particulièrement le **Cambridge Audio Evo 150** (ainsi que les modèles **Evo 75**, **Evo One**, **CXN**, **CXN v2**, **CXN100**, **MXN10**, **AXN10**, **EXN100**, **Edge NQ**, **851N**).

Conçu dans la même philosophie que le plugin `altDenon`, il offre le choix entre deux modes de fonctionnement :
1. **Mode HTTP local direct (par défaut, sans démon)** : requêtes HTTP locales directes sur le port `80` (`/smoip/...`) et actualisation périodique par cron (`1`, `5` ou `15` minutes) — aucune dépendance ni démon requis.
2. **Mode WebSocket temps réel (démon Python optionnel)** : maintien d'une connexion WebSocket persistante (`ws://<ip>:80/smoip`) avec chaque ampli configuré en mode `websocket` pour une remontée instantanée des changements de volume, d'entrée, d'alimentation, de sortie enceintes et de piste en cours, avec **bascule automatique (fallback) en HTTP** si le démon est arrêté.

---

## Fonctionnalités prises en charge

### 1. Contrôles de base de l'amplificateur (type `altDenon`)
- **Alimentation** : `On`, `Off` (veille réseau `NETWORK`), `Basculer Alimentation` (`toggle`), `Etat` (binaire `0`/`1`).
- **Volume** : `Volume` (info `0` à `100 %`), `Volume niveau` (curseur/slider `0` à `100`), `Volume +`, `Volume -`, ainsi que **`Volume maximum`** (`volume_max`) et **`Volume maximum niveau`** (`volume_max_set`) pour définir dynamiquement un plafond de volume par mode de la maison (ex. *Nuit enfant*) avec abaissement automatique immédiat si le volume de l'ampli dépasse ce plafond.
- **Muet (Mute)** : `Etat Muet` (info binaire), `Muet` (bascule), `Muet On`, `Muet Off`.
- **Rafraîchissement** : commande `Rafraîchir` pour interroger immédiatement l'ampli.

### 2. Sélection dynamique des entrées (Sources)
- Découverte automatique des entrées activées et renommées dans l'application StreamMagic via `/smoip/system/sources`.
- Création automatique des entrées par défaut du **Cambridge Audio Evo 150** si l'ampli est hors ligne lors de la création :
  - `TV eARC` (`TV_ARC`)
  - `Analogue 1 (RCA)` (`ANALOGUE1`)
  - `Analogue 2 (XLR Balanced)` (`ANALOGUE2`)
  - `Phono MM` (`PHONO_MM`)
  - `Coaxial (S/PDIF)` (`SPDIF_COAX`)
  - `Optical 1 (TOSLINK)` (`SPDIF_TOSLINK`)
  - `Optical 2 (TOSLINK)` (`SPDIF_TOSLINK2`)
  - `USB Audio` (`USB_AUDIO`)
  - `Bluetooth` (`BLUETOOTH`)
  - `Internet Radio` (`IR`)
  - `Media Player (UPnP)` (`MEDIA_PLAYER`)
  - `AirPlay` (`AIRPLAY`), `Spotify` (`SPOTIFY`), `TIDAL Connect` (`TIDAL`), `Qobuz` (`QOBUZ`), `Chromecast` (`CAST`), `Roon Ready` (`ROON`).
- Informations `Entrée` (nom convivial) et `ID Entrée` (identifiant technique SMOIP).

### 3. Sorties Audio (Spécifique Cambridge Audio Evo 150)
- Informations `Sortie audio` (libellé) et `ID Sortie audio`.
- Commandes d'action dédiées (et synchronisées dynamiquement via `/smoip/zone/audio/output`) :
  - `Sortie : Speaker A` (`output_SPEAKER_A`)
  - `Sortie : Speaker B` (`output_SPEAKER_B`)
  - `Sortie : Speaker A+B` (`output_SPEAKER_A_B`)
  - Toute autre sortie exposée par l'appareil (ex. casque, pré-out, etc.).

### 4. Contrôles multimédias & Métadonnées de lecture
- **Transport** : `Play / Pause`, `Lecture`, `Pause`, `Stop`, `Précédent`, `Suivant`, `Aléatoire` (`Etat Aléatoire`), `Répéter` (`Etat Répéter`).
- **Métadonnées temps réel** :
  - `Statut lecture` (`play`, `pause`, `stop`, `ready`, etc.)
  - `Titre`
  - `Artiste` (ou station radio)
  - `Album`
  - `Pochette` (URL de la jaquette)
  - `Format audio` (ex. `FLAC / 96 kHz / 24bit` ou `AAC / 320 kbps`)

### 5. Presets StreamMagic
- Commande curseur `Rappeler Preset N°` (`1` à `99`).
- Découverte et création automatique d'une commande d'action pour chaque preset enregistré dans l'appareil (`Preset 1 : ...`, `Preset 2 : ...`) via `/smoip/zone/presets`.

---

## Configuration

1. Activez le plugin **Cambridge Audio** dans Jeedom.
2. Choisissez dans la configuration du plugin :
   - Le **mode de communication par défaut** (`HTTP local direct` ou `WebSocket temps réel`).
   - La **fréquence d'actualisation HTTP** (`Toutes les minutes`, `Toutes les 5 minutes`, `Toutes les 15 minutes`).
3. Créez un équipement dans **Plugins → Multimédia → Cambridge Audio**, renseignez l'**Adresse IP** locale de votre **Evo 150** et sauvegardez.
4. Cliquez sur **Synchroniser Entrées / Sorties / Presets** à tout moment si vous renommez vos entrées ou ajoutez des presets dans l'application StreamMagic.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud)** : Le plugin communique exclusivement sur votre réseau local (LAN) avec votre amplificateur ou lecteur réseau Cambridge Audio via le protocole local `StreamMagic / SMOIP` (`http://<ip>:80/smoip` et `ws://<ip>:80/smoip`). Aucun compte utilisateur, mot de passe ou serveur externe n'est utilisé.
- **Données stockées** : Seuls l'adresse IP locale, le nom des entrées/sorties et les presets de l'appareil sont enregistrés dans la base de données locale de votre box Jeedom, et uniquement pendant la durée d'existence de l'équipement. La configuration transmise au démon local utilise un fichier temporaire à accès restreint (`chmod 0600`).
- **Mesures de sécurité réseau** :
  - Le socket interne du démon Python écoute exclusivement en local (`127.0.0.1`, port `55088` par défaut) et exige la clé API interne Jeedom du plugin.
  - Le protocole local SMOIP de Cambridge Audio ne comportant pas d'authentification native sur le LAN, il est recommandé d'utiliser ce plugin sur un réseau domestique privé et protégé (WPA2/WPA3 ou VLAN domotique/multimédia dédié) et de ne jamais exposer le port `80` de l'amplificateur sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Cambridge Audio).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.


