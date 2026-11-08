# Changelog - Alt Air Média (`altAirMedia`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.15] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.14] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.13] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altAirMedia.html`, `core/template/mobile/altAirMedia.html`, `core/class/altAirMedia.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.12] - 2026-11-02 (Canal Beta)

### Ajouté
- **Widget Kiosk TV 10-Foot natif avec mise en valeur de la jaquette Apple TV & HomePod (`getKioskWidgetData()`, `kiosk_schema = 1`)** :
  - Intégration native Niveau 2 pour **`altTvDashboard`** mettant en avant la pochette locale mise en cache (`1:1`), un visuel acoustique HomePod ou une bannière panoramique `16:9` tvOS selon l'appareil actif.
  - Exposition 10-Foot de l'alimentation, du transport, du volume bridé à `volume_max`, des touches système Apple TV (*Accueil tvOS*, *Retour*, *Centre de contrôle*, *Économiseur Aerial*) et du lanceur d'applications tvOS.

## [0.1.0-beta.11] - 2026-11-01 (Canal Beta)

### Corrigé & Amélioré
- **Correction de l'alignement de la barre de volume du Widget Dashboard** : isolation stricte de la largeur du sélecteur `Max %` (`width: auto !important; max-width: 66px !important; flex: 0 0 auto !important;`) et de la largeur minimale du curseur `<input type="range">` (`min-width: 60px !important`) afin de neutraliser la règle globale `select { width: 100% }` du Core Jeedom qui étirait le menu déroulant et écrasait le curseur de volume.
- **Mise en valeur immersive des jaquettes multimédias (Dashboard & Mobile)** :
  - Agrandissement de la jaquette de `58×58 px` à **`74×74 px`** sur le Dashboard (`56×56 px` sur Mobile) avec ombre portée 3D profonde, liseré lumineux et zoom fluide au survol.
  - Ajout d'un **halo d'ambiance flouté et saturé (`.am-media-card-bg`)** projetant les couleurs de la jaquette en arrière-plan de la carte média.
  - Ajout d'une **vue Lightbox plein widget au clic sur la jaquette** permettant d'admirer la pochette en grand format avec le titre et l'artiste.

## [0.1.0-beta.10] - 2026-10-31 (Canal Beta)

### Ajouté
- **Sélecteur rapide de Volume Maximum sur le Widget Dashboard (`10 %` à `70 %` par palier de 5)** :
  - Ajout de l'affichage du pourcentage de volume et d'un sélecteur rapide de plafond (`Max 10%` à `Max 70%` par pas de `5 %`, ainsi que `Max 100%`) directement sur la barre de volume du widget Dashboard, avec badge ambré `.is-capped` lorsqu'un plafond est actif et création automatique des commandes `volume_max` / `volume_max_set` au rendu.

## [0.1.0-beta.9] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.8] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.8` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.7] - 2026-10-30 (Canal Beta)

### Corrigé
- **Démon (`Task exception was never retrieved` dans `pyatv/support/knock.py`)** : correction d'un bug interne de la bibliothèque `pyatv` où les tâches de réveil réseau Bonjour (`_async_knock` sur les ports `49152`, `32498`, etc.) terminées avec `OSError(113, EHOSTUNREACH)` (lorsqu'un HomePod ou une Apple TV est débranché ou hors réseau Wi-Fi) n'étaient pas consommées après `asyncio.wait(..., return_when=FIRST_EXCEPTION)`, générant des traces `ERROR Task exception was never retrieved` dans le log du démon.

## [0.1.0-beta.6] - 2026-10-30 (Canal Beta)

### Amélioré & Corrigé
- **Métadonnées & Jaquettes des applications vidéo tvOS (Netflix, séries TV, flux `media_type = unknown`)** :
  - Prise en charge des champs spécifiques aux séries et contenus vidéo dans `pyatv` (`series_name`, `season_number`, `episode_number`) pour formater automatiquement le titre et le sous-titre (`SxxExx`).
  - Suppression du blocage qui ignorait le téléchargement de la jaquette lorsque l'application tvOS remontait `media_type = unknown` (cas fréquent sur les lecteurs vidéo tiers).
  - Ajout d'une clé de cache composite (`hash` + `artwork_id` + `title`) et d'une re-vérification asynchrone différée (`+2,5 s` et `+6,5 s` après le démarrage du flux) lorsque les métadonnées MRP (`ContentItemUpdate`) sont publiées après le buffering vidéo.

## [0.1.0-beta.5] - 2026-10-27 (Canal Beta)

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, en `%`, par défaut `100 %`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant*).
  - **Abaissement immédiat & Surveillance temps réel (Auto-clamp)** : abaisse immédiatement le volume de l'Apple TV ou du HomePod s'il dépasse le nouveau plafond lors du changement de mode ou s'il est monté au-dessus du plafond depuis une télécommande Siri Remote / iPhone / AirPlay.
  - **Bridage visuel sur le widget Dashboard** : la borne `max` du curseur de volume s'adapte en temps réel au plafond actif.

## [0.1.0-beta.4] - 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement - Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) au clic sur tous les boutons interactifs des widgets **Dashboard & Mobile** (D-Pad, transport, volume, puissance).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) de l'en-tête du widget.
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*) dans la configuration de l'équipement et les templates.

## [0.1.0-beta.3] - 2026-10-20 (Canal Beta)

### Amélioré
- **Vignette dynamique par Application / Source dans la Carte État (Dashboard & Mobile)** :
  - La vignette `.am-artwork-box` s'adapte désormais dynamiquement à l'application active sur l'Apple TV ou le HomePod (`Netflix`, `YouTube`, `Prime Video`, `Disney+`, `CANAL+`, `Molotov`, `Oqee / Free TV`, `Infuse`, `Plex`, `Spotify`, `Apple Music`, `Podcasts`, `Twitch`, `AirPlay`, `Veille`) avec une icône dédiée, un libellé court en capitales et un dégradé coloré.
  - Lorsqu'une pochette d'album est affichée, un mini-badge d'icône de l'application s'affiche en surimpression dans le coin inférieur droit de la vignette.

## [0.1.0-beta.2] - 2026-10-19 (Canal Beta)

### Corrigé
- **Démon (`Errno 98: address already in use`)** : fermeture immédiate du socket TCP interne dès le début de la séquence d'arrêt du démon Python, activation de `reuse_address=True`, écriture/suppression atomique du fichier PID après ouverture du port et attente active de libération du port dans `deamon_stop()` (avec détection `ps auxww` sans troncature à 80 colonnes).

## [0.1.0-beta.1] - 2026-10-19 (Canal Beta)

### Ajouté
- Démon mono-processus 100 % Python `asyncio` (`pyatv`) à très faible empreinte mémoire (~35 Mo RAM, zéro Node.js).
- Pilotage temps réel des **Apple TV** (HD, 4K toutes générations, Gen 3) et **HomePod** (Original, Mini, Gen 2).
- Appairage interactif `AirPlay` et `Companion` directement depuis l'interface web Jeedom (modale dédiée avec saisie du code PIN).
- Outil d'import automatique en 1 clic des équipements et clés depuis l'ancien plugin `aTVremote` (en lecture seule).
- Double mode de widget par équipement : Widget Télécommande / Lecteur dédié ou Widget standard Jeedom Core v4.
- Gestion asynchrone du cache des pochettes d'album avec nettoyage automatique.

### Sécurité & Conformité
- Transmission sécurisée des équipements et clés d'appairage au démon via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
