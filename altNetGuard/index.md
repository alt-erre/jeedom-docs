# Alt Radar & Sécurité Réseau — Plugin Jeedom (`altNetGuard`)

**Alt Radar & Sécurité Réseau** (`altNetGuard`) est un plugin Jeedom de **surveillance, d'identification et de sécurité réseau 100 % Local LAN (Zéro Cloud)** vous permettant de :
- **Détecter en temps réel tous les appareils connectés** à votre réseau local (Wi-Fi & Ethernet) grâce à un moteur hybride combinant **table ARP / Neighbor OS**, **Ping Sweep asynchrone**, **mDNS / Bonjour (`.local`)**, **UPnP / SSDP** et **NetBIOS / Reverse DNS**.
- **Recevoir une alerte immédiate à chaque connexion d'un appareil inconnu** sur votre réseau (commande binaire `security_alert`, exécution d'une commande de notification Jeedom Mobile / Telegram / Mail / Discord / TTS avec variables enrichies `#ip#`, `#mac#`, `#vendor#`, `#hostname#`, `#type#`, `#ports#`, et Centre de Messages Jeedom).
- **Lancer des actions d'investigation active en 1 clic sur tout appareil inconnu** afin de l'identifier immédiatement :
  - Résolution hors-ligne du **constructeur matériel (base IEEE OUI)**.
  - **Scan rapide des 34 ports TCP clés** (`80`, `443`, `22`, `445`, `554` RTSP, `1400` Sonos, `5000/5001` Synology, `8008/8009` Cast, `8080/8443`, `9100` Imprimante, `62078` iOS Lockdown...).
  - **Capture du titre HTTP/HTTPS (`<title>` & `Server:`) et de la bannière SSH** + lien d'ouverture directe de l'interface Web de l'appareil.
  - **Détection des adresses MAC privées / aléatoires** (*Locally Administered Address* d'iOS, iPadOS, Android et Windows) avec corrélation intelligente par `Hostname`.
  - **Fingerprinting automatique** de la catégorie d'appareil (*Smartphone*, *Tablette*, *TV / Vidéoprojecteur*, *Enceinte*, *Console*, *Caméra IP*, *Serrure*, *Éclairage*, *NAS / Serveur*, *Ordinateur*, *Imprimante*, *Robot / Électroménager*, *IoT*, *Routeur*).
- **Qualifier chaque appareil détecté en 1 clic** :
  - **Déclarer Connu (Approuvé)** : crée automatiquement son équipement Jeedom individuel dédié pour suivre sa présence (`online`), son adresse IPv4, sa latence Ping (`ms`), ses ports ouverts et le réveiller par **Wake-on-LAN (Magic Packet)**.
  - **Autoriser en Invité temporaire (24h)** : suspend les alertes d'intrusion pour cet appareil pendant 24 heures avant réévaluation automatique.
  - **Ignorer** : exclut l'adresse MAC des notifications tout en conservant sa trace dans l'inventaire.
- **Synchroniser automatiquement les changements d'IP DHCP (Pont IP)** : lorsqu'un appareil connu change d'adresse IPv4 sur votre routeur, le plugin le reconnaît grâce à son adresse MAC et met à jour automatiquement l'adresse IP dans la configuration des équipements Jeedom associés.

---

## 1. Architecture Hybride à 2 Niveaux d'Équipements

1. **Équipement global « Radar & Sécurité Réseau » (`netguard_radar_main`)** :
   - Créé automatiquement dès l'installation du plugin.
   - Centralise les compteurs temps réel (`total_online`, `known_online`, `known_offline`, `unknown_online`, `unknown_total`, `guest_online`), l'état d'alerte (`security_alert`), les informations de la dernière intrusion (`last_intrusion_ip`, `last_intrusion_mac`, `last_intrusion_vendor`, `last_intrusion_hostname`, `last_intrusion_time`, `last_intrusion_summary`) et la liste interactive des appareils inconnus.
   - Permet de piloter le mode de surveillance par scénario Jeedom (`alert_mode_set` : *Intelligent*, *Strict*, *Sentinelle Critique Nuit*, *Silencieux*), de lancer un `Scan Rapide` ou un `Scan Ports & Services` et d'acquitter les alertes (`ack_alerts`).

2. **Équipements individuels « Appareil Réseau Connu » (`netguard_dev_<MAC>`)** :
   - Créés en 1 clic depuis le **Centre de Contrôle Radar LAN** ou directement depuis le **Widget Dashboard**.
   - Fournissent les commandes `online` (présence binaire historisable), `status`, `ip`, `mac`, `vendor`, `hostname`, `device_type_label`, `latency_ms`, `open_ports`, `http_banner`, `last_seen`, `ip_changed`, `is_random_mac`, ainsi que les actions **Wake-on-LAN (`wol`)**, **Ping (`refresh`)**, **Scanner Ports (`probe_ports`)** et **Synchroniser Ponts IP (`sync_ip_bridges`)**.

---

## 2. Centre de Contrôle des Appareils Inconnus & Outils d'Investigation

Accessible directement en haut de la page du plugin (`Plugins > Sécurité > Alt Radar & Sécurité Réseau`), le **Centre de Contrôle Radar LAN** regroupe 4 onglets temps réel :
- **Appareils Inconnus à Identifier** : affiche chaque appareil non reconnu avec ses badges (`En ligne / Hors-ligne`, `MAC Privée` si MAC aléatoire), son IP, son constructeur OUI, son nom mDNS/NetBIOS, ses ports TCP cliquables et sa bannière Web/SSH, accompagné des boutons **`🔍 Identifier`**, **`🏓 Ping`**, **`✅ Connu`**, **`🕒 Invité 24h`** et **`🔕 Ignorer`**.
- **Appareils Connus** : vue tabulaire complète de votre parc approuvé avec actions rapides Wake-on-LAN, Ping et inspection des ports.
- **Invités (24h) & Ignorés** : gestion des autorisations temporaires et des exclusions.
- **Journal des Alertes d'Intrusion** : historique horodaté des 60 dernières détections d'appareils inconnus.

---

## 3. Widgets Personnalisés « Dark Glass » & Compatibilité Kiosk TV (`altTvDashboard`)

- **Widgets Dashboard & Mobile « Dark Glass » (`alt-erre` v1.2)** :
  - Supportent les **9 thèmes de couleur** (*Noir / Dark Glass*, *Blanc / Light Glass*, *Bleu Profond*, *Cyan / Turquoise*, *Vert Émeraude*, *Ambre / Or*, *Orange / Cuivré*, *Rouge / Carmin*, *Violet / Améthyste*).
  - Le widget **Radar** intègre directement la liste déroulante des appareils inconnus avec boutons d'action rapides (`🔍 Identifier`, `✅ Connu`, `🕒 Invité 24h`) sans même quitter votre Dashboard.
- **Compatibilité Kiosk TV 10-Foot (`altTvDashboard`)** :
  - Implémente nativement `getKioskWidgetData()` pour un affichage et un pilotage à la télécommande TV dans la catégorie *Sécurité & Accès*.

---

## 4. Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux Conditions Générales d'Utilisation du Jeedom Market :
- **Fonctionnement 100 % Local (Zéro Cloud)** : L'intégralité des scans ARP, Ping, mDNS, UPnP/SSDP, NetBIOS, des analyses de ports TCP et de la résolution OUI s'effectue exclusivement en local sur votre réseau privé. Aucune adresse IP, adresse MAC ni topologie réseau n'est transmise vers Internet.
- **Protection absolue des secrets (Zéro secret dans `ps aux`)** : La clé API interne Jeedom n'est **jamais** passée en argument de ligne de commande (`ps aux`) ni affichée dans les logs. Elle est transmise au démon Python via le fichier temporaire `/tmp/jeedom/altNetGuard/daemon_config.json` verrouillé avec les permissions `0600` et supprimé automatiquement à l'arrêt du démon (`@unlink`).
- **Protection des inventaires locaux** : Les fichiers d'inventaire (`data/inventory/`) et de cache (`data/cache/`) sont protégés contre tout accès HTTP direct par un fichier `.htaccess` (`Require all denied`) et des droits `0600`.
- **Isolation technique & Licences permissives** : Le plugin n'écrit aucun fichier en dehors de son répertoire, de `/tmp/jeedom/altNetGuard` et de ses propres journaux Jeedom, et utilise uniquement un environnement virtuel Python isolé (`resources/venv`) composé de bibliothèques sous licences permissives compatibles (`aiohttp`, `requests`, `certifi`).

---

## 5. Licence & Mentions Légales

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Licence** : Propriétaire — Tous droits réservés (réinstallations illimitées sur les propres équipements de l'acheteur conformément aux CGU du Jeedom Market).
- **Non-affiliation** : Ce plugin est une création originale et indépendante. Il n'est ni affilié, ni approuvé, ni édité par Jeedom SAS ou les constructeurs tiers mentionnés. Les marques citées appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement à titre de référence de compatibilité nécessaire (Art. L.713-6 CPI).
