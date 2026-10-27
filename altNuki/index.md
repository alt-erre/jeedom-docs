# Alt Serrure & Accès (Nuki) — Plugin Jeedom (`altNuki`)

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

---

## 2. Prise en Charge Avancée des Claviers Nuki Keypad (1.0 & 2.0 Fingerprint)

Le plugin propose un **double niveau d'exploitation** de vos **Nuki Keypad** :

1. **Suivi Keypad directement intégré à chaque serrure / Opener** :
   - Surveillance de l'état de la batterie du Keypad (`keypad_battery_critical`).
   - Décodage instantané du topic local `nuki/<id>/lockActionEvent` (`LockAction,Trigger,AuthId,CodeId,AutoUnlock`) permettant d'identifier immédiatement quel membre du foyer ou invité a déverrouillé la porte (par **code à 6 chiffres** ou par **empreinte digitale sur le Keypad 2.0**) ou si la porte a été verrouillée via la **touche retour (`←`)** du Keypad.
   - Commandes dédiées pour vos scénarios Jeedom : `last_keypad_user` (*Dernier utilisateur Keypad*), `last_keypad_code_id`, `last_keypad_auth_id`, `last_keypad_action`, `last_keypad_ts` et `keypad_access_count`.
2. **Équipement Jeedom « Nuki Keypad » dédié (`nuki_keypad_<id>`)** :
   - Créé automatiquement lors de la synchronisation (ou en 1 clic depuis la fiche d'une serrure).
   - Dispose de son propre **Widget Dark Glass Nuki Keypad** comprenant :
     - Un **pavé numérique interactif (`0–9`, `⌫`, `✓`)** permettant de composer un code PIN local depuis le Dashboard ou la vue Mobile.
     - Un **journal déroulant temps réel des 15 derniers passages** (avec icône empreinte `🫆` / code `⌨️`, prénom de l'utilisateur, action et horodatage).
     - Une **protection anti-intrusion (`keypad_failed_attempts` & `keypad_tamper_alert`)** déclenchant une alerte binaire après $N$ tentatives de code PIN erronées (configurable, `3` par défaut).
3. **Gestionnaire visuel des Utilisateurs, Codes PIN & Empreintes Keypad** :
   - Dans l'onglet **Clavier Nuki Keypad & Utilisateurs** de chaque équipement, associez chaque `CodeId` / `AuthId` matériel à un prénom (ex. *Aurélien*, *Enfants*, *Femme de ménage*, *Invité Airbnb*) et définissez optionnellement un code PIN local (haché en `SHA-256`) ainsi qu'une plage de validité horaire/calendrier (`Valide du ... au ...`).

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
- **Licence** : Propriétaire — Tous droits réservés (réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Non-affiliation** : Ce plugin est une création originale et indépendante. Il n'est ni affilié, ni approuvé, ni édité par Jeedom SAS ou Nuki Home Solutions GmbH. Les marques citées appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement à titre de référence de compatibilité nécessaire (Art. L.713-6 CPI).
