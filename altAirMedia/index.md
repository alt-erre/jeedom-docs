# Plugin altAirMedia (`altAirMedia`) pour Jeedom

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire - Tous droits réservés (`Copyright (c) 2026 Aurélien Léovant`)

## Présentation

**altAirMedia** est un plugin Jeedom conçu de zéro pour le pilotage local des **Apple TV** (HD, 4K toutes générations, Apple TV 3) et des **HomePod** (Original, Mini, 2e génération).

Il a été spécialement pensé pour offrir **une empreinte mémoire minimale (~35 Mo de RAM fixe)** et **zéro surcharge CPU/Swap**, y compris sur les box domotiques aux ressources contraintes comme la **Jeedom Luna**, l'Atlas ou les Raspberry Pi.

### 🌟 Atouts Exclusifs & Architecture Différenciante

- **Protocole moderne Companion & Compatibilité tvOS 15 à 18+** : communication push temps réel native prenant en charge l'ensemble des générations d'Apple TV (HD, 4K) et de HomePod (Mini, Original, Gen 2).
- **Démon Python asynchrone ultra-léger (~35 Mo de RAM)** : conception mono-processus sans environnement tiers lourd ni sous-processus superflus, assurant un retour d'état instantané (< 50 ms) avec zéro surcharge CPU/Swap sur Jeedom Luna.
- **Lancement direct des applications tvOS** : ouverture instantanée des applications de streaming et médias par commande directe ou scénario.
- **Traitement des jaquettes haute résolution 100 % en RAM** : téléchargement et mise en cache volatile dans `tmpfs` garantissant zéro écriture inutile sur la mémoire flash eMMC.
- **Plafonnement dynamique du volume (`volume_max_set`)** : protection acoustique active à 3 niveaux (widget, commandes, surveillance continue) avec abaissement automatique en cas de dépassement.

---

## Prérequis, Compatibilités & Matériels Testés

- **Plateforme Jeedom de référence :** La majorité des tests et développements ont été réalisés en conditions réelles sur une box officielle **Jeedom Luna 4G LoRaWAN** (ARM64, 2 Go de RAM, mémoire eMMC). Compatible avec **Jeedom $\ge$ 4.2** (Luna, Atlas, Smart, Raspberry Pi, VM et Docker sous Debian 11 / 12, Python $\ge$ 3.9).
- **Prérequis réseau :**
  - Box Jeedom et équipements Apple sur le même réseau local (LAN / VLAN avec flux Multicast/mDNS `UDP 5353` autorisé pour la découverte, ou connexion directe par adresse IP fixe).
  - Sur HomePod / HomePod mini, vérifier dans l'application *Maison (Home)* (*Réglages du domicile $\rightarrow$ Haut-parleurs et téléviseurs*) que l'accès est réglé sur *« Toutes les personnes sur le même réseau »*.
- **Matériels physiquement testés et validés par l'auteur :**
  - **2 × Apple TV 4K**
  - **HomePod (1re génération)**
  - **HomePod mini (1re génération)**
- **Autres équipements compatibles (protocoles locaux Companion / MRP / AirPlay) :**
  - **Apple TV** : Apple TV 4K (1re, 2e et 3e générations), Apple TV HD (4e gén.), Apple TV 3.
  - **HomePod** : HomePod (1re et 2e générations), HomePod mini.

---

## Points forts techniques

- **Démon 100 % Python `asyncio` mono-processus (`altairmediad.py`)** :
  - **Zéro Node.js** : suppression complète de Node.js et des centaines de paquets `npm`.
  - **Zéro sous-processus CLI** : un seul processus Python gère l'ensemble des Apple TV et HomePod via une connexion unique par appareil (au lieu de lancer 2 processus Python par équipement).
  - **Listeners temps réel natifs** (`PushListener`, `PowerListener`, `AudioListener`, `DeviceListener`) avec **dédoublonnage et anti-rebond (throttling)** intégrés pour ne jamais saturer Apache/PHP.
  - **Téléchargement asynchrone des pochettes (Artworks) en mémoire** : plus aucun `sleep()` bloquant côté PHP ni écritures temporaires répétées sur la mémoire eMMC.
  - **Reconnexion intelligente avec *backoff* exponentiel** (`5s` à `60s`) et connexion directe par IP sans tempête de scans mDNS.
- **Appairage interactif intégré à Jeedom** :
  - Appairage **AirPlay** et **Companion** directement depuis l'interface web Jeedom (affichage et saisie du code PIN dans une modale dédiée, sans besoin de terminal SSH).
  - Possibilité de saisir/coller manuellement des clés existantes ou d'**importer en 1 clic** ses équipements et clés depuis une configuration antérieure.
- **Double mode de Widget au choix par équipement** :
  - **Widget Télécommande / Lecteur dédié** (en CSS moderne léger : télécommande Apple TV avec D-Pad, lancement d'applications, pochette d'album, volume avec **plafonnement dynamique par mode `Volume maximum` / `Volume maximum niveau`** et abaissement automatique en cas de dépassement, ou lecteur HomePod avec thèmes de couleur).
  - **Widget standard Jeedom Core v4**.

---

## 💡 Idées de Scénarios & Synergies avec l'Écosystème `alt-erre`

Grâce à son intégration native dans Jeedom, le plugin s'associe harmonieusement avec les autres solutions de l'écosystème `alt-erre` pour enrichir votre quotidien :

### 1. Soirée Cinéma Grand Spectacle 4K
- **Déclencheur** : Sortie de veille de l'Apple TV ou lancement d'une application de streaming.
- **Action & Synergie** : Bascule automatique de l'amplificateur en Dolby Atmos, abaissement des volets roulants et extinction feutrée des éclairages du salon.
- **Plugins complémentaires associés** :
  - [Alt AVR Control (Denon / Marantz)](https://alt-erre.github.io/jeedom-docs/altDenon/) : sélection de la source Apple TV et décodage multicanal.
  - [Alt Ciné Projector (JVC D-ILA)](https://alt-erre.github.io/jeedom-docs/altJvcProjector/) : allumage du vidéoprojecteur et sélection de la mémoire de zoom.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : ambiance tamisée feutrée.
  - [Alt Habitat & Domotique (Delta Dore Tydom)](https://alt-erre.github.io/jeedom-docs/altTydom/) : fermeture des volets roulants.

### 2. Mise en Pause Automatique sur Sonnette ou Appel
- **Déclencheur** : Pression sur la sonnette vidéo ou réception d'un appel téléphonique entrant.
- **Action & Synergie** : Mise en pause instantanée de la lecture vidéo et relèvement doux de la lumière pour accueillir le visiteur.
- **Plugins complémentaires associés** :
  - [Alt Caméras & Sécurité (Arlo)](https://alt-erre.github.io/jeedom-docs/altArlo/) : détection de sonnette vidéo.
  - [Alt Serrure & Accès (Nuki)](https://alt-erre.github.io/jeedom-docs/altNuki/) : contrôle du déverrouillage de la porte d'entrée.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : éclairage d'accueil temporaire.

### 3. Affichage du Lecteur Multimédia sur Kiosk TV
- **Déclencheur** : Lecture active d'un morceau musical ou d'un flux vidéo sur l'Apple TV.
- **Action & Synergie** : Remontée des métadonnées temps réel (titre, artiste, jaquette HD) sur l'écran du salon.
- **Plugins complémentaires associés** :
  - [Alt Dashboard & Kiosk TV](https://alt-erre.github.io/jeedom-docs/altTvDashboard/) : vue multimédia 10-Foot UI.
  - [Alt Éclairage & Ambiance (Philips Hue)](https://alt-erre.github.io/jeedom-docs/altHue/) : synchronisation des teintes lumineuses avec la pochette.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud tiers)** : Toutes les communications s'effectuent directement sur votre réseau local (LAN) entre votre box Jeedom et vos équipements Apple TV / HomePod via les protocoles locaux `AirPlay` et `Companion`. Aucune donnée personnelle, habitude d'écoute ou clé d'appairage n'est envoyée vers un serveur externe.
- **Stockage et protection des clés d'appairage** :
  - Les jetons cryptographiques d'appairage (`pairingKeyAirplay`, `pairingKeyCompanion`) générés lors de la validation du code PIN sur l'Apple TV sont utilisés uniquement pour authentifier votre box Jeedom auprès de vos appareils Apple.
  - Ils sont stockés exclusivement dans la configuration interne de votre installation Jeedom et transmis au démon local via un fichier temporaire protégé (`chmod 0600`, lisible uniquement par l'utilisateur système Jeedom et supprimé à l'arrêt du démon).
  - Ces clés sont automatiquement supprimées lors de la suppression de l'équipement ou de la désinstallation du plugin.
- **Prérequis réseau & Sécurité recommandée** :
  - Le démon écoute uniquement sur l'interface de bouclage locale (`127.0.0.1`, port par défaut `55089`) et vérifie systématiquement la clé API interne du plugin.
  - Assurez-vous que votre box Jeedom et vos Apple TV / HomePod se trouvent sur un réseau local sécurisé (avec diffusion Multicast/mDNS `UDP 5353` autorisée si vous utilisez la découverte automatique).

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) - Création originale et indépendante (non affiliée à Jeedom SAS ni à Apple Inc.).
- **Licence** : Propriétaire - Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.

