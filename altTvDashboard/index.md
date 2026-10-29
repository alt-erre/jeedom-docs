# Plugin Jeedom — Alt Dashboard & Kiosk TV (`altTvDashboard`)

Plugin Jeedom permettant de générer des **tableaux de bord plein écran « 10-Foot UI » et Galeries d'Art** ultra-esthétiques spécialement conçus pour les téléviseurs **Samsung "The Frame" (Paysage `16:9` & Portrait `9:16` sur support motorisé)**, les **Smart TV (Tizen, WebOS, Android TV)** et les écrans muraux, pilotables intégralement avec la **télécommande du téléviseur (D-Pad)**.

Conçu selon l'architecture **« Dark Glass »** signature `alt-erre`, il agrège automatiquement l'ensemble de vos pièces (Objets Jeedom), scénarios et équipements de l'écosystème **`alt*`** (`altHue`, `altTwinkly`, `altTydom`, `altArlo`, `altNuki`, `altSonos`, `altDenon`, `altCambridgeAudio`, `altAirMedia`, `altSamsungTv`, `altJvcProjector`, `altPronote`, `altEducartable`, `altSwitch`, `altPlaystation`, `altXbox`, `altRoborock`, `altSiemens`, `altBambuLab`) ainsi que les équipements standards Jeedom.

---

## Fonctionnalités prises en charge

### 1. Navigation Spatiale 100 % Télécommande TV (D-Pad 10-Foot UI)
- **Moteur de navigation spatiale 2D (`SpatialNav`)** : déplacez-vous de tuile en tuile avec les flèches directionnelles **`▲` `▼` `◀` `▶`** de la télécommande de votre TV. La carte sélectionnée s'entoure d'un **anneau de focus lumineux haute visibilité** lisible à plus de 3 mètres.
- **Mode Réglage de Curseur au D-Pad (`Slider Lock`)** :
  - Sélectionnez la jauge d'une lampe (`altHue`/`altTwinkly`), d'un volet (`altTydom`), d'un thermostat ou d'un volume audio et appuyez sur **`OK`** : la jauge s'illumine en **Or Ambré**.
  - Utilisez **`◀` / `▶`** pour diminuer ou augmenter la valeur par pas, **`OK`** pour valider l'ordre auprès de Jeedom, ou **`Retour`** pour annuler.
- **Raccourcis télécommande natifs** :
  - **`OK / Entrer`** : Action directe (Allumer/Éteindre, Ouvrir/Fermer, Lancer scénario) ou ouverture des options détaillées.
  - **`Retour (Return / Back)`** : Fermer la modale / le plein écran caméra, quitter le mode Galerie ou revenir au menu principal.
  - **`Play / Pause (⏯)`** : Lecture / Pause directe sur l'enceinte `altSonos` ou l'amplificateur actif.
  - **`CH+ / CH-`** : Passer instantanément à la vue suivante ou précédente.

### 2. Adaptation Automatique Paysage (`16:9`) $\leftrightarrow$ Portrait (`9:16`) & Support Motorisé The Frame
- **Double mise en page adaptative** :
  - **Mode Paysage (`16:9`)** : En-tête panoramique (Horloge, Météo, Pilules de synthèse maison), barre de navigation latérale à gauche et grille Bento multi-colonnes à droite.
  - **Mode Portrait (`9:16`)** : Disposition verticale type « Affiche / Totem d'Art » avec en-tête supérieur, barre d'onglets horizontale et grille verticale optimisée.
- **Rotation CSS `90°` forcée pour navigateur Tizen sur support motorisé (`VG-ARAB22WMT` / `VG-ARAB43STD`)** :
  - Lorsque votre téléviseur *The Frame* pivote physiquement en position verticale, si le navigateur intégré *Samsung Internet* conserve un tampon vidéo `1920×1080`, le mode **`Portrait Rotation -90° / +90° (Tizen)`** fait pivoter automatiquement toute l'interface plein écran en `9:16` **et remappe les 4 flèches `▲▼◀▶` de la télécommande** pour que la touche *Haut* monte toujours vers le haut du cadre !
  - Si un téléviseur `altSamsungTv` est associé à l'équipement, la bascule Paysage / Portrait suit automatiquement l'état du support motorisé et permet même de faire pivoter physiquement l'écran depuis l'onglet *Studio The Frame*.

### 3. Les 8 Vues Thématiques & Filtres par Catégorie / Métier
1. **🏠 Accueil (Hub Maison)** : Horloge grand format, météo intérieure/extérieure, pilules de synthèse interactives (*Lumières allumées*, *Volets ouverts*, *Alarme/Serrures*, *Devoirs*, *Consoles*), commandes générales rapides, lecteur multimédia actif et caméra principale.
2. **🚪 Par Pièce (Objets Jeedom)** : Filtrage par pièce avec température/humidité de la pièce et commandes groupées (*Éteindre la pièce*, *Ouvrir/Fermer les volets de la pièce*).
3. **🎛️ Par Catégorie / Métier (Classé par Pièce)** :
   - Filtres dédiés : **💡 Éclairages & Ambiances**, **🪟 Volets, BSO & Ouvrants**, **🌡️ Climat, Chauffage & Énergie**, **🛡️ Sécurité & Accès**, **🎵 Audio & TV**, **👨‍👩‍👧‍👦 Famille & Gaming**, **🤖 Robots, Café & Atelier 3D**.
   -Chaque catégorie dispose en tête d'une **barre d'actions maîtresses** (*Tout éteindre*, *Ambiance Soirée 35 %*, *Tout ouvrir*, *Mi-hauteur 50 %*, *Tout fermer*, *Tous en Confort / Éco*, *Pause générale*) et affiche les équipements classés par pièce/objet Jeedom.
4. **🛡️ Caméras & Sécurité (Mur CCTV)** : Grille `16:9` des caméras `altArlo` avec **zoom plein écran en 1 clic `OK`**, déclenchement de capture snapshot, projecteur/sirène, serrures `altNuki` et alarme `altTydom` Tyxal+ protégés par **clavier PIN D-Pad**.
5. **🎵 Audio, TV & Home-Cinéma** : Pilotage `altSonos`, `altCambridgeAudio`, `altDenon`, `altAirMedia`, `altSamsungTv`, `altJvcProjector` avec respect strict du plafond de volume dynamique (`volume_max`).
6. **👨‍👩‍👧‍👦 Famille, École & Gaming** : Emploi du temps, devoirs et cantine `altPronote` & `altEducartable` + jauges de temps d'écran `altSwitch`, `altPlaystation` et `altXbox` avec boutons rapides `+15 min`, `+30 min`, `Illimité` et `Bloquer`.
7. **✨ Scénarios & Modes** : Lancement direct des scénarios Jeedom classés par groupe.
8. **🖼️ Studio The Frame & Personnalisation** : Changement d'œuvre *The Frame*, rotation du support motorisé, choix du **Passe-partout (*Matte*)** (*Aucun*, *Polaire*, *Blanc Chaud*, *Abricot*, *Sable*, *Sauge*, *Bleu Marine*, *Noir Galerie*), des **9 thèmes `alt-erre`**, et **activation/masquage direct des vues, pièces et widgets à la télécommande**.

### 4. Organisation automatique de la vue « 🏠 Accueil » (Hub Maison)
La vue **`🏠 Accueil`** est construite dynamiquement selon **6 blocs successifs**, de haut en bas, en ne prenant que parmi les équipements marqués comme **Visibles (`👁️`)** sur ce téléviseur :
1. **En-tête & Barre « Actions rapides de la maison »** :
   - **Tout en haut** : Horloge grand format, météo intérieure/extérieure (première sonde de température intérieure et extérieure détectée) et pilules de synthèse interactives (*Lumières allumées*, *Volets ouverts*, *État de l'alarme/serrures*, *Mode Télécommande D-Pad / Pointeur*, *Bascule Paysage/Portrait*).
   - **Barre d'actions rapides** : 5 boutons globaux (*Tout éteindre*, *Ambiance Soirée 35 %*, *Ouvrir tous les volets*, *Volets Mi-Hauteur 50 %*, *Fermer tous les volets*).
2. **Bandeau « Hero » (Média en cours + Caméra principale)** :
   - **À gauche (`active_media`)** : le premier équipement audio/vidéo (`altSonos`, `altDenon`, `altCambridgeAudio`, `altAirMedia`, `altSamsungTv`, `altJvcProjector`) actuellement **en cours de lecture (`is_playing = true`)**, ou à défaut le premier équipement multimédia **allumé (`is_on = true`)**.
   - **À droite (`cameras[0]`)** : la **première caméra `altArlo`** visible détectée.
3. **Section « ⭐ Mes Widgets Épinglés sur l'Accueil » *(Vos favoris)*** :
   - Affiche tous les widgets sur lesquels l'étoile **`⭐`** a été activée (depuis le Back-Office Jeedom ou via le bouton *« ⭐ Épingler sur l'Accueil »* dans la modale d'un équipement sur la TV). Si aucun widget n'est épinglé, cette section est masquée.
4. **Section « 🔥 Équipements actifs & Sécurité » *(jusqu'à 8 cartes)*** :
   - Sélectionne automatiquement les équipements demandant une attention immédiate : **lumières actuellement allumées** (`is_on = true`), **appareils ménagers / robots / imprimantes 3D en cycle** (`altRoborock`, `altSiemens`, `altBambuLab` avec `is_on = true`), ainsi que les **serrures `altNuki`**, l'**alarme `altTydom`** et le **SmartHub `altArlo`**.
5. **Section « 🎛️ Équipements de la maison » *(jusqu'à 12 cartes)*** :
   - Affiche les autres équipements visibles de la maison (volets, thermostats, lumières éteintes, etc.) qui ne figurent pas déjà dans la section *« Équipements actifs »*, afin que l'Accueil reste directement utilisable même lorsque tout est éteint.
6. **Section « 👨‍👩‍👧‍👦 Vie Scolaire & Temps d'écran » *(jusqu'à 6 cartes)*** :
   - Affiche les cartes **Pronote (`altPronote`)**, **Educartable (`altEducartable`)** et les consoles **Switch / PlayStation / Xbox (`altSwitch`, `altPlaystation`, `altXbox`)**.

### 5. Configuration des Widgets, Pièces, Vues, Favoris & Code PIN par Téléviseur
Chaque équipement Kiosk TV dispose de sa propre sélection d'affichage (vous pouvez ainsi afficher tous les équipements sur le téléviseur du Salon et uniquement ceux d'une chambre ou de la cuisine sur un second écran) :
- **Depuis le Back-Office Jeedom** (*Onglet `🎛️ Widgets, Pièces & Scénarios visibles`*) :
  - Cochez/décochez les **onglets de navigation**, les **pièces (objets Jeedom)**, les **widgets** (`alt*` et génériques Jeedom, avec recherche et filtre par catégorie) et les **scénarios** à afficher.
  - Possibilité de forcer l'affichage sur la TV d'un équipement masqué sur le Dashboard web Jeedom, ou inversement de masquer un équipement spécifique.
  - Cliquez sur **`⭐ Accueil`** en face d'un équipement pour l'épingler dans la section **« Mes Widgets Épinglés sur l'Accueil »** en haut de la vue *Accueil*.
  - Cliquez sur **`🔒 PIN`** pour activer/désactiver la demande de code PIN à 4 chiffres sur un **équipement entier** ou un **scénario**, ou cliquez sur **`🔑 N`** pour déplier toutes les commandes d'action de l'équipement et choisir **commande par commande** lesquelles exigent le code PIN.
- **Directement sur le Téléviseur avec la télécommande** :
  - Ouvrez n'importe quelle carte avec **`OK`** puis utilisez les boutons **`⭐ Épingler sur l'Accueil`** ou **`🚫 Masquer ce widget`** situés en bas de la modale.
  - Rendez-vous dans la vue **`🖼️ Studio & Réglages`** du téléviseur pour afficher ou masquer à la volée n'importe quel onglet, pièce ou widget, ou protéger un scénario par code PIN.

### 6. Architecture de Widgets Kiosk à 2 Niveaux (Lots par Défaut & Widgets Spécialisés par Plugin)
Le Kiosk TV fonctionne selon une architecture **10-Foot UI** à deux niveaux :
1. **Niveau 1 — Widgets Kiosk par Défaut (par Lot / Catégorie)** :
   - Pour tout équipement Jeedom (plugin tiers, Virtuel, Zigbee, Z-Wave, MQTT, Fil Pilote…), `altTvDashboard` inspecte automatiquement **toutes les commandes visibles (`isVisible == 1`)** de l'équipement :
     - **`action / other`** $\rightarrow$ grands boutons d'action 10-Foot dans la modale (et aperçu sur la carte).
     - **`action / slider`** $\rightarrow$ jauge sur la carte et barre de paliers rapides (`-`, `+`, `0 % / 25 % / 50 % / 75 % / 100 %` ou `°C`) dans la modale.
     - **`action / select`** $\rightarrow$ rangées de puces sélectionnables à la télécommande générées depuis `listValue`.
     - **`action / color`** $\rightarrow$ palette de couleurs rapide.
     - **`info` visibles** $\rightarrow$ pastilles d'indicateurs sur la carte et grille **« Informations & Mesures »** dans la modale.
2. **Niveau 2 — Widgets Kiosk Spécialisés fournis par les Plugins (`getKioskWidgetData()`)** :
   - Tout plugin respectant la *Charte de Compatibilité Kiosk TV* peut implémenter la méthode publique `$eqLogic->getKioskWidgetData(array $kioskContext)` afin de fournir ses propres contrôles métier, indicateurs ou vues modales 10-Foot sur-mesure tout en bénéficiant nativement de la navigation télécommande D-Pad, du code PIN et des 9 thèmes *Dark Glass*.

### 7. Mode « Veille Galerie / Tableau d'Art » & Notifications Picture-in-Picture (PiP)
- **Mode Veille Galerie (Ambient Screensaver)** : après $N$ minutes d'inactivité de la télécommande (ou sur appui du bouton *Galerie*), le dashboard laisse place à l'œuvre d'art en plein écran dans son passe-partout, accompagnée d'une horloge typographique fine, de la météo et du titre musical en écoute (avec *pixel-shift* anti-marquage). Un simple appui sur la télécommande réveille le dashboard.
- **Notifications Toast / Caméra PiP** : envoyez depuis n'importe quel scénario Jeedom une alerte visuelle sur l'écran de la TV (avec possibilité d'inclure l'aperçu d'une caméra `altArlo`, ex : `Mouvement portail | arlo=14 | level=alert`).

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud externe)** : Le tableau de bord Kiosk TV est servi directement par votre box Jeedom sur votre réseau local. Aucune donnée domotique, image ou statistique n'est transmise vers un serveur tiers.
- **Protection du Jeton Kiosk 256-bit & du Code PIN (`chmod 0600`)** :
  - Pour éviter la saisie fastidieuse d'un mot de passe Jeedom au clavier virtuel de la télécommande TV, chaque équipement génère un **jeton cryptographique 256-bit** révocable en 1 clic.
  - Ce jeton ainsi que l'empreinte hachée (`HMAC-SHA256`) du code PIN Kiosk sont stockés exclusivement dans `plugins/altTvDashboard/data/profiles/kiosk_<id>.json` avec des permissions restreintes **`0600`** et protégés contre tout accès HTTP direct par `.htaccess` (`Require all denied`).
  - La clé API interne Jeedom (`apikey`) n'est jamais exposée dans l'URL, ni dans le code HTML/JS envoyé au téléviseur, ni dans les logs.
- **Passerelle Média Sécurisée (`mediaProxy.php`)** : Les captures des caméras `altArlo` et les vignettes personnelles du Mode Art `altSamsungTv` sont diffusées via un proxy interne vérifiant systématiquement le jeton Kiosk ou la session Jeedom active.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à Samsung Electronics).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.
