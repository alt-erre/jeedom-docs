# Plugin Jeedom — Alt Frame & Smart TV (Samsung) (`altSamsungTv`)

Plugin Jeedom permettant de piloter **100 % en local** les téléviseurs **Samsung Smart TV (Tizen 2016+)** et plus particulièrement la gamme **Samsung "The Frame" (2018 à 2025+, API Art Mode v1 & v2)**.

Conçu dans la même philosophie et la même architecture qu'`altCambridgeAudio`, il offre le choix entre deux modes de fonctionnement :
1. **Mode Local Direct (par défaut, sans démon)** : requêtes locales directes HTTP REST (`:8001`/`:8002`), UPnP RenderingControl (`:9197` pour la lecture et le réglage du volume exact `0` à `100 %` et l'état Muet) et transactions WebSocket à la demande en PHP natif — aucune dépendance ni démon requis pour le contrôle courant.
2. **Mode WebSocket Temps Réel (démon Python optionnel)** : maintien d'une connexion WebSocket persistante sur les canaux `samsung.remote.control` et `com.samsung.art-app` (`wss://<ip>:8002` ou `ws://<ip>:8001`) pour une remontée instantanée des changements d'état (Mode TV / Mode Art / Veille, œuvre affichée, vignette en direct, luminosité Art, température de couleur, diaporama, volume UPnP) et l'envoi instantané des commandes sans latence de poignée de main SSL.

---

## Fonctionnalités prises en charge

### 1. Gestion intelligente des 3 états Samsung "The Frame" & Wake-on-LAN
Contrairement à un téléviseur classique, un **Samsung The Frame** possède **3 états distincts** :
- **Mode TV (`tv`)** : Téléviseur allumé (diffusion TV / HDMI / Application).
- **Mode Art (`art`)** : Dalle en mode galerie d'art affichant une œuvre ou photo encadrée.
- **Veille profonde (`standby`)** : Écran totalement éteint.

Le plugin gère nativement ces 3 états :
- **`On`** : Réveille la TV par **Wake-on-LAN** (paquet magique UDP sur l'adresse MAC auto-détectée) et bascule automatiquement du **Mode Art** vers le **Mode TV**.
- **`Off`** : Comportement configurable par équipement :
  - Soit basculer en **Mode Art** (tableau),
  - Soit forcer l'**extinction complète de l'écran** (`Veille profonde`).
- **`Veille profonde (Écran éteint)`** (`power_off_deep`) : Envoie un appui maintenu (`Hold 3,5 s` sur `KEY_POWER`) pour éteindre complètement un téléviseur The Frame même s'il est en Mode Art.
- **`Activer Mode Art`** (`art_mode_on`), **`Quitter Mode Art (Mode TV)`** (`art_mode_off`), **`Basculer Mode Art`** (`art_mode_toggle`).
- Commandes infos dédiées : `Etat` (binaire `0`/`1`), `Etat Mode Art` (binaire `0`/`1`), `Mode TV / Art / Veille` (`tv`, `art`, `standby`) et `Statut affichage` (`Mode TV`, `Mode Art`, `En veille`).

### 2. Réglages du Mode Art (The Frame)
- **Luminosité Mode Art** : info `Luminosité Mode Art` (`1` à `10`) + curseur `Réglage Luminosité Art` (`1` à `10`).
- **Température de couleur Art** : info `Température couleur Art` (`-5` à `+5`) + curseur `Réglage Température couleur Art` (`-5` à `+5`).
- **Diaporama / Rotation automatique** : info `Diaporama Mode Art (Etat)` + liste déroulante `Diaporama Mode Art` (`Désactivé`, `3 min`, `10 min`, `15 min`, `30 min`, `1 h`, `3 h`, `12 h`, `1 jour`).
- **Passe-partout (Matte)** : info `Passe-partout (Matte)` + liste déroulante `Changer Passe-partout` (`Aucun`, `Moderne Abricot`, `Moderne Polaire`, `Moderne Blanc Chaud`, `Caisse Américaine Polaire`, `Flexible`, `Panoramique`, etc.).
- **Orientation de l'écran & Support motorisé (*Auto-Rotating*)** :
  - Commandes info `Orientation (Code)` (`landscape` / `portrait`) et `Orientation (Libellé)` (`Paysage` / `Portrait`) mises à jour automatiquement, avec adaptation dynamique du cadre d'aperçu du widget entre le format horizontal **`16:9`** et le format vertical **`9:16`**.
  - Commande action `Pivoter l'écran (Support motorisé)` (`rotate_screen`) et bouton dédié (<i class="fas fa-sync"></i>) dans l'en-tête *Galerie The Frame* pour piloter les supports muraux et pieds motorisés Samsung (`VG-ARAB22WMT` / `VG-ARAB43STD`).

### 3. Galerie, Favoris, Nommage personnalisé & Téléversement d'images locales vers The Frame
- **Œuvre en cours & Aperçu en direct** : `ID Œuvre affichée` (`SAM-...`, `MY_F...`) et récupération automatique de la **vignette (`Vignette Œuvre`)** via le canal D2D de la TV pour l'afficher en direct dans le cadre passe-partout du widget Jeedom.
- **Nommage personnalisé des œuvres (`✏️`)** : cliquez sur le bouton **`✏️`** à côté de la liste déroulante des œuvres dans l'onglet *Studio The Frame* du widget (ou renommez la commande `Œuvre : ...` dans l'onglet *Commandes*) pour attribuer un nom lisible (*La Nuit étoilée*, *Photo Vacances*, etc.) à la place des identifiants bruts `MY_F0018`.
- **Navigation Galerie** : commandes `Œuvre précédente`, `Œuvre suivante`, `Afficher Œuvre (ID)`, `Mode Art : Renommer une œuvre` et création dynamique d'une commande par œuvre découverte lors de la synchronisation.
- **Téléversement d'image depuis la galerie photo (Smartphone), un fichier local ou une URL** :
  - **Depuis le widget (Dashboard & Mobile)** : cliquez sur le bouton **`Photo`** (<i class="fas fa-upload"></i>) dans la section *Galerie The Frame* pour choisir une photo directement dans la **galerie de votre smartphone (iOS / Android)**, prendre une photo ou sélectionner un fichier sur votre ordinateur. Une barre d'aperçu permet de personnaliser le nom de l'œuvre avant l'envoi, avec conversion automatique 4K UHD, application du passe-partout sélectionné et affichage immédiat sur *The Frame*.
  - **Depuis un scénario ou la page équipement (`Envoyer image vers Mode Art`)** : permet d'envoyer n'importe quelle image **JPEG ou PNG** (chemin local `/var/www/...` ou URL `http(s)://...` telle qu'une capture de caméra IP, une carte météo ou une photo) directement vers le Mode Art de The Frame, avec attribution d'un nom personnalisé, application automatique du passe-partout choisi et affichage immédiat à l'écran !

### 4. Contrôle TV complet (Volume UPnP 0-100 %, Sources HDMI, Applications & Télécommande)
- **Volume exact & Sourdine** : lecture et réglage du volume de `0` à `100 %` (`Volume`, `Volume niveau`, `Volume +`, `Volume -`) et de la sourdine (`Etat Muet`, `Muet`, `Muet On`, `Muet Off`) via l'API locale **UPnP RenderingControl (`:9197`)** sans dépendre du Cloud SmartThings, complétés par les commandes **`Volume maximum`** (`volume_max`) et **`Volume maximum niveau`** (`volume_max_set`) pour définir un plafond de volume par mode de la maison (ex. *Nuit enfant*) avec abaissement automatique immédiat en cas de dépassement.
- **Sources HDMI & TV** : `Source : TV / TNT`, `Source : HDMI (Basculer / Cycle)`, `Source : Menu Sources` (ainsi que `HDMI 1` à `HDMI 4` pour les modèles Tizen compatibles ; sur **Samsung The Frame**, le firmware Tizen bloque les codes discrets `KEY_HDMI1..4` en local et utilise `KEY_HDMI` pour basculer entre les entrées HDMI actives).
- **Applications Smart TV Tizen** : lancement direct de `Netflix`, `YouTube`, `Prime Video`, `Disney+`, `Apple TV`, `Apple Music`, `CANAL+`, `Free TV` (ex-*OQEE by Free*), `Twitch`, `Spotify`, `Plex`, `Molotov`, `france.tv`, `TF1+`, `ARTE`, `Max`, `Internet Browser` (avec détection automatique de la variante d'identifiant Tizen 2016–2025+ installée sur la TV via API REST `/api/v2/applications/` et WebSocket `ed.apps.launch`).
- **Télécommande complète** : Pavé directionnel (`Haut`, `Bas`, `Gauche`, `Droite`, `OK / Entrer`, `Retour`, `Accueil Smart Hub`, `Quitter`, `Menu`, `Guide TV`, `Info`, `Mode Ambiant`), chaînes (`Chaîne +`, `Chaîne -`, `Chaîne précédente`, `Aller à la chaîne N°`), transport multimédia (`Play / Pause`, `Lecture`, `Pause`, `Stop`, `Précédent`, `Suivant`) et commande générique `Envoyer Touche (KEY_...)`.

---

## Configuration & Appairage

1. Activez le plugin **Alt Samsung TV** dans Jeedom.
2. Créez un équipement dans **Plugins → Multimédia → Alt Samsung TV**, renseignez l'**Adresse IP** locale de votre téléviseur Samsung / The Frame et sauvegardez.
3. **Allumez votre téléviseur Samsung**, puis cliquez sur le bouton orange **« Appairer avec la TV »** en haut à droite de la fiche équipement :
   - Une notification apparaît sur l'écran de votre téléviseur : sélectionnez **« Autoriser »** avec la télécommande Samsung.
   - Le **Jeton d'appairage (Token)**, l'**Adresse MAC (Wake-on-LAN)** et le **Modèle** sont automatiquement récupérés et enregistrés dans Jeedom !

---

## Astuce : Afficher un Design Jeedom ou un Dashboard en plein écran dans le navigateur de la TV

Sur les téléviseurs Samsung Tizen récents (**modèles 2021 à 2025+**), Samsung a verrouillé pour des raisons de sécurité l'injection d'URL externe dynamique (`metaTag`) vers le navigateur intégré **Samsung Internet** (`org.tizen.browser`) : le navigateur ignore les URL passées à la volée sur le réseau local et s'ouvre uniquement sur sa **Page d'accueil**.

Pour afficher automatiquement un **Design Jeedom**, un mur de caméras ou un tableau de bord **100 % en plein écran (sans barre d'adresse ni onglets)** depuis le widget ou un scénario Jeedom :

1. **Sur le téléviseur Samsung**, ouvrez une première fois l'application **Internet** (*Samsung Internet*).
2. Ouvrez le **Menu** du navigateur (icône en haut à droite) → **Paramètres (Settings)** → onglet **Général** :
   - Dans **Page d'accueil (Homepage)**, sélectionnez *Personnalisée* et saisissez l'URL de votre Design Jeedom ou tableau de bord (ex. `https://...` ou `http://192.168.1.x/...`).
   - Activez l'option **« Masquer automatiquement la barre d'outils »** (*Auto-hide toolbar*).
3. **Dans Jeedom** (depuis le sélecteur **App → Internet Browser** du widget ou via la commande `App : Internet Browser` / `Ouvrir URL (Navigateur)` dans un scénario) :
   - Le plugin quitte automatiquement le *Mode Art* (si actif), lance **Samsung Internet** au premier plan sur votre page d'accueil, puis envoie automatiquement une impulsion `KEY_DOWN` après le chargement afin de faire descendre le focus dans la page et **replier immédiatement la barre d'URL et les onglets en plein écran**.

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud SmartThings)** : L'ensemble des échanges (WebSocket TLS port `8002`, API REST locale `:8001`, contrôle du volume UPnP `:9197` et transfert d'images D2D vers le Mode Art) s'effectue directement sur votre réseau local entre votre box Jeedom et votre téléviseur Samsung. Aucune donnée personnelle ni image n'est envoyée vers un serveur externe.
- **Avis de confidentialité et protection du jeton d'appairage (`Token`)** :
  - Le jeton d'appairage (`token`) délivré par le téléviseur lors de votre autorisation sur l'écran TV est utilisé exclusivement pour authentifier les connexions WebSocket locales de Jeedom auprès de votre téléviseur.
  - Il est stocké uniquement en local dans votre base Jeedom et transmis au démon via un fichier temporaire aux permissions restreintes (`chmod 0600`, supprimé à l'arrêt du démon). Il est supprimé dès que l'équipement est retiré de Jeedom.
- **Mesures de sécurité réseau** :
  - Les connexions de contrôle et du Mode Art privilégient le canal chiffré **WebSocket TLS (`wss://<ip>:8002`)**.
  - Le démon interne écoute uniquement sur `127.0.0.1` (port `55090` par défaut) avec validation systématique de la clé API Jeedom. Ne redirigez jamais les ports `8001`, `8002` ou `9197` de votre téléviseur vers Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Samsung Electronics).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
