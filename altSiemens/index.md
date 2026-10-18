# Plugin Jeedom — Alt Siemens (`altSiemens`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Automatisme / Électroménager Connecté Local  

---

## Présentation

Le plugin **Alt Siemens** (`altSiemens`) permet de piloter en **100 % local** (sans dépendance au cloud ni limite de quota d'appels API) les appareils électroménagers **Siemens / BSH Home Connect** et tout particulièrement la machine à café expresso broyeur **Siemens EQ900** (`TQ903`, `TQ905`, `TQ907`...) ainsi que les séries **EQ700 / EQ.9**.

Comme le plugin `altCambridgeAudio`, il repose sur un démon Python asynchrone léger (`resources/altSiemensd.py`) qui maintient une connexion **WebSocket locale chiffrée** directement avec chaque appareil sur votre réseau local :
- **Mode AES-CBC + HMAC-SHA256** (`ws://<ip>:80/homeconnect`) — utilisé nativement par la **Siemens EQ900**
- **Mode TLS-PSK** (`wss://<ip>:443/homeconnect`) — utilisé par certains gros électroménagers BSH

---

## Fonctionnalités dédiées à la machine à café Siemens EQ900

1. **Alimentation & Statut Temps Réel** :
   - Allumer (`On`), Mise en veille (`Off` / `Standby`), Basculer (`power_toggle`)
   - Statut de fonctionnement temps réel (`Prêt`, `En cours`, `En veille`, `Action requise`, `Terminé`)
   - Progression en `%` et temps restant formaté
   - État de la porte et autorisation du démarrage à distance (`RemoteStartAllowed`)

2. **Catalogue complet des boissons (Specialty & CoffeeWorld)** :
   - *Espresso*, *Espresso Macchiato*, *Double Espresso (Doppio)*, *Ristretto*
   - *Caffè Crema*, *Americano*, *Verlängerter*, *Cafetière (Pot)*
   - *Cappuccino*, *Latte Macchiato*, *Café au lait*, *Flat White*, *Cortado*, *Wiener Melange*
   - *Mousse de lait*, *Lait chaud*, *Eau chaude*
   - Programmes d'entretien : *Rinçage rapide*, *Nettoyage système lait*, *calc'nClean*
   - Découverte dynamique de toutes les boissons supplémentaires présentes dans le profil XML de votre machine.

3. **Contrôles Barista (`baristaMode` & `DualBean`)** :
   - **Intensité du café (`BeanAmount`)** : *Très doux (1 grain)* à *Très fort (5 grains)*, *DoubleShot*, *DoubleShot+*, *DoubleShot++*, *TripleShot*
   - **Volume de la boisson (`FillQuantity`)** : Curseur de `20 ml` à `500 ml` + boutons rapides `-10 ml` / `+10 ml`
   - **Température d'infusion (`CoffeeTemperature`)** : `88 °C` à `96 °C` (*Normale*, *Élevée*, *Très élevée*)
   - **Sélection du bac à grains (`BeanContainerSelection`)** : *Bac à grains 1 (Gauche)* ou *Bac à grains 2 (Droite)* (spécifique EQ900 DualBean)
   - **Profil d'arôme / Vitesse d'extraction (`FlowRate`)** : *Standard*, *Intense*, *Intense+*
   - **Mode 2 Tasses (`MultipleBeverages`)** et **Chauffe-tasses (`CupWarmer`)**

4. **Capteurs d'alertes & Entretien** :
   - Alerte *Réservoir d'eau vide* (`water_tank_empty`)
   - Alerte *Bac à marc / égouttoir plein* (`drip_tray_full`)
   - Alerte *Bac à grains vide* (`bean_container_empty`)
   - Alerte *Réservoir de lait* (`milk_container_empty`)
   - Alertes *Détartrage requis* (`descaling_needed`) et *Nettoyage requis* (`cleaning_needed`)
   - Synthèse textuelle des alertes (`alert_message`)

5. **Support des autres appareils électroménagers Siemens** :
   - **Lave-vaisselle** (*Eco 50°C*, *Auto 45-65°C*, *Intensif 70°C*, *Express 60°C*, *Silence 50°C*...)
   - **Four** (*Chaleur tournante 4D*, *Convection naturelle*, *Position Pizza*...)
   - **Lave-linge & Sèche-linge** (*Coton*, *Eco 40-60*, *Synthétiques*, *Mix*, *Délicat/Soie*, *Laine*...)
   - **Réfrigérateur / Cave à vin / Hotte / Table de cuisson**

---

## Récupération unique des clés locales (Assistant intégré)

Pour dialoguer en local avec un appareil Siemens, ses clés de chiffrement locales (`PSK` et `IV`) ainsi que son profil XML (`_FeatureMapping.xml` et `_DeviceDescription.xml`) sont nécessaires. Le plugin propose **3 méthodes** au choix :

1. **Assistant intégré SingleKey ID (OAuth2 PKCE)** :
   - Depuis la page du plugin, cliquez sur **Assistant Clés Locales**.
   - Cliquez sur **1. Générer le lien de connexion SingleKey ID**, identifiez-vous et collez l'URL de redirection `hcauth://auth/prod?code=...`.
   - Le plugin télécharge automatiquement vos clés locales `PSK`/`IV` et les fichiers XML, puis crée vos équipements Siemens dans Jeedom.
2. **Import d'une archive `.zip` ou `.json`** :
   - Importez directement le fichier `.zip` généré par `homeconnect-profile-downloader` ou le fichier `devices.json` de `hcpy`.
3. **Saisie manuelle** :
   - Renseignez directement l'adresse IP, la clé `PSK` et le vecteur `IV` sur la fiche de l'équipement.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Pilotage 100 % local chiffré** : En fonctionnement normal, toutes les communications entre Jeedom et vos appareils Siemens / BSH s'effectuent directement sur votre réseau local via une session WebSocket chiffrée de bout en bout (**AES-CBC + HMAC-SHA256** sur le port `80` ou **TLS-PSK** sur le port `443`), sans aucune dépendance au cloud Home Connect.
- **Avis de confidentialité (Assistant SingleKey ID & Clés locales)** :
  - **Utilisation éphémère de SingleKey ID** : Si vous utilisez l'assistant intégré OAuth2 PKCE (Méthode 1), l'authentification s'effectue directement dans votre navigateur sur la page officielle SingleKey ID. Vos identifiants (adresse e-mail et mot de passe) ne sont jamais saisis dans Jeedom. Le code d'autorisation n'est utilisé qu'une seule fois en mémoire pour télécharger les clés locales (`PSK` / `IV`) et les descripteurs XML de vos appareils ; **aucun jeton d'accès Cloud (`access_token` / `refresh_token`) n'est conservé** par le plugin après cette opération.
  - **Stockage sécurisé des clés locales (`PSK` / `IV`)** : Les clés cryptographiques locales et les fichiers de profils ne servent qu'au chiffrement local avec vos appareils. Ils sont stockés exclusivement sur votre box Jeedom avec des permissions restreintes (`chmod 0600`), protégés contre tout accès HTTP direct par un fichier `.htaccess` (`Require all denied`), et transmis au démon via un fichier temporaire sécurisé (`chmod 0600`, supprimé à l'arrêt du démon).
  - Toutes ces données sont supprimées lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Mesures de sécurité réseau** :
  - Le démon écoute uniquement en local sur `127.0.0.1` (port `55089` par défaut) et vérifie la clé API interne Jeedom.
  - Attribuez un bail DHCP statique (IP fixe) à vos appareils Siemens sur votre routeur local et n'exposez jamais leurs ports `80`/`443` sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS, Siemens AG ni BSH Hausgeräte GmbH).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.

