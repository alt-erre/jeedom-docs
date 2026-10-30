# Plugin Jeedom — Alt Contrôle Parental (Xbox) (`altXbox`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Jeux Vidéo & Contrôle Parental  

---

## Présentation

Le plugin **Alt Contrôle Parental (Xbox)** (`altXbox`) permet d'intégrer et de piloter le **Contrôle Parental Xbox (Microsoft Family Safety)** ainsi que l'**alimentation et l'état en direct des consoles Xbox** directement dans **Jeedom** pour l'ensemble de la gamme :
- **Xbox Series X**
- **Xbox Series S**
- **Xbox One X**
- **Xbox One S**
- **Xbox One**

Conçu selon une **architecture Hybride (Cloud Xbox Network + Fallback 100 % Local LAN SmartGlass UDP `5050`)**, le plugin combine la richesse des services Cloud Microsoft / Xbox (découverte complète, jeu en cours, jaquettes officielles, profils Gamertag, extinction à distance) et la résilience d'un **moteur local sur votre box Jeedom** capable de détecter l'allumage en `< 50 ms`, de réveiller la console (`Wake` UDP `0xDD02`) et de comptabiliser les quotas journaliers même en cas de coupure d'accès à Internet.

---

## Fonctionnalités Clés

1. **Suivi du Temps d'Écran & des Quotas Journaliers** :
   - `Temps joué aujourd'hui` (en minutes et formaté `1h 15m`) et `Temps restant aujourd'hui` (en minutes et formaté).
   - `Limite quotidienne active` (en minutes ou `Illimité`) et `Temps bonus accordé aujourd'hui`.
   - Statut synthétique temps réel : *Prête à jouer*, *Console allumée*, *En jeu sur Xbox*, *Temps disponible*, *Bientôt écoulé ($\le 15\text{ min}$)*, *Temps écoulé (Bloquée / Alarme)*, *Heure du coucher*, *Console verrouillée (0 min)*, *Temps libre (Sans limite)*.

2. **Pilotage Instantané, Temps Bonus & Alimentation Console (Scénarios & Dashboard)** :
   - **Alimentation à distance (SmartGlass Cloud & Local UDP `5050`)** : commandes `Allumer la console (Wake)`, `Éteindre la console`, `Redémarrer la console`, `Console allumée`, `Joignable en local (UDP 5050)` et `Mode de communication`.
   - **Boutons de temps bonus** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)` et **`Mode illimité aujourd'hui`**.
   - **Verrouillage immédiat** : commande `Verrouiller aujourd'hui (0 min)` qui passe la limite du jour à `0 min` et éteint immédiatement la console Xbox (idéal pour l'heure des devoirs ou du repas).
   - **Curseur de quota journalier** : commande `Définir limite quotidienne (min)` de `0` à `360 min` par pas de 15 minutes.
   - **Mode de fin du temps imparti** : commandes `Activer extinction auto fin de temps` (éteint automatiquement la Xbox lorsque le quota ou l'heure du coucher est atteint) et `Désactiver extinction auto (Alarme seule)`.
   - **Heure du coucher (*Couvre-feu*)** : commandes `Définir heure du coucher (HH:MM)` (ex. `21:00`), `Désactiver heure du coucher` et info numérique `Heure du coucher (HHMM)` (`2100`) pour vos scénarios Jeedom.
   - **Code PIN Parental de la console** : lecture masquée/révélable au clic dans le widget et commande `Modifier code PIN console` (`4` à `8` chiffres).

3. **Suivi des Jeux Lancés & des Profils Gamertag** :
   - Remontée du **jeu en cours en direct** (via *Xbox Live Presence*) ou du **jeu principal joué aujourd'hui**, de sa **jaquette officielle** (*Xbox TitleHub*) et du temps passé par titre (avec mise en cache locale automatique).
   - Détail du **temps de jeu par profil Gamertag** avec son **Gamerpic Xbox**.
   - Statistiques mensuelles (`Jours joués ce mois-ci`, `Temps joué ce mois-ci`).

4. **Widget Personnalisé « Dark Glass » (`alt-erre`) Dashboard & Mobile** :
   - Architecture unifiée **Dark Glass** supportant **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude (Xbox Green)*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
   - Vignette `58×58 px` affichant dynamiquement la **jaquette du jeu joué aujourd'hui** (ou le badge du modèle *SERIES X*, *SERIES S*, *ONE X*, *ONE S*, *XBOX*), jauge de progression colorée et **4 onglets interactifs** (*Contrôles*, *Jeux*, *Profils*, *PIN / Infos*).

5. **Synergie native avec `Alt Vie Scolaire (Pronote)` (`altPronote`)** :
   - Associez `altPronote` et `altXbox` dans un scénario Jeedom pour conditionner automatiquement l'accès à la console Xbox Series X|S ou Xbox One à la réalisation des devoirs scolaires !

---

## Architecture Hybride : Ce qui est 100 % Local (LAN) vs Ce qui dépend d'Internet (Cloud)

Le plugin `altXbox` combine **deux canaux de communication complémentaires** et bascule automatiquement en **Fallback 100 % Local (LAN)** si votre connexion Internet ou les serveurs Xbox Live sont momentanément indisponibles :

### 1. Fonctionnalités 100 % Locales (Réseau Local LAN — Sans Internet)

Dès lors que la console Xbox est sur le même réseau local que Jeedom (et/ou que son **Adresse IP locale** est renseignée dans l'équipement), les fonctions suivantes s'exécutent **intégralement en local sans aucune dépendance à Internet** :

| Fonctionnalité 100 % Locale | Protocole / Mécanisme local utilisé |
| :--- | :--- |
| **Détection instantanée de l'état Allumée / Éteinte (`power_state`, `local_reachable`)** | Sonde binaire UDP *SmartGlass Discovery Request (`0xDD00`)* sur le port **`UDP 5050`** (réponse `< 50 ms` sur le LAN). |
| **Découverte locale & Extraction automatique du `Live Device ID` et du Nom** | Décodage binaire du paquet *SmartGlass Discovery Response (`0xDD01`)* en Broadcast LAN (`255.255.255.255:5050`) ou IP directe lorsque la console est allumée. |
| **Allumage de la console (`Allumer la console (Wake)` / `power_on`)** | Envoi direct et broadcast sur le LAN du paquet binaire *SmartGlass PowerOn (`0xDD02`)* sur le port **`UDP 5050`** contenant le `Live Device ID` (`FD00...` / `F400...`) de la console (en mode d'alimentation *Veille / Instant-On*). |
| **Extinction directe en local (`Éteindre la console` / `power_off` & fin de quota)** | Session chiffrée locale SmartGlass sur le port **`UDP 5050`** : extraction du certificat X.509 local (`0xDD01`), échange ECDH + KDF `SHA-512` (`AES-128-CBC` + `HMAC-SHA256`), `ConnectRequest` (`0xCC00`), `LocalJoin` (`0x0003`) et commande **`PowerOff` (`0x0039`)** directe sur le LAN (avec le jeton `XSTS` mis en cache ou en mode anonyme si autorisé sur la console), doublée de la commande Cloud `TurnOff` (`xccs.xboxlive.com`). |
| **Comptabilisation du Temps joué aujourd'hui & Cumul mensuel** | Calculé et persisté localement sur votre box Jeedom (`data/profiles/eq_<id>.json`) tant que la console répond au ping local `UDP 5050`. |
| **Moteur de Quotas, Temps Bonus (`+15 / +30 / +60 min`), Mode Illimité, Verrouillage & Heure du coucher** | Évalué à 100 % en local par Jeedom : toutes les commandes d'action parentales et les déclencheurs de scénarios (`time_remaining_today`, `status_code`, `bedtime_alarm_num`) restent opérationnels hors-ligne. |
| **Affichage des derniers jeux & profils connus** | Conservés dans le cache local chiffré/verrouillé de l'équipement pour rester consultables dans le widget même pendant une coupure Internet. |

### 2. Fonctionnalités dépendantes d'Internet (Cloud Microsoft / Xbox Network)

Les opérations suivantes nécessitent un accès Internet vers les serveurs officiels Microsoft / Xbox Live :

| Fonctionnalité Cloud | Serveur / API sollicité | Comportement en cas de coupure Internet |
| :--- | :--- | :--- |
| **Appairage initial OAuth2 & Renouvellement périodique du jeton `XSTS`** | `login.live.com`, `user.auth.xboxlive.com`, `xsts.auth.xboxlive.com` | Le plugin ne bloque pas et bascule automatiquement en mode **`100% Local LAN (Hors-ligne)`** jusqu'au retour d'Internet. |
| **Découverte Cloud des consoles éteintes** (Modèle exact, n° de série, version OS) | `xccs.xboxlive.com/lists/devices` | Remplacé par la découverte Broadcast UDP `5050` sur le LAN (pour les consoles allumées). |
| **Extinction à distance (`Éteindre la console` / `TurnOff`) & Redémarrage (`Reboot`)** *(ainsi que l'extinction logicielle auto en fin de quota)* | `xccs.xboxlive.com/commands` + Canal local chiffré `UDP 5050` (`0xCC00` $\to$ `0x0039 PowerOff`) | En cas de coupure Internet, le plugin tente d'éteindre directement la console sur le réseau local `UDP 5050` via la session chiffrée SmartGlass (à l'aide du jeton `XSTS` en cache ou en mode anonyme si autorisé dans *Paramètres $\to$ Appareils et connexions $\to$ Fonctionnalités à distance*). |
| **Nom du jeu actif en direct (*Presence*)** | `userpresence.xboxlive.com` | Affiche *« Session locale active »* (ou le dernier jeu en cache) tout en continuant de décompter le temps joué via le ping local `UDP 5050`. |
| **Actualisation du catalogue de jeux, des jaquettes officielles & du profil Gamertag** | `titlehub.xboxlive.com`, `profile.xboxlive.com` & CDN `images-eds-ssl.xboxlive.com` | Conserve et affiche le dernier catalogue de jeux et profil Gamertag mis en cache localement. |
| **Synchronisation bidirectionnelle avec le vrai Contrôle Parental Microsoft Family Safety** | `mobileaggregator.family.microsoft.com/api` (`/v2/roster`, `/v4/activityreport/deviceScreenTimeUsage`, `/v4/activityReport/appUsage`, `/v4/devicelimits/.../overrides`, `/v4/devicelimits/schedules`) | Lit le temps d'écran réel cumulé sur toutes les Xbox, le temps exact joué aujourd'hui par jeu et pilote le verrouillage/déblocage natif Microsoft Family Safety. En cas de coupure Internet, le moteur local prend le relais sans interruption. |

---

## Gestion Multi-Consoles Xbox & Synchronisation Microsoft Family Safety

Si votre foyer possède **plusieurs consoles Xbox** (ex. *Xbox Series X Salon* + *Xbox Series S Chambre*), le plugin propose deux paramètres dédiés sur chaque équipement :
1. **Mode de quota de temps (`quotaMode`)** :
   - **Quota familial partagé multi-Xbox + Microsoft Family Safety (par défaut)** : Le temps joué par votre enfant est **cumulé sur l'ensemble des consoles Xbox** (via l'API officielle *Microsoft Family Safety* `deviceScreenTimeUsage` et la politique familiale partagée). S'il joue $45\text{ min}$ au salon puis passe sur la Xbox de sa chambre, le compteur continue à $45\text{ min}$ et tout ajout de temps bonus (`+15/+30/+60 min`) ou verrouillage s'applique simultanément aux consoles et à Microsoft Family Safety.
   - **Quota indépendant propre à cette console Xbox** : Chaque console gère son propre compteur et son propre quota indépendamment des autres consoles.
2. **Filtrage des profils sur cette console (`profileFilterMode`)** :
   - **Tous les profils de la famille Microsoft / Xbox** (par défaut), ou **Uniquement les Gamertags listés** dans le champ *Profils Gamertag supplémentaires* si chaque enfant possède sa propre console dédiée.

---

## Appairage Rapide Microsoft / Xbox via `microsoft.com/link` (Sans copie d'URL)

1. Sur votre console Xbox (*Paramètres $\to$ Appareils et connexions $\to$ Fonctionnalités à distance*), vérifiez que l'option **« Activer les fonctionnalités à distance »** est cochée et que le mode d'alimentation est sur **Veille (Instant-On)** si vous souhaitez pouvoir l'allumer à distance.
2. Dans Jeedom (*Plugins $\to$ Multimédia $\to$ Alt Contrôle Parental (Xbox)*), cliquez sur **Assistant Compte Microsoft / Xbox**.
3. Dans l'**Onglet 1 (Recommandé)**, cliquez sur **« 1. Générer mon Code d'Appairage & Ouvrir microsoft.com/link »** : un code à 8 caractères s'affiche (et est copié automatiquement) tandis que le portail officiel `https://www.microsoft.com/link` s'ouvre dans un nouvel onglet.
4. Saisissez ou confirmez ce code sur `microsoft.com/link`, connectez-vous avec votre compte Microsoft associé à la console Xbox et acceptez *(aucune URL n'est à copier)*.
5. Revenez dans Jeedom et cliquez sur **« 2. J'ai validé le code sur Microsoft — Découvrir mes Consoles Xbox »** : vos consoles sont automatiquement créées et synchronisées dans Jeedom !
6. *(Recommandé pour le mode Hybride / 100 % Local LAN)* : Indiquez l'**Adresse IP locale** fixe de votre Xbox dans l'onglet *Équipement* (ou laissez la découverte locale UDP `5050` la remplir automatiquement lorsque la console est allumée).

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 3.5, 4.3 et 4.8) :

- **Authentification OAuth2 officielle Microsoft Live sans stockage de mot de passe** : La connexion s'effectue directement sur le serveur officiel `login.live.com`. Votre mot de passe Microsoft et vos codes de double authentification (2FA / Microsoft Authenticator / Passkey) ne transitent jamais par Jeedom.
- **Protection absolue des jetons et secrets (Art. 4.3 — Zéro secret dans `ps aux` ni dans les logs)** :
  - Les jetons OAuth2 (`refresh_token`) et Xbox Live (`XSTS`) sont stockés exclusivement en local sur votre box Jeedom dans `data/profiles/` avec des permissions système strictes **`chmod 0600`** et un fichier **`.htaccess` (`Require all denied`)** interdisant tout accès HTTP direct.
  - Les échanges entre le moteur PHP Jeedom et le worker Python isolé (`resources/venv`) passent exclusivement par un fichier JSON temporaire dans `jeedom::getTmpFolder('altXbox')` verrouillé en `0600` et supprimé immédiatement après exécution (`@unlink`). Aucun jeton, code PIN ou clé API n'apparaît jamais dans la liste des processus (`ps aux`) ni dans les logs Jeedom.
  - Toutes les données et fichiers de profils sont intégralement supprimés lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Pause nocturne intelligente (23h00 – 06h00)** :
  - Le plugin suspend les interrogations Cloud automatiques la nuit (23h00 – 06h00) pour respecter les serveurs Xbox Network / Microsoft tout en laissant les commandes manuelles et scénarios actifs à tout moment.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Microsoft Corporation).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
