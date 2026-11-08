# Changelog - Plugin Alt Multiroom Audio (Sonos) (`altSonos`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](../VERSIONING.md).

---

## [0.1.0-beta.12] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.11] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.10] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altSonos.html`, `core/template/mobile/altSonos.html`, `core/class/altSonos.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.9] - 2026-11-02 (Canal Beta)

### Ajouté
- **Widget Kiosk TV 10-Foot natif avec mise en valeur de la jaquette (`getKioskWidgetData()`, `kiosk_schema = 1`)** :
  - Intégration native Niveau 2 pour **`altTvDashboard`** mettant en avant la pochette d'album UPnP `:1400/getaa` / CDN ou une illustration vinyle Dark Glass dédiée (entrée TV eARC, Dolby Atmos, Line-In, veille).
  - Exposition 10-Foot à la télécommande du transport complet, du volume pièce et groupe bridés à `volume_max`, des entrées TV/Ligne, des modes *Night Sound* et *Speech Enhancement*, du groupement Multiroom et des Favoris / Playlists Sonos.

## [0.1.0-beta.8] - 2026-11-01 (Canal Beta)

### Corrigé & Amélioré
- **Correction de l'alignement de la barre de volume du Widget Dashboard** : isolation stricte de la largeur du sélecteur `Max %` (`width: auto !important; max-width: 66px !important; flex: 0 0 auto !important;`) et de la largeur minimale du curseur `<input type="range">` (`min-width: 60px !important`) afin de neutraliser la règle globale `select { width: 100% }` du Core Jeedom.
- **Mise en valeur immersive des jaquettes d'albums et stations (Dashboard & Mobile)** :
  - Agrandissement de la pochette de `58×58 px` à **`74×74 px`** sur le Dashboard (`56×56 px` sur Mobile) avec relief 3D et zoom au survol.
  - Ajout d'un **halo d'ambiance flouté (`.sn-now-playing-bg`)** en arrière-plan de la carte de lecture et d'un **aperçu Lightbox plein widget au clic sur la pochette**.

## [0.1.0-beta.7] - 2026-10-31 (Canal Beta)

### Ajouté
- **Sélecteur rapide de Volume Maximum sur le Widget Dashboard (`10 %` à `70 %` par palier de 5)** :
  - Ajout d'un sélecteur rapide (`Max 10%` à `Max 70%` par pas de `5 %`, ainsi que `Max 100%`) directement sur la barre de volume du widget Dashboard, avec badge ambré `.is-capped` lorsqu'un plafond est actif et création automatique des commandes `volume_max` / `volume_max_set` au rendu.

## [0.1.0-beta.6] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.5] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.5` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.4] - 2026-10-27 (Canal Beta)

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, en `%`, par défaut `100 %`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant*).
  - **Application immédiate & Surveillance temps réel (Auto-clamp)** : abaisse immédiatement le volume si celui-ci dépasse le nouveau plafond lors du changement de mode, plafonne toutes les commandes Jeedom (`volume_set`, `volume_up`, `group_volume_set`, `group_volume_up`, annonces vocales `tts`) et ramène automatiquement le volume au plafond si quelqu'un le dépasse depuis les boutons physiques de l'enceinte, AirPlay ou Spotify Connect.
  - **Bridage visuel sur le widget Dashboard** : adaptation dynamique en temps réel de la borne `max` des curseurs de volume pièce, groupe et TTS.

## [0.1.0-beta.3] - 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement - Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (transport, volume, muet, modes de lecture, réglages audio *Night Sound* / *Speech Enhancement* / *Sub* / *Loudness*, gestion de groupe).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.2] - 2026-10-22 (Canal Beta)

### Corrigé
- **Retour d'état en temps réel du Volume et des contrôles sur les widgets Dashboard & Mobile** :
  - Ajout des abonnements `jeedom.cmd.addUpdateFunction` sur l'ensemble des commandes info du widget (`volume`, `mute_state`, `group_volume`, `group_mute_state`, `power_state`, `play_state`, `title`, `artist`, `album`, `art_url`, `audio_format`, `input`, `input_id`, `group_name`, `is_grouped`, `output_fixed_state`, `line_out_mode`, `shuffle_state`, `repeat_state`, `crossfade_state`, `bass`, `treble`, `loudness_state`, `sub_enabled`, `night_mode`, `dialog_level`, `trueplay_state`, `led_state`).
  - Mise à jour instantanée de la barre de curseur (`slider`) et du pourcentage (`#volume#%`) lors d'un clic sur les boutons **Volume `+` / `-`** (retour visuel immédiat + lecture directe de `<NewVolume>` dans la réponse SOAP `SetRelativeVolume`).
  - Séparation des jetons `#input_cmd_id#` et `#input_id#` dans `toHtml()` pour éviter toute collision entre la valeur de l'identifiant d'entrée et l'ID numérique de la commande `input`.
  - Liaison explicite (`setValue`) des commandes `volume_up` / `volume_down` et `group_volume_up` / `group_volume_down` à leurs commandes info respectives.

---

## [0.1.0-beta.1] - 2026-10-21 (Canal Beta)

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
