# Alt Téléphonie, MMS & Portail GSM — Plugin Jeedom (`altCellular`)

**Alt Téléphonie, MMS & Portail GSM** (`altCellular`) est un plugin Jeedom de téléphonie cellulaire 4G/GSM avancée conçu pour exploiter tout le potentiel du modem 4G interne de la **Jeedom Luna 4G** (module Quectel EC25 / EG25-G) ainsi que des modems 4G USB compatibles (Quectel, SIMCom, Huawei) :
- **Ouverture de portail et relais GSM par « Ping d'Appel » (reconnaissance CLIP sans décroché)** :
  - Pilote tout portail, barrière ou porte de garage équipé d'un récepteur GSM (ex. **RTU5024**, Somfy, Nice, Came, portail de copropriété) qui s'ouvre gratuitement par reconnaissance du numéro appelant (*Caller ID / CLIP*).
  - Surveille en temps réel l'état réseau de l'appel (`AT+CLCC`) : le démon attend que la sonnerie soit **effectivement active côté portail (`stat=3 Alerting`)** pendant la durée configurée (ex. `3,0 s`) ou que le relais GSM du portail rejette lui-même l'appel après reconnaissance CLIP (`Confirmé CLIP`), puis coupe immédiatement la ligne (**0 seconde facturée**, avec sécurité anti-facturation coupant en `< 100 ms` en cas de décroché inattendu).
- **Appels vocaux d'alerte avec synthèse vocale hors-ligne (TTS) & Serveur Vocal Interactif (DTMF)** :
  - Fait sonner votre smartphone en cas d'alerte critique (intrusion, incendie, fuite d'eau) afin de franchir les modes *« Ne pas déranger »*.
  - Génère localement et hors-ligne (sans dépendre d'Internet) un message vocal en français via **PicoTTS (`pico2wave`)** ou **eSpeak-NG**, et l'injecte directement dans l'appel dès que vous décrochez.
  - Décode en temps réel les touches pressées sur le clavier de votre téléphone (**DTMF `0–9`, `*`, `#`** via `AT+QTONEDET`) avec validation optionnelle d'un **Code PIN DTMF** pour acquitter une alarme ou ouvrir un accès à distance.
- **Envoi de MMS Photos (Captures de caméras)** :
  - Compresse et assainit automatiquement vos captures de caméras (`Pillow` $\le 250\text{ Ko}$) et les expédie par MMS via un double moteur : **encapsulation binaire OMA MMS (`M-Send.req`)** avec profils MMSC pré-configurés (**Orange / Sosh**, **Free Mobile**, **SFR / RED**, **Bouygues Telecom / B&You**) et **pile matérielle Quectel (`AT+QMMS*`)**.
- **Cohabitation transparente avec le plugin `SMS` officiel et `ModemManager` (Jeedom Luna 4G)** :
  - Détecte automatiquement les ports AT libres du modem Quectel (`/dev/ttyUSB2` / `/dev/ttyUSB3`).
  - Intègre l'envoi et la réception de **SMS sécurisés en mode PDU hexadécimal (`AT+CMGF=0`)**, avec une option dédiée permettant de **désactiver la partie SMS** pour laisser le plugin `SMS` officiel gérer vos SMS en parallèle sans aucun conflit.

---

## 1. Modélisation par Équipement (Option A : Portail GSM ou Contact 4G)

Chaque équipement créé dans le plugin adopte l'un des deux rôles métier suivants :

1. **Rôle `🚪 Portail / Relais GSM (Ping d'Appel CLIP)` (`eqRole = gate`)** :
   - Commandes d'action : `Ouvrir / Impulsion Appel` (`ping_gate`), `Couper l'appel` (`hangup`), `Rafraîchir` (`refresh`).
   - Commandes d'information : `Statut Portail` (`gate_status` : *Prêt*, *Appel du portail...*, *Sonnerie portail...*, *Ouvert (Confirmé CLIP)*, *Ouvert (Sonné X.Xs)*, *Échec réseau*), `Dernière impulsion` (`last_ping_ts`), `Durée dernière sonnerie` (`last_ring_duration`), `Ouvertures aujourd'hui` (`ping_count_today`), `Appel entrant du portail` (`incoming_call_event`), `Signal 4G/GSM` (`signal_rssi`), `Opérateur` (`network_operator`).
2. **Rôle `📱 Contact Téléphonie, MMS & SMS` (`eqRole = contact`)** :
   - Commandes d'action : `Appeler (Message Vocal TTS)` (`call_tts`), `Appeler (Sonnerie simple)` (`call_ring`), `Ping d'appel (1 sonnerie)` (`call_ping`), `Raccrocher` (`hangup`), `Envoyer MMS (Photo + Texte)` (`send_mms`), `Envoyer SMS sécurisé` (`send_sms`, affichée lorsque la gestion SMS est activée), `Rafraîchir` (`refresh`).
   - Commandes d'information : `État Appel` (`call_status`), `Dernière touche DTMF` (`last_dtmf`), `Code PIN DTMF validé` (`dtmf_code_valid`), `Statut dernier MMS` (`last_mms_status`), `Dernier SMS reçu` (`last_sms_received`), `Date dernier SMS` (`last_sms_ts`), `Date dernier appel` (`last_call_ts`), `Tentatives non autorisées bloquées` (`unauthorized_attempts`), `Signal 4G/GSM` (`signal_rssi`), `Opérateur` (`network_operator`).

---

## 2. Widgets Personnalisés « Dark Glass » & Compatibilité Kiosk TV (`altTvDashboard`)

- **Widgets Dashboard & Mobile « Dark Glass » (`alt-erre` v1.2)** :
  - Supportent les **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
  - Interface adaptative selon le rôle (*Portail GSM* avec grand bouton d'impulsion et compteurs temps réel, ou *Contact 4G* avec tiroirs rapides d'appel TTS, d'envoi MMS et de SMS).
- **Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Implémente nativement `getKioskWidgetData()` pour déclencher l'ouverture du portail GSM ou un appel d'alerte directement depuis un téléviseur piloté à la télécommande.

---

## 3. Confidentialité, Protection des Données & Mesures de Sécurité (Architecture Zero-Trust)

Conformément aux Conditions Générales d'Utilisation du Jeedom Market :
- **Impossibilité d'injection de commandes AT, Shell ou LFI (Zero-Trust)** :
  1. **Anti-Injection AT** : Tous les numéros de téléphone sont validés par l'expression régulière stricte E.164 `^\+?[0-9]{3,15}$`. Tous les SMS sont encodés et décodés exclusivement en **mode PDU binaire hexadécimal (`AT+CMGF=0`)**, rendant mathématiquement impossible toute injection de caractères de contrôle (`\r`, `\n`, `;`, `AT+`) via le contenu d'un message.
  2. **Anti-Injection Shell OS** : La synthèse vocale TTS (`pico2wave` / `espeak-ng`) et le ré-échantillonnage audio (`sox`) sont exécutés par le démon Python avec `shell=False` sous forme de tableaux d'arguments isolés, sans jamais invoquer `/bin/sh`.
  3. **Anti-Path Traversal / LFI sur les MMS** : Les fichiers images joints aux MMS sont vérifiés par `realpath()` contre une liste blanche stricte de répertoires de captures (`/tmp/jeedom/`, dossiers `snapshots`), contrôlés par leurs **Magic Bytes** binaires (`JPEG`, `PNG`, `GIF`) et intégralement ré-encodés via `Pillow` avant expédition.
  4. **Liste blanche (Allowlist) des numéros entrants & Quotas anti-hors-forfait** : Tout appel ou SMS entrant provenant d'un numéro non rattaché à un équipement autorisé est bloqué et journalisé. Un limiteur de débit glissant (`SlidingRateLimiter`) protège le forfait contre toute boucle de scénario.
- **Protection absolue des secrets (Zéro secret dans `ps aux` — Art. 4.3 CGU)** : Le code PIN de la carte SIM et la clé API interne Jeedom ne sont **jamais** passés en argument de ligne de commande (`ps aux`) ni affichés dans les logs. Ils sont encapsulés dans `/tmp/jeedom/altCellular/daemon_config.json` verrouillé par `@chmod(..., 0600)` et supprimé à l'arrêt du démon (`@unlink`).
- **Indépendance vis-à-vis des licences Copyleft GPL/AGPL (Art. 5.2 CGU)** : N'utilise ni `gammu` ni aucune bibliothèque GPL. Le démon repose à 100 % sur une implémentation native et des bibliothèques sous licences permissives (`pyserial` BSD-3-Clause, `Pillow` MIT-CMU, `requests` Apache-2.0, `certifi` MPL-2.0) isolées dans `resources/venv`.

---

## 4. Licence & Mentions Légales

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Licence** : Propriétaire — Tous droits réservés (réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Non-affiliation** : Ce plugin est une création originale et indépendante. Il n'est ni affilié, ni approuvé, ni édité par Jeedom SAS ou les constructeurs tiers mentionnés. Les marques citées appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement à titre de référence de compatibilité nécessaire (Art. L.713-6 CPI).
