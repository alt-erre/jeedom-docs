# Changelog Beta - Alt Habitat & Domotique (Delta Dore Tydom) (`altTydom`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altTydom/changelog).

---

## [0.1.0-beta.54] - 2026-11-26

- Correction du passage par 100 % via Siri / HomeKit (Homebridge) : interception et annulation de l'ordre « Variateur = 100 % » envoyé en premier par Homebridge juste avant la vraie consigne « Variateur = 5 % » lors d'une commande vocale ou HomeKit.

## [0.1.0-beta.53] - 2026-11-25

- Correction du passage par 100 % avec Siri / HomeKit (Homebridge) : inhibition de l'ordre « Allumer » redondant lorsque la lampe est déjà allumée (ex. passage de 20 % à 5 %), élargissement de la fenêtre de fusion pour couvrir le délai interne de Homebridge, et restauration directe du dernier pourcentage mémorisé au lieu de `levelCmd = ON` (interprété comme 100 % par la box Tydom).

## [0.1.0-beta.52] - 2026-11-25

- La commande « Allumer » (`LIGHT_ON`) des variateurs utilise désormais l'ordre d'allumage natif Delta Dore (`levelCmd = ON`) afin de rallumer l'éclairage sur son dernier niveau mémorisé (exactement comme l'interrupteur mural) au lieu de forcer 100 %.

## [0.1.0-beta.51] - 2026-11-24

- Correction du passage par 100 % lors d'une demande de variation à Siri / HomeKit (Homebridge) : fusion intelligente du double ordre envoyé par HomeKit (« Allumer » + « Variateur X % ») afin d'appliquer directement le pourcentage demandé (ex. de 20 % à 5 % ou de 0 % à 5 %) sans jamais monter à 100 %.

## [0.1.0-beta.50] - 2026-11-23

- Ajout du plafond dynamique de luminosité par mode (`Luminosité maximum` / `Luminosité maximum niveau`) et de son sélecteur rapide (`Max 10%` à `Max 70%` / `Max 100%`) sur le widget des éclairages à variateur Tydom.

## [0.1.0-beta.49] - 2026-11-23

- Suppression du passage par 100 % lors de l'allumage à faible luminosité (ex. 5 % la nuit) des variateurs d'éclairage Delta Dore TYXIA : l'extinction depuis Jeedom utilise désormais l'ordre natif d'extinction du variateur (comme l'interrupteur mural) afin de préserver sa mémoire interne et d'allumer la lampe directement au pourcentage souhaité sans flash à 100 %.

## [0.1.0-beta.48] - 2026-11-18

- Remplacement des équipements et commandes 100 % via les méthodes natives officielles du Core Jeedom (`migrateCmd`, `migrateEqlogic`, `massReplace` et sauvegarde directe du Core) pour une compatibilité totale avec le plugin officiel « Thermostat » en mode temporel.

## [0.1.0-beta.47] - 2026-11-18

- Correction du remplacement des commandes dans les équipements du plugin officiel « Thermostat » (`Thermostat Confort ...`) et leurs écouteurs d'événements temps réel lors de la migration, et copie jumelée de l'historique de température extérieure sur la commande principale de la sonde.

## [0.1.0-beta.46] - 2026-11-18

- Correction du badge « Utilisé (1) » qui restait affiché sur les thermostats de l'ancien plugin après migration (exclusion des auto-références internes de l'ancien plugin), affichage en clair sous chaque équipement du nom exact de l'élément qui l'utilise (lisible sur tablette sans survol souris) et remplacement exhaustif dans les Vues et Designs.

## [0.1.0-beta.45] - 2026-11-18

- Amélioration du retour visuel de l'Assistant Migration : indicateur de progression directement sur le bouton d'action, marquage en vert « Migré ! » sur chaque équipement au fil de l'eau et affichage d'un écran récapitulatif complet en fin de migration.

## [0.1.0-beta.44] - 2026-11-18

- Ajout d'un contrôle anti-perte et anti-orphelin en temps réel dans l'Assistant Migration : affichage pour chaque équipement et commande du nombre exact de points d'historique en base et des Scénarios / Virtuels / Vues / Designs / Résumés qui l'utilisent, auto-création préventive des commandes cibles manquantes et alerte visuelle si un élément utilisé ou historisé n'est pas associé.

## [0.1.0-beta.43] - 2026-11-18

- Ajout d'un « Assistant Migration » en 1 clic permettant d'associer automatiquement les équipements et commandes d'une ancienne installation Tydom vers `altTydom`, de mettre à jour tous les Scénarios, Virtuels, Vues, Designs et Résumés de pièces, de fusionner les historiques de courbes et de transférer la configuration Homebridge (sans supprimer les anciens équipements).

## [0.1.0-beta.42] - 2026-11-18

- Ajout d'un bouton « Mode association » (avec confirmation de sécurité) dans la barre d'actions de chaque équipement pour activer à distance le mode d'appairage radio X3D d'un module Delta Dore sans ouvrir le boîtier.

## [0.1.0-beta.41] - 2026-11-15

- Correction d'une erreur lors du démarrage du démon (`deamon_start`) et du rafraîchissement en arrière-plan du Dashboard.

## [0.1.0-beta.40] - 2026-11-15

- Prise en charge complète des sondes de température, d'hygrométrie, d'ensoleillement et météo Delta Dore (`sensorThermo`, `sensorThermoHygro`, `sensorHygro`, `sensorWeather`, `sensorSun`) avec migration automatique des sondes existantes, widget de mesure dédié et affichage de la température extérieure sur le Dashboard.

## [0.1.0-beta.39] - 2026-11-15

- Correction de l'affichage de la vue « Widgets » sur le Dashboard (pré-rendu immédiat des widgets avec feuille de style mutualisée et allègement de chaque widget).

## [0.1.0-beta.38] - 2026-11-15

- Rafraîchissement automatique instantané des tuiles de synthèse sur le Dashboard lors de toute action ou remontée d'état de la box Tydom.
- Rendu interactif du curseur de pourcentage (`0 %` à `100 %`, au pourcent près) directement sur les tuiles de synthèse des volets roulants, BSO, ouvrants motorisés et éclairages variateurs.
- Chargement rapide et progressif par lots de la vue « Widgets » avec mutualisation des styles d'affichage.

## [0.1.0-beta.37] - 2026-11-15

- Mise à jour automatique en temps réel des tuiles de synthèse, des compteurs globaux, des indicateurs de pièces et du tableau de supervision sur le Dashboard sans rechargement de la page.
- Accélération majeure de l'ouverture du Dashboard et réduction de la charge sur la box Jeedom (chargement à la demande de la vue des widgets complets et mise en cache mémoire des états).

## [0.1.0-beta.36] - 2026-11-14

- Mise à jour de la liste des plateformes compatibles sur le Jeedom Market (retrait de l'ancienne box Mini+).

## [0.1.0-beta.35] - 2026-11-14

- Traduction complète de l'interface du plugin en français et en anglais (`fr_FR` et `en_US`).

## [0.1.0-beta.34] - 2026-11-12

- Correction de l'affichage du widget Dashboard des volets roulants avec ouvrants associés (suppression du débordement du texte hors du cadre supérieur, alignement côte à côte des pastilles de vantaux et alignement sur une seule ligne des 5 boutons `0 %` à `100 %`).

## [0.1.0-beta.33] - 2026-11-12

- Correction de l'affichage du Dashboard Tydom sur petit écran (mobile et tablette) où les filtres « Familles Tydom » et « Pièces » se superposaient aux tuiles des appareils lors du défilement, et présentation des filtres sous forme de bandeaux horizontaux compacts.

## [0.1.0-beta.32] - 2026-11-11

- Désactivation par défaut de la création automatique des groupes matériels Tydom dans la configuration du plugin.

## [0.1.0-beta.31] - 2026-11-11

- Masquage par défaut des boutons de montée et descente lente sur les volets roulants monovitesse (activables uniquement sur option pour les moteurs Tymoov bi-vitesse).

## [0.1.0-beta.30] - 2026-11-11

- Prise en charge des groupes matériels Tydom (pilotage simultané sans décalage), de la surveillance de la liaison radio X3D, de la minuterie matérielle des éclairages, des tarifs Linky (HP/HC, Tempo, délestage) et consommations mensuelles, de la suspension des programmations horaires Tydom (Moments), du mode Maintenance Tyxal+ et de la détection automatique des capacités des volets (vitesse lente, BSO, sécurité thermique).

## [0.1.0-beta.29] - 2026-11-11

- Détection automatique des éclairages Marche / Arrêt (On/Off) par rapport aux variateurs (0–100 %) et adaptation de l'affichage des widgets.

## [0.1.0-beta.28] - 2026-11-11

- Affichage des éléments dans les différentes vues du Dashboard Tydom.

## [0.1.0-beta.27] - 2026-11-11

- Dashboard Global de Supervision dans le menu Accueil de Jeedom.

## [0.1.0-beta.26] - 2026-11-10

- Correction d'une erreur lors de l'enregistrement des équipements et commandes.

## [0.1.0-beta.25] - 2026-11-08

- Alignement de la vignette SVG combinée et arrondi des boutons sur les widgets combinés.

## [0.1.0-beta.24] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.23] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.22] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.21] - 2026-11-01

- Correction d'une erreur lors de l'enregistrement des équipements et commandes.

## [0.1.0-beta.20] - 2026-11-01

- Association & Fusion de composants Tydom - « Widgets Combinés ».

## [0.1.0-beta.19] - 2026-11-01

- Suppression des envois multiples de commandes et de la saccade au démarrage des volets roulants.

## [0.1.0-beta.18] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.17] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.16] - 2026-10-27

- Stabilité du menu déroulant du Journal Tyxal+ et redimensionnement du widget en Mode Édition.

## [0.1.0-beta.15] - 2026-10-27

- Journal multi-lignes déroulant pour l'Alarme Tyxal+.
- Accumulation ordonnée des événements /devices/cdata et décodage multi-trames HTTP-over-WebSocket.

## [0.1.0-beta.14] - 2026-10-27

- Ajout d'animations visuelles sur les boutons des widgets Dashboard et Mobile.

## [0.1.0-beta.13] - 2026-10-24

- Présélection automatique de l'option active dans les 3 menus déroulants CVC.
- Mise à jour immédiate de l'état CVC et redémarrage automatique du démon lors d'une modification du script.

## [0.1.0-beta.12] - 2026-10-23

- Sélection du mode actif et réactivité X3D des thermostats.

## [0.1.0-beta.11] - 2026-10-23

- Stabilité de l'affichage du statut CVC & correction de la détection d'écriture /devices/meta.

## [0.1.0-beta.10] - 2026-10-23

- Pilotage intelligent des Zones de Chauffage & Thermostats basé sur /devices/meta.

## [0.1.0-beta.9] - 2026-10-23

- Catégories d'usage Tydom pour les Thermostats & Chauffage et affichage contextuel des options.

## [0.1.0-beta.8] - 2026-10-23

- Famille dédiée « Détecteurs de fumée DAAF, Mouvement & Capteurs de sécurité » et Widget d'alerte dédié.

## [0.1.0-beta.7] - 2026-10-23

- Fermeture propre de la boucle d'événements à l'arrêt du démon.

## [0.1.0-beta.6] - 2026-10-23

- Enregistrement matériel des Positions Favorites dans le moteur Delta Dore.

## [0.1.0-beta.5] - 2026-10-23

- Personnalisation en pourcentage des Positions Favorites F1 et F2.
- Affichage conditionnel du bouton « Basculer lames BSO » et des commandes masquées sur les widgets.

## [0.1.0-beta.4] - 2026-10-23

- Erreur JavaScript à l'ouverture de la fiche d'un équipement sous Jeedom v4.4+.

## [0.1.0-beta.3] - 2026-10-23

- Timeout sur les callbacks initiaux configs_file et devices_data lors de la création massive d'équipements.

## [0.1.0-beta.2] - 2026-10-23

- Assistant ponctuel d'extraction du mot de passe local de la box Tydom.
- Accessibilité & Ergonomie des Formulaires et Widgets.

## [0.1.0-beta.1] - 2026-10-22

- Première version Beta publique.
- Moteur WebSocket TLS Temps Réel.
- Support complet des familles d'équipements Delta Dore, K-Line & Bel'M.
- Widgets Personnalisés « Dark Glass » Adaptatifs.
- Renforcement de la sécurité et mise en conformité pour le Jeedom Market.
