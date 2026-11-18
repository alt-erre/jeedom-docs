# Changelog Beta - Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altSystemGuard/changelog).

---

## [0.1.0-beta.21] - 2026-11-18

- **Accélération de la procédure de mise à jour (`< 0,3 s`) & suppression de l'avertissement `update.ajax.php : Load failed` sur Safari / iOS** :
  - Suppression des appels système redondants pendant l'installation et le redémarrage du démon afin que la requête `update.ajax.php` rende la main immédiatement au navigateur (évitant la coupure de connexion `Load failed` de Safari iOS lors des mises à jour unitaires).

## [0.1.0-beta.20] - 2026-11-18

- **Correction des compteurs restant à `0.00 Mo` après le passage de minuit ou relance du démon** :
  - Correction de la remise à zéro automatique de minuit qui activait par erreur le verrou de remise à zéro manuelle, et réparation automatique des droits d'écriture sur le fichier de log du démon afin qu'il démarre toujours sous `www-data`.
  - Sauvegarde continue des curseurs de mesure en mémoire vive (`tmpfs`) et amorçage automatique des compteurs de la journée en cours (eMMC, MariaDB, logs plugins/Core, `/var/log/journal` et historique SQL 24h).

## [0.1.0-beta.19] - 2026-11-17

- **Exécution 100 % native `www-data` du démon (zéro appel `sudo` en arrière-plan) & Protection SSH / Système lors des mises à jour** :
  - Exécution du démon et des collectes ponctuelles directement sous l'utilisateur `www-data` (sans wrapper `sudo` permanent) avec arrêt natif instantané, éliminant toute saturation CPU / I/O / PAM susceptible de figer l'accès SSH ou l'interface Web pendant une mise à jour.
  - Réparation automatique des permissions sur `/tmp/jeedom/altSystemGuard` et lecture des en-têtes `/var/log/journal` sans privilèges root permanents.

## [0.1.0-beta.18] - 2026-11-17

- **Suppression de tout blocage d'interface Web (Apache / Session PHP) lors des mises à jour du plugin sur Jeedom Luna** :
  - Libération immédiate du verrou de session PHP sur l'ensemble des requêtes AJAX du plugin afin que le rafraîchissement automatique du Cockpit ne puisse jamais bloquer la navigation dans Jeedom ni saturer les workers Apache pendant qu'une mise à jour est en cours.
  - Lecture 100 % en mémoire vive (`< 1 ms`) lors des rafraîchissements automatiques et suppression de la requête SQL sur `information_schema` au profit d'une lecture directe ultra-rapide sur disque.
  - Mise en cache intelligente des archives de `/var/log/journal` (seul le journal actif est lu à chaque cycle tant qu'aucune rotation ou purge n'a lieu) et accélération de la procédure de mise à jour.

## [0.1.0-beta.17] - 2026-11-17

- **Rotation préalable de `/var/log/journal` lors de la purge & suivi des sauvegardes Jeedom et du Swap du jour** :
  - Exécution automatique de `journalctl --rotate` juste avant `journalctl --vacuum-size=50M` lors du clic sur **« Réduire à 50 Mo »** afin que le fichier journal actif en cours (qui restait bloqué à ~120 Mo) soit lui aussi tourné et purgé sous les 50 Mo.
  - Prise en compte du cumul journalier du Swap (`pswpout`) depuis minuit et suivi dédié des écritures générées par les sauvegardes Jeedom (`/var/www/html/backup`).

## [0.1.0-beta.16] - 2026-11-17

- **Mesure directe des écritures SQL MariaDB et `systemd-journald` sur Jeedom Luna (noyau sans `/proc/<pid>/io`) & Purge en 1 clic de `/var/log/journal`** :
  - Lecture directe des compteurs internes d'écriture du moteur InnoDB de MariaDB (`SHOW GLOBAL STATUS`) et de l'offset d'écriture temps réel des journaux binaires `systemd-journald` (`/var/log/journal`) pour afficher les vrais volumes écrits sur les box dont le noyau Linux désactive `/proc/<pid>/io` (Jeedom Luna).
  - Calcul immédiat du volume d'historique SQL 24h dès la première ouverture du Cockpit après redémarrage du démon.
  - Ajout d'un bouton **« Réduire à 50 Mo »** (`journalctl --vacuum-size=50M`) lorsque `/var/log/journal` occupe plus de 100 Mo sur l'eMMC (permettant de libérer jusqu'à 1,3 Go sur une Jeedom Luna en 1 clic) et affichage de la part `/var/log` dans la barre d'occupation du disque racine.

## [0.1.0-beta.15] - 2026-11-17

- **Décomposition détaillée des écritures système, SQL et journaux sur la mémoire Flash eMMC (24h)** :
  - Ventilation précise de l'origine des écritures eMMC en 8 postes distincts : **Logs Plugins**, **Logs Core Jeedom & Scénarios** (`http.error`, `cron_execution`, `scenarioLog/`), **SQL Historique Commandes**, **Moteur MariaDB & Tables Core** (`cron`, `config`, `cache`, InnoDB), **Dossiers `data/`**, **I/O Direct Démons**, **Journaux Linux (`/var/log`, `journald`, `rsyslogd`, `apache2`) & Services**, **Swap Linux sur eMMC** et **Journal `ext4` (`jbd2`) & Noyau**.
  - Ajout sous la barre eMMC du Cockpit (ainsi que dans la bulle explicative au survol) de la liste des **principaux services système écrivains sur 24h** (`mariadbd`, `systemd-journald`, `rsyslogd`, `apache2`, `mosquitto`, `Swap`...) et des **journaux `/var/log` et Core Jeedom les plus actifs / volumineux**.

## [0.1.0-beta.14] - 2026-11-15

- **Correction de l'affichage du bloc Démon et du chargement de la classe du plugin** :
  - Correction d'une erreur de syntaxe dans un bloc de commentaire interne qui empêchait le chargement automatique de la classe du plugin par Jeedom (ce qui laissait l'encadré **Démon** vide sur la page de configuration et provoquait l'erreur `getDeviceRole()` à l'ouverture du plugin).
  - Rafraîchissement automatique du cache PHP (`OPcache`) et de l'encadré **Démon** dès l'ouverture de la page de configuration du plugin.

## [0.1.0-beta.13] - 2026-11-15

- **Correction de l'erreur `Call to undefined method eqLogic::getDeviceRole()` à l'ouverture du plugin après mise à jour** :
  - Chargement explicite de la classe du plugin dès l'ouverture de la page d'administration et du Panel Desktop afin que les équipements soient toujours instanciés avec leur classe complète (même si le plugin avait été momentanément désactivé par une mise à jour précédente interrompue).
  - Réactivation automatique du plugin et de son démon en fin de mise à jour et à l'ouverture de la page d'administration.

## [0.1.0-beta.12] - 2026-11-14

- **Allègement radical de la mise à jour et du démarrage sur Jeedom Luna** :
  - Désactivation de la réinstallation automatique des dépendances système (`apt-get update` / `venv`) lors des mises à jour, le démon utilisant exclusivement les modules standard de Python 3 déjà intégrés à la box.
  - Suppression des requêtes SQL lourdes et de l'analyse disque au moment précis du démarrage du démon (délai de courtoisie de 5 secondes après mise à jour) afin de ne jamais surcharger la mémoire vive ni le processeur de la Jeedom Luna pendant une mise à jour.
  - Correction d'une méthode d'écriture de configuration appelée au redémarrage du démon en `0.1.0-beta.11`.

## [0.1.0-beta.11] - 2026-11-14

- **Correction définitive du blocage en fin de mise à jour et de la validation de version dans le Centre de mise à jour** :
  - Isolation complète du script de mise à jour afin qu'il s'exécute sans erreur quelle que soit la version précédemment chargée en mémoire par Jeedom lors du lancement de la mise à jour.
  - Synchronisation automatique du numéro de version installé sur l'entrée principale du Centre de mise à jour lors de la suppression des lignes en double (évitant que le plugin ne reste affiché en état `UPDATE` sur l'ancien commit après la copie des fichiers).
  - Ajout d'une étape de pré-mise à jour et harmonisation automatique des droits système (`www-data`) sur les fichiers de verrouillage et de compteurs du démon pour garantir un arrêt et un redémarrage sans conflit de permissions.

## [0.1.0-beta.10] - 2026-11-14

- **Fiabilisation de la procédure de mise à jour et suppression des doublons dans le Centre de mise à jour Jeedom** :
  - Correction d'un conflit lors de la relance du démon en fin de mise à jour (suppression de la double relance qui entrait en collision avec le délai de sécurité de 45 secondes de Jeedom et arrêt propre du processus démon sans commande `pkill` externe).
  - Lecture directe des métadonnées des plugins sans solliciter l'indexation du Centre de mise à jour de Jeedom en arrière-plan (qui provoquait l'apparition temporaire du plugin en double ou en triple dans la liste des mises à jour lorsqu'une mise à jour était lancée pendant que la page était ouverte) et nettoyage automatique des éventuels doublons existants.

## [0.1.0-beta.9] - 2026-11-14

- **Nouveau Panel Desktop Plein Écran (`Accueil -> Alt Audit Ressources, eMMC & Santé Plugins` et bouton `Panel Cockpit`)** organisé en **4 vues** avec rafraîchissement automatique toutes les 30 secondes :
  1. **Cockpit & Répartition 100 %** : 4 barres visuelles empilées (CPU, RAM, Écritures eMMC 24h avec projection annuelle, Disque), diagnostic détaillé du score de santé et podiums Top 5 des plugins les plus consommateurs.
  2. **Matrice Plein Écran des Plugins** : tableau plein écran avec pilules de filtrage en 1 clic (*Tous*, *Actifs*, *Démons OK/NOK*, *À corriger*, *Logs DEBUG*, *Textes histo*, *Avec venv*, *Épinglés*).
  3. **Centre de Revue Global des Textes Historisés & SQL** : vue unifiée listant d'un seul coup toutes les commandes Texte (`info / string`) historisées de tous les plugins de la box pour les couper, purger ou conserver en liste blanche au même endroit.
  4. **Inspecteur des Crons Jeedom & Processus Système** : diagnostic en temps réel des tâches planifiées (notamment celles lancées à chaque minute `* * * * *` et celles en cours d'exécution avec leur PID).

## [0.1.0-beta.8] - 2026-11-14

- **Décomposition complète à 100 % de la Charge CPU dans la bulle explicative** :
  - La bulle de la carte **Charge CPU, I/O Wait & Température** détaille désormais l'intégralité des `100 %` d'activité processeur sans aucune part cachée : **Démons & Crons Plugins en cours** (avec le Top 3), **Serveur SQL MariaDB**, **Serveur Web Apache / PHP**, **Moteur Jeedom Core & Services Système Linux actifs**, ainsi que la part exacte des **Salves de Crons minutes & Processus éphémères** (avec le nombre de processus courts créés par minute sur la box) et la répartition **Code Utilisateur / Noyau Linux / I/O Wait**.

## [0.1.0-beta.7] - 2026-11-14

- **Bulles explicatives détaillées au survol (et au toucher sur tablette/iPad)** :
  - Survoler ou toucher l'une des **5 cartes de synthèse du bandeau supérieur** affiche une bulle détaillant chaque indicateur ainsi que **le calcul exact du Score de Santé (`100 / 100` moins les pénalités actives)**.
  - Survoler ou toucher le badge de **Score de Santé d'un plugin (`80/100`, `100/100`)** dans le tableau explique précisément pourquoi des points ont été retirés sur ce plugin.
  - Ajout de bulles explicatives sur les boutons d'actions globales et sur les en-têtes des colonnes du tableau.

## [0.1.0-beta.6] - 2026-11-14

- Correction de l'initialisation d'une variable interne de suivi d'horodatage (`last_data_track_ts`) qui empêchait le démarrage du démon en version `0.1.0-beta.5`.

## [0.1.0-beta.5] - 2026-11-14

- **Verrou d'instance unique du démon et relance automatique à la mise à jour** : élimine automatiquement les éventuels anciens processus démons restés actifs en arrière-plan (`4 proc` -> `1 proc`) lors d'une mise à jour du plugin.
- **Harmonisation de l'échelle de charge CPU (%) et affichage CPU MariaDB / Apache** : le pourcentage CPU de chaque plugin est désormais ramené sur la capacité totale multi-cœurs de la box (même échelle `0 - 100 %` que le bandeau global), et la part CPU de MariaDB et d'Apache est affichée dans le bandeau supérieur.

## [0.1.0-beta.4] - 2026-11-14

- **Optimisation majeure de la consommation processeur (CPU)** :
  - Allègement drastique des requêtes d'audit de l'historique en base de données (suppression du balayage de la table d'archives et mise en cache mémoire) afin d'éviter tout pic CPU de MariaDB.
  - Calcul incrémental intelligent de l'espace disque des plugins (notamment des environnements Python `venv` et `node_modules`) sans re-parcourir les dossiers inchangés.
  - Mise en cache de l'identification des processus système et lecture allégée de la mémoire vive pour diviser par 10 le temps CPU du démon à chaque cycle, avec exécution en priorité basse (`nice`).

## [0.1.0-beta.3] - 2026-11-14

- ** Exécution instantanée et retour visuel immédiat sur les boutons d'action** (*Log Défaut*, *Vider Log*, *Relancer démon*, *Épingler*) avec indicateur de chargement, surbrillance de la ligne mise à jour et badge de confirmation.
- **Fenêtre de revue des commandes Texte historisées** : cliquer sur `X texte(s) histo !` ou sur `Histo Texte` affiche désormais la liste complète des commandes texte concernées (avec leur valeur actuelle et le nombre de points enregistrés en base), et permet soit de couper l'historisation à la carte (avec purge SQL optionnelle), soit de marquer certaines commandes utiles comme **« Conservées »** (liste blanche).
- **En-têtes de colonnes fixes au défilement** : la barre de titres du tableau comparatif des plugins reste visible en haut lors de la descente dans la liste et permet de trier directement les colonnes au clic.

## [0.1.0-beta.2] - 2026-11-14

- Correction d'un problème d'initialisation de la boucle asynchrone empêchant le maintien du démon en arrière-plan sur certains environnements Debian 11 (Python 3.9).

## [0.1.0-beta.1] - 2026-11-13

- Première version Beta du plugin **Alt Audit Ressources, eMMC & Santé Plugins**.
- Suivi temps réel et cumulé sur 24h de la consommation par plugin installé : écritures sur la mémoire flash eMMC (démons, logs, historique SQL et données), empreinte mémoire vive réelle (RAM PSS et cache `/tmp`), charge processeur (CPU) et espace disque occupé.
- Surveillance matérielle globale de la box Jeedom (usure eMMC JEDEC, débit d'écriture flash, RAM, Swap, CPU, attente disque `iowait`, température et poids de la base de données).
- Détection automatique des anomalies d'usure (plugins laissés en log `DEBUG`, commandes texte historisées par erreur, logs volumineux, surconsommation mémoire) avec boutons d'action corrective en 1 clic.
- Modèle hybride avec équipement Maître « Santé Box, eMMC & Top Plugins » et possibilité d'épingler n'importe quel plugin en équipement dédié sur le Dashboard.
