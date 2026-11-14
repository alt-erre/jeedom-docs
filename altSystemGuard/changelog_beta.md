# Changelog Beta - Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altSystemGuard/changelog).

---

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
