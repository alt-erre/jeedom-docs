# Alt Transports & Mobilités Urbaines (`altTransit`)

Plugin Jeedom permettant de suivre en temps réel les **transports en commun urbains et régionaux** (**Métro, Tramway, TEOR / BHNS, Bus, RER, Train, Navettes fluviales, Funiculaires**) ainsi que les **stations de vélos en libre-service (`VLS` / `GBFS`)** par ville et métropole.

---

## 1. Fonctionnalités Principales

- **Couverture Nationale Sans Clé API (+350 Villes & Métropoles via `transport.data.gouv.fr`)** :
  - Interrogation directe du Point d'Accès National Open Data (Loi LOM) couvrant toutes les métropoles et agglomérations françaises en `GTFS` et `GTFS-RT` temps réel.
  - **Support complet et optimisé de la Métropole Rouen Normandie** :
    - **Réseau Astuce** : Métro (*Technopôle* / *Georges Braque* - *Boulingrin*), lignes **TEOR `T1` à `T4`**, lignes **FAST `F1` à `F9`**, **Noctambus** et l'ensemble des lignes régulières et scolaires multi-exploitants (**Transdev Rouen / TCAR**, **TAE Elbeuf** et **TNI**), avec fusion automatique des 3 flux `TripUpdates` et des `ServiceAlerts` d'info trafic.
    - **Lovélo Rouen (`GBFS`)** : disponibilité en temps réel des vélos électriques (`VAE`), vélos mécaniques et bornes d'attache libres par station.
  - **Métropoles françaises préconfigurées en 1 clic** : Rouen (*Astuce* & *Lovélo*), Caen (*Twisto*), Le Havre (*LiA*), Paris / Île-de-France (*PRIM* - Métro RATP, RER, Bus, Tram, Transilien), Bordeaux (*TBM*), Nantes (*Naolib*), Rennes (*STAR*), Lille (*Ilévia*), Marseille (*RTM*), Toulouse (*Tisséo*), Montpellier (*TaM*), Nice (*Lignes d'Azur*), Grenoble (*MTag*), Strasbourg (*CTS*), ainsi que la recherche libre sur les +350 réseaux de France et de **Suisse** (`transport.opendata.ch` : CFF, TPG Genève, TL Lausanne).
- **Assistant Interactif Ville / Métropole -> Arrêt -> Ligne & Direction** :
  - Recherche instantanée d'un arrêt ou d'une station avec affichage des **pastilles de lignes aux couleurs officielles** (`#RRGGBB`).
  - Suivi au choix d'une **ligne et direction précise** (ex. *Théâtre des Arts - Métro direction Technopôle*) ou d'un **panneau multimodal complet** regroupant toutes les lignes desservant l'arrêt.
- **Continuité Temps Réel + Horaires Théoriques** :
  - Croisement automatique entre les prédictions temps réel (`GTFS-RT` / `SIRI-Lite`) et l'index horaire local de l'arrêt : même tôt le matin avant le départ radio d'un bus, les prochains passages restent affichés avec distinction visuelle *Temps réel* vs *Horaire théorique*.
- **Annonces Vocales Domotiques (`tts_summary`)** :
  - Génération automatique d'une phrase naturelle prête à diffuser sur vos enceintes (`altSonos`, `altAirCast`, `altAirMedia`) ou par SMS/appel (`altCellular`), incluant les éventuelles perturbations en cours.
- **Widgets « Dark Glass » (`alt-erre` v1.4) & Kiosk TV (`altTvDashboard`)** :
  - Panneau voyageurs temps réel pour Dashboard et Mobile (9 thèmes de couleur, coloration optionnelle de la barre de titre selon la catégorie Jeedom `widgetCategoryHeader`).
  - Intégration native **10-Foot UI** (`getKioskWidgetData()`) dans **Alt Dashboard & Kiosk TV (`altTvDashboard`)** idéale sur un écran d'entrée ou un téléviseur *The Frame*.

---

## 2. Sobriété Matérielle (Jeedom Luna) & Cadence Intelligente

Le plugin est spécialement conçu pour préserver le processeur, les **2 Go de RAM** et la mémoire flash **eMMC** des box domotiques embarquées (**Jeedom Luna**, Atlas, Smart, Raspberry Pi) :

1. **Zéro démon résident (`0 Mo` de RAM au repos)** : fonctionnement par tâches planifiées légères (`cron`) sans processus permanent en arrière-plan.
2. **Double cadence Heures de Pointe / Hors Pointe & Pause Nocturne** :
   - **Heures de pointe** (ex. `06:45-09:15` et `16:30-19:30`) : actualisation toutes les **1 minute** pour un décompte précis avant de quitter le domicile.
   - **Journée / Heures creuses** : actualisation toutes les **15 minutes** (paramétrable).
   - **Pause nocturne** (ex. `01:15-05:15`, ajustable pour couvrir les lignes de nuit comme *Noctambus*) : suspension automatique des requêtes.
3. **Mutualisation Réseau & Indexation Locale Ciblée** :
   - Si plusieurs équipements suivent un même réseau (ex. 4 arrêts sur la Métropole Rouen Normandie), les flux temps réel `GTFS-RT` ne sont téléchargés **qu'une seule fois par cycle** et partagés en mémoire.
   - Lors de la configuration d'un arrêt, seuls les horaires de cet arrêt sont extraits dans un micro-fichier atomique (`data/stops/eq_<id>.json` < 100 Ko), puis l'archive `GTFS` complète est purgée de `/tmp/jeedom/altTransit` (plafond strict `< 2 Mo` en RAM `tmpfs`). Aucune écriture sur l'eMMC n'a lieu lors des rafraîchissements courants si l'état n'a pas changé.

---

## 3. Installation & Configuration Rapide (Exemple : Rouen - Réseau Astuce)

1. Installez et activez le plugin **Alt Transports & Mobilités Urbaines**, puis lancez l'installation des dépendances si nécessaire (le plugin dispose également d'un moteur de repli natif opérationnel immédiatement sous Python 3).
2. Ouvrez **Plugins -> Organisation -> Alt Transports & Mobilités Urbaines**, puis cliquez sur **Assistant Ville / Arrêt**.
3. **Étape 1 (Réseau)** : cliquez sur la puce rapide **Rouen - Réseau Astuce** (ou **Rouen - Lovélo (VLS)** pour une station de vélos, ou tapez le nom de toute autre ville française).
4. **Étape 2 (Arrêt)** : tapez le nom de votre station ou arrêt (ex. `Théâtre des Arts`, `Gare-Rue Verte`, `Palais de Justice`, `Hôtel de Ville de Sotteville`, `Technopôle`, `Champ de Courses`, `Elbeuf`...) et cliquez sur l'arrêt souhaité.
5. **Étape 3 (Ligne & Direction)** : choisissez soit **Panneau multimodal (toutes les lignes)**, soit une ligne et un sens précis (ex. `[M] Métro -> Direction Technopôle` ou `[T1] TEOR / BHNS -> Direction Mont-aux-Malades`), puis cliquez sur **Configurer, Indexer localement & Synchroniser**.

> **Cas particulier Île-de-France (`PRIM`) :** Créez gratuitement un compte sur [prim.iledefrance-mobilites.fr](https://prim.iledefrance-mobilites.fr) pour obtenir votre clé API personnelle gratuite et collez-la dans le champ sécurisé de l'Assistant.

---

## 4. Commandes Disponibles par Équipement

| Commande (`logicalId`) | Type | Description |
| :--- | :---: | :--- |
| `refresh` | `action / other` | Actualise immédiatement les passages et l'état du trafic |
| `online` | `info / binary` | État de joignabilité de la source Open Data (`1` = OK, `0` = erreur) |
| `last_sync` | `info / string` | Heure de la dernière actualisation (`HH:MM:SS`) |
| `network_name` | `info / string` | Nom du réseau ou de la métropole |
| `stop_name` | `info / string` | Nom de l'arrêt ou de la station VLS |
| `transport_mode` | `info / string` | Mode (`Métro`, `TEOR / BHNS`, `Tramway`, `Bus`, `Vélos Libre-Service`...) |
| `line_badge` | `info / string` | Indice court de la ligne (`M`, `T1`, `F2`, `VLS`...) |
| `next_1_min` | `info / numeric` | Délai avant le prochain passage en minutes (`0` = à l'approche, `-1` = fin de service) |
| `next_1_time` | `info / string` | Heure estimée du prochain passage (`HH:MM`) |
| `next_1_destination` | `info / string` | Direction / Terminus du prochain passage |
| `next_1_line` | `info / string` | Ligne du prochain passage |
| `next_1_realtime` | `info / binary` | `1` si calculé en temps réel GPS/SAE, `0` si horaire théorique |
| `next_1_delay_min` | `info / numeric` | Écart en minutes par rapport à l'horaire théorique |
| `next_1_human` | `info / string` | Texte court prêt pour affichage (`À l'approche`, `4 min`, `Fin de service`) |
| `next_2_min` / `next_2_time` / `next_2_destination` | `info` | Délai, heure et direction du 2e passage |
| `next_3_min` / `next_3_time` | `info` | Délai et heure du 3e passage |
| `traffic_status` | `info / string` | État du trafic (`Normal`, `Info trafic`, `Perturbé` ou état station VLS) |
| `disruption_active` | `info / binary` | `1` lorsqu'une perturbation ou alerte est active sur la ligne / l'arrêt |
| `alerts_count` / `last_alert_title` | `info` | Nombre d'alertes actives et intitulé de la principale alerte |
| `bikes_available` / `ebikes_available` / `mechanical_bikes` / `docks_available` | `info / numeric` | Disponibilité temps réel pour les stations VLS (`GBFS` : Lovélo, Vélib'...) |
| `tts_summary` | `info / string` | Phrase vocale complète prête à diffuser en TTS dans un scénario Jeedom |

### Exemple de Scénario Domotique (Briefing Matinal TTS)

- **Déclencheur programmé** : `07:25` du lundi au vendredi (`1..5`).
- **Action** : diffuser `#[Entrée][Théâtre des Arts (M -> Technopôle)][Résumé vocal (TTS)]#` sur votre enceinte `altSonos` ou `altAirCast`, et allumer un bandeau LED `altHue` en orange si `#[Entrée][Théâtre des Arts (M -> Technopôle)][Perturbation en cours]# == 1`.

---

## 5. Confidentialité, Protection des Données & Mesures de Sécurité

- **Traitement 100 % direct entre votre box Jeedom et les portails Open Data officiels** : aucune donnée de trajet, d'arrêt favori ou d'adresse n'est transmise à un serveur tiers de l'auteur. Votre box Jeedom interroge directement `transport.data.gouv.fr`, les flux `GTFS` / `GTFS-RT` / `GBFS` des collectivités locales, `prim.iledefrance-mobilites.fr` ou `transport.opendata.ch` en HTTPS.
- **Protection stricte des clés API optionnelles** : lorsqu'un portail régional requiert une clé API personnelle gratuite (ex. portail `PRIM` Île-de-France Mobilités), celle-ci est enregistrée exclusivement dans un fichier local isolé (`plugins/altTransit/data/profiles/eq_<id>.json`) protégé par des permissions POSIX `0600` et un fichier Apache `.htaccess` (`Require all denied`).
- **Zéro secret en ligne de commande ni dans les journaux** : les échanges entre PHP et le moteur Python transitent uniquement par un fichier éphémère en RAM (`tmpfs`, permissions `0600`) immédiatement détruit après exécution. Aucune clé n'apparaît jamais dans `ps aux` ni dans les logs Jeedom.
- **Respect des licences Open Data** : les horaires, prédictions temps réel et alertes demeurent la propriété des Autorités Organisatrices de la Mobilité (AOM) et opérateurs publics respectifs, attribués automatiquement dans l'interface du widget conformément à la Licence Ouverte Etalab 2.0, l'ODbL et la Licence Mobilité.

---

## 6. Support & Licence

- **Documentation en ligne** : [https://alt-erre.github.io/jeedom-docs/altTransit/](https://alt-erre.github.io/jeedom-docs/altTransit/)
- **Changelog** : [https://alt-erre.github.io/jeedom-docs/altTransit/changelog](https://alt-erre.github.io/jeedom-docs/altTransit/changelog)
- **Tickets & Support** : [https://github.com/alt-erre/jeedom-docs/issues](https://github.com/alt-erre/jeedom-docs/issues)
- **Auteur** : Aurélien Léovant (`alt-erre`) - Licence `Propriétaire - Tous droits réservés` (réinstallations illimitées sur les équipements de l'acheteur conformément aux CGU du Jeedom Market).
