# Changelog - Alt Contrôle Parental (iPhone & iPad) (`altIos`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.6] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.5] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.4] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altIos.html`, `core/template/mobile/altIos.html`, `core/class/altIos.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.3] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.2] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.2` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.1] - 2026-10-30 (Canal Beta)

### Ajouté
- **Version initiale Beta du plugin Alt Contrôle Parental (iPhone & iPad) (`altIos`) pour Jeedom** couvrant l'ensemble de la gamme **iPhone, iPad, iPad Air, iPad Pro, iPad mini et Mac** selon une **architecture Hybride 100 % Autonome en 3 Canaux** (`resources/venv` isolé avec bibliothèques permissives `requests` Apache-2.0, `aiohttp` Apache-2.0, `cryptography` Apache-2.0/BSD et `pyicloud` MIT).
- **Canal 1 - Pont Natif « Raccourcis iOS / iPadOS » (`core/php/jeeIos.php`), Bouclier Anti-Sabotage & Sceau `SHA-256` Hors-Ligne** :
  - Endpoint Webhook temps réel (`< 50 ms`) authentifié par jeton isolé propre à chaque équipement (`webhook_token`).
  - Détection en direct de l'ouverture et de la fermeture des applications/jeux, résolution automatique des **icônes officielles haute résolution Apple App Store** (via l'API officielle *iTunes Search*) et comptabilisation du temps d'écran global et par application.
  - Verrouillage immédiat de l'écran (`Lock Screen`) lorsque le quota est atteint, que l'heure du coucher est dépassée ou que l'appareil est verrouillé (`0 min`), tout en maintenant l'accès aux applications scolaires (*PRONOTE*, *Educartable*).
  - **Bouclier Anti-Sabotage** bloquant l'ouverture des applications *Raccourcis* et *Fichiers* par l'enfant tant que la commande **`Déverrouiller Maintenance Parent (5 min - App Raccourcis)`** n'est pas activée dans Jeedom.
  - **Sceau cryptographique `SHA-256` pour les déplacements hors-ligne (voiture / vacances sur iPad Wi-Fi)** : génération et vérification de l'empreinte `SHA-256` reproductible nativement par l'action *Générer le hachage SHA-256* de Raccourcis iOS, avec détection automatique de toute falsification du fichier JSON local (`tamper_detected`).
- **Canal 2 - Cloud Apple iCloud (`Localiser / Find My` & Partage Familial avec 2FA)** :
  - Assistant de connexion Apple ID + validation du code **2FA à 6 chiffres** permettant de découvrir et créer automatiquement tous les iPhone, iPad et Mac de la famille.
  - Remontée continue du **niveau de batterie (`%`)**, de l'**état de charge** et de la **présence**, ainsi que la commande **`Faire sonner l'appareil (iCloud Find My)`** fonctionnant même en mode silencieux.
- **Canal 3 - Scanner & Détection 100 % Locale LAN Apple (`TCP 62078 lockdownd` / AirPlay)** :
  - Scan du sous-réseau Wi-Fi local sans Internet sur les ports système Apple (`TCP 62078` et `TCP 7000`) et suivi de présence au domicile.
- **Widgets personnalisés « Dark Glass » (`alt-erre`) Dashboard, Mobile & Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Support des **9 thèmes de couleur Dark Glass**, vignette dynamique `58×58` avec icône App Store ou badge du modèle (*IPHONE*, *IPAD*, *IPAD PRO*, *MAC*), jauge de batterie, bouton *Faire sonner*, bouton *Mode Maintenance Parent (5 min)* et **4 onglets interactifs** (*Contrôles*, *Apps*, *Appareils*, *Sécurité / PIN*).
  - Implémentation du contrat 10-Foot `getKioskWidgetData()` pour `altTvDashboard`.

### Sécurité & Conformité
- Stockage des profils, jetons Webhook, clés secrètes `SHA-256` et sessions iCloud dans `data/profiles/` verrouillé en `chmod 0600` et protégé par `.htaccess` (`Require all denied`).
- Communication PHP $\to$ Python exclusivement via fichier temporaire `0600` dans `jeedom::getTmpFolder('altIos')` supprimé immédiatement après exécution (`@unlink`) : zéro secret dans `ps aux` ni dans les logs (Art. 4.3 CGU).
