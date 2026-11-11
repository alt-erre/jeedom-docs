# Changelog Beta - Alt Caméras & Sécurité (Arlo) (`altArlo`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altArlo/changelog).

---

## [0.1.0-beta.29] - 2026-11-10

- Implémentation complète du protocole d'appairage et de renouvellement silencieux « Trusted Browser » d'Arlo.

## [0.1.0-beta.28] - 2026-11-08

- Suppression des reconnexions 2FA toutes les 2 heures grâce à la persistance des cookies « Navigateur de Confiance » et au renouvellement silencieux.
- Maintien de session haute fréquence toutes les 90 s et protection de la session Web en journée.

## [0.1.0-beta.27] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.26] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.25] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.24] - 2026-11-05

- Priorité au flux RTSPS natif sans verrouillage Web préalable.
- Synchronisation temps réel SSE userStreamActive et relais HTTP/2 curl_cffi.
- Moteur de repli automatique « Direct HD séquentiel » pour les caméras Arlo WebRTC-only.

## [0.1.0-beta.23] - 2026-11-05

- Correction de l'erreur HTTP error 502 Bad Gateway à l'ouverture du flux Direct.
- Prise en charge complète de MPEG-DASH et durcissement de LocalRtspTlsRelay.
- Cascade automatique multi-protocole et journalisation diagnostique.

## [0.1.0-beta.22] - 2026-11-05

- Détection exacte de l'expiration Access token is expired dans le démon.
- Arrêt immédiat sans boucle inutile et reprise transparente sur startStream & users/library.
- Affichage dédié « Session expirée » dans la fenêtre Direct et la Galerie.

## [0.1.0-beta.21] - 2026-11-05

- Réparation complète du Flux Direct Live sur les widgets.
- Réparation de la lecture des vidéos de la Bibliothèque Cloud Arlo, Base SD/USB & Clips RAM sur tous les navigateurs.

## [0.1.0-beta.20] - 2026-11-05

- Suppression des cookies Cloudflare éphémères figés dans session.json.
- Handshake 2FA officiel complet & endpoints universels session/v2.
- Protection contre la double relance concurrente au démarrage de la box.
- Diagnostic exact dans les logs Jeedom.

## [0.1.0-beta.19] - 2026-11-04

- Verrouillage Singleton du démon et suppression des sous-processus curl concurrents.
- Élimination des auto-invalidations par faux positifs.
- Maintien de session nocturne 24h/24.
- Suppression des accès CLI concurrents et des rafales post-capture.

## [0.1.0-beta.18] - 2026-11-01

- Arrêt automatique de l'ancien processus démon en RAM lors d'une mise à jour ou d'une demande 2FA.
- Bascule automatique de canal 2FA en cas de quota 1110 sur un facteur.
- Support élargi de la « Méthode 2 : Import rapide Token / Commande cURL ».

## [0.1.0-beta.17] - 2026-11-01

- Protection contre le blocage Arlo 1110 lors de l'Auto-Reconnexion 2FA.

## [0.1.0-beta.16] - 2026-11-01

- Arrêt propre du démon sans trace cffi callback buffer_callback.

## [0.1.0-beta.15] - 2026-11-01

- Contrat natif Kiosk TV 10-Foot.

## [0.1.0-beta.14] - 2026-11-01

- Mode « 🔴 Live ».
- Refonte complète de la « 🖼️ Galerie Photos & Vidéos » en vraie grille visuelle de vignettes.

## [0.1.0-beta.13] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.12] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.11] - 2026-10-31

- Exploitation native du Stockage Local de la Base SmartHub Arlo.

## [0.1.0-beta.10] - 2026-10-31

- Stockage 100 % Cloud Arlo pour les vidéos & Galerie en Streaming direct.

## [0.1.0-beta.9] - 2026-10-31

- Bouton « Vidéo » & Enregistrement de clips MP4.
- Archivage local & Modale Galerie Photos & Vidéos intégrée.
- Affichage des vignettes sur toutes les caméras.
- Lisibilité et contraste des textes sur les widgets.

## [0.1.0-beta.8] - 2026-10-31

- Prise en charge sécurisée de l'expéditeur SMS alphanumérique « Arlo » lorsque le plugin officiel SMS de Jeedom filtre les numéros non autorisés.

## [0.1.0-beta.7] - 2026-10-31

- Reconnexion Automatique 2FA 100 % autonome.

## [0.1.0-beta.6] - 2026-10-31

- Protection anti-révocation du jeton Cloud Arlo lors de la synchronisation.
- Détection temps réel de l'expiration de session & Maintien de session.
- Exécution des actions et rafraîchissement des widgets Dashboard.

## [0.1.0-beta.5] - 2026-10-30

- Élimination des timeouts sur le callback interne vers Jeedom.

## [0.1.0-beta.4] - 2026-10-30

- Authentification 2FA Cloud sous Linux/Debian.
- Auto-installation transparente.

## [0.1.0-beta.3] - 2026-10-30

- Port socket interne dédié 55102.

## [0.1.0-beta.2] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.1] - 2026-10-23

- Première version Beta.
- Moteur Python natif 100 % indépendant.
- Double méthode d'authentification Cloud Arlo.
- Auto-découverte complète du parc matériel Arlo.
- **Support dynamique des Modes Personnalisés & Plannings** : création automatique des commandes d'action pour chaque mode personnalisé défini dans l'application Arlo.
- Gestion avancée de l'alimentation.
- Widgets personnalisés « Dark Glass » (Dashboard & Mobile).
- Sécurité renforcée.
