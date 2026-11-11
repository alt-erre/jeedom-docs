# Changelog Stable - Alt Café & Home Connect (Siemens) (`altSiemens`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](https://alt-erre.github.io/jeedom-docs/altSiemens/changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.16`)*

Plugin permettant de piloter en 100% local les appareils Siemens / Home Connect et notamment la machine à café Siemens EQ900 (WebSocket local chiffré AES / TLS-PSK, sans dépendance au cloud).

### Fonctionnalités majeures et améliorations générales
- Pilotage 100 % en local des appareils électroménagers **Siemens / BSH Home Connect** et en particulier de la machine à café expresso broyeur **Siemens EQ900** WebSocket locale chiffrée.
- Catalogue complet des boissons Specialty & CoffeeWorld, paramètres Barista et capteurs d'alertes/entretien.
- Prise en charge des autres appareils électroménagers Siemens avec synchronisation dynamique des commandes depuis le profil XML/JSON de l'appareil.
- Assistant intégré de récupération unique des clés locales PKCE SingleKey ID ou import d'archive .zip/.json.
- Protection du répertoire data/profiles par .htaccess et permissions chmod 0600 sur les profils locaux et sur le fichier devices.json du démon.
- Avis de confidentialité intégré dans la modale de l'assistant PKCE et dans la documentation.
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass (9 thèmes de couleur et coloration par catégorie Jeedom).
- Compatibilité native avec l'interface grand écran Kiosk TV (Alt Dashboard & Kiosk TV).
- Typage sémantique automatique des équipements et des commandes pour l'intégration Jeedom Core.
