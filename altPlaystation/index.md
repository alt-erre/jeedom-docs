# Plugin Jeedom — Alt Contrôle Parental (PlayStation) (`altPlaystation`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Jeux Vidéo & Contrôle Parental  

---

## Présentation

Le plugin **Alt Contrôle Parental (PlayStation)** (`altPlaystation`) permet d'intégrer, de superviser et de piloter le **Contrôle Parental officiel PlayStation Family**, l'activité **PlayStation Network (PSN)** ainsi que l'état matériel **réseau local (DDP UDP)** directement dans **Jeedom** pour l'ensemble de la gamme de consoles **Sony PlayStation** :
- **PlayStation 5** *(Standard & Édition Numérique)*
- **PlayStation 5 Slim**
- **PlayStation 5 Pro**
- **PlayStation 4 & PlayStation 4 Pro**

Grâce à son **Assistant d'Appairage SSO Sony (`npsso`)** et son **Scanner Réseau Local DDP**, le plugin découvre automatiquement les profils enfants supervisés (**PlayStation Family**) ainsi que votre profil PSN principal, remonte le **temps joué aujourd'hui**, le **temps restant**, le **jeu en cours ou dernier jeu lancé (avec sa jaquette officielle haute résolution)**, les **trophées PSN** et l'**état électrique temps réel sur le réseau local (`Allumée`, `Mode Repos`, `Éteinte`)**, et vous permet d'**agir instantanément depuis Jeedom ou vos scénarios** (ajout de temps bonus `+15 / +30 / +60 min`, mode illimité pour la journée, verrouillage immédiat `0 min`, déconnexion forcée en fin de temps, heure du coucher, niveau d'âge PEGI et réveil réseau *Wake-on-LAN / DDP*).

---

## Fonctionnalités Clés

1. **Suivi du Temps d'Écran & des Quotas Journaliers (PlayStation Family & PSN)** :
   - `Temps joué aujourd'hui` (en minutes et formaté `1h 30m`) et `Temps restant aujourd'hui` (en minutes et formaté).
   - `Limite quotidienne active` (en minutes ou `Illimité`) et `Temps bonus accordé aujourd'hui`.
   - Statut synthétique temps réel : *Prête à jouer*, *En session de jeu*, *Temps disponible*, *Bientôt écoulé ($\le 15\text{ min}$)*, *Temps écoulé (Déconnexion auto / Notification)*, *Heure du coucher atteinte*, *Console verrouillée (0 min)*, *Temps libre (Sans limite)*.

2. **Pilotage Instantané & Temps Bonus (Scénarios & Dashboard)** :
   - **Boutons de temps bonus** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)` et **`Mode illimité aujourd'hui`**.
   - **Verrouillage immédiat** : commande `Verrouiller aujourd'hui (0 min)` qui passe la limite du jour à `0 min` et active la déconnexion automatique de la session (idéal pour l'heure des devoirs ou du repas).
   - **Curseur de quota journalier** : commande `Définir limite quotidienne (min)` de `0` à `360 min` par pas de 15 minutes.
   - **Action en fin du temps imparti** : commandes `Activer déconnexion forcée (Fin de temps)` (`FORCE_LOGOUT`) et `Désactiver déconnexion forcée (Notification seule)` (`NOTIFY_ONLY`).
   - **Heure du coucher (*Window End*)** : commandes `Définir heure du coucher (HH:MM)` (ex. `21:00`), `Désactiver heure du coucher` et info numérique `Heure du coucher (HHMM)` (`2100`) pour vos scénarios Jeedom.
   - **Restriction d'âge PEGI** : lecture et commande `Définir niveau d'âge PEGI (1 à 11)`.

3. **Suivi des Jeux Lancés, des Profils Famille & des Trophées PSN** :
   - Remontée du **jeu principal / actif**, de sa **jaquette officielle PS5 / PS4** et du temps cumulé par titre.
   - Catalogue des **jeux récents** avec plateforme (`PS5` / `PS4`), durée totale de jeu, nombre de sessions et date de dernière partie (*Aujourd'hui*, *Hier*, `JJ/MM`).
   - Détail des **membres de la famille PlayStation** (statut en ligne, rôle *Enfant* / *Chef de famille*, avatar et jeu actif).
   - Suivi du **Niveau Trophées PSN** et du détail des trophées (*Platine*, *Or*, *Argent*, *Bronze*).

4. **Détection & Réveil Réseau Local LAN (Protocole DDP UDP `9302` PS5 / `987` PS4 — Optionnel)** :
   - Lorsque l'adresse IP locale de la console PS5 / PS4 est renseignée (ou découverte via le bouton **Scanner LAN**), le plugin interroge directement la console en UDP local pour remonter instantanément son **état matériel** (`Allumée (En ligne LAN)` code `200`, `Mode Repos (Veille LAN)` code `620`, `Éteinte`), le **titre en cours d'exécution en direct** et permet de sortir la console de veille via la commande **`Réveiller console (Wake-on-LAN / DDP)`**.

5. **Widget Personnalisé « Dark Glass » (`alt-erre`) Dashboard & Mobile** :
   - Architecture unifiée **Dark Glass** supportant **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
   - Vignette `58×58 px` affichant dynamiquement la **jaquette du jeu actif** (ou le badge du modèle *PS5*, *PS5 SLIM*, *PS5 PRO*, *PS4*, *PS4 PRO*), jauge de progression colorée, retours visuels tactiles (`.is-triggered`, `.is-refreshing`, `.is-confirmed` avec protection anti-double-clic) et **4 onglets interactifs** (*Contrôles*, *Jeux*, *Profils*, *Trophées / LAN*).

6. **Synergie native avec `Alt Vie Scolaire (Pronote)` (`altPronote`)** :
   - Associez `altPronote` et `altPlaystation` dans un scénario Jeedom pour conditionner automatiquement l'accès à la console PS5 / PS4 à la réalisation des devoirs scolaires !

---

## Architecture Hybride : Ce qui est 100 % Local (LAN) vs Ce qui dépend d'Internet (Cloud Sony)

Le plugin **Alt Contrôle Parental (PlayStation)** combine deux canaux complémentaires — le **protocole réseau local UDP DDP / Wake-on-LAN** et les **API Cloud Sony (PlayStation Family & PlayStation Network)** — avec un **mode repli LAN automatique** en cas de coupure Internet.

### 🏠 1. Fonctionnalités 100 % Locales (Réseau LAN — Sans Internet)

Lorsque l'adresse IP locale de la console PS5 / PS4 est renseignée (ou découverte via le bouton **Scanner LAN**), les fonctions suivantes s'exécutent **intégralement sur votre réseau local**, sans aucune dépendance à Internet ni aux serveurs Sony :

- **Découverte automatique des consoles sur le LAN (`Scanner LAN`)** : scan par broadcast UDP local sur le port `9302` (PS5 / PS5 Slim / PS5 Pro — protocole DDP `00030010`) et le port `987` (PS4 / PS4 Pro — protocole DDP `00020020`).
- **État électrique matériel en temps réel (`console_power_state` & `console_awake`)** :
  - `Allumée (En ligne LAN)` (réponse DDP `HTTP/1.1 200 Ok`),
  - `Mode Repos (Veille LAN)` (réponse DDP `HTTP/1.1 620 Server Standby`),
  - `Éteinte / Hors-ligne LAN` (aucune réponse UDP locale).
- **Détection en direct du jeu ou de l'application en cours (`current_game_name`)** : lecture directe des en-têtes locaux `running-app-name` et `running-app-titleid` diffusés par la console sur le LAN.
- **Identification matérielle locale** : récupération du nom d'hôte (`host-name`), du modèle (`host-type` : `PS5` / `PS4`), de l'identifiant matériel (`host-id` / numéro de série) et de la version système (`system-version`).
- **Réveil à distance de la console (`wake_console`)** : envoi local du *Magic Packet Wake-on-LAN* (UDP ports `9` et `7`) et du paquet `DDP WAKEUP` authentifié (UDP ports `9302` et `987`).
- **Association locale par Code PIN à 8 chiffres (*Lecture à distance / Remote Play LAN*) & Mise en veille (`standby_console`)** :
  - Depuis l'onglet 2 de l'**Assistant Compte PlayStation** (*Paramètres $\to$ Système $\to$ Lecture à distance $\to$ Associer un périphérique* sur la PS5 / PS4), associez une seule fois la console avec son code PIN à 8 chiffres.
  - Active la commande **`Mettre en veille la console (Standby LAN)`** (`standby_console`) et le bouton **Veille (<i class="fas fa-moon"></i>)** du widget sur **tous les comptes (Adultes comme Enfants, sans dépendre de PlayStation Family)**.
  - Active la **mise en veille automatique sur le LAN** dès que le temps restant journalier tombe à `0 min`, que l'heure du coucher est atteinte ou lors d'un clic sur **`Verrouiller aujourd'hui (0 min)`** !
- **Compteur de temps de jeu & règles parentales locales (Mode LAN autonome / Repli hors-ligne)** : suivi du temps joué dans la journée par mesure des sessions actives DDP sur le LAN, calcul du temps restant, gestion des quotas locaux, ajout de temps bonus (`+15 / +30 / +60 min`), verrouillage `0 min` et alarme d'heure du coucher.

### 🌐 2. Fonctionnalités dépendantes d'Internet (Cloud Sony PSN & PlayStation Family)

Les fonctions suivantes nécessitent une connexion Internet active et un compte PlayStation (`npsso`) :

- **Authentification SSO & Renouvellement OAuth2** : échange initial du jeton `npsso` et rafraîchissement automatique du `refresh_token` auprès de `ca.account.sony.com`.
- **Contrôle Parental officiel PlayStation Family (`OhanaClient`)** :
  - Lecture et modification à distance des restrictions sur les **comptes enfants supervisés** : quota journalier Cloud, ajout de temps bonus, verrouillage `0 min`, mode illimité, heure du coucher (`windowEnd`), action en fin de temps (`FORCE_LOGOUT` / `NOTIFY_ONLY`) et niveau d'âge PEGI (`1` à `11`).
  - *Note technique :* Sur l'écosystème PlayStation, l'application effective d'une restriction ou la déconnexion forcée de la session d'un enfant sur la console passe obligatoirement par les serveurs Cloud de Sony.
- **Historique de la bibliothèque PSN, Temps cumulés & Trophées (`m.np.playstation.com`)** :
  - Liste des 15 derniers jeux joués avec leur durée totale cumulée sur le PSN et leur nombre de sessions.
  - Niveau et compteurs détaillés des **Trophées PSN** (*Platine*, *Or*, *Argent*, *Bronze*).
  - Présence en ligne Cloud (y compris lorsque le joueur se connecte sur une console hors du domicile).
- **Jaquettes officielles haute résolution & Avatars PSN** : images chargées depuis les CDN officiels Sony (`image.api.playstation.com`).

### 📊 Tableau récapitulatif (Local LAN vs Cloud Internet)

| Fonctionnalité | 100 % Local (LAN DDP / WoL) | Cloud Internet (PSN / Family) | Comportement si Internet est coupé |
| :--- | :---: | :---: | :--- |
| Scan & découverte des consoles PS5 / PS4 sur le réseau | ✅ Oui (UDP `9302` / `987`) | ❌ Non requis | Fonctionne à 100 % en local |
| État électrique temps réel (`Allumée`, `Mode Repos`, `Éteinte`) | ✅ Oui (DDP `200` / `620`) | ❌ Non requis | Fonctionne à 100 % en local |
| Nom & ID du jeu en cours d'exécution sur la console | ✅ Oui (`running-app-name`) | ✅ Oui (Présence PSN) | Remonté en direct via le LAN DDP |
| Réveil de la console en Mode Repos (`wake_console`) | ✅ Oui (WoL + `DDP WAKEUP`) | ❌ Non requis | Fonctionne à 100 % en local |
| Mise en veille manuelle ou auto à `0 min` (`standby_console`) | ✅ Oui (Remote Play / DDP LAN) | ✅ Oui (Family sur compte Enfant) | Mise en veille LAN active (tous comptes Adultes & Enfants) |
| Compteur de temps joué aujourd'hui & Temps restant | ✅ Oui (Compteur session LAN) | ✅ Oui (Family + Delta PSN) | Bascule automatiquement sur le compteur LAN |
| Quotas, Bonus `+15/+30/+60`, Coucher (Scénarios Jeedom) | ✅ Oui (Moteur local Jeedom) | ✅ Oui (PlayStation Family) | Règles et statuts mis à jour localement dans Jeedom |
| Déconnexion forcée Cloud de la session enfant par Sony | ❌ Non (Cloud Sony requis) | ✅ Oui (PlayStation Family) | Remplacée en local par la Mise en veille auto LAN (`Standby`) |
| Trophées PSN, Temps cumulés globaux & Jaquettes CDN | ❌ Cache local uniquement | ✅ Oui (API PSN & CDN Sony) | Conserve en cache le dernier snapshot Cloud connu |

### 🛡️ 3. Mode Repli LAN Automatique (Résilience Hors-Ligne)

Si votre connexion Internet ou les serveurs Sony PlayStation Network deviennent temporairement indisponibles (ou si vous configurez une console uniquement par son adresse IP locale sans compte PSN) :
- Le worker Python bascule automatiquement et sans erreur en **Mode Repli LAN (`lan_fallback` / `lan_only`)**.
- L'état d'alimentation (`Allumée`, `Mode Repos`, `Éteinte`), le jeu en cours (`running-app-name`), le temps joué aujourd'hui et les règles parentales locales continuent d'être mis à jour à chaque cycle.
- Les derniers profils famille, historiques de jeux et trophées récupérés avant la coupure sont préservés grâce au cache local sécurisé (`cached_cloud_snapshot` chiffré/verrouillé en `0600`).

---

## Appairage Rapide Compte PlayStation (3 étapes)

1. Dans Jeedom (*Plugins $\to$ Multimédia $\to$ Alt Contrôle Parental (PlayStation)*), cliquez sur **Assistant Compte PlayStation**.
2. Cliquez sur **« 1. Ouvrir PlayStation.com et me connecter »** et connectez-vous avec votre **compte Chef de Famille / Parent PlayStation** (celui lié à l'application mobile *PlayStation Family* ou *PlayStation App*).
3. Cliquez sur **« 2. Ouvrir la page du jeton SSO Sony (`ca.account.sony.com/api/v1/ssocookie`) »**, copiez la ligne JSON affichée (`{"npsso":"..."}`), collez-la dans l'Étape 3 de Jeedom et cliquez sur **« 3. Valider & Découvrir mes Profils / Consoles PlayStation »**.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 3.5, 4.3 et 4.8) :

- **Authentification SSO officielle Sony sans stockage de mot de passe** : La connexion s'effectue directement sur le portail officiel `www.playstation.com`. Votre mot de passe Sony, votre clé d'accès (*Passkey*) et vos codes de double authentification (2FA) ne transitent jamais par Jeedom.
- **Protection absolue des jetons et secrets (Art. 4.3 — Zéro secret dans `ps aux` ni dans les logs)** :
  - Le jeton `npsso` et les jetons OAuth2 (`access_token` / `refresh_token`) sont stockés exclusivement en local sur votre box Jeedom dans `data/profiles/` avec des permissions système strictes **`chmod 0600`** et un fichier **`.htaccess` (`Require all denied`)** interdisant tout accès HTTP direct.
  - Les échanges entre le moteur PHP Jeedom et le worker Python isolé (`resources/venv`) passent exclusivement par un fichier JSON temporaire dans `jeedom::getTmpFolder('altPlaystation')` verrouillé en `0600` et supprimé immédiatement après exécution (`@unlink`). Aucun jeton, secret ou clé API n'apparaît jamais dans la liste des processus (`ps aux`) ni dans les logs Jeedom.
  - Toutes les données et fichiers de profils sont intégralement supprimés lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Pause nocturne intelligente (23h00 – 06h00)** :
  - Le plugin suspend automatiquement les requêtes Cloud périodiques la nuit (23h00 – 06h00) pour respecter les serveurs Sony PlayStation Network.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Sony Interactive Entertainment Inc.).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
