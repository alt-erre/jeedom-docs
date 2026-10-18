# Changelog — Alt Samsung TV (`altSamsungTv`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % en local des téléviseurs **Samsung Smart TV (Tizen)** et **The Frame** (HTTP, UPnP et WebSocket TLS `:8002` temps réel) sans dépendance au Cloud SmartThings.
- Prise en charge complète du **Mode Art de The Frame** : état actif, bascule TV/Art, réglage de la luminosité Mode Art, sélection des passe-partout (*Matte*), navigation dans la galerie et récupération de la vignette de l'œuvre affichée.
- Téléversement direct d'images locales ou d'URLs (`JPEG`/`PNG`) vers le Mode Art de The Frame via transfert local D2D.
- Lecture et contrôle exact du volume (`0-100 %`) et de la sourdine via l'API locale UPnP RenderingControl (`:9197`), sélection des sources HDMI, lancement direct des applications Tizen et télécommande complète.

### Sécurité & Conformité
- Transmission sécurisée du jeton d'appairage (`token`) au démon via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
