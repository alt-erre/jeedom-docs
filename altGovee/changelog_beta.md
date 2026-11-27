# Changelog Beta - Alt Éclairages, Rubans RGBIC & Ambiances (Govee) (`altGovee`)

## [0.1.0-beta.10] - 2026-11-27

- **Clarification de l'interface du Studio GIF 90×32 et de la documentation** :
  - Renommage des boutons du Studio en **« Exporter le .GIF 90x32 (pour Govee Home DIY) »** et **« Sauvegarder dans Jeedom & Diffuser (15 zones LAN) »**, avec ajout d'un guide explicatif détaillant la différence entre l'affichage 2D pixel par pixel (`2880 LEDs` via import du `.gif` dans l'application *Govee Home -> DIY* puis synchronisation Jeedom) et la diffusion 100 % locale sur les 15 zones RGBIC du rideau.
  - Correction du lien d'accès au Changelog Beta depuis la page Changelog principale de la documentation publique.

## [0.1.0-beta.9] - 2026-11-27

- **Correction du rendu des animations GIF sur le rideau et ajout des GIFs en mémoire dans la liste des modèles** :
  - Suppression de l'envoi d'une couleur moyenne unie (`colorwc`) qui écrasait les segments multicolores et figeait le rideau en lumière rose uniforme lors du lancement d'un GIF.
  - Amélioration de l'extraction des couleurs des GIFs (conservation des teintes franches et saturées comme le rouge vif ou le vert au lieu d'une moyenne rose/grise) et démarrage automatique du démon d'animation temps réel.
  - Les GIFs et animations enregistrés en mémoire apparaissent désormais directement en haut de la liste déroulante **« Charger un Modèle ou un GIF en Mémoire... »** dans le Studio 90×32.

## [0.1.0-beta.8] - 2026-11-27

- **Correction du chargement JavaScript du Studio GIF 90×32** :
  - Correction d'une syntaxe de commentaire dans le script de la page équipement qui perturbait le préprocesseur de traduction de Jeedom lors du chargement du Studio GIF.

## [0.1.0-beta.7] - 2026-11-27

- **Correction de l'import multi-frames des GIFs animés sur tous les navigateurs (Safari iOS/macOS & HTTP local)** :
  - Intégration d'un décodeur GIF multi-frames universel permettant d'extraire toutes les frames d'un fichier `.gif` animé importé (y compris sur Safari iPhone/iPad/Mac et en connexion locale `http://...`) au lieu de la seule première image.
  - **Lecture automatique de l'animation** sur la grille `90×32` dès l'import d'un GIF, la génération d'un texte défilant ou la sélection d'un modèle, avec détection automatique de la vitesse (`FPS`) du GIF.

## [0.1.0-beta.6] - 2026-11-26

- **Nouveau Studio GIF, Pixel-Art & Texte Défilant (`90×32`) avec Import en Mémoire** :
  - Ajout d'un onglet **Studio GIF & Animations 90×32** sur la fiche équipement permettant d'**importer n'importe quel fichier `.gif` animé (ou `.png` / `.jpg`)**, de **dessiner pixel par pixel sur la grille `90×32` (`2880 LEDs`)**, de **générer un bandeau de texte défilant** ou de charger **6 modèles animés prêts à l'emploi** (*Pac-Man & Fantômes*, *Sapins & Flocons de Noël*, *Feux d'Artifice 3x*, *Cœurs Pulsants*, *Soleil Synthwave*, *Pluie Matrix*).
  - **Enregistrement en mémoire dans le plugin** : chaque animation importée ou créée est sauvegardée dans la bibliothèque du plugin et ajoutée automatiquement aux listes déroulantes **`Ambiance / Fresque Panoramique`** et **`Lancer une Scène DIY`** pour être lancée en 1 clic depuis le widget ou un scénario Jeedom.
  - **Export `.GIF` calibré (`90×32 px`)** : permet de télécharger en 1 clic toute création au format `.gif` animé calibré au pixel près pour les 1, 2 ou 3 rideaux Curtain Lights Pro.

## [0.1.0-beta.5] - 2026-11-23

- **Refonte ergonomique du widget Dashboard** :
  - Ajout d'une barre dédiée **Couleur Unie directe + 4 Blancs rapides (`2200K`, `2700K`, `4000K`, `6500K`)** et refonte de la barre **Studio RGBIC** (3 zones de couleur + bouton `Appliquer` compact sans accolades `{{...}}`).
  - L'aperçu visuel des 3 rideaux sur le widget reflète désormais fidèlement la température de blanc active (ex. `Blanc 2000 K`), la couleur unie ou le dégradé RGBIC.

## [0.1.0-beta.4] - 2026-11-23

- **Mise à jour de la résolution matricielle Govee Curtain Lights Pro (`30×32` par rideau)** :
  - Ajustement des dimensions matricielles exactes des panneaux Curtain Lights Pro (`30×32 = 960 LEDs` pour 1 rideau, `60×32 = 1920 LEDs` pour 2 rideaux associés et `90×32 = 2880 LEDs` pour 3 rideaux associés) ainsi que de la présélection du routage Maître.

## [0.1.0-beta.3] - 2026-11-23

- **Correction d'erreur SQL lors de l'enregistrement des commandes** :
  - Nettoyage automatique des éventuelles commandes orphelines en base de données empêchant l'erreur `Duplicate entry ...-Éteindre` lors de la création d'un équipement Govee.

## [0.1.0-beta.2] - 2026-11-23

- **Correction de la création automatique des équipements lors du scan réseau** :
  - Correction d'une erreur empêchant l'enregistrement d'un nouvel éclairage ou rideau Govee détecté pour la première fois lors du scan LAN, et lecture immédiate de son état après la découverte.

## [0.1.0-beta.1] - 2026-11-22

- **Première version Beta du plugin Alt Éclairages, Rubans RGBIC & Ambiances (Govee)** :
  - Découverte et pilotage 100 % en local des éclairages Govee via le réseau local (LAN UDP) avec enrichissement optionnel via la clé API officielle Govee.
  - **Prise en charge native des rideaux matriciels Govee Curtain Lights Pro associés par 2 ou par 3** (jusqu'à 2880 LEDs en fresque panoramique unifiée 60×48) avec assistant d'assemblage en 1 clic et aperçu visuel 2D.
  - **Studio RGBIC Multi-Segments** intégré au widget et **24 ambiances & animations panoramiques locales** (*Cyberpunk Neon*, *Aurore Boréale*, *Coucher de Soleil*, *Feu de Cheminée*, *Féerie de Noël*, *Mode Cinéma*).
  - Synchronisation en 1 clic des **Scènes Govee**, des **Scènes DIY** et des **Modes Musicaux**.
  - **Plafond dynamique de luminosité par mode** (idéal pour les modes *Nuit* ou *Cinéma*), gestion d'un **interrupteur physique amont** (avec indicateur `AMONT OFF`), **flash de notification visuelle** et **Dashboard global de supervision** dans le menu Accueil.
