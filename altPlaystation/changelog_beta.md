# Changelog Beta - Alt Contrôle Parental (PlayStation) (`altPlaystation`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altPlaystation/changelog).

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

## [0.1.0-beta.2] - 2026-10-30

- **Association locale par Code PIN à 8 chiffres **.
- Commande Mettre en veille la console & Bouton Veille dans les Widgets Dashboard/Mobile.
- Mise en veille automatique sur le LAN en fin de quota , à l'heure du coucher ou lors d'un verrouillage.

## [0.1.0-beta.1] - 2026-10-28

- Support complet du Contrôle Parental PlayStation Family, de la supervision PlayStation Network et de la détection locale LAN dans Jeedom.
- Assistant d'Appairage Compte PlayStation & Scanner Réseau Local DDP.
- 43 Commandes Jeedom par équipement.
- Widgets personnalisés Dashboard & Mobile.
- Stockage des jetons npsso et OAuth2 dans data/profiles/ verrouillé en chmod 0600 et protégé par .htaccess.
- Communication PHP $\to$ Python exclusivement temporaire 0600 dans jeedom::getTmpFolder supprimé immédiatement après exécution : zéro secret, jeton ou clé API dans ps aux ni dans les logs.
