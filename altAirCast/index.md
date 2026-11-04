# Plugin Alt Diffusion, Sons & Multiroom (AirPlay) (`altAirCast`) pour Jeedom

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés (`Copyright (c) 2026 Aurélien Léovant`)

## Présentation

**Alt Diffusion, Sons & Multiroom (AirPlay)** (`altAirCast`) transforme votre box Jeedom en véritable **studio de diffusion audio multi-enceintes** compatible avec l'ensemble des enceintes et amplificateurs **AirPlay 1 (RAOP)** et **AirPlay 2 (Multiroom)** du marché (HomePod, HomePod mini, Apple TV, Denon/Marantz HEOS, Sonos, Cambridge Audio, Bose, Freebox, bornes AirPort Express et récepteurs tiers).

Contrairement aux plugins de télécommande unitaire, `altAirCast` modélise chaque équipement Jeedom comme une **Zone / Groupe de diffusion** (ex. *« Rez-de-chaussée »*, *« Toute la maison »*, *« Chambres enfants »*, *« Salon & Terrasse »*) dans laquelle vous cochez librement les enceintes cibles.

---

## Installation & Premier démarrage

1. **Activation & Dépendances** :
   - Activez le plugin dans **Plugins -> Gestion des plugins -> Alt Diffusion, Sons & Multiroom (AirPlay)**.
   - Lancez l'installation des dépendances (environnement isolé `resources/venv` avec `pyatv`, `aiohttp`, `gTTS`, plus `avahi-utils` et `ffmpeg` pour le décodage universel des Webradios). L'installation tourne en priorité basse (`nice`/`ionice`) afin de ne jamais ralentir votre box Jeedom.
   - Une fois les dépendances au vert, vérifiez que le **Démon** est démarré (`OK`).
2. **Génération automatique des 20 sons embarqués (1re installation, mise à jour ou restauration)** :
   - Pour garder des mises à jour quasi instantanées (`~150 Ko`) et alléger vos sauvegardes quotidiennes Jeedom de `3 Mo`, les 20 fichiers `.wav` du pack embarqué ne sont pas stockés dans l'archive du plugin ni dans les backups (`data/sounds/builtin` est exclu, tandis que vos propres sons importés dans `data/sounds/custom` sont **intégralement sauvegardés**).
   - Dès l'activation du plugin (même avant la fin des dépendances), à chaque démarrage du démon ou dès l'ouverture de l'interface / d'un widget après une restauration de sauvegarde, le synthétiseur intégré (`resources/sound_synth.py`, 100 % bibliothèque standard Python hors-ligne, sans accès Internet) vérifie individuellement les 20 fichiers et **recrée automatiquement en `< 0,2 s` tout son absent ou altéré**.
3. **Découverte et appairage des enceintes** :
   - Ouvrez **Plugins -> Multimédia -> Alt Diffusion, Sons & Multiroom (AirPlay)** puis cliquez sur **Scanner les enceintes AirPlay** (ou importez en 1 clic celles déjà connues d'`altAirMedia`).
   - Pour les équipements exigeant un code PIN (Apple TV ou HomePod configuré avec contrôle d'accès restreint), lancez l'assistant d'appairage directement sur la carte de l'enceinte. Sur un HomePod / HomePod mini standard, vérifiez dans l'application **Maison (Home)** d'Apple (*Réglages du domicile -> Haut-parleurs et téléviseurs*) que l'accès est réglé sur *« Toutes les personnes sur le même réseau »* (ou saisissez le mot de passe/PIN configuré).
4. **Création de votre première Zone** :
   - Cliquez sur **Ajouter une Zone**, cochez une ou plusieurs enceintes dans l'onglet **Zone & Enceintes Cibles**, choisissez les sons épinglés en boutons rapides sur le widget et sauvegardez.

---

## Fonctionnalités principales

### 1. Découverte automatique et différenciation AirPlay 1 vs AirPlay 2
- **Scan mDNS en 1 clic** de tous les récepteurs audio du réseau local (et ajout manuel par IP possible).
- **Détection automatique des capacités protocolaires** :
  - **Badge `AirPlay 1 (RAOP)`** : diffusion directe de sons, annonces TTS, fichiers locaux et webradios (flux parallèles multi-enceintes pilotés par Jeedom).
  - **Badge `AirPlay 2 (Multiroom)`** : supporte en plus le **groupement matériel synchronisé AirPlay 2** (`add_output_devices` / `remove_output_devices`) et l'identification des **Sources Maîtres Apple Music** (HomePod / Apple TV).
- **Import en 1 clic (lecture seule)** des enceintes et clés d'appairage déjà configurées dans `altAirMedia`.
- **Offset de volume par enceinte (`-30 %` à `+30 %`)** pour équilibrer la puissance sonore entre différentes pièces d'une même Zone.

### 2. Soundboard « Fun » & Explorateur de Bruitages Courts Libres (Sans clé API)
- **Pack « Studio & Fun » de 20 sons pré-embarqués hors-ligne** (auto-synthétisés localement en WAV 44.1 kHz 16-bit, CC0, auto-réparés s'il en manque un) :
  - **Jingles d'annonce** : *Carillon Gare (4 notes)*, *Carillon Aéroport (3 notes)*, *Ding-Dong Porte*, *Gong Zen Tibétain*, *Double Clochette Douce*.
  - **Soundboard Fun** : *Ba-Dum-Tss (Blague)*, *Trombone Triste (Wah-Wah)*, *Fanfare Triomphale*, *Level Up Arcade 8-bit*, *Pièce Bonus Rétro*, *Game Over Rétro*, *Roulement de Tambour*, *Klaxon de Stade (Airhorn)*, *Tir Laser Sci-Fi*, *Décompte 3-2-1 Go !*.
  - **Alertes & Sécurité** : *Sirène Bitonale*, *Alerte Urgence / Intrusion*, *Fin de Minuterie / Cuisine*.
  - **Ambiances** : *Carillon Éolien Doux*, *Souffle Apaisant (Bruit Doux)*.
- **Explorateur intégré de bruitages courts CC0 en ligne (100 % sans clé API)** :
  - Catalogue dédié 100 % effets sonores CC0 (`SFXMint`) complété par des sons courts filtrés (`<= 25 s`, MP3 natif, exclusion totale des prononciations vocales de dictionnaire Wiktionary / Lingua Libre), avec **traduction automatique Français -> Anglais** des mots-clés (*sonnette*, *chien*, *applaudissements*, *rires*, *klaxon*, *sirène*, *gong*, *orage*, *arcade*...), pré-écoute dans le navigateur (compatible Safari macOS/iOS, Chrome, Firefox, Edge) et **import + classement automatique par catégorie en 1 clic** dans votre Soundboard locale.
- **Import local** de vos propres fichiers `.mp3`, `.wav`, `.ogg`, `.flac` (conservés dans `data/sounds/custom/` et inclus dans les sauvegardes Jeedom).
- **Épinglage personnalisé des boutons rapides sur le Widget par Zone** :
  - Chaque Zone permet de choisir quels sons (embarqués ou importés) sont affichés sous forme de boutons d'accès direct sur son Widget Dashboard et Mobile (depuis l'onglet *Zone & Enceintes Cibles* ou via le bouton d'épinglage dans l'onglet *Soundboard*). Tous les autres sons restent accessibles dans le sélecteur déroulant classé par catégories.

### 3. Moteur d'Annonces Vocales (TTS) avec Jingle d'Intro & Anti-Coupure AirPlay
- **Assemblage automatique en RAM (`/tmp/jeedom/altAirCast`)** :
  - Concatène à la volée : **`[Silence d'amorçage 350 ms] + [Jingle d'introduction] + [Message vocal TTS]`** en un seul flux WAV continu afin qu'aucune première syllabe ne soit jamais coupée par le réveil d'un amplificateur AirPlay.
- **Surcharge dynamique dans les scénarios Jeedom** :
  - Dans la commande `Dire (Annonce TTS)`, le champ *Titre* permet de surcharger le volume et/ou le jingle à la volée (ex. `60|chime_airport` ou `40|none`).

### 4. Annuaire mondial de Webradios (`Radio-Browser` sans clé API) & Pont Apple Music
- **Bouquet de 10 Webradios préconfigurées** (*Fun Radio*, *FIP*, *France Inter*, *franceinfo:*, *RTL2*, *Nostalgie*, *NRJ*, *Radio Nova*, *TSF Jazz*, *SomaFM Groove Salad*) avec pré-tamponnage anti-coupure de `64 Ko`, alignement de trames Icecast et transcodage universel `ffmpeg` (MP3, AAC/AAC+, HLS `.m3u8`, OGG, FLAC, playlists `.m3u`/`.pls`).
- **Recherche mondiale en direct** via l'API ouverte `Radio-Browser` (sans clé API) pour pré-écouter et ajouter n'importe quelle station aux favoris.
- **Pont Multiroom AirPlay 2 & Apple Music** : permet de grouper matériellement toutes les enceintes AirPlay 2 d'une Zone autour d'un HomePod ou d'une Apple TV maître pour y propager Apple Music en synchronisation matérielle.

### 5. Réveils Multi-Zones, Briefing Matinal TTS & Fade-In Progressif
- **Réveils programmables multiples par Zone** (ex. *Semaine 07:00*, *Mercredi 08:00*, *Week-end 09:00*) avec sélection des jours de la semaine (`Lun` à `Dim`).
- **5 séquences de réveil au choix** :
  - **Briefing Matinal TTS + Webradio** : joue un jingle doux suivi d'un message vocal dynamique (`#heure#`, `#jour#`, `#zone#`), puis enchaîne automatiquement sur votre Webradio favorite.
  - **Webradio seule**, **Son / Carillon Soundboard**, **Briefing TTS seul**, ou **Apple Music (Multiroom AirPlay 2)**.
- **Montée progressive du volume (Fade-in)** réglable de `0` à `600 secondes` (toujours plafonnée par `volume_max`).
- **Fonctions `Snooze (+9 min)` et `Extinction automatique`** au bout de $X$ minutes (ex. arrêt automatique de la radio après `45 min`), pilotables directement sur le Widget Dashboard/Mobile et par scénarios Jeedom (`alarm_enable`, `alarm_disable`, `alarm_toggle`, `alarm_set_time`, `alarm_set_temp`, `alarm_clear_temp`, `alarm_trigger_now`, `alarm_snooze`, `alarm_stop`).
- **Modification permanente ou temporaire / datée par scénario Jeedom** :
  - `Régler heure du réveil` (`alarm_set_time`) modifie l'heure permanente du réveil (ou accepte le préfixe `temp` / une date pour un décalage ponctuel).
  - `Programmer réveil temporaire ou daté` (`alarm_set_temp`) permet de décaler uniquement le prochain réveil (`06:15`, `demain 08:30`, `2026-12-25 09:00`) ou de sauter le prochain réveil (`skip` un jour férié) puis revient automatiquement à l'horaire habituel une fois déclenché.

### 6. Plafond de Volume Dynamique par Mode (`volume_max` / `volume_max_set`)
- Chaque Zone intègre les commandes standardisées `Volume maximum` (`volume_max`) et `Volume maximum niveau` (`volume_max_set`) ainsi qu'un sélecteur rapide sur le widget (`Max 10%` à `Max 70%` par pas de 5 % + `Max 100%`) pour brider automatiquement les annonces et diffusions la nuit.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Diffusion locale sur votre réseau (LAN)** : Toutes les diffusions audio (`RAOP` / `AirPlay` / `Companion`), la synthèse des 20 sons embarqués et la synthèse vocale locale s'effectuent directement sur votre réseau local entre votre box Jeedom et vos enceintes.
- **Protection stricte des secrets et clés d'appairage (Zéro secret dans `ps aux`)** :
  - La clé API interne Jeedom ainsi que les éventuels jetons d'appairage AirPlay/Companion ne sont jamais passés en argument de ligne de commande (`ps aux`).
  - Ils sont encapsulés dans `/tmp/jeedom/altAirCast/daemon_config.json` avec des permissions strictes `0600` et supprimés à l'arrêt du démon.
  - L'inventaire des enceintes (`data/speakers/inventory.json`) est protégé par un fichier `.htaccess` (`Require all denied`), des droits `0600` et une écriture atomique POSIX anti-corruption.
- **Prérequis réseau** :
  - Le démon écoute exclusivement sur l'interface locale `127.0.0.1` (port dédié `55105`).
  - Vos enceintes AirPlay 1 / AirPlay 2 doivent être joignables sur votre réseau local (avec Multicast/mDNS `UDP 5353` autorisé pour la découverte automatique).
- **Sobriété matérielle (Jeedom Luna / ARM)** :
  - Démon mono-processus `asyncio` sans polling périodique (`0,00 % CPU` au repos), chargement paresseux de `pyatv` à la première diffusion, mutualisation d'un flux HTTP/transcodage unique en entrée avec rétro-pression mémoire (`512 Ko` max par enceinte active), cache TTS en RAM `tmpfs` strictement borné (`max 6 fichiers` et `< 2 Mo`, purgé à l'arrêt), exclusion de `resources/venv` et `data/sounds/builtin` des sauvegardes Jeedom, et historisation désactivée par défaut sur toutes les commandes volatiles pour préserver la mémoire flash eMMC.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) - Création originale et indépendante (non affiliée à Jeedom SAS ni à Apple Inc.).
- **Licence** : Propriétaire - Tous droits réservés (voir le fichier [LICENSE](LICENSE)).
