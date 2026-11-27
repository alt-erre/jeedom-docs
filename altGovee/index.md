# Plugin Jeedom - Alt Éclairages, Rubans RGBIC & Ambiances (Govee) (`altGovee`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés  
**Catégorie :** Lumière (`light`)  
**Protocole :** API Locale **Govee LAN UDP** (`Multicast 239.255.255.250` ports `4001 / 4002 / 4003` + Trames binaires locales `ptReal`) + **OpenAPI v2 Govee** optionnelle (`openapi.api.govee.com`)  
**Version :** `0.1.0-beta.9`  
**Compatibilité :** Jeedom $\ge$ 4.2 (Luna, Atlas, Smart, Raspberry Pi, Docker, VM Debian 11 / 12, Python $\ge$ 3.9)

---

## Présentation

Le plugin **Alt Éclairages, Rubans RGBIC & Ambiances (Govee) (`altGovee`)** permet de découvrir, piloter et superviser **100 % en local** (via l'API LAN UDP officielle Govee et les trames binaires `ptReal`, avec enrichissement OpenAPI v2 optionnel) l'ensemble des éclairages connectés et décorations matricielles **Govee** :

- **Rideaux Matriciels LED & Groupes Assemblés (1x, 2x ou 3x) :** **Govee Curtain Lights Pro (`H70B3`, `H70B4`, `H70B5` - `30×32 = 960 LEDs` par panneau)** et **Govee Curtain Lights (`H70B1`, `H70B2` - `20×26 = 520 LEDs` par panneau)**, avec prise en charge native de l'**association de 2 ou 3 rideaux entre eux** pour former une fresque panoramique géante unifiée jusqu'à **`90×32 = 2880 LEDs`** !
- **Rubans LED RGBIC & Néons Flexibles :** **Govee RGBIC Pro Strip Lights (`H619A`, `H619C`, `H618A`)**, **Govee LED Strip Light M1 Matter (`H61E1`)**, **Govee Neon Rope Light 1 & 2 (`H61A0`, `H61D5`)**
- **Panneaux & Barres Murales :** **Govee Glide Hexa Light Panels (`H6061`)**, **Govee Glide Wall Light (`H6062`)**, **Govee Glide Y Lights (`H6065`)**
- **Rétroéclairages TV & HDMI Sync Box :** **Govee Envisual TV Backlight T2 / T3 (`H605B`, `H6099`, `H6199`)**, **Govee AI Gaming Sync Box (`H6602`)**
- **Lampadaires & Lampes d'Ambiance :** **Govee Lyra / Floor Lamp Pro (`H6072`, `H6076`, `H6079`)**, **Govee Aura / Flow Plus (`H6052`, `H6056`)**
- **Éclairages Extérieurs :** **Govee Permanent Outdoor Lights (`H705A`, `H706A`)**, **Outdoor String Lights (`H7020`)**

### 🌟 Atouts Exclusifs & Architecture Différenciante

- **Prise en charge native des 3 Govee Curtain Lights Pro associés entre eux (`Fresque Panoramique 3x - 90×32 / 2880 LEDs`)** : assistant d'assemblage en 1 clic, découpage panoramique des dégradés et animations de gauche à droite sur les 3 panneaux de `30×32` associés (`Rideau #1 Gauche`, `Rideau #2 Centre`, `Rideau #3 Droite`), routage automatique vers le rideau Maître et aperçu matriciel 2D temps réel.
- **Pilotage 100 % Local LAN UDP (< 15 ms) + Protocole `ptReal` Multi-Segments** : fonctionnement immédiat en PHP direct sans démon (ports UDP `4001/4002/4003`) ou avec le démon Python Temps Réel (port socket local dédié **`55110`**) pour diffuser des ondes lumineuses continues sans solliciter le Cloud.
- **Studio RGBIC Multi-Segments & 24 Ambiances / Fresques Panoramiques Calibrées** : définissez vos dégradés de 2 à 5 couleurs interpolées sur les 15 segments RGBIC ou lancez en 1 clic l'une des 24 ambiances locales (*Cyberpunk Neon 3x*, *Aurore Boréale*, *Coucher de Soleil*, *Feu de Cheminée Géant*, *Pluie Matricielle*, *Féerie de Noël 3x*, *Mode Cinéma 2200K 15%*).
- **Synchronisation 1-Clic des Scènes Govee (`lightScene`), Scènes DIY (`diyScene`) & Modes Musicaux (`musicMode`)** via trames locales `ptReal` et OpenAPI v2 optionnelle.
- **Studio GIF, Pixel-Art & Texte Défilant (`90×32` / `60×32` / `30×32`) avec Import en Mémoire du Plugin** : importez vos fichiers `.gif` animés, `.png` ou `.jpg`, dessinez pixel par pixel sur les 2 880 gouttes LED, générez des bandeaux de texte défilant ou chargez l'un des 6 modèles animés intégrés (*Pac-Man & Fantômes*, *Sapins & Flocons*, *Feux d'Artifice 3x*, *Cœurs Pulsants*, *Synthwave*, *Pluie Matrix*), enregistrez-les dans la mémoire persistante du plugin pour les lancer en 1 clic depuis vos scénarios et widgets, et exportez-les en `.gif` calibré `90×32 px`.
- **Plafond Dynamique de Luminosité par Mode (`brightness_max` / `brightness_max_set`)** & **Association d'un Interrupteur Physique Amont (`upstreamStateCmd` avec badge `AMONT OFF`)**.
- **Dashboard Global de Supervision dans le menu Accueil** (*Dark Glass* & *Light Glass v1.5 WCAG AAA*) et compatibilité native **Kiosk TV 10-Foot (`altTvDashboard`)**.

---

## Prérequis, Compatibilités & Matériels Testés

- **Plateforme Jeedom de référence :** Développements et validations réalisés sur box officielle **Jeedom Luna 4G LoRaWAN** (ARM64, 2 Go de RAM, mémoire flash eMMC avec persistance en RAM `/tmp/jeedom/altGovee` préservant l'usure eMMC). Compatible avec **Jeedom $\ge$ 4.2** (Luna, Atlas, Smart, Raspberry Pi, VM et Docker sous Debian 11 / 12).
- **Prérequis réseau :**
  - Éclairages Govee connectés au même réseau local Wi-Fi (2,4 GHz) que Jeedom, avec l'option **« Contrôle LAN »** activée dans l'application mobile **Govee Home** (*Paramètres de l'appareil -> Contrôle LAN*).
  - Ports UDP locaux utilisés par le protocole Govee LAN : Multicast `239.255.255.250` port `4001` (découverte), port `4002` (écoute des réponses `scan` et `devStatus`) et port `4003` (envoi des commandes locales).
- **Matériel physiquement testé et validé par l'auteur :**
  - **Ensemble de 3 rideaux matriciels Govee Curtain Lights Pro (`H70B3` / `H70B5`, `30×32 = 960 LEDs` par panneau) associés entre eux pour former un grand rideau panoramique unifié (`90×32 = 2880 LEDs`)**.
- **Autres équipements compatibles (API locale Govee LAN UDP & OpenAPI v2) :**
  - Ensemble des gammes Govee supportant le contrôle LAN et/ou l'OpenAPI v2 : `Curtain Lights` (`H70B1`, `H70B2`, `H70B3`, `H70B4`, `H70B5`), `RGBIC Pro Strip` (`H619A`, `H619C`, `H618A`, `H61E1`), `Neon Rope` (`H61A0`, `H61D5`), `Glide / Hexa / Y Lights` (`H6061`, `H6062`, `H6065`), `Envisual TV Backlight & Sync Box` (`H605B`, `H6099`, `H6199`, `H6602`), `Lyra / Floor Lamp Pro` (`H6072`, `H6076`, `H6079`) et `Permanent Outdoor Lights` (`H705A`, `H706A`).

---

## Fonctionnalités Détaillées

### 1. Découverte Automatique 1-Clic & Assemblage de 3 Rideaux Curtain Lights Pro (`90×32 - 2880 LEDs`)
- **Bouton `Scanner le réseau Govee`** :
  - Émet la requête Multicast UDP `scan` sur `239.255.255.250:4001` et écoute les réponses sur le port UDP `4002`.
  - Si une clé OpenAPI v2 optionnelle est renseignée dans la configuration du plugin, récupère également les noms personnalisés de vos équipements et leurs capacités.
- **Bouton `Assembler Rideaux Pro (3x)` (Spécial Govee Curtain Lights Pro associés)** :
  - Relie automatiquement vos **2 ou 3 rideaux Govee Curtain Lights Pro** sur le **Rideau Maître** (`spliced_count = 3`, topologie `90×32 = 2880 LEDs`).
  - Configure la diffusion en mode **Fresque Panoramique Étendue 3x (`panorama_span`)** : chaque dégradé RGBIC ou animation procédurale UDP est découpé horizontalement sur les 3 rideaux (`Rideau #1 Gauche`, `Rideau #2 Centre`, `Rideau #3 Droite`) pour un rendu continu sur toute la baie vitrée ou le mur !
  - Propose de masquer automatiquement (`Visible = 0`) les rideaux esclaves #2 et #3 sur le Dashboard Jeedom et redirige tout ordre envoyé à un rideau secondaire vers le Maître (`autoRouteGroupMaster`).

### 2. Studio RGBIC Multi-Segments, 24 Ambiances Locales, Scènes Govee, DIY & Mode Musical
- **Studio RGBIC Panoramique intégré au Widget et à la page Équipement** :
  - Choisissez de **3 à 5 couleurs** et cliquez sur **`Fresque`** : le plugin calcule l'interpolation colorimétrique sur les 15 segments RGBIC (ou sur les 9 bandes panoramiques des 3 rideaux associés) et l'applique **100 % en local** via les trames binaires `ptReal` (port UDP `4003`).
- **24 Ambiances & Animations Procédurales Locales (`preset_select`)** :
  - **Blancs Calibrés (`2000 K` à `9000 K`)** : *Bougie Dorée (2200K)*, *Blanc Chaud Cosy (2700K)*, *Blanc Neutre Naturel (4000K)*, *Blanc Froid Lumière du Jour (6500K)*, *Mode Cinéma Tamisé (2200K - 15%)*.
  - **Fresques Panoramiques 3x** : *Cyberpunk Neon*, *Aurore Boréale*, *Coucher de Soleil*, *Feu & Glace*, *Noël Or / Rouge / Vert*, *Océan Bioluminescent*.
  - **Animations Continues Temps Réel UDP (`altGoveed.py`)** : *Aurore Boréale 3x*, *Feu de Cheminée Géant*, *Onde Cyberpunk 3x*, *Vague Arc-en-Ciel 60 Colonnes*, *Féerie de Noël 3x*, *Pluie Matricielle (Curtain Pro)*, *Scintillement Étoilé Or & Blanc*.
- **Synchronisation 1-Clic des Scènes Matérielles (`lightScene`), Scènes DIY (`diyScene`) & Modes Musicaux (`musicMode`)** :
  - Bouton **`Synchroniser Profil & Scènes Govee`** peuplant automatiquement la liste déroulante des scènes propres au modèle `SKU`, avec navigation `Scène précédente` / `Scène suivante` et réglage de la sensibilité du microphone musical (`0–100 %`).

### 3. Plafond Dynamique de Luminosité par Mode (`brightness_max` / `brightness_max_set`)
- Commandes **`Luminosité maximum`** (`brightness_max`, `0–100 %`) et **`Luminosité maximum niveau`** (`brightness_max_set`) avec protection à 3 niveaux :
  1. **Abaissement immédiat** de la luminosité des rideaux/rubans si elle dépasse le nouveau plafond lors d'un passage en mode *Nuit* ou *Cinéma*.
  2. **Bridage automatique** de toutes les commandes Jeedom (`brightness_set`, `brightness_up`, ambiances).
  3. **Écrêtage automatique en temps réel** (avec anti-rebond de 2 secondes en RAM) si la luminosité est relevée depuis l'application mobile Govee Home, et sélecteur rapide `Max 10%` à `Max 70%` / `Max 100%` directement en bout de barre sur le widget.

### 4. Gestion de l'Interrupteur Physique Amont (`upstreamStateCmd`) & Flash de Notification (`alert_flash`)
- **Association d'un interrupteur ou prise connectée amont** :
  - Dès que l'alimentation amont est coupée (`0`), l'équipement bascule immédiatement à `État = 0` et `Luminosité = 0 %` avec un badge **`AMONT OFF`** sur le widget et sur le Dashboard global.
  - À l'allumage (`auto_on`), allume automatiquement l'interrupteur amont, attend l'amorçage Wi-Fi du contrôleur Govee (délai configurable, `1500 ms` par défaut) puis applique la commande lumineuse.
- **Flash de Notification Visuelle (`alert_flash`)** :
  - Fait clignoter les rideaux ou rubans Govee dans la teinte sémantique choisie (*Rouge Alarme*, *Bleu Sonnette*, *Vert Succès*, *Ambre Attention*, *Blanc Pur*, *Violet*) avant de restaurer automatiquement l'état et la couleur précédents.

---

## 💡 Idées de Scénarios & Synergies avec l'Écosystème `alt-erre`

### 1. Fresque Home-Cinéma & Gaming Panoramique sur les 3 Curtain Lights Pro
- **Déclencheur** : Allumage du téléviseur, du vidéoprojecteur ou d'une console de jeu.
- **Action & Synergie** : Plafonnement automatique de la luminosité à `Max 20%` (`brightness_max_set`) et lancement de l'ambiance *Mode Cinéma Tamisé (2200K - 15%)* lors d'un film, ou de la *Fresque Panoramique 3x : Cyberpunk Neon* lors d'une session de jeu.
- **Plugins complémentaires associés** :
  - [Alt Frame & Smart TV (Samsung)](https://alt-erre.github.io/jeedom-docs/altSamsungTv/) & [Alt Ciné Projector (JVC D-ILA)](https://alt-erre.github.io/jeedom-docs/altJvcProjector/) : détection de l'allumage de l'écran ou du projecteur.
  - [Alt AVR Control (Denon / Marantz)](https://alt-erre.github.io/jeedom-docs/altDenon/) : synchronisation avec l'entrée HDMI Home-Cinéma.
  - [Alt Contrôle Parental (PlayStation)](https://alt-erre.github.io/jeedom-docs/altPlaystation/), [Alt Contrôle Parental (Xbox)](https://alt-erre.github.io/jeedom-docs/altXbox/) & [Alt Contrôle Parental (Nintendo Switch)](https://alt-erre.github.io/jeedom-docs/altSwitch/) : bascule automatique en ambiance Gaming RGBIC.

### 2. Synchronisation Lumineuse Multi-Marques (Govee + Twinkly + Philips Hue)
- **Déclencheur** : Diffusion musicale ou soirée festive au salon.
- **Action & Synergie** : Harmonie chromatique complète entre vos **3 Govee Curtain Lights Pro**, vos guirlandes **Twinkly** et vos bandeaux **Philips Hue Play Gradient**, rythmée par la lecture audio.
- **Plugins complémentaires associés** :
  - [Alt Éclairages & Effets LED (Twinkly)](https://alt-erre.github.io/jeedom-docs/altTwinkly/) & [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : orchestration lumineuse unifiée.
  - [Alt Multiroom Audio (Sonos)](https://alt-erre.github.io/jeedom-docs/altSonos/), [Alt Audio (Cambridge)](https://alt-erre.github.io/jeedom-docs/altCambridgeAudio/) & [Alt Diffusion, Sons & Multiroom (AirPlay)](https://alt-erre.github.io/jeedom-docs/altAirCast/) : déclenchement du mode musical Govee sur lecture audio.

### 3. Signalisation Visuelle Domotique & Sécurité Périmétrique
- **Déclencheur** : Détection de mouvement extérieure, fin d'impression 3D ou alerte réseau.
- **Action & Synergie** : Exécution de la commande `Flash de Notification Visuelle` (`alert_flash`) sur le grand rideau Govee (*Rouge Alarme* sur intrusion, *Vert Succès* en fin d'impression 3D, *Bleu Sonnette* lors d'une visite) avec retour automatique à l'ambiance précédente.
- **Plugins complémentaires associés** :
  - [Alt Caméras & Sécurité (Arlo)](https://alt-erre.github.io/jeedom-docs/altArlo/), [Alt Serrure & Accès (Nuki)](https://alt-erre.github.io/jeedom-docs/altNuki/) & [Alt Radar & Sécurité Réseau](https://alt-erre.github.io/jeedom-docs/altNetGuard/) : alertes de sécurité.
  - [Alt Print 3D (Bambu Lab)](https://alt-erre.github.io/jeedom-docs/altBambuLab/) & [Alt Robot Vacuum (Roborock)](https://alt-erre.github.io/jeedom-docs/altRoborock/) : notifications visuelles de fin de cycle.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux bonnes pratiques de sécurité domotique et aux CGU du Jeedom Market :
1. **Fonctionnement 100 % Local privilégié (Zéro Cloud obligatoire)** : toutes les commandes courantes (alimentation, luminosité, couleurs RGB, température Kelvin, fresques RGBIC `ptReal`, scènes et modes musicaux locaux) transitent directement en UDP sur votre réseau local (`ports 4001/4002/4003`) entre votre box Jeedom et vos éclairages Govee.
2. **Protection absolue des secrets (Zéro secret dans `ps aux`)** : ni la clé API interne Jeedom (`apikey`), ni la clé OpenAPI v2 Govee optionnelle (`goveeApiKey`) ne sont jamais passées en argument de ligne de commande ou exposées dans les journaux. La configuration du démon est transmise via le fichier éphémère en RAM `/tmp/jeedom/altGovee/devices.json` verrouillé avec les permissions strictes `0600` et supprimé dès l'arrêt du démon.
3. **Sobriété matérielle & Préservation de la mémoire Flash eMMC (Jeedom Luna)** : l'ensemble des fichiers d'exécution du démon (`devices.json`, `deamon.pid`, verrous d'anti-rebond `clamp_ts`) réside exclusivement en mémoire RAM (`tmpfs`) et le démon applique un filtrage strict par delta afin de n'émettre un callback vers Jeedom que lorsqu'un état lumineux change réellement.
4. **Recommandations réseau** : il est recommandé d'attribuer un bail DHCP fixe (IP statique) à vos contrôleurs Govee (notamment aux 3 rideaux Curtain Lights Pro associés) dans l'interface de votre routeur ou box Internet.
