# Plugin Jeedom — Alt Contrôle Parental (iPhone & iPad) (`altIos`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Appareils Mobiles & Contrôle Parental  

---

## Présentation

Le plugin **Alt Contrôle Parental (iPhone & iPad)** (`altIos`) permet d'intégrer, de superviser et de piloter le **Temps d'Écran** et le **Contrôle Parental** directement dans **Jeedom** pour l'ensemble de la gamme d'appareils **Apple** :
- **iPhone** *(Standard, Plus, Pro, Pro Max & SE)*
- **iPad & iPad mini**
- **iPad Air & iPad Pro**
- **Mac** *(MacBook Air, MacBook Pro, iMac & Mac mini)*

Conçu selon une **architecture Hybride 100 % Autonome (Apple $\leftrightarrow$ Jeedom, sans aucun service tiers)** en **3 canaux complémentaires**, le plugin remonte en temps réel le **temps d'écran passé aujourd'hui**, le **temps restant**, l'**application ou le jeu ouvert en direct (avec son icône officielle haute résolution Apple App Store)**, le **niveau de batterie (`%`)** et l'**état de charge**, et vous permet d'**agir instantanément depuis Jeedom ou vos scénarios** (ajout de temps bonus `+15 / +30 / +60 min`, mode illimité pour la journée, verrouillage immédiat de l'écran `0 min`, heure du coucher, sonnerie à distance *iCloud Find My* même en mode silencieux, cache de déplacement hors-ligne scellé **`SHA-256`** et **Bouclier Anti-Sabotage** protégeant l'application *Raccourcis*).

---

## Fonctionnalités Clés

1. **Suivi du Temps d'Écran & des Quotas Journaliers** :
   - `Temps d'écran aujourd'hui` (en minutes et formaté `1h 30m`) et `Temps restant aujourd'hui` (en minutes et formaté).
   - `Limite quotidienne active` (en minutes ou `Illimité`) et `Temps bonus accordé aujourd'hui`.
   - Statut synthétique temps réel : *Temps disponible*, *En cours : [Application]*, *Bientôt écoulé ($\le 15\text{ min}$)*, *Temps écoulé (Verrouillage écran / Alerte seule)*, *Heure du coucher*, *Appareil verrouillé (0 min)*, *Bloqué (Alerte sécurité SHA-256)*, *Temps libre (Illimité)*.

2. **Pilotage Instantané, Temps Bonus & Actions Parentales (Scénarios & Dashboard)** :
   - **Boutons de temps bonus** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)` et **`Mode illimité aujourd'hui`**.
   - **Verrouillage immédiat** : commande `Verrouiller aujourd'hui (0 min)` qui passe la limite du jour à `0 min` et déclenche le verrouillage automatique de l'écran (`Lock Screen`) à chaque tentative d'ouverture d'application (tout en laissant *PRONOTE* et *Educartable* accessibles pour les devoirs !).
   - **Curseur de quota journalier** : commande `Définir limite quotidienne (min)` de `0` à `360 min` par pas de 15 minutes.
   - **Action en fin du temps imparti** : commandes `Activer verrouillage écran auto (Fin de temps)` (`Lock Screen` natif iOS) et `Désactiver verrouillage écran auto (Alerte seule)`.
   - **Heure du coucher** : commandes `Définir heure du coucher (HH:MM)` (ex. `21:00`), `Désactiver heure du coucher` et info numérique `Heure du coucher (HHMM)` (`2100`) pour vos scénarios Jeedom.
   - **Sonnerie à distance (`Faire sonner l'appareil — iCloud Find My`)** : fait sonner l'iPhone ou l'iPad à distance **même s'il est en mode Silencieux / Vibreur** (idéal pour signaler la fin du temps d'écran ou appeler un enfant à table).
   - **Bouclier Anti-Sabotage & Mode Maintenance Parent (`5 min`)** : empêche l'enfant d'ouvrir l'application *Raccourcis* ou *Fichiers* tant que le parent n'a pas activé `Déverrouiller Maintenance Parent (5 min)` dans Jeedom.

3. **Suivi des Applications & Jeux Ouverts (Icônes Officielles App Store)** :
   - Remontée en temps réel (`< 1 s`) de l'**application ou du jeu ouvert** (*TikTok, YouTube, Instagram, Snapchat, Roblox, Brawl Stars, Clash Royale, Minecraft, Fortnite, Netflix, Disney+, Twitch, Discord, Safari…*), résolution automatique de son **icône officielle haute résolution sur l'Apple App Store** (via l'API publique *Apple iTunes Search*) et comptabilisation du temps passé par titre.
   - Vue synthétique des **appareils de la famille Apple** avec leur niveau de batterie (`%`), leur état de charge et leur présence.

4. **Widget Personnalisé « Dark Glass » (`alt-erre`) Dashboard, Mobile & Kiosk TV (`altTvDashboard`)** :
   - Architecture unifiée **Dark Glass** supportant **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
   - Vignette `58×58 px` affichant dynamiquement l'**icône officielle App Store de l'application active** (ou le badge du modèle *IPHONE*, *IPAD*, *IPAD AIR*, *IPAD PRO*, *IPAD MINI*, *MAC*), jauge de progression colorée, retours visuels tactiles (`.is-triggered`, `.is-refreshing`, `.is-confirmed` avec protection anti-double-clic) et **4 onglets interactifs** (*Contrôles*, *Apps*, *Appareils*, *Sécurité / PIN*).
   - **Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** native via `getKioskWidgetData()`.

5. **Synergie native avec `Alt Vie Scolaire (Pronote)` (`altPronote`) & `Alt Vie Scolaire (Educartable)` (`altEducartable`)** :
   - Associez `altPronote` / `altEducartable` et `altIos` dans un scénario Jeedom pour verrouiller automatiquement les applications de divertissement et jeux sur l'iPhone/iPad tant que les devoirs ne sont pas faits (les applications *PRONOTE* et *Educartable* restant toujours autorisées sur l'appareil !).

---

## Architecture Hybride 100 % Autonome en 3 Canaux (Apple $\leftrightarrow$ Jeedom)

Contrairement aux consoles de jeux, Apple chiffre son système interne *Screen Time* de bout en bout sans API Web directe. Le plugin **Alt Contrôle Parental (iPhone & iPad)** combine **3 canaux natifs 100 % autonomes** (sans dépendre d'aucun service tiers) :

### 📱 Canal 1 — Le Pont « Raccourcis iOS / iPadOS » (*Apple Shortcuts Bridge*) & Sceau `SHA-256`
- **Suivi temps réel & Verrouillage d'écran natif (`Lock Screen`)** :
  - Utilise l'application officielle **Raccourcis (*Shortcuts*)** préinstallée sur tous les iPhone et iPad (avec une automatisation silencieuse *« Quand l'app est ouverte »* $\to$ *« Exécuter immédiatement sans notifier »*).
  - À chaque ouverture d'application, l'iPhone/iPad interroge en `< 50 ms` le Webhook local ou externe de votre box Jeedom (`jeeIos.php`).
  - Si le quota journalier est épuisé, si l'appareil est verrouillé (`0 min`) ou si l'heure du coucher est atteinte, Jeedom répond `"lock_screen": true` et le Raccourci exécute immédiatement l'action native iOS **`Verrouiller l'écran`**.
- **Parade Anti-Mode Avion & Bouclier Anti-Sabotage (`Raccourcis` / `Fichiers`)** :
  - Le Raccourci désactive automatiquement le Mode Avion et réactive le Wi-Fi avant d'interroger Jeedom.
  - En incluant l'application **`Raccourcis`** et **`Fichiers`** dans la liste des applications déclenchant l'automatisation, toute tentative de l'enfant d'ouvrir *Raccourcis* (en ligne comme hors-ligne) verrouille instantanément l'écran en `< 0,1 s` tant que le parent n'a pas cliqué sur **`Déverrouiller Maintenance Parent (5 min)`** dans Jeedom !
- **Mode Déplacement Hors-Ligne (Voiture / Train / iPad Wi-Fi seul) scellé par empreinte `SHA-256`** :
  - En mode normal (Wi-Fi maison ou 4G/5G), **aucun fichier local n'est requis** : seul le compteur du serveur Jeedom fait foi.
  - Pour les déplacements hors réseau (ex. iPad Wi-Fi en voiture), Jeedom génère un paquet de quota signé par une empreinte cryptographique **`SHA-256`** ($\text{SHA-256}(\text{Clé secrète} \mid \text{Date} \mid \text{Limite} \mid \text{Temps joué})$).
  - En voyage sans connexion, le Raccourci iOS vérifie et recalcule cette empreinte via la brique native d'Apple **`Générer le hachage (SHA-256)`**. Si l'enfant modifie un seul chiffre dans le fichier JSON local, la signature `SHA-256` devient invalide : le Raccourci verrouille immédiatement l'iPad et remonte une **`Alerte falsification SHA-256`** à Jeedom dès le retour du Wi-Fi !

### ☁️ Canal 2 — Le Cloud Apple iCloud (`Localiser / Find My` & Partage Familial)
- **Découverte automatique en 1 clic** de tous les **iPhone, iPad (Normal / Air / Pro / mini) et Mac** associés à votre compte Apple (validation 2FA unique à 6 chiffres dans l'Assistant Jeedom).
- **Télémétrie matérielle continue** : remontée du **niveau de batterie (`%`)**, de l'**état de charge** (*En charge ⚡*, *Sur batterie*, *Batterie pleine*) et de la **présence**.
- **Action parentale `Faire sonner l'appareil` (*Play Sound*)** : fait sonner l'iPhone ou l'iPad à distance même s'il est en mode Silencieux.

### 🏠 Canal 3 — La Détection 100 % Locale LAN Apple (`TCP 62078 lockdownd` / AirPlay)
- **Scanner Réseau Local sans Internet** : détecte sur votre Wi-Fi local les iPhone, iPad et Mac via le port système exclusif Apple **`TCP 62078` (`lockdownd` / synchronisation Wi-Fi iOS)** et `TCP 7000` (AirPlay / Mac), assurant le suivi de présence au domicile même en cas de coupure Internet.

### 📊 Tableau récapitulatif des 3 Canaux

| Fonctionnalité | Canal 1 (Pont Raccourcis iOS + `SHA-256`) | Canal 2 (Cloud Apple iCloud) | Canal 3 (Local LAN `62078`) |
| :--- | :---: | :---: | :---: |
| **Découverte auto des iPhone / iPad / Mac** | Auto-création 1 clic | ✅ Oui (Cloud Apple) | ✅ Oui (Scan LAN Wi-Fi) |
| **Niveau de batterie (`%`) & État de charge** | ✅ Oui (lors des Webhooks) | ✅ Oui (En continu) | — |
| **Application / Jeu ouvert en direct + Icône App Store** | ✅ Oui (Temps réel `< 1 s`) | — | — |
| **Verrouillage immédiat de l'écran (`Lock Screen`)** | ✅ Oui (Action native iOS) | ✅ Mode Perdu iCloud | — |
| **Fonctionnement en voiture sans réseau (iPad Wi-Fi)** | ✅ Oui (Cache scellé `SHA-256`) | — | — |
| **Faire sonner l'iPhone/iPad (même en silencieux)** | ✅ Alerte vocale Siri | ✅ Oui (*Find My Sound*) | — |
| **Présence domicile 100 % locale sans Internet** | ✅ Webhook LAN local | ❌ Cloud requis | ✅ Oui (`TCP 62078`) |

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 3.5, 4.3 et 4.8) :

- **Protection absolue des secrets et jetons (Art. 4.3 — Zéro secret dans `ps aux` ni dans les logs)** :
  - Les jetons Webhook dédiés par équipement (`webhook_token`), les clés secrètes de hachage `SHA-256` (`offline_salt`) et les sessions iCloud sont stockés exclusivement en local sur votre box Jeedom dans `data/profiles/` avec des permissions système strictes **`chmod 0600`** et un fichier **`.htaccess` (`Require all denied`)** interdisant tout accès HTTP direct.
  - Le Webhook Raccourcis iOS (`core/php/jeeIos.php`) utilise un jeton aléatoire isolé propre à chaque équipement (et jamais la clé API globale de Jeedom).
  - Les échanges entre le moteur PHP Jeedom et le worker Python isolé (`resources/venv`) passent exclusivement par un fichier JSON temporaire dans `jeedom::getTmpFolder('altIos')` verrouillé en `0600` et supprimé immédiatement après exécution (`@unlink`). Aucun mot de passe, jeton, code PIN ou clé API n'apparaît jamais dans la liste des processus (`ps aux`) ni dans les logs Jeedom.
  - Toutes les données et fichiers de profils sont intégralement supprimés lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Pause nocturne intelligente (23h00 – 06h00)** :
  - Le plugin suspend les interrogations Cloud iCloud automatiques la nuit (23h00 – 06h00) pour préserver la batterie des appareils et respecter les serveurs Apple, tout en laissant les Webhooks temps réel Raccourcis iOS et les scénarios actifs à tout moment.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Apple Inc.).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
