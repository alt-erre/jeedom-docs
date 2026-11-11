# Changelog Beta - Alt Robot Vacuum (Roborock) (`altRoborock`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altRoborock/changelog).

---

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
