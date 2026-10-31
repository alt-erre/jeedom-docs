# Changelog — Alt Denon (`altDenon`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.5] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.5` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## `[0.1.0-beta.4]` — 2026-10-27

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, de `0` à `98`, par défaut `98`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant*).
  - **Application immédiate & Surveillance temps réel (Auto-clamp)** : abaisse immédiatement le volume si celui-ci dépasse le nouveau plafond lors de l'activation du mode, plafonne les commandes Jeedom (`volume_set`, `volume_db_set`, `volume_up`, `z2_volume_set`, `z3_volume_set`) et ramène automatiquement le volume au plafond si quelqu'un le dépasse depuis la télécommande IR Denon ou HDMI CEC.
  - **Bridage visuel sur le widget Dashboard** : adaptation dynamique en temps réel de la borne `max` du curseur de volume.

## `[0.1.0-beta.3]` — 2026-10-27

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (transport, volume, muet, D-Pad OSD, modes sonores, Quick Select, alimentation).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## `[0.1.0-beta.2]` — 2026-10-21

### Ajouté
- **Découverte automatique sur le réseau local (`Scanner le réseau`)** : nouveau bouton d'action sur la page d'accueil du plugin combinant la découverte **SSDP / UPnP** et le scan rapide **HEOS CLI (`TCP 1255`)** pour détecter automatiquement les amplificateurs Denon & Marantz sur le LAN, récupérer leur nom, modèle, numéro de série, firmware et `pid` HEOS, créer l'équipement et synchroniser automatiquement ses sources personnalisées et favoris.
- **Import en 1 clic depuis `denonavr` (`Importer denonavr`)** : nouveau bouton sur la page d'accueil du plugin permettant de migrer automatiquement et **strictement en lecture seule** (conformément à l'Art. 4.4 des CGU Jeedom Market) les équipements configurés dans l'ancien plugin `denonavr` (`MAIN`, `ZONE2`, `ZONE3`) avec synchronisation immédiate des entrées renommées.

---

## `[0.1.0-beta.1]` — 2026-10-21 (Première publication Beta)

### Ajouté
- **Architecture Tri-Protocole 100 % locale** spécialement conçue pour le **Denon AVC-X8500HA** et l'ensemble des gammes Denon / Marantz (AVC-A1H, Série X, Série S, Cinema, HEOS) :
  - **Démon Python Temps Réel (`altDenond.py`)** maintenant une connexion TCP persistante sur le port `23` (Denon AVR Control ASCII) et sur le port `1255` (HEOS CLI JSON) via un hub mutualisé par adresse IP (`DenonHostHub`), garantissant une remontée d'état instantanée (`< 50 ms`) et zéro collision TCP.
  - **Mode HTTP local direct (sans démon) & Fallback automatique** via `/goform/AppCommand.xml` et `/goform/formiPhoneAppDirect.xml` (ports `8080` et `80`).
- **Contrôle complet du Denon AVC-X8500HA :**
  - **Alimentation & Multi-Zones :** pilotage de la `Main Zone`, de la `Zone 2` et de la `Zone 3` (intégrées dans l'équipement principal ou en équipements dédiés partageant la même connexion TCP).
  - **Volume haute précision :** double commande/état synchronisée en **dB relatifs (`-80.0 dB` à `+18.0 dB`, pas de `0.5 dB`)** et en **échelle absolue (`0` à `98`)**, avec `Volume +`, `Volume -` et `Muet (On / Off / Bascule)`.
  - **Découverte dynamique des entrées :** synchronisation en 1 clic des entrées activées et renommées dans l'amplificateur (`GetRenameSource` / `GetDeletedSource`), incluant l'entrée dédiée **`8K`** du **Denon AVC-X8500HA**.
  - **Sorties Vidéo HDMI Dual Monitor :** bascule directe entre `Monitor 1 (TV eARC)`, `Monitor 2 (Projecteur)` et `Auto (Dual Monitor 1+2)` ainsi que le routage Audio HDMI (`Ampli` / `TV`).
  - **Modes Surround 13.2ch & Calibrage Audyssey MultEQ XT32 :** sélection du mode d'écoute (`Movie`, `Music`, `Game`, `Direct`, `Pure Direct`, `Stereo`, `Auto`, `Dolby Atmos / Surround`, `DTS:X Pro / Neural:X`, `Auro-3D`, `Auro-2D Surround`, `Multi Ch Stereo`, `Virtual`), courbe `Audyssey MultEQ XT32` (`Reference`, `L/R Bypass`, `Flat`, `Off`), `Dynamic EQ`, `Dynamic Volume`, `Audyssey LFC`, `Dialog Enhancer`, bascule `Speaker Preset 1 / 2` et niveaux `Canal Central` / `Subwoofer`.
  - **Streaming HEOS & Favoris :** remontée en temps réel du `Titre`, `Artiste`, `Album`, `Pochette` et `Statut lecture`, contrôles de transport (`Play/Pause`, `Stop`, `Précédent`, `Suivant`) et découverte automatique des **Favoris HEOS**.
  - **Fonctions rapides & Télécommande OSD :** `Quick Select 1 à 4`, `Mode ECO` (`Auto`, `On`, `Off`), `Minuterie de veille (Sleep Timer)` et pavé directionnel OSD complet (`Menu Setup`, flèches, `OK`, `Retour`, `Info`, `Option`).
- **Widget Cockpit Home-Cinéma « Dark Glass » (`alt-erre`)** pour Dashboard et Mobile avec 5 thèmes de couleur, vignette dynamique par source (`8K`, `Blu-ray`, `Game`, `TV eARC`, `HEOS`...) et tiroirs repliables (Calibrage Audyssey / Multi-Zones & Télécommande OSD `132×132 px`).
