# Changelog Beta - Alt Ciné Projector (JVC D-ILA) (`altJvcProjector`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altJvcProjector/changelog).

---

## [0.1.0-beta.12] - 2026-11-12

- Intégration complète des fonctions avancées pour les vidéoprojecteurs JVC D-ILA (et particulièrement le DLA-NZ9) :
  - Diagnostic et réglages HDMI 2.1 (débit de liaison FRL jusqu'à 40 Gbps, compression DSC 8K, plage dynamique HDMI, espace colorimétrique forcé, mode 2D/3D et ALLM).
  - Réglage fin de la puissance du laser BLU-Escent de 0 à 100 % (par pas de 1 %) et options Deep Black, Highlight Color et Smoother.
  - Contrôle de l'ouverture d'objectif motorisée 100 mm (Iris auto 1/2 et ouverture manuelle de -15 à 0), du masquage d'écran, de la sortie Trigger 12V et de la minuterie d'arrêt.
  - Réglages avancés Frame Adapt HDR et Theater Optimizer (niveau d'optimisation, recalcul immédiat du tone mapping et forçage du type de contenu SDR/HDR10/HDR10+/HLG).
  - Configuration de la bascule automatique du mode image selon le signal reçu (SDR 2D, SDR 3D, HDR10, HLG et détection Filmmaker Mode).
  - Calibration complète de l'image : température de couleur (incluant les profils Lampe Xenon 1 et Xenon 2 du DLA-NZ9), tables Gamma, CMS 6 axes, curseurs de luminosité, contraste, couleur, teinte, netteté et réduction de bruit, lecture de la version du firmware et nouvelles touches de télécommande directe.
  - Ajout d'un tiroir repliable « Réglages Expert Cinéma & Optique (NZ9) » directement dans le widget Dashboard.

## [0.1.0-beta.11] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.10] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.9] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.8] - 2026-11-02

- Ajout de la compatibilité avec l'interface grand écran Kiosk TV.

## [0.1.0-beta.7] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.6] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.5] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.4] - 2026-10-20

- Rendu visuel fidèle à la base altAirMedia.

## [0.1.0-beta.3] - 2026-10-20

- Vignette dynamique par Entrée HDMI / État dans la Carte État (Dashboard & Mobile).

## [0.1.0-beta.2] - 2026-10-20

- Harmonisation graphique des widgets Dashboard et Mobile.

## [0.1.0-beta.1] - 2026-10-19

- Pilotage et supervision 100 % en local des vidéoprojecteurs Home-Cinéma **JVC D-ILA** protocole TCP/IP officiel : gammes **DLA-NZ9 / NZ8 / NZ7**, **NZ900 / NZ800 / NZ700 / NZ500**, **NP5**, **NX9 / N7 / N5**, **Z1** et **Série X**.
- Support natif de l'authentification **SHA-256 ** et de l'authentification historique 16 octets / sans mot de passe.
- Double mode de fonctionnement : **Socket TCP Direct PHP** ou **Démon Python Temps Réel** avec verrouillage de session TCP.
- Contrôle complet : alimentation, entrées HDMI 1/2, télémétrie du signal source , puissance et contrôle dynamique du Laser BLU-Escent, 10 mémoires d'optique motorisée , modes anamorphiques, Frame Adapt HDR, Theater Optimizer, 8K e-shiftX, Clear Motion Drive et télécommande OSD.
- Stockage temporaire de la configuration du démon avec permissions restreintes et nettoyage automatique à l'arrêt.
- Documentation complète des mesures de sécurité et de confidentialité.
