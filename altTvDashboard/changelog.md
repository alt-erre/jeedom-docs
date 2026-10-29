# Changelog — Alt Dashboard & Kiosk TV (`altTvDashboard`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](../VERSIONING.md).

---

## [0.1.0-beta.2] — 2026-10-29

### Corrigé
- **Rendu du Kiosk sur navigateur TV Tizen / Smart TV (`core/php/kiosk.php`, `desktop/js/kiosk.js`, `desktop/css/kiosk.css`, `core/class/altTvDashboard.class.php`)** :
  - Sécurisation complète de l'encodage JSON initial (`safeJsonEncode` avec nettoyage UTF-8 récursif, filtrage `NAN`/`INF`, échappement `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT` et balise `<script id="altKioskInitData" type="application/json">`) empêchant toute coupure de bloc `<script>` ou erreur de syntaxe JS sur le navigateur TV.
  - Intégration directe (*inline*) de `kiosk.css` et `kiosk.js` dans `kiosk.php` pour éviter tout blocage `.htaccess` ou problème de cache sur Samsung Internet (Tizen).
  - Remplacement de `fetch` / `URLSearchParams` / `closest` par `XMLHttpRequest` et parcours DOM natif compatibles avec toutes les générations de navigateurs Tizen.
  - Enrichissement de la vue **Accueil** pour afficher également la grille des équipements principaux de la maison lorsqu'aucun éclairage n'est allumé, et élargissement de la détection automatique des équipements génériques Jeedom visibles.

---

## [0.1.0-beta.1] — 2026-10-28

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Dashboard & Kiosk TV (`altTvDashboard`)** pour Jeedom v4.
- **Interface plein écran « 10-Foot UI » & Galerie d'Art (`core/php/kiosk.php`)** spécialement conçue pour le navigateur intégré des téléviseurs **Samsung The Frame (Tizen)**, Smart TV et écrans muraux :
  - **Moteur de Navigation Spatiale 2D (`SpatialNav`)** pilotable à 100 % avec la télécommande du téléviseur (flèches `▲▼◀▶`, `OK`, `Retour`, `Play/Pause`, `CH+/CH-`) avec anneau de focus lumineux haute visibilité à 3 mètres et conservation du focus lors des rafraîchissements temps réel.
  - **Mode Réglage de Curseur au D-Pad (`Slider Lock`)** : appui sur `OK` sur une jauge (luminosité, volet, thermostat, volume) pour verrouiller le réglage avec `◀` / `▶`, validation par `OK` et annulation par `Retour`.
- **Adaptation automatique Paysage (`16:9`) $\leftrightarrow$ Portrait (`9:16`) & Support motorisé Samsung (`VG-ARAB22WMT` / `VG-ARAB43STD`)** :
  - Mise en page responsive basculant entre le format panoramique `16:9` (barre latérale) et le format affiche/totem vertical `9:16`.
  - Mode **Rotation CSS forcée (`-90°` / `+90°`)** avec **inversion automatique de la matrice directionnelle D-Pad** pour les téléviseurs Samsung *The Frame* sur support motorisé dont le navigateur Tizen conserve un tampon vidéo `1920×1080` en mode vertical.
  - Synchronisation automatique de l'orientation et de l'œuvre d'art en cours avec un équipement **`altSamsungTv`** associé.
- **Agrégation native de l'écosystème `alt-erre` (19 plugins `alt*`) et des équipements génériques Jeedom** répartis en **8 vues thématiques** :
  1. **Accueil (Hub Maison)** : Horloge grand format, météo intérieure/extérieure, pilules de synthèse interactives, commandes générales rapides, lecteur multimédia actif et caméra principale.
  2. **Par Pièce (Objets Jeedom)** : Filtrage par pièce avec température/humidité et actions groupées par pièce.
  3. **Par Catégorie / Métier (Classé par Pièce)** : Vue filtrée par type (*Éclairages*, *Volets & Ouvrants*, *Climat & Énergie*, *Sécurité & Accès*, *Audio & TV*, *Famille & Gaming*, *Robots, Café & 3D*) avec **barre de commandes générales en tête** (*Tout éteindre*, *Ambiance Soirée 35 %*, *Tout ouvrir*, *Mi-hauteur 50 %*, *Tout fermer*, *Mode Confort / Éco*, *Pause générale*) et classement par pièce.
  4. **Caméras & Sécurité (Mur CCTV)** : Grille `16:9` des caméras `altArlo` avec zoom plein écran à la télécommande, serrures `altNuki` et alarme `altTydom` Tyxal+.
  5. **Audio, TV & Home-Cinéma** : Pilotage `altSonos`, `altCambridgeAudio`, `altDenon`, `altAirMedia`, `altSamsungTv`, `altJvcProjector` avec respect du plafond de volume dynamique (`volume_max` / `volume_max_set`).
  6. **Famille, École & Gaming** : Emploi du temps, devoirs et cantine `altPronote` & `altEducartable` + contrôle parental `altSwitch`, `altPlaystation` et `altXbox` (`+15 min`, `+30 min`, `Illimité`, `Bloquer`).
  7. **Scénarios & Modes** : Lancement en 1 clic des scénarios Jeedom par groupe.
  8. **Studio The Frame** : Sélection d'œuvre en direct, rotation du support motorisé, choix parmi **10 styles de Passe-partout (*Matte*)** et **9 thèmes `alt-erre`**.
- **Mode Veille Galerie / Tableau d'Art (Ambient Screensaver)** avec mise en veille automatique sur inactivité, horloge, météo, musique en cours et *pixel-shift* anti-marquage.
- **Notifications Toast / Picture-in-Picture (PiP)** sur la TV depuis les scénarios Jeedom avec support d'aperçu caméra `altArlo`.
- **Sécurité Kiosk conforme à l'Art. 4.3 des CGU du Jeedom Market** : jeton Kiosk 256-bit révocable et code PIN à 4 chiffres haché (`HMAC-SHA256`) dans `data/profiles/` (`0600` + `.htaccess`), passerelle `mediaProxy.php` sécurisée et widgets Dashboard/Mobile Dark Glass.
