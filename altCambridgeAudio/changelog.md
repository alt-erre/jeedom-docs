# Changelog — Alt Cambridge Audio (`altCambridgeAudio`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % local des amplificateurs et lecteurs réseau **Cambridge Audio** via le protocole `StreamMagic / SMOIP` (Evo 150, Evo 75, Evo One, CXN, CXN v2, CXN100, MXN10, AXN10, EXN100, Edge NQ, 851N).
- Double mode de communication au choix : **HTTP local direct** (sans démon) ou **WebSocket temps réel** (démon Python optionnel avec repli HTTP automatique).
- Découverte et synchronisation dynamique des entrées (sources), des sorties enceintes (`Speaker A`, `Speaker B`, `Speaker A+B`) et des presets (`1` à `99`).
- Remontée temps réel des métadonnées de lecture (titre, artiste, album, pochette, format audio/codec/échantillonnage).
- Widget dédié haute lisibilité + support du widget standard Jeedom Core v4.

### Sécurité & Conformité
- Transmission de la configuration au démon local via fichier temporaire protégé (`chmod 0600`).
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
