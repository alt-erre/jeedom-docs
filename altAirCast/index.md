# Plugin Alt Diffusion, Sons & Multiroom (AirPlay) (`altAirCast`) pour Jeedom

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés (`Copyright (c) 2026 Aurélien Léovant`)

## Présentation

**Alt Diffusion, Sons & Multiroom (AirPlay)** (`altAirCast`) transforme votre box Jeedom en véritable **studio de diffusion audio multi-enceintes** compatible avec l'ensemble des enceintes et amplificateurs **AirPlay 1 (RAOP)** et **AirPlay 2 (Multiroom)** du marché (HomePod, Apple TV, Denon/Marantz HEOS, Sonos, Cambridge Audio, Bose, Freebox, bornes AirPort Express et récepteurs tiers).

Contrairement aux plugins de télécommande unitaire, `altAirCast` modélise chaque équipement Jeedom comme une **Zone / Groupe de diffusion** (ex. *« Rez-de-chaussée »*, *« Toute la maison »*, *« Chambres enfants »*, *« Salon & Terrasse »*) dans laquelle vous cochez librement les enceintes cibles.

---

## Fonctionnalités principales

### 1. Découverte automatique et différenciation AirPlay 1 vs AirPlay 2
- **Scan mDNS en 1 clic** de tous les récepteurs audio du réseau local (et ajout manuel par IP possible).
- **Détection automatique des capacités protocolaires** :
  - **Badge `AirPlay 1 (RAOP)`** : diffusion directe de sons, annonces TTS, fichiers locaux et webradios (flux parallèles multi-enceintes pilotés par Jeedom).
  - **Badge `AirPlay 2 (Multiroom)`** : supporte en plus le **groupement matériel synchronisé AirPlay 2** (`add_output_devices` / `remove_output_devices`) et l'identification des **Sources Maîtres Apple Music** (HomePod / Apple TV).
- **Import en 1 clic (lecture seule)** des enceintes et clés d'appairage déjà configurées dans `altAirMedia`.
- **Offset de volume par enceinte (`-30 %` à `+30 %`)** pour équilibrer la puissance sonore entre différentes pièces d'une même Zone.

### 2. Soundboard « Fun » & Explorateur de Bibliothèques de Sons Libres (Sans clé API)
- **Pack « Studio & Fun » de 20 sons pré-embarqués hors-ligne** (synthétisés localement en WAV 44.1 kHz 16-bit, CC0) :
  - **Jingles d'annonce** : *Carillon Gare (4 notes)*, *Carillon Aéroport (3 notes)*, *Ding-Dong Porte*, *Gong Zen Tibétain*, *Double Clochette Douce*.
  - **Soundboard Fun** : *Ba-Dum-Tss (Blague)*, *Trombone Triste (Wah-Wah)*, *Fanfare Triomphale*, *Level Up Arcade 8-bit*, *Pièce Bonus Rétro*, *Game Over Rétro*, *Roulement de Tambour*, *Klaxon de Stade (Airhorn)*, *Tir Laser Sci-Fi*, *Décompte 3-2-1 Go !*.
  - **Alertes & Sécurité** : *Sirène Bitonale*, *Alerte Urgence / Intrusion*, *Fin de Minuterie / Cuisine*.
  - **Ambiances** : *Carillon Éolien Doux*, *Souffle Apaisant (Bruit Doux)*.
- **Explorateur intégré de sons libres en ligne (`Wikimedia Commons Audio` CC0/CC-BY sans clé API + `Freesound.org` optionnel)** :
  - Recherche par mot-clé ou par thème (*Rires & Applaudissements*, *Klaxons & Fanfares*, *Cloches & Gongs*, *Tambours*, *Jeux Rétro*, *Animaux*), pré-écoute dans le navigateur et **import en 1 clic** dans votre Soundboard locale.
- **Import local** de vos propres fichiers `.mp3`, `.wav`, `.ogg`, `.flac`.

### 3. Moteur d'Annonces Vocales (TTS) avec Jingle d'Intro & Anti-Coupure AirPlay
- **Assemblage automatique en RAM (`/tmp/jeedom/altAirCast`)** :
  - Concatène à la volée : **`[Silence d'amorçage 350 ms] + [Jingle d'introduction] + [Message vocal TTS]`** en un seul flux WAV continu afin qu'aucune première syllabe ne soit jamais coupée par le réveil d'un amplificateur AirPlay.
- **Surcharge dynamique dans les scénarios Jeedom** :
  - Dans la commande `Dire (Annonce TTS)`, le champ *Titre* permet de surcharger le volume et/ou le jingle à la volée (ex. `60|chime_airport` ou `40|none`).

### 4. Annuaire mondial de Webradios (`Radio-Browser` sans clé API) & Pont Apple Music
- **Bouquet de 10 Webradios préconfigurées** (*Fun Radio*, *FIP*, *France Inter*, *franceinfo:*, *RTL2*, *Nostalgie*, *NRJ*, *Radio Nova*, *TSF Jazz*, *SomaFM Groove Salad*).
- **Recherche mondiale en direct** via l'API ouverte `Radio-Browser` (sans clé API) pour ajouter n'importe quelle station aux favoris.
- **Pont Multiroom AirPlay 2 & Apple Music** : permet de grouper matériellement toutes les enceintes AirPlay 2 d'une Zone autour d'un HomePod ou d'une Apple TV maître pour y propager Apple Music en synchronisation matérielle.

### 5. Plafond de Volume Dynamique par Mode (`volume_max` / `volume_max_set`)
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

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) - Création originale et indépendante (non affiliée à Jeedom SAS ni à Apple Inc.).
- **Licence** : Propriétaire - Tous droits réservés (voir le fichier [LICENSE](LICENSE)).
