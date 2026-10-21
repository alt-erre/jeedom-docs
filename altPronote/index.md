# Plugin Jeedom — Alt Vie Scolaire (Pronote) (`altPronote`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Organisation / Vie Scolaire, Emploi du Temps & Cahier de Textes  

---

## Présentation

Le plugin **Alt Vie Scolaire (Pronote)** (`altPronote`) permet d'intégrer le suivi complet de la scolarité **PRONOTE** (collèges, lycées et établissements d'enseignement supérieur) directement dans **Jeedom**, aussi bien pour les **comptes Élève** que pour les **comptes Parent (mono ou multi-enfants)**.

Grâce à son **Assistant d'Appairage par QR Code Mobile**, le plugin est **compatible avec 100 % des établissements et portails académiques (ÉduConnect, MonBureauNumérique, Île-de-France, e-lyco, ENT régionaux, double authentification 2FA)** : une fois le QR Code généré dans PRONOTE avec un code PIN temporaire à 4 chiffres, Jeedom négocie un **jeton mobile rotatif (`token_login`)** qui se renouvelle automatiquement et de manière chiffrée à chaque synchronisation.

---

## Fonctionnalités Clés

1. **Emploi du Temps Temps Réel & Réveil Intelligent Domotique** :
   - Récupération automatique des cours d'**aujourd'hui**, de **demain** et du **prochain jour de cours effectif** (horaires, matière, professeur, salle de classe, code couleur).
   - **Commandes dédiées aux scénarios de réveil Jeedom** :
     - `Heure 1er cours aujourd'hui` (`08:00`) et `Heure 1er cours aujourd'hui (HHMM)` (`800` — directement utilisable avec `time_op(#[Objet][Élève][Heure 1er cours aujourd'hui (HHMM)]#, -60)` dans un scénario Jeedom).
     - `Heure fin des cours aujourd'hui` / `(HHMM)` et `Heure 1er cours demain` / `(HHMM)` + `Heure fin des cours demain`.
   - **Détection automatique des cours annulés et professeurs absents** :
     - Recalcule automatiquement l'heure réelle du premier et du dernier cours de la journée lorsqu'un cours en début ou en fin de journée est annulé.
     - Commandes `Cours annulés aujourd'hui`, `Cours annulés demain` et `Résumé des cours annulés` pour déclencher des notifications instantanées.

2. **Cahier de Textes & Devoirs Interactifs** :
   - Liste des devoirs à faire sur un horizon configurable (`7`, `14`, `21` ou `30` jours).
   - Compteurs dédiés : `Devoirs restants à faire`, `Devoirs faits`, `Devoirs non faits pour demain`, `Total devoirs pour demain` et `Prochain devoir à faire`.
   - **Cochage / Décochage interactif depuis le Widget Jeedom** : cliquez directement sur la case à cocher d'un devoir dans le widget Dashboard pour le marquer comme *Fait* ou *Non fait* sur PRONOTE.

3. **Notes, Moyennes & Évaluations par Compétences** :
   - **Moyenne générale de l'élève** (`/20`) et **moyenne générale de la classe** (`/20`) sur la période en cours (*Trimestre* ou *Semestre*).
   - **Détection de nouvelle note** : commandes `Dernière note reçue` (ex. `16,5/20 en Mathématiques (Coef. 2)`), `Matière dernière note`, `Valeur dernière note` et `Date dernière note` pour envoyer une notification dès la publication d'une note.
   - Détail complet des **moyennes par matière** et des **évaluations par compétences**.

4. **Vie Scolaire, Assiduité, Menus de Cantine & Informations** :
   - Suivi des **absences** (`Nombre d'absences`, `Absences non justifiées`, `Dernière absence`), des **retards** (`Nombre de retards`, `Dernier retard`) et des **punitions / observations** (`Nombre de punitions`, `Dernière punition`).
   - **Menus de la cantine** du jour (`Menu cantine aujourd'hui`) et du lendemain (`Menu cantine demain`).
   - **Informations & Sondages** de l'établissement (`Informations non lues`, `Dernière information établissement`).

5. **Widget Personnalisé « Dark Glass » (`alt-erre`) Dashboard & Mobile** :
   - Architecture unifiée **Dark Glass** supportant **5 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Ambre / Or*, *Rouge / Carmin*).
   - Carte d'état supérieure avec statut temps réel de la journée (*En cours*, *Avant les cours*, *Intercours*, *Journée terminée*, *Repos*), salle actuelle/prochaine et horaire du premier cours du lendemain.
   - Bandeau de 4 compteurs rapides et **5 onglets interactifs** (*Aujourd'hui*, *Demain*, *Devoirs*, *Notes*, *Vie / Menu*).

---

## Appairage Rapide par QR Code Mobile PRONOTE

1. Connectez-vous à votre espace PRONOTE habituel (Web ou application mobile) avec votre compte **Élève** ou **Parent**.
2. Cliquez sur l'icône **QR Code** en haut à droite (ou dans *Mon compte $\to$ Générer un QR Code*) et définissez un **code PIN temporaire à 4 chiffres** (ex. `1234`).
3. Dans Jeedom (*Plugins $\to$ Organisation $\to$ Alt Vie Scolaire (Pronote)*), cliquez sur **Assistant QR Code & Compte**.
4. Importez la capture d'écran du QR Code (ou collez son contenu JSON), saisissez le code PIN à 4 chiffres et cliquez sur **Appairer le QR Code & Synchroniser l'élève**.
5. Vous pouvez à tout moment exporter une sauvegarde `.json` de votre profil de jeton depuis la fiche de l'équipement.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 3.5, 4.3 et 4.8) :

- **Communication directe entre votre box Jeedom et le serveur PRONOTE de votre établissement** : Toutes les requêtes s'effectuent directement en HTTPS chiffré (AES/RSA selon le protocole PRONOTE) entre votre installation Jeedom et le serveur PRONOTE de l'établissement scolaire, sans jamais transiter par un serveur tiers.
- **Protection absolue des jetons et secrets (Art. 4.3 — Zéro secret dans `ps aux` ni dans les logs)** :
  - Le code PIN temporaire à 4 chiffres du QR Code n'est utilisé qu'une seule fois lors de l'appairage initial et n'est jamais stocké.
  - Le jeton mobile rotatif (`token`) généré par PRONOTE ainsi que tout mot de passe éventuel sont stockés exclusivement en local dans `data/profiles/eq_<id>.json` avec des permissions système strictes **`chmod 0600`** et un fichier **`.htaccess` (`Require all denied`)** interdisant tout accès HTTP direct.
  - Les échanges entre le moteur PHP Jeedom et le worker Python isolé (`resources/venv`) passent exclusivement par un fichier JSON temporaire dans `jeedom::getTmpFolder('altPronote')` verrouillé en `0600` et supprimé immédiatement après lecture (`@unlink`). Aucun jeton, mot de passe ou clé API n'apparaît jamais dans la liste des processus (`ps aux`) ni dans les journaux d'événements Jeedom.
  - Toutes les données et fichiers de profils sont intégralement supprimés lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Prévention des blocages d'adresse IP (Rate-Limiting Index Éducation)** :
  - Le plugin utilise une planification Cron raisonnée (30 minutes par défaut) assortie d'une **pause nocturne automatique (22h00 – 06h00)** afin de ne pas solliciter inutilement les serveurs scolaires la nuit et d'éviter tout bannissement temporaire d'adresse IP.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Index Éducation SAS / PRONOTE).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
