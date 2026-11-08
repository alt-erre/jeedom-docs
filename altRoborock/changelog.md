# Changelog - Alt Roborock (`altRoborock`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.7] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.6] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.5] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altRoborock.html`, `core/template/mobile/altRoborock.html`, `core/class/altRoborock.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.4] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.3] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.3` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.2] - 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action & Protection anti-double-clic (Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (*Démarrer*, *Pause*, *Stop*, *Retour station*, *Localiser*, puissances d'aspiration, débits d'eau, modes et pièces).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Ajout d'un verrouillage anti-double-clic (`1,5 s`) sur les commandes de cycle (*Démarrer*, *Pause*, *Stop*, *Retour station*, *Nettoyage de pièces*).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.1] - 2026-10-20 (Canal Beta)

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
- **Assistant intégré de récupération unique et de sauvegarde des clés locales (`localKey`)** :
  - Connexion éphémère au compte Roborock par **Code e-mail à 6 chiffres (OTP)** ou mot de passe, récupérant `DUID`, `localKey`, modèle, protocole et noms des pièces.
  - **Export / Téléchargement `.json` en 1 clic** (depuis l'assistant ou la fiche d'un équipement) permettant de mettre de côté ses clés locales (`localKey`, `DUID`, `IP`, `pièces`) hors-ligne et de les réimporter ultérieurement sans aucune reconnexion au Cloud.
- **Widgets personnalisés Dashboard & Mobile (`alt-erre` Dark Glass)** :
  - Design unifié « Dark Glass » avec 5 thèmes de couleur (*Noir*, *Blanc*, *Bleu*, *Jaune*, *Rouge*), vignette SVG animée LiDAR, contrôles de station, sélecteur interactif de pièces par chips et jauges de consommables.

### Sécurité & Conformité
- Transmission des secrets (`localKey`, code OTP/mot de passe) exclusivement via fichiers temporaires dans `jeedom::getTmpFolder('altRoborock')` verrouillés en `chmod 0600` et supprimés immédiatement après lecture (`@unlink`). Aucun secret en argument CLI (`ps aux`) ni dans les logs.
- Protection du répertoire `data/profiles` par `.htaccess` (`Require all denied`) et avis de confidentialité complet conforme aux CGU du Jeedom Market.
