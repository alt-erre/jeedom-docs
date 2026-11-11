# Changelog Beta - Alt Contrôle Parental (iPhone & iPad) (`altIos`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altIos/changelog).

---

## [0.1.0-beta.6] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.5] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.4] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.3] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.2] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.1] - 2026-10-30

- Version initiale Beta du plugin Alt Contrôle Parental pour Jeedom.
- Canal 1 - Pont Natif « Raccourcis iOS / iPadOS » , Bouclier Anti-Sabotage & Sceau SHA-256 Hors-Ligne.
- Canal 2 - Cloud Apple iCloud.
- Canal 3 - Scanner & Détection 100 % Locale LAN Apple.
- Widgets personnalisés « Dark Glass » Dashboard, Mobile & Compatibilité Kiosk TV 10-Foot.
- Stockage des profils, jetons Webhook, clés secrètes SHA-256 et sessions iCloud dans data/profiles/ verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après exécution : zéro secret dans ps aux ni dans les logs.
