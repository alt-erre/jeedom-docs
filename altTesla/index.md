# Alt Électromobilité & Charge (Tesla) - Plugin Jeedom (`altTesla`)

**Alt Électromobilité & Charge (Tesla)** (`altTesla`) est un plugin Jeedom de **supervision et de pilotage 100 % Local Bluetooth Low Energy (Zéro Cloud, Zéro Internet, Zéro abonnement Fleet API)** dédié aux véhicules électriques compatibles Tesla stationnés à portée radio de votre box domotique (garage, carport, allée).

Il communique directement de votre contrôleur Bluetooth Linux (`hci0` / `hciX`) vers le véhicule via le **Tesla Vehicle Command Protocol over BLE** chiffré de bout en bout (clé virtuelle locale **ECDSA NIST P-256 `prime256v1`** autorisée une seule fois avec votre carte clé NFC sur la console centrale) et vous permet de :
- **Détecter automatiquement l'arrivée et le départ du véhicule au garage** par écoute passive non-intrusive des balises Bluetooth Low Energy (`S<sha1(VIN)[:16]>C`), avec mesure du signal radio RSSI (`dBm`), sans jamais réveiller l'ordinateur de bord.
- **Lire l'état de sécurité et des ouvrants sans réveiller la voiture (`VCSEC` Sleep-Safe)** : verrouillage, état d'endormissement (`online` / `asleep`), portes avant/arrière, coffre arrière, coffre avant (*Frunk*), trappe de charge et présence de la carte/clé utilisateur.
- **Piloter localement la recharge électrique et le surplus solaire (`5 A` à `32 A`)** : démarrage/arrêt de la charge, réglage fin de l'intensité en ampères (`charge_amps_set` de `5 A` à `32 A` au pas de `1 A`), modification de la limite de batterie (`charge_limit_set` de `50 %` à `100 %`), ouverture et déverrouillage du câble de la trappe de charge, suivi temps réel du SoC (`%`), de l'autonomie (`km`), de la puissance (`kW`), de la tension (`V`), du courant (`A`), de l'énergie ajoutée (`kWh`) et du temps restant (`min`).
- **Piloter la climatisation, les ouvrants et la sécurité en local** : pré-conditionnement de l'habitacle (`climate_on` / `climate_off`), consigne de température (`15 °C` à `28 °C`), mode **Sentinelle** (`sentry_on` / `sentry_off`), verrouillage/déverrouillage, ouverture des coffres, aération/fermeture des vitres, appel de phares et klaxon.
- **Protéger la batterie contre toute consommation fantôme (*Vampire Drain*)** grâce au moteur **Smart Sleep Guard** qui sépare strictement les requêtes basses consommations (`VCSEC`) des lectures complètes (`Infotainment`) et interdit toute interrogation de l'ordinateur principal lorsqu'une phase d'endormissement est en cours.

---

## 1. Véhicules & Matériels Compatibles

### 1.1. Modèles de véhicules compatibles (Protocole BLE local)
- **Tesla Model 3** : toutes années (2018+, y compris *Highland*).
- **Tesla Model Y** : toutes années (y compris *Juniper*).
- **Tesla Model S & Model X** : millésimes **2021 et ultérieurs** (*Palladium* dotés de la clé sur téléphone Bluetooth Low Energy).
- **Tesla Cybertruck** : toutes années.

> **Important :** Les anciennes **Model S et Model X produites avant 2021** (*Legacy* MCU1/MCU2 dépourvues du contrôleur Bluetooth BLE `VCSEC` et de la fonction *Clé sur téléphone*) ne prennent pas en charge le protocole local Tesla BLE.

### 1.2. Contrôleur Bluetooth sur la box Jeedom (Cas particulier de la Jeedom Luna)
La portée utile du Bluetooth Low Energy entre la box Jeedom et la voiture est typiquement de **5 à 12 mètres** (idéal lorsque la box Jeedom est installée dans le garage ou une pièce attenante) :
- **Jeedom Luna** : la carte mère de la Jeedom Luna commerciale ne comporte **pas** de puce Bluetooth interne soudée (`hci0` absent d'origine). Il suffit de brancher sur son port USB 2.0 libre un **dongle USB Bluetooth 4.0 BLE Plug-and-Play sous Linux ARM (`BlueZ`)** :
  - **Modèles recommandés (reconnus immédiatement sans pilote externe)** : **ASUS USB-BT400** (chipset Broadcom `BCM20702`) ou **TP-Link UB400** (chipset Qualcomm/CSR `CSR8510`).
  - **À éviter sur box ARM** : les clés génériques Bluetooth 5.1 / 5.3 à puce Realtek (`RTL8761B`) qui nécessitent souvent un firmware propriétaire absent des noyaux ARM embarqués.
  - **Astuce radio** : si le véhicule est stationné à plus de 6-8 mètres ou séparé par un mur porteur, utilisez une courte **rallonge USB 2.0 de 30 à 50 cm** pour éloigner le dongle du châssis de la box et de son port Zigbee interne (`2,4 GHz`).
- **Jeedom Atlas, Raspberry Pi 3B+ / 4 / 5, Mini-PC Debian 11/12** : contrôleur Bluetooth intégré (`hci0`) ou dongle USB BLE dédié (`hci0` / `hci1`).

---

## 2. Installation & Appairage Local Hors-Ligne (Carte NFC)

Aucun compte Tesla Cloud, identifiant, mot de passe ou clé développeur n'est requis :

1. **Installation des dépendances (`Configuration -> Dépendances`)** :
   - Installe automatiquement la pile Linux `BlueZ`, le paquet `golang-go` de compilation locale, un environnement virtuel Python isolé (`resources/venv` avec `bleak`, `cryptography`, `requests`, `certifi`) et compile localement l'utilitaire officiel open-source `tesla-control` (`teslamotors/vehicle-command`, licence Apache-2.0) dans `resources/bin/tesla-control` avec les capacités noyau `cap_net_admin,cap_net_raw=eip`.
   - Exécuté en priorité basse (`nice -n 19` / `ionice -c 3`) pour préserver la réactivité de la Jeedom Luna.
2. **Création du véhicule & Détection BLE au garage** :
   - Créez un équipement dans `Plugins -> Énergie -> Alt Électromobilité & Charge (Tesla)` et renseignez les **17 caractères du VIN** de votre véhicule (visible en bas du pare-brise côté conducteur ou dans l'onglet *Logiciel* de l'écran central).
   - Le plugin calcule automatiquement le nom radio BLE du véhicule (`S<sha1(VIN)[:16]>C`). Cliquez sur **`Scanner les Tesla BLE à portée`** pour vérifier la réception radio dans le garage (`RSSI`).
3. **Assistant d'appairage local en 4 étapes (onglet Équipement)** :
   - **Étape 1** : Cliquez sur **`Générer la paire de clés locale`** (crée une clé privée ECDSA `prime256v1` stockée uniquement sur votre box en permissions `0600`).
   - **Étape 2** : Munissez-vous de votre **carte clé NFC officielle Tesla** et assurez-vous que moins de 20 clés sont enregistrées dans le menu *Verrouillage* du véhicule.
   - **Étape 3** : Cliquez sur **`Envoyer la demande d'appairage BLE`**, puis **posez votre carte clé NFC sur la console centrale** (ou le montant conducteur selon modèle) et validez la notification d'ajout de clé affichée sur l'écran tactile de la voiture.
   - **Étape 4** : Cliquez sur **`Vérifier l'enrôlement sur le véhicule`** pour confirmer que la clé publique Jeedom est reconnue par le domaine `VCSEC`.

---

## 3. Architecture « Smart Sleep Guard » (Zéro Vampire Drain)

Une Tesla possède deux domaines électroniques distincts accessibles en Bluetooth Low Energy :

| Domaine BLE | Consommation véhicule | Informations & Actions disponibles | Stratégie `altTesla` |
| :--- | :---: | :--- | :--- |
| **1. `VCSEC` (*Vehicle Security Controller*)** | **Quasi nulle** (ne réveille **pas** l'ordinateur principal) | Présence garage (`present`), signal `RSSI`, état veille/éveil (`sleep_state`), verrouillage (`locked`), portes, coffres, trappe de charge, présence utilisateur | Interrogé périodiquement (`120 s` par défaut) + écoute BLE passive (`30 s`) en toute innocuité, même la nuit. |
| **2. `Infotainment` (*Car Computer*)** | **Élevée si réveillé** (~`150-250 W` tant qu'éveillé) | Niveau batterie `%`, autonomie `km`, puissance `kW`, tension `V`, ampères `A`, consigne et limite de charge, températures int./ext., Sentinelle, odomètre, commandes de charge et de climatisation | Interrogé **uniquement** lorsque le véhicule est **déjà éveillé** ou **en cours de charge**, et suspendu automatiquement après la fenêtre *Sleep Guard* (`15 min` par défaut) pour laisser le véhicule s'endormir. |

> **Réveil à la demande :** Lorsqu'un scénario Jeedom (ex. démarrage du surplus solaire ou préchauffage matinal) ou l'utilisateur exécute une commande `charge_start`, `charge_amps_set`, `climate_on` ou `wake`, le démon réveille automatiquement le domaine `Infotainment` via BLE avant d'exécuter l'ordre chiffré.

---

## 4. Commandes Disponibles

### 4.1. Commandes d'Information (`31` commandes `info`)
- **Présence & Veille (`VCSEC`)** : `present` (*Présente au garage*, binaire), `rssi` (`dBm`), `sleep_state` (`online`, `asleep`, `offline`), `awake` (binaire), `user_present` (*Utilisateur à bord*), `last_seen`, `last_full_sync`.
- **Sécurité & Ouvrants (`VCSEC` + `Infotainment`)** : `locked` (*Verrouillée*), `doors_open`, `df_open`, `dr_open`, `pf_open`, `pr_open`, `trunk_open` (*Coffre arrière*), `frunk_open` (*Frunk*), `charge_port_open` (*Trappe de charge*), `sentry_mode` (*Mode Sentinelle*).
- **Batterie & Charge (`Infotainment`)** : `battery_level` (`%`, historisé par défaut), `usable_battery_level` (`%`), `range_km` (`km`, historisé par défaut), `charging_state` (`Disconnected`, `Stopped`, `Starting`, `Charging`, `Complete`), `plugged_in` (*Câble branché*), `charge_limit_soc` (`%`), `charge_amps_request` (`A` consignés), `charge_amps` (`A` réels), `charge_voltage` (`V`), `charger_power_kw` (`kW`, historisé par défaut), `charge_energy_added` (`kWh`), `time_to_full_min` (`min`).
- **Climat & Véhicule (`Infotainment`)** : `climate_on`, `inside_temp` (`°C`), `outside_temp` (`°C`), `climate_setpoint` (`°C`), `preconditioning`, `defrost_mode`, `shift_state` (`P`, `D`, `R`, `N`), `speed_kmh` (`km/h`), `odometer_km` (`km`), `software_version`.

### 4.2. Commandes d'Action (`23` commandes `action`)
- **Rafraîchissement & Éveil** : `refresh` (*Rafraîchir VCSEC sans réveiller*), `wake` (*Réveiller & Lire batterie*).
- **Charge & Énergie** : `charge_start`, `charge_stop`, `charge_amps_set` (curseur `5` à `32 A`), `charge_limit_set` (curseur `50` à `100 %`), `charge_port_open_cmd`, `charge_port_close_cmd`, `charge_port_unlock`.
- **Climatisation** : `climate_on`, `climate_off`, `climate_temp_set` (curseur `15` à `28 °C`).
- **Sécurité & Accès** : `lock`, `unlock`, `sentry_on`, `sentry_off`, `trunk_toggle`, `frunk_open_cmd`, `windows_vent`, `windows_close`, `flash_lights`, `honk_horn`.

---

## 5. Exemple de Scénario Local : Régulation de Charge sur Surplus Solaire (`5-32 A`)

Déclencheur : changement de votre mesure locale de surplus photovoltaïque (ex. pince ampèremétrique locale ou TIC Linky local), programmé toutes les 2 à 3 minutes en journée :

1. **`SI`** `#[Garage][Ma Tesla][Présente au garage]# == 1` **`ET`** `#[Garage][Ma Tesla][Câble branché]# == 1` **`ET`** `#[Garage][Ma Tesla][Batterie]# < #[Garage][Ma Tesla][Limite de charge]#` :
   - Calculer l'intensité disponible : `floor(#surplus_watts# / 230)` (en monophasé `230 V`).
   - **`SI`** intensité $\ge 5\,\text{A}$ :
     - Si `#[Garage][Ma Tesla][État de charge]# != "Charging"`, exécuter `#[Garage][Ma Tesla][Démarrer la charge]#`.
     - Exécuter `#[Garage][Ma Tesla][Régler intensité de charge]#` avec `min(32, max(5, floor(#surplus_watts# / 230)))`.
   - **`SINON`** (surplus insuffisant pendant plus de 5 min) :
     - Exécuter `#[Garage][Ma Tesla][Arrêter la charge]#`.

Toute la boucle (compteur d'énergie local $\rightarrow$ Jeedom $\rightarrow$ Bluetooth BLE $\rightarrow$ chargeur embarqué de la voiture) fonctionne **même en cas de coupure totale de fibre/Internet ou d'indisponibilité des serveurs Tesla**.

---

## 6. Widgets « Dark Glass » `v1.4` & Compatibilité Kiosk TV (`altTvDashboard`)

- **Widgets Dashboard & Mobile « Dark Glass » (`alt-erre` v1.4)** :
  - Supportent les **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*) ainsi que l'option globale **`widgetCategoryHeader`** colorant la barre de titre selon la catégorie Jeedom (*Énergie*).
  - **3 onglets intégrés** (*Charge & Énergie*, *Climatisation*, *Accès & Sécurité*) avec jauge visuelle SoC vs Limite, curseurs `5-32 A` / `50-100 %` / `15-28 °C` et boutons de barre de titre circulaires `26x26 px` (*Rafraîchir VCSEC sans réveil* et *Réveiller véhicule*).
- **Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Implémente nativement `getKioskWidgetData()` dans la catégorie *Climat, Chauffage & Énergie* avec paliers rapides à la télécommande (`6 A`, `10 A`, `13 A`, `16 A`, `24 A`, `32 A` et limites `60 %` à `100 %`).

---

## 7. Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux Conditions Générales d'Utilisation du Jeedom Market :
- **Fonctionnement 100 % Local (Zéro Cloud)** : Toutes les communications s'effectuent exclusivement en Bluetooth Low Energy directement entre votre box Jeedom et votre véhicule. Aucun identifiant de compte Tesla, jeton OAuth, coordonnée GPS ni numéro VIN n'est transmis sur Internet ou vers un serveur tiers. Le plugin n'expose par ailleurs volontairement aucune commande de géolocalisation GPS afin de préserver la confidentialité des déplacements des occupants du foyer.
- **Protection absolue des secrets (Zéro secret dans `ps aux`)** : Ni la clé API interne Jeedom (`apikey`), ni le numéro VIN, ni les chemins des clés cryptographiques ne sont passés en argument de ligne de commande (`ps aux`) ou affichés en clair dans les logs. La configuration du démon est transmise via `/tmp/jeedom/altTesla/daemon_config.json` verrouillé en permissions `0600` et supprimé automatiquement à l'arrêt du démon (`@unlink`), et les paramètres sensibles de `tesla-control` sont passés exclusivement par variables d'environnement de processus enfant (`TESLA_VIN`, `TESLA_KEY_FILE`, `TESLA_CACHE_FILE`).
- **Stockage cryptographique durci & Écriture atomique POSIX** : Les paires de clés locales ECDSA `prime256v1` sont conservées dans `data/keys/` protégé par un fichier `.htaccess` (`Require all denied`), des permissions `0700` sur le dossier et `0600` sur chaque clé privée, avec écriture atomique POSIX (`.tmp` + `fflush`/`fsync` + `rename`) protégeant la mémoire eMMC (notamment sur **Jeedom Luna**) contre toute corruption en cas de coupure électrique.
- **Isolation technique & Licences permissives** : Le plugin n'écrit aucun fichier en dehors de son répertoire d'installation, de `/tmp/jeedom/altTesla` (cache de session BLE en RAM `tmpfs` borné par rotation LRU) et de ses propres journaux Jeedom. Il s'appuie exclusivement sur des composants sous licences permissives compatibles (`teslamotors/vehicle-command` sous Apache-2.0, `bleak` sous MIT, `cryptography` sous Apache-2.0/BSD, `requests` et `certifi` sous Apache-2.0/MPL-2.0) sans aucune dépendance Copyleft GPL/AGPL.

---

## 8. Licence & Mentions Légales

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Licence** : Propriétaire - Tous droits réservés (avec réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Non-affiliation** : Ce plugin est une création originale et indépendante. Il n'est ni affilié, ni approuvé, ni sponsorisé, ni édité par Jeedom SAS ou Tesla, Inc. La marque Tesla et les noms de modèles cités appartiennent à leurs propriétaires respectifs et sont mentionnés exclusivement à titre de référence nécessaire pour indiquer la destination et la compatibilité technique du logiciel (Art. L.713-6 I b du Code de la propriété intellectuelle).
