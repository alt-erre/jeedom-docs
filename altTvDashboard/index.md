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
8. **🖼️ Studio The Frame & Personnalisation** : Changement d'œuvre *The Frame*, rotation du support motorisé, choix du **Passe-partout (*Matte*)** (*Aucun*, *Polaire*, *Blanc Chaud*, *Abricot*, *Sable*, *Sauge*, *Bleu Marine*, *Noir Galerie*) et des **9 thèmes `alt-erre`**.

### 4. Mode « Veille Galerie / Tableau d'Art » & Notifications Picture-in-Picture (PiP)
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
