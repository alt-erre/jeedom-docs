# Plugin Jeedom — Alt Éclairages & Effets LED (Twinkly) (`altTwinkly`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Lumière / Éclairages Connectés & Effets LED  

---

## Présentation

Le plugin **Alt Éclairages & Effets LED (Twinkly) (`altTwinkly`)** permet de découvrir, piloter et superviser **100 % en local** (sans aucun cloud, sans compte Twinkly externe et sans connexion Internet requise) l'ensemble des éclairages et décorations LED adressables **Twinkly Gen I, Gen II, Plus & Pro** :

- **Guirlandes, Rideaux & Gouttes lumineuses :** **Twinkly Strings** (RGB, Special Edition RGBW, Gold Edition AWW), **Twinkly Curtain**, **Twinkly Icicle**, **Twinkly Cluster**, **Twinkly Festoon**, **Twinkly Dots**, **Twinkly Candies**, **Twinkly Spritzer**
- **Panneaux Matriciels & Rubans Néon :** **Twinkly Squares** (panneaux muraux matriciels), **Matrix Curtain**, **Twinkly Flex**, **Twinkly Line**
- **Décorations & Sapins pré-éclairés :** **Twinkly Pre-Lit Tree**, **Light Tree**, **Wreath**, **Garland**
- **Synchronisation Musicale :** Prise en charge de l'état et du basculement **Twinkly Music**

---

## Architecture Bi-Mode 100 % Locale (`xled` HTTP REST & Streaming UDP)

1. **Mode HTTP REST local direct (par défaut, sans dépendance ni démon) :**
   - Interroge et pilote directement chaque contrôleur Twinkly sur le port TCP local `80` via l'API locale `/xled/v1/...` en PHP natif (`cURL` + `sockets`).
   - Authentification locale automatique par **Challenge-Response cryptographique (`/xled/v1/login` + `/xled/v1/verify`)** avec mise en cache intelligente du jeton `X-Auth-Token` et renouvellement transparent en cas d'expiration.
   - **Fonctionnel immédiatement** dès l'activation du plugin, sans attendre l'installation de dépendances Python.
2. **Mode Démon Python Temps Réel & Streaming UDP (`resources/altTwinklyd.py` — Optionnel) :**
   - Maintient une supervision asynchrone haute fréquence (`3` à `10 s` paramétrable) sur l'endpoint unifié `/xled/v1/summary` et remonte **instantanément** à Jeedom tout changement effectué depuis l'application mobile Twinkly ou le bouton physique du contrôleur.
   - Assure la **génération et la diffusion fluide d'animations Temps Réel UDP (`mode: "rt"`, port UDP `7777`, protocole v3 à `15 FPS`)** pour animer vos guirlandes et panneaux avec des ambiances procédurales exclusives (*Aurore Boréale*, *Feu de Cheminée*, *Scintillement Or & Blanc*, *Noël Magique*, *Onde Arc-en-Ciel*, *Cyberpunk*).

---

## Fonctionnalités prises en charge

### 1. Découverte Automatique 1 Clic sur le Réseau Local (`UDP 5555` + `/xled/v1/gestalt`)
- Bouton **`Scanner le réseau Twinkly`** sur la page d'accueil du plugin :
  - Émet un paquet Broadcast UDP (`\x01discover`) sur le port `5555` (`255.255.255.255` et sous-réseau local).
  - Interroge automatiquement `/xled/v1/gestalt` et `/xled/v1/fw/version` sur chaque contrôleur détecté.
  - Crée ou met à jour les équipements Jeedom en renseignant automatiquement leur **nom configuré dans l'application Twinkly**, leur **adresse IP**, leur **adresse MAC**, leur **UUID**, leur **code produit** (ex. `TWS250STP-B`, `TWQ064STW`, `TWF200STP`), leur **famille matérielle** (`Strings`, `Squares`, `Flex`, `Line`, `Curtain`, `Icicle`, `Dots`, `Tree`), leur **profil colorimétrique** (`RGB`, `RGBW`, `AWW`), leur **nombre exact de LEDs** (`64` à `1200+`) et leur **version de firmware**.

### 2. Pilotage Complet des Modes, Couleurs (`RGB` / `RGBW` / `AWW`), Animations (`Movies`) & Playlists
- **Alimentation intelligente (`Allumer`, `Éteindre`, `Inverser`) :**
  - Mémorise automatiquement le dernier mode actif avant extinction (`movie`, `color`, `effect`, `playlist`) afin de restaurer fidèlement votre ambiance à l'allumage.
- **Synchronisation 1 Clic du Catalogue d'Animations (`Movies`) :**
  - Bouton **`Synchroniser Profil & Animations (Movies)`** qui interroge `/xled/v1/movies` pour peupler automatiquement la liste déroulante **`Lancer une animation (Movie)`** (`movie_select`) avec toutes les animations enregistrées dans la mémoire interne du contrôleur Twinkly, accompagnée des commandes **`Animation précédente`** (`movie_prev`) et **`Animation suivante`** (`movie_next`).
- **Contrôle Colorimétrique Haute Précision (`RGB`, `RGBW` & `AWW`) :**
  - Sélecteur de couleur HTML5 (`#RRGGBB`), pastilles d'accès direct sur le widget et commande **`Canal Blanc (RGBW)`** (`0–255`) dédiée aux modèles *Special Edition (`RGBW`)* et *Gold Edition (`AWW`)*.
  - Réglage de la **`Saturation`** (`0–100 %`).
- **Catalogue de 23 Ambiances Calibrées & Effets Temps Réel UDP (`preset_select`) :**
  - **Blancs & Températures calibrées :** *Bougie Dorée (2200K)*, *Blanc Chaud (2700K)*, *Blanc Neutre (4000K)*, *Blanc Froid Polaire (6500K)*, *Mode Cinéma Tamisé (15%)*.
  - **Couleurs Signature :** *Or Impérial*, *Rouge Noël Carmin*, *Vert Sapin Émeraude*, *Bleu Glacé Hiver*, *Cyan Lagon*, *Violet Améthyste*, *Corail Coucher de Soleil*.
  - **Animations Temps Réel UDP (port `7777`) :** *Aurore Boréale*, *Feu de Cheminée*, *Scintillement Or & Blanc*, *Noël Magique Or/Rouge/Vert*, *Onde Arc-en-Ciel*, *Cyberpunk Cyan & Magenta*.
  - **Effets matériels intégrés :** *Effets intégrés #1 à #5* (`/xled/v1/led/effects/current`).

### 3. Plafonnement Dynamique de Luminosité par Mode (`brightness_max` / `brightness_max_set`)
- Commandes **`Luminosité maximum`** (`brightness_max`, `0–100 %`, par défaut `100 %`) et **`Luminosité maximum niveau`** (`brightness_max_set`) utilisables dans vos scénarios et le plugin *Mode* (ex. mode *Nuit*, *Chambre enfant* ou *Séance Cinéma*) :
  1. **Abaissement immédiat au changement de mode** si la luminosité courante dépasse le nouveau plafond.
  2. **Bridage automatique** de toutes les commandes Jeedom (`brightness_set`, `brightness_up`, ambiances).
  3. **Écrêtage automatique en temps réel** si la luminosité est augmentée depuis l'application mobile Twinkly, et adaptation dynamique de la borne `max` du curseur sur le widget Dashboard.

### 4. Programmateur Horaire Matériel (`/xled/v1/timer`), Groupes & Flash de Notification
- **Programmateur horaire matériel embarqué :** lecture et programmation directe des heures d'allumage et d'extinction autonomes dans le contrôleur Twinkly (`timer_set`, `timer_disable`, `timer_state`, `timer_on`, `timer_off`) depuis un scénario ou depuis le tiroir dédié du widget.
- **Flash de Notification Visuelle (`alert_flash`) :** commande dédiée aux scénarios domotiques (sonnette, alarme, fin de cycle) faisant clignoter l'éclairage Twinkly dans la couleur choisie (*Rouge*, *Bleu*, *Vert*, *Ambre*, *Blanc*) avant de restaurer automatiquement l'animation ou le mode précédent.

### 5. Widgets Personnalisés « Dark Glass » (Dashboard & Mobile — Charte `alt-erre` v1.2)
- **Aperçu Matriciel LED `58×58 px` animé** reflétant en temps réel l'état (allumé/éteint), la couleur `#RRGGBB` active ou le scintillement multicolore des modes *Movie / Effet / UDP Temps Réel*, avec badge de famille (`STRINGS`, `SQUARES`, `FLEX`, `LINE`, `CURTAIN`, `ICICLE`, `DOTS`, `TREE`).
- **9 thèmes de couleur par équipement** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
- **Micro-interactions tactiles** : onde lumineuse au clic (`.is-triggered`), rotation fluide du bouton *Rafraîchir* (`.is-refreshing`) et protection anti-double-clic (`.is-confirmed`).

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud) :** Toutes les communications s'effectuent exclusivement sur votre réseau local (LAN/Wi-Fi) entre votre box Jeedom et vos contrôleurs Twinkly via le protocole local `xled` (HTTP REST port `80`, découverte UDP port `5555` et streaming temps réel UDP port `7777`). Aucun compte cloud Twinkly, identifiant personnel ni mot de passe externe n'est requis ni collecté.
- **Protection des secrets & Zéro secret dans `ps aux` :** Les jetons de session locale (`X-Auth-Token`) négociés par Challenge-Response sont conservés uniquement en mémoire/cache local Jeedom. La configuration transmise au démon Python utilise exclusivement le fichier temporaire `jeedom::getTmpFolder('altTwinkly') . '/devices.json'` verrouillé par des permissions strictes (`chmod 0600`) et supprimé automatiquement à l'arrêt du démon (`@unlink`). Aucune clé API (`--apikey`) ni jeton n'apparaît dans la liste des processus (`ps aux`) ou dans les journaux.
- **Mesures de sécurité réseau :**
  - Le socket de contrôle interne du démon Python écoute exclusivement sur l'interface de bouclage locale (`127.0.0.1`, port `55098` par défaut) et vérifie systématiquement la clé API interne Jeedom du plugin.
  - Il est recommandé d'attribuer une adresse IP fixe (bail DHCP statique) à chaque contrôleur Twinkly sur votre routeur et d'isoler vos objets connectés sur un réseau local privé protégé (WPA2/WPA3), sans jamais exposer les ports `80`, `5555` ou `7777` de vos contrôleurs Twinkly sur Internet.

---

## Auteur & Licence

- **Auteur :** Aurélien Léovant (`alt-erre`)
- **Copyright :** © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Ledworks S.r.l. / Twinkly).
- **Licence :** Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
