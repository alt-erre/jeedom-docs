# Changelog - Alt Transports & Mobilités Urbaines (`altTransit`)

Toutes les modifications notables apportées à ce plugin sont documentées dans ce fichier, conformément à la politique [SemVer `alt-erre`](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.3] - 2026-11-07 (Canal Beta)

### Corrigé
- **Résolution automatique du catalogue `transport.data.gouv.fr` pour Rouen (Réseau Astuce & Lovélo VLS)** :
  - Alignement des identifiants `pan_slug` et `dataset_id` officiels du Point d'Accès National (`donnees-statiques-et-temps-reel-du-reseau-astuce-metropole-rouen-normandie` et `donnees-statiques-et-temps-reel-du-service-de-vls-lovelo-metropole-rouen-normandie`) avec URLs directes `GTFS`, `GTFS-RT` et `GBFS` pré-embarquées en repli instantané (corrige l'erreur *« Aucune archive GTFS trouvée pour ce réseau »* lors de la recherche d'un arrêt comme `Jardinerie` sur les lignes `F1` et `305`).
  - Prise en charge de la catégorie `vehicles-sharing` du Point d'Accès National pour les réseaux de vélos libre-service `GBFS` et invalidation automatique du cache catalogue (`pan_catalog_v2.json`).
  - Dédoublonnage des préréglages dans l'étape 1 de l'Assistant et correspondance tolérante par score de mots-clés sur l'ensemble des métropoles.
- **Filtrage et nettoyage HTML des alertes Info Trafic (`GTFS-RT ServiceAlerts`)** : suppression des balises HTML (`<p>`, `<figure>`, `<img>`, `<table>`) dans les descriptions d'alertes et exclusion des actualités commerciales non ciblées sur la ligne ou l'arrêt suivi.
- **Affichage des erreurs AJAX dans l'Assistant** : suppression de l'encapsulation HTML `<span id="span_errorMessage">` brute dans les messages d'erreur de la modale Assistant.

## [0.1.0-beta.2] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.1] - 2026-11-06

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`)** du plugin **Alt Transports & Mobilités Urbaines (`altTransit`)** pour Jeedom 4.2+.
- **Moteur national Open Data (`transport.data.gouv.fr`) sans clé API** :
  - Auto-découverte de plus de **350 réseaux français** de transports en commun (`GTFS` + `GTFS-RT` Protobuf) et de vélos en libre-service (`GBFS`).
  - Préréglages dédiés et optimisés pour la **Métropole Rouen Normandie** :
    - **Réseau Astuce** : Métro, TEOR `T1-T4`, FAST `F1-F9`, Noctambus et lignes régulières multi-opérateurs (*Transdev Rouen / TCAR*, *TAE Elbeuf*, *TNI*) avec agrégation multi-flux `TripUpdates` et `ServiceAlerts`.
    - **Lovélo Rouen (`GBFS`)** : suivi temps réel des vélos disponibles (électriques `VAE` et mécaniques) et bornes libres par station.
  - Préréglages rapides complémentaires : Caen (*Twisto*), Le Havre (*LiA*), Île-de-France Mobilités (*PRIM* `SIRI-Lite`), Bordeaux (*TBM*), Nantes (*Naolib*), Rennes (*STAR*), Lille (*Ilévia*), Marseille (*RTM*), Toulouse (*Tisséo*), Montpellier (*TaM*), Nice (*Lignes d'Azur*), Grenoble (*MTag*), Strasbourg (*CTS*) et Suisse (`transport.opendata.ch`).
- **Assistant interactif en 3 étapes** : recherche de ville/métropole, sélection d'arrêt avec badges officiels colorés des lignes, filtrage par ligne/direction ou panneau multimodal complet.
- **Architecture sobre Jeedom Luna** :
  - Zéro démon permanent (`0 Mo` RAM au repos), double cadence automatique Heures de pointe / Hors pointe et pause nocturne paramétrable.
  - Mutualisation réseau des téléchargements temps réel, indexation locale atomique (`data/stops/eq_<id>.json`) limitée aux arrêts suivis et plafond strict `LRU < 2 Mo` sur `tmpfs`.
  - Décodeur Protobuf `GTFS-RT` natif intégré en repli automatique en complément de `gtfs-realtime-bindings` (`Apache-2.0`).
- **Widgets « Dark Glass » (`alt-erre` v1.4) & Kiosk TV (`altTvDashboard`)** :
  - Templates Dashboard et Mobile à 9 thèmes de couleur, boutons d'en-tête circulaires `26x26 px`, option `widgetCategoryHeader` et onglets *Passages*, *Info Trafic* et *Infos & TTS*.
  - Implémentation du contrat `getKioskWidgetData()` 10-Foot UI pour `altTvDashboard` et typage sémantique automatique Jeedom Core 4.2+.
