# Alt Éclairage & Ambiance (Philips Hue) (`altHue`) — Plugin Jeedom 100 % Local

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Catégorie :** Lumière (`light`)  
**Protocole :** API Locale HTTPS **CLIP v2** + Flux d'événements temps réel **Server-Sent Events (`SSE /eventstream/clip/v2`)** + API Locale **Hue Play HDMI Sync Box (`/api/v1`)**  
**Version :** `0.1.0-beta.1`  
**Compatibilité :** Jeedom v4.0+ (Smart, Atlas, Luna, RPi, Docker, VM Debian 11/12)

---

## 1. Présentation & Fonctionnalités Clés

Le plugin **Alt Éclairage & Ambiance (Philips Hue)** (`altHue`) permet de piloter et superviser **100 % en local (Zéro Cloud)** l'intégralité de votre écosystème **Philips Hue**, avec une prise en charge native approfondie de la gamme **Hue Play** et **Gradient** :

1. **Barres Lumineuses Hue Play & Rubans / Tubes / Lampes Gradient Multi-Zones (`hue_play`)** :
   - Prise en charge native des **Hue Play Lightbar** (simple, double, rallonge), **Hue Play Gradient Lightstrip (TV 55"/65"/75" & PC 24–34")**, **Hue Play Gradient Light Tube**, **Hue Gradient Signe**, **Hue Centris**, **Hue Go** et **Hue Iris**.
   - **Studio Hue Play Gradient intégré au Widget** : définissez de **2 à 5 couleurs simultanées** (`gradient.points` en coordonnées CIE 1931 `xy`) ou lancez en 1 clic l'une des **8 ambiances Gradient préconfigurées** (*Cyberpunk*, *Coucher de soleil*, *Aurore Boréale*, *Cinéma Bias Warm*, *Arcade Néon*, *Feu & Glace*, *Océan Profond*, *Forêt Enchantée*) avec choix du mode de diffusion (*Palette interpolée fluide*, *Palette en miroir*, *Pixels aléatoires*).
2. **Ampoules, Spots, Rubans & Prises Connectées Philips Hue (`light`)** :
   - Pilotage complet : **On / Off / Bascule**, **Luminosité (`0..100 %`)**, **Couleur HEX (`#RRGGBB` $\leftrightarrow$ CIE 1931 Wide RGB D65)**, **Température de Blanc (`2000 K..6500 K` / `153..500 mirek`)** et **5 Ambiances Blanches rapides** (*Détente 2200 K*, *Blanc Chaud 2700 K*, *Lecture 2900 K*, *Concentration 4300 K*, *Énergie 6500 K*).
   - **Effets dynamiques natifs Hue** : *Bougie (`candle`)*, *Feu de cheminée (`fire`)*, *Prisme (`prism`)*, *Étincelles (`sparkle`)*, *Opale (`opal`)*, *Scintillement (`glisten`)*, *Sous l'eau (`underwater`)*, *Cosmos (`cosmos`)*, *Rayon de soleil (`sunbeam`)*, *Enchantement (`enchant`)* et **Flash d'alerte lumineuse (`breathe`)**.
3. **Pièces (`room`), Zones (`zone`) & Scènes Dynamiques (`grouped_light`)** :
   - Pilotage groupé synchrone sans décalage Zigbee.
   - Import automatique de toutes vos **Scènes Hue** et **Scènes 24h (`smart_scene`)** avec lancement en mode **Statique** ou en mode **Palette Dynamique animée (`dynamic_palette`)** !
4. **Espaces de Divertissement Hue Play (`entertainment`) & Boîtier Hue Play HDMI Sync Box (`sync_box`)** :
   - Suivi temps réel de l'état de streaming **Hue Entertainment / Hue Sync** (PC, TV, Musique) et arrêt à distance.
   - Prise en charge locale directe du boîtier **Hue Play HDMI Sync Box** : sélection de l'entrée HDMI (`HDMI 1..4`), du mode de synchronisation (*Vidéo*, *Jeu*, *Musique*, *Passthrough*, *Veille*), de l'intensité (*Subtile*, *Modérée*, *Élevée*, *Intense*), de la luminosité et démarrage/arrêt du Sync lumineux.
5. **Capteurs (`sensor`) & Interrupteurs / Variateurs (`switch`) en Temps Réel (< 50 ms)** :
   - **Hue Motion Sensor / Outdoor Sensor / Secure Contact Sensor** : présence (`0/1`), température (`°C`), luminosité ambiante convertie en **Lux (`lx`)**, ouverture (`0/1`), niveau de batterie (`%`) et activation/désactivation du capteur par scénario.
   - **Hue Dimmer Switch, Hue Tap Dial Switch (avec molette rotative), Hue Smart Button, Hue Wall Switch Module** : remontée instantanée via le flux SSE du bouton pressé (`1..4`), du type d'appui (`initial_press`, `repeat`, `short_release`, `long_press`, `long_release`), du **code scénario (`1000..4005`)** et du sens/nombre de pas de la molette **Tap Dial**.
6. **Plafond Dynamique de Luminosité par Mode (`brightness_max` / `brightness_max_set`)** :
   - Permet à vos scénarios Jeedom (ex. mode *« Nuit enfant »*) de plafonner automatiquement la luminosité maximale autorisée sur une lampe ou une pièce entière, avec abaissement immédiat et écrêtage temps réel si quelqu'un rallume à 100 % via un interrupteur physique.

---

## 2. Installation & Appairage Local en 1 Clic

1. Installez le plugin **Alt Éclairage & Ambiance (Philips Hue)** et lancez l'installation des **Dépendances**.
2. Ouvrez la page **Configuration** du plugin :
   - Cliquez sur **« Découvrir les Ponts Hue & Sync Box sur le LAN »** (découverte locale SSDP + mDNS + HTTPS).
   - **Appuyez une fois sur le bouton rond central (Link)** au sommet de votre Pont Philips Hue.
   - Cliquez dans les 30 secondes sur **« Appairer le Pont Hue (Bouton Link pressé) »**.
   - *(Optionnel)* Si vous possédez un boîtier **Hue Play HDMI Sync Box**, maintenez son bouton en façade enfoncé pendant 3 secondes jusqu'au clignotement vert, puis cliquez sur **« Appairer la Sync Box »**.
3. Tous vos équipements (**Hue Play**, **Rubans Gradient**, **Ampoules**, **Pièces**, **Zones**, **Scènes**, **Zones Entertainment**, **Capteurs** et **Interrupteurs**) sont automatiquement créés et rattachés aux pièces Jeedom correspondantes !

---

## 3. Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux Conditions Générales d'Utilisation du **Jeedom Market (Art. 3.5, 4.3, 4.4 & 4.8)** :

- **Fonctionnement 100 % Local (Zéro Cloud obligatoire)** : Toutes les communications s'effectuent directement sur votre réseau local (LAN) en HTTPS chiffré entre Jeedom et votre Pont Philips Hue (`CLIP API v2` et flux `SSE /eventstream/clip/v2`) ainsi que votre éventuel boîtier Hue Play HDMI Sync Box (`/api/v1`). Aucune donnée d'éclairage, de présence ou d'état ne transite par un serveur externe.
- **Protection absolue des secrets et de `--apikey` (Zéro secret dans `ps aux`)** :
  - Les clés locales d'application Hue (`hue-application-key` / `clientkey`) et les jetons locaux Sync Box sont stockés exclusivement dans `data/profiles/bridges.json` protégé par des permissions strictes `0600` et un fichier `.htaccess` (`Require all denied`).
  - La clé API interne Jeedom et la configuration du démon sont transmises via `/tmp/jeedom/altHue/daemon_config.json` verrouillé en `0600` et supprimé à l'arrêt du démon (`@unlink`). Aucun secret n'apparaît jamais dans la liste des processus (`ps aux`) ni dans les journaux (logs).
- **Prérequis de sécurité réseau** : Attribuez un bail DHCP fixe (IP statique) à votre Pont Philips Hue (et à votre Hue Play HDMI Sync Box) sur votre routeur local et autorisez les flux HTTPS (port TCP `443`) entre Jeedom et le Pont Hue si vous utilisez des VLANs séparés.

---

## 4. Support & Documentation

- **Documentation complète :** [https://alt-erre.github.io/jeedom-docs/altHue/](https://alt-erre.github.io/jeedom-docs/altHue/)
- **Changelog :** [https://alt-erre.github.io/jeedom-docs/altHue/changelog](https://alt-erre.github.io/jeedom-docs/altHue/changelog)
- **Signaler un bug / Demander une évolution :** [GitHub Issues `jeedom-docs`](https://github.com/alt-erre/jeedom-docs/issues)
