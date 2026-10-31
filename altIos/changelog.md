# Changelog — Alt Contrôle Parental (iPhone & iPad) (`altIos`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.2] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.2` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.1] — 2026-10-30 (Canal Beta)

### Ajouté
- **Version initiale Beta du plugin Alt Contrôle Parental (iPhone & iPad) (`altIos`) pour Jeedom** couvrant l'ensemble de la gamme **iPhone, iPad, iPad Air, iPad Pro, iPad mini et Mac** selon une **architecture Hybride 100 % Autonome en 3 Canaux** (`resources/venv` isolé avec bibliothèques permissives `requests` Apache-2.0, `aiohttp` Apache-2.0, `cryptography` Apache-2.0/BSD et `pyicloud` MIT).
- **Canal 1 — Pont Natif « Raccourcis iOS / iPadOS » (`core/php/jeeIos.php`), Bouclier Anti-Sabotage & Sceau `SHA-256` Hors-Ligne** :
  - Endpoint Webhook temps réel (`< 50 ms`) authentifié par jeton isolé propre à chaque équipement (`webhook_token`).
  - Détection en direct de l'ouverture et de la fermeture des applications/jeux, résolution automatique des **icônes officielles haute résolution Apple App Store** (via l'API officielle *iTunes Search*) et comptabilisation du temps d'écran global et par application.
  - Verrouillage immédiat de l'écran (`Lock Screen`) lorsque le quota est atteint, que l'heure du coucher est dépassée ou que l'appareil est verrouillé (`0 min`), tout en maintenant l'accès aux applications scolaires (*PRONOTE*, *Educartable*).
  - **Bouclier Anti-Sabotage** bloquant l'ouverture des applications *Raccourcis* et *Fichiers* par l'enfant tant que la commande **`Déverrouiller Maintenance Parent (5 min — App Raccourcis)`** n'est pas activée dans Jeedom.
  - **Sceau cryptographique `SHA-256` pour les déplacements hors-ligne (voiture / vacances sur iPad Wi-Fi)** : génération et vérification de l'empreinte `SHA-256` reproductible nativement par l'action *Générer le hachage SHA-256* de Raccourcis iOS, avec détection automatique de toute falsification du fichier JSON local (`tamper_detected`).
- **Canal 2 — Cloud Apple iCloud (`Localiser / Find My` & Partage Familial avec 2FA)** :
  - Assistant de connexion Apple ID + validation du code **2FA à 6 chiffres** permettant de découvrir et créer automatiquement tous les iPhone, iPad et Mac de la famille.
  - Remontée continue du **niveau de batterie (`%`)**, de l'**état de charge** et de la **présence**, ainsi que la commande **`Faire sonner l'appareil (iCloud Find My)`** fonctionnant même en mode silencieux.
- **Canal 3 — Scanner & Détection 100 % Locale LAN Apple (`TCP 62078 lockdownd` / AirPlay)** :
  - Scan du sous-réseau Wi-Fi local sans Internet sur les ports système Apple (`TCP 62078` et `TCP 7000`) et suivi de présence au domicile.
- **Widgets personnalisés « Dark Glass » (`alt-erre`) Dashboard, Mobile & Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Support des **9 thèmes de couleur Dark Glass**, vignette dynamique `58×58` avec icône App Store ou badge du modèle (*IPHONE*, *IPAD*, *IPAD PRO*, *MAC*), jauge de batterie, bouton *Faire sonner*, bouton *Mode Maintenance Parent (5 min)* et **4 onglets interactifs** (*Contrôles*, *Apps*, *Appareils*, *Sécurité / PIN*).
  - Implémentation du contrat 10-Foot `getKioskWidgetData()` pour `altTvDashboard`.

### Sécurité & Conformité
- Stockage des profils, jetons Webhook, clés secrètes `SHA-256` et sessions iCloud dans `data/profiles/` verrouillé en `chmod 0600` et protégé par `.htaccess` (`Require all denied`).
- Communication PHP $\to$ Python exclusivement via fichier temporaire `0600` dans `jeedom::getTmpFolder('altIos')` supprimé immédiatement après exécution (`@unlink`) : zéro secret dans `ps aux` ni dans les logs (Art. 4.3 CGU).
