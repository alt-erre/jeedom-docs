# Alt Éclairage & Ambiance (Philips Hue) (`altHue`) - Plugin Jeedom 100 % Local

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Catégorie :** Lumière (`light`)  
**Protocole :** API Locale HTTPS **CLIP v2** + Flux d'événements temps réel **Server-Sent Events (`SSE /eventstream/clip/v2`)** + API Locale **Hue Play HDMI Sync Box (`/api/v1`)**  
**Version :** `0.1.0-beta.15`  
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
7. **Association d'un Interrupteur / Prise Commandée Amont Externe (Ampoules, Hue Play, Pièces & Zones)** :
   - Permet d'associer n'importe quelle commande d'état binaire Jeedom (`upstreamStateCmd` : télérupteur, micromodule Z-Wave/Zigbee, prise connectée...) en amont d'une lampe, d'une barre Hue Play ou d'une pièce/zone entière :
     - **Correction immédiate de l'état réel** : dès que l'interrupteur amont passe à `0`, la lampe (ainsi que la pièce/zone parente si plus aucune lampe n'y est alimentée) bascule immédiatement à `État = 0` et `Luminosité = 0 %` avec un badge **`AMONT OFF`** sur le widget, corrigeant le faux positif du pont Hue qui croit l'ampoule encore allumée.
     - **Sélecteur de mode à l'allumage (`upstreamOnMode`)** : choix par équipement entre **Allumer automatiquement l'interrupteur amont puis la lampe Hue** (`auto_on`, avec délai d'amorçage configurable par défaut à `1500 ms`), **Bloquer / Refuser l'allumage tant que l'interrupteur amont est éteint** (`block`), ou **Ignorer à l'allumage** (`ignore`).
     - **Option d'extinction de l'interrupteur amont (`upstreamOffBehavior`)** : choix entre éteindre uniquement la lampe dans Hue (`hue_only`), éteindre la lampe Hue **et** couper l'interrupteur amont (`upstream_also`), ou couper uniquement l'interrupteur amont (`upstream_only`), avec cascade intelligente entre pièces/zones et lampes membres.
     - **Option anti-doublon de masquage de l'interrupteur amont (`upstreamHideEqLogic`)** : lors de la sélection d'une commande d'interrupteur amont (ou via la case à cocher dédiée), le plugin propose de masquer automatiquement (`Visible = 0`) l'équipement interrupteur/prise en référence sur le Dashboard afin d'éviter d'avoir l'interrupteur et l'éclairage Hue en double (avec restauration automatique de sa visibilité si vous décochez l'option ou dissociez l'interrupteur).
8. **Dashboard Global de Supervision & Pilotage dans le Menu Accueil (`Accueil -> Alt Éclairage & Ambiance (Philips Hue)`)** :
   - Vue d'ensemble esthétique (**Dark Glass** & **Light Glass v1.5 WCAG AAA**) accessible directement depuis le menu **Accueil** de Jeedom ou via le bouton **« Dashboard Hue »** de la page du plugin :
     - **En-tête Hero temps réel** : état en ligne des Ponts Hue (`SSE LIVE`, adresse IP, firmware) et des boîtiers Hue Play HDMI Sync Box, bascule Mode Clair / Mode Sombre et rafraîchissement global.
     - **6 Cartes KPI interactives avec actions groupées en 1 clic** : *Pièces & Zones Hue* (*Tout ON / Tout OFF*), *Hue Play & Gradient* (*ON / OFF*), *Ampoules & Spots* (avec compteur d'alimentations amont coupées), *Entertainment & Sync Box* (*Stop Sync*), *Capteurs & Climat* (mouvements actifs, température moyenne `°C`, luminosité moyenne `lx`) et *Interrupteurs & Piles* (santé des batteries).
     - **Navigation latérale par Famille Hue & par Pièce Jeedom** (avec pastille d'éclairage allumé et température moyenne par pièce), filtres rapides (*Allumés / Actifs*, *Amont coupé*), regroupement dynamique (*Par Famille* / *Par Pièce*) et **3 modes d'affichage** (*Synthèse* en cartes pilotables avec aperçu couleur/Gradient et sélecteurs de scènes/palettes, *Widgets* complets Jeedom, et *Tableau* de supervision).
9. **Fonctions Avancées CLIP v2 & HDMI Sync Box (Retour secteur, Signalisation bicolore, Simulateur d'Aube, Fondus & Sécurité)** :
   - **Comportement au retour du secteur (`powerup` / *Power-On Behavior*)** : lecture et modification directe par scénario du comportement après coupure électrique (*Dernier état allumé*, *Récupération intelligente*, *Blanc chaud 100 %*, *Veilleuse nocturne 1 % (2200 K)* ou *Mémoriser la couleur actuelle*).
   - **Signalisation visuelle avancée bicolore (`signaling`) & Repérage physique (`identify`)** : préréglages de flashs lumineux (*Sonnette / Interphone*, *Alarme Intrusion / Incendie*, *Notification douce*, *Succès / Livraison*), commande message personnalisée (`#RRGGBB,#RRGGBB,durée_sec`) et bouton de repérage physique (`identify`) sur chaque lampe, pièce, capteur et interrupteur.
   - **Simulateur d'Aube / Crépuscule natif (`timed_effects` : `sunrise` / `sunset` 15 ou 30 min)**, réglage de la **vitesse des effets dynamiques (`effects_v2` / `effect_speed` `0..100 %`)**, **durée de transition / fondu personnalisable (`dynamics.duration` / `transition_duration` & `defaultTransitionMs`)**, **vitesse et Auto-Dynamic des Scènes (`scene_speed_set`, `scene_auto_dynamic_toggle`)** et **capture instantanée de l'éclairage actuel en nouvelle Scène Hue (`scene_capture_current`)**.
   - **Capteurs, Pont Hue & Sync Box avancés** : réglage de la **sensibilité PIR (`sensitivity_set`)**, détection d'**arrachement / sabotage (`tamper`)**, **qualité Zigbee (`zigbee_status`)**, canal et santé Zigbee du Pont Hue (`zigbee_channel`, `zigbee_issue_count`), **lancement d'appairage Zigbee (`zigbee_discover_start`)**, pilotage des **automatisations internes du Pont (`behavior_enable_select` / `behavior_disable_select`)**, et contrôle avancé **Sync Box** (*Zone Entertainment cible*, *LED de façade*, *Bascule CEC*, *Format vidéo HDMI*).

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
