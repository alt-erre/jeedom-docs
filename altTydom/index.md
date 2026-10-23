# Alt Habitat & Domotique (Delta Dore Tydom) — Plugin Jeedom (`altTydom`)

**Alt Habitat & Domotique (Delta Dore Tydom)** (`altTydom`) est un plugin Jeedom de nouvelle génération permettant de piloter et de superviser en **temps réel** l'intégralité de vos équipements domotiques **Delta Dore** et partenaires (**K-Line**, **Bel'M**) connectés à une passerelle **Tydom 1.0**, **Tydom 2.0**, **Tydom Home**, **Tydom Pro** ou **Tywell**.

Conçu **100 % en Python 3 natif asynchrone** (sans aucun binaire `.NET` lourd ni dépendance propriétaire externe), il maintient un tunnel **WebSocket TLS permanent (port 443, authentification HTTP Digest RFC 2617)** directement sur votre réseau local (**100 % Local LAN, Zéro Cloud**) ou à distance via le serveur de médiation Delta Dore (`mediation.tydom.com`).

---

## 1. Passerelles & Équipements Compatibles

### Passerelles supportées
- **Delta Dore Tydom 1.0** & **Tydom 2.0**
- **Delta Dore Tydom Home** & **Tydom Pro**
- **Delta Dore Tywell Home** & **Tywell Pro**

### Familles d'équipements pilotées et supervisées en temps réel
1. **Volets roulants, Brise-Soleil Orientables (BSO), Volets battants & Stores (`shutter`, `klineShutter`, `swingShutter`, `awning`, `bso`)** :
   - Positionnement proportionnel au pourcentage près (`0` à `100 %`, avec option d'inversion globale ou par équipement).
   - Commandes directes : *Monter*, *Stop*, *Descendre*, *Montée lente*, *Descente lente*, *Position Favorite 1*, *Position Favorite 2*.
   - Gestion de l'inclinaison des lames de Brise-Soleil Orientable (`slope` `0–100 %` et bascule `slope_toggle`).
   - Remontée des défauts : obstacle sur la course (`obstacle_defect`), protection thermique (`thermic_defect`), pile faible (`batt_defect`) et détection d'intrusion (`intrusion_detect`).
2. **Portes d'entrée (K-Line / Bel'M), Portails & Portes de garage (`door`, `klineDoor`, `belmDoor`, `gate`, `garage_door`)** :
   - État d'ouverture et de verrouillage en temps réel (`open_state` binaire, `open_state_raw` `LOCKED` / `UNLOCKED` / `OPENED` / `CLOSED`).
   - Commandes : *Ouvrir*, *Stop*, *Fermer*, *Impulsion / Basculer (`TOGGLE`)*, *Ouverture piéton / Favori 1* et positionnement `0–100 %`.
3. **Fenêtres & Baies vitrées K-Line / Détecteurs d'ouverture (`window`, `windowFrench`, `klineWindowFrench`, `klineWindowSliding`, `klineWindowOthers`)** :
   - Suivi d'ouverture battante, coulissante et oscillo-battante (`open_state`, `pod_position`, `intrusion_detect`, `batt_defect`) et pilotage des ouvrants motorisés.
4. **Éclairages, Variateurs & Prises connectées (`light`, `plug`, `toggle`)** :
   - Commande *Allumer*, *Éteindre*, *Basculer (Toggle)*, variation d'intensité lumineuse (`0–100 %`), ambiances *Favori 1 / 2*.
   - Remontée de la puissance instantanée (`W`) et de la consommation cumulée (`Wh` / `kWh`) sur les prises gigognes et micromodules mesureurs.
5. **Chauffage Électrique Fil Pilote, Chaudières, PAC & Thermostats Tybox / Tywell (`hvac-electric`, `hvac-boiler`, `thermostat`)** :
   - Température ambiante (`°C`), température extérieure (`°C`), hygrométrie (`%`) et température d'eau chaude sanitaire (`°C`).
   - Réglage de la température de consigne (`5` à `30 °C` par pas de `0,5 °C` + boutons rapides `-0,5 °C` / `+0,5 °C`).
   - Sélection du mode CVC (`NORMAL`, `COMFORT`, `ECO`, `ANTI_FROST`, `STOP`), du niveau thermique Fil Pilote (`COMFORT`, `ECO`, `ANTI_FROST`, `STOP`, `ABSENCE`), de l'autorisation chaudière (`HEATING`, `STOP`, `COOLING`) et du mode *Boost*.
6. **Centrale d'Alarme Tyxal+ & Détecteurs de sécurité (`alarm`, `motion`, `smoke`)** :
   - État d'armement global, déclenchement d'intrusion, autoprotection (sabotage), coupure secteur, défaut batterie/GSM et ouvrants restés ouverts (`open_issues`).
   - Suivi individuel et pilotage des **8 zones (`Zone 1` à `Zone 8`)** ainsi que de la *Marche Totale (`ON`)* et de l'*Arrêt (`OFF`)* sécurisés par code PIN.
   - Traduction automatique en français clair du **journal d'événements Tyxal+ (`histo`)**.
   - Détecteurs de mouvement (présence, température, luminosité) et détecteurs de fumée DAAF (`smoke_defect`).
7. **Suivi Énergétique Tywatt / Linky TIC & Solaire (`conso`, `solar`)** :
   - Puissance / intensité instantanée et index détaillés par poste (*Total Électricité*, *Chauffage*, *Eau Chaude Sanitaire*, *Prises*, *Autres usages*, *Gaz*, *Ensoleillement W/m²*).
8. **Scénarios programmés dans la box Tydom (`scenario`)** :
   - Création automatique d'un équipement par scénario Tydom + sélecteur rapide de scénarios intégré à l'équipement *Passerelle Tydom*.

---

## 2. Configuration & Découverte Automatique

1. Installez le plugin **Alt Habitat & Domotique (Delta Dore Tydom)** dans Jeedom et lancez l'installation des **Dépendances**.
2. Sur la page de configuration du plugin :
   - Choisissez le **Mode de connexion** : **Local LAN (Recommandé, Zéro Cloud)** ou **Distant (`mediation.tydom.com`)**.
   - Cliquez sur le bouton **Découvrir sur le LAN** pour détecter automatiquement l'adresse IP et l'adresse MAC (`00:1A:25:...`) de votre box Tydom, ou saisissez-les manuellement.
   - Renseignez le **Mot de passe de connexion Tydom** de votre box, ou cliquez sur le bouton **🔑 Récupérer via compte Delta Dore** pour extraire automatiquement en 1 clic le mot de passe technique local de votre box à partir de votre compte de l'application mobile Tydom (sans qu'aucun identifiant ni jeton Cloud ne soit conservé par le plugin). Renseignez optionnellement le **Code PIN de l'alarme Tyxal+**.
   - Sauvegardez : le démon Python démarre et ouvre immédiatement la session WebSocket TLS avec votre box Tydom.
3. Rendez-vous dans **Plugins → Protocole domotique → Alt Habitat & Domotique (Delta Dore Tydom)** puis cliquez sur **Synchroniser Tydom** : tous vos équipements, commandes et états remontent automatiquement !

---

## 3. Widget Personnalisé « Dark Glass » Adaptatif

Chaque équipement bénéficie du widget signature **Dark Glass `alt-erre`** (avec 5 thèmes de couleur : *Noir / Sombre*, *Blanc / Clair*, *Bleu Profond*, *Ambre / Or*, *Rouge / Carmin*, ou bascule vers les widgets standards Jeedom Core v4) qui adapte automatiquement son interface et sa vignette vectorielle SVG temps réel à la nature de l'équipement (*Volet*, *Portail/Ouvrant*, *Éclairage/Prise*, *Chauffage/Thermostat*, *Alarme Tyxal+*, *Compteur d'énergie*, *Passerelle Box* ou *Scénario*).

---

## 4. Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux Conditions Générales d'Utilisation du Jeedom Market :
- **Fonctionnement 100 % Local privilégié** : En mode *Local LAN*, toutes les communications s'effectuent directement sur votre réseau local entre Jeedom et votre box Tydom via un tunnel WebSocket chiffré TLS (`wss://<IP_LOCALE>:443`), sans transiter par Internet.
- **Assistant ponctuel d'extraction du mot de passe de box (Zéro conservation Cloud)** : Si vous utilisez l'assistant *« Récupérer via compte Delta Dore »* pour extraire le mot de passe technique local de votre passerelle Tydom, votre adresse e-mail, le mot de passe de votre compte Delta Dore et le jeton OAuth2 éphémère sont utilisés exclusivement en mémoire le temps de la requête d'extraction et sont immédiatement détruits (ils ne sont jamais enregistrés en base de données ni dans les journaux Jeedom).
- **Protection stricte des secrets (Zéro secret dans `ps aux`)** : Le mot de passe Tydom, le code PIN de l'alarme Tyxal+ et la clé API interne Jeedom ne sont **jamais** passés en argument de ligne de commande ni inscrits en clair dans les journaux (`logs`). Ils sont transmis au démon Python via le fichier éphémère `/tmp/jeedom/altTydom/daemon_config.json` verrouillé avec les permissions strictes `0600` et supprimé automatiquement à l'arrêt du démon.
- **Isolation technique** : Le plugin n'écrit aucun fichier en dehors de son répertoire, de `/tmp/jeedom/altTydom` et de ses propres journaux Jeedom, et utilise uniquement un environnement virtuel Python isolé (`resources/venv`) composé de bibliothèques sous licences permissives compatibles.
- **Recommandations réseau** : Attribuez un bail DHCP fixe à votre box Tydom sur votre routeur local et conservez un code PIN dédié pour le pilotage éventuel de votre centrale d'alarme Tyxal+.

---

## 5. Licence & Mentions Légales

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Licence** : Propriétaire — Tous droits réservés (réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Non-affiliation** : Ce plugin est une création originale et indépendante. Il n'est ni affilié, ni approuvé, ni édité par Jeedom SAS, Delta Dore SAS, K-Line ou Bel'M. Les marques citées appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement à titre de référence de compatibilité nécessaire (Art. L.713-6 CPI).
