# Changelog Stable - Alt Contrôle Parental (iPhone & iPad) (`altIos`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](https://alt-erre.github.io/jeedom-docs/altIos/changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.6`)*

Plugin permettant de superviser et piloter le Temps d'Écran et le Contrôle Parental des iPhone, iPad (Air, Pro, mini) et Mac dans Jeedom : suivi en temps réel du temps d'écran passé et restant aujourd'hui, applications et jeux ouverts avec icônes officielles App Store, ajout de temps bonus (+15/+30/+60 min ou illimité), verrouillage immédiat de l'écran (0 min), heure du coucher, cache hors-ligne scellé SHA-256 pour les déplacements, bouclier anti-sabotage Raccourcis iOS, découverte Cloud Apple iCloud (batterie, charge, faire sonner à distance Find My) et détection 100 % locale LAN (TCP 62078 lockdownd / mDNS).

### Fonctionnalités majeures et améliorations générales
- Version initiale Beta du plugin Alt Contrôle Parental pour Jeedom.
- Canal 1 - Pont Natif « Raccourcis iOS / iPadOS » , Bouclier Anti-Sabotage & Sceau SHA-256 Hors-Ligne.
- Canal 2 - Cloud Apple iCloud.
- Canal 3 - Scanner & Détection 100 % Locale LAN Apple.
- Stockage des profils, jetons Webhook, clés secrètes SHA-256 et sessions iCloud dans data/profiles/ verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après exécution : zéro secret dans ps aux ni dans les logs.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
