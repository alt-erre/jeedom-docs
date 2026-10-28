# Alt Vie Scolaire (Educartable) — `altEducartable`

Plugin pour **Jeedom** permettant le suivi complet de la vie scolaire **Educartable / Edumoov** en école **Maternelle** (*TPS, PS, MS, GS*) et **Élémentaire** (*CP, CE1, CE2, CM1, CM2*) : **carnet de liaison & annonces d'école**, **signature électronique des mots**, **cahier de vie & activités de classe**, **cahier de textes & devoirs à faire** (avec case à cocher interactive), et **livrets scolaires (LSU) & attestations**.

> **Mention légale :** Ce plugin est un développement indépendant et n'est ni affilié, ni approuvé, ni soutenu par **Edumoov SAS** ou la plateforme **Educartable**. Les marques citées appartiennent à leurs propriétaires respectifs et ne sont mentionnées qu'à titre de référence nécessaire pour indiquer la destination et la compatibilité du logiciel (Art. L.713-6 du Code de la propriété intellectuelle).

---

## Fonctionnalités principales

- **Assistant de Connexion Parent & Découverte Multi-Enfants automatique :**
  - Connexion directe via votre compte parent **Educartable / Edumoov** (`app.educartable.com` / Keycloak OAuth2).
  - Support optionnel de la double authentification **2FA / TOTP**.
  - Découverte automatique de **tous les enfants rattachés au compte parent** (Maternelle et Élémentaire) et création/mise à jour automatique d'un équipement Jeedom par enfant.
  - Renouvellement automatique des jetons OAuth2 tournants (`refresh_token` / `access_token`) dans un profil local isolé (`0600`).
- **Carnet de liaison & Annonces d'école (`messages`) :**
  - Nombre de messages non lus (`unread_messages_count`), nombre de mots à signer (`messages_to_sign_count`), nombre total de messages (`messages_count`).
  - Titre, contenu nettoyé (sans balises HTML), auteur, date, catégorie (*Information*, *Événement*, *Important*, *Rendez-vous*, *Annonce école*) et état de signature du dernier message.
  - **Visualisation directe des pièces jointes (PDF, documents, images)** avec miniatures et visionneuse plein écran (Lightbox) intégrée au widget.
  - **Signature / Accusé de réception en 1 clic (`acknowledge_message`)** directement depuis le widget Dashboard ou par scénario Jeedom.
- **Cahier de vie & Photos de classe (`activities`) :**
  - Nombre total d'activités publiées (`activities_count`) et nombre d'activités non consultées (`activities_unread_count`).
  - Titre, description, enseignant(e) auteur, date et **nombre de photos jointes** (`last_activity_photos_count`) de la dernière activité de classe.
  - **Galerie de miniatures photos et visionneuse plein écran (Lightbox)** directement dans le widget Dashboard.
  - **Action « J'aime » (`like_activity`)** directement depuis le widget Dashboard.
- **Cahier de textes & Devoirs (`tasks` / `lessons`) :**
  - Nombre de devoirs à faire (`homework_todo_count`) et faits (`homework_done_count`) sur l'horizon configuré (par défaut 14 jours).
  - Compteur dédié aux **devoirs pour demain** : total (`homework_tomorrow_count`) et restant à faire (`homework_tomorrow_todo_count`).
  - Résumé du prochain devoir (`next_homework_summary`).
  - **Cochage / Décochage interactif des devoirs (`toggle_homework`)** depuis le widget Dashboard ou via scénario.
- **Livrets scolaires (LSU) & Attestations (`notebooks`) :**
  - Nombre de livrets publiés (`notebooks_count`), nombre de livrets en attente de signature (`notebooks_to_sign_count`) et résumé du dernier livret (`last_notebook_summary`).
- **Pause nocturne intelligente (22h00 – 06h30) :**
  - Suspend automatiquement les synchronisations périodiques la nuit pour ménager les serveurs Edumoov.
- **Widget Custom « Dark Glass » (9 thèmes de couleur) :**
  - Interface moderne à 4 onglets interactifs (*Carnet*, *Vie*, *Devoirs*, *Livrets*), compatible avec les 9 thèmes de la charte graphique `alt-erre` (*Bleu*, *Cyan*, *Vert Émeraude*, *Jaune Ambre*, *Orange*, *Rouge Rubis*, *Violet Améthyste*, *Noir Carbone*, *Blanc Nacre*).

---

## Prérequis & Dépendances

- **Jeedom** `>= 4.2`
- **Python 3** (`>= 3.9`) avec `python3-venv`
- Dépendances Python installées automatiquement dans un environnement virtuel isolé (`resources/venv`) sous licences permissives :
  - `requests` (Licence **Apache-2.0**)
  - `certifi` (Licence **MPL-2.0**)
  - *(Le worker dispose également d'un mode de repli natif `urllib.request` de la bibliothèque standard Python).*

---

## Guide de démarrage rapide

1. Installez et activez le plugin **Alt Vie Scolaire (Educartable)** dans Jeedom.
2. Lancez l'installation des dépendances si nécessaire.
3. Rendez-vous dans **Plugins → Organisation → Alt Vie Scolaire (Educartable)** puis cliquez sur **Assistant Connexion**.
4. Saisissez l'adresse e-mail et le mot de passe de votre compte parent **Educartable / Edumoov** puis cliquez sur **Se connecter & synchroniser les enfants**.
5. Le plugin crée automatiquement un équipement pour chacun de vos enfants et synchronise immédiatement leur carnet de liaison, leur cahier de vie, leurs devoirs et leurs livrets scolaires.

---

## Commandes créées par équipement

| Nom de la commande | Logical ID | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **Rafraîchir** | `refresh` | `action / other` | Force une synchronisation immédiate avec Educartable |
| **En ligne** | `online` | `info / binary` | État de la dernière synchronisation (`1` = OK, `0` = Erreur) |
| **Dernière synchronisation** | `last_sync` | `info / string` | Date et heure de la dernière mise à jour |
| **Nom de l'élève** | `student_name` | `info / string` | Prénom et nom de l'enfant |
| **Niveau** | `grade_name` | `info / string` | Niveau scolaire (ex. `Moyenne Section (MS)`, `CP`, `CM1`) |
| **Classe** | `class_name` | `info / string` | Nom de la classe |
| **Enseignant(e)** | `teacher_name` | `info / string` | Nom de l'enseignant(e) |
| **Notifications non lues** | `unread_notifications_count` | `info / numeric` | Nombre de notifications non lues sur le compte parent |
| **Messages carnet total** | `messages_count` | `info / numeric` | Nombre total de mots dans le carnet de liaison |
| **Messages carnet non lus** | `unread_messages_count` | `info / numeric` | Nombre de mots du carnet non encore signés / lus |
| **Messages carnet à signer** | `messages_to_sign_count` | `info / numeric` | Nombre de mots du carnet en attente de signature parentale |
| **Dernier message titre** | `last_message_title` | `info / string` | Titre du dernier mot du carnet de liaison |
| **Dernier message contenu** | `last_message_body` | `info / string` | Aperçu texte du dernier mot du carnet |
| **Dernier message auteur** | `last_message_author` | `info / string` | Auteur du dernier mot du carnet |
| **Dernier message date** | `last_message_date` | `info / string` | Date du dernier mot du carnet |
| **Dernier message catégorie** | `last_message_category` | `info / string` | Catégorie (*Information*, *Événement*, *Important*, *Annonce école*...) |
| **Dernier message signé** | `last_message_signed` | `info / binary` | `1` si le dernier mot est signé, `0` s'il reste à signer |
| **Signer / Marquer message lu** | `acknowledge_message` | `action / message` | Signe un message du carnet (`title` = ID du message ou vide pour le dernier message) |
| **Activités cahier de vie total** | `activities_count` | `info / numeric` | Nombre d'activités publiées dans le cahier de vie |
| **Activités cahier de vie non lues** | `activities_unread_count` | `info / numeric` | Nombre d'activités non encore consultées |
| **Dernière activité titre** | `last_activity_title` | `info / string` | Titre de la dernière activité du cahier de vie |
| **Dernière activité contenu** | `last_activity_body` | `info / string` | Texte de la dernière activité du cahier de vie |
| **Dernière activité auteur** | `last_activity_author` | `info / string` | Enseignant(e) auteur de la dernière activité |
| **Dernière activité date** | `last_activity_date` | `info / string` | Date de la dernière activité |
| **Dernière activité nombre de photos** | `last_activity_photos_count` | `info / numeric` | Nombre de photos illustrant la dernière activité |
| **Aimer une activité (Cahier de vie)** | `like_activity` | `action / message` | Ajoute un « J'aime » sur une activité (`title` = ID de l'activité ou vide pour la dernière) |
| **Devoirs à faire** | `homework_todo_count` | `info / numeric` | Nombre total de devoirs à faire à venir |
| **Devoirs faits** | `homework_done_count` | `info / numeric` | Nombre de devoirs cochés comme faits |
| **Devoirs pour demain (Total)** | `homework_tomorrow_count` | `info / numeric` | Nombre total de devoirs prévus pour le lendemain |
| **Devoirs pour demain (À faire)** | `homework_tomorrow_todo_count` | `info / numeric` | Nombre de devoirs restant à faire pour demain |
| **Prochain devoir** | `next_homework_summary` | `info / string` | Résumé du prochain devoir à faire |
| **Basculer état devoir** | `toggle_homework` | `action / message` | Coche/décoche un devoir (`title` = ID du devoir, `message` = `1` ou `0`) |
| **Livrets scolaires publiés** | `notebooks_count` | `info / numeric` | Nombre de livrets scolaires (LSU) et attestations publiés |
| **Livrets scolaires à signer** | `notebooks_to_sign_count` | `info / numeric` | Nombre de livrets scolaires en attente de signature |
| **Dernier livret scolaire** | `last_notebook_summary` | `info / string` | Résumé et statut du dernier livret scolaire |

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux bonnes pratiques de sécurité et au RGPD (les données scolaires d'enfants mineurs constituant des données personnelles sensibles) :

1. **Traitement 100 % local entre votre box Jeedom et les serveurs Edumoov / Educartable :**
   - Vos identifiants et les données scolaires de vos enfants transitent exclusivement en HTTPS/TLS entre votre installation Jeedom et les serveurs officiels d'Edumoov (`accounts.edumoov.com` et `www.edumoov.com`). Aucun serveur tiers n'est impliqué.
2. **Zéro secret en ligne de commande (`ps aux`) :**
   - Aucun mot de passe, code 2FA/TOTP ni jeton OAuth2 (`access_token` / `refresh_token`) n'est jamais passé en argument de ligne de commande lors de l'appel au worker Python. Toutes les données d'échange transitent par un fichier temporaire dans `jeedom::getTmpFolder('altEducartable')` créé avec les permissions `0600` et supprimé immédiatement après exécution (`@unlink`).
3. **Isolation et verrouillage des profils (`0600` & `.htaccess`) :**
   - Les profils de session (`data/profiles/eq_<id>.json`) sont stockés avec des permissions système strictes `0600` (lecture/écriture réservée à l'utilisateur système du serveur web) et protégés contre tout accès HTTP direct par des fichiers `.htaccess` (`Require all denied`).
   - La suppression d'un équipement dans Jeedom entraîne la suppression immédiate de son fichier de profil local (`preRemove()`).

---

## Licence & Support

- **Auteur :** Aurélien Léovant (`alt-erre`)
- **Licence :** Propriétaire - Tous droits réservés (avec réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Documentation & Support :** [https://github.com/alt-erre/jeedom-docs](https://github.com/alt-erre/jeedom-docs)
