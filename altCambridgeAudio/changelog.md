# Changelog - Alt Cambridge Audio (`altCambridgeAudio`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.13] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.12] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altCambridgeAudio.html`, `core/template/mobile/altCambridgeAudio.html`, `core/class/altCambridgeAudio.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.11] - 2026-11-02 (Canal Beta)

### Ajouté
- **Widget Kiosk TV 10-Foot natif avec mise en valeur de la jaquette StreamMagic (`getKioskWidgetData()`, `kiosk_schema = 1`)** :
  - Intégration native Niveau 2 pour **`altTvDashboard`** mettant en avant la pochette d'album StreamMagic ou un cadran Hi-Fi DAC Dark Glass affichant la source et le flux audio actif.
  - Exposition 10-Foot de l'alimentation, du transport, du volume bridé à `volume_max`, des sources numériques/analogiques, des sorties enceintes et des Presets StreamMagic.

## [0.1.0-beta.10] - 2026-11-01 (Canal Beta)

### Corrigé & Amélioré
- **Correction de l'alignement de la barre de volume du Widget Dashboard** : isolation stricte de la largeur du sélecteur `Max %` (`width: auto !important; max-width: 66px !important; flex: 0 0 auto !important;`) et de la largeur minimale du curseur `<input type="range">` (`min-width: 60px !important`) afin de neutraliser la règle globale `select { width: 100% }` du Core Jeedom.
- **Mise en valeur immersive des jaquettes StreamMagic (Dashboard & Mobile)** :
  - Agrandissement de la pochette de `58×58 px` à **`74×74 px`** sur le Dashboard (`56×56 px` sur Mobile) avec relief 3D et zoom au survol.
  - Ajout d'un **halo d'ambiance flouté (`.ca-now-playing-bg`)** en arrière-plan de la carte de lecture et d'un **aperçu Lightbox plein widget au clic sur la pochette**.

## [0.1.0-beta.9] - 2026-10-31 (Canal Beta)

### Ajouté
- **Sélecteur rapide de Volume Maximum sur le Widget Dashboard (`10 %` à `70 %` par palier de 5)** :
  - Ajout d'un sélecteur rapide (`Max 10%` à `Max 70%` par pas de `5 %`, ainsi que `Max 100%`) directement sur la barre de volume du widget Dashboard, avec badge ambré `.is-capped` lorsqu'un plafond est actif et création automatique des commandes `volume_max` / `volume_max_set` au rendu.

## [0.1.0-beta.8] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.7] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.7` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.6] - 2026-10-27 (Canal Beta)

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, en `%`, par défaut `100 %`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables directement dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant* à `30 %`, mode *Jour* à `100 %`).
  - **Abaissement immédiat & Surveillance temps réel (Auto-clamp)** : si le volume de l'ampli est supérieur au nouveau plafond lors de son activation, ou si le volume est monté au-dessus du plafond depuis une télécommande physique, AirPlay, Spotify Connect ou la molette en façade, le plugin ramène automatiquement et instantanément le volume au plafond autorisé.
  - **Bridage visuel du slider sur le widget Dashboard** : la borne maximale du curseur de volume s'adapte en temps réel au plafond actif (avec indication en infobulle).

## [0.1.0-beta.5] - 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement - Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons interactifs des widgets **Dashboard & Mobile** (transport, volume, muet, alimentation, favoris).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) de l'en-tête du widget.
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.4] - 2026-10-20 (Canal Beta)

### Corrigé
- **Rendu visuel fidèle à la base `altAirMedia` (Contours, Dégradés & Boutons ronds)** :
  - Alignement exact des variables CSS (`--ca-bg`, `--ca-card`, `--ca-card-border`), ajout du contour extérieur `1px solid rgba(255, 255, 255, 0.20) !important` (`border-radius: 16px !important`), de la barre d'en-tête bord-à-bord avec filet de séparation et verrouillage de `border-radius: 50% !important` sur tous les boutons circulaires face aux surcharges CSS de Jeedom Core.
  - Inclusion de toutes les commandes `source_*`, `output_*` et `preset_*` dans les menus déroulants du widget personnalisé même lorsque les commandes unitaires sont masquées (`isVisible = 0`), et remplacement du libellé technique `IDLE` en veille par `- Choisir une source -`.

## [0.1.0-beta.3] - 2026-10-20 (Canal Beta)

### Corrigé
- **Liste déroulante des Sources (`#inputs_options#`)** :
  - Prise en charge des commandes de sources générées avec le préfixe `source_<ID>` (et la configuration `smoip_source_id`) dans `toHtml()`, ainsi que déclenchement automatique de `syncDynamicCommands()` si aucune commande de source n'existe encore sur l'équipement.
  - Protection du placeholder `#input_id#` (et `#audio_output_id#`) contre l'écrasement par la commande info `input_id` (identifiant technique StreamMagic, désormais exposé sous `#source_tech_id#`).

### Amélioré
- **Vignette dynamique par Source dans la Carte État (Dashboard & Mobile)** :
  - La vignette de la carte État affiche désormais un visuel dédié par source active (`TV ARC / eARC`, `Spotify`, `AirPlay`, `Bluetooth`, `TIDAL`, `Qobuz`, `Roon Ready`, `Chromecast`, `Internet Radio`, `Phono MM/MC`, `Optique D1/D2`, `Coaxial`, `USB Audio DAC`, `XLR`, `RCA`, `UPnP`, `Veille`) avec icône, libellé court et dégradé teinté.
  - Lorsqu'une pochette d'album est affichée, un badge d'icône de la source active apparaît en surimpression dans le coin inférieur droit de la pochette.

## [0.1.0-beta.2] - 2026-10-20 (Canal Beta)

### Modifié
- **Harmonisation graphique des widgets Dashboard et Mobile (`alt-erre` Dark Glass)** :
  - Adoption du système de design unifié `alt-erre` (sur le modèle d'`altAirMedia`) : en-tête intégré `.ca-header` avec boutons circulaires *Power* et *Refresh*, carte média `.ca-now-playing` avec vignette `58×58 px` et point lumineux d'état `.ca-status-dot`, barre de transport circulaire avec bouton central *Play/Pause* `40×40 px`, barre de volume `.ca-volume-box` et sélecteurs `.ca-select`.
  - Ajout du sélecteur de thème couleur par équipement (`Noir Dark Glass`, `Blanc`, `Bleu`, `Jaune`, `Rouge`).

## [0.1.0-beta.1] - 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % local des amplificateurs et lecteurs réseau **Cambridge Audio** via le protocole `StreamMagic / SMOIP` (Evo 150, Evo 75, Evo One, CXN, CXN v2, CXN100, MXN10, AXN10, EXN100, Edge NQ, 851N).
- Double mode de communication au choix : **HTTP local direct** (sans démon) ou **WebSocket temps réel** (démon Python optionnel avec repli HTTP automatique).
- Découverte et synchronisation dynamique des entrées (sources), des sorties enceintes (`Speaker A`, `Speaker B`, `Speaker A+B`) et des presets (`1` à `99`).
- Remontée temps réel des métadonnées de lecture (titre, artiste, album, pochette, format audio/codec/échantillonnage).
- Widget dédié haute lisibilité + support du widget standard Jeedom Core v4.

### Sécurité & Conformité
- Transmission de la configuration au démon local via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
