# Changelog — Plugin Alt Multiroom Audio (Sonos) (`altSonos`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](../VERSIONING.md).

---

## [0.1.0-beta.6] — 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.5] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.5` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.4] — 2026-10-27 (Canal Beta)

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, en `%`, par défaut `100 %`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant*).
  - **Application immédiate & Surveillance temps réel (Auto-clamp)** : abaisse immédiatement le volume si celui-ci dépasse le nouveau plafond lors du changement de mode, plafonne toutes les commandes Jeedom (`volume_set`, `volume_up`, `group_volume_set`, `group_volume_up`, annonces vocales `tts`) et ramène automatiquement le volume au plafond si quelqu'un le dépasse depuis les boutons physiques de l'enceinte, AirPlay ou Spotify Connect.
  - **Bridage visuel sur le widget Dashboard** : adaptation dynamique en temps réel de la borne `max` des curseurs de volume pièce, groupe et TTS.

## [0.1.0-beta.3] — 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (transport, volume, muet, modes de lecture, réglages audio *Night Sound* / *Speech Enhancement* / *Sub* / *Loudness*, gestion de groupe).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.2] — 2026-10-22 (Canal Beta)

### Corrigé
- **Retour d'état en temps réel du Volume et des contrôles sur les widgets Dashboard & Mobile** :
  - Ajout des abonnements `jeedom.cmd.addUpdateFunction` sur l'ensemble des commandes info du widget (`volume`, `mute_state`, `group_volume`, `group_mute_state`, `power_state`, `play_state`, `title`, `artist`, `album`, `art_url`, `audio_format`, `input`, `input_id`, `group_name`, `is_grouped`, `output_fixed_state`, `line_out_mode`, `shuffle_state`, `repeat_state`, `crossfade_state`, `bass`, `treble`, `loudness_state`, `sub_enabled`, `night_mode`, `dialog_level`, `trueplay_state`, `led_state`).
  - Mise à jour instantanée de la barre de curseur (`slider`) et du pourcentage (`#volume#%`) lors d'un clic sur les boutons **Volume `+` / `-`** (retour visuel immédiat + lecture directe de `<NewVolume>` dans la réponse SOAP `SetRelativeVolume`).
  - Séparation des jetons `#input_cmd_id#` et `#input_id#` dans `toHtml()` pour éviter toute collision entre la valeur de l'identifiant d'entrée et l'ID numérique de la commande `input`.
  - Liaison explicite (`setValue`) des commandes `volume_up` / `volume_down` et `group_volume_up` / `group_volume_down` à leurs commandes info respectives.

---

## [0.1.0-beta.1] — 2026-10-21 (Canal Beta)

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Multiroom Audio (Sonos) (`altSonos`)** pour Jeedom v4.
- **Architecture Bi-Mode 100 % Locale (Zéro Cloud)** :
  - **Mode UPnP / SOAP HTTP direct (sans démon ni dépendance)** sur le port local `1400`, fonctionnel immédiatement dès l'activation du plugin.
  - **Mode Événements UPnP GENA Temps Réel (`SUBSCRIBE` / `NOTIFY` via le démon Python `altSonosd.py`)** avec repli automatique en HTTP et protection stricte de la clé API via fichier temporaire `chmod 0600` (aucun secret dans `ps aux`).
- **Découverte Automatique 1 Clic (`Scanner le réseau Sonos`)** :
  - Détection automatique par **SSDP Multicast UDP (`239.255.255.250:1900`)** et lecture de la **Topologie complète du foyer (`ZoneGroupTopology`)** à partir d'une IP d'amorçage optionnelle (compatible Docker et sous-réseaux/VLANs).
- **Support approfondi des Amplis & Lecteurs Réseau (`Sonos Amp`, `Sonos Port`, `Sonos Connect`, `Connect:Amp`) ainsi que de toute la gamme S1 & S2 (`Era 100/300`, `Arc`, `Beam`, `Ray`, `Five`, `One`, `Move`, `Roam`, `Sub`, `SYMFONISK`)** :
  - **Entrée Ligne RCA (`Line-In`)** locale et partage automatique des entrées Line-In de tous les équipements Sonos du foyer.
  - **Entrée TV (`HDMI ARC / Optique`)** directe pour **Sonos Amp** et barres de son Home-Cinéma.
  - **Niveau de Sortie Ligne RCA Variable vs Fixe 100 % Pass-Through (`SetOutputFixed`)** spécifique aux **Sonos Port** et **Sonos Connect**.
  - **Contrôle Subwoofer** (`On/Off/Toggle` et réglage du `Gain Subwoofer` de `-15` à `+15 dB`).
- **Gestion Multiroom complète & Délégation transparente au Coordinateur** :
  - Informations de groupe (`Groupe Multiroom`, `Membres`, `Coordinateur`, `Est Coordinateur`, `En groupe`), commandes `Isoler / Quitter le groupe`, `Mode Party (Grouper tout le foyer)`, commandes dynamiques `Grouper avec : <Pièce>` et contrôle du `Volume Groupe` (`0` à `100 %`).
- **Synchronisation dynamique des Favoris Sonos (`FV:2`) & Playlists Sonos (`SQ:`)** via `ContentDirectory::Browse`.
- **Synthèse Vocale TTS (`Dire`) & Jingles MP3 avec reprise automatique (`Snapshot & Restore`)** : sauvegarde et restauration automatique de l'état de lecture, du groupe, de l'URI, de la piste, de la position temporelle et du volume.
- **Égaliseur Hi-Fi & Modes Home-Cinéma** : `Graves (Bass)`, `Aigus (Treble)`, `Loudness`, `Mode Nuit (Night Sound)`, `Amélioration Vocale (Speech Enhancement)`, `Trueplay`, `Voyant LED`, `Minuterie de veille`.
- **Widgets personnalisés Dashboard & Mobile « Dark Glass »** avec 5 thèmes de couleur (`Noir`, `Blanc`, `Bleu`, `Ambre`, `Rouge`), vignette dynamique par source et 3 tiroirs repliables (*Multiroom*, *Audio / Amp / Port / EQ* et *Annonce Vocale TTS*).
