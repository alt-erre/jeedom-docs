# Plugin Jeedom - Alt Ciné Projector (JVC D-ILA) (`altJvcProjector`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés  
**Catégorie :** Multimédia / Home-Cinéma  

---

## Présentation

Le plugin **Alt JVC Projector (`altJvcProjector`)** permet de piloter et superviser **100 % en local** (sans aucun cloud) les vidéoprojecteurs Home-Cinéma **JVC D-ILA**, avec une prise en charge complète du vaisseau amiral **JVC DLA-NZ9 (RS4100)** ainsi que de l'ensemble des gammes Laser BLU-Escent et Lampe NSH :

- **Série NZ Laser BLU-Escent 8K e-shiftX / e-shift :** **JVC DLA-NZ9** (`RS4100`), **DLA-NZ8** (`RS3100`), **DLA-NZ7** (`RS2100`)
- **Série NZ Gen3 Laser BLU-Escent (2024+) :** **DLA-NZ900** (`RS4200`), **DLA-NZ800** (`RS3200`), **DLA-NZ700** (`RS2200`), **DLA-NZ500** (`RS1200`)
- **Série NP / N / NX 4K Natif :** **DLA-NP5** (`RS1100`), **DLA-NX9** (`RS3000`), **DLA-N7** (`RS2000`), **DLA-N5** (`RS1000`)
- **Série Z1 & Série X :** **DLA-Z1** (`RS4500`), **DLA-X5000 / X7000 / X9000 / X5900 / X7900 / X9900**

---
### 🌟 Atouts Exclusifs & Architecture Différenciante

- **Authentification native chiffrée SHA-256 PJTalk (100 % local)** : prise en charge native du handshake chiffré SHA-256 (`password` + `JVCKWPJ`) introduit sur les séries Laser **DLA-NZ9 / NZ8 / NZ7 / NP5 / NZ900 / NZ800** (ainsi que NX/N/X), fonctionnant intégralement en réseau local sans dépendance externe.
- **Verrouillage de session TCP unique anti-collision** : gestion intelligente d'une file d'attente unifiée (`asyncio.Lock` en mode Démon ou gestion de session stricte en PHP direct) éliminant tout risque de collision TCP sur le port `20554`, garantissant la stabilité du contrôleur réseau monocouche JVC.
- **Télémétrie HDMI 2.1 48G/8K & Frame Adapt HDR approfondi** : diagnostic précis du débit de liaison FRL (jusqu'à 48 Gbps), compression DSC 8K, statut 8K60/4K120, format HDR dynamique (Frame Adapt HDR image par image ou scène par scène, HDR10+, Filmmaker Mode) et Theater Optimizer.
- **Rappel direct des 10 mémoires d'objectif motorisées (Lens Memory)** : bascule instantanée entre ratios d'aspect (16:9, 2.35:1 Cinémascope) avec temporisation d'attente étendue (30 s) adaptée à la cinématique mécanique des optiques tout verre JVC 65 mm et 100 mm.
- **Contrôle fin de la puissance Laser de 0 à 100 % (101 paliers)** : réglage micrométrique du laser (`PMCV`), couplé au contrôle dynamique et aux algorithmes Gen3 (Deep Black, Highlight Color, Smoother).
- **Protection thermique active & cycle de refroidissement sécurisé** : surveillance en continu des états de veille, préchauffage et refroidissement thermique (`PW0` / `PW1`), empêchant toute extinction brutale avant achèvement du cycle de sécurité laser/matrice.

---

## Prérequis, Compatibilités & Matériels Testés

- **Plateforme Jeedom de référence :** La majorité des tests et développements ont été réalisés en conditions réelles sur une box officielle **Jeedom Luna 4G LoRaWAN** (ARM64, 2 Go de RAM, mémoire eMMC). Compatible avec **Jeedom $\ge$ 4.2** (Luna, Atlas, Smart, Raspberry Pi, VM et Docker sous Debian 11 / 12, Python $\ge$ 3.9).
- **Prérequis réseau & projecteur :**
  - Vidéoprojecteur JVC connecté en Ethernet RJ45 au même réseau local (LAN) que Jeedom (port TCP `20554` PJTalk).
  - Mot de passe réseau JVC (`Network Password` sur les séries DLA-NZ / NP5) renseigné dans la configuration de l'équipement. *Note : le contrôleur réseau JVC n'acceptant qu'une seule connexion TCP simultanée, n'interrogez pas le port `20554` avec un second automate en même temps.*
- **Matériel physiquement testé et validé par l'auteur :**
  - **Vidéoprojecteur Home-Cinéma JVC D-ILA série DLA-NZ (Laser BLU-Escent)**.
- **Autres modèles compatibles (protocole officiel JVC PJTalk TCP `20554`) :**
  - Séries **DLA-NZ** (`DLA-NZ9`, `DLA-NZ8`, `DLA-NZ7`, `DLA-NZ900`, `DLA-NZ800`, `DLA-NZ700`, `DLA-NZ500`), **DLA-NP5**, série **DLA-N / NX** (`NX9`, `N7`, `N5`), **DLA-Z1** et série **DLA-X** (`X5000` à `X9900`).

---

## Fonctionnalités principales (série JVC DLA-NZ)

1. **Protocole officiel JVC External Control TCP/IP (Port `20554`) :**
   - Handshake complet `PJ_OK` &rarr; `PJREQ` &rarr; `PJACK`.
   - Support natif de l'authentification **SHA-256 (`password` + `JVCKWPJ`)** introduite sur les **DLA-NZ9 / NZ8 / NZ7 / NP5 / NZ900 / NZ800**, avec bascule automatique sur l'authentification 16 octets ou sans mot de passe pour les générations précédentes.
   - Regroupement intelligent des lectures sur **une seule session TCP** afin de respecter la contrainte matérielle JVC (une seule connexion TCP simultanée autorisée).
2. **Double mode de fonctionnement au choix :**
   - **Mode Socket TCP Direct (par défaut, sans dépendance Python) :** Jeedom interroge et commande directement le vidéoprojecteur en PHP.
   - **Mode Démon Python Temps Réel :** Maintient une file d'attente asynchrone (`asyncio.Lock`) garantissant zéro collision TCP entre le rafraîchissement périodique et les ordres de scénarios.
3. **Contrôle complet du JVC DLA-NZ9 (Intégration intégrale du protocole PJTalk) :**
   - **Alimentation :** Allumer (`PW1`), Éteindre (`PW0`), retour d'état précis (`Veille`, `Préchauffage`, `Allumé`, `Refroidissement`, `Erreur`, `Hors ligne`) et lecture de la **Version Firmware** (`IFSV`).
   - **Entrées & Diagnostic HDMI 2.1 (48 Gbps / 8K) :** Bascule `HDMI 1` / `HDMI 2`, détection du signal actif, lecture de la **Résolution & Fréquence source** (jusqu'à **8K 60Hz** et **4K 120Hz**), **Débit de liaison HDMI 2.1 (`IFLR` : FRL 40 / 32 / 24 / 18 / 9 Gbps)**, **Compression DSC 8K (`IFDS`)**, **Format HDR** (`SDR`, `HDR10`, `HDR10+`, `HLG`), **Profondeur couleur** (`8/10/12-bit`), **Espace colorimétrique** (`RGB`, `YCbCr 4:4:4 / 4:2:2 / 4:2:0`), **Colorimétrie** (`BT.2020`, `DCI-P3`, `BT.709`), ainsi que le pilotage de la **Plage dynamique HDMI (`ISIL` : Auto / Standard 16-235 / Enhanced 0-255 / Super White)**, de l'**Espace HDMI forcé (`ISHS`)**, du **Mode 2D/3D (`IS3D`)** et de l'**ALLM (`ISAL`)**.
   - **Laser BLU-Escent & Contrôle Fin 0-100 % :** Compteur d'heures Laser (`IFLT`), réglage de la **Puissance Laser** (`Bas / Moyen / Haut`), du **Contrôle Fin de Puissance Laser de `0 %` à `100 %` (`PMCV`, 101 paliers)**, du **Contrôle Dynamique Laser** (`Off`, `Mode 1`, `Mode 2`, `Mode 3`) et des traitements Gen3 (**Deep Black `PMBK`**, **Highlight Color `PMBE`**, **Smoother `PMST`**).
   - **Optique motorisée 100 mm, Iris, Masquage & Trigger 12V :** Rappel direct des **10 Mémoires d'Installation (Lens Memory 1 à 10)** (`INML` avec délai étendu 30s), **Iris / Ouverture d'objectif intelligente (`PMDI` : Off / Auto 1 / Auto 2)** et **Ouverture manuelle de `-15` à `0` (`PMAA`)**, **Masquage d'écran (`ISMA` : Off / On / Custom)**, **Sortie Trigger 12V (`FUTR` : Off / Power / Anamorphic / Inst 1..10)**, **Minuterie d'arrêt (`FUOT`)**, **Modes Anamorphiques (`Off`, `A`, `B`, `C`, `D`)**, **Ratio d'aspect (`Zoom`, `Auto`, `Native`)**, **Hide (Masquage image)**.
   - **Traitement d'image, Frame Adapt HDR, Theater Optimizer & Calibration :** Sélection du **Mode Image** (`Frame Adapt HDR 1/2/3`, `Filmmaker Mode`, `Cinema`, `Film`, `Natural`, `HDR10`, `HDR10+`, `HLG`, `Pana PQ`, `User 1..6`), **Forçage du Type de Contenu (`PMCT` : Auto / SDR / HDR10 / HDR10+ / HLG)**, **Bascule automatique du Mode Image par signal (`ISS2` SDR 2D, `ISS3` SDR 3D, `ISHD` HDR10, `ISHL` HLG, `ISFS` Filmmaker Auto)**, **Profil Couleur** (`DCI-P3`, `BT.2020 Wide/Normal`, `BT.709`, `Cinema`, `Film 1/2`, `Custom 1..6`), **Température de Couleur (`PMCL` : `5500K` à `9300K`, `HDR10`, `HLG`, `Custom 1/2` et modes **Lampe Xenon 1 / Xenon 2** exclusifs aux DLA-NZ9/NZ8)**, **Correction de température (`PMCC`)**, **Table Gamma (`PMGT` : `Normal`, `A/B/C/D`, `2.4`, `2.6`, `Cinema 1/2`, `Film 1/2`, `ST.2084`, `HLG`, `Custom 1..3`)**, **CMS 6 Axes (`PMCB`)**, **Sliders d'image (`Luminosité`, `Contraste`, `Couleur`, `Teinte`, `Netteté MPC`, `Réduction de bruit`)**, **8K e-shiftX** (`On`/`Off`), **Theater Optimizer** (`On`/`Off`, **Niveau `PMNL`** et **Recalcul immédiat `PMNP`**), **Niveau HDR Frame Adapt** (`Auto`, `Auto Wide`, `-2` à `+2`), **Traitement Frame Adapt** (`Image par image` / `Scène par scène`), **Clear Motion Drive (`CMD`)**, **Motion Enhance**, **Mode Faible Latence (`Low Latency` 4K120)**.
   - **Télécommande OSD intégrée :** Navigation complète (`Menu`, `Haut`, `Bas`, `Gauche`, `Droite`, `OK`, `Retour`, `Info`, `Input`, `HDMI 1/2`, `Lens Control`, `Lens Aperture`, `Anamorphic`, `Setting Memory`, `Mode 1..10`, `Gamma Settings`, `MPC`, `CMD`, `Menu Avancé`).

---

## 💡 Idées de Scénarios & Synergies avec l'Écosystème `alt-erre`

Grâce à son intégration native dans Jeedom, le plugin s'associe harmonieusement avec les autres solutions de l'écosystème `alt-erre` pour enrichir votre quotidien :

### 1. Lancement Grand Spectacle Salle Obscure
- **Déclencheur** : Lancement d'un film ou appui sur « Cinéma » sur la télécommande.
- **Action & Synergie** : Allumage de la matrice laser D-ILA, descente de l'écran motorisé, mémoire de zoom d'objectif 16:9 ou Cinemascope et configuration audio Auro-3D.
- **Plugins complémentaires associés** :
  - [Alt AVR Control (Denon / Marantz)](https://alt-erre.github.io/jeedom-docs/altDenon/) : commutation audio-vidéo et décodage multicanal.
  - [Alt Air Média](https://alt-erre.github.io/jeedom-docs/altAirMedia/) : lecteur multimédia 4K.
  - [Alt Habitat & Domotique (Delta Dore Tydom)](https://alt-erre.github.io/jeedom-docs/altTydom/) : commande de l'écran et des volets occultants.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : extinction progressive des spots de salle.

### 2. Entracte & Pause Confort Automatique
- **Déclencheur** : Mise en pause de la lecture vidéo.
- **Action & Synergie** : Relèvement doux des lumières à 15 % et passage du laser en mode éco sur mise en pause du film.
- **Plugins complémentaires associés** :
  - [Alt Air Média](https://alt-erre.github.io/jeedom-docs/altAirMedia/) : détection de mise en pause de lecture.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : balisage de sécurité lumineux.
  - [Alt Café & Home Connect (Siemens)](https://alt-erre.github.io/jeedom-docs/altSiemens/) : préparation de boisson chaude à l'entracte.

### 3. Fin de Séance & Refroidissement Thermique Protégé
- **Déclencheur** : Fin de projection ou extinction de la séance.
- **Action & Synergie** : Extinction du laser avec surveillance du cycle de refroidissement thermique avant coupure générale.
- **Plugins complémentaires associés** :
  - [Alt Habitat & Domotique (Delta Dore Tydom)](https://alt-erre.github.io/jeedom-docs/altTydom/) : relevage de l'écran motorisé.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : retour à l'éclairage de pièce.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud)** : Toutes les communications s'effectuent directement sur votre réseau local (LAN) entre votre box Jeedom et votre vidéoprojecteur JVC sur le port TCP `20554`. Aucune information ne transite par Internet ni par un serveur tiers.
- **Avis de confidentialité et protection du mot de passe réseau JVC** :
  - Si votre vidéoprojecteur (ex. série DLA-NZ / NP5) requiert un code/mot de passe de contrôle réseau (`Network Password`), celui-ci est utilisé exclusivement pour générer le condensat d'authentification locale (`SHA-256(password + "JVCKWPJ")` ou `PJREQ`) lors du handshake TCP avec le projecteur.
  - Ce mot de passe est conservé uniquement en local dans la configuration Jeedom de l'équipement et, lorsque le démon Python est actif, dans un fichier temporaire sécurisé (`chmod 0600`, accessible au seul processus système Jeedom et supprimé à l'arrêt du démon). Il est définitivement effacé lors de la suppression de l'équipement.
- **Mesures de sécurité réseau recommandées** :
  - Le démon Python écoute uniquement sur `127.0.0.1` (port `55091` par défaut) et vérifie la clé API interne Jeedom à chaque commande.
  - Il est recommandé d'activer un mot de passe réseau dans le menu *Réseau* du vidéoprojecteur JVC et de ne jamais exposer le port TCP `20554` sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) - Création originale et indépendante (non affiliée à Jeedom SAS ni à JVCKENWOOD Corporation).
- **Licence** : Propriétaire - Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.

