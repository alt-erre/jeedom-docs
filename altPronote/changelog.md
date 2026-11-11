# Changelog Stable - Alt Vie Scolaire (Pronote) (`altPronote`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.11`)*

Plugin permettant d'intégrer le suivi de vie scolaire PRONOTE (comptes Élève et Parent multi-enfants par QR Code Mobile / Jeton rotatif) dans Jeedom : emploi du temps temps réel, cours annulés, réveil intelligent, cahier de textes et devoirs interactifs, notes, moyennes, absences, retards, punitions et menus de cantine.

### Fonctionnalités majeures et améliorations générales
- Intégration complète du suivi scolaire PRONOTE dans Jeedom.
- Assistant d'Appairage par QR Code Mobile & Jeton Rotatif.
- 4 Modules fonctionnels complets.
- Stockage du jeton rotatif dans data/profiles/eq_<id>.json verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après lecture : zéro secret, mot de passe, code PIN ou clé API dans ps aux ni dans les logs.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
