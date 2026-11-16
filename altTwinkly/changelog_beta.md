# Changelog Beta - Alt Éclairages & Effets LED (Twinkly) (`altTwinkly`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altTwinkly/changelog).

---

## [0.2.0-beta.1] - 2026-11-12

- Ajout de la cartographie spatiale 2D/3D des LEDs avec aperçu géométrique en temps réel et 4 nouvelles ambiances spatiales (Pluie Matrix 2D, Spirale 3D, Balayage Radar 2D, Onde Plasma 2D).
- Ajout de la gestion complète des Playlists matérielles (sélection, navigation, création automatique et suppression).
- Ajout du téléversement d'animations en mémoire flash interne du contrôleur et du suivi de la mémoire disponible.
- Ajout du contrôle avancé Twinkly Music (sélection des effets musicaux et des ambiances Moods).
- Ajout du réglage de température de blanc (1800 K à 6500 K) adapté aux profils RGB, RGBW et AWW (Gold Edition).
- Ajout du routage automatique des commandes vers l'appareil Maître au sein d'un groupe synchronisé Twinkly.
- Ajout des informations de diagnostic matériel (Uptime, cadence FPS, statut Cloud/Local), du renommage matériel de l'appareil et de la réinitialisation du driver LED.
- Compatibilité UDP Temps Réel multi-génération (Gen I et Gen II), sélecteur rapide de plafond de luminosité sur le widget et compatibilité Kiosk TV.

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

- Compatibilité Python 3.9 du démon altTwinklyd.py.

## [0.1.0-beta.1] - 2026-10-27

- Première version Beta publique.
- Architecture Bi-Mode 100 % Locale.
- Découverte Automatique 1 Clic sur le Réseau Local.
- Synchronisation Dynamique du Catalogue d'Animations & Ambiances.
- Plafonnement dynamique de la luminosité par mode.
- Programmateur Horaire Matériel & Flash de Notification.
- Widgets personnalisés Dashboard & Mobile « Dark Glass ».
