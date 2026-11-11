# Changelog Beta - Alt Téléphonie, MMS & Portail GSM (`altCellular`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](changelog).

---

## [0.1.0-beta.17] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.16] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.15] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.14] - 2026-11-01

- Correction du timeout sur le bouton « Tester & Diagnostiquer le Modem ».

## [0.1.0-beta.13] - 2026-11-01

- Résolution du conflit de liens symboliques /dev/ttyUSB-LTE-Quectel vs /dev/ttyLuna-Lte et libération du port au repos.
- Correction de l'erreur sox FAIL gain: can't reclaim headroom.
- Exécution instantanée non bloquante de Couper l'appel & suppression du BrokenPipeError.

## [0.1.0-beta.12] - 2026-11-01

- Priorisation automatique de /dev/ttyUSB-LTE-Quectel et réservation stricte de /dev/ttyLuna-Lte pour le plugin SMS.

## [0.1.0-beta.11] - 2026-11-01

- Cohabitation automatique sans conflit avec le plugin SMS officiel sur Jeedom Luna 4G.

## [0.1.0-beta.10] - 2026-10-31

- Suppression des accolades {{...}} sur le widget Dashboard.
- Élimination de la saturation audio lors des appels vocaux TTS.

## [0.1.0-beta.9] - 2026-10-31

- Sélection du moteur en mode TTS Automatique et prise en compte immédiate sans redémarrage.

## [0.1.0-beta.8] - 2026-10-31

- Qualité vocale HD hors-ligne : installation automatique de SVOX PicoTTS & chaîne de mastering téléphonique ITU-T G.712.

## [0.1.0-beta.7] - 2026-10-31

- Qualité vocale claire sur le pont Voice-over-USB Quectel.

## [0.1.0-beta.6] - 2026-10-31

- Encapsulation de apikey dans le corps JSON POST des callbacks.
- Confinement strict des opérations apt au script dependancy_install.

## [0.1.0-beta.5] - 2026-10-31

- Détection d'état du démon lancé et masquage urllib3 dans les logs.

## [0.1.0-beta.4] - 2026-10-31

- Moteur Voice-over-USB Quectel pour modems 4G sans puce codec externe.

## [0.1.0-beta.3] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.2] - 2026-10-31

- Synthèse vocale TTS et injection audio dans l'appel sur Quectel EC25 / EG25-G.

## [0.1.0-beta.1] - 2026-10-31

- Version initiale Beta du plugin Alt Téléphonie, MMS & Portail GSM.
