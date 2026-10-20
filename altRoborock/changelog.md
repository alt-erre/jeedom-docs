# Changelog — Alt Roborock (`altRoborock`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.1] — 2026-10-20 (Canal Beta)

### Ajouté
- **Pilotage 100 % en local (TCP `58867`)** des robots aspirateurs et laveurs **Roborock**, avec support dédié aux **Roborock S7 / S7+ / S7 MaxV Ultra** (`roborock.vacuum.a15`, `a27`, `a62`, `a65`) et **Roborock Qrevo Curv / Qrevo Master / Qrevo Pro / Qrevo MaxV / S8 MaxV Ultra** (`roborock.vacuum.a135`, `a117`, `a104`, `a101`, `a97`).
- **Démon Python asynchrone bi-protocole (`resources/altRoborockd.py`)** :
  - Support natif du **Protocole `1.0` (AES-128-ECB + CRC32)** pour la génération S7/S6/S5 Max/Q7.
  - Support natif du **Protocole `L01` (AES-256-GCM + Handshake `connect_nonce` / `ack_nonce` + CRC32)** pour la génération **Qrevo Curv** / Qrevo Master / S8 MaxV Ultra.
  - Négociation automatique `L01` $\leftrightarrow$ `1.0` (`auto`) et découverte LAN passive/active (broadcast UDP `58866` déchiffré AES-ECB + sonde TCP `58867` asynchrone sur le sous-réseau `/24`).
- **Commandes complètes S7 & Qrevo Curv** :
  - Transport : *Démarrer*, *Pause*, *Reprendre*, *Arrêter*, *Retour à la station*, *Nettoyage Spot*, *Localiser (`find_me`)*.
  - Puissances d'aspiration : *Silencieux (101)*, *Équilibré (102)*, *Turbo (103)*, *Max (104)*, *Lavage seul (105)*, *Personnalisé (106)*, ***Max+ 18 500 Pa (108)*** et ***SmartPlan IA (110)***.
  - Lavage **VibraRise (S7)** & **Serpillères rotatives / FlexiArm (Qrevo Curv)** : *Désactivé (200)*, *Faible (201)*, *Moyen (202)*, *Intense (203)*, *Personnalisé (204)*, *Débit sur mesure (207)*, ***SmartPlan IA (209)*** et curseur de débit d'eau fin (`1` à `30`).
  - Parcours (`mop_mode` : *Standard*, *Approfondi*, *Approfondi+*, *Rapide*, *SmartPlan IA*) et gestion des tapis (*Boost Tapis Auto*, *Éviter / Soulever serpillères VibraRise / Ignorer*).
  - **Station Multifonction 3.0 (Qrevo Curv) & Auto-Empty Dock (S7+)** : *Vider le bac à poussière*, *Laver les serpillères à l'eau chaude*, *Séchage à l'air chaud (Marche/Arrêt)* et diagnostic des bacs d'eau propre/sale et du sac à poussière (`dss`).
  - **Nettoyage par pièces (Segments) & Multi-Cartes (Étages)** : Découverte automatique `get_room_mapping`, sélection multi-pièces avec répétition (`1x`, `2x`, `3x`), nettoyage de zone (`clean_zone`), aller au point cible (`goto_target`) et sélection d'étage (`map_select`).
  - **Consommables & Historique** : Jauge `%` et remise à zéro pour *Brosse principale*, *Brosse latérale*, *Filtre*, *Capteurs* + compteurs cumulés (`m²`, `h`, cycles).
- **Assistant intégré de récupération unique des clés locales (`localKey`)** :
  - Connexion éphémère au compte Roborock par **Code e-mail à 6 chiffres (OTP)** ou mot de passe, ou **Import JSON hors-ligne**, récupérant `DUID`, `localKey`, modèle, protocole et noms des pièces.
- **Widgets personnalisés Dashboard & Mobile (`alt-erre` Dark Glass)** :
  - Design unifié « Dark Glass » avec 5 thèmes de couleur (*Noir*, *Blanc*, *Bleu*, *Jaune*, *Rouge*), vignette SVG animée LiDAR, contrôles de station, sélecteur interactif de pièces par chips et jauges de consommables.

### Sécurité & Conformité
- Transmission des secrets (`localKey`, code OTP/mot de passe) exclusivement via fichiers temporaires dans `jeedom::getTmpFolder('altRoborock')` verrouillés en `chmod 0600` et supprimés immédiatement après lecture (`@unlink`). Aucun secret en argument CLI (`ps aux`) ni dans les logs.
- Protection du répertoire `data/profiles` par `.htaccess` (`Require all denied`) et avis de confidentialité complet conforme aux CGU du Jeedom Market.
