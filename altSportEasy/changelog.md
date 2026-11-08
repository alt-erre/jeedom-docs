# Changelog - Alt Vie Sportive (SportEasy) (`altSportEasy`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la politique de versionnement sémantique ([SemVer](https://semver.org/lang/fr/)).

---

## [0.1.0-beta.2] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.1] - 2026-11-07

### Ajouté
- **Première version Beta (`0.1.0-beta.1`)** du plugin **Alt Vie Sportive (SportEasy)** (`altSportEasy`).
- **Connexion Hybride (Compte SportEasy Multi-Enfants + Calendrier iCal `.ics`)** :
  - Assistant de connexion au compte SportEasy (Parent, Joueur ou Coach) via l'API REST `v2.1` / `v2.2` avec découverte automatique du profil principal et de tous les profils enfants rattachés (`X-IMPERSONATED-ID`).
  - Extraction automatique du flux calendrier `.ics` par équipe en secours et support du mode autonome par URL `.ics` / `webcal://` sans identifiants.
  - Création automatique d'un équipement Jeedom par couple `Membre x Équipe` (ex. `SportEasy - Lucas (Foot U11)`).
- **Suivi complet du planning sportif familial** :
  - Séances et matchs du jour (`has_event_today`, `events_today_count`, `first_event_today_time`, `today_events_summary`) et du lendemain (`has_event_tomorrow`, `events_tomorrow_count`, `first_event_tomorrow_time`, `tomorrow_events_summary`).
  - Détection dédiée des annulations de dernière minute (`canceled_today_count`, `canceled_tomorrow_count`, `canceled_summary`).
  - Détails complets du prochain événement : titre, catégorie (`Entraînement`, `Match`, `Tournoi`), date, heure de début, **heure de rendez-vous (RDV)**, lieu/stade, adversaire et statut de présence.
- **Convocations interactives (`Présent` / `Absent`) & Discussions du coach** :
  - Réponse en 1 clic aux convocations (`respond_present_next`, `respond_absent_next`, `respond_attendance`) et compteur de convocations en attente (`pending_convocations_count`).
  - Suivi du dernier résultat et score (`last_result_title`, `last_result_score`, `last_result_outcome`, `last_result_date`).
  - Suivi des discussions d'équipe et messages du coach (`unread_messages_count`, `last_message_title`, `last_message_body`, `last_message_author`, `acknowledge_message`).
- **Widgets Dark Glass v1.4 & Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Widgets Dashboard (4 onglets : *Planning*, *Convocations*, *Scores*, *Coach*) et Mobile déclinés en 9 thèmes de couleur avec option `widgetCategoryHeader` et boutons d'en-tête arrondis (`26x26px`).
  - Implémentation du contrat Kiosk TV 10-Foot Niveau 2 (`getKioskWidgetData`) avec modale plein écran et boutons de convocation pilotables à la télécommande D-Pad.
- **Sécurité & Sobriété Jeedom Luna** :
  - Architecture 100 % Cron sans démon résident (`0 Mo` de RAM au repos), pause nocturne automatique (`22h00` - `06h30`), écriture atomique POSIX (`0600`) dans `data/profiles/` et zéro secret exposé dans `ps aux`.
