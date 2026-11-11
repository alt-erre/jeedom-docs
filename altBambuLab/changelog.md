# Changelog Stable - Alt Print 3D (Bambu Lab) (`altBambuLab`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.11`)*

Plugin permettant de piloter et suivre en 100% local les imprimantes 3D Bambu Lab et particulièrement la P1S et son AMS (MQTT sur TLS port 8883, Snapshot caméra port 6000, Vignettes 3MF FTPS, sans dépendance au cloud).

### Fonctionnalités majeures et améliorations générales
- Supervision et pilotage 100 % en local des imprimantes 3D Bambu Lab.
- Prise en charge complète de l'AMS.
- Contrôle thermique et ventilation spécifique P1S.
- Décodeur natif Snapshot Caméra P1S & Vignettes 3MF.
- Transmission du LAN Access Code et de la clé API au démon fichier temporaire verrouillé en chmod 0600 dans jeedom::getTmpFolder et supprimé dès lecture / à l'arrêt , sans aucune exposition dans ps aux ni dans les logs.
- Protection du répertoire data/snapshots par .htaccess et contrôle d'authentification dans core/php/snapshot.php.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
