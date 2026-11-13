# Changelog Beta - Alt Audit Ressources, eMMC & Santé Plugins (`altSystemGuard`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altSystemGuard/changelog).

---

## [0.1.0-beta.1] - 2026-11-13

- Première version Beta du plugin **Alt Audit Ressources, eMMC & Santé Plugins**.
- Suivi temps réel et cumulé sur 24h de la consommation par plugin installé : écritures sur la mémoire flash eMMC (démons, logs, historique SQL et données), empreinte mémoire vive réelle (RAM PSS et cache `/tmp`), charge processeur (CPU) et espace disque occupé.
- Surveillance matérielle globale de la box Jeedom (usure eMMC JEDEC, débit d'écriture flash, RAM, Swap, CPU, attente disque `iowait`, température et poids de la base de données).
- Détection automatique des anomalies d'usure (plugins laissés en log `DEBUG`, commandes texte historisées par erreur, logs volumineux, surconsommation mémoire) avec boutons d'action corrective en 1 clic.
- Modèle hybride avec équipement Maître « Santé Box, eMMC & Top Plugins » et possibilité d'épingler n'importe quel plugin en équipement dédié sur le Dashboard.
