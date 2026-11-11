# Changelog Stable - Alt Ciné Projector (JVC D-ILA) (`altJvcProjector`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](https://alt-erre.github.io/jeedom-docs/altJvcProjector/changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.11`)*

Plugin permettant de piloter localement les vidéoprojecteurs Home-Cinéma JVC D-ILA (DLA-NZ9, NZ8, NZ7, NP5, NZ900, NZ800, NZ700, NZ500, NX9, N7, N5, Série X) via le protocole TCP/IP JVC (port 20554) sans dépendance cloud.

### Fonctionnalités majeures et améliorations générales
- Pilotage et supervision 100 % en local des vidéoprojecteurs Home-Cinéma **JVC D-ILA** protocole TCP/IP officiel : gammes **DLA-NZ9 / NZ8 / NZ7**, **NZ900 / NZ800 / NZ700 / NZ500**, **NP5**, **NX9 / N7 / N5**, **Z1** et **Série X**.
- Support natif de l'authentification **SHA-256 ** et de l'authentification historique 16 octets / sans mot de passe.
- Double mode de fonctionnement : **Socket TCP Direct PHP** ou **Démon Python Temps Réel** avec verrouillage de session TCP.
- Contrôle complet : alimentation, entrées HDMI 1/2, télémétrie du signal source , puissance et contrôle dynamique du Laser BLU-Escent, 10 mémoires d'optique motorisée , modes anamorphiques, Frame Adapt HDR, Theater Optimizer, 8K e-shiftX, Clear Motion Drive et télécommande OSD.
- Stockage temporaire de la configuration du démon avec permissions restreintes et nettoyage automatique à l'arrêt.
- Documentation complète des mesures de sécurité et de confidentialité.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
