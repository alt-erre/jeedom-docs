# Changelog Beta - Alt Habitat & Domotique (Delta Dore Tydom) (`altTydom`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altTydom/changelog).

---

## [0.1.0-beta.30] - 2026-11-11

- Prise en charge des groupes matériels Tydom (pilotage simultané sans décalage), de la surveillance de la liaison radio X3D, de la minuterie matérielle des éclairages, des tarifs Linky (HP/HC, Tempo, délestage) et consommations mensuelles, de la suspension des programmations horaires Tydom (Moments), du mode Maintenance Tyxal+ et de la détection automatique des capacités des volets (vitesse lente, BSO, sécurité thermique).

## [0.1.0-beta.29] - 2026-11-11

- Détection automatique des éclairages Marche / Arrêt (On/Off) par rapport aux variateurs (0–100 %) et adaptation de l'affichage des widgets.

## [0.1.0-beta.28] - 2026-11-11

- Affichage des éléments dans les différentes vues du Dashboard Tydom.

## [0.1.0-beta.27] - 2026-11-11

- Dashboard Global de Supervision dans le menu Accueil de Jeedom.

## [0.1.0-beta.26] - 2026-11-10

- Correction d'une erreur lors de l'enregistrement des équipements et commandes.

## [0.1.0-beta.25] - 2026-11-08

- Alignement de la vignette SVG combinée et arrondi des boutons sur les widgets combinés.

## [0.1.0-beta.24] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.23] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.22] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.21] - 2026-11-01

- Correction d'une erreur lors de l'enregistrement des équipements et commandes.

## [0.1.0-beta.20] - 2026-11-01

- Association & Fusion de composants Tydom - « Widgets Combinés ».

## [0.1.0-beta.19] - 2026-11-01

- Suppression des envois multiples de commandes et de la saccade au démarrage des volets roulants.

## [0.1.0-beta.18] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.17] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.16] - 2026-10-27

- Stabilité du menu déroulant du Journal Tyxal+ et redimensionnement du widget en Mode Édition.

## [0.1.0-beta.15] - 2026-10-27

- Journal multi-lignes déroulant pour l'Alarme Tyxal+.
- Accumulation ordonnée des événements /devices/cdata et décodage multi-trames HTTP-over-WebSocket.

## [0.1.0-beta.14] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.13] - 2026-10-24

- Présélection automatique de l'option active dans les 3 menus déroulants CVC.
- Mise à jour immédiate de l'état CVC et redémarrage automatique du démon lors d'une modification du script.

## [0.1.0-beta.12] - 2026-10-23

- Sélection du mode actif et réactivité X3D des thermostats.

## [0.1.0-beta.11] - 2026-10-23

- Stabilité de l'affichage du statut CVC & correction de la détection d'écriture /devices/meta.

## [0.1.0-beta.10] - 2026-10-23

- Pilotage intelligent des Zones de Chauffage & Thermostats basé sur /devices/meta.

## [0.1.0-beta.9] - 2026-10-23

- Catégories d'usage Tydom pour les Thermostats & Chauffage et affichage contextuel des options.

## [0.1.0-beta.8] - 2026-10-23

- Famille dédiée « Détecteurs de fumée DAAF, Mouvement & Capteurs de sécurité » et Widget d'alerte dédié.

## [0.1.0-beta.7] - 2026-10-23

- Fermeture propre de la boucle d'événements à l'arrêt du démon.

## [0.1.0-beta.6] - 2026-10-23

- Enregistrement matériel des Positions Favorites dans le moteur Delta Dore.

## [0.1.0-beta.5] - 2026-10-23

- Personnalisation en pourcentage des Positions Favorites F1 et F2.
- Affichage conditionnel du bouton « Basculer lames BSO » et des commandes masquées sur les widgets.

## [0.1.0-beta.4] - 2026-10-23

- Erreur JavaScript à l'ouverture de la fiche d'un équipement sous Jeedom v4.4+.

## [0.1.0-beta.3] - 2026-10-23

- Timeout sur les callbacks initiaux configs_file et devices_data lors de la création massive d'équipements.

## [0.1.0-beta.2] - 2026-10-23

- Assistant ponctuel d'extraction du mot de passe local de la box Tydom.
- Accessibilité & Ergonomie des Formulaires et Widgets.

## [0.1.0-beta.1] - 2026-10-22

- Première version Beta publique.
- Moteur WebSocket TLS Temps Réel.
- Support complet des familles d'équipements Delta Dore, K-Line & Bel'M.
- Widgets Personnalisés « Dark Glass » Adaptatifs.
- Renforcement de la sécurité et mise en conformité pour le Jeedom Market.
