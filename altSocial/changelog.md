# Changelog - Alt Réseaux Sociaux, Lives & Créateurs (`altSocial`)

Toutes les modifications notables apportées à ce plugin sont documentées dans ce fichier, conformément à la politique [SemVer `alt-erre`](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.1] - 2026-11-07 (Canal Beta)

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`)** du plugin **Alt Réseaux Sociaux, Lives & Créateurs (`altSocial`)** pour Jeedom 4.2+.
- **Prise en charge native des 4 plateformes via leurs API officielles** :
  - **Twitch (`Helix API` + OAuth2 Device Code Flow en 1 clic sans URL de redirection HTTPS externe)** : compteur de followers/abonnés, liste complète des chaînes suivies, détection des chaînes en Live (titre, catégorie/jeu, spectateurs, miniature `16:9`) et dernières vidéos / VODs.
  - **YouTube (`Data API v3` + Flux Atom RSS sans quota)** : compteur d'abonnés, vues et vidéos, liste des abonnements (OAuth2 Device Flow ou publics + watchlist `@handle` / `UC...`), détection des Lives et nouvelles vidéos optimisée par interrogation groupée (`videos.list` par lots de 50 IDs).
  - **Instagram (`Instagram Graph API` officielle + `business_discovery`)** : compteur d'abonnés, abonnements et publications des comptes Créateurs et Business, flux des nouveaux posts/Reels/carrousels et renouvellement préventif automatique des jetons longue durée (60 jours).
  - **Discord (`API v10` : Bot + OAuth2 `guilds` + Invitations/Widgets publics)** : compteurs de membres et connectés en ligne, liste des serveurs rejoints, détection des salons vocaux publics, conférences Stage et événements serveur en direct, et suivi des nouveaux messages/annonces.
- **3 Modes de découpage des équipements au choix** :
  - **Hub Global Multi-Réseaux (`hub`)** : regroupe les 4 réseaux dans un seul widget unifié avec filtres dynamiques par plateforme.
  - **Espace Plateforme (`platform`)** : regroupe votre compte principal, la liste de vos abonnements, vos chaînes en Live et les derniers posts sur un réseau donné.
  - **Compte / Chaîne / Serveur Ciblé (`target`)** : suivi unitaire dédié à un créateur ou serveur pour historiser sa courbe d'abonnés et déclencher des scénarios Jeedom précis (`is_live`, `last_post_id`).
- **Moteur Hybride Sobriété Jeedom Luna vs Temps Réel** :
  - **Mode Cron PHP léger par défaut (`0 Mo` RAM au repos)** : cadences configurables (`1`, `5`, `15`, `30`, `60` min), pause nocturne, mutualisation des requêtes par plateforme et cache `tmpfs` borné `LRU < 1.8 Mo`.
  - **Mode Démon Python Temps Réel optionnel (`127.0.0.1:55107`)** : connexions WebSocket sortantes **Twitch EventSub** (`stream.online` / `stream.offline`) et **Discord Gateway v10** (avec repli automatique sur les intents standards en cas de code `4014`), filtrage par delta et hystérésis `5 %`.
- **Sécurité stricte (`0600` & Zéro secret CLI)** : stockage atomique isolé des jetons dans `data/profiles/accounts.json` protégé par `.htaccess`, aucun secret ni `--apikey` exposé dans `ps aux`.
- **Widgets « Dark Glass » (`alt-erre` v1.4) & Kiosk TV (`altTvDashboard`)** :
  - Templates Dashboard et Mobile à 9 thèmes de couleur, boutons d'en-tête circulaires `26x26 px`, option `widgetCategoryHeader`, lightbox miniature et onglets interactifs (*Lives*, *Posts*, *Suivis*).
  - Implémentation du contrat `getKioskWidgetData()` 10-Foot UI pour `altTvDashboard` et typage sémantique automatique Jeedom Core 4.2+.
