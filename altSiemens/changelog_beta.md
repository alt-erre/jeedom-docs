# Changelog Beta - Alt Café & Home Connect (Siemens) (`altSiemens`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altSiemens/changelog).

---

## [0.1.0-beta.16] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.15] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.14] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.13] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.12] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.11] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.10] - 2026-10-22

- Procédure dédiée iOS / iPadOS dans l'Assistant et la Documentation.

## [0.1.0-beta.9] - 2026-10-22

- Interception automatique « Zéro-F12 » du schéma hcauth:// & Auto-collage.

## [0.1.0-beta.8] - 2026-10-22

- Assistant SingleKey ID & Capture de l'URL hcauth://auth/prod?code=.

## [0.1.0-beta.7] - 2026-10-21

- Sauvegarde & Restauration Hors-Ligne des clés locales.

## [0.1.0-beta.6] - 2026-10-20

- Rendu visuel fidèle à la base altAirMedia.

## [0.1.0-beta.5] - 2026-10-20

- Vignette dynamique par Boisson / Programme dans la Carte État (Dashboard & Mobile).

## [0.1.0-beta.4] - 2026-10-20

- Harmonisation graphique des widgets Dashboard et Mobile.

## [0.1.0-beta.3] - 2026-10-19

- Conflit de port socket local avec altAirMedia.

## [0.1.0-beta.2] - 2026-10-19

- Démon Python & Virtualenv.
- Supervision du démon & Port Socket.
- Catégorie Jeedom.

## [0.1.0-beta.1] - 2026-10-19

- Pilotage 100 % en local des appareils électroménagers **Siemens / BSH Home Connect** et en particulier de la machine à café expresso broyeur **Siemens EQ900** WebSocket locale chiffrée.
- Catalogue complet des boissons Specialty & CoffeeWorld, paramètres Barista et capteurs d'alertes/entretien.
- Prise en charge des autres appareils électroménagers Siemens avec synchronisation dynamique des commandes depuis le profil XML/JSON de l'appareil.
- Assistant intégré de récupération unique des clés locales PKCE SingleKey ID ou import d'archive .zip/.json.
- Protection du répertoire data/profiles par .htaccess et permissions chmod 0600 sur les profils locaux et sur le fichier devices.json du démon.
- Avis de confidentialité intégré dans la modale de l'assistant PKCE et dans la documentation.
