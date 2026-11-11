# Changelog Stable - Alt Contrôle Parental (Nintendo Switch) (`altSwitch`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.11`)*

Plugin permettant de superviser et piloter le Contrôle Parental des consoles Nintendo Switch, Switch Lite, Switch OLED et Switch 2 dans Jeedom : suivi du temps joué et restant, jeux lancés et jaquettes, temps par profil de joueur, ajout de temps bonus (+15/+30/+60 min ou illimité), verrouillage immédiat, suspension forcée du logiciel, heure du coucher et code PIN.

### Fonctionnalités majeures et améliorations générales
- Support complet du Contrôle Parental Nintendo Switch dans Jeedom.
- Assistant d'Appairage OAuth2 PKCE Nintendo.
- 37 Commandes Jeedom par console.
- Stockage du session_token dans data/profiles/ verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après exécution : zéro secret, jeton ou clé API dans ps aux ni dans les logs.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
