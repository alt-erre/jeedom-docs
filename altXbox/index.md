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

Grâce à son **Assistant d'Appairage OAuth2 Microsoft / Xbox officiel**, le plugin découvre automatiquement toutes les consoles associées à votre compte, remonte l'**état d'alimentation** (*Allumée*, *Veille connectée (Instant-On)*, *Éteinte*), le **temps joué aujourd'hui**, le **temps restant**, les **jeux lancés (avec leurs jaquettes officielles)** et les **profils Gamertag**, et vous permet d'**agir instantanément depuis Jeedom ou vos scénarios** (allumage Wake-on-LAN / SmartGlass, extinction à distance, ajout de temps bonus `+15 / +30 / +60 min`, mode illimité pour la journée, verrouillage immédiat de la console, extinction automatique en fin de temps, modification de l'heure du coucher ou du code PIN).

---

## Fonctionnalités Clés

1. **Suivi du Temps d'Écran & des Quotas Journaliers** :
   - `Temps joué aujourd'hui` (en minutes et formaté `1h 15m`) et `Temps restant aujourd'hui` (en minutes et formaté).
   - `Limite quotidienne active` (en minutes ou `Illimité`) et `Temps bonus accordé aujourd'hui`.
   - Statut synthétique temps réel : *Prête à jouer*, *Console allumée*, *En jeu sur Xbox*, *Temps disponible*, *Bientôt écoulé ($\le 15\text{ min}$)*, *Temps écoulé (Bloquée / Alarme)*, *Heure du coucher*, *Console verrouillée (0 min)*, *Temps libre (Sans limite)*.

2. **Pilotage Instantané, Temps Bonus & Alimentation Console (Scénarios & Dashboard)** :
   - **Alimentation à distance (SmartGlass Cloud & Local UDP `5050`)** : commandes `Allumer la console (Wake)`, `Éteindre la console`, `Redémarrer la console` et état binaire `Console allumée`.
   - **Boutons de temps bonus** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)` et **`Mode illimité aujourd'hui`**.
   - **Verrouillage immédiat** : commande `Verrouiller aujourd'hui (0 min)` qui passe la limite du jour à `0 min` et éteint immédiatement la console Xbox (idéal pour l'heure des devoirs ou du repas).
   - **Curseur de quota journalier** : commande `Définir limite quotidienne (min)` de `0` à `360 min` par pas de 15 minutes.
   - **Mode de fin du temps imparti** : commandes `Activer extinction auto fin de temps` (éteint automatiquement la Xbox lorsque le quota ou l'heure du coucher est atteint) et `Désactiver extinction auto (Alarme seule)`.
   - **Heure du coucher (*Couvre-feu*)** : commandes `Définir heure du coucher (HH:MM)` (ex. `21:00`), `Désactiver heure du coucher` et info numérique `Heure du coucher (HHMM)` (`2100`) pour vos scénarios Jeedom.
   - **Code PIN Parental de la console** : lecture masquée/révélable au clic dans le widget et commande `Modifier code PIN console` (`4` à `8` chiffres).

3. **Suivi des Jeux Lancés & des Profils Gamertag** :
   - Remontée du **jeu en cours en direct** (via *Xbox Live Presence*) ou du **jeu principal joué aujourd'hui**, de sa **jaquette officielle** (*Xbox TitleHub*) et du temps passé par titre.
   - Détail du **temps de jeu par profil Gamertag** avec son **Gamerpic Xbox**.
   - Statistiques mensuelles (`Jours joués ce mois-ci`, `Temps joué ce mois-ci`).

4. **Widget Personnalisé « Dark Glass » (`alt-erre`) Dashboard & Mobile** :
   - Architecture unifiée **Dark Glass** supportant **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude (Xbox Green)*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
   - Vignette `58×58 px` affichant dynamiquement la **jaquette du jeu joué aujourd'hui** (ou le badge du modèle *SERIES X*, *SERIES S*, *ONE X*, *ONE S*, *XBOX*), jauge de progression colorée et **4 onglets interactifs** (*Contrôles*, *Jeux*, *Profils*, *PIN / Infos*).

5. **Synergie native avec `Alt Vie Scolaire (Pronote)` (`altPronote`)** :
   - Associez `altPronote` et `altXbox` dans un scénario Jeedom pour conditionner automatiquement l'accès à la console Xbox Series X|S ou Xbox One à la réalisation des devoirs scolaires !

---

## Appairage Rapide OAuth2 Microsoft / Xbox (3 étapes)

1. Sur votre console Xbox (*Paramètres $\to$ Appareils et connexions $\to$ Fonctionnalités à distance*), vérifiez que l'option **« Activer les fonctionnalités à distance »** est cochée et que le mode d'alimentation est sur **Veille (Instant-On)** si vous souhaitez pouvoir l'allumer à distance.
2. Dans Jeedom (*Plugins $\to$ Multimédia $\to$ Alt Contrôle Parental (Xbox)*), cliquez sur **Assistant Compte Microsoft / Xbox**.
3. Cliquez sur **« 1. Générer & Ouvrir la page de connexion Microsoft / Xbox »** et connectez-vous sur `login.live.com` avec votre compte Microsoft associé à la console.
4. Une fois redirigé sur la page blanche finale, **copiez l'URL complète de la barre d'adresse** (`https://login.live.com/oauth20_desktop.srf?code=M...`), collez-la dans l'Étape 2 de Jeedom et cliquez sur **« 2. Valider & Découvrir mes Consoles Xbox Series X|S / Xbox One »** : toutes vos consoles sont automatiquement créées et synchronisées dans Jeedom !

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
