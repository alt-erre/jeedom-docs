# Changelog — Alt Contrôle Parental (Xbox) (`altXbox`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](../VERSIONING.md).

---

## [0.1.0-beta.4] - 2026-10-28

### Corrigé
- **Fusion automatique & dédoublonnage des équipements Xbox (Local LAN UDP `5050` $\leftrightarrow$ Compte Microsoft Cloud)** :
  - Correction de la création en double d'une même console lorsqu'elle était découverte d'une part en **100 % Local LAN (`UDP 5050` — ID matériel `FD00...` / `F400...` + IP locale)** et d'autre part via l'**Assistant Compte Microsoft Cloud (`XBOX-<xuid>`)**.
  - `sync_all_consoles` combine désormais systématiquement la découverte locale SmartGlass (`UDP 5050`) et la découverte Cloud dans une fiche hybride unique en préservant toujours le `Live Device ID` matériel (`FD00...`) et l'adresse IP locale de la console.
  - Ajout de `altXbox::deduplicateConsoles()` (exécuté automatiquement à l'ouverture de la page du plugin, lors de la découverte et à chaque synchronisation) pour fusionner automatiquement tout équipement doublon déjà créé en conservant ses paramètres, son adresse IP, son `Live Device ID`, ses jetons et ses états de commandes.

---

## [0.1.0-beta.3] - 2026-10-28

### Corrigé
- **Authentification OAuth2 Microsoft Live & Xbox Network (`HTTP 403` & `oauth20_desktop.srf?removed=true`)** :
  - Ajout du flux officiel **Code d'Appairage Microsoft (`https://www.microsoft.com/link`)** (*OAuth2 Device Code Flow*) dans l'Onglet 1 de l'Assistant d'Appairage : l'utilisateur saisit simplement un code court à 8 caractères sur `microsoft.com/link` sans jamais avoir à copier d'URL dans la barre d'adresse (contournant définitivement la suppression de `?code=...` par `?removed=true` sur `oauth20_desktop.srf`).
  - Implémentation native de la signature cryptographique **ECDSA NIST P-256 (`ES256` Proof-of-Possession)** (`XboxRequestSigner`), de l'authentification matérielle **`device.auth.xboxlive.com/device/authenticate`** (`DeviceToken`), de l'autorisation officielle **Xbox App SISU (`sisu.xboxlive.com/authorize`)** et du préfixe de ticket **`t=`** sur `user.auth.xboxlive.com/user/authenticate`, corrigeant l'erreur `Échec d'authentification Xbox User Token (HTTP 403)`.
  - Ajout d'un lien secondaire **PKCE Xbox App (`ms-xal-000000004c12ae6f://auth`)** dans l'Onglet 2 et décodage explicite des codes d'erreur Xbox Live (`XErr`).

---

## [0.1.0-beta.2] - 2026-10-28

### Ajouté
- **Mode Fallback 100 % Local LAN (SmartGlass UDP `5050`) sans coupure en cas d'indisponibilité d'Internet** :
  - Décodage binaire complet du paquet *SmartGlass Discovery Response (`0xDD01`)* sur le port `UDP 5050` permettant d'extraire en 100 % local le **nom de la console**, son **adresse IP** et son **`Live Device ID` (`FD00...` / `F400...`)** sans aucune requête Cloud.
  - Découverte automatique par **Broadcast LAN (`255.255.255.255:5050`)** des consoles Xbox allumées sur le réseau local même sans connexion Internet.
  - Bascule transparente du worker Python en mode `100% Local LAN (Hors-ligne)` lorsque Internet ou les serveurs Xbox Live sont injoignables : la détection d'état d'allumage, l'allumage local (`Wake` UDP `0xDD02`), la comptabilisation du temps joué, l'historique mensuel, les quotas, les temps bonus, le verrouillage et l'heure du coucher continuent de fonctionner en 100 % local.
  - Mise en cache locale automatique du catalogue de jeux et des profils Gamertag pour conserver l'affichage complet du widget hors-ligne.
  - Ajout des commandes d'information `Joignable en local (UDP 5050)` (`local_reachable`) et `Mode de communication` (`connection_mode`).
- **Documentation** : Ajout d'une section détaillée dans le `README.md` précisant l'architecture Hybride et distinguant chaque fonctionnalité **100 % Locale (LAN)** de celles **dépendantes d'Internet (Cloud)**.

---

## [0.1.0-beta.1] - 2026-10-28

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Contrôle Parental (Xbox)** (`altXbox`) pour **Xbox Series X**, **Xbox Series S**, **Xbox One X**, **Xbox One S** et **Xbox One**.
- **Assistant d'Appairage OAuth2 Microsoft Live / Xbox Network** :
  - Génération du lien d'authentification officiel `login.live.com` sans saisie ni stockage du mot de passe Microsoft dans Jeedom.
  - Échange automatique des jetons Xbox Live (`XASU` / `XSTS`) et découverte automatique des consoles associées via l'API Cloud SmartGlass (`xccs.xboxlive.com`).
  - Export et import de sauvegarde de profil `.json`.
- **Contrôle Parental Complet & Quotas Journaliers** :
  - Suivi du `Temps joué aujourd'hui`, du `Temps restant aujourd'hui`, de la `Limite quotidienne active` et du `Temps bonus accordé aujourd'hui`.
  - Commandes d'action rapides : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)`, `Mode illimité aujourd'hui`, `Verrouiller aujourd'hui (0 min)` et `Définir limite quotidienne (min)`.
  - Gestion de l'heure du coucher (`Définir heure du coucher (HH:MM)`, `Désactiver heure du coucher`) et de l'extinction automatique de la console lorsque le temps est écoulé.
- **Pilotage Alimentation Console (SmartGlass Cloud & Local UDP `5050`)** :
  - Commandes `Allumer la console (Wake)` (combinant le paquet local UDP SmartGlass `0xDD02` sur le port `5050` et l'API Cloud `xccs.xboxlive.com`), `Éteindre la console` et `Redémarrer la console`.
  - Détection temps réel de l'état d'alimentation (*Allumée*, *Veille connectée (Instant-On)*, *Éteinte*) et du jeu actif en direct (*Xbox Live Presence*).
- **Catalogue de Jeux & Profils Gamertag** :
  - Récupération automatique des jeux lancés et de leurs **jaquettes officielles** via *Xbox TitleHub*, ainsi que des profils joueurs (*Gamertag* et *Gamerpic*).
- **Widgets Personnalisés « Dark Glass » (`alt-erre`) Dashboard & Mobile** :
  - Support des 9 thèmes de couleur de la charte `alt-erre`, affichage de la jaquette `58×58 px`, jauge de progression, 4 onglets interactifs (*Contrôles*, *Jeux*, *Profils*, *PIN / Infos*) et animations anti-double-clic.
- **Sécurité & Conformité Jeedom Market (Art. 4.3 CGU)** :
  - Stockage exclusif des jetons dans `data/profiles/` en `chmod 0600` protégé par `.htaccess` (`Require all denied`), et communication PHP $\leftrightarrow$ Worker Python par fichier temporaire `0600` supprimé immédiatement (`@unlink`).
