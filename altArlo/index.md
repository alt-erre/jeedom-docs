# Alt Caméras & Sécurité (Arlo) (`altArlo`)

Plugin pour **Jeedom v4** permettant l'intégration complète, la supervision en temps réel (SSE) et le pilotage de l'écosystème de sécurité connectée **Arlo** : stations de base **SmartHub**, caméras sans fil et sur secteur (**Arlo Pro**, **Pro 2**, **Pro 3**, **Pro 4**, **Pro 5S 2K**, **Ultra / Ultra 2 4K**, **Essential**), projecteurs **Arlo Pro 3 Floodlight**, sonnettes vidéo (**Arlo Video Doorbell**) et **Arlo Baby**.

> **Mention légale sur les marques :** *Arlo, Arlo Pro, Arlo Ultra, Arlo Essential et SmartHub sont des marques déposées d'Arlo Technologies, Inc., citées uniquement à titre de référence nécessaire pour indiquer la destination et la compatibilité matérielle de ce plugin indépendant.*

---

## 1. Fonctionnalités Principales

- **Auto-découverte complète du parc Arlo** :
  - **Stations de base & SmartHubs** (`VMB3000`, `VMB4000`, `VMB4500`, `VMB4540`, `VMB5000`) ;
  - **Caméras toutes générations** (`VMC3030` Wire-Free, `VMC4030P` Pro 2, `VMC4041PB` Pro 4, `VMC4060B` Pro 5S 2K, `VMC5040` Ultra / Ultra 2 4K, gamme Essential) ;
  - **Caméras à projecteur haute puissance** (`FB1001B` Arlo Pro 3 Floodlight) ;
  - **Sonnettes vidéo** (`AVD1001`, `AVD2001B` Essential Video Doorbell Wire-Free) ;
  - **Caméras intérieures & Babyphone** (`ABC1000` Arlo Baby avec capteurs environnementaux).
- **Support natif des Modes Standards, Plannings et Modes Personnalisés (*Custom Modes*)** :
  - Récupération automatique depuis `/hmsweb/users/automation/definitions` des modes **Armé** (`mode1`), **Désarmé** (`mode0`), **Planning** (`schedule.1`) ainsi que de **tous les modes personnalisés créés dans l'application Arlo** (ex. *« Activé à domicile »* `mode2`, *« Nuit »*, *« Extérieur seul »*) ;
  - Création dynamique d'une commande action dédiée par mode personnalisé sur l'équipement SmartHub et affichage automatique dans le widget **Dark Glass**.
- **Flux d'événements Temps Réel SSE (`/hmsweb/client/subscribe`) sans drainage de batterie** :
  - Remontée instantanée des détections de **mouvement** (`motionDetected`), d'**audio** (`audioDetected`), d'**appui sur la sonnette** (`buttonPressed`) et des changements de mode ;
  - Lecture non intrusive de l'état des caméras depuis le cache du SmartHub (`notify` `cameras` / `doorbells` / `modes`) pour préserver l'autonomie des batteries.
- **Distinction intelligente de l'alimentation (`chargerTech` vs `chargingState`)** :
  - Identification précise du type d'alimentation branché sur chaque caméra : **🔌 Secteur** (`Regular` / `QuickCharger`), **☀️ Panneau Solaire** (`SolarCharger`) ou **🔋 Batterie seule** (`None`), y compris lorsque la batterie est à 100 % et que le BMS a coupé le cycle de charge (`chargingState = Off`).
- **Pilotage des Projecteurs (Spotlight / Floodlight), Sirènes & Confidentialité** :
  - Allumage, extinction et réglage d'intensité (`0–100 %`) du projecteur **Floodlight** (`FB1001B`) et du **Spotlight LED** intégré (`VMC5040`, `VMC4041PB`, `VMC4060B`) ;
  - Déclenchement et arrêt de la **sirène** (SmartHub ou caméra équipée) ;
  - Activation / Désactivation à distance de chaque caméra (*Privacy Mode*).
- **Vignettes Snapshots Sécurisées & Widgets « Dark Glass » (`alt-erre`)** :
  - Téléchargement automatique du dernier snapshot Cloud dans un répertoire local isolé (`data/snapshots/`, permissions `0600`) et diffusion via un proxy PHP interne signé par HMAC (`core/php/snapshot.php`) ;
  - Bouton **📸 Photo** sur le widget permettant de demander un nouvel instantané à la caméra ;
  - 9 thèmes de couleur sélectionnables par équipement (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).

---

## 2. Authentification Cloud Arlo (2FA) & Recommandation Compte Invité

Arlo impose la double authentification (2FA) et n'autorise qu'**un seul flux temps réel (SSE) actif simultanément par compte utilisateur**.

### Bonne pratique recommandée : Créer un compte invité dédié à Jeedom
1. Dans votre application mobile Arlo principale, ouvrez **Paramètres $\rightarrow$ Autoriser l'accès $\rightarrow$ Ajouter**.
2. Invitez une adresse e-mail dédiée à votre domotique Jeedom en lui accordant les droits d'administration sur vos caméras et votre station.
3. Utilisez ce compte dédié dans la configuration du plugin `altArlo` : ainsi, votre application mobile Arlo et votre box Jeedom disposent chacune de leur propre session permanente sans jamais se déconnecter mutuellement.

### Deux méthodes de connexion initiale dans la configuration du plugin
- **Méthode 1 — Connexion interactive 2FA** : Saisissez l'adresse e-mail et le mot de passe du compte Arlo, choisissez le canal de réception (*E-mail* ou *SMS*), cliquez sur **1. Demander un code 2FA**, puis saisissez le code à 6 chiffres reçu et cliquez sur **2. Valider le code 2FA**.
- **Méthode 2 — Import rapide de session / Commande cURL (`my.arlo.com`)** : Depuis un navigateur connecté à `https://my.arlo.com`, ouvrez l'onglet *Réseau (F12)*, faites un clic droit sur une requête `devices` $\rightarrow$ *Copier en tant que cURL* (ou copiez l'en-tête `Authorization`) et collez-le dans la zone dédiée.

### Reconnexion Automatique 2FA 100 % autonome (Module 4G / SMS Jeedom & E-mail IMAP SSL)
Les jetons Cloud Arlo ayant une durée de vie limitée côté serveur (~10 à 14 jours), le plugin intègre un moteur d'**Auto-Reconnexion 2FA** capable de renouveler tout seul la session dès qu'un jeton expire (`error: 2015` ou déconnexion SSE `action: logout`) :
1. **Via le Module 4G / SMS de la box Jeedom (`SMS`)** : si le numéro de téléphone de votre carte SIM 4G Jeedom est enregistré comme facteur 2FA SMS sur le compte Arlo dédié, le démon demande un SMS à Arlo et lit automatiquement le code à 6 chiffres reçu par votre équipement SMS/4G Jeedom (auto-détecté ou sélectionné via `#[Objet][Modem 4G][Message]#`).
2. **Via E-mail IMAP SSL (`EMAIL`)** : le démon se connecte en IMAP SSL (`port 993`) à la boîte mail du compte Arlo pour extraire le code à 6 chiffres envoyé par `do_not_reply@arlo.com`.
3. **Modes hybrides avec bascule automatique** (*SMS 4G en priorité puis E-mail IMAP en secours* ou inversement) et bouton **Tester le renouvellement automatique maintenant** directement dans la page de configuration.

---

## 3. Commandes par Type d'Équipement

### A. Station de Base / SmartHub (`basestation` — ex. `VMB5000`)
| Nom de la commande | Identifiant logique (`logicalId`) | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **État station** | `state` | `info / string` | État de provisioning (`provisioned`, etc.) |
| **ID Mode actif** | `active_mode` | `info / string` | Identifiant interne du mode actif (`mode0`, `mode1`, `mode2`, `schedule.1`…) |
| **Mode actif** | `active_mode_label` | `info / string` | Libellé humain du mode actif (*Désarmé*, *Armé*, *Activé à domicile*…) |
| **État sirène** | `siren_state` | `info / binary` | `1` si la sirène est active, `0` sinon |
| **Mode : Désarmé** | `mode_mode0` | `action / other` | Désarme la station (`mode0`) |
| **Mode : Armé** | `mode_mode1` | `action / other` | Arme la station (`mode1`) |
| **Mode : \<Nom Custom\>** | `mode_mode2`, `mode_mode3`… | `action / other` | Créée automatiquement pour chaque mode personnalisé configuré dans Arlo |
| **Planning : \<Nom\>** | `mode_schedule.1`… | `action / other` | Active le planning hebdomadaire Arlo |
| **Sirène ON / OFF** | `siren_on` / `siren_off` | `action / other` | Déclenche ou arrête la sirène |
| **Rafraîchir** | `refresh` | `action / other` | Interroge l'état temps réel de la station et de ses caméras |

### B. Caméras, Floodlights & Sonnettes (`camera`, `doorbell`)
| Nom de la commande | Identifiant logique (`logicalId`) | Type / Sous-type | Description |
| :--- | :--- | :--- | :--- |
| **Disponibilité** | `connection_state` | `info / string` | `available`, `batteryCritical` ou `offline` |
| **Activité** | `activity_state` | `info / string` | `idle`, `alertStreamActive`, `userStreamActive`, `fullFrameSnapshot` |
| **Batterie** | `battery` | `info / numeric (%)` | Niveau de batterie (`0–100 %`) synchronisé avec la page Batteries de Jeedom |
| **Alimentation** | `charger_type` | `info / string` | `Secteur` (`Regular`), `Solaire` (`SolarCharger`) ou `Batterie` (`None`) |
| **En charge** | `charging` | `info / binary` | `1` lorsque la batterie absorbe activement un courant de charge |
| **Signal RF** | `signal_strength` | `info / numeric (/4)` | Qualité de liaison radio avec le SmartHub (`0` à `4`) |
| **Mouvement** | `motion_detected` | `info / binary` | Alerte de détection de mouvement temps réel |
| **Audio / Bruit** | `audio_detected` | `info / binary` | Alerte de détection sonore temps réel |
| **Caméra active** | `camera_active` | `info / binary` | `1` si la caméra est active, `0` si elle est en mode confidentialité |
| **Activer / Désactiver caméra** | `camera_on` / `camera_off` | `action / other` | Active ou coupe la caméra (`privacyActive`) |
| **Prendre un instantané** | `take_snapshot` | `action / other` | Demande un nouveau snapshot et met à jour la vignette locale |
| **Projecteur / Floodlight** *(si équipé)* | `light_state`, `light_brightness`, `light_on`, `light_off`, `set_light_brightness` | `info` & `action` | Pilotage ON/OFF et intensité (`0–100 %`) du Spotlight ou Floodlight |
| **Sirène** *(si équipée)* | `siren_state`, `siren_on`, `siren_off` | `info` & `action` | Pilotage de la sirène intégrée à la caméra |
| **Sonnette** *(Doorbell)* | `button_pressed`, `silent_mode`, `silent_on`, `silent_off` | `info` & `action` | Événement d'appui bouton et gestion du mode silence |

---

## 4. Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux bonnes pratiques de sécurité Jeedom et au RGPD :
- **Stockage strictement local des secrets (`0600` & `.htaccess`)** : Le jeton de session Arlo est conservé exclusivement sur votre box Jeedom dans `plugins/altArlo/data/profiles/session.json` avec des permissions restreintes (`0600`) et un fichier `.htaccess` interdisant tout accès HTTP direct (`Require all denied`). Le mot de passe utilisé lors de l'étape 2FA initiale n'est jamais stocké sur disque.
- **Zéro secret en ligne de commande (`ps aux`)** : La clé API interne Jeedom (`apikey`) et les paramètres du démon sont transmis via le fichier temporaire `/tmp/jeedom/altArlo/daemon_config.json` verrouillé en `0600` et supprimé dès l'arrêt du démon.
- **Proxy d'image signé par HMAC** : Les vignettes snapshots téléchargées dans `data/snapshots/` (`0600`) ne sont jamais exposées publiquement ; elles sont servies au Dashboard Jeedom via `core/php/snapshot.php` après vérification d'une signature cryptographique HMAC-SHA256.
- **Aucune télémétrie tierce** : Le plugin communique exclusivement entre votre installation Jeedom et les serveurs officiels d'Arlo (`ocapi-app.arlo.com` et `myapi.arlo.com`) en HTTPS (TLS 1.2/1.3).
