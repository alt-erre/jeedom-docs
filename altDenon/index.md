# Plugin Jeedom — Alt AVR Control (Denon / Marantz) (`altDenon`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Home-Cinéma  

---

## Présentation

Le plugin **Alt Denon (`altDenon`)** permet de piloter et superviser **100 % en local** (sans aucun cloud) les amplificateurs Home-Cinéma et Hi-Fi **Denon** et **Marantz**, avec une prise en charge intégrale du vaisseau amiral 13.2 canaux **Denon AVC-X8500HA** ainsi que de l'ensemble des gammes modernes et historiques :

- **Vaisseaux amiraux Denon 13.2ch / 15.4ch (8K HDMI 2.1) :** **Denon AVC-X8500HA**, **AVC-X8500H**, **AVC-A1H**, **AVC-A110**
- **Série Denon AVC-X / AVR-X :** **AVC-X6800H**, **AVC-X6700H**, **AVC-X4800H**, **AVC-X4700H**, **AVC-X3800H**, **AVC-X3700H**, **AVR-X2800H**, **AVR-X1800H** et générations précédentes (`X1000` à `X7200WA`)
- **Série Denon S & Amplis HEOS :** **AVR-S970H**, **AVR-S770H**, **AVR-S670H**, **DRA-800H**, **DRA-900H**, **PMA-900HNE**, **HEOS Amp / Link**
- **Amplificateurs Marantz compatibles :** **Cinema 30 / 40 / 50 / 60 / 70s**, **AV 10**, **SR8015 / SR7015 / SR6015 / SR5015**

---

## Architecture Tri-Protocole Locale (Spécial Denon AVC-X8500HA)

1. **Protocole Temps Réel Denon AVR Control (TCP Port `23` — Push `< 50 ms`) :**
   - Maintient une connexion TCP persistante avec l'amplificateur via un **Hub IP mutualisé (`DenonHostHub`)** : même si plusieurs équipements Jeedom (*Main Zone*, *Zone 2*, *Zone 3*) partagent la même adresse IP, une seule connexion TCP `23` est ouverte vers l'ampli.
   - Remonte **instantanément** chaque changement de volume (molette physique, télécommande IR, HDMI CEC/eARC), de sourdine, d'entrée, de mode surround, de sortie HDMI ou de réglage Audyssey sans attendre un cycle cron.
2. **API HTTP XML `AppCommand.xml` & `formiPhoneAppDirect.xml` (Port `8080` HEOS & Port `80` Legacy) :**
   - Découverte automatique en 1 clic des **entrées renommées** (`GetRenameSource`) et du **filtre des entrées activées/masquées** (`GetDeletedSource`), y compris l'entrée dédiée **`8K`** du **Denon AVC-X8500HA**.
   - Assure un **Mode HTTP local direct (sans démon)** ou un **repli automatique (fallback)** si le démon Python est arrêté.
3. **Protocole HEOS CLI (TCP Port `1255`) :**
   - Détection automatique du modèle exact (ex. `Denon AVC-X8500HA`), du nom réseau et de la version de firmware.
   - Remontée en temps réel des **métadonnées de lecture musicale** (`Titre`, `Artiste`, `Album`, `URL de la pochette`, `Statut Play/Pause/Stop`) lors de l'écoute sur `HEOS Music / NET` (Spotify, TIDAL, Qobuz, AirPlay, TuneIn, DLNA, USB).
   - Découverte et lancement direct des **Favoris HEOS**.

---

## Fonctionnalités prises en charge

### 1. Alimentation, Volume Haute Précision (dB & %) et Sourdine
- **Alimentation :** `On`, `Off`, `Basculer Alimentation`, `Etat` (zone) et `Alimentation Générale`.
- **Double échelle de Volume synchronisée :**
  - **Échelle relative en dB** (`-80.0 dB` à `+18.0 dB` au pas de `0.5 dB` supporté par l'AVC-X8500HA).
  - **Échelle absolue** (`0` à `98`), avec commandes `Volume +`, `Volume -`, `Muet`, `Muet On`, `Muet Off`.

### 2. Entrées (Sources) Dynamiques & Entrée `8K`
- Synchronisation automatique des entrées actives et de leurs noms personnalisés dans l'ampli (`CBL/SAT`, `DVD`, `Blu-ray`, `Game`, **`8K`**, `Media Player`, `TV Audio`, `AUX1`, `AUX2`, `CD`, `Phono`, `Tuner`, `HEOS Music`, `Bluetooth`, `iPod/USB`).

### 3. Sorties Vidéo HDMI Dual Monitor (Association TV + Vidéoprojecteur JVC)
- Sélection directe et retour d'état de la sortie HDMI active :
  - **`Sortie HDMI : Monitor 1 (TV)`** (`VSMONI1`)
  - **`Sortie HDMI : Monitor 2 (Projecteur)`** (`VSMONI2` — idéal pour basculer vers un vidéoprojecteur Home-Cinéma tel que le **JVC DLA-NZ9**)
  - **`Sortie HDMI : Auto (Dual)`** (`VSMONIAUTO`)
- Sélection de la sortie Audio HDMI (`Ampli` vs `TV`).

### 4. Modes Surround 13.2ch & Calibrage Audyssey MultEQ XT32
- **Modes Audio / Surround :** `Movie`, `Music`, `Game`, `Direct`, `Pure Direct`, `Stereo`, `Auto`, `Dolby Atmos / Surround`, `DTS:X Pro / Neural:X`, `Auro-3D`, `Auro-2D Surround`, `Multi Ch Stereo`, `Virtual`.
- **Calibrage Audyssey MultEQ XT32 :** `Reference (Audyssey)`, `L/R Bypass`, `Flat`, `Off`.
- **Traitements dynamiques :** `Dynamic EQ` (`On`/`Off`/`Toggle`), `Dynamic Volume` (`Off`, `Light`, `Medium`, `Heavy`), `Audyssey LFC` (`On`/`Off`/`Toggle`), `Dialog Enhancer` (`Off`, `Low`, `Medium`, `High`).
- **Mémoires d'enceintes :** Bascule rapide entre **`Speaker Preset 1`** et **`Speaker Preset 2`** (`SPPR 1` / `SPPR 2`) et réglage des niveaux **Canal Central** (`-12` à `+12 dB`) et **Subwoofer** (`-12` à `+12 dB`).

### 5. Quick Select 1 à 4, Multi-Zones (Zone 2 & Zone 3), Mode ECO & Télécommande OSD
- **Quick Select :** Rappel direct et retour d'état des 4 mémoires `Quick Select 1 à 4` (`MSQUICK1..4`).
- **Multi-Zones flexible :** Pilotage de `Zone 2` et `Zone 3` directement intégré dans l'équipement principal **ou** via des équipements dédiés partageant le même démon TCP.
- **Mode ECO & Veille :** Sélection `Auto / On / Off` et minuterie de veille (`Sleep Timer` `0` à `120 min`).
- **Télécommande OSD intégrée :** Pavé directionnel `Haut`, `Bas`, `Gauche`, `Droite`, `OK / Entrée`, `Menu Setup`, `Retour`, `Info OSD`, `Option`.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud) :** Toutes les communications s'effectuent exclusivement sur votre réseau local (LAN) entre votre box Jeedom et votre amplificateur Denon / Marantz via les ports locaux TCP `23` (AVR Control), HTTP `8080`/`80` (`AppCommand.xml`) et TCP `1255` (HEOS CLI). Aucun compte cloud, mot de passe externe ni serveur tiers n'est utilisé.
- **Données stockées :** Seuls l'adresse IP locale, le nom du modèle, la liste des entrées renommées et les favoris locaux de l'amplificateur sont enregistrés dans la base de données locale de votre box Jeedom pendant la durée de vie de l'équipement. La liste des équipements transmise au démon local utilise un fichier temporaire dans `jeedom::getTmpFolder('altDenon')` verrouillé par des permissions strictes (`chmod 0600`) et supprimé à l'arrêt du démon (`@unlink`).
- **Mesures de sécurité réseau :**
  - Le socket interne du démon Python écoute exclusivement sur l'interface de bouclage locale (`127.0.0.1`, port `55094` par défaut) et vérifie systématiquement la clé API interne Jeedom du plugin à chaque requête.
  - Les protocoles locaux Denon AVR / HEOS ne comportant pas de chiffrement natif sur le LAN, il est recommandé d'utiliser ce plugin sur un réseau local domestique protégé (WPA2/WPA3 ou VLAN domotique/multimédia dédié) et de ne jamais exposer les ports `23`, `80`, `1255` ou `8080` de l'amplificateur sur Internet.

---

## Auteur & Licence

- **Auteur :** Aurélien Léovant (`alt-erre`)
- **Copyright :** © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS, Denon, Marantz ou Masimo Consumer).
- **Licence :** Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
