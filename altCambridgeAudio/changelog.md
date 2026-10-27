# Changelog — Alt Cambridge Audio (`altCambridgeAudio`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.5] — 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons interactifs des widgets **Dashboard & Mobile** (transport, volume, muet, alimentation, favoris).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) de l'en-tête du widget.
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.4] — 2026-10-20 (Canal Beta)

### Corrigé
- **Rendu visuel fidèle à la base `altAirMedia` (Contours, Dégradés & Boutons ronds)** :
  - Alignement exact des variables CSS (`--ca-bg`, `--ca-card`, `--ca-card-border`), ajout du contour extérieur `1px solid rgba(255, 255, 255, 0.20) !important` (`border-radius: 16px !important`), de la barre d'en-tête bord-à-bord avec filet de séparation et verrouillage de `border-radius: 50% !important` sur tous les boutons circulaires face aux surcharges CSS de Jeedom Core.
  - Inclusion de toutes les commandes `source_*`, `output_*` et `preset_*` dans les menus déroulants du widget personnalisé même lorsque les commandes unitaires sont masquées (`isVisible = 0`), et remplacement du libellé technique `IDLE` en veille par `— Choisir une source —`.

## [0.1.0-beta.3] — 2026-10-20 (Canal Beta)

### Corrigé
- **Liste déroulante des Sources (`#inputs_options#`)** :
  - Prise en charge des commandes de sources générées avec le préfixe `source_<ID>` (et la configuration `smoip_source_id`) dans `toHtml()`, ainsi que déclenchement automatique de `syncDynamicCommands()` si aucune commande de source n'existe encore sur l'équipement.
  - Protection du placeholder `#input_id#` (et `#audio_output_id#`) contre l'écrasement par la commande info `input_id` (identifiant technique StreamMagic, désormais exposé sous `#source_tech_id#`).

### Amélioré
- **Vignette dynamique par Source dans la Carte État (Dashboard & Mobile)** :
  - La vignette de la carte État affiche désormais un visuel dédié par source active (`TV ARC / eARC`, `Spotify`, `AirPlay`, `Bluetooth`, `TIDAL`, `Qobuz`, `Roon Ready`, `Chromecast`, `Internet Radio`, `Phono MM/MC`, `Optique D1/D2`, `Coaxial`, `USB Audio DAC`, `XLR`, `RCA`, `UPnP`, `Veille`) avec icône, libellé court et dégradé teinté.
  - Lorsqu'une pochette d'album est affichée, un badge d'icône de la source active apparaît en surimpression dans le coin inférieur droit de la pochette.

## [0.1.0-beta.2] — 2026-10-20 (Canal Beta)

### Modifié
- **Harmonisation graphique des widgets Dashboard et Mobile (`alt-erre` Dark Glass)** :
  - Adoption du système de design unifié `alt-erre` (sur le modèle d'`altAirMedia`) : en-tête intégré `.ca-header` avec boutons circulaires *Power* et *Refresh*, carte média `.ca-now-playing` avec vignette `58×58 px` et point lumineux d'état `.ca-status-dot`, barre de transport circulaire avec bouton central *Play/Pause* `40×40 px`, barre de volume `.ca-volume-box` et sélecteurs `.ca-select`.
  - Ajout du sélecteur de thème couleur par équipement (`Noir Dark Glass`, `Blanc`, `Bleu`, `Jaune`, `Rouge`).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % local des amplificateurs et lecteurs réseau **Cambridge Audio** via le protocole `StreamMagic / SMOIP` (Evo 150, Evo 75, Evo One, CXN, CXN v2, CXN100, MXN10, AXN10, EXN100, Edge NQ, 851N).
- Double mode de communication au choix : **HTTP local direct** (sans démon) ou **WebSocket temps réel** (démon Python optionnel avec repli HTTP automatique).
- Découverte et synchronisation dynamique des entrées (sources), des sorties enceintes (`Speaker A`, `Speaker B`, `Speaker A+B`) et des presets (`1` à `99`).
- Remontée temps réel des métadonnées de lecture (titre, artiste, album, pochette, format audio/codec/échantillonnage).
- Widget dédié haute lisibilité + support du widget standard Jeedom Core v4.

### Sécurité & Conformité
- Transmission de la configuration au démon local via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
