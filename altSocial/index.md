# Alt Réseaux Sociaux, Lives & Créateurs (`altSocial`)

Plugin Jeedom unifié permettant de suivre vos **comptes de réseaux sociaux**, le **nombre d'abonnés ou de membres**, la **liste de vos abonnements**, les **chaînes et salons actuellement en Live** ainsi que les **nouveaux posts, vidéos et annonces** (compatible **Twitch**, **YouTube**, **Instagram** et **Discord**).

---

## 1. Fonctionnalités Principales

- **3 Modes d'Équipements Complémentaires (Utilisables simultanément)** :
  1. **Hub Global Multi-Réseaux (`hub`)** : regroupe dans un seul widget unifié vos 4 plateformes avec filtres instantanés (*Tous*, *Twitch*, *YouTube*, *Instagram*, *Discord*), total des Lives en cours, nouveaux posts et abonnements.
  2. **Espace Plateforme (`platform`)** : un équipement dédié par réseau (*Mon Espace Twitch*, *Mon Espace YouTube*, *Mon Espace Instagram*, *Mon Espace Discord*) centralisant votre profil, vos abonnés, tous vos abonnements, les Lives actifs et le flux des publications.
  3. **Compte / Chaîne / Serveur Ciblé (`target`)** : un équipement dédié au suivi précis d'une chaîne créateur ou d'un serveur communautaire (historisation de la courbe d'abonnés/membres et déclencheurs directs de scénarios Jeedom dès le démarrage d'un Live ou la sortie d'une vidéo/publication).
- **Couverture Officielle des 4 Plateformes** :
  - **Twitch (`API Helix` + OAuth2 Device Flow)** : compteur de followers, liste automatique de vos chaînes suivies, streams en direct (titre, jeu/catégorie, spectateurs, vignette `16:9`) et dernières vidéos / VODs. Association en 1 clic par code d'activation (`twitch.tv/activate`) sans nécessiter d'accès HTTPS externe sur votre box Jeedom.
  - **YouTube (`Data API v3` + Flux Atom RSS sans quota)** : compteur d'abonnés, vues et vidéos, liste de vos abonnements (via OAuth2 Google ou liste `@handle` / `UC...`), détection des Lives en direct et des nouvelles vidéos / Shorts optimisée par requêtes groupées (`1` unité de quota pour `50` vidéos au lieu de `100` unités par recherche).
  - **Instagram (`Instagram Graph API` officielle + `business_discovery`)** : statistiques de votre compte Créateur/Business (`followers_count`, `follows_count`, `media_count`), suivi des abonnés et des derniers posts/Reels de tout autre compte Créateur/Business public via `business_discovery`, avec renouvellement automatique des jetons longue durée (`60` jours).
  - **Discord (`API v10` : Bot + OAuth2 + Invitations publiques)** : liste des serveurs rejoints (`guilds`), compteurs de membres et de personnes en ligne (y compris sur tout serveur externe disposant d'un lien `discord.gg/...` ou du Widget serveur sans bot), détection des conférences Stage / événements / salons vocaux actifs et remontée des derniers messages d'annonces.
- **Moteur Hybride au Choix : Sobriété Luna (`Cron`) ou Temps Réel (`Démon WebSocket`)** :
  - **Mode Cron PHP léger (par défaut)** : `0 Mo` de RAM au repos, cadence configurable par équipement (`1` à `60` min) et pause nocturne programmable.
  - **Mode Hybride Démon Python Temps Réel (optionnel, port `55107`)** : maintient des connexions WebSocket sortantes **Twitch EventSub** (`stream.online` / `stream.offline`) et **Discord Gateway v10** pour déclencher vos scénarios domotiques en moins de `2` secondes lors d'un passage en Live ou d'une annonce Discord.
- **Multi-Utilisateurs / Multi-Profils & Liaison aux Comptes Utilisateurs Jeedom (`user::all()`)** :
  - Créez autant de **profils sociaux nommés** que de membres du foyer ou d'espaces (*Profil principal*, *Aurélien*, *Léa*, *Association*...), chacun avec ses propres comptes et jetons OAuth2 **Twitch**, **YouTube**, **Instagram** et **Discord**.
  - Associez chaque profil (ou chaque équipement) à un **compte utilisateur Jeedom** :
    - **Sélection fixe par équipement** : l'équipement utilise le profil choisi et expose les commandes `profile_name`, `jeedom_user_id` et `jeedom_user_login` pour cibler automatiquement le bon destinataire dans vos scénarios de notification.
    - **Mode dynamique (`auto_jeedom_user`)** : un même widget *Hub Global* peut basculer automatiquement sur le profil social lié à l'utilisateur Jeedom actuellement connecté au Dashboard ou à l'application Mobile.
    - **Visibilité restreinte optionnelle (`restrictToJeedomUser`)** : masquez un équipement personnel sur le Dashboard des autres comptes utilisateurs Jeedom (hors administrateurs).
- **Annonces Vocales (`tts_summary`), Widgets « Dark Glass » v1.4 & Kiosk TV (`altTvDashboard`)** :
  - Résumé vocal naturel prêt à diffuser sur vos enceintes (`altSonos`, `altAirCast`, `altAirMedia`).
  - Widgets Dashboard et Mobile aux **9 thèmes Dark Glass** avec lightbox vignette, recherche d'abonnements et compatibilité native **10-Foot UI** (`getKioskWidgetData()`) dans **Alt Dashboard & Kiosk TV (`altTvDashboard`)**.

---

## 2. Guide de Configuration Rapide par Plateforme

Ouvrez **Plugins -> Communication -> Alt Réseaux Sociaux, Lives & Créateurs**, puis cliquez sur **Assistant Comptes & Création**.

### 2.1. Twitch (Recommandé : Device Code en 1 clic)
1. Rendez-vous sur [dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps) et créez une application (URL de redirection : `http://localhost`, Catégorie : *Application Integration*).
2. Copiez le **Client ID** dans l'onglet **Twitch** de l'Assistant Jeedom.
3. Cliquez sur **Connecter mon compte Twitch (Device Code)**, ouvrez `https://www.twitch.tv/activate` et saisissez le code affiché : votre compte, vos abonnés et tous vos abonnements sont immédiatement liés avec rafraîchissement automatique du jeton.

### 2.2. YouTube
1. Dans [Google Cloud Console](https://console.cloud.google.com/), activez **YouTube Data API v3** et créez une **Clé API** (`AIza...`), puis collez-la dans l'onglet **YouTube** de l'Assistant.
2. Indiquez votre chaîne (`@MaChaine` ou `UC...`) et/ou vos chaînes suivies (`@Micode, @LofiGirl...`).
3. *Optionnel (abonnements privés automatiques)* : créez dans Google Cloud un identifiant **ID client OAuth 2.0** de type **Téléviseurs et appareils à saisie limitée**, renseignez `Client ID` + `Client Secret` et cliquez sur **Device Flow**.

### 2.3. Instagram (Comptes Créateur ou Business)
1. Meta ayant fermé l'*Instagram Basic Display API* fin 2024, l'API officielle requiert un compte Instagram **Créateur** ou **Professionnel** (activation gratuite dans l'application Instagram).
2. Depuis [developers.facebook.com](https://developers.facebook.com/), générez un jeton d'accès utilisateur ou Instagram Login (`IG...` ou `EAA...` avec permissions `instagram_basic` / `instagram_business_basic`) et collez-le dans l'onglet **Instagram**.
3. Renseignez dans *Comptes Créateurs/Business suivis* les `@pseudos` publics dont vous souhaitez suivre les abonnés et nouveaux posts via `business_discovery`.

### 2.4. Discord
- **Suivi rapide sans Bot (Serveur public)** : indiquez simplement le lien d'invitation (`discord.gg/xxxx`) dans la *Watchlist* ou dans un équipement *Cible* pour récupérer le nombre de membres et de personnes en ligne.
- **Suivi complet avec Bot (Salons Live, Événements & Annonces)** : créez une application sur [discord.com/developers/applications](https://discord.com/developers/applications), onglet **Bot**, copiez le **Bot Token** dans l'Assistant et invitez le bot en lecture seule (`View Channels`, `Read Message History`) sur votre serveur. Activez *Message Content Intent* sur le portail Discord si vous souhaitez le texte complet des messages hors embeds.

---

## 3. Commandes Disponibles par Équipement

| Commande (`logicalId`) | Type | Description |
| :--- | :---: | :--- |
| `refresh` | `action / other` | Synchronise immédiatement l'équipement |
| `followers_count` | `info / numeric` | Nombre d'abonnés / followers / membres Discord (historisé par défaut sur les cibles et plateformes) |
| `subscriptions_count` | `info / numeric` | Nombre total d'abonnements / serveurs suivis |
| `online_count` | `info / numeric` | Spectateurs cumulés en Live ou membres Discord actuellement en ligne |
| `media_count` / `views_count` | `info / numeric` | Nombre total de publications/vidéos et vues cumulées (modes `platform` et `target`) |
| `is_live` | `info / binary` | `1` si au moins un Live est en cours, `0` sinon (**idéal en déclencheur de scénario**) |
| `live_count` | `info / numeric` | Nombre de chaînes ou salons actuellement en direct |
| `live_summary` | `info / string` | Résumé lisible des Lives actifs (auteur, plateforme et spectateurs) |
| `last_live_author` / `last_live_title` / `last_live_category` / `last_live_url` | `info / string` | Détails complets et lien direct du principal Live en cours |
| `posts_count_24h` | `info / numeric` | Nombre de nouveaux posts / vidéos / annonces publiés sur les dernières 24 heures |
| `last_post_id` | `info / string` | Identifiant unique de la dernière publication (**déclencheur exact de scénario sans doublon**) |
| `last_post_author` / `last_post_title` / `last_post_platform` / `last_post_url` / `last_post_date` | `info / string` | Métadonnées et lien direct de la dernière publication détectée |
| `filter_platform` / `active_filter` | `action / select` & `info` | Filtre de plateforme actif sur un équipement `Hub Global` |
| `profile_name` | `info / string` | Nom du profil social actif associé à l'équipement |
| `jeedom_user_id` / `jeedom_user_login` | `info / numeric` & `string` | Identifiant et login du compte utilisateur Jeedom rattaché au profil ou à l'équipement |
| `tts_summary` | `info / string` | Résumé vocal naturel prêt à diffuser en TTS |
| `last_sync` | `info / string` | Horodatage de la dernière synchronisation réussie |

### Exemples de Scénarios Domotiques
- **Alerte Lumineuse & TV au démarrage d'un Live** :
  - *Déclencheur* : `#[Bureau][Twitch - ZeratoR][En Live]# == 1`
  - *Actions* : passer les barres `altHue` en violet pendant 10 secondes et diffuser `#[Bureau][Twitch - ZeratoR][Résumé vocal TTS]#` sur `altAirCast` / `altSonos`.
- **Notification sur nouvelle vidéo ou annonce Discord** :
  - *Déclencheur* : `#[Salon][Hub Réseaux Sociaux][ID dernier post]#`
  - *Action* : envoyer une notification Jeedom contenant `Nouveau post sur #[Salon][Hub Réseaux Sociaux][Plateforme dernier post]# par #[Salon][Hub Réseaux Sociaux][Auteur dernier post]# : #[Salon][Hub Réseaux Sociaux][Titre dernier post]# (#[Salon][Hub Réseaux Sociaux][URL dernier post]#)`.

---

## 4. Sobriété Matérielle (Jeedom Luna) & Architecture de Persistance

- **Équilibre RAM `tmpfs` vs Flash `eMMC`** : les vignettes, listes de streams et flux de publications sont maintenus exclusivement en mémoire vive (`/tmp/jeedom/altSocial/state_eq_<id>.json`) avec rotation automatique `LRU < 1.8 Mo`, évitant toute usure de la mémoire eMMC.
- **Écriture atomique POSIX** : les jetons OAuth2 rafraîchis et l'empreinte de référence anti-doublon (`data/state/eq_<id>.json`) sont écrits via fichier temporaire `.tmp`, `fsync()` et `rename()` atomique uniquement lorsqu'une donnée critique change réellement.
- **Démon Temps Réel sobre (`0,00 %` CPU au repos)** : lorsqu'il est activé, `altSociald.py` repose intégralement sur `asyncio` et `aiohttp` avec filtrage par delta et hystérésis de `5 %` sur les compteurs de spectateurs afin de ne réveiller Apache/PHP que sur changement significatif.

---

## 5. Confidentialité, Protection des Données & Mesures de Sécurité

- **Communication directe sans serveur intermédiaire** : votre box Jeedom communique directement en HTTPS/WSS (`TLS 1.2+`) avec les API officielles de Twitch (`api.twitch.tv`), Google/YouTube (`googleapis.com` / `youtube.com`), Meta/Instagram (`graph.instagram.com` / `graph.facebook.com`) et Discord (`discord.com`). Aucune clé, statistique ou liste d'abonnements ne transite par un serveur tiers de l'auteur.
- **Isolation stricte des secrets (`0600` & `.htaccess`)** : les clés API, secrets OAuth2 et tokens Bot sont stockés hors de la base SQL et hors du DOM navigateur, dans `plugins/altSocial/data/profiles/accounts.json` verrouillé en permissions `0600` dans un dossier `0700` protégé par `.htaccess` (`Require all denied`).
- **Zéro secret dans `ps aux` ni dans les logs** : aussi bien le worker ponctuel Cron que le démon temps réel lisent leur configuration et la clé API interne Jeedom exclusivement depuis un fichier JSON temporaire `0600` dans `/tmp/jeedom/altSocial/`, supprimé dès la fin de l'exécution ou l'arrêt du démon.
- **Clause de non-affiliation** : ce plugin est un développement indépendant et n'est ni affilié, ni approuvé, ni édité par Jeedom SAS, Twitch Interactive Inc., Google LLC, Meta Platforms Inc. ou Discord Inc.

---

## 6. Support & Licence

- **Documentation en ligne** : [https://alt-erre.github.io/jeedom-docs/altSocial/](https://alt-erre.github.io/jeedom-docs/altSocial/)
- **Changelog** : [https://alt-erre.github.io/jeedom-docs/altSocial/changelog](https://alt-erre.github.io/jeedom-docs/altSocial/changelog)
- **Tickets & Support** : [https://github.com/alt-erre/jeedom-docs/issues](https://github.com/alt-erre/jeedom-docs/issues)
- **Auteur** : Aurélien Léovant (`alt-erre`) - Licence `Propriétaire - Tous droits réservés` (réinstallations illimitées sur les équipements de l'acheteur conformément aux CGU du Jeedom Market).
