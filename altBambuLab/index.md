# Plugin Jeedom — Alt Print 3D (Bambu Lab) (`altBambuLab`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Objets connectés / Impression 3D Locale  

---

## Présentation

Le plugin **Alt Bambu Lab** (`altBambuLab`) permet de superviser et de piloter en **100 % local** (sans dépendance au cloud Bambu Lab) les imprimantes 3D **Bambu Lab** et tout particulièrement la **Bambu Lab P1S** ainsi que son système multi-filaments **AMS** (*Automatic Material System* à 4 bobines), mais également les séries **P1P**, **X1 Carbon (X1C)**, **X1E**, **A1** et **A1 Mini**.

Dans la continuité des plugins `altSiemens`, `altCambridgeAudio`, `altJvcProjector`, `altSamsungTv` et `altAirMedia`, il repose sur un démon Python asynchrone léger (`resources/altBambuLabd.py`) qui maintient une connexion directe et chiffrée avec votre imprimante sur votre réseau local :
- **Broker MQTT sur TLS (`port 8883`)** : suivi temps réel des deltas JSON (`device/<SERIAL>/report`) et envoi instantané des commandes (`device/<SERIAL>/request`) avec gestion anti-flood adaptée au processeur ESP32 de la **P1S**.
- **Décodeur natif du flux Caméra de chambre P1S (`port 6000` TLS)** : capture d'images **Snapshot JPEG** directement depuis le flux binaire TLS de la P1S (sans `ffmpeg` ni conteneur Docker tiers), exploitable dans le widget Dashboard, dans vos scénarios/notifications Jeedom (Telegram, Discord, Mail) et dans le plugin officiel *Caméra*.
- **Client FTPS implicite (`port 990` TLS)** : extraction automatique de la **vignette 3D (`.png`)** du fichier `.3mf` en cours d'impression pour l'afficher dans la carte d'état du widget.
- **Découverte automatique SSDP (`ports UDP 2021 / 1990`)** : détection en un clic des imprimantes Bambu Lab présentes sur le réseau local.

---

## Fonctionnalités dédiées à la Bambu Lab P1S & son AMS (4 bobines)

1. **Suivi d'impression & État Temps Réel** :
   - Statut global traduit (`Prêt`, `Préparation`, `En cours`, `En pause`, `Terminé`, `Erreur`, `Hors-ligne`) et code brut (`IDLE`, `PREPARE`, `RUNNING`, `PAUSE`, `FINISH`, `FAILED`).
   - Étape détaillée en cours (`stg_cur` : *Impression en cours*, *Préchauffage du plateau*, *Nivellement auto du plateau (ABL)*, *Calibration des vibrations XY*, *Nettoyage de la buse*, *Changement de filament (AMS)*, *Pause : Fin de filament détectée*...).
   - Progression en `%`, Temps restant formaté (`Xh Ym`) et en minutes, Heure de fin estimée (`ETA` `HH:MM`).
   - Couche actuelle / Nombre total de couches (`layer_num` / `total_layer_num`) et nom du fichier `.3mf` (`job_name`).
   - Signal Wi-Fi (`dBm`) et remontée des alertes de diagnostic **HMS** (`has_error`, `hms_message`).

2. **Températures & Enceinte fermée P1S (3 Ventilateurs indépendants)** :
   - **Buse (`Nozzle`)** : Température actuelle (`°C`), Consigne (`°C`) et commande curseur (`0` à `300 °C`).
   - **Plateau chauffant (`Bed`)** : Température actuelle (`°C`), Consigne (`°C`) et commande curseur (`0` à `110 °C`).
   - **3 Ventilateurs de la P1S (`0` à `100 %`)** :
     - *Ventilateur de refroidissement de pièce (`part_fan_speed` / `part_fan_set`)*
     - *Ventilateur auxiliaire latéral P1S (`aux_fan_speed` / `aux_fan_set`)*
     - *Ventilateur d'extraction / filtre à charbon de chambre P1S (`chamber_fan_speed` / `chamber_fan_set`)*

3. **Unité AMS (1 AMS — 4 Bobines : Slots A1 à A4)** :
   - **Bobine active (`ams_active_slot` / `ams_active_label`)** : indique en temps réel quel slot (`1` à `4` ou *Bobine externe*) est chargé dans l'extrudeur.
   - **Détail des 4 emplacements (`Slot 1` à `Slot 4`)** :
     - Matériau (`PLA`, `PLA-CF`, `PETG`, `ABS`, `ASA`, `TPU`, `PA-CF`, `PVA`... ou `Vide`)
     - Couleur réelle au format hexadécimal (`#RRGGBB`) reproduite sur le visuel des bobines du widget
     - Niveau restant estimé en `%` (sur bobines RFID Bambu Lab)
   - **Climat interne de l'AMS** : Indice d'humidité (`1` à `5` + état textuel) et température interne de l'AMS (`°C`).

4. **Pilotage & Actions** :
   - **Contrôle d'impression** : *Pause*, *Reprendre (`Resume`)*, *Arrêter l'impression (`Stop`)* (avec confirmation de sécurité sur le widget).
   - **Profil de vitesse (`speed_select`)** : *Silencieux (`50 %`)*, *Standard (`100 %`)*, *Sport (`124 %`)*, *Ludicrous (`166 %`)*.
   - **Éclairage LED de chambre (`chamber_light`)** : *Allumer*, *Éteindre*, *Basculer*.
   - **Maintenance & Préchauffage rapide** : *Mise à l'origine des axes (`Homing G28`)*, *Décharger le filament (`Unload`)*, sélecteur de préchauffage rapide (*PLA*, *PETG*, *ABS/ASA*, *TPU*, *Refroidir*).

5. **Gestion du Snapshot Caméra P1S (`port 6000` TLS)** :
   - **Tiroir Caméra `16:9` intégré au Widget** : un clic sur l'icône `📷` de l'en-tête (ou sur la vignette) déplie l'aperçu photo en direct de l'intérieur de la P1S.
   - **Exploitation dans vos Scénarios & Notifications Jeedom** : la commande action **`Capturer Snapshot Caméra`** enregistre l'image JPEG et met à jour la commande info **`Dernier Snapshot (Chemin fichier)`** (`/tmp/jeedom/altBambuLab/snapshot_<id>.jpg`), prête à être jointe dans une notification **Telegram, Discord, Mail ou Jeedom Connect / JeeMate** en fin d'impression ou en cas d'alerte HMS.
   - **Compatibilité avec le plugin officiel « Caméra » de Jeedom** : la fiche de l'équipement fournit une URL locale authentifiée par clé API que vous pouvez coller directement dans le plugin *Caméra*.

---

## Configuration sur la Bambu Lab P1S

1. Sur l'écran de votre **Bambu Lab P1S**, ouvrez **Paramètres (icône écrou) $\rightarrow$ WLAN / Réseau** :
   - Notez l'**Adresse IP** locale (configurez de préférence un bail DHCP fixe sur votre routeur).
   - Notez le **Code d'accès (`Access Code`)** à 8 caractères ainsi que le **Numéro de série**.
2. Dans Jeedom (*Plugins $\rightarrow$ Objets connectés $\rightarrow$ Alt Bambu Lab*), cliquez sur **Scanner le réseau (SSDP)** (ou sur **Ajouter**), puis renseignez le **Code d'accès LAN** à 8 caractères et sauvegardez.
3. **Note sur les firmwares Bambu Lab récents (2025+) :**
   - La supervision complète en temps réel (état MQTT, AMS, caméra port `6000`, vignettes FTPS port `990`) fonctionne même lorsque l'imprimante reste connectée au Cloud Bambu Handy.
   - Pour autoriser les commandes d'écriture locales (Pause/Stop, LED, ventilateurs, consignes thermiques) sur les firmwares dotés du contrôle d'autorisation, activez le **Mode LAN Only (+ Mode Développeur)** dans les paramètres réseau de l'imprimante.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Pilotage 100 % local chiffré** : Toutes les communications entre Jeedom et votre imprimante Bambu Lab P1S s'effectuent exclusivement sur votre réseau local via **TLS** (**MQTT sur TLS** port `8883`, **Caméra sur TLS** port `6000`, **FTPS implicite** port `990`). Aucune donnée, image ou télémétrie n'est envoyée vers un serveur externe ou vers le Cloud Bambu Lab par le plugin.
- **Protection stricte du Code d'accès LAN (`Access Code`) et de la clé API** :
  - Le `LAN Access Code` à 8 caractères ainsi que la clé API interne du plugin ne sont **jamais** passés en clair dans les arguments de ligne de commande (`ps aux`) ni affichés dans les journaux de logs.
  - Ils sont transmis au démon Python `altBambuLabd.py` exclusivement via un fichier temporaire dans `jeedom::getTmpFolder('altBambuLab')` verrouillé par des permissions strictes (`chmod 0600`) et supprimé immédiatement après lecture ainsi qu'à l'arrêt du démon (`@unlink`).
- **Protection des captures Caméra et Vignettes (`data/snapshots`)** :
  - Le répertoire `data/snapshots` est protégé contre tout accès HTTP direct non authentifié par un fichier `.htaccess` (`Require all denied`). L'affichage dans l'interface passe par le contrôleur sécurisé `core/php/snapshot.php` qui vérifie systématiquement la session utilisateur Jeedom ou la clé API.
  - Toutes les captures et données associées sont supprimées lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Mesures de sécurité réseau** :
  - Le démon écoute uniquement en local sur `127.0.0.1` (port `55093` par défaut) et vérifie la clé API interne Jeedom.
  - Attribuez un bail DHCP statique (IP fixe) à votre imprimante Bambu Lab sur votre routeur local et n'exposez jamais ses ports `8883`, `6000` ou `990` sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Bambu Lab / Shenzhen Tuozhu Technology Co., Ltd.).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
