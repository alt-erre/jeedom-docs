# Changelog - Alt Réseaux Sociaux, Lives & Créateurs (`altSocial`)

Toutes les modifications notables apportées à ce plugin sont documentées dans ce fichier, conformément à la politique [SemVer `alt-erre`](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.4] - 2026-11-08 (Canal Beta)

### Ajouté
- **Connexion aux Comptes en 1 Clic & Mode « Zéro Console Développeur »** :
  - **Twitch en 1 clic (Popup & Code d'activation sans Client ID)** : intégration directe du flux d'autorisation officiel Twitch (`https://www.twitch.tv/activate`) avec ouverture automatique en popup et QR Code sans avoir à créer d'application sur `dev.twitch.tv`, complété par un moteur GraphQL public (`gql.twitch.tv`) permettant de suivre n'importe quelle chaîne (`@pseudo`), ses abonnés, ses Lives et ses vidéos même sans aucun compte connecté.
  - **Discord en 1 clic par QR Code Mobile (`Remote Auth v2`)** : nouveau worker `resources/discord_qr_worker.py` (`wss://remote-auth-gateway.discord.gg/?v=2` avec paire de clés RSA-OAEP-SHA256 2048 bits éphémère en mémoire) permettant de scanner un QR Code depuis l'application mobile Discord (*Paramètres > Scanner le code QR*) pour récupérer automatiquement tous ses serveurs rejoints, les membres en ligne, les événements/Stages en direct et les annonces sans créer de Bot Discord.
  - **Instagram en connexion directe ou par simple `@pseudo` (sans Meta Developer ni compte Business requis)** : authentification directe au compte Instagram (`login_account` ne conservant que le jeton de session sécurisé `0600`, jamais le mot de passe en clair) pour récupérer la liste des comptes suivis (`friendships/following`), la barre des Lives en direct (`reels_tray`) et les derniers posts/Reels, ainsi qu'un mode public par simple `@pseudo` sans connexion.
  - **YouTube sans clé Google Cloud & Import d'abonnements en 1 clic** : extraction directe depuis `youtube.com/@handle` (`ytInitialData` + flux Atom XML RSS sans quota) pour obtenir le compteur d'abonnés, la détection de Live en cours et les dernières vidéos sans clé API, accompagnée d'un assistant d'extraction automatique en 1 clic de votre liste d'abonnements depuis `youtube.com/feed/channels` ou Google Takeout.
  - **Interface de l'Assistant repensée** : mise en avant des boutons de liaison en 1 clic et de la saisie directe `@pseudo` / lien, avec rangement des clés API développeur et tokens Bot dans un tiroir replié *« Mode Avancé (Optionnel) »*.

---

## [0.1.0-beta.3] - 2026-11-08 (Canal Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` - Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.2] - 2026-11-07 (Canal Beta)

### Ajouté
- **Architecture Multi-Utilisateurs / Multi-Profils & Liaison aux Comptes Utilisateurs Jeedom (`user::all()`)** :
  - **Gestion multi-profils dans l'Assistant Comptes & Création** : création, renommage et suppression d'autant de profils sociaux indépendants que souhaité (*Profil principal*, *Aurélien*, *Léa*, *Enfants*, *Association*...), chacun disposant de ses propres identifiants et jetons OAuth2 isolés pour **Twitch**, **YouTube**, **Instagram** et **Discord** dans `data/profiles/accounts.json` (`version = 2` avec migration transparente depuis le format initial).
  - **Association directe à un Compte Utilisateur Jeedom** : chaque profil social (ainsi que chaque équipement individuel) peut être rattaché à un utilisateur Jeedom (`user::all()` / `user::byId()`).
  - **Mode dynamique « Automatique selon l'utilisateur Jeedom connecté (`auto_jeedom_user`) »** : permet à un équipement *Hub Global* ou *Espace Plateforme* de sélectionner automatiquement le profil social associé à l'utilisateur Jeedom connecté à la session Dashboard ou Mobile.
  - **Option de confidentialité par utilisateur (`restrictToJeedomUser`)** : possibilité de masquer automatiquement le widget Dashboard/Mobile d'un équipement pour les autres comptes utilisateurs Jeedom non administrateurs.
  - **3 nouvelles commandes `info` par équipement** : `profile_name` (*Profil social*), `jeedom_user_id` (*ID Utilisateur Jeedom*) et `jeedom_user_login` (*Utilisateur Jeedom*) utilisables dans vos scénarios pour router les notifications vers le bon membre du foyer, ainsi qu'un badge `@login` sur les cartes d'équipements et dans la barre de statut des widgets Dark Glass.
  - **Isolation par empreinte de jeton OAuth2 dans le cache `tmpfs`** : séparation stricte des caches d'abonnements YouTube (`yt_subs_mine_<hash>`) et de serveurs Discord (`dc_oauth_guilds_<hash>`) entre profils.

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
