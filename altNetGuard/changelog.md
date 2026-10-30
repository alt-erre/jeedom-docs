# Changelog — Alt Radar & Sécurité Réseau (`altNetGuard`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.1] - 2026-10-30

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`) du plugin `Alt Radar & Sécurité Réseau` (`altNetGuard`)** :
  - **Démon Python asynchrone 100 % Local LAN (`resources/altNetGuardd.py`)** :
    - Surveillance hybride non-intrusive combinant lecture de la table ARP / Neighbor OS (`ip neigh`, `arp -an`, `/proc/net/arp`), balayage **Ping Sweep & TCP ARP Primer** haute concurrence, découverte **mDNS / Bonjour (`.local`)**, **UPnP / SSDP (`friendlyName`, `manufacturer`, `modelName`)**, **NetBIOS Name Service (`UDP 137`)** et **Reverse DNS**.
    - Détection automatique du ou des sous-réseaux locaux IPv4 (`auto`) et de la passerelle par défaut.
  - **Architecture hybride à 2 rôles d'équipements Jeedom** :
    1. **Équipement global « Radar & Sécurité Réseau » (`netguard_radar_main`)** : compteurs temps réel (`total_online`, `known_online`, `known_offline`, `unknown_online`, `unknown_total`, `guest_online`), alerte binaire d'intrusion (`security_alert`), détails du dernier appareil inconnu détecté (`last_intrusion_ip`, `last_intrusion_mac`, `last_intrusion_vendor`, `last_intrusion_hostname`, `last_intrusion_time`, `last_intrusion_summary`), sélection du mode de surveillance (`smart`, `strict`, `night`, `mute`) et actions globales (`scan_now`, `deep_scan`, `ack_alerts`, `approve_all_unknown`, `clear_offline_unknown`).
    2. **Équipements individuels « Appareil Réseau Connu » (`netguard_dev_<MAC>`)** : suivi de présence par adresse MAC (`online`), adresse IPv4 (`ip`), changement d'IP (`ip_changed`), latence Ping (`latency_ms`), constructeur OUI (`vendor`), `hostname`, ports TCP ouverts (`open_ports`), bannière Web/SSH (`http_banner`), **Wake-on-LAN (`wol`)** et **Pont IP automatique (`sync_ip_bridges`)**.
  - **Outils d'identification active sur les appareils inconnus** :
    - Base **IEEE OUI** embarquée hors-ligne + lecture des bases OUI système.
    - Scan asynchrone des **34 ports TCP clés** et capture automatique du `<title>` HTTP/HTTPS, de l'en-tête `Server:` et de la bannière SSH.
    - Détection des **adresses MAC privées / aléatoires** (bit *Locally Administered* iOS/Android) avec corrélation par `Hostname` et statut **Invité temporaire (24h)** ou **Ignoré**.
    - Fingerprinting automatique en 15 catégories d'appareils avec icônes dédiées.
  - **Système d'alertes d'intrusion temps réel** :
    - Exécution automatique d'une commande de notification Jeedom (Mobile, Telegram, Mail, TTS...) avec variables personnalisables et publication dans le Centre de Messages Jeedom.
  - **Pont IP (Synchronisation automatique des changements d'IP DHCP)** vers les équipements d'autres plugins Jeedom.
  - **Widgets « Dark Glass » (`alt-erre` v1.2)** pour Dashboard et Mobile (9 thèmes de couleur) avec tiroir d'identification rapide des inconnus intégré au widget Radar + compatibilité **Kiosk TV 10-Foot (`getKioskWidgetData`)**.
  - **Conformité stricte aux CGU du Jeedom Market** : zéro secret dans `ps aux` (`daemon_config.json` en `0600` supprimé à l'arrêt), protection `.htaccess` des inventaires et zéro dépendance Copyleft GPL/AGPL.
