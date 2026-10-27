# Plugin Jeedom — Alt Multiroom Audio (Sonos) (`altSonos`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Audio Multiroom & Home-Cinéma  

---

## Présentation

Le plugin **Alt Multiroom Audio (Sonos) (`altSonos`)** permet de piloter et superviser **100 % en local** (sans aucun cloud, sans compte Sonos externe et sans jeton OAuth) l'ensemble des amplificateurs, lecteurs réseau (streamers), barres de son Home-Cinéma, caissons de basses et enceintes **Sonos S1 & S2** :

- **Amplificateurs & Lecteurs Réseau Hi-Fi (Prise en charge approfondie) :** **Sonos Amp** (`S16`), **Sonos Port** (`S23`), **Sonos Connect** (`ZP90` / `S17`), **Sonos Connect:Amp** (`ZP120`)
- **Barres de son Home-Cinéma & Caissons :** **Sonos Arc**, **Sonos Arc Ultra**, **Sonos Beam (Gen 1 & Gen 2)**, **Sonos Ray**, **Sonos Playbar**, **Sonos Playbase**, **Sonos Sub (Gen 1/2/3/4)**, **Sonos Sub Mini**
- **Enceintes Multiroom & Portables :** **Sonos Era 300**, **Sonos Era 100**, **Sonos Five**, **Sonos Play:5 (Gen 1 & Gen 2)**, **Sonos One / One SL**, **Sonos Play:1**, **Sonos Play:3**, **Sonos Move / Move 2**, **Sonos Roam / Roam 2 / Roam SL**, **IKEA SYMFONISK**

---

## Architecture Bi-Mode 100 % Locale (UPnP / SOAP & Événements GENA Temps Réel)

1. **Mode UPnP / SOAP HTTP direct (par défaut, sans dépendance ni démon) :**
   - Interroge et pilote directement chaque équipement Sonos sur le port local `1400` en PHP natif (`AVTransport`, `RenderingControl`, `GroupRenderingControl`, `ZoneGroupTopology`, `ContentDirectory`, `DeviceProperties`, `AudioIn`).
   - **Fonctionnel immédiatement** dès l'activation du plugin, sans attendre l'installation de dépendances Python.
   - **Délégation transparente au Coordinateur Multiroom :** Lorsqu'un lecteur (ex. *Sonos Port Salon*) est groupé avec une autre pièce coordinatrice, les commandes de transport (`Play`, `Pause`, `Stop`, `Suivant`, `Précédent`, `Favoris`) et la lecture des métadonnées sont automatiquement routées vers le Coordinateur du groupe, tandis que le Volume individuel, l'Égaliseur (`Bass`, `Treble`, `Loudness`), le niveau de Sortie Ligne (`Variable` / `Fixe 100%`) et le Subwoofer restent appliqués à l'équipement lui-même.
2. **Mode Événements UPnP GENA Temps Réel (Démon Python `altSonosd.py` + fallback HTTP) :**
   - Souscrit (`SUBSCRIBE` / `NOTIFY`) aux flux d'événements locaux UPnP GENA de chaque équipement Sonos (`/MediaRenderer/AVTransport/Event`, `/MediaRenderer/RenderingControl/Event`, `/ZoneGroupTopology/Event`, `/AudioIn/Event`).
   - Remonte **instantanément (`< 100 ms`)** tout changement de piste, de pochette, d'état de lecture, de volume, de sourdine, d'égaliseur ou de groupe Multiroom effectué depuis l'application Sonos, AirPlay 2, Spotify Connect, une télécommande TV HDMI ARC ou les boutons tactiles de l'appareil.

---

## Fonctionnalités prises en charge

### 1. Découverte Automatique 1 Clic du Réseau Sonos (SSDP + Topologie Foyer)
- Bouton **`Scanner le réseau Sonos`** sur la page d'accueil du plugin :
  - Combine une recherche **SSDP Multicast UDP (`239.255.255.250:1900`)** et l'extraction de la **Topologie complète du foyer (`ZoneGroupTopology::GetZoneGroupState`)**.
  - **Compatible Docker & VLANs :** en indiquant l'adresse IP d'un seul équipement Sonos connu, le plugin découvre automatiquement toutes les autres pièces Sonos du foyer, leurs modèles exacts (`Sonos Amp`, `Sonos Port`, etc.), leurs identifiants `RINCON_...` et crée les équipements Jeedom correspondants (en filtrant automatiquement les satellites Surround invisibles et les Sonos Boost/Bridge).

### 2. Fonctions dédiées Sonos Amp, Sonos Port & Sonos Connect (Entrées & Sorties Matérielles)
- **Entrée Ligne Analogique RCA (`Line-In` / `AudioIn`) :**
  - Commande **`Entrée : Ligne RCA (Line-In)`** (`source_line_in`) pour basculer sur l'entrée RCA locale (`x-rincon-stream:RINCON_...`).
  - **Partage Multiroom des Entrées Line-In du foyer :** Synchronisation automatique d'une commande `Line-In RCA : <Pièce>` pour chaque *Sonos Amp*, *Sonos Port*, *Sonos Connect*, *Five* ou *Era* du foyer, permettant d'écouter une platine vinyle ou un lecteur CD branché sur un *Sonos Port* dans n'importe quelle autre pièce !
  - Information binaire `Câble Line-In branché` (`line_in_connected`).
- **Entrée TV HDMI ARC / Optique (Sonos Amp & Barres de son Arc / Beam / Ray / Playbar) :**
  - Commande directe **`Entrée : TV (HDMI ARC / Optique)`** (`source_tv`) pour basculer instantanément sur le son du téléviseur (`x-sonos-htastream:RINCON_...:spdif`).
- **Niveau de Sortie Ligne RCA / Coaxiale Variable vs Fixe 100 % (Spécial Sonos Port & Sonos Connect) :**
  - Information `Mode Sortie Ligne` (`Variable` ou `Fixe (100%)`) et `Etat Sortie Ligne Fixe`.
  - Commandes **`Sortie Ligne : Variable`**, **`Sortie Ligne : Fixe (Pass-Through 100%)`** et **`Basculer Sortie Ligne Fixe/Variable`** (`SetOutputFixed`), idéales lorsqu'un **Sonos Port** ou **Sonos Connect** attaque un amplificateur Hi-Fi ou Home-Cinéma externe.
- **Sortie Subwoofer & Gain Caisson (Sonos Amp & Caissons Sonos Sub / Sub Mini) :**
  - Commandes `Subwoofer` (`On` / `Off` / `Toggle`) et curseur `Gain Subwoofer niveau` (`-15 dB` à `+15 dB`).

### 3. Multiroom Complet (Groupes, Coordinateur, Mode Party & Volume Groupe)
- **Informations Multiroom temps réel :** `Groupe Multiroom` (ex. `Salon + Cuisine`), `Membres du groupe`, `Coordinateur du groupe`, `Est Coordinateur` (`0`/`1`), `En groupe Multiroom` (`0`/`1`).
- **Actions de groupement :**
  - **`Isoler / Quitter le groupe`** (`leave_group`) : rend la pièce indépendante en 1 clic.
  - **`Mode Party (Grouper tout le foyer)`** (`party_mode`) : regroupe instantanément toutes les pièces Sonos actives sur cet équipement.
  - **Commandes dynamiques `Grouper avec : <Pièce>`** créées automatiquement pour chaque autre équipement Sonos du foyer + commande scénario `Grouper avec (Nom de pièce)`.
- **Volume & Sourdine de Groupe :** `Volume Groupe` (`0` à `100 %`), `Volume Groupe niveau` (slider), `Volume Groupe +`, `Volume Groupe -`, `Muet Groupe`.
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`) :** commandes `volume_max` et `volume_max_set` permettant d'imposer un plafond de volume selon le mode de la maison (ex. *Nuit enfant*), avec bridage des commandes (`volume_set`, `volume_up`, `group_volume_set`, `group_volume_up`, `tts`), adaptation visuelle du curseur sur le widget et **abaissement automatique en temps réel** si le volume est augmenté depuis l'application Sonos, AirPlay, Spotify Connect ou les boutons physiques de l'enceinte.

### 4. Favoris Sonos (`FV:2`), Playlists Sonos (`SQ:`) & Contrôles Multimédias
- **Synchronisation automatique 1 clic** des **Favoris Sonos (`FV:2`)** et des **Playlists Sonos (`SQ:`)** enregistrés dans l'application Sonos (Radios TuneIn / Sonos Radio, Playlists et Albums Spotify, Qobuz, TIDAL, Deezer, Apple Music, Amazon Music, Plex, Bibliothèque NAS).
- **Transport complet :** `Play / Pause`, `Lecture`, `Pause`, `Stop`, `Précédent`, `Suivant`, `Aléatoire (Shuffle)`, `Répéter (Repeat)`, `Fondu enchaîné (Crossfade)`, `Vider la file d'attente`.
- **Métadonnées temps réel :** `Statut lecture`, `Titre`, `Artiste`, `Album`, `Pochette` (jaquette haute résolution), `Format / Service`, `Position piste`, `Durée piste`.

### 5. Annonces Vocales TTS (Text-To-Speech) & Jingles avec Reprise Automatique (`Snapshot & Restore`)
- Commande **`Dire (TTS avec reprise)`** (`tts`, sous-type `message` : *Titre* = Volume optionnel ex. `45`, *Message* = Texte à prononcer) et tiroir **Annonce Vocale TTS** intégré directement dans le widget Dashboard.
- Commande **`Jouer Jingle / MP3 (avec reprise)`** (`play_clip`, sous-type `message`).
- **Mécanisme `Snapshot & Restore` automatique :**
  1. Sauvegarde l'état complet avant l'annonce (lecture en cours, groupe Multiroom, URI, numéro de piste dans la file d'attente, position temporelle à la seconde près `00:xx:xx`, volume et sourdine).
  2. Génère le fichier audio de synthèse vocale (via le moteur TTS de Jeedom ou `pico2wave` local), règle le volume d'annonce et diffuse le message.
  3. Dès la fin de l'annonce, **restaure automatiquement** le volume initial, le groupe Multiroom, la source ou la piste, la position temporelle et relance la lecture.

### 6. Égaliseur Hi-Fi, Modes Home-Cinéma & Système
- **Égaliseur :** `Graves (Bass)` (`-10` à `+10 dB`), `Aigus (Treble)` (`-10` à `+10 dB`), `Loudness` (`On` / `Off` / `Toggle`).
- **Home-Cinéma (Sonos Amp HDMI ARC, Arc, Beam, Ray, Playbar) :** `Mode Nuit (Night Sound)` (`On` / `Off` / `Toggle`) et `Amélioration Vocale (Speech Enhancement / DialogLevel)` (`On` / `Off` / `Toggle`).
- **Système :** Calibrage acoustique `Trueplay` (`On` / `Off`), `Voyant LED` de façade (`On` / `Off`), `Minuterie de veille (Sleep Timer)` (`0` à `120 min`), et niveau de `Batterie (%)` / `En charge` pour les **Sonos Move** et **Sonos Roam**.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud) :** Toutes les communications s'effectuent exclusivement sur votre réseau local (LAN) entre votre box Jeedom et vos équipements Sonos via les protocoles locaux UPnP / SOAP et GENA sur le port TCP `1400` (et UDP `1900` pour la découverte SSDP). Aucun compte cloud Sonos, mot de passe utilisateur ni jeton OAuth externe n'est requis ni stocké.
- **Données stockées & Protection des secrets (Zéro secret dans `ps aux`) :** Seuls l'adresse IP locale, l'identifiant technique local `RINCON_...`, le nom du modèle et la liste des favoris locaux sont enregistrés dans la base de données locale de votre box Jeedom pendant la durée de vie de l'équipement. La configuration transmise au démon local utilise un fichier temporaire dans `jeedom::getTmpFolder('altSonos')` verrouillé par des permissions strictes (`chmod 0600`) et supprimé à l'arrêt du démon (`@unlink`). Aucune clé API (`--apikey`) n'est passée en argument de ligne de commande.
- **Mesures de sécurité réseau :**
  - Le socket de contrôle interne du démon Python écoute exclusivement sur l'interface de bouclage locale (`127.0.0.1`, port `55095` par défaut) et vérifie systématiquement la clé API interne Jeedom du plugin à chaque requête.
  - Les fichiers audio temporaires d'annonces vocales TTS sont générés dans `jeedom::getTmpFolder('altSonos') . '/tts'`, purgés automatiquement et servis sur le LAN via un jeton cryptographique HMAC-SHA256 (`jeeAltSonosTts.php`).
  - Le protocole UPnP local Sonos sur le port `1400` étant conçu pour un usage sur réseau local de confiance, il est recommandé d'utiliser ce plugin sur un réseau domestique privé et protégé (WPA2/WPA3 ou VLAN domotique/multimédia dédié) et de ne jamais exposer le port `1400` de vos équipements Sonos sur Internet.

---

## Auteur & Licence

- **Auteur :** Aurélien Léovant (`alt-erre`)
- **Copyright :** © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Sonos, Inc.).
- **Licence :** Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
