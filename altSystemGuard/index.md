# Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)

**Nom commercial Market :** **Alt Audit Ressources, eMMC & Santé Plugins**  
**Identifiant technique :** `altSystemGuard`  
**Version actuelle :** `0.1.0-beta.6`  
**Auteur :** Aurélien Léovant (`alt-erre`)  
**Catégorie :** Supervision (`monitoring`)  
**Compatibilité :** Jeedom v4.0+ (Jeedom Luna, Atlas, Smart, Mini+, Raspberry Pi, Docker, VM & DIY)

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
