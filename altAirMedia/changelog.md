# Changelog — Alt Air Média (`altAirMedia`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.6] — 2026-10-30 (Canal Beta)

### Amélioré & Corrigé
- **Métadonnées & Jaquettes des applications vidéo tvOS (Netflix, séries TV, flux `media_type = unknown`)** :
  - Prise en charge des champs spécifiques aux séries et contenus vidéo dans `pyatv` (`series_name`, `season_number`, `episode_number`) pour formater automatiquement le titre et le sous-titre (`SxxExx`).
  - Suppression du blocage qui ignorait le téléchargement de la jaquette lorsque l'application tvOS remontait `media_type = unknown` (cas fréquent sur les lecteurs vidéo tiers).
  - Ajout d'une clé de cache composite (`hash` + `artwork_id` + `title`) et d'une re-vérification asynchrone différée (`+2,5 s` et `+6,5 s` après le démarrage du flux) lorsque les métadonnées MRP (`ContentItemUpdate`) sont publiées après le buffering vidéo.

## [0.1.0-beta.5] — 2026-10-27 (Canal Beta)

### Ajouté
- **Plafonnement dynamique du volume par mode (`Volume maximum` / `Volume maximum niveau`)** :
  - Ajout de la commande info numérique **`Volume maximum`** (`volume_max`, en `%`, par défaut `100 %`) et de la commande action curseur **`Volume maximum niveau`** (`volume_max_set`) utilisables dans les scénarios et le plugin *Mode* (ex. mode *Nuit enfant*).
  - **Abaissement immédiat & Surveillance temps réel (Auto-clamp)** : abaisse immédiatement le volume de l'Apple TV ou du HomePod s'il dépasse le nouveau plafond lors du changement de mode ou s'il est monté au-dessus du plafond depuis une télécommande Siri Remote / iPhone / AirPlay.
  - **Bridage visuel sur le widget Dashboard** : la borne `max` du curseur de volume s'adapte en temps réel au plafond actif.

## [0.1.0-beta.4] — 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) au clic sur tous les boutons interactifs des widgets **Dashboard & Mobile** (D-Pad, transport, volume, puissance).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) de l'en-tête du widget.
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*) dans la configuration de l'équipement et les templates.

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
