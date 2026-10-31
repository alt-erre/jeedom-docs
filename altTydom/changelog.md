# Changelog — Alt Habitat & Domotique (Delta Dore Tydom) (`altTydom`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.18] — 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.17] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.17` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.16] - 2026-10-27

### Corrigé
- **Stabilité du menu déroulant du Journal Tyxal+ et redimensionnement du widget en Mode Édition (`core/class/altTydom.class.php`, `core/template/dashboard/altTydom.html`, `resources/altTydomd.py`)** :
  - **Suppression de la tempête de `refreshWidget()` lors du chargement d'un journal Tyxal+** : la centrale Tyxal+ transmettant les entrées d'historique une par une sur le bus radio X3D (`index = 0..14` étalés sur 10 à 15 secondes), l'appel à `$eqLogic->refreshWidget()` sur chaque entrée détruisait et recréait le DOM du widget toutes les secondes, ce qui refermait immédiatement le menu déroulant `<select>` dès son ouverture, réinitialisait la sélection sur le journal en cours de réception (`ALL`) et détruisait les poignées de redimensionnement (`.ui-resizable-handle`) du Mode Édition Jeedom.
  - **Mise à jour en place du journal via `jeedom.cmd.addUpdateFunction`** : les entrées du journal mettent désormais à jour la liste `.tyd-histo-list` directement dans le DOM via la commande info `histo_alarm_log` sans jamais appeler `refreshWidget()` ni toucher au `<select>` ou aux poignées de redimensionnement.
  - **Regroupement (debounce) et filtrage du journal actif dans le démon Python (`_schedule_histo_flush`, `active_histo_type`)** : les trames X3D résiduelles d'une requête précédente sont ignorées dès que l'utilisateur change de journal, et `handleDevicesCData()` ne modifie plus jamais `selectedHistoType`.
  - **Redimensionnement fluide en Mode Édition (`.editingMode`)** : déverrouillage de `overflow: visible !important` et désactivation des interceptions de clic internes (`pointer-events: none` sur `.alt-body`/`.alt-header` uniquement en `.editingMode`) afin que les poignées de redimensionnement `.ui-resizable-handle` restent toujours accessibles, avec adaptation élastique (`flex: 1`) de la hauteur du bloc `.tyd-histo-box`.

---

## [0.1.0-beta.15] - 2026-10-27

### Ajouté
- **Journal multi-lignes déroulant pour l'Alarme Tyxal+ (`.tyd-histo-box`, `histo_alarm_log`)** :
  - Ajout d'un panneau de journal multi-lignes scrollable directement au bas du widget **Alarme Tyxal+** affichant jusqu'à **20 événements consécutifs** du journal sélectionné (`#1` plus récent en surbrillance ambrée jusqu'à `#15`/`#20`), avec badge de date/heure formaté en français (`JJ/MM/AAAA HH:MM`), intitulé complet non tronqué et bouton d'actualisation rapide (`fa-sync-alt`) dans l'en-tête du journal.
  - Ajout de la commande info texte **`histo_alarm_log`** (*« Journal d'événements complet »*) contenant l'intégralité des entrées du journal sélectionné (une ligne par événement) exploitable dans les scénarios ou virtuels Jeedom.
  - Présélection automatique du journal actif dans la liste déroulante **Journal Tyxal+** (`Journal : Tous les événements`, `Journal : Alarmes & Intrusions`, `Journal : Mises en / hors service`, `Journal : Issues ouvertes`, etc.) et prise en charge dynamique des types de journaux annoncés par `/devices/cmeta`.

### Corrigé
- **Accumulation ordonnée des événements `/devices/cdata` (`histo`) et décodage multi-trames HTTP-over-WebSocket (`resources/altTydomd.py`, `core/class/altTydom.class.php`)** :
  - Correction d'un défaut où les 15 entrées d'historique (`index = 0` plus récent à `index = 14` plus ancien) renvoyées par la centrale Tyxal+ s'écrasaient successivement, ne laissant visible que la 15e entrée la plus ancienne (`index = 14`). Les événements sont désormais accumulés par `index` et triés du plus récent (`#1`) au plus ancien.
  - Prise en charge dans `parse_http_over_ws_message()` des trames WebSocket contenant plusieurs messages HTTP concaténés (`PUT /devices/cdata` successifs pour chaque entrée du journal).
  - Conversion automatique des horodatages ISO (`[YYYY-MM-DDTHH:MM:SS]`) en format français lisible (`[JJ/MM/AAAA HH:MM]`) dans le journal et le sous-titre du widget.

---

## [0.1.0-beta.14] - 2026-10-27

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) au clic sur tous les boutons des widgets **Dashboard & Mobile** (volets *Monter* / *Stop* / *Descendre* / favoris, chauffage `+` / `-`, éclairages *ON* / *OFF*, alarme, ouvrants).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) de l'en-tête du widget.

## [0.1.0-beta.13] - 2026-10-24

### Amélioré
- **Présélection automatique de l'option active dans les 3 menus déroulants CVC (`core/class/altTydom.class.php`, `core/template/dashboard/altTydom.html`)** :
  - Les 3 listes déroulantes situées au bas du widget Chauffage / Thermostat (**Autorisation Zone** `authorization`, **Mode CVC** `hvac_mode` et **Fil Pilote / Régime** `thermic_level`) présélectionnent désormais automatiquement l'option active remontée par la box Tydom avec un préfixe explicite (`Zone : Chauffage`, `CVC : Normal / Auto`, `Régime : Confort` / `Hors-Gel` / `Arrêt`).
  - Maintien de l'option sélectionnée après modification manuelle dans le menu déroulant (`tyd-select-state`) au lieu de réinitialiser le sélecteur sur son intitulé vide.

### Corrigé
- **Mise à jour immédiate de l'état CVC et redémarrage automatique du démon lors d'une modification du script (`core/class/altTydom.class.php`, `resources/altTydomd.py`)** :
  - Mise à jour instantanée des commandes `info` (`setpoint`, `hvac_mode`, `authorization`, `thermic_level`, `hvacZoneOff`) dès l'exécution d'une commande dans `altTydomCmd::execute()` et nettoyage automatique d'un éventuel état `ANTI_FROST` résiduel lorsqu'une consigne active ($> 10{,}5\,^\circ\text{C}$) est reçue.
  - Vérification d'empreinte MD5 (`deamon.hash`) dans `deamon_info()` et `sendToDaemon()` permettant de relancer automatiquement le démon Python dès que `resources/altTydomd.py` est mis à jour sur le disque.

---

## [0.1.0-beta.12] - 2026-10-23

### Corrigé
- **Sélection du mode actif (`Confort` / `Éco` / `Auto`) et réactivité X3D des thermostats (`core/class/altTydom.class.php`, `resources/altTydomd.py`, `plugin_info/install.php`)** :
  - **Correction du retour intempestif sur `Hors-Gel` (`Zone en veille`)** : sur les thermostats à consigne (`Chaudière / PAC` / `Tybox` où `hvacMode = "NORMAL"` et `setpoint > 10.5 °C`), l'attribut Fil Pilote `thermicLevel` reste figé sur `"ANTI_FROST"` dans `/devices/data` même lorsque la zone est allumée. `evaluateHvacState()` ignore désormais `thermicLevel = "ANTI_FROST"` tant que `hvacMode` est en mode actif (`NORMAL`, `AUTO`, `COMFORT`, `ECO`) avec une consigne non nulle, ce qui maintient correctement le bouton **`Confort`** (`20 °C`), **`Éco`** (`17 °C`) ou **`Auto`** sélectionné.
  - **Envoi unitaire direct sur le bus radio X3D (zéro saturation radio)** : lorsqu'une zone à consigne est déjà allumée (`hvacMode = "NORMAL"`), un clic sur **Confort**, **Éco** ou **+/-** envoie désormais **uniquement un seul `PUT`** (`[{"name": "setpoint", "value": ...}]`) sans ré-envoyer `hvacMode` ni `thermicLevel` et sans interroger prématurément `GET /devices/data` pendant la trame radio X3D (évitant les commandes ignorées ou retardées par la passerelle Tydom).
  - **Redémarrage automatique du démon lors des mises à jour (`altTydom_update()`)** : ajout de `altTydom::deamon_start()` dans `plugin_info/install.php` afin que toute mise à jour du plugin recharge automatiquement la nouvelle version du démon Python.

---

## [0.1.0-beta.11] - 2026-10-23

### Corrigé
- **Stabilité de l'affichage du statut CVC & correction de la détection d'écriture `/devices/meta` (`resources/altTydomd.py`, `core/class/altTydom.class.php`)** :
  - Correction d'un défaut dans `_process_devices_meta()` où l'absence de la clé `"permission"` dans `/devices/meta` initialisait par défaut les attributs en lecture seule (`"r"` au lieu de `"rw"`), ce qui empêchait `_is_attr_writable()` d'envoyer les attributs `setpoint`, `authorization` et `thermicLevel` à la box Tydom.
  - Correction de l'évaluation d'état CVC (`evaluateHvacState()`) sur les thermostats Chaudière / PAC / Tybox : lorsque la zone est active (`hvacMode = "NORMAL"` et/ou `authorization = "HEATING"`) mais que la température ambiante est supérieure à la consigne (ex. `18.2 °C > 17.0 °C`), la valeur `thermicLevel = "STOP"` (relais de chauffe au repos) n'est plus interprétée à tort comme un état `Arrêt (OFF)` / `Zone éteinte`, mais conserve le mode actif (`Confort`, `Éco`, `Marche / Auto`) avec le badge `Consigne atteinte`.
  - Protection des commandes `hvac_mode` et `authorization` dans `applyRealtimeValues()` pour que les attributs secondaires `localMode = "STOP"` (absence de dérogation locale) et `comfortMode = "STOP"` n'écrasent plus l'état actif `hvacMode = "NORMAL"` ou `authorization = "HEATING"` lors des rafraîchissements `/devices/data`.

---

## [0.1.0-beta.10] - 2026-10-23

### Corrigé
- **Pilotage intelligent des Zones de Chauffage & Thermostats (`hvac-boiler` / `hvac` / `thermostat`) basé sur `/devices/meta` (`resources/altTydomd.py`, `core/class/altTydom.class.php`, `core/template/dashboard/altTydom.html`)** :
  - Ajout du moteur CVC adaptatif `_execute_hvac_command()` dans le démon Python inspectant les permissions (`permission: "rw"` vs `"r"`) et les énumérations (`enum_values`) de chaque équipement dans `/devices/meta`.
  - **Réveil automatique d'une zone éteinte (`STOP` / `ANTI_FROST`)** : un clic sur **Auto**, **Confort**, **Éco** ou une modification de la **Consigne** réactive automatiquement l'autorisation de chauffe (`authorization = "HEATING"` / `comfortMode = "HEATING"`), le mode CVC (`hvacMode` / `localMode` = `"NORMAL"`) et le niveau thermique avant d'appliquer la température cible.
  - **Prise en charge de Confort / Éco sur les thermostats à consigne (Chaudière / PAC / Tybox)** où `thermicLevel` est en lecture seule (`permission: "r"`) : application automatique des consignes **Confort** (`20 °C` par défaut) et **Éco** (`17 °C` par défaut), personnalisables dans les paramètres de l'équipement.
  - **Arrêt et Hors-Gel complets** : envoi coordonné sur `authorization`, `comfortMode`, `hvacMode`, `localMode` et `thermicLevel` selon les attributs supportés par la zone.
  - **Affichage fidèle de l'état sur le widget Dark Glass** : distinction claire entre `Arrêt (Hors-Gel)` / `Zone éteinte` (pastille éteinte, anneau bleu glace/gris) et `Marche / Auto` / `Chauffage actif` (pastille ambre), ajout de la liste déroulante **Marche / Arrêt Zone** (`set_authorization`) et mise en surbrillance dynamique du bouton de mode actif (`aria-pressed`).

---

## [0.1.0-beta.9] - 2026-10-23

### Corrigé
- **Catégories d'usage Tydom pour les Thermostats & Chauffage et affichage contextuel des options (`desktop/php/altTydom.php`, `desktop/js/altTydom.js`, `core/class/altTydom.class.php`)** :
  - Ajout de toutes les valeurs d'usage thermique renvoyées par l'API Tydom (`hvac`, `sh_hvac`, `hvac-central`, `boiler`, `electric`, `air_conditioner`) ainsi que des variantes d'ouvrants/technique (`ToggleGate`, `ToggleGarageDoor`, `windowSliding`, `klineWindowOthers`, `technical`, `energy`, `weather`) dans la liste déroulante **Catégorie d'usage Tydom** (`#sel_tydomUsage`) pour qu'elle ne soit plus jamais vide sur les thermostats Tybox / zones de chauffage.
  - Rétablissement automatique de `hvac` dans `printEqLogic()` et `inferUsage()` si un équipement de chauffage avait été sauvegardé avec une catégorie d'usage vide.
  - Masquage automatique des champs réservés aux volets roulants (**Sens de position**, **Position Favorite 1 (`F1`)** et **Position Favorite 2 (`F2`)**) sur les thermostats, sondes, détecteurs, alarmes et compteurs d'énergie.

---

## [0.1.0-beta.8] - 2026-10-23

### Ajouté
- **Famille dédiée « Détecteurs de fumée DAAF, Mouvement & Capteurs de sécurité » (`sensor`) et Widget d'alerte dédié (`core/class/altTydom.class.php`, `core/template/dashboard/altTydom.html`, `resources/altTydomd.py`)** :
  - Détection et reclassement automatique des détecteurs de fumée (`DFR` / `DAAF` / `smoke`) et de mouvement (`DMB` / `motion`) même lorsque la box Tydom les déclare sous l'usage générique `others` ou `sensorDFR` (avec suppression automatique des commandes d'action génériques `on`/`off`/`toggle` héritées de `other`).
  - Remplacement des boutons d'action génériques sur le widget par une **grille de supervision temps réel à 4 cellules** (*Capteur Fumée / Présence*, *Autoprotection*, *Alimentation Pile*, *Liaison Radio X3D / Température*).
  - Mise en évidence visuelle immédiate en cas de déclenchement (`smoke_defect = 1` ou `auto_protect = 1`) : vignette SVG passant au rouge vif avec triangle d'alerte, pastille rouge, illumination rouge de la carte principale via `:has(.alt-status-dot.is-alert)` et tuile `ALERTE FUMÉE !` en rouge lumineux.

---

## [0.1.0-beta.7] - 2026-10-23

### Corrigé
- **Fermeture propre de la boucle d'événements `asyncio` à l'arrêt du démon (`resources/altTydomd.py`)** :
  - Ajout d'un événement d'arrêt asynchrone (`_stop_event`) et attente explicite (`asyncio.gather(..., return_exceptions=True)`) de la terminaison des tâches `websocket_loop()`, `ping_loop()` et `StreamWriter.wait_closed()` avant `loop.close()` lors de la réception d'un signal `SIGTERM` / `SIGINT`, supprimant l'avertissement `Task was destroyed but it is pending!` au redémarrage du démon.

---

## [0.1.0-beta.6] - 2026-10-23

### Ajouté
- **Enregistrement matériel des Positions Favorites dans le moteur Delta Dore (`recFav = FAVORIT1` / `FAVORIT2`)** :
  - Ajout des boutons **« 🔖 Mémoriser (Moteur) »** directement dans la fiche de l'équipement (`desktop/php/altTydom.php`, `desktop/js/altTydom.js`, `core/ajax/altTydom.ajax.php`) et des commandes d'action **`Mémoriser Favori 1 (Matériel)`** (`rec_favorit1`) et **`Mémoriser Favori 2 (Matériel)`** (`rec_favorit2`) dans [`altTydom.class.php`](file:///Users/aurelienleovant/Developpement/Jeedom/altTydom/core/class/altTydom.class.php).
  - Permet d'enregistrer directement la position physique actuelle du volet dans la mémoire interne du moteur radio Delta Dore (`PUT /devices/{id}/endpoints/{id}/data` avec `{"name": "recFav", "value": "FAVORIT1"|"FAVORIT2"}`) sans avoir besoin de l'application mobile Tydom.

---

## [0.1.0-beta.5] - 2026-10-23

### Ajouté
- **Personnalisation en pourcentage des Positions Favorites `F1` et `F2` (`desktop/php/altTydom.php`, `core/class/altTydom.class.php`)** :
  - Ajout de deux champs optionnels **Position Favorite 1 (`F1`)** et **Position Favorite 2 (`F2`)** (`0` à `100 %`) dans les paramètres de chaque équipement.
  - S'ils sont laissés vides, les boutons `F1` / `F2` appellent la position favorite matérielle enregistrée dans le moteur Delta Dore (`FAVORIT1` / `FAVORIT2`). S'ils sont renseignés (ex. `20 %` et `80 %`), Jeedom positionne directement le volet ou le variateur au pourcentage défini.

### Corrigé
- **Affichage conditionnel du bouton « Basculer lames BSO » et des commandes masquées sur les widgets (`core/class/altTydom.class.php`)** :
  - Le bouton **Basculer lames BSO** (`slope_toggle`) n'est désormais affiché que sur les équipements de type **Brise-soleil orientable (`bso`)** et masqué automatiquement sur les volets roulants classiques (`shutter`, `klineShutter`, `swingShutter`, `awning`).
  - Prise en compte de la case **« Afficher »** (`isVisible`) des commandes d'action sur le widget personnalisé Dark Glass (décocher « Afficher » sur `F1`, `F2` ou `Identifier` masque automatiquement le bouton correspondant sur le widget) et rafraîchissement temps réel du widget (`refreshWidget()` / `postToHtml()`).

---

## [0.1.0-beta.4] - 2026-10-23

### Corrigé
- **Erreur JavaScript à l'ouverture de la fiche d'un équipement sous Jeedom v4.4+ (`desktop/js/altTydom.js`, `desktop/php/altTydom.php`)** :
  - Suppression de l'appel obsolète `jeedom.cmd.availableGenericType()` dans `addCmdToTable()` qui provoquait l'erreur `TypeError: jeedom.cmd.availableGenericType is not a function` lors du chargement d'un équipement.
  - Ajout du sélecteur de commande info liée (`data-l1key="value"`), de l'option d'inversion binaire et de la fonction `printEqLogic()` initialisant proprement les listes déroulantes par défaut (`invertPosition`, `widgetType`, `theme`).
  - Ajout de `preSave()` dans `core/class/altTydom.class.php` pour resynchroniser automatiquement `category_group` lors d'un changement manuel de la catégorie d'usage Tydom.

---

## [0.1.0-beta.3] - 2026-10-23

### Corrigé
- **Timeout sur les callbacks initiaux `configs_file` et `devices_data` lors de la création massive d'équipements (`resources/altTydomd.py`, `core/php/jeeAltTydom.php`, `core/class/altTydom.class.php`)** :
  - Augmentation du délai d'attente HTTP du démon Python (`send_to_jeedom`) de `10s` à `90s` et ajout de `@ignore_user_abort(true)` / `@set_time_limit(120)` dans `jeeAltTydom.php` pour éviter toute interruption lors de la création simultanée de plusieurs dizaines d'équipements et de leurs commandes au premier appairage.
  - Optimisation des méthodes `handleConfigsFile()`, `handleDevicesMeta()` et `upsertCommand()` afin de n'effectuer des écritures SQL (`$eqLogic->save()` et `$cmd->save()`) que lorsqu'un équipement ou une commande est créé ou effectivement modifié (zéro écriture SQL redondante lors des reconnexions et rafraîchissements).
  - Amélioration de la journalisation des exceptions asynchrones dans `send_to_jeedom()` (`TimeoutError` explicitement détaillé).

---

## [0.1.0-beta.2] - 2026-10-23

### Ajouté
- **Assistant ponctuel d'extraction du mot de passe local de la box Tydom (`plugin_info/configuration.php`)** :
  - Ajout du bouton **« 🔑 Récupérer via compte Delta Dore »** permettant d'extraire automatiquement en 1 clic le mot de passe technique local de la passerelle Tydom (`sites[0].gateway.password`) depuis le compte unifié de l'application mobile Tydom (`deltadoreadb2ciot.b2clogin.com` + `prod.iotdeltadore.com`).
  - **Conformité stricte Art. 4.3 CGU Market (Zéro conservation Cloud)** : l'adresse e-mail, le mot de passe du compte Delta Dore et le jeton OAuth2 éphémère sont utilisés exclusivement en mémoire le temps de la requête d'extraction puis immédiatement détruits (`unset` serveur et effacement DOM client), sans jamais être stockés ni journalisés dans Jeedom.

### Amélioré
- **Accessibilité & Ergonomie des Formulaires et Widgets (`modern-web-guidance`)** :
  - Association explicite `<label for="...">`, désactivation de la correction automatique sur les identifiants réseau (`autocorrect="off" autocapitalize="off" spellcheck="false"` sur IP, MAC et e-mail) et clavier numérique sur le code PIN d'alarme Tyxal+ (`inputmode="numeric"`).

---

## [0.1.0-beta.1] - 2026-10-22

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Habitat & Domotique (Delta Dore Tydom)** (`altTydom`), développée intégralement à partir de zéro en **Python 3 natif asynchrone** et **PHP 8+**.
- **Moteur WebSocket TLS Temps Réel (`resources/altTydomd.py`)** :
  - Connexion persistante chiffrée TLS (`port 443`) avec authentification **HTTP Digest (RFC 2617)** compatible avec toutes les passerelles **Tydom 1.0**, **Tydom 2.0**, **Tydom Home**, **Tydom Pro** et **Tywell** (support natif OpenSSL `SECLEVEL=0` pour les certificats auto-signés locaux).
  - Double mode de connexion : **100 % Local LAN (`wss://<IP_TYDOM>:443`)** ou **Médiation Cloud à distance (`wss://mediation.tydom.com:443`)**.
  - Décodeur HTTP-over-WebSocket supportant les réponses `Content-Length`, l'encodage `Transfer-Encoding: chunked` et les notifications Push temps réel (`PUT /devices/data`, `PUT /devices/cdata`).
  - **Découverte automatique sur le réseau local (LAN)** des passerelles Delta Dore Tydom (inspection ARP `00:1A:25` et sonde TLS port 443).
- **Support complet des familles d'équipements Delta Dore, K-Line & Bel'M** :
  - **Passerelle Box Tydom** : supervision de la liaison temps réel, modèle, firmware, mode API, ping et déclenchement de scénarios.
  - **Volets roulants, Brise-Soleil Orientables (BSO), Volets battants & Stores** : position `0–100 %` (avec inversion globale ou par équipement), *Monter*, *Stop*, *Descendre*, *Montée/Descente lente*, *Favori 1 & 2*, inclinaison BSO (`slope` & `slope_toggle`), défauts obstacle/thermique/pile/intrusion.
  - **Portes (K-Line / Bel'M), Portails & Portes de garage** : état d'ouverture/verrouillage binaire et détaillé, commandes *Ouvrir*, *Stop*, *Fermer*, *Impulsion / Toggle*, *Piéton / Favori 1* et positionnement proportionnel.
  - **Fenêtres & Baies vitrées K-Line / Détecteurs d'ouverture** : suivi d'ouverture, oscillo-battant (`pod_position`), intrusion et niveau de pile.
  - **Éclairages, Variateurs & Prises connectées** : commandes *Allumer*, *Éteindre*, *Basculer*, variateur `0–100 %`, *Favori 1 & 2*, puissance instantanée (`W`) et consommation cumulée (`Wh`).
  - **Chauffage Fil Pilote, Chaudières, PAC & Thermostats Tybox / Tywell** : température ambiante, température extérieure, hygrométrie, ECS, consigne `5–30 °C` (`±0,5 °C`), modes CVC (`NORMAL`, `COMFORT`, `ECO`, `ANTI_FROST`, `STOP`), niveaux Fil Pilote, autorisation chaudière et mode *Boost*.
  - **Alarme Tyxal+ & Détecteurs de sécurité** : état d'armement, intrusion, autoprotection, défauts secteur/batterie/GSM, pilotage et retour d'état individuel des **8 zones (`Z1` à `Z8`)**, journal d'événements Tyxal+ traduit en français et détecteurs de mouvement / fumée DAAF.
  - **Suivi Énergétique Tywatt / Linky TIC & Solaire** : puissance instantanée et index détaillés (*Total*, *Chauffage*, *Eau Chaude*, *Prises*, *Autres*, *Gaz*, *Ensoleillement*).
  - **Scénarios Tydom** : exécution directe des scénarios enregistrés dans la box Tydom.
- **Widgets Personnalisés « Dark Glass » Adaptatifs (`dashboard` & `mobile`)** :
  - Vignettes vectorielles SVG dynamiques selon l'état réel de l'équipement, 5 thèmes de couleur (`black`, `white`, `blue`, `yellow`, `red`) et compatibilité native avec les widgets standards Jeedom Core v4.
- **Sécurité & Conformité CGU Jeedom Market** :
  - **Zéro secret dans `ps aux` (Art. 4.3)** : encapsulation de la clé API, du mot de passe Tydom et du code PIN d'alarme dans `/tmp/jeedom/altTydom/daemon_config.json` (`chmod 0600`) supprimé à l'arrêt du démon.
