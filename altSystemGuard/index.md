# Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)

**Nom commercial Market :** **Alt Audit Ressources, eMMC & Santé Plugins**  
**Identifiant technique :** `altSystemGuard`  
**Version actuelle :** `0.1.0-beta.14`  
**Auteur :** Aurélien Léovant (`alt-erre`)  
**Catégorie :** Supervision (`monitoring`)  
**Compatibilité :** Jeedom v4.0+ (Jeedom Luna, Atlas, Smart, Mini+, Raspberry Pi, Docker, VM & DIY)

### 🌟 Atouts Exclusifs & Architecture Différenciante

- **Profilage chirurgical plugin par plugin** : calcul rigoureux de la charge processeur, des requêtes HTTP et de l'empreinte mémoire vive réelle en PSS (*Proportional Set Size*) au lieu de métriques globales floues.
- **Audit d'usure matérielle eMMC et 4 vecteurs d'écriture** : seule solution Jeedom lisant directement les registres matériels JEDEC 5.0/5.1 de fin de vie (`life_time`, `pre_eol_info`) et isolant les 4 canaux réels d'usure flash (I/O démons, logs, insertions SQL `history`, données `data/`).
- **Détection proactive d'anomalies critiques** : identification immédiate des logs oubliés en niveau `DEBUG`, des fuites de mémoire vive et des commandes textuelles historisées saturant MariaDB.
- **Remédiation corrective en 1 clic** : boutons d'action immédiate pour repasser les logs en mode `Défaut`, purger les journaux excessifs ou désactiver les historisations polluantes sans ouvrir la configuration avancée.

---

## Prérequis, Compatibilités & Matériels Testés

- **Plateforme Jeedom de référence :** Développé et testé en conditions réelles sur une box officielle **Jeedom Luna 4G LoRaWAN** (ARM64 Rockchip, 2 Go de RAM, mémoire flash eMMC 16 Go).
- **Compatibilité système :**
  - Toutes installations **Jeedom $\ge$ 4.0 / 4.2** sous Linux Debian 11 / 12 (**Jeedom Luna**, **Jeedom Atlas**, **Jeedom Smart**, Raspberry Pi, Mini-PC, VM et Docker).
  - La lecture matérielle des registres d'usure **JEDEC eMMC 5.0/5.1** (`/sys/block/mmcblk*/device/life_time` et `pre_eol_info`) s'active automatiquement sur toutes les box équipées d'une puce eMMC (Luna, Atlas, Smart) ; toutes les autres métriques (I/O par plugin, RAM PSS, Swap, `tmpfs`, CPU, SQL MariaDB, logs) fonctionnent sur l'ensemble des plateformes Linux.

---

## 1. Présentation Générale

Contrairement aux outils de supervision Linux classiques qui n'affichent que la charge globale de la machine, **Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)** est conçu spécifiquement pour l'architecture interne de Jeedom afin de **calculer la consommation exacte de chacun des plugins installés sur la box** et de **protéger la mémoire flash eMMC** contre l'usure prématurée :

1. **Mesure des Lectures / Écritures sur la Mémoire Flash eMMC par Plugin (`Mo / 24h` & `Ko / s`)** :
   - **I/O Disque direct des démons et workers** (`/proc/<pid>/io` : `read_bytes` & `write_bytes` hors cache RAM `/tmp`).
   - **Écritures dans les fichiers de logs** (`/var/www/html/log/<plugin>*`), avec prise en compte automatique de la rotation et de la troncature des journaux.
   - **Écritures indirectes en base SQL MariaDB** (`history` & `historyArch` par `eqType_name`) : comptage des points d'historique insérés sur 24h par plugin et détection des commandes de type `info / string` (texte) historisées par erreur.
   - **Écritures directes dans les répertoires `plugins/<plugin>/data/`**.
   - **Lecture des registres matériels d'usure JEDEC eMMC 5.0/5.1** (`/sys/block/mmcblk*/device/life_time` et `pre_eol_info`) sur les box équipées d'une puce eMMC (Jeedom Luna, Atlas, Smart).
2. **Empreinte Mémoire Vive Réelle par Plugin (`RAM PSS` + `Swap` + Cache `tmpfs`)** :
   - Lecture de `/proc/<pid>/smaps_rollup` pour extraire le **PSS (*Proportional Set Size*)** de chaque démon Python/Node.js/binaire (qui répartit équitablement les bibliothèques partagées du système au lieu de les compter plusieurs fois comme le `RSS`).
   - Mesure de l'espace occupé en RAM dans `/tmp/jeedom/<plugin>` et mémorisation du **pic RAM sur 24h**.
3. **Charge Processeur (`% CPU` & Temps CPU cumulé 24h) & Callbacks HTTP vers Apache** :
   - Attribution de chaque processus démon et tâche planifiée (`jeeCron.php`) à son plugin.
   - Comptage non-bloquant des requêtes HTTP envoyées par chaque démon vers `/plugins/<plugin>/core/php/jee<Plugin>.php` (`req/24h` et `req/min`).
4. **Audit de l'Espace Disque par Plugin** :
   - Répartition précise entre le code du plugin, son environnement virtuel (`resources/venv` ou `node_modules`), ses données (`data/`) et ses fichiers de logs.
5. **Détection Automatique des Anomalies & Actions Correctives en 1 Clic** :
   - Détection des plugins oubliés en niveau de log **`DEBUG`**.
   - Détection des commandes textuelles (`info / string`) historisées par erreur.
   - Détection des fichiers de logs volumineux, des dépassements de budget d'écriture eMMC et des surconsommations RAM/CPU.
   - **Boutons de remédiation directe** dans l'interface et sur le widget : *Repasser le log en Défaut*, *Vider les logs*, *Couper l'historisation texte*, *Relancer le démon* et *Corriger toutes les anomalies*.

---

## 2. Architecture Hybride d'Équipements & Widgets « Dark Glass »

Le plugin fonctionne selon un **modèle hybride** :
* **1 Équipement Maître auto-créé (`Santé Box, eMMC & Top Plugins`)** :
  * Regroupe toutes les jauges matérielles de la box (Score de santé `/100`, Écriture/Lecture eMMC du jour, Usure matérielle eMMC JEDEC, RAM, Swap, Cache `/tmp/jeedom`, CPU, `iowait`, Température SoC, MariaDB, Apache) ainsi que les **4 onglets interactifs** (*Box & eMMC*, *Top eMMC*, *Top RAM/CPU*, *Alertes & Actions*).
* **Équipements dédiés « Plugin épinglé » (à la demande en 1 clic)** :
  * Depuis le tableau comparatif ou le widget Maître, cliquez sur l'icône d'épingle (**`📌 Épingler`**) en face de n'importe quel plugin installé pour créer instantanément un équipement Jeedom dédié à ce plugin, utilisable sur vos Dashboards, Vues, Designs, Kiosk TV (`altTvDashboard`) et dans vos scénarios Jeedom.

---

## 3. Architecture de Persistance à 3 Niveaux (Zéro Usure eMMC par le Plugin d'Audit)

Pour qu'`altSystemGuard` ne génère lui-même aucune usure sur la mémoire flash eMMC de votre box (notamment sur une **Jeedom Luna**) :
* **Niveau 3 - Instantané Temps Réel `100 % RAM tmpfs`** : Le démon Python `altSystemGuardd.py` écrit la photographie complète toutes les 30 secondes exclusivement en mémoire vive dans `/tmp/jeedom/altSystemGuard/live_metrics.json`. L'ouverture de la page du plugin ou du widget lit ce fichier en RAM sans aucune écriture disque.
* **Niveau 2 - Callbacks HTTP Filtrés par Delta & Hystérésis** : Le démon ne sollicite Apache/PHP (`jeeAltSystemGuard.php`) que lorsque les valeurs ont réellement varié au-delà du seuil d'hystérésis, en un seul appel groupé.
* **Niveau 1 - Compteurs Journaliers Cumulés (`data/counters/daily_counters.json`)** : Les cumuls sur 24h sont sauvegardés par écriture atomique POSIX (`.tmp` + `fsync` + `os.replace`) au maximum toutes les 15 minutes et lors de l'arrêt propre du démon (`< 50 Ko/jour` écrits sur l'eMMC), garantissant qu'aucun compteur journalier n'est perdu en cas de redémarrage.

---

## 💡 Idées de Scénarios & Synergies avec l'Écosystème `alt-erre`

Grâce à son intégration native dans Jeedom, le plugin s'associe harmonieusement avec les autres solutions de l'écosystème `alt-erre` pour enrichir votre quotidien :

### 1. Alerte Surchauffe / Usure Critique eMMC & Relais SMS d'Urgence
- **Déclencheur** : Détection d'un seuil critique d'écriture flash, de température ou d'espace disque.
- **Action & Synergie** : Envoi d'un SMS prioritaire hors Internet à l'administrateur si le disque flash ou la mémoire sature.
- **Plugins complémentaires associés** :
  - [Alt Téléphonie, MMS & Portail GSM](https://alt-erre.github.io/jeedom-docs/altCellular/) : canal SMS d'urgence autonome.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : voyant rouge d'incident matériel.

### 2. Redémarrage Automatique (Watchdog) des Démons Défaillants
- **Déclencheur** : Démon muet sur son socket ou absence de battement de cœur.
- **Action & Synergie** : Détection d'un démon muet sur son socket dédié et relance automatique sans redémarrer la box Jeedom.
- **Plugins complémentaires associés** :
  - [Alt Multiroom Audio (Sonos)](https://alt-erre.github.io/jeedom-docs/altSonos/), [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/), [Alt Habitat & Domotique (Delta Dore Tydom)](https://alt-erre.github.io/jeedom-docs/altTydom/) : surveillance des démons locaux.

### 3. Tableau de Bord NOC de Santé Matérielle sur Écran TV
- **Déclencheur** : Affichage de supervision sur écran mural ou téléviseur.
- **Action & Synergie** : Visualisation en 1 clin d'œil de l'état CPU, RAM tmpfs, eMMC et de la disponibilité des 29 plugins.
- **Plugins complémentaires associés** :
  - [Alt Dashboard & Kiosk TV](https://alt-erre.github.io/jeedom-docs/altTvDashboard/) : vue NOC de supervision intégrée.

---

## 4. Confidentialité, Protection des Données & Mesures de Sécurité

* **Traitement 100 % Local (Zéro Cloud)** : Toutes les mesures système (`/proc`, `/sys`, tailles de dossiers et statistiques SQL) sont collectées et traitées localement sur votre box Jeedom. Aucune donnée télémétrique n'est transmise vers Internet.
* **Protection absolue de la clé API interne (`Art. 4.3 CGU`)** : La clé API interne Jeedom n'est jamais passée en argument de ligne de commande (`ps aux`). Elle est encapsulée dans le fichier temporaire `/tmp/jeedom/altSystemGuard/daemon_config.json` verrouillé avec les permissions POSIX `0600` et supprimé dès l'arrêt du démon.
* **Socket de contrôle local isolé (`127.0.0.1:55109`)** : Le serveur d'écoute du démon Python n'est attaché qu'à l'interface de bouclage locale `127.0.0.1` sur le port dédié `55109` et vérifie systématiquement la clé API interne sur chaque requête.
* **Protection des répertoires internes** : Le dossier `data/counters/` est protégé contre tout accès HTTP direct par un fichier `.htaccess` (`Require all denied`) et les fichiers de compteurs sont écrits en permissions `0600`.
* **Isolation technique stricte (`Art. 4.4 CGU`)** : Les actions de remédiation rapide (bascule d'un niveau de log en `DEFAUT`, vidage de log, désactivation de l'historisation sur une commande `string`, relance d'un démon) utilisent exclusivement les méthodes officielles de l'API du Core Jeedom (`config::save`, `log::clear`, `$cmd->save()`, `$plugin->deamon_start()`) sans jamais modifier ni altérer le code source du Core ou d'un autre plugin.

---

## 5. Licence & Droits d'Auteur

* **Licence :** Propriétaire - Tous droits réservés (`Copyright (c) 2026 Aurélien Léovant (alt-erre)`).
* L'acquisition du plugin sur le Market Jeedom confère un droit d'utilisation personnel avec **réinstallations illimitées** sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market.
* Ce projet est indépendant et n'est affilié ni à Jeedom SAS ni aux constructeurs tiers.
