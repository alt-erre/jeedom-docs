# Changelog — Alt Air Média (`altAirMedia`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

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
