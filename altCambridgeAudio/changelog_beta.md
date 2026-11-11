# Changelog Beta - Alt Audio (Cambridge) (`altCambridgeAudio`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altCambridgeAudio/changelog).

---

## [0.1.0-beta.15] - 2026-11-12

- Ajout du réglage de la luminosité de l'écran en façade de l'amplificateur (Lumineux, Tamisé, Éteint) avec bouton rapide sur le widget.
- Ajout de la barre de progression du morceau en cours et de la navigation temporelle directe sur le widget Dashboard.
- Ajout des indicateurs de flux audio sans perte (Lossless), de détection de signal numérique (TV ARC / Optique / Coax), de station radio, de codec, de fréquence et de débit.
- Ajout des commandes avancées d'audio et d'alimentation : volume en dB, balance gauche/droite, égaliseur, mode pré-ampli, Control Bus, mode de veille (Réseau / Éco), délai d'extinction automatique (APD) et suivi des mises à jour firmware.
- Ajout d'un bouton « Scanner le réseau » pour découvrir et créer automatiquement les appareils Cambridge Audio présents sur le réseau local.

## [0.1.0-beta.14] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.13] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.12] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.11] - 2026-11-02

- Ajout de la compatibilité avec l'interface grand écran Kiosk TV.

## [0.1.0-beta.10] - 2026-11-01

- Correction de l'alignement de la barre de volume sur le widget Dashboard.
- Mise en valeur immersive des jaquettes StreamMagic (Dashboard & Mobile).

## [0.1.0-beta.9] - 2026-10-31

- Ajout d'un sélecteur rapide de plafond de volume directement sur le widget Dashboard.

## [0.1.0-beta.8] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.7] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.6] - 2026-10-27

- Ajout du plafonnement dynamique du volume maximum par mode.

## [0.1.0-beta.5] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.4] - 2026-10-20

- Rendu visuel fidèle à la base altAirMedia.

## [0.1.0-beta.3] - 2026-10-20

- Liste déroulante des Sources.
- Vignette dynamique par Source dans la Carte État (Dashboard & Mobile).

## [0.1.0-beta.2] - 2026-10-20

- Harmonisation graphique des widgets Dashboard et Mobile.

## [0.1.0-beta.1] - 2026-10-19

- Pilotage 100 % local des amplificateurs et lecteurs réseau **Cambridge Audio** protocole StreamMagic / SMOIP.
- Double mode de communication au choix : **HTTP local direct** ou **WebSocket temps réel**.
- Découverte et synchronisation dynamique des entrées , des sorties enceintes et des presets.
- Remontée temps réel des métadonnées de lecture.
- Widget dédié haute lisibilité + support du widget standard Jeedom Core v4.
- Transmission de la configuration au démon local temporaire protégé.
- Documentation complète des mesures de sécurité et de confidentialité.
