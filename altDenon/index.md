# Plugin Jeedom - Alt AVR Control (Denon / Marantz) (`altDenon`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés  
**Catégorie :** Multimédia / Home-Cinéma  

---

## Présentation

Le plugin **Alt Denon (`altDenon`)** permet de piloter et superviser **100 % en local** (sans aucun cloud) les amplificateurs Home-Cinéma et Hi-Fi **Denon** et **Marantz**, avec une prise en charge intégrale du vaisseau amiral 13.2 canaux **Denon AVC-X8500HA** ainsi que de l'ensemble des gammes modernes et historiques :

- **Vaisseaux amiraux Denon 13.2ch / 15.4ch (8K HDMI 2.1) :** **Denon AVC-X8500HA**, **AVC-X8500H**, **AVC-A1H**, **AVC-A110**
- **Série Denon AVC-X / AVR-X :** **AVC-X6800H**, **AVC-X6700H**, **AVC-X4800H**, **AVC-X4700H**, **AVC-X3800H**, **AVC-X3700H**, **AVR-X2800H**, **AVR-X1800H** et générations précédentes (`X1000` à `X7200WA`)
- **Série Denon S & Amplis HEOS :** **AVR-S970H**, **AVR-S770H**, **AVR-S670H**, **DRA-800H**, **DRA-900H**, **PMA-900HNE**, **HEOS Amp / Link**
- **Amplificateurs Marantz compatibles :** **Cinema 30 / 40 / 50 / 60 / 70s**, **AV 10**, **SR8015 / SR7015 / SR6015 / SR5015**

### 🌟 Atouts Exclusifs & Architecture Différenciante

- **Architecture hybride triple protocole 100 % locale** : push TCP temps réel bidirectionnel (port `23`, latence `< 50 ms`) via hub mutualisé `DenonHostHub`, combiné à l'API HTTP XML locale (port `8080`/`80`) et au protocole HEOS CLI (port `1255`).
- **Supervision multi-zones indépendante (Main, Zone 2, Zone 3)** : scission possible en équipements Jeedom distincts par pièce avec partage transparent d'un socket réseau unique.
- **Calibrage acoustique de pointe Audyssey MultEQ XT32 en direct** : réglage natif des courbes de référence, Dynamic EQ, Dynamic Volume, Audyssey LFC et Dialog Enhancer sans passer par l'OSD.
- **Bascule vidéo HDMI Dual Monitor** : commutation immédiate entre téléviseur (Monitor 1) et vidéoprojecteur Home-Cinéma (Monitor 2).
- **Protection acoustique active (`volume_max_set`)** : plafonnement dynamique du volume par zone et par mode, avec abaissement automatique en cas de hausse manuelle (télécommande IR, molette façade ou eARC).

---

## Prérequis, Compatibilités & Matériels Testés

- **Plateforme Jeedom de référence :** La majorité des tests et développements ont été réalisés en conditions réelles sur une box officielle **Jeedom Luna 4G LoRaWAN** (ARM64, 2 Go de RAM, mémoire eMMC). Compatible avec **Jeedom $\ge$ 4.2** (Luna, Atlas, Smart, Raspberry Pi, VM et Docker sous Debian 11 / 12, Python $\ge$ 3.9).
- **Prérequis réseau :**
  - Amplificateur connecté au même réseau local (LAN/Wi-Fi) que Jeedom (ports locaux TCP `23` AVR Control, HTTP `80`/`8080` et TCP `1255` HEOS CLI).
  - Dans le menu de l'amplificateur (*Réseau $\rightarrow$ Contrôle réseau*), régler l'option sur **« Toujours activé » (*Always On*)** pour permettre l'allumage à distance.
- **Matériel physiquement testé et validé par l'auteur :**
  - **Amplificateur Home-Cinéma 13.2 canaux Denon AVC-X8500HA**.
- **Autres équipements compatibles (même protocole Denon AVR Control / HEOS) :**
  - Ensemble des amplificateurs réseau **Denon** (`AVC-A1H`, `AVC-A110`, `AVC-X8500H`, `AVC-X6800H` à `AVR-X1800H`, générations `X1000` à `X7200WA`, séries `AVR-S`, `DRA`, `PMA`) et **Marantz** (`AV 10`, `Cinema 30` à `70s`, `SR5015` à `SR8015`).

---

## Architecture Tri-Protocole Locale (Spécial Denon AVC-X8500HA)

1. **Protocole Temps Réel Denon AVR Control (TCP Port `23` - Push `< 50 ms`) :**
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
  - **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** : commandes `volume_max` et `volume_max_set` permettant de définir un plafond de volume selon le mode de la maison (ex. *Nuit enfant*), avec bridage visuel du curseur sur le widget et **abaissement automatique immédiat** si le volume de l'ampli dépasse ce plafond.

### 2. Entrées (Sources) Dynamiques & Entrée `8K`
- Synchronisation automatique des entrées actives et de leurs noms personnalisés dans l'ampli (`CBL/SAT`, `DVD`, `Blu-ray`, `Game`, **`8K`**, `Media Player`, `TV Audio`, `AUX1`, `AUX2`, `CD`, `Phono`, `Tuner`, `HEOS Music`, `Bluetooth`, `iPod/USB`).

### 3. Sorties Vidéo HDMI Dual Monitor (Association TV + Vidéoprojecteur JVC)
- Sélection directe et retour d'état de la sortie HDMI active :
  - **`Sortie HDMI : Monitor 1 (TV)`** (`VSMONI1`)
  - **`Sortie HDMI : Monitor 2 (Projecteur)`** (`VSMONI2` - idéal pour basculer vers un vidéoprojecteur Home-Cinéma tel que le **JVC DLA-NZ9**)
  - **`Sortie HDMI : Auto (Dual)`** (`VSMONIAUTO`)
- Sélection de la sortie Audio HDMI (`Ampli` vs `TV`).

### 4. Modes Surround 13.2ch & Calibrage Audyssey MultEQ XT32
- **Modes Audio / Surround :** `Movie`, `Music`, `Game`, `Direct`, `Pure Direct`, `Stereo`, `Auto`, `Dolby Atmos / Surround`, `DTS:X Pro / Neural:X`, `Auro-3D`, `Auro-2D Surround`, `Multi Ch Stereo`, `Virtual`.
- **Calibrage Audyssey MultEQ XT32 :** `Reference (Audyssey)`, `L/R Bypass`, `Flat`, `Off`.
- **Traitements dynamiques :** `Dynamic EQ` (`On`/`Off`/`Toggle`), `Dynamic Volume` (`Off`, `Light`, `Medium`, `Heavy`), `Audyssey LFC` (`On`/`Off`/`Toggle`), `Dialog Enhancer` (`Off`, `Low`, `Medium`, `High`).
- **Mémoires d'enceintes :** Bascule rapide entre **`Speaker Preset 1`** et **`Speaker Preset 2`** (`SPPR 1` / `SPPR 2`) et réglage des niveaux **Canal Central** (`-12` à `+12 dB`) et **Subwoofer** (`-12` à `+12 dB`).

### 5. Quick Select 1 à 4, Multi-Zones (Zone 2 & Zone 3), Mode ECO & Télécommande OSD
- **Quick Select :** Rappel direct et retour d'état des 4 mémoires `Quick Select 1 à 4` (`MSQUICK1..4`).
- **Multi-Zones flexible (Intégré ou Dissocié en équipements distincts) :**
  - **Mode intégré** : pilotage rapide de `Zone 2` et `Zone 3` directement depuis le tiroir de l'équipement `Zone Principale (MAIN)`.
  - **Mode dissocié en 1 clic (`Dissocier les zones (Z2 / Z3)`)** : possibilité de scinder un même amplificateur physique en **2 ou 3 équipements Jeedom indépendants** (`Main Zone`, `Zone 2`, `Zone 3`), chacun affectable à une pièce différente (*Salon*, *Terrasse*, *Chambre*), doté de son propre widget dédié, de son propre plafond de volume (`volume_max`) et de ses sources personnalisées, tout en **partageant une unique connexion TCP `23` / HEOS `1255`** dans le démon (`DenonHostHub`).
- **Mode ECO & Veille :** Sélection `Auto / On / Off` et minuterie de veille (`Sleep Timer` `0` à `120 min`).
- **Télécommande OSD intégrée :** Pavé directionnel `Haut`, `Bas`, `Gauche`, `Droite`, `OK / Entrée`, `Menu Setup`, `Retour`, `Info OSD`, `Option`.

---

## 💡 Idées de Scénarios & Synergies avec l'Écosystème `alt-erre`

Grâce à son intégration native dans Jeedom, le plugin s'associe harmonieusement avec les autres solutions de l'écosystème `alt-erre` pour enrichir votre quotidien :

### 1. Soirée Home-Cinéma Auro-3D & Immersion Totale
- **Déclencheur** : Lancement du mode cinéma depuis la télécommande ou Jeedom.
- **Action & Synergie** : Allumage de l'amplificateur Denon, sélection de l'entrée Apple TV, format Auro-3D/Atmos, descente de l'écran motorisé et allumage du projecteur laser.
- **Plugins complémentaires associés** :
  - [Alt Ciné Projector (JVC D-ILA)](https://alt-erre.github.io/jeedom-docs/altJvcProjector/) : allumage du projecteur D-ILA et calibration laser.
  - [Alt Air Média](https://alt-erre.github.io/jeedom-docs/altAirMedia/) : lecteur source Apple TV 4K.
  - [Alt Habitat & Domotique (Delta Dore Tydom)](https://alt-erre.github.io/jeedom-docs/altTydom/) : descente de l'écran de projection.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : extinction progressive des lumières.

### 2. Mode Nuit & Plafond Dynamique de Volume Automatique
- **Déclencheur** : Activation du mode nuit ou horaire tardif.
- **Action & Synergie** : Compression dynamique nocturne, rehaussement des dialogues et limitation du volume sonore (`volume_max_set` à 35 dB).
- **Plugins complémentaires associés** :
  - [Alt Contrôle Parental (PlayStation)](https://alt-erre.github.io/jeedom-docs/altPlaystation/) & [Alt Contrôle Parental (Xbox)](https://alt-erre.github.io/jeedom-docs/altXbox/) : mise en veille des consoles de jeu.
  - [Alt Multiroom Audio (Sonos)](https://alt-erre.github.io/jeedom-docs/altSonos/) : coupure des zones audio des chambres.

### 3. Diffusion Multi-Zone Extérieure (Zone 2 / Zone 3)
- **Déclencheur** : Présence sur la terrasse ou dans le jardin.
- **Action & Synergie** : Gestion sonore indépendante de la terrasse alimentée par une source multiroom sans perturber le salon.
- **Plugins complémentaires associés** :
  - [Alt Multiroom Audio (Sonos)](https://alt-erre.github.io/jeedom-docs/altSonos/) : flux audio réseau déporté.
  - [Alt Diffusion, Sons & Multiroom (AirPlay)](https://alt-erre.github.io/jeedom-docs/altAirCast/) : streaming musical AirPlay 2.

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
- **Copyright :** © 2026 Aurélien Léovant (`alt-erre`) - Création originale et indépendante (non affiliée à Jeedom SAS, Denon, Marantz ou Masimo Consumer).
- **Licence :** Propriétaire - Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
