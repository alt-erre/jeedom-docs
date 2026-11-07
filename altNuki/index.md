# Alt Serrure & Accès (Nuki) - Plugin Jeedom (`altNuki`)

**Alt Serrure & Accès (Nuki)** (`altNuki`) est un plugin Jeedom permettant de piloter et de superviser en **temps réel** et en **100 % Local LAN (Zéro Cloud)** l'intégralité de vos équipements **Nuki** :
- **Serrures connectées Nuki Smart Lock 1.0, 2.0, 3.0, 3.0 Pro, 4.0, 4.0 Pro et Smart Lock Ultra**
- **Claviers à code et biométriques Nuki Keypad 1.0 & Nuki Keypad 2.0 Fingerprint** (suivi intégré à la serrure + équipement Keypad dédié avec identification temps réel des utilisateurs, journal horodaté des passages, pavé numérique PIN interactif et alerte d'intrusion)
- **Interphones connectés Nuki Opener** (ouverture de gâche électrique, mode *Ring to Open (RTO)*, *Mode Continu* et détection de sonnerie en temps réel)
- **Capteurs d'ouverture magnétiques Nuki Door Sensor** (état d'ouverture de la porte et niveau de batterie)
- **Serrures motorisées intégrées Nuki Smart Door & Nuki Box**
- **Passerelles locales Nuki Bridge** (Hardware Bridge & Android Software Bridge)

---

## 1. Architecture Hybride 100 % Locale (Bridge HTTP + MQTT Local Natif)

Le démon Python asynchrone (`altNukid.py`) prend en charge simultanément ou individuellement les deux protocoles locaux officiels de l'écosystème Nuki :

1. **API HTTP Locale Nuki Bridge + Webhooks Temps Réel (`port 8080`)** :
   - Compatible avec les **Smart Lock 1.0, 2.0, 3.0, 4.0**, **Nuki Opener** et **Nuki Smart Door** rattachés à un Nuki Bridge.
   - **Authentification chiffrée `SHA-256` (`ts` UTC + `nonce` 16 bits + `token`)** : votre jeton local ne circule jamais en clair sur le réseau local, avec repli transparent pour les Bridges logiciels Android.
   - **Appairage en 1 clic (`/auth`)** : appuyez sur le bouton physique de votre Nuki Bridge puis cliquez sur *« Appairer en 1 clic (/auth) »* dans Jeedom pour récupérer et enregistrer automatiquement le jeton local.
   - **Serveur HTTP local de Webhooks dédié (`port 55100`)** : le démon enregistre automatiquement son URL `http://<IP_JEEDOM>:55100/nuki/webhook` auprès du Nuki Bridge (`/callback/add`) afin de recevoir chaque changement d'état en moins de `100 ms` sans être bloqué par une redirection HTTPS Apache/Nginx.

2. **Protocole MQTT Local Natif Nuki (`nuki/<id>/#`)** :
   - Compatible nativement (sans aucun Bridge matériel) avec les **Nuki Smart Lock 3.0 Pro, 4.0, 4.0 Pro et Smart Lock Ultra** connectées en Wi-Fi ou Thread/Matter à votre broker MQTT local (Mosquitto sur `127.0.0.1:1883` ou serveur MQTT du LAN).
   - Souscription temps réel à `nuki/#` (`state`, `doorsensorState`, `batteryChargeState`, `batteryCritical`, `batteryCharging`, `keypadBatteryCritical`, **`lockActionEvent`**) et publication instantanée des ordres sur `nuki/<id>/lockAction`.

### 1.1. Nuki Bridge vs MQTT Local : Lequel choisir ? Cohabitation & Autonomie des piles

Sur les **Nuki Smart Lock 3.0 Pro et 4.0 Pro**, **le Wi-Fi intégré et la passerelle externe Nuki Bridge ne peuvent pas cohabiter simultanément sur une même serrure** : lorsque vous activez le Wi-Fi intégré dans l'application mobile Nuki (nécessaire pour le MQTT sans Thread), la serrure coupe automatiquement sa liaison avec le Nuki Bridge (et inversement).

Voici le comparatif complet pour choisir le mode adapté à votre installation :

| Critère / Fonctionnalité | Mode **Nuki Bridge HTTP** (`port 8080`) | Mode **MQTT Local Natif** (`nuki/<id>/#`) |
| :--- | :---: | :---: |
| **Appareils compatibles** | Smart Lock 1.0, 2.0, 3.0, 3.0 Pro, 4.0, 4.0 Pro, **Nuki Opener**, Smart Door | Smart Lock **3.0 Pro, 4.0, 4.0 Pro, Ultra** (via Wi-Fi intégré ou Thread) |
| **Commandes locales** (`Verrouiller`, `Déverrouiller`, `Ouvrir le pêne`, `Lock 'n' Go`) | ✅ Oui | ✅ Oui |
| **États temps réel** (Serrure, Capteur de porte Door Sensor, Piles serrure & Keypad) | ✅ Oui (Webhooks `< 100 ms` + `/list`) | ✅ Oui (Push MQTT instantané) |
| **Identification de l'utilisateur du Nuki Keypad physique (`CodeId` / `AuthId` / Empreinte)** | ❌ **Non** *(non transmis par l'API du Bridge)* | ✅ **Oui** *(via `nuki/<id>/lockActionEvent`)* |
| **Pavé numérique virtuel à code PIN sur le Widget Jeedom** | ✅ Oui | ✅ Oui |
| **Impact du plugin Jeedom sur les piles (Serrure, Keypad, Door Sensor)** | **0 %** *(lecture du cache RAM `/list` du Bridge sur secteur 230 V, zéro appel `/lockState` en boucle)* | **0 % côté plugin** *(simple abonné passif MQTT ; noter que le maintien du Wi-Fi intégré par la serrure consomme un peu plus que le Bluetooth du Bridge, sauf en MQTT via Thread sur 4.0/Ultra)* |

> **En résumé : le Nuki Bridge a-t-il encore un intérêt si vous activez le MQTT sur votre Smart Lock Pro ?**
> - **Si vous souhaitez identifier en local qui déverrouille la porte sur le boîtier Nuki Keypad physique** (code à 6 chiffres ou empreinte digitale sur Keypad 2.0) : vous devez activer le **MQTT Local** sur votre Smart Lock Pro/Ultra. Pour cette serrure, **le Nuki Bridge n'a alors plus d'utilité** (vous pouvez même le débrancher s'il ne sert pas à un autre appareil comme un **Nuki Opener** d'interphone ou une ancienne Smart Lock non-Pro).
> - **Si vous privilégiez l'autonomie maximale de la batterie de la serrure** (liaison Bluetooth BLE basse consommation via le Nuki Bridge sur secteur, sans activer le Wi-Fi de la serrure) et n'avez pas besoin de savoir quel code physique du Keypad a ouvert la porte : conservez le **Nuki Bridge**.

---

## 2. Fonctionnement Détaillé des Claviers Nuki Keypad (1.0 & 2.0 Fingerprint) & Auto-Apprentissage

### 2.1. Pourquoi le code secret à 6 chiffres n'apparaît-il jamais en clair ? (Sécurité Nuki)

Lorsque vous tapez un code à 6 chiffres ou posez votre doigt sur le **boîtier physique Nuki Keypad fixé à votre porte** :
1. **Le code PIN à 6 chiffres ne sort jamais de la serrure en clair** (ni en Bluetooth, ni vers le Bridge, ni en MQTT) pour des raisons évidentes de sécurité.
2. C'est la serrure Nuki qui vérifie le code dans sa mémoire chiffrée, puis elle publie en **MQTT Local** sur le topic `nuki/<id>/lockActionEvent` une trame contenant uniquement **les identifiants numériques internes** du code ou de l'empreinte :
   ```text
   LockAction,Trigger,AuthId,CodeId,AutoUnlock
   Exemple : 1,172,54321,101,0
   ```
   - `LockAction = 1` : Déverrouillage (`2` = Verrouillage, `3` = Ouverture du pêne)
   - `Trigger = 172` : Action déclenchée par le Nuki Keypad
   - `AuthId = 54321` : Identifiant interne de l'autorisation dans la serrure
   - `CodeId = 101` : Numéro d'emplacement du code PIN ou de l'empreinte dans la serrure

### 2.2. Auto-Apprentissage automatique des utilisateurs du Keypad physique (Mode MQTT)

Vous n'avez **pas besoin de chercher ni de deviner** les numéros `CodeId` ou `AuthId` de vos membres de la famille :
1. Activez le **MQTT Local** sur votre serrure Nuki et dans la configuration du plugin.
2. **Tapez une première fois votre code (ou posez votre doigt)** sur votre Nuki Keypad physique pour ouvrir la porte.
3. Le plugin détecte automatiquement ce nouvel identifiant (`CodeId` / `AuthId`) et **crée tout seul la ligne correspondante** dans l'onglet **Clavier Nuki Keypad & Utilisateurs** de votre équipement avec le badge **`Auto-détecté - renommez-moi`** (ex. `Code Keypad #101` ou `Empreinte / Keypad #54321`).
4. Cliquez sur **Actualiser les codes auto-détectés** dans l'onglet **Clavier Nuki Keypad & Utilisateurs**, remplacez simplement le libellé par le prénom souhaité (ex. *Aurélien*, *Enfants*, *Nounou*) et cliquez sur **Enregistrer les utilisateurs Keypad**.
5. Dès lors, chaque ouverture par ce code ou cette empreinte affichera immédiatement le prénom sur le widget (**`Dernier accès : Aurélien`**), dans le journal des 15 derniers passages et dans la commande **`Dernier utilisateur Keypad`** (`last_keypad_user`) pour vos scénarios Jeedom !

### 2.3. Différence entre le Boîtier Nuki Keypad physique et le Pavé numérique virtuel du Widget Jeedom

Le plugin gère **deux types de claviers complémentaires** :
1. **Le boîtier physique Nuki Keypad (1.0 & 2.0 Fingerprint) fixé sur votre porte** :
   - Les codes à 6 chiffres et empreintes digitales sont enregistrés dans la serrure via l'application smartphone Nuki.
   - La remontée du nom de l'utilisateur à Jeedom s'effectue via les identifiants `CodeId` / `AuthId` en **MQTT Local**.
2. **Le pavé numérique virtuel intégré au Widget Jeedom (Dashboard / Mobile / Tablette murale Kiosk)** :
   - Accessible en cliquant sur le bouton **`Code PIN`** du widget Jeedom.
   - Il utilise la colonne **« Code PIN Local Jeedom (SHA-256) »** (et les dates de validité optionnelles *Valide du ... au ...*) de l'onglet **Clavier Nuki Keypad & Utilisateurs**.
   - Ce pavé virtuel est vérifié localement par Jeedom et **fonctionne aussi bien avec le Nuki Bridge qu'en MQTT Local** : il est idéal pour déverrouiller la porte depuis une tablette murale d'entrée et gère une alerte d'intrusion (`keypad_tamper_alert`) après $N$ codes erronés (3 par défaut).

---

## 3. Widget Personnalisé « Dark Glass » Adaptatif (`alt-erre`)

Chaque équipement bénéficie du widget signature **Dark Glass `alt-erre`** (avec **9 thèmes de couleur** : *Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*) qui adapte automatiquement son interface et sa vignette SVG dynamique :
- **Smart Lock / Smart Door** : cylindre Nuki animé (anneau LED Vert verrouillé, Ambre déverrouillé, Cyan pêne ouvert, Rouge moteur bloqué), état du capteur de porte (`🚪 Fermée` / `🚪 Ouverte`), boutons `Verrouiller`, `Déverrouiller`, `Ouvrir le pêne (Unlatch)` (avec confirmation anti-ouverture accidentelle), `Lock 'n' Go`, et tiroirs *Clavier PIN* & *Journal d'accès Keypad*.
- **Nuki Keypad (1.0 & 2.0 Fingerprint)** : vignette biométrique Cyan/Or, dernier utilisateur identifié, actions rapides sur la serrure associée, pavé numérique PIN et historique des passages.
- **Nuki Opener (Interphone)** : ouverture de gâche électrique, activation/désactivation *Ring to Open (RTO)* et *Mode Continu*, témoin de sonnerie d'interphone.
- **Passerelle Nuki Bridge** : état Wi-Fi, firmware, nombre de serrures appairées, réenregistrement du Webhook temps réel et redémarrage.

---

## 4. Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux Conditions Générales d'Utilisation du Jeedom Market :
- **Fonctionnement 100 % Local (Zéro Cloud)** : Toutes les communications s'effectuent exclusivement sur votre réseau local (entre Jeedom et votre Nuki Bridge en HTTP signé `SHA-256`, et/ou entre Jeedom et votre broker MQTT local pour les Smart Lock 3.0/4.0 Pro & Ultra). Aucune donnée d'état ni aucun code d'accès n'est transmis à un serveur externe.
- **Protection absolue des secrets (Zéro secret dans `ps aux`)** : Le Token API du Nuki Bridge, le mot de passe du broker MQTT local et la clé API interne Jeedom ne sont **jamais** passés en argument de ligne de commande (`ps aux`) ni affichés dans les journaux (`logs`). Ils sont transmis au démon Python via le fichier éphémère `/tmp/jeedom/altNuki/daemon_config.json` verrouillé avec les permissions strictes `0600` et supprimé automatiquement à l'arrêt du démon (`@unlink`).
- **Hachage cryptographique des codes PIN (`SHA-256`)** : Les codes PIN locaux configurés dans l'onglet *Clavier Nuki Keypad & Utilisateurs* sont immédiatement hachés en `SHA-256` avant sauvegarde (`pin_hash`) et ne sont jamais stockés en clair.
- **Isolation technique** : Le plugin n'écrit aucun fichier en dehors de son répertoire, de `/tmp/jeedom/altNuki` et de ses propres journaux Jeedom, et utilise uniquement un environnement virtuel Python isolé (`resources/venv`) composé de bibliothèques sous licences permissives compatibles (`aiohttp`, `requests`, `paho-mqtt`, `certifi`).

---

## 5. Licence & Mentions Légales

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Licence** : Propriétaire - Tous droits réservés (réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Non-affiliation** : Ce plugin est une création originale et indépendante. Il n'est ni affilié, ni approuvé, ni édité par Jeedom SAS ou Nuki Home Solutions GmbH. Les marques citées appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement à titre de référence de compatibilité nécessaire (Art. L.713-6 CPI).
