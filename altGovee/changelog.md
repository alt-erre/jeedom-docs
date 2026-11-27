# Changelog Stable - Alt Éclairages, Rubans RGBIC & Ambiances (Govee) (`altGovee`)

Ce document présente les améliorations majeures et nouvelles fonctionnalités publiées sur le **canal Stable** du plugin.
Pour le suivi des pré-versions et correctifs en cours de test, consultez le [Changelog Beta](https://alt-erre.github.io/jeedom-docs/altGovee/changelog_beta).

---

## Version Stable 1.0.0 *(en préparation - actuellement en Beta `0.1.0-beta.10`)*

Plugin permettant de découvrir, piloter et superviser en local tous les éclairages connectés et décorations matricielles Govee via l'API LAN UDP (ports `4001/4002/4003`), les trames locales `ptReal` et l'OpenAPI v2 optionnelle : rideaux matriciels Govee Curtain Lights Pro (`30×32 = 960 LEDs` par panneau, y compris groupes assemblés de 2 ou 3 rideaux jusqu'à `2880 LEDs` en `90×32`), rubans RGBIC, néons flexibles, panneaux muraux Glide/Hexa, rétroéclairages TV Envisual/DreamView et lampadaires Lyra.

### Fonctionnalités majeures et améliorations générales
- Architecture hybride 100 % locale Govee LAN UDP (`Multicast 239.255.255.250` ports `4001/4002/4003` + trames binaires `ptReal`) et démon Python Temps Réel (port dédié `55110`).
- Prise en charge native de l'assemblage de 2 ou 3 rideaux Govee Curtain Lights Pro (`H70B3` / `H70B4` / `H70B5`) en une fresque panoramique unifiée jusqu'à `90×32 = 2880 LEDs`.
- Studio RGBIC Multi-Segments, 24 ambiances et effets procéduraux locaux, et Studio GIF / Pixel-Art / Texte Défilant (`90×32`) avec export `.GIF` calibré pour Govee Home DIY et diffusion locale 15 zones LAN.
- Synchronisation en 1 clic des Scènes Govee (`lightScene`), Scènes DIY (`diyScene`) et Modes Musicaux (`musicMode`).
- Plafond dynamique de luminosité par mode (`brightness_max` / `brightness_max_set`) avec protection à 3 niveaux et association d'un interrupteur physique amont (`upstreamStateCmd`).
- Widgets personnalisés Dashboard et Mobile au design Dark Glass / Light Glass v1.5 WCAG AAA (9 thèmes de couleur et coloration par catégorie Jeedom), panneau Dashboard global dans le menu Accueil et compatibilité native Kiosk TV 10-Foot (`altTvDashboard`).
