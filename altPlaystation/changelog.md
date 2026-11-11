# Changelog Stable - Alt Contrôle Parental (PlayStation) (`altPlaystation`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](https://alt-erre.github.io/jeedom-docs/altPlaystation/changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.7`)*

Plugin permettant de superviser et piloter le Contrôle Parental PlayStation Family et l'activité PlayStation Network des consoles PS5, PS5 Slim, PS5 Pro et PS4 dans Jeedom : suivi du temps joué et restant aujourd'hui, jeux lancés et jaquettes officielles, profils enfants et membres de la famille, ajout de temps bonus (+15/+30/+60 min ou illimité), verrouillage immédiat (0 min), déconnexion forcée en fin de temps, horaires autorisés / heure du coucher, trophées PSN et détection locale LAN (état Allumée/Mode Repos/Éteinte & Wake-on-LAN).

### Fonctionnalités majeures et améliorations générales
- Support complet du Contrôle Parental PlayStation Family, de la supervision PlayStation Network et de la détection locale LAN dans Jeedom.
- Assistant d'Appairage Compte PlayStation & Scanner Réseau Local DDP.
- 43 Commandes Jeedom par équipement.
- Stockage des jetons npsso et OAuth2 dans data/profiles/ verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après exécution : zéro secret, jeton ou clé API dans ps aux ni dans les logs.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
