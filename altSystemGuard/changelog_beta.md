# Changelog Beta - Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altSystemGuard/changelog).

---

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
