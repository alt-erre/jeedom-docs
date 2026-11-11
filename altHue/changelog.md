# Changelog - Alt Éclairage & Ambiance (Philips Hue) (`altHue`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte le [Versionnement Sémantique (SemVer 2.0.0)](../VERSIONING.md).

---

## [0.1.0-beta.11] - 2026-11-11 (Canal Beta)

### Ajouté
- **Dashboard Global de Supervision & Pilotage dans le Menu Accueil (`desktop/php/panel.php`, `desktop/js/panel.js`, `desktop/php/altHue.php`, `core/ajax/altHue.ajax.php`, `plugin_info/info.json`, `plugin_info/install.php`)** :
  - **Intégration native au menu `Accueil -> Alt Éclairage & Ambiance (Philips Hue)`** : déclaration `"display": "panel"` dans `plugin_info/info.json`, activation automatique de `displayDesktopPanel` / `displayMobilePanel` et ajout du bouton d'accès rapide **« Dashboard Hue »** sur la page d'administration du plugin.
  - **En-tête Hero & 6 Cartes KPI interactives avec actions groupées en 1 clic** :
    - Supervision en direct des Ponts Hue (`SSE LIVE`, IP, version firmware) et des boîtiers Hue Play HDMI Sync Box.
    - **6 KPI synthétiques cliquables** : *Pièces & Zones Hue* (nombre de pièces allumées, luminosité moyenne, boutons *Tout ON* / *Tout OFF*), *Hue Play & Gradient* (barres/rubans actifs, compteur d'ambiances Gradient/effets, boutons *ON* / *OFF*), *Ampoules & Spots* (compteur d'éclairages allumés et d'alimentations amont coupées, bouton *Tout OFF*), *Entertainment & Sync* (streaming actif et bouton *Stop Sync*), *Capteurs & Climat* (mouvements détectés, température moyenne `°C` et éclairement moyen `lx`) et *Interrupteurs & Piles* (santé des batteries).
    - Les actions groupées du Dashboard (`panelBulkAction`) exécutent les commandes Jeedom des équipements afin de respecter intégralement les règles d'interrupteurs amont externes (`upstreamOnMode`, `upstreamOffBehavior`) et les plafonds de luminosité (`brightness_max`).
  - **Navigation latérale, Filtres rapides & 3 Modes de Vue (`Synthèse`, `Widgets`, `Tableau`)** :
    - Volet latéral repliable par **Famille Hue** et par **Pièce Jeedom** (affichant pour chaque pièce un point lumineux si un éclairage y est allumé, la température moyenne `°C` des capteurs Hue de la pièce et le nombre d'équipements).
    - Barre d'outils avec recherche instantanée, filtres rapides **« Allumés / Actifs »** et **« Amont coupé »**, bascule de regroupement (**Par Famille** / **Par Pièce**) et bascule de thème **Dark Glass** / **Light Glass v1.5 (WCAG AAA)**.
    - Cartes synthétiques pilotables avec aperçu visuel dynamique de la couleur (`#RRGGBB`), du blanc (`Kelvin`) ou du dégradé multi-zones **Hue Play Gradient** (`linear-gradient`), sélecteur rapide de **Scène Hue** (sur les pièces/zones) ou de **Palette Gradient** (sur les Hue Play), commandes `ON` / `OFF` / `-10%` / `+10%` / `Couleur` et badge d'état d'alimentation amont.

## [0.1.0-beta.10] - 2026-11-11 (Canal Beta)

### Ajouté
- **Association d'un Interrupteur / Prise Commandée Amont Externe sur les Lampes, Hue Play, Pièces & Zones (`core/class/altHue.class.php`, `desktop/php/altHue.php`, `desktop/js/altHue.js`, `resources/althued/althued.py`)** :
  - **Correction temps réel de l'état (`listener` Jeedom + surcharge du polling/SSE)** : écoute instantanée de la commande d'état amont externe (`upstreamStateCmd`) et création de la commande info `upstream_power` (*Alimentation amont*). Dès que l'interrupteur ou la prise en amont est coupé (`0`), l'état (`state = 0`) et la luminosité (`brightness = 0 %`) sont immédiatement forcés à `0` avec affichage du badge **`AMONT OFF`** sur le widget, empêchant le pont Hue de conserver un état « Allumé » erroné lorsque l'alimentation électrique de l'ampoule est coupée.
  - **Sélecteur de mode à l'allumage (`upstreamOnMode`)** :
    - **`auto_on` (Allumer automatiquement l'interrupteur amont puis la lampe Hue)** : exécute automatiquement la commande `upstreamOnCmd`, attend le délai d'amorçage configurable (`upstreamBootDelayMs`, par défaut `1500 ms`), puis transmet la commande d'allumage/scène/couleur/luminosité au pont Hue.
    - **`block` (Bloquer / Refuser l'allumage)** : bloque tout ordre d'allumage tant que l'interrupteur amont est éteint (`0`) et maintient l'équipement à `0`.
    - **`ignore` (Ignorer à l'allumage)** : corrige uniquement l'état à `0` lorsque l'amont est coupé, sans bloquer ni piloter l'interrupteur amont.
  - **Option d'extinction de l'interrupteur amont (`upstreamOffBehavior` + `upstreamOffCmd`)** : permet, lors d'une commande `Éteindre` (`off`, `toggle` vers `0` ou `luminosité = 0 %`), de choisir entre éteindre uniquement la lampe dans Hue (`hue_only`), éteindre la lampe Hue **et** couper l'interrupteur amont (`upstream_also`), ou couper uniquement l'interrupteur amont (`upstream_only`).
  - **Gestion complète au niveau Pièces (`room`), Zones (`zone`) et Espaces Entertainment (`entertainment`)** : résolution automatique des lampes membres de chaque pièce/zone (`light_rids`), cascade bidirectionnelle entre l'interrupteur amont d'une pièce et ceux de ses lampes individuelles, et recalcul automatique de l'état de la pièce si toutes ses lampes alimentées sont éteintes.
- **Harmonisation complète de la documentation du code source (`core/`, `desktop/`, `plugin_info/`, `resources/`)** :
  - Ajout des en-têtes standardisés, blocs PHPDoc PSR-5/PSR-19, docstrings Python PEP 257 et commentaires JSDoc (couverture 100 % conforme à la règle 11 `AGENTS.md`).

## [0.1.0-beta.9] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` - Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.8] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.7] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altHue.html`, `core/template/mobile/altHue.html`, `core/class/altHue.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.6] - 2026-11-01 (Canal Beta)

### Corrigé
- **Correction des erreurs MySQL `1062 Duplicate entry` lors de la synchronisation des équipements et commandes (`core/class/altHue.class.php`)** :
  - **Déduplication proactive des noms d'équipements (`resolveUniqueEqLogicName()`)** : vérification préalable de tous les équipements existants dans la même pièce Jeedom (`eqLogic::byObjectId($objectId, false)`, y compris ceux appartenant à un ancien plugin Hue désactivé mais non supprimé) avec ajout automatique du suffixe ` (Hue)` ou ` (2)`, ` (3)`... avant `eqLogic::save()`, et suppression de la boucle de réessai aveugle qui ré-exécutait `postSave()` sur le même équipement.
  - **Sécurisation de `upsertCmd()` et `postInsert()` contre les collisions sur `UNIQUE(eqLogic_id, name)`** : recherche directe en base via `cmd::byEqLogicIdAndLogicalId()` et `cmd::byEqLogicIdCmdName()` (contournant le cache mémoire interne `$this->_cmds` de Jeedom Core), nettoyage des éventuelles commandes orphelines résiduelles dans `postInsert()`, suppression de l'appel réentrant `postSave()` dans `toHtml()` et déplacement de l'initialisation `checkAndUpdateCmd('brightness_max', 100)` en fin de `postSave()`.

## [0.1.0-beta.5] - 2026-11-01 (Canal Beta)

### Corrigé
- **Correction de l'erreur HTTP 500 lors de la synchronisation automatique post-appairage du Pont Hue (`core/class/altHue.class.php`, `core/ajax/altHue.ajax.php`)** :
  - Remplacement de l'appel invalide `$cmd->setIsInfoHistorized(...)` par la méthode native Jeedom Core `$cmd->setIsHistorized(...)` dans `upsertCmd()`, qui provoquait une erreur fatale PHP (`HTTP 500 Internal Server Error`) au moment de la création des commandes juste après l'appairage réussi du pont.
  - Capture complète des exceptions et erreurs fatales PHP (`\Throwable`) dans `core/ajax/altHue.ajax.php` et sécurisation de la relance automatique du démon lors de `synchronizeDevices()`.
  - Mise à jour dynamique immédiate de la liste des ponts et boîtiers Hue Play HDMI Sync Box appairés dans `plugin_info/configuration.php` et auto-réparation des commandes dans `toHtml()`.

## [0.1.0-beta.4] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.3] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.3` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.2] - 2026-10-30 (Canal Beta)

### Corrigé
- **Port socket interne dédié `55103` (`core/class/altHue.class.php`, `plugin_info/install.php`)** : attribution du port TCP local dédié **`55103`** au démon `althued.py` et migration automatique de l'ancien port `55100` (réservé au serveur Webhook Nuki Bridge dans `altNuki`).

## [0.1.0-beta.1] - 2026-10-27 (Canal Beta)

### Ajouté
- **Architecture 100 % Locale CLIP API v2 & Flux Temps Réel SSE (`althued.py`)** :
  - Découverte automatique multi-protocoles sur le réseau local (**SSDP**, **mDNS** `_hue._tcp.local` / `_huesync._tcp.local`, sonde HTTPS locale et repli N-UPnP).
  - Appairage local en 1 clic des **Ponts Philips Hue v2 / Pro** (bouton Link physique, génération de `hue-application-key` et `clientkey`) et des boîtiers **Hue Play HDMI Sync Box** (bouton physique 3s).
  - Support **Multi-Ponts Hue** simultané avec écoute temps réel **Server-Sent Events (`https://<bridge>/eventstream/clip/v2`)** offrant une latence inférieure à 50 ms.
- **Prise en charge native complète de la gamme Hue Play & Gradient (`hue_play`)** :
  - Détection automatique des **Hue Play Lightbar**, **Hue Play Gradient Lightstrip (TV & PC)**, **Hue Play Gradient Light Tube**, **Hue Gradient Signe**, **Hue Centris**, **Hue Go** et **Hue Iris**.
  - **Studio Hue Play Gradient** intégré : pilotage multi-zones de **2 à 5 points de couleur simultanés** (`gradient.points`), choix du mode de diffusion (`interpolated_palette`, `interpolated_palette_mirrored`, `random_pixelated`) et **8 ambiances Gradient préconfigurées** (*Cyberpunk*, *Sunset*, *Aurora*, *Cinéma Bias Warm*, *Arcade Néon*, *Feu & Glace*, *Océan Profond*, *Forêt Enchantée*).
- **Pilotage complet des Ampoules, Luminaires, Pièces & Zones (`light`, `room`, `zone`)** :
  - Conversion colorimétrique haute précision **CIE 1931 Wide RGB D65 (`#RRGGBB` $\leftrightarrow$ `xy`)**, température de blanc (`2000 K..6500 K` / `153..500 mirek`), 5 ambiances blanches rapides et 10 **effets dynamiques natifs Hue** (`candle`, `fire`, `prism`, `sparkle`, `opal`, `glisten`, `underwater`, `cosmos`, `sunbeam`, `enchant`) + flash d'alerte (`breathe`).
  - Synchronisation automatique de toutes les **Scènes Hue** et **Scènes 24h (`smart_scene`)** par pièce/zone avec lancement en mode **Statique** ou **Palette Dynamique Hue Play (`dynamic_palette`)**.
  - Mécanisme de **plafond dynamique de luminosité par mode** (`brightness_max` / `brightness_max_set`) avec écrêtage temps réel anti-rebond.
- **Espaces de Divertissement Hue Play (`entertainment`) & Boîtier Hue Play HDMI Sync Box (`sync_box`)** :
  - Suivi et arrêt du streaming **Hue Entertainment / Hue Sync**.
  - Pilotage local complet de la **Hue Play HDMI Sync Box** : entrées `HDMI 1..4`, modes (*Vidéo*, *Jeu*, *Musique*, *Passthrough*, *Veille*), intensités (*Subtile*, *Modérée*, *Élevée*, *Intense*) et luminosité.
- **Capteurs (`sensor`) & Interrupteurs / Variateurs (`switch`)** :
  - Regroupement intelligent des services **Mouvement**, **Température (`°C`)**, **Luminosité (`Lux`)**, **Contact d'ouverture** et **Batterie (`%`)**.
  - Remontée instantanée SSE des boutons **Dimmer Switch**, **Tap Dial Switch** (avec sens et pas de la molette rotative), **Smart Button** et **Wall Switch** avec codes scénarios (`1000..4005`).
- **Widgets Personnalisés « Dark Glass » (Dashboard & Mobile)** :
  - Conformité intégrale à la charte graphique `alt-erre` avec 9 thèmes de couleur, vignette dynamique reflétant la couleur ou le dégradé Gradient en direct, Studio Hue Play Gradient intégré et micro-interactions anti-double-clic.
- **Sécurité & Conformité CGU Jeedom Market** :
  - Stockage des clés locales en `0600` sous `data/profiles/bridges.json` protégé par `.htaccess`, passage des paramètres du démon via `/tmp/jeedom/altHue/daemon_config.json` en `0600` (zéro secret ni `--apikey` dans `ps aux`).
