# Alt Vie Sportive (SportEasy) (`altSportEasy`)

[![Version](https://img.shields.io/badge/Version-0.1.0--beta.1-10b981.svg)](CHANGELOG.md)
[![Jeedom](https://img.shields.io/badge/Jeedom-%3E%3D%204.2-0A84FF.svg)](https://www.jeedom.com)
[![Licence](https://img.shields.io/badge/Licence-Propri%C3%A9taire-amber.svg)](LICENSE)
[![Kiosk TV](https://img.shields.io/badge/Kiosk%20TV%2010--Foot-Compatible%20Niveau%202-8b5cf6.svg)](https://github.com/alt-erre/jeedom-docs)

**Alt Vie Sportive (SportEasy)** (`altSportEasy`) intègre vos plannings sportifs familiaux, les entraînements, les matchs, les heures de rendez-vous (RDV), les convocations, les annulations de dernière minute, les scores et les messages du coach issus de **SportEasy** directement dans **Jeedom** et sur votre écran **Kiosk TV 10-Foot** (`altTvDashboard`).

Conçu dans la lignée de **`Alt Vie Scolaire (Pronote)`** et **`Alt Vie Scolaire (Educartable)`**, ce plugin complète l'organisation familiale quotidienne pour ne plus jamais oublier un sac de sport la veille, une convocation en attente de réponse ou un changement d'horaire de match le week-end.

---

## Fonctionnalités principales

- **Connexion Hybride (Compte SportEasy Multi-Enfants + Calendrier iCal `.ics`)** :
  1. **Mode Compte SportEasy (API v2.1 / v2.2 - Recommandé)** : authentification au compte Parent, Joueur ou Coach avec **découverte automatique du profil principal et de tous les profils enfants rattachés** (`X-IMPERSONATED-ID`), extraction de toutes les équipes multi-sports et extraction automatique du lien `.ics` en secours.
  2. **Mode Calendrier iCal (`.ics` / `webcal://`) autonome** : possibilité d'ajouter une équipe uniquement via son lien de calendrier partagé SportEasy sans saisir d'identifiants.
- **Granularité idéale pour la famille : 1 Équipement Jeedom = 1 couple `Membre x Équipe`** :
  - Exemple : `SportEasy - Lucas (Foot U11)`, `SportEasy - Lucas (Tennis)`, `SportEasy - Emma (Basket U15)`.
- **Suivi complet des Entraînements, Matchs & Annulations** :
  - Détection automatique d'une séance ou d'un match **aujourd'hui** (`has_event_today`) et **demain** (`has_event_tomorrow`).
  - Remontée distincte de l'**heure de début** (`next_event_start_time`) et de l'**heure de rendez-vous / convocation du coach** (`next_event_meeting_time`), du **lieu / stade** (`next_event_location`) et de l'**adversaire** (`next_event_opponent`).
  - Alerte immédiate en cas d'**annulation d'entraînement ou de match** (`canceled_today_count`, `canceled_tomorrow_count`, `canceled_summary`).
- **Réponse interactive aux Convocations (`Présent` / `Absent`)** :
  - Compteur de convocations en attente (`pending_convocations_count`).
  - Réponse en **1 clic** (`Présent` ou `Absent`) depuis le Widget Dashboard, le Widget Mobile, la télécommande Kiosk TV 10-Foot ou un scénario Jeedom (`respond_present_next`, `respond_absent_next`, `respond_attendance`).
- **Derniers Résultats, Scores & Discussions du Coach** :
  - Suivi du dernier match joué (`last_result_title`), du score (`last_result_score`) et de l'issue (`Victoire`, `Match nul`, `Défaite`).
  - Remontée des discussions d'équipe et messages du coach (`unread_messages_count`, `last_message_title`, `last_message_body`, `last_message_author`) avec accusé de lecture en 1 clic (`acknowledge_message`).
- **Widget Dark Glass v1.4 & Compatibilité Native Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Widget Dashboard et Mobile **Dark Glass** décliné en **9 thèmes de couleur** (`green`, `blue`, `cyan`, `amber`, `red`, `purple`, `pink`, `teal`, `slate`) avec coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`).
  - Contrat Kiosk TV 10-Foot **Niveau 2 (`getKioskWidgetData`)** : tuile synthèse familiale + modale plein écran lisible à 3 mètres avec confirmation de convocation à la télécommande D-Pad.
- **Sobriété exemplaire pour Jeedom Luna (0 Mo de RAM permanente)** :
  - Architecture **100 % Cron sans démon résident** (`hasOwnDeamon = false`), pause nocturne automatique entre `22h00` et `06h30`, écriture atomique POSIX uniquement lorsque les jetons de session évoluent.

---

## Installation & Configuration

1. Installez le plugin **Alt Vie Sportive (SportEasy)** (`altSportEasy`) et activez-le.
2. Lancez l'installation des **Dépendances** si elles ne sont pas déjà au statut `OK` (environnement virtuel Python isolé dans `resources/venv` utilisant exclusivement des bibliothèques sous licences permissives `requests` et `certifi`).
3. Rendez-vous dans **Plugins -> Organisation -> Alt Vie Sportive (SportEasy)** et cliquez sur **Assistant SportEasy** :
   - **Onglet 1 - Compte SportEasy** : saisissez l'adresse e-mail et le mot de passe de votre compte SportEasy (Parent, Joueur ou Coach). L'assistant découvre automatiquement vos équipes ainsi que celles de tous vos enfants rattachés, crée un équipement par couple `Membre x Équipe` et lance la première synchronisation.
   - **Onglet 2 - Calendrier iCal (`.ics` / `webcal://`)** : collez simplement l'URL `webcal://` ou `https://` du calendrier d'équipe SportEasy pour un suivi en lecture seule sans identifiants.

---

## Commandes créées par équipement

### 1. Identité & Statut général

| Nom | Logical ID | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **Rafraîchir** | `refresh` | `action / other` | Force une synchronisation immédiate avec SportEasy |
| **Compte connecté** | `online` | `info / binary` | `1` si la dernière synchronisation a réussi, `0` sinon |
| **Dernière synchronisation** | `last_sync` | `info / string` | Horodatage de la dernière mise à jour (`JJ/MM/AAAA HH:MM`) |
| **Nom du membre** | `member_name` | `info / string` | Prénom et nom du joueur / enfant rattaché |
| **Nom de l'équipe** | `team_name` | `info / string` | Nom de l'équipe SportEasy (ex. `U11 Équipe 1`) |
| **Club** | `club_name` | `info / string` | Nom du club sportif |
| **Sport** | `sport_name` | `info / string` | Discipline sportive (ex. `Football`, `Basketball`, `Tennis`) |
| **Rôle dans l'équipe** | `member_role` | `info / string` | Rôle du membre (`Joueur`, `Parent`, `Coach`, `Calendrier iCal`) |
| **Notifications non lues** | `unread_notifications_count` | `info / numeric` | Nombre de notifications SportEasy non lues |

### 2. Aujourd'hui, Demain & Annulations

| Nom | Logical ID | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **Statut du jour** | `day_status` | `info / string` | Synthèse lisible de la journée ou de la prochaine séance |
| **Séance ou match aujourd'hui** | `has_event_today` | `info / binary` | `1` si au moins un événement non annulé a lieu aujourd'hui |
| **Nombre d'événements aujourd'hui** | `events_today_count` | `info / numeric` | Nombre de séances/matchs actifs aujourd'hui |
| **Heure début aujourd'hui** | `first_event_today_time` | `info / string` | Heure de début du premier événement du jour (`HH:MM`) |
| **Résumé événements du jour** | `today_events_summary` | `info / string` | Résumé complet des séances/matchs du jour (horaire, RDV, lieu) |
| **Séance ou match demain** | `has_event_tomorrow` | `info / binary` | `1` si au moins un événement non annulé a lieu demain |
| **Nombre d'événements demain** | `events_tomorrow_count` | `info / numeric` | Nombre de séances/matchs actifs demain |
| **Heure début demain** | `first_event_tomorrow_time` | `info / string` | Heure de début du premier événement de demain (`HH:MM`) |
| **Résumé événements de demain** | `tomorrow_events_summary` | `info / string` | Résumé complet des séances/matchs de demain |
| **Annulations aujourd'hui** | `canceled_today_count` | `info / numeric` | Nombre d'événements annulés aujourd'hui |
| **Annulations demain** | `canceled_tomorrow_count` | `info / numeric` | Nombre d'événements annulés demain |
| **Résumé des annulations** | `canceled_summary` | `info / string` | Détail des séances annulées aujourd'hui ou demain |

### 3. Prochain événement & Convocations

| Nom | Logical ID | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **ID prochain événement** | `next_event_id` | `info / string` | Identifiant SportEasy du prochain événement |
| **Prochain événement** | `next_event_title` | `info / string` | Intitulé du prochain entraînement ou match |
| **Type prochain événement** | `next_event_type` | `info / string` | Catégorie (`Entraînement`, `Match`, `Tournoi`, etc.) |
| **Date prochain événement** | `next_event_date` | `info / string` | Date formatée en français (`Mer. 12 nov.`) |
| **Heure début prochain événement** | `next_event_start_time` | `info / string` | Heure de début (`HH:MM`) |
| **Heure RDV prochain événement** | `next_event_meeting_time` | `info / string` | Heure de rendez-vous fixée par le coach (`HH:MM`) |
| **Lieu prochain événement** | `next_event_location` | `info / string` | Nom et adresse du stade / gymnase |
| **Adversaire prochain événement** | `next_event_opponent` | `info / string` | Équipe adverse (si match) |
| **Présence prochain événement** | `next_event_attendance` | `info / string` | Statut (`Présent`, `À confirmer`, `Absent`, `Liste d'attente`, `Non convoqué`) |
| **Événements à venir** | `upcoming_events_count` | `info / numeric` | Nombre d'événements programmés sur l'horizon configuré |
| **Convocations en attente** | `pending_convocations_count` | `info / numeric` | Nombre de convocations nécessitant une réponse |
| **Répondre Présent (Prochain)** | `respond_present_next` | `action / other` | Confirme la présence du membre au prochain événement |
| **Répondre Absent (Prochain)** | `respond_absent_next` | `action / other` | Signale l'absence du membre au prochain événement |
| **Répondre à une convocation** | `respond_attendance` | `action / message` | Répond à un événement spécifique (`title` = ID événement, `message` = `present` ou `absent`) |

### 4. Derniers résultats & Messages du coach

| Nom | Logical ID | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **Dernier match joué** | `last_result_title` | `info / string` | Affiche ou intitulé du dernier match terminé |
| **Dernier score** | `last_result_score` | `info / string` | Score final du dernier match |
| **Issue du dernier match** | `last_result_outcome` | `info / string` | `Victoire`, `Match nul`, `Défaite` ou `Terminé` |
| **Date du dernier match** | `last_result_date` | `info / string` | Date du dernier match joué |
| **Nombre de discussions** | `threads_count` | `info / numeric` | Nombre de fils de discussion d'équipe récents |
| **Messages non lus** | `unread_messages_count` | `info / numeric` | Nombre de messages / commentaires non lus |
| **Sujet dernier message** | `last_message_title` | `info / string` | Titre de la dernière discussion d'équipe |
| **Contenu dernier message** | `last_message_body` | `info / string` | Dernier message publié par le coach ou l'équipe |
| **Auteur dernier message** | `last_message_author` | `info / string` | Nom de l'auteur du dernier message |
| **Date dernier message** | `last_message_date` | `info / string` | Date du dernier message |
| **Marquer discussion comme lue** | `acknowledge_message` | `action / message` | Envoie l'accusé de lecture (`ack`) sur la discussion indiquée |

---

## Exemples de scénarios Jeedom pour la famille

1. **Rappel « Préparer le sac de sport » la veille à 19h30** :
   - Déclencheur programmé : `30 19 * * *`
   - Condition : `#[Maison][SportEasy - Lucas (Foot U11)][Séance ou match demain]# == 1`
   - Action : Notification mobile ou synthèse vocale (`altAirCast` / `altSonos`) :
     *« N'oubliez pas de préparer le sac de foot de Lucas : demain, #[Maison][SportEasy - Lucas (Foot U11)][Résumé événements de demain]# »*.
2. **Alerte immédiate en cas d'annulation (pluie / terrain fermé)** :
   - Déclencheur provoqué : `#[Maison][SportEasy - Lucas (Foot U11)][Annulations aujourd'hui]# > 0`
   - Action : Notification prioritaire aux parents avec `#[Maison][SportEasy - Lucas (Foot U11)][Résumé des annulations]#`.
3. **Relance des convocations en attente le jeudi soir** :
   - Condition : `#[Maison][SportEasy - Lucas (Foot U11)][Convocations en attente]# > 0`
   - Action : Notification avec rappel de l'affiche `#[Maison][SportEasy - Lucas (Foot U11)][Prochain événement]#` le `#[Maison][SportEasy - Lucas (Foot U11)][Date prochain événement]#`.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux Conditions Générales d'Utilisation du Jeedom Market (Art. 3.5, 4.3, 4.4 et 4.8) et au Règlement Général sur la Protection des Données (RGPD) :

- **Traitement 100 % local sur votre box Jeedom** :
  - Vos identifiants, cookies de session et liens iCal SportEasy sont stockés exclusivement en local sur votre box Jeedom dans le répertoire `plugins/altSportEasy/data/profiles/` avec des permissions système strictes `0600` (lecture/écriture réservée à l'utilisateur système du serveur web) et protégés contre tout accès HTTP direct par un fichier `.htaccess` (`Require all denied`).
  - Aucune donnée personnelle, sportive ou familiale ne transite par un serveur tiers : la box Jeedom communique directement en HTTPS (`TLS 1.2+`) avec les serveurs officiels `https://api.sporteasy.net`.
- **Protection absolue des secrets (`ps aux` et journaux)** :
  - Les identifiants et jetons ne sont jamais passés en argument de ligne de commande (`ps aux`) ni écrits en clair dans les fichiers de logs Jeedom. Les échanges entre PHP et le worker Python s'effectuent via un fichier temporaire éphémère en RAM (`/tmp/jeedom/altSportEasy/payload_*.json`) verrouillé en `0600` et supprimé immédiatement après exécution (`finally { @unlink(...); }`).
- **Sobriété matérielle & Préservation de la mémoire flash eMMC (Jeedom Luna)** :
  - Les fichiers de profils dans `data/profiles/` sont sauvegardés par **écriture atomique POSIX** (`.tmp` + `fsync` + `rename`) uniquement lorsque les cookies de session évoluent réellement.
  - Les commandes textuelles et volatiles ont l'historisation désactivée par défaut (`isHistorized = 0`) afin de préserver la base MariaDB et la mémoire eMMC.

---

## Mentions légales & Marques déposées

- **Licence** : `"Propriétaire - Tous droits réservés"` - Auteur : **Aurélien Léovant (`alt-erre`)**. L'achat du plugin sur le Jeedom Market confère un droit d'utilisation personnel et non exclusif avec **réinstallations illimitées** sur les propres équipements de l'acheteur.
- **Non-affiliation (Art. L.713-6 CPI)** : Ce plugin est développé de manière indépendante par Aurélien Léovant (`alt-erre`) et n'est ni affilié, ni sponsorisé, ni approuvé par **Jeedom SAS** ou **SportEasy SAS**. La dénomination **SportEasy** est citée uniquement à titre de référence nécessaire pour indiquer la destination et la compatibilité fonctionnelle du plugin.
