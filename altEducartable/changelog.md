# Changelog — Alt Vie Scolaire (Educartable) (`altEducartable`)

Toutes les modifications notables apportées à ce plugin sont documentées dans ce fichier.
Ce projet respecte la politique de versionnement [SemVer](https://semver.org/lang/fr/).

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
