# Plugin Jeedom — Alt Contrôle Parental (Nintendo Switch) (`altSwitch`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Jeux Vidéo & Contrôle Parental  

---

## Présentation

Le plugin **Alt Contrôle Parental (Nintendo Switch)** (`altSwitch`) permet d'intégrer et de piloter le **Contrôle Parental officiel Nintendo Switch** directement dans **Jeedom** pour l'ensemble de la gamme de consoles **Nintendo Switch** :
- **Nintendo Switch** *(V1 & V2)*
- **Nintendo Switch Lite**
- **Nintendo Switch OLED**
- **Nintendo Switch 2**

Grâce à son **Assistant d'Appairage OAuth2 PKCE officiel**, le plugin découvre automatiquement toutes les consoles associées à votre compte parent Nintendo, remonte en temps quasi-réel le **temps joué aujourd'hui**, le **temps restant**, les **jeux lancés (avec leurs jaquettes officielles)** et la **répartition par profil de joueur**, et vous permet d'**agir instantanément depuis Jeedom ou vos scénarios** (ajout de temps bonus `+15 / +30 / +60 min`, mode illimité pour la journée, verrouillage immédiat de la console, activation de la suspension forcée du logiciel, modification de l'heure du coucher ou du code PIN).

---

## Fonctionnalités Clés

1. **Suivi du Temps d'Écran & des Quotas Journaliers** :
   - `Temps joué aujourd'hui` (en minutes et formaté `1h 15m`) et `Temps restant aujourd'hui` (en minutes et formaté).
   - `Limite quotidienne active` (en minutes ou `Illimité`) et `Temps bonus accordé aujourd'hui`.
   - Statut synthétique temps réel : *Prête à jouer*, *Temps disponible*, *Bientôt écoulé ($\le 15\text{ min}$)*, *Temps écoulé (Suspendue / Alarme)*, *Heure du coucher*, *Console verrouillée (0 min)*, *Temps libre (Sans limite)*.

2. **Pilotage Instantané & Temps Bonus (Scénarios & Dashboard)** :
   - **Boutons de temps bonus** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)` et **`Mode illimité aujourd'hui`**.
   - **Verrouillage immédiat** : commande `Verrouiller aujourd'hui (0 min)` qui passe la limite du jour à `0 min` et active la suspension automatique du logiciel (idéal pour l'heure des devoirs ou du repas).
   - **Curseur de quota journalier** : commande `Définir limite quotidienne (min)` de `0` à `360 min` par pas de 15 minutes.
   - **Mode de fin du temps imparti** : commandes `Activer suspension forcée` (met la console en pause avec demande de code PIN lorsque le temps est écoulé) et `Désactiver suspension forcée (Alarme seule)`.
   - **Heure du coucher (*Bedtime Alarm*)** : commandes `Définir heure du coucher (HH:MM)` (ex. `20:30`), `Désactiver heure du coucher` et info numérique `Heure du coucher (HHMM)` (`2030`) pour vos scénarios Jeedom.
   - **Code PIN Parental de la console** : lecture masquée/révélable au clic dans le widget et commande `Modifier code PIN console` (`4` à `8` chiffres).

3. **Suivi des Jeux Lancés & des Profils de Joueurs** :
   - Remontée du **jeu principal joué aujourd'hui**, de sa **jaquette officielle** et du temps passé par titre.
   - Détail du **temps de jeu par profil d'utilisateur (Mii / pseudo)** créé sur la console.
   - Statistiques mensuelles (`Jours joués ce mois-ci`, `Temps joué ce mois-ci`).

4. **Widget Personnalisé « Dark Glass » (`alt-erre`) Dashboard & Mobile** :
   - Architecture unifiée **Dark Glass** supportant **5 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Ambre / Or*, *Rouge / Carmin*).
   - Vignette `58×58 px` affichant dynamiquement la **jaquette du jeu joué aujourd'hui** (ou le badge du modèle *SWITCH*, *OLED*, *LITE*, *SWITCH 2*), jauge de progression colorée et **4 onglets interactifs** (*Contrôles*, *Jeux*, *Profils*, *PIN / Infos*).

5. **Synergie native avec `Alt Vie Scolaire (Pronote)` (`altPronote`)** :
   - Associez `altPronote` et `altSwitch` dans un scénario Jeedom pour conditionner automatiquement l'accès à la console Nintendo Switch / Switch 2 à la réalisation des devoirs scolaires !

---

## Appairage Rapide OAuth2 PKCE Nintendo (3 étapes)

1. Dans Jeedom (*Plugins $\to$ Multimédia $\to$ Alt Contrôle Parental (Nintendo Switch)*), cliquez sur **Assistant Compte Nintendo**.
2. Cliquez sur **« 1. Générer & Ouvrir la page de connexion Nintendo »** et connectez-vous sur `accounts.nintendo.com` avec votre **compte Nintendo Parent** (celui lié à l'application mobile *Contrôle parental Nintendo Switch*).
3. Sur la page Nintendo *« Associer un compte »*, récupérez l'adresse du bouton rouge **« Sélectionner »** (`npf54789befb391a838://auth#session_token_code=...`) :
   - **Sur Ordinateur (Mac / PC)** : **Clic droit** sur le bouton rouge **« Sélectionner »** $\to$ **« Copier l'adresse du lien »**, puis collez-le dans Jeedom.
   - **Sur iPad / iPhone (iOS / iPadOS)** : Safari bloquant le menu *Copier* sur les liens d'applications (`npf...://`), maintenez votre doigt sur le bouton rouge **« Sélectionner »** et **faites-le glisser légèrement (Glisser-Déposer)** jusqu'à ce qu'il se détache sous votre doigt. Fermez la fenêtre Nintendo avec un second doigt (bouton `X`) et **lâchez directement le bouton dans le champ de l'Étape 2 de Jeedom** (ou glissez-le dans la barre d'adresse de Safari).
   - **Sur Android (Chrome)** : **Appui long** sur le bouton rouge **« Sélectionner »** $\to$ **« Copier l'adresse du lien »**.
4. Cliquez sur **« 2. Valider & Découvrir mes Consoles Switch / Switch 2 »** : toutes vos consoles (**Switch, Switch Lite, Switch OLED, Switch 2**) sont automatiquement créées et synchronisées dans Jeedom !

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 3.5, 4.3 et 4.8) :

- **Authentification OAuth2 PKCE officielle sans stockage de mot de passe** : La connexion s'effectue directement sur le serveur officiel `accounts.nintendo.com`. Votre mot de passe Nintendo et vos codes de double authentification (2FA) ne transitent jamais par Jeedom.
- **Protection absolue des jetons et secrets (Art. 4.3 — Zéro secret dans `ps aux` ni dans les logs)** :
  - Le jeton `session_token` OAuth2 est stocké exclusivement en local sur votre box Jeedom dans `data/profiles/` avec des permissions système strictes **`chmod 0600`** et un fichier **`.htaccess` (`Require all denied`)** interdisant tout accès HTTP direct.
  - Les échanges entre le moteur PHP Jeedom et le worker Python isolé (`resources/venv`) passent exclusivement par un fichier JSON temporaire dans `jeedom::getTmpFolder('altSwitch')` verrouillé en `0600` et supprimé immédiatement après exécution (`@unlink`). Aucun jeton, code PIN ou clé API n'apparaît jamais dans la liste des processus (`ps aux`) ni dans les logs Jeedom.
  - Toutes les données et fichiers de profils sont intégralement supprimés lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Synchronisation groupée & Pause nocturne (23h00 – 06h00)** :
  - Lorsque plusieurs consoles Switch sont rattachées au même compte parent Nintendo, le plugin mutualise l'interrogation Cloud et suspend les requêtes automatiques la nuit (23h00 – 06h00) pour respecter les serveurs Nintendo.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Nintendo Co., Ltd.).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
