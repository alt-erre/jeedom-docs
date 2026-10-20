# Changelog — Alt Air Média (`altAirMedia`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.3] — 2026-10-20 (Canal Beta)

### Amélioré
- **Vignette dynamique par Application / Source dans la Carte État (Dashboard & Mobile)** :
  - La vignette `.am-artwork-box` s'adapte désormais dynamiquement à l'application active sur l'Apple TV ou le HomePod (`Netflix`, `YouTube`, `Prime Video`, `Disney+`, `CANAL+`, `Molotov`, `Oqee / Free TV`, `Infuse`, `Plex`, `Spotify`, `Apple Music`, `Podcasts`, `Twitch`, `AirPlay`, `Veille`) avec une icône dédiée, un libellé court en capitales et un dégradé coloré.
  - Lorsqu'une pochette d'album est affichée, un mini-badge d'icône de l'application s'affiche en surimpression dans le coin inférieur droit de la vignette.

## [0.1.0-beta.2] — 2026-10-19 (Canal Beta)

### Corrigé
- **Démon (`Errno 98: address already in use`)** : fermeture immédiate du socket TCP interne dès le début de la séquence d'arrêt du démon Python, activation de `reuse_address=True`, écriture/suppression atomique du fichier PID après ouverture du port et attente active de libération du port dans `deamon_stop()` (avec détection `ps auxww` sans troncature à 80 colonnes).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Démon mono-processus 100 % Python `asyncio` (`pyatv`) à très faible empreinte mémoire (~35 Mo RAM, zéro Node.js).
- Pilotage temps réel des **Apple TV** (HD, 4K toutes générations, Gen 3) et **HomePod** (Original, Mini, Gen 2).
- Appairage interactif `AirPlay` et `Companion` directement depuis l'interface web Jeedom (modale dédiée avec saisie du code PIN).
- Outil d'import automatique en 1 clic des équipements et clés depuis l'ancien plugin `aTVremote` (en lecture seule).
- Double mode de widget par équipement : Widget Télécommande / Lecteur dédié ou Widget standard Jeedom Core v4.
- Gestion asynchrone du cache des pochettes d'album avec nettoyage automatique.

### Sécurité & Conformité
- Transmission sécurisée des équipements et clés d'appairage au démon via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
