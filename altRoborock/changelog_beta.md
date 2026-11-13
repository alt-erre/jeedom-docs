# Changelog Beta - Alt Robot Vacuum (Roborock) (`altRoborock`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altRoborock/changelog).

---

## [0.1.0-beta.13] - 2026-11-13

- Correction d'un blocage lors de l'exécution de la mise à jour du plugin depuis le Centre de mise à jour Jeedom.

## [0.1.0-beta.12] - 2026-11-13

- Correction de la remontée et de l'affichage immédiat de la liste des pièces dans le sélecteur et les raccourcis du widget.
- Ajout de la détection et de l'enregistrement automatiques de l'adresse IP locale du robot sur le réseau (passage automatique de l'état `OFFLINE` à connecté en local).
- Accélération de la remontée d'état initiale lors de la connexion au robot.

## [0.1.0-beta.11] - 2026-11-12

- Correction des paramètres de validation du code de vérification par e-mail après acceptation des conditions générales dans l'application mobile.

## [0.1.0-beta.10] - 2026-11-12

- Passage de l'assistant de récupération des clés locales sur le protocole d'authentification Roborock V4 pour éviter l'erreur de version des conditions d'utilisation (`user agreement version is not up-to-date`).

## [0.1.0-beta.9] - 2026-11-12

- Correction de la validation du code de vérification reçu par e-mail (erreur `missing parameters`) dans l'assistant de récupération des clés locales.

## [0.1.0-beta.8] - 2026-11-12

- Ajout des réglages et consommables avancés de la station (activation de l'auto-vidange, fréquence de lavage des serpillères, usure du filtre à eau et de la brosse de station, compteur de vidanges).
- Ajout du rapport détaillé du dernier cycle de nettoyage (horaires, durée, surface, origine du départ, type de nettoyage et statut de complétion).
- Ajout du contrôle de l'évitement d'obstacles IA, de la LED d'état, de la recharge en heures creuses et des plages horaires personnalisées Ne Pas Déranger.
- Ajout des commandes de nettoyage de zone par coordonnées, de déplacement vers un point cible, de télécommande manuelle et du diagnostic Wi-Fi (SSID, signal RSSI, adresse MAC, numéro de série).
- Ajout de la prise en charge native de l'affichage grand écran Kiosk TV.

## [0.1.0-beta.7] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.6] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.5] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.4] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.3] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.2] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.1] - 2026-10-20

- Pilotage 100 % en local.
- Démon Python asynchrone bi-protocole.
- Commandes complètes S7 & Qrevo Curv.
- Assistant intégré de récupération unique et de sauvegarde des clés locales.
- Widgets personnalisés Dashboard & Mobile.
- Transmission des secrets exclusivement temporaires dans jeedom::getTmpFolder verrouillés en chmod 0600 et supprimés immédiatement après lecture . Aucun secret en argument CLI ni dans les logs.
- Protection du répertoire data/profiles par .htaccess et avis de confidentialité complet conforme aux CGU du Jeedom Market.
