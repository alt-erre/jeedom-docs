# Plugin Jeedom - Alt Print 3D (Bambu Lab) (`altBambuLab`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés  
**Catégorie :** Objets connectés / Impression 3D Locale  

---

## Présentation

Le plugin **Alt Bambu Lab** (`altBambuLab`) permet de superviser et de piloter en **100 % local** (sans dépendance au cloud Bambu Lab) les imprimantes 3D **Bambu Lab** et tout particulièrement la **Bambu Lab P1S** ainsi que son système multi-filaments **AMS** (*Automatic Material System* à 4 bobines), mais également les séries **P1P**, **X1 Carbon (X1C)**, **X1E**, **A1** et **A1 Mini**.

Dans la continuité des plugins `altSiemens`, `altCambridgeAudio`, `altJvcProjector`, `altSamsungTv` et `altAirMedia`, il repose sur un démon Python asynchrone léger (`resources/altBambuLabd.py`) qui maintient une connexion directe et chiffrée avec votre imprimante sur votre réseau local :
- **Broker MQTT sur TLS (`port 8883`)** : suivi temps réel des deltas JSON (`device/<SERIAL>/report`) et envoi instantané des commandes (`device/<SERIAL>/request`) avec gestion anti-flood adaptée au processeur ESP32 de la **P1S**.
- **Décodeur natif du flux Caméra de chambre P1S (`port 6000` TLS)** : capture d'images **Snapshot JPEG** directement depuis le flux binaire TLS de la P1S (sans `ffmpeg` ni conteneur Docker tiers), exploitable dans le widget Dashboard, dans vos scénarios/notifications Jeedom (Telegram, Discord, Mail) et dans le plugin officiel *Caméra*.
- **Client FTPS implicite (`port 990` TLS)** : extraction automatique de la **vignette 3D (`.png`)** et des **métadonnées de tranchage (`Metadata/slice_info.config`)** du fichier `.3mf` en cours d'impression (poids en `g`, longueur en `m`, coût estimé en `€`, hauteur de couche, liste des objets du plateau) ainsi que l'exploration et le lancement direct des modèles `.3mf` stockés sur la carte MicroSD de la P1S.
- **Découverte automatique SSDP (`ports UDP 2021 / 1990`)** : détection en un clic des imprimantes Bambu Lab présentes sur le réseau local.

---

## Fonctionnalités dédiées à la Bambu Lab P1S & son AMS (4 bobines)

1. **Suivi d'impression, Métadonnées `.3mf` & Statistiques Cumulatives** :
   - Statut global traduit (`Prêt`, `Préparation`, `En cours`, `En pause`, `Terminé`, `Erreur`, `Hors-ligne`) et code brut (`IDLE`, `PREPARE`, `RUNNING`, `PAUSE`, `FINISH`, `FAILED`).
   - Étape détaillée en cours (`stg_cur` : *Impression en cours*, *Préchauffage du plateau*, *Nivellement auto du plateau (ABL)*, *Calibration des vibrations XY*, *Nettoyage de la buse*, *Changement de filament (AMS)*, *Pause : Fin de filament détectée*...).
   - Progression en `%`, Temps restant formaté (`Xh Ym`) et en minutes, Heure de fin estimée (`ETA` `HH:MM`).
   - Couche actuelle / Nombre total de couches (`layer_num` / `total_layer_num`), hauteur de couche (`job_layer_height` en `mm`) et nom du fichier `.3mf` (`job_name`).
   - **Métadonnées `.3mf` de l'impression en cours** : Poids de filament requis (`job_weight_g` en `g`), Longueur (`job_length_m` en `m`) et **Coût estimé (`job_cost_eur` en `€`)** calculé selon le prix au kg configurable sur l'équipement.
   - **Compteurs cumulatifs persistants** : Nombre d'impressions terminées (`total_prints_count`), Filament total consommé (`total_filament_g` en `g`), Heures d'impression cumulées (`total_print_hours` en `h`), Coût cumulé (`total_cost_eur` en `€`) et commande de remise à zéro (`reset_stats`).
   - Signal Wi-Fi (`dBm`) et **dictionnaire de traduction en français des codes d'erreur HMS** (`has_error`, `hms_code`, `hms_message` : blocage AMS, fin de filament, coupe-filament coincé, erreur thermique buse/plateau, ventilateur heatbreak, capot avant détaché, carte SD...).

2. **Températures, 4 Ventilateurs P1S & Buse installée** :
   - **Buse (`Nozzle`)** : Température actuelle (`°C`), Consigne (`°C`), commande curseur (`0` à `300 °C`), diamètre (`nozzle_diameter` : `0.2`, `0.4`, `0.6`, `0.8 mm`), matériau (`nozzle_type` : *Acier trempé* / *Acier inoxydable*) et sélecteur de déclaration matérielle (`set_nozzle_hardware`).
   - **Plateau chauffant (`Bed`)** : Température actuelle (`°C`), Consigne (`°C`) et commande curseur (`0` à `110 °C`).
   - **4 Ventilateurs de la P1S (`0` à `100 %`)** :
     - *Ventilateur de refroidissement de pièce (`part_fan_speed` / `part_fan_set`)*
     - *Ventilateur auxiliaire latéral P1S (`aux_fan_speed` / `aux_fan_set`)*
     - *Ventilateur d'extraction / filtre à charbon de chambre P1S (`chamber_fan_speed` / `chamber_fan_set`)*
     - *Ventilateur de refroidissement du corps de chauffe (`heatbreak_fan_speed`)*

3. **Unité AMS (4 Bobines : Slots A1 à A4) & Bobine Externe (`vt_tray`)** :
   - **Bobine active (`ams_active_slot` / `ams_active_label`)** et **État mécanique de l'AMS (`ams_status_label`)** (*Au repos*, *Chargement filament*, *Déchargement filament*, *Coupe du filament*, *Purge / Changement*, *Lecture RFID*).
   - **Détail des 4 emplacements (`Slot 1` à `Slot 4`) et du porte-bobine externe (`vt_tray`)** :
     - Matériau (`PLA`, `PLA-CF`, `PETG`, `ABS`, `ASA`, `TPU`, `PA-CF`, `PVA`, `PC`... ou `Vide`)
     - Couleur réelle au format hexadécimal (`#RRGGBB`) reproduite sur le visuel des bobines du widget
     - Niveau restant estimé en `%` (sur bobines RFID Bambu Lab)
   - **Configuration directe des bobines tierces sans RFID (`ams_set_filament`) & Chargement de slot (`ams_load_slot`)** : cliquez sur un slot `A1` à `A4` dans le widget pour définir son matériau et sa couleur `#RRGGBB` ou ordonner le chargement du slot dans l'extrudeur.
   - **Climat interne de l'AMS** : Indice d'humidité (`1` à `5` + état textuel) et température interne de l'AMS (`°C`).

4. **Pilotage, Ignorer un objet (*Skip Objects*), Maintenance & Lanceur MicroSD `.3mf`** :
   - **Contrôle d'impression** : *Pause*, *Reprendre (`Resume`)*, *Arrêter l'impression (`Stop`)* (avec confirmation de sécurité sur le widget).
   - **Exclusion d'un objet décollé en cours d'impression (`skip_object` / `Skip Objects`)** : sur un plateau multi-pièces, sélectionnez et ignorez uniquement la pièce en défaut sans perdre le reste du plateau.
   - **Profil de vitesse (`speed_select`)** : *Silencieux (`50 %`)*, *Standard (`100 %`)*, *Sport (`124 %`)*, *Ludicrous (`166 %`)*.
   - **Éclairage LED de chambre (`chamber_light`) & Timelapse vidéo (`timelapse_enabled` / `timelapse_toggle`)** : activation/désactivation directe depuis l'en-tête du widget ou par scénario.
   - **Tiroir Maintenance, Jogging manuel & MicroSD `.3mf`** :
     - Déplacements manuels sécurisés (bloqués pendant l'impression) : *Mise à l'origine (`G28`)*, *Plateau `Z +10 mm` / `Z +50 mm` / `Z -10 mm`*, *Tête à l'avant pour nettoyage*, *Extruder `+10 mm`*, *Rétracter `-10 mm`*, *Charger (`M701`)* et *Décharger (`M702`)* le filament.
     - **Explorateur & Lanceur FTPS MicroSD `.3mf` (`start_sd_print`)** : listez les fichiers `.3mf` présents sur la carte MicroSD de la P1S et lancez une impression directement depuis le widget Jeedom.
     - Suivi de l'état de la **Carte MicroSD (`sdcard_status`)** et des versions de **Firmware Imprimante (`firmware_version`) & AMS (`ams_firmware_version`)**.

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
  - Le démon écoute uniquement en local sur `127.0.0.1` (port `55101` par défaut) et vérifie la clé API interne Jeedom.
  - Attribuez un bail DHCP statique (IP fixe) à votre imprimante Bambu Lab sur votre routeur local et n'exposez jamais ses ports `8883`, `6000` ou `990` sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) - Création originale et indépendante (non affiliée à Jeedom SAS ni à Bambu Lab / Shenzhen Tuozhu Technology Co., Ltd.).
- **Licence** : Propriétaire - Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
