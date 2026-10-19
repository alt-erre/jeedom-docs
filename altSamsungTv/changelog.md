# Changelog — Alt Samsung TV (`altSamsungTv`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.2] — 2026-10-19 (Canal Beta)

### Corrigé
- **Lancement des applications Smart TV (Tizen 2020–2025+ & démon WebSocket)** :
  - Correction de l'identifiant Tizen de **Free TV** (anciennement *OQEE by Free*, `3202103023185` / `3201510005981`) qui pointait par erreur vers l'ID d'**Apple Music** (`3201908019041`, désormais proposé comme commande distincte).
  - Mise à jour de l'identifiant officiel Tizen 2022–2025+ de **Twitch** (`3202203026841`, avec repli automatique sur `3201806016432` et `3201601007625`) ainsi que des IDs multi-générations pour `Disney+`, `CANAL+`, `Molotov`, `Prime Video` et `Netflix`.
  - En mode démon WebSocket (`altSamsungTvd.py`), `launch_app()` sonde désormais l'API REST locale (`GET :8001/api/v2/applications/<id>`) parmi tous les IDs candidats pour détecter la variante exacte installée sur le téléviseur, sort automatiquement du Mode Art sur The Frame, et combine `POST /api/v2/applications/<id>` (`Content-Length: 0`) et l'événement WebSocket `ed.apps.launch` (`DEEP_LINK` + `NATIVE_LAUNCH`).
  - Suppression de la double exécution en PHP (`launchApp()`) lorsque le démon WebSocket a déjà pris en charge la commande.
- **Sélection des sources HDMI sur Samsung The Frame** :
  - Les firmwares Tizen de la gamme **The Frame (2018–2025+)** ignorant les touches discrètes `KEY_HDMI1..4` sur l'API WebSocket locale (réservées par Samsung au Cloud SmartThings), les commandes `HDMI 1..4` sont désormais masquées par défaut sur les équipements The Frame au profit des sources locales fonctionnelles (`TV / TNT`, `HDMI (Basculer / Cycle)` et `Menu Sources`), avec sortie automatique du Mode Art et repli sur `KEY_HDMI`.
- **Widget Dashboard & Mobile (sélecteurs Sources & Applications)** :
  - Réinitialisation automatique des listes déroulantes `— Source —` et `— Application —` après chaque sélection afin de pouvoir recliquer plusieurs fois de suite sur `HDMI (Basculer / Cycle)` ou relancer la même application, et correction du rafraîchissement temps réel du titre d'entrée (`#input_id#`).

### Ajouté
- Ajout des applications **Apple Music** (`3201908019041`), **france.tv** (`3202103023232`), **TF1+** (`3202209028524`), **ARTE** (`3202011022316`) et **Max** (`3202301029760`), avec migration automatique des équipements existants.

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % en local des téléviseurs **Samsung Smart TV (Tizen)** et **The Frame** (HTTP, UPnP et WebSocket TLS `:8002` temps réel) sans dépendance au Cloud SmartThings.
- Prise en charge complète du **Mode Art de The Frame** : état actif, bascule TV/Art, réglage de la luminosité Mode Art, sélection des passe-partout (*Matte*), navigation dans la galerie et récupération de la vignette de l'œuvre affichée.
- Téléversement direct d'images locales ou d'URLs (`JPEG`/`PNG`) vers le Mode Art de The Frame via transfert local D2D.
- Lecture et contrôle exact du volume (`0-100 %`) et de la sourdine via l'API locale UPnP RenderingControl (`:9197`), sélection des sources HDMI, lancement direct des applications Tizen et télécommande complète.

### Sécurité & Conformité
- Transmission sécurisée du jeton d'appairage (`token`) au démon via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
