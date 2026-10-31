# Changelog — Alt Éclairage & Ambiance (Philips Hue) (`altHue`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte le [Versionnement Sémantique (SemVer 2.0.0)](../VERSIONING.md).

---

## [0.1.0-beta.3] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.3` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.2] - 2026-10-30 (Canal Beta)

### Corrigé
- **Port socket interne dédié `55103` (`core/class/altHue.class.php`, `plugin_info/install.php`)** : attribution du port TCP local dédié **`55103`** au démon `althued.py` et migration automatique de l'ancien port `55100` (réservé au serveur Webhook Nuki Bridge dans `altNuki`).

## [0.1.0-beta.1] - 2026-10-27 (Canal Beta)

### Ajouté
- **Architecture 100 % Locale CLIP API v2 & Flux Temps Réel SSE (`althued.py`)** :
  - Découverte automatique multi-protocoles sur le réseau local (**SSDP**, **mDNS** `_hue._tcp.local` / `_huesync._tcp.local`, sonde HTTPS locale et repli N-UPnP).
  - Appairage local en 1 clic des **Ponts Philips Hue v2 / Pro** (bouton Link physique, génération de `hue-application-key` et `clientkey`) et des boîtiers **Hue Play HDMI Sync Box** (bouton physique 3s).
  - Support **Multi-Ponts Hue** simultané avec écoute temps réel **Server-Sent Events (`https://<bridge>/eventstream/clip/v2`)** offrant une latence inférieure à 50 ms.
- **Prise en charge native complète de la gamme Hue Play & Gradient (`hue_play`)** :
  - Détection automatique des **Hue Play Lightbar**, **Hue Play Gradient Lightstrip (TV & PC)**, **Hue Play Gradient Light Tube**, **Hue Gradient Signe**, **Hue Centris**, **Hue Go** et **Hue Iris**.
  - **Studio Hue Play Gradient** intégré : pilotage multi-zones de **2 à 5 points de couleur simultanés** (`gradient.points`), choix du mode de diffusion (`interpolated_palette`, `interpolated_palette_mirrored`, `random_pixelated`) et **8 ambiances Gradient préconfigurées** (*Cyberpunk*, *Sunset*, *Aurora*, *Cinéma Bias Warm*, *Arcade Néon*, *Feu & Glace*, *Océan Profond*, *Forêt Enchantée*).
- **Pilotage complet des Ampoules, Luminaires, Pièces & Zones (`light`, `room`, `zone`)** :
  - Conversion colorimétrique haute précision **CIE 1931 Wide RGB D65 (`#RRGGBB` $\leftrightarrow$ `xy`)**, température de blanc (`2000 K..6500 K` / `153..500 mirek`), 5 ambiances blanches rapides et 10 **effets dynamiques natifs Hue** (`candle`, `fire`, `prism`, `sparkle`, `opal`, `glisten`, `underwater`, `cosmos`, `sunbeam`, `enchant`) + flash d'alerte (`breathe`).
  - Synchronisation automatique de toutes les **Scènes Hue** et **Scènes 24h (`smart_scene`)** par pièce/zone avec lancement en mode **Statique** ou **Palette Dynamique Hue Play (`dynamic_palette`)**.
  - Mécanisme de **plafond dynamique de luminosité par mode** (`brightness_max` / `brightness_max_set`) avec écrêtage temps réel anti-rebond.
- **Espaces de Divertissement Hue Play (`entertainment`) & Boîtier Hue Play HDMI Sync Box (`sync_box`)** :
  - Suivi et arrêt du streaming **Hue Entertainment / Hue Sync**.
  - Pilotage local complet de la **Hue Play HDMI Sync Box** : entrées `HDMI 1..4`, modes (*Vidéo*, *Jeu*, *Musique*, *Passthrough*, *Veille*), intensités (*Subtile*, *Modérée*, *Élevée*, *Intense*) et luminosité.
- **Capteurs (`sensor`) & Interrupteurs / Variateurs (`switch`)** :
  - Regroupement intelligent des services **Mouvement**, **Température (`°C`)**, **Luminosité (`Lux`)**, **Contact d'ouverture** et **Batterie (`%`)**.
  - Remontée instantanée SSE des boutons **Dimmer Switch**, **Tap Dial Switch** (avec sens et pas de la molette rotative), **Smart Button** et **Wall Switch** avec codes scénarios (`1000..4005`).
- **Widgets Personnalisés « Dark Glass » (Dashboard & Mobile)** :
  - Conformité intégrale à la charte graphique `alt-erre` avec 9 thèmes de couleur, vignette dynamique reflétant la couleur ou le dégradé Gradient en direct, Studio Hue Play Gradient intégré et micro-interactions anti-double-clic.
- **Sécurité & Conformité CGU Jeedom Market** :
  - Stockage des clés locales en `0600` sous `data/profiles/bridges.json` protégé par `.htaccess`, passage des paramètres du démon via `/tmp/jeedom/altHue/daemon_config.json` en `0600` (zéro secret ni `--apikey` dans `ps aux`).
