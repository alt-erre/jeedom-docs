# Plugin Jeedom — Alt Roborock (`altRoborock`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Automatisme / Robot Aspirateur & Laveur Connecté Local  

---

## Présentation

Le plugin **Alt Roborock** (`altRoborock`) permet de piloter en **100 % local** (sans dépendance au cloud ni limite de quota d'appels API en fonctionnement quotidien) les robots aspirateurs et laveurs **Roborock** et tout particulièrement :
- **Roborock S7 / S7+ / S7 MaxV / S7 MaxV Ultra / S7 Pro Ultra** (`roborock.vacuum.a15`, `a27`, `a62`, `a65`)
- **Roborock Qrevo Curv / Qrevo Edge / Qrevo Master / Qrevo Pro / Qrevo MaxV / Qrevo S** (`roborock.vacuum.a135`, `a134`, `a117`, `a104`, `a101`, `a75`)
- **Roborock S8 / S8 Pro Ultra / S8 MaxV Ultra** (`roborock.vacuum.a51`, `a70`, `a97`) ainsi que les séries **S5 Max, S6, Q5, Q7 Max, Q8 Max**.

Comme les plugins `altCambridgeAudio` et `altSiemens`, il repose sur un démon Python asynchrone léger (`resources/altRoborockd.py`) qui maintient une connexion **TCP locale chiffrée sur le port `58867`** directement avec chaque robot sur votre réseau local, en supportant nativement les deux générations de protocole local Roborock :
- **Protocole `1.0` (AES-128-ECB + CRC32)** — utilisé nativement par le **Roborock S7**, S5 Max, S6, Q7 Max…
- **Protocole `L01` (AES-256-GCM + Handshake `connect_nonce` / `ack_nonce` + CRC32)** — utilisé nativement par le **Roborock Qrevo Curv**, Qrevo Master, Qrevo Slim, S8 MaxV Ultra…
- **Négociation automatique (`auto`)** : bascule transparente entre `L01` et `1.0` selon le modèle et la réponse du robot.

---

## Fonctionnalités dédiées aux Roborock S7 & Roborock Qrevo Curv

1. **Pilotage & Statut Temps Réel (`get_status`)** :
   - Démarrer (`start`), Pause (`pause`), Reprendre (`resume`), Arrêter (`stop`), Retour à la station (`charge`), Nettoyage localisé (`spot`), Localiser le robot (`find_me`)
   - État détaillé temps réel (*En charge*, *Nettoyage en cours*, *Nettoyage de pièce(s)*, *Vidange du bac à poussière*, *Lavage des serpillères*, *Séchage à l'air chaud*, *Retour à la station*…)
   - Niveau de batterie (`%`), surface nettoyée (`m²`), durée de session (`min`), code et message d'erreur détaillés

2. **Aspiration, Lavage VibraRise (S7) & Double Serpillère Rotative / SmartPlan IA (Qrevo Curv)** :
   - **Puissance d'aspiration (`fan_power`)** : *Silencieux (101)*, *Équilibré (102)*, *Turbo (103)*, *Max (104)*, *Désactivé / Lavage seul (105)*, *Personnalisé (106)*, ainsi que ***Max+ 18 500 Pa (108)*** et ***SmartPlan IA (110)*** sur **Qrevo Curv**
   - **Débit d'eau (`water_box_mode`)** : *Désactivé (200)*, *Faible (201)*, *Moyen (202)*, *Intense (203)*, *Personnalisé (204)*, *Débit sur mesure (207)* et ***SmartPlan IA (209)***
   - **Débit d'eau fin (`water_flow_custom`)** : Curseur de `1` à `30` pour le dosage précis des serpillères rotatives du **Qrevo Curv**
   - **Parcours de nettoyage (`mop_mode`)** : *Standard (300)*, *Approfondi / Deep (301)*, *Approfondi+ / Deep+ (303)*, *Rapide / Fast (304)*, *SmartPlan IA (306)*
   - **Gestion des tapis** : *Boost Tapis Auto* (`carpet_boost`) et *Comportement sur tapis* (`carpet_clean_mode` : *Éviter*, *Soulever les serpillères (VibraRise / Lift)*, *Ignorer*)

3. **Station Multifonction 3.0 (Qrevo Curv) & Station d'Auto-Vidange (S7+)** :
   - **Vidange automatique du bac à poussière** : Démarrer (`dock_empty_dust`) / Arrêter (`dock_stop_empty`)
   - **Lavage des serpillères à l'eau chaude (75 °C sur Qrevo Curv)** : Démarrer (`dock_wash_mop`) / Arrêter (`dock_stop_wash`)
   - **Séchage à l'air chaud (45 °C)** : Démarrer (`dock_start_dry`), Arrêter (`dock_stop_dry`), état du séchage (`drying_status`) et durée restante
   - **Diagnostic des réservoirs de la station (`dss`)** : Détection du type de station (`dock_type`), état du réservoir d'eau propre, du réservoir d'eau sale et du sac à poussière (`dock_status`)

4. **Nettoyage par Pièces (Segments), Zones & Multi-Cartes (Étages)** :
   - Découverte automatique des pièces (`get_room_mapping`) et association avec les noms de pièces de votre domicile
   - Sélection directe d'une ou plusieurs pièces depuis le widget Dashboard ou par scénario (`clean_rooms` avec répétition `1x`, `2x` ou `3x`)
   - Commandes avancées pour scénarios : Nettoyage de zone par coordonnées (`clean_zone`) et Aller au point cible (`goto_target`)
   - Gestion jusqu'à **4 cartes / étages** (`get_multi_maps_list`, sélecteur `map_select`)

5. **Consommables, Historique & Confort** :
   - Pourcentage d'usure restant et boutons de remise à zéro (`reset_*`) pour : *Brosse principale (300 h)*, *Brosse latérale (200 h)*, *Filtre lavable (150 h)*, *Capteurs (30 h)*
   - Historique cumulé : *Surface totale (`m²`)*, *Temps total (`h`)*, *Nombre total de cycles*
   - *Volume vocal (`0-100 %`)*, *Sécurité enfant (`child_lock`)*, *Mode Ne Pas Déranger (`dnd`)*, *LED d'état (`led_status`)*

---

## Récupération unique des clés locales (`localKey`) & Découverte LAN

Pour dialoguer en local sur le port TCP `58867`, chaque robot Roborock nécessite son identifiant unique (`DUID`) et sa clé de chiffrement locale de 16 caractères (`localKey`). Le plugin propose **3 méthodes** au choix :

1. **Assistant Roborock Cloud (1x — Code e-mail OTP ou Mot de passe)** :
   - Depuis la page du plugin, cliquez sur **Assistant Clés Locales**.
   - Saisissez l'adresse e-mail de votre compte Roborock, cliquez sur **1. Recevoir un code par e-mail**, puis saisissez le code à 6 chiffres reçu et cliquez sur **2. Récupérer mes robots & clés locales**.
   - Le plugin récupère automatiquement vos robots (`DUID`, `localKey`, modèle, firmware, protocole `1.0` ou `L01` et noms des pièces), les associe aux adresses IP détectées sur votre réseau local (broadcast UDP `58866` + sonde TCP `58867`) et crée les équipements dans Jeedom.
2. **Import JSON hors-ligne** :
   - Collez un export JSON contenant vos appareils (`duid`, `localKey`, `name`, `model`, `ip`, `rooms`).
3. **Saisie manuelle** :
   - Créez un équipement avec **Ajouter un robot** et renseignez directement son **Adresse IP**, son **DUID** et sa **Clé locale (`localKey`)**.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Pilotage 100 % local chiffré** : En fonctionnement normal, toutes les communications entre Jeedom et vos robots Roborock s'effectuent directement sur votre réseau local via le port TCP `58867` chiffré en **AES-128-ECB** (Protocole `1.0`) ou **AES-256-GCM** (Protocole `L01`), sans aucune dépendance au cloud Roborock.
- **Avis de confidentialité (Assistant Roborock Cloud & Clés locales)** :
  - **Utilisation éphémère de l'Assistant Cloud** : Si vous utilisez l'assistant intégré pour récupérer vos clés locales (`localKey`), votre code de vérification à usage unique (OTP) ou votre mot de passe est transmis au script local via un fichier temporaire protégé (`chmod 0600`) immédiatement détruit après lecture (`@unlink`). Il n'est **jamais** passé en argument de ligne de commande (`ps aux`) ni enregistré dans les logs ou la base de données Jeedom. **Aucun jeton d'authentification Cloud (`token` / `rriot`) n'est conservé** après l'importation des équipements.
  - **Stockage sécurisé des clés locales (`localKey`)** : Les clés locales de 16 caractères ne servent qu'au chiffrement local LAN avec vos robots. Elles sont stockées dans la configuration de l'équipement Jeedom, masquées dans l'interface et les logs, et transmises au démon Python via un fichier temporaire sécurisé dans `jeedom::getTmpFolder('altRoborock')` (`chmod 0600`, supprimé dès l'arrêt du démon). Tout répertoire interne de profils (`data/profiles/`) est protégé contre l'accès HTTP direct par un fichier `.htaccess` (`Require all denied`).
  - Toutes ces données sont supprimées lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Mesures de sécurité réseau** :
  - Le démon écoute uniquement en local sur `127.0.0.1` (port `55093` par défaut) et vérifie systématiquement la clé API interne Jeedom (`jeedom::apiAccess`).
  - Attribuez un bail DHCP statique (IP fixe) à vos robots Roborock sur votre routeur local et n'exposez jamais les ports `58866` / `58867` de vos robots sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Beijing Roborock Technology Co., Ltd.).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
