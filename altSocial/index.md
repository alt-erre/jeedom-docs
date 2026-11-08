# Alt Réseaux Sociaux, Lives & Créateurs (`altSocial`)

Plugin Jeedom unifié permettant de suivre vos **comptes de réseaux sociaux**, le **nombre d'abonnés ou de membres**, la **liste de vos abonnements**, les **chaînes et salons actuellement en Live** ainsi que les **nouveaux posts, vidéos et annonces** (compatible **Twitch**, **YouTube**, **Instagram** et **Discord**).

---

## 1. Fonctionnalités Principales

- **3 Modes d'Équipements Complémentaires (Utilisables simultanément)** :
  1. **Hub Global Multi-Réseaux (`hub`)** : regroupe dans un seul widget unifié vos 4 plateformes avec filtres instantanés (*Tous*, *Twitch*, *YouTube*, *Instagram*, *Discord*), total des Lives en cours, nouveaux posts et abonnements.
  2. **Espace Plateforme (`platform`)** : un équipement dédié par réseau (*Mon Espace Twitch*, *Mon Espace YouTube*, *Mon Espace Instagram*, *Mon Espace Discord*) centralisant votre profil, vos abonnés, tous vos abonnements, les Lives actifs et le flux des publications.
  3. **Compte / Chaîne / Serveur Ciblé (`target`)** : un équipement dédié au suivi précis d'une chaîne créateur ou d'un serveur communautaire (historisation de la courbe d'abonnés/membres et déclencheurs directs de scénarios Jeedom dès le démarrage d'un Live ou la sortie d'une vidéo/publication).
- **Connexion Simplifiée en 1 Clic & Mode « Zéro Console Développeur » sur les 4 Plateformes** :
  - **Twitch (Popup / Code d'activation 1 clic ou simple `@pseudo`)** : cliquez sur **Se connecter avec Twitch en 1 clic** (aucun *Client ID* ni compte développeur requis) pour lier votre compte via `twitch.tv/activate` et récupérer automatiquement votre profil, tous vos abonnements suivis et les Lives en cours. Vous pouvez également suivre n'importe quelle chaîne (`@zerator`, `@kamet0`...) sans même connecter de compte grâce au moteur GraphQL intégré.
  - **YouTube (Popup / Code d'activation `google.com/device` en 1 clic ou simple `@handle`)** : cliquez sur **Se connecter avec YouTube en 1 clic** (aucun projet ni clé Google Cloud requis) pour lier votre compte YouTube via `google.com/device` (popup + QR Code) et importer automatiquement votre chaîne et toute votre liste d'abonnements suivis. Vous pouvez également suivre n'importe quelle chaîne par simple `@handle` ou importer une liste par copier-coller en 1 clic.
  - **Instagram (Connexion directe au compte ou simple `@pseudo` sans Meta Developer)** : connectez directement votre compte Instagram (votre mot de passe n'est jamais conservé, seul le jeton de session `0600` est enregistré) pour récupérer vos abonnements suivis, les Lives en direct et les nouveaux posts/Reels, ou indiquez simplement des `@pseudos` publics sans connexion.
  - **Discord (QR Code Mobile en 1 clic ou liens `discord.gg/...`)** : scannez le QR Code affiché dans Jeedom avec l'application mobile Discord de votre téléphone (*Paramètres > Scanner le code QR*) pour retrouver instantanément tous vos serveurs rejoints, les membres en ligne, les conférences Stage / événements en direct et les annonces sans créer de Bot Discord.
  - *Mode Avancé (Optionnel)* : les clés API développeur (Client ID Twitch, API Key YouTube Data v3, Jeton Meta Graph Business, Bot Token Discord) restent disponibles dans un tiroir replié pour les utilisateurs avancés.
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

## 2. Guide de Configuration Rapide en 1 Clic (Sans Console Développeur)

Ouvrez **Plugins -> Communication -> Alt Réseaux Sociaux, Lives & Créateurs**, puis cliquez sur **Assistant Comptes & Création**.

### 2.1. Twitch (Popup & Code d'activation en 1 clic ou `@pseudo`)
1. Cliquez sur **Se connecter avec Twitch en 1 clic** : la fenêtre d'autorisation Twitch (`twitch.tv/activate`) s'ouvre automatiquement (accompagnée d'un QR Code scannable au téléphone).
2. Cliquez sur **Autoriser** sur Twitch : votre profil, vos abonnés, toute votre liste d'abonnements et les Lives en cours sont immédiatement liés, sans créer aucune application développeur.
3. *Sans compte connecté* : vous pouvez aussi simplement saisir des pseudos (`zerator, kamet0...`) dans *Chaînes suivies complémentaires*.

### 2.2. YouTube (Popup & Code `google.com/device` en 1 clic ou `@handle`)
1. **Avec votre compte YouTube / Google (1 clic)** : cliquez sur **Se connecter avec YouTube en 1 clic** : la fenêtre `https://www.google.com/device` s'ouvre automatiquement (accompagnée d'un QR Code pour téléphone). Validez le code affiché pour lier votre chaîne et importer automatiquement tous vos abonnements YouTube, sans créer de projet Google Cloud.
2. **Sans connexion (`@handle` ou copier-coller)** : saisissez simplement votre chaîne (`@MaChaine`) et/ou vos chaînes suivies (`@Micode, @LofiGirl...`), ou utilisez l'outil **Importer une liste d'abonnements par copier-coller en 1 clic** depuis [youtube.com/feed/channels](https://www.youtube.com/feed/channels).

### 2.3. Instagram (Connexion directe au compte ou simple `@pseudo`)
1. **Avec votre compte Instagram** : saisissez votre identifiant Instagram et votre mot de passe puis cliquez sur **Connecter Instagram** (votre mot de passe n'est jamais stocké, seul le jeton de session `0600` est enregistré) pour récupérer automatiquement votre liste de comptes suivis, les Lives en cours et les derniers posts/Reels.
2. **Sans connexion** : indiquez simplement les `@pseudos` publics dans *Mon compte Instagram* ou *Comptes suivis complémentaires*.

### 2.4. Discord (QR Code Application Mobile en 1 clic ou liens `discord.gg/...`)
1. **Avec votre compte Discord (QR Code en 1 clic)** : cliquez sur **Se connecter par QR Code Discord**, ouvrez l'application **Discord** sur votre smartphone (*Avatar en bas à droite > Scanner le code QR*) et validez sur votre téléphone : tous vos serveurs rejoints, les membres en ligne, les conférences Stage / événements en direct et les salons d'annonces sont immédiatement récupérés sans créer de Bot.
2. **Sans connexion (Serveur public)** : indiquez simplement le lien d'invitation (`discord.gg/xxxx`) pour récupérer le nombre de membres et de personnes en ligne.

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
