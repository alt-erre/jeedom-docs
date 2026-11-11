# Changelog Beta - Alt Vie Scolaire (Pronote) (`altPronote`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altPronote/changelog).

---

## [0.1.0-beta.11] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.10] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.9] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.8] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.7] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.6] - 2026-10-29

- Résolution du nom, de la classe et de l'établissement de l'enfant sur les comptes Parent.

## [0.1.0-beta.5] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.4] - 2026-10-21

- Auto-détection locale du code PIN à 4 chiffres directement depuis le QR Code PRONOTE & Protection anti-bannissement IP.

## [0.1.0-beta.3] - 2026-10-21

- Correction de l'erreur Action not permitted. lors de l'appairage QR Code.

## [0.1.0-beta.2] - 2026-10-21

- Décodage d'image QR Code 100 % côté serveur Python & Collage direct.

## [0.1.0-beta.1] - 2026-10-21

- Intégration complète du suivi scolaire PRONOTE dans Jeedom.
- Assistant d'Appairage par QR Code Mobile & Jeton Rotatif.
- 4 Modules fonctionnels complets.
- Widgets personnalisés Dashboard & Mobile.
- Stockage du jeton rotatif dans data/profiles/eq_<id>.json verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après lecture : zéro secret, mot de passe, code PIN ou clé API dans ps aux ni dans les logs.
