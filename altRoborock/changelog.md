# Changelog Stable - Alt Robot Vacuum (Roborock) (`altRoborock`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.7`)*

Plugin permettant de piloter en 100% local les robots aspirateurs et stations multifonctions Roborock et notamment les Roborock S7 et Roborock Qrevo Curv (protocoles locaux 1.0 AES-ECB et L01 AES-GCM sur TCP 58867).

### Fonctionnalités majeures et améliorations générales
- Pilotage 100 % en local.
- Démon Python asynchrone bi-protocole.
- Commandes complètes S7 & Qrevo Curv.
- Assistant intégré de récupération unique et de sauvegarde des clés locales.
- Transmission des secrets exclusivement temporaires dans jeedom::getTmpFolder verrouillés en chmod 0600 et supprimés immédiatement après lecture . Aucun secret en argument CLI ni dans les logs.
- Protection du répertoire data/profiles par .htaccess et avis de confidentialité complet conforme aux CGU du Jeedom Market.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
