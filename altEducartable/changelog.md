# Changelog - Alt Vie Scolaire (Educartable) (`altEducartable`)

Toutes les modifications notables apportées à ce plugin sont documentées dans ce fichier.
Ce projet respecte la politique de versionnement [SemVer](https://semver.org/lang/fr/).

## [0.1.0-beta.10] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.9] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.8] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altEducartable.html`, `core/template/mobile/altEducartable.html`, `core/class/altEducartable.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.7] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.6] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.6` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.5] - 2026-04-17

### Ajouté
- **Filtre rapide des mots « À signer » dans le Carnet de liaison (`core/template/dashboard/altEducartable.html` & `resources/altEducartable_worker.py`)** :
  - Un clic sur la tuile KPI **« À signer »** bascule sur l'onglet *Carnet* et filtre automatiquement la liste pour n'afficher que les mots en attente de signature (avec mise en surbrillance ambrée du filtre actif). Un second clic (ou un clic sur l'onglet *Carnet*) réaffiche l'ensemble des messages.
  - Ajout d'une barre de filtrage rapide en haut de l'onglet *Carnet* (**`Tous (X)`** / **`À signer (Y)`**).
  - Inclusion garantie dans `messages_json` de tous les messages non signés même s'ils sont antérieurs aux 25 derniers messages du carnet.

## [0.1.0-beta.4] - 2026-04-17

### Corrigé
- **Affichage et téléchargement des pièces jointes images (`core/php/media.php`, `resources/altEducartable_worker.py` & `core/template/dashboard/altEducartable.html`)** :
  - Ajout d'un proxy média authentifié côté serveur (`core/php/media.php` + action `download_media` dans le worker Python) avec mise en cache temporaire dans `jeedom::getTmpFolder('altEducartable')/media_cache/` (`0600`) pour contourner les restrictions CORS / `SameSite=Lax` / `frame-ancestors` d'Edumoov lors de l'affichage des miniatures et images (PNG, JPEG, WebP, GIF) dans Jeedom.
  - Repli automatique de `/thumbnail?width=300&mode=cover` vers `/file?cache=1` lorsque la génération de miniature Edumoov n'est pas disponible pour une image jointe (ex. `gouterH.png` dans le Carnet de liaison).
  - Ajout d'un bouton puce cliquable (`<i class="fas fa-file-image"></i> nom_image.png`) en complément de la miniature et de la visionneuse plein écran (Lightbox), permettant d'ouvrir ou télécharger l'image dans un nouvel onglet exactement comme un PDF.

## [0.1.0-beta.3] - 2026-04-17

### Ajouté
- **Visualisation et téléchargement des pièces jointes & photos (`resources/altEducartable_worker.py` & `core/template/dashboard/altEducartable.html`)** :
  - Affichage direct des **miniatures photos** dans les messages du **Carnet de liaison**, les activités du **Cahier de vie** et les **Devoirs**.
  - **Visionneuse plein écran intégrée (Lightbox Dark Glass)** au clic sur une photo avec navigation *Précédent / Suivant*, compteur de diapositives et bouton de téléchargement haute définition.
  - **Puces interactives cliquables** pour ouvrir ou télécharger directement les documents joints (**PDF**, fichiers, audio, vidéo, liens externes) ainsi que les **livrets scolaires (LSU) & attestations PDF**.

## [0.1.0-beta.2] - 2026-04-17

### Corrigé
- **Assistant de connexion Parent (`core/ajax/altEducartable.ajax.php` & `core/class/altEducartable.class.php`)** :
  - Correction d'une erreur `TypeError` sous PHP 8 (`200 : SyntaxError: Unexpected end of JSON input`) lors de la création automatique des équipements enfants après l'authentification OAuth2 Keycloak.
  - Remplacement de `proc_open` par `exec()` avec extraction de la dernière ligne JSON valide dans `executeWorkerPayload()` et capture complète des exceptions `Throwable` en AJAX.
  - Encodage Base64 des listes JSON (`#messages_b64#`, `#activities_b64#`, `#homeworks_b64#`, `#notebooks_b64#`) dans le widget Dashboard pour éviter toute altération par `template_replace`.

## [0.1.0-beta.1] - 2026-04-17

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Vie Scolaire (Educartable)** pour Jeedom.
- **Assistant de connexion Parent & Découverte Multi-Enfants (`desktop/modal/account.assistant.php`)** :
  - Authentification OAuth2 Keycloak sur `accounts.edumoov.com` (supportant le mot de passe et le code 2FA/TOTP optionnel).
  - Découverte automatique de tous les enfants rattachés au compte parent (Maternelle TPS–GS et Élémentaire CP–CM2) et création/mise à jour automatique d'un équipement Jeedom par enfant.
  - Sauvegarde atomique des jetons tournants OAuth2 dans `data/profiles/eq_<id>.json` (`0600`, protégé par `.htaccess`).
- **Carnet de liaison & Annonces d'école (`messages`)** :
  - Remontée du nombre total de messages, des messages non lus, des mots en attente de signature, ainsi que du titre, contenu nettoyé, auteur, date, catégorie et état de signature du dernier message.
  - Commande d'action `acknowledge_message` permettant de signer / accuser réception d'un mot du carnet en 1 clic depuis le widget Dashboard ou via un scénario Jeedom.
- **Cahier de vie & Photos de classe (`activities`)** :
  - Remontée du nombre total d'activités, des activités non consultées, du titre, texte, enseignant(e) auteur, date et nombre de photos de la dernière activité.
  - Commande d'action `like_activity` permettant d'envoyer un « J'aime » sur une activité du cahier de vie.
- **Cahier de textes & Devoirs (`tasks`)** :
  - Remontée des devoirs à faire, devoirs faits, devoirs pour demain (total et à faire) et résumé du prochain devoir.
  - Commande d'action `toggle_homework` permettant de cocher ou décocher un devoir directement depuis le widget Dashboard ou un scénario.
- **Livrets scolaires (LSU) & Attestations (`notebooks`)** :
  - Remontée du nombre de livrets scolaires publiés, du nombre de livrets à signer et du résumé du dernier livret.
- **Widget Custom « Dark Glass » (Dashboard & Mobile)** :
  - Support des 9 thèmes de couleur de la charte `alt-erre`, bandeau de 4 KPIs, navigation par 4 onglets (*Carnet*, *Vie*, *Devoirs*, *Livrets*) et actions interactives intégrées.
- **Pause nocturne automatique (22h00 – 06h30)** et sauvegarde/restauration de profil JSON.
