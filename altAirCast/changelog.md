# Changelog - Alt Diffusion, Sons & Multiroom (AirPlay) (`altAirCast`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.

## [0.1.0-beta.3] - 2026-11-02

### Ajouté
- **Surcharges temporaires et programmation datée des réveils par scénario Jeedom** :
  - Nouvelles commandes **`Programmer réveil temporaire ou daté`** (`alarm_set_temp`), **`Annuler réveil temporaire`** (`alarm_clear_temp`) et **`Surcharge réveil temporaire active`** (`alarm_is_temp`).
  - Possibilité de modifier uniquement le **prochain déclenchement** d'un réveil (ex. `06:15`, `demain 08:30`, `2026-12-25 09:00`) ou de **sauter le prochain réveil** (`skip` / `off` un jour férié ou de congé) sans modifier l'heure habituelle de la semaine : une fois le réveil temporaire passé, la programmation régulière reprend automatiquement.
  - Prise en charge d'une **date unique optionnelle** (`once_date`) par réveil et ciblage de n'importe quel réveil secondaire depuis un scénario en précisant `#2`, `#3` dans le titre de la commande.

## [0.1.0-beta.2] - 2026-11-02

### Ajouté
- **Moteur de Réveils programmables & Briefing Matinal par Zone** :
  - Nouvel onglet **« Réveils & Briefing Matinal »** permettant de programmer un ou plusieurs réveils par Zone (Semaine, Week-end, jours personnalisés).
  - **Séquence combinée « Briefing Matinal TTS + Webradio »** : joue un jingle doux suivi de l'annonce vocale de l'heure et d'un message personnalisé (`#heure#`, `#jour#`, `#zone#`), puis lance automatiquement la Webradio choisie.
  - **Montée progressive du volume (`Fade-in`)** de `20 %` du volume cible jusqu'au volume nominal (plafonné par `volume_max`) sur une durée réglable (`0` à `600 s`).
  - **Fonctions `Snooze (+9 min)` et `Extinction automatique` (`auto_stop_min`)** intégrées dans le démon `altaircastd.py`.
  - **Nouvelles commandes Jeedom et bandeau Réveil sur le Widget Dashboard/Mobile** (`alarm_enabled`, `alarm_time`, `alarm_next`, `alarm_state`, `alarm_enable`, `alarm_disable`, `alarm_toggle`, `alarm_set_time`, `alarm_trigger_now`, `alarm_snooze`, `alarm_stop`).

## [0.1.0-beta.1] - 2026-11-02

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Diffusion, Sons & Multiroom (AirPlay)** (`altAirCast`).
- **Architecture par Zones / Groupes de diffusion** : chaque équipement Jeedom représente une Zone de diffusion dans laquelle on coche les enceintes et amplis cibles.
- **Découverte mDNS & Différenciation automatique AirPlay 1 vs AirPlay 2** :
  - Détection automatique du protocole (`AirPlay 1 (RAOP)` vs `AirPlay 2 (Multiroom)`), identification des appareils pouvant servir de Source Maître Apple Music (HomePod / Apple TV), appairage PIN interactif et import en lecture seule depuis `altAirMedia`.
- **Soundboard « Fun » & Synthétiseur de 20 sons embarqués hors-ligne** (`resources/sound_synth.py`) :
  - 5 Jingles d'annonce (*Carillon Gare 4 notes*, *Carillon Aéroport*, *Ding-Dong*, *Gong Zen*, *Double Clochette*), 10 bruitages Fun (*Ba-Dum-Tss*, *Trombone Triste*, *Fanfare*, *Level Up*, *Pièce Bonus*, *Game Over*, *Roulement de Tambour*, *Klaxon Airhorn*, *Tir Laser*, *Décompte 3-2-1 Go*), 3 Alertes et 2 Ambiances.
- **Explorateur intégré de Bibliothèques de Sons Libres en ligne (Sans clé API)** :
  - Recherche en direct, pré-écoute et téléchargement en 1 clic depuis `Wikimedia Commons Audio` (CC0 / CC-BY) et `Freesound.org` (clé API optionnelle), ainsi qu'import de fichiers personnels (`.mp3`, `.wav`, `.ogg`, `.flac`).
- **Moteur d'annonces vocales TTS avec Jingle d'introduction et amorçage anti-coupure** :
  - Assemblage à la volée en RAM (`/tmp/jeedom/altAirCast/tts_cache`, plafonné par rotation LRU à 8 fichiers) combinant `[Silence d'amorçage 350 ms] + [Jingle] + [Voix TTS]`.
- **Lecteur de Webradios & Recherche mondiale `Radio-Browser` (Sans clé API)** :
  - 10 stations préconfigurées (*Fun Radio*, *FIP*, *France Inter*, *RTL2*, *Nostalgie*, *NRJ*, *Nova*, *TSF Jazz*...) et moteur de recherche mondial en 1 clic.
- **Pont Multiroom AirPlay 2 & Apple Music** :
  - Groupement et dissociation matérielle des enceintes AirPlay 2 d'une Zone autour d'un HomePod ou d'une Apple TV maître.
- **Plafond de volume dynamique par mode (`volume_max` / `volume_max_set`)** et Widget Dashboard/Mobile « Dark Glass » avec 9 thèmes de couleur et compatibilité Kiosk TV 10-Foot (`getKioskWidgetData`).
- **Démon Python `asyncio` (`altaircastd.py`) sur le port dédié `55105`** :
  - Zéro secret dans `ps aux` (`daemon_config.json` `0600`), écritures atomiques POSIX et filtrage par delta des callbacks.
