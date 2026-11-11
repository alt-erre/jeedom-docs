# Changelog Beta - Alt Contrôle Parental (Nintendo Switch) (`altSwitch`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](changelog).

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

## [0.1.0-beta.6] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.5] - 2026-10-23

- Récupération complète du catalogue des jeux, des profils joueurs et du temps d'utilisation.

## [0.1.0-beta.4] - 2026-10-22

- Correction de l'erreur HTTP 403 lors de la découverte des consoles.

## [0.1.0-beta.3] - 2026-10-22

- Appairage sur iPad / iPhone & Android.

## [0.1.0-beta.2] - 2026-10-22

- Correction du statut NOK des dépendances après l'installation.

## [0.1.0-beta.1] - 2026-10-21

- Support complet du Contrôle Parental Nintendo Switch dans Jeedom.
- Assistant d'Appairage OAuth2 PKCE Nintendo.
- 37 Commandes Jeedom par console.
- Widgets personnalisés Dashboard & Mobile.
- Stockage du session_token dans data/profiles/ verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après exécution : zéro secret, jeton ou clé API dans ps aux ni dans les logs.
