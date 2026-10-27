# Changelog — Plugin Alt Éclairages & Effets LED (Twinkly) (`altTwinkly`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](../VERSIONING.md).

---

## [0.1.0-beta.1] — 2026-10-27 (Canal Beta)

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Éclairages & Effets LED (Twinkly) (`altTwinkly`)** pour Jeedom v4.
- **Architecture Bi-Mode 100 % Locale (Zéro Cloud)** :
  - **Mode HTTP REST local direct (sans dépendance ni démon)** via l'API officielle `/xled/v1/...` (port TCP `80`) avec authentification locale Challenge-Response (`/xled/v1/login` + `/xled/v1/verify`) et mise en cache intelligente du jeton `X-Auth-Token`.
  - **Mode Démon Python Temps Réel & Streaming UDP (`resources/altTwinklyd.py`)** assurant une supervision différentielle haute fréquence (`/xled/v1/summary`) et la diffusion fluide d'animations Temps Réel UDP (`mode: "rt"`, port `7777`, protocole v3 à `15 FPS`), avec protection stricte de la clé API via fichier temporaire `chmod 0600` (zéro secret dans `ps aux`).
- **Découverte Automatique 1 Clic sur le Réseau Local (`Scanner le réseau Twinkly`)** :
  - Détection par Broadcast UDP sur le port `5555` (`\x01discover`) suivie de l'interrogation de `/xled/v1/gestalt` et `/xled/v1/fw/version`.
  - Reconnaissance automatique de toute la gamme Twinkly Gen I, Gen II, Plus & Pro : **Strings**, **Squares**, **Flex**, **Line**, **Curtain**, **Icicle**, **Dots / Candies**, **Pre-Lit Tree**, **Cluster**, **Festoon** et profils LED **`RGB`**, **`RGBW`** (*Special Edition*) et **`AWW`** (*Gold Edition*).
- **Synchronisation Dynamique du Catalogue d'Animations (`Movies`) & Ambiances** :
  - Importation en 1 clic des animations enregistrées dans la mémoire interne du contrôleur (`/xled/v1/movies`) dans la commande `Lancer une animation (Movie)` (`movie_select`) avec navigation `Animation précédente` / `Animation suivante`.
  - Catalogue intégré de **23 ambiances calibrées et effets Temps Réel UDP** (*Bougie 2200K*, *Blanc Chaud 2700K*, *Blanc Neutre 4000K*, *Blanc Froid 6500K*, *Or Impérial*, *Rouge Noël*, *Vert Sapin*, *Mode Cinéma Tamisé*, *Aurore Boréale*, *Feu de Cheminée*, *Scintillement Or & Blanc*, *Noël Magique*, *Onde Arc-en-Ciel*, *Cyberpunk*, *Effets matériels #1 à #5*).
- **Plafonnement dynamique de la luminosité par mode (`brightness_max` / `brightness_max_set`)** :
  - Protection à 3 niveaux permettant de brider automatiquement la luminosité maximale selon le mode de la maison (ex. *Mode Nuit* ou *Séance Cinéma*) avec adaptation dynamique du curseur sur le widget Dashboard.
- **Programmateur Horaire Matériel (`/xled/v1/timer`) & Flash de Notification (`alert_flash`)** :
  - Lecture et configuration directe des heures d'allumage et d'extinction matérielles (`timer_set`, `timer_disable`).
  - Action `Flash de notification` pour faire clignoter une guirlande ou un panneau Twinkly lors d'un événement domotique avant restauration automatique de l'état initial.
- **Widgets personnalisés Dashboard & Mobile « Dark Glass » (Charte `alt-erre` v1.2)** :
  - Vignette matricielle `58×58 px` animée en temps réel, sélecteur de modes rapides, palette de couleurs avec canal Blanc `RGBW` dédié, tiroir programmateur horaire, micro-interactions tactiles (`.is-triggered`, `.is-refreshing`, `.is-confirmed`) et prise en charge des **9 thèmes de couleur**.
