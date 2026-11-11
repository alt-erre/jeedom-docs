# Changelog Beta - Alt Print 3D (Bambu Lab) (`altBambuLab`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altBambuLab/changelog).

---

## [0.1.0-beta.12] - 2026-11-12

- Extraction automatique du poids de filament, du coût estimé en euros et de la hauteur de couche depuis les fichiers `.3mf`, avec suivi des statistiques cumulées d'impression.
- Configuration directe des bobines tierces sans puce RFID (matériau et couleur) et chargement d'une bobine AMS depuis le widget, plus prise en charge du porte-bobine externe.
- Traduction en français des codes d'alerte et d'erreur HMS de l'imprimante et de l'AMS.
- Ajout du ventilateur de corps de chauffe (Heatbreak), des informations de buse installée, des commandes de déplacement manuel (plateau, tête, extrudeur) et de l'exclusion d'un objet décollé en cours d'impression (Skip Objects).
- Ajout du contrôle du Timelapse vidéo, de l'état de la carte MicroSD, des versions de firmware et d'un lanceur d'impression pour les modèles `.3mf` présents sur la carte MicroSD.

## [0.1.0-beta.11] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.10] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.9] - 2026-11-07

- Sobriété Apache / & Protection anti-empilement des callbacks HTTP.

## [0.1.0-beta.8] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.7] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.6] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.5] - 2026-10-30

- Port socket interne dédié 55101 et migration automatique anti-conflit.

## [0.1.0-beta.4] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.3] - 2026-10-21

- Stabilité de la connexion MQTT TLS et suppression du battement d'état Prêt ↔ Hors-ligne.

## [0.1.0-beta.2] - 2026-10-21

- Migration vers paho.mqtt.client.CallbackAPIVersion.VERSION2.

## [0.1.0-beta.1] - 2026-10-20

- Supervision et pilotage 100 % en local des imprimantes 3D Bambu Lab.
- Prise en charge complète de l'AMS.
- Contrôle thermique et ventilation spécifique P1S.
- Décodeur natif Snapshot Caméra P1S & Vignettes 3MF.
- Widgets personnalisés Dashboard & Mobile « Dark Glass ».
- Transmission du LAN Access Code et de la clé API au démon fichier temporaire verrouillé en chmod 0600 dans jeedom::getTmpFolder et supprimé dès lecture / à l'arrêt , sans aucune exposition dans ps aux ni dans les logs.
- Protection du répertoire data/snapshots par .htaccess et contrôle d'authentification dans core/php/snapshot.php.
