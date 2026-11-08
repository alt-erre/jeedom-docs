# Changelog - Alt Électromobilité & Charge (Tesla) (`altTesla`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.3] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.2] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.1] - 2026-11-06 (Canal Beta)

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`) du plugin `Alt Électromobilité & Charge (Tesla)` (`altTesla`)** :
  - **Démon Python asynchrone 100 % Local Bluetooth Low Energy (`resources/altTeslad.py`, port interne `55106`)** :
    - Communication directe sans Cloud ni Internet entre le contrôleur Bluetooth local de la box Jeedom (`hci0` / `hciX`, compatible dongle USB Bluetooth 4.0 BLE sur **Jeedom Luna**) et le véhicule via le protocole chiffré **Tesla Vehicle Command Protocol over BLE** (`teslamotors/vehicle-command` sous licence Apache-2.0 + `bleak` sous licence MIT).
    - **Détection passive d'arrivée et de départ au garage** par écoute BLE non-intrusive de l'identifiant local `S<sha1(VIN)[:16]>C` et remontée du niveau de réception `RSSI` (`dBm`) sans réveiller l'ordinateur de bord.
    - **Architecture « Smart Sleep Guard » anti-drain fantôme** séparant les interrogations du contrôleur basse consommation **`VCSEC`** (verrouillage, veille, ouvrants, présence) de celles du calculateur **`Infotainment`** (batterie, charge, climatisation), avec suspension automatique après la fenêtre de quiétude paramétrable (`15 min` par défaut).
    - Sobriété matérielle calibrée pour **Jeedom Luna** : zéro boucle active CPU (`asyncio`), cache de sessions cryptographiques BLE en RAM `tmpfs` (`/tmp/jeedom/altTesla`) borné par rotation LRU en permissions `0600`, filtrage par delta et hystérésis (`RSSI >= 4 dBm`, températures `>= 0,3 °C`, puissance `>= 0,1 kW`) sur une session HTTP persistante unique.
  - **Assistant d'appairage local hors-ligne en 4 étapes par carte clé NFC (`desktop/php/altTesla.php`, `desktop/js/altTesla.js`, `core/ajax/altTesla.ajax.php`)** :
    - Détection des adaptateurs Bluetooth `hciX` présents sur la box Jeedom et scanner radio des véhicules Tesla BLE à portée dans le garage.
    - Génération locale de la paire de clés cryptographiques **ECDSA NIST P-256 (`prime256v1`)** dans `data/keys/` (`.htaccess` + permissions `0600` + écriture atomique POSIX `.tmp` + `fsync` + `rename`), envoi de la demande d'enrôlement BLE à valider par pose de la carte NFC sur la console centrale et vérification de l'enregistrement de la clé auprès du véhicule.
  - **54 commandes Jeedom créées et typées sémantiquement (`core/class/altTesla.class.php`)** :
    - **31 commandes `info`** : présence garage, `RSSI`, état veille/éveil, verrouillage, portes/coffres/trappe, mode Sentinelle, niveau de batterie (`%`), batterie utilisable, autonomie (`km`), état de charge, câble branché, limite SoC (`%`), consigne et courant réel (`A`), tension (`V`), puissance (`kW`), énergie ajoutée (`kWh`), temps restant (`min`), état et consigne de climatisation, températures intérieure/extérieure, dégivrage, rapport engagé, vitesse, odomètre et version logicielle.
    - **23 commandes `action`** : rafraîchissement `VCSEC` sans réveil, réveil complet, démarrage/arrêt de charge, réglage dynamique de l'intensité de charge (`5 A` à `32 A` pour délestage et surplus solaire), limite de charge (`50 %` à `100 %`), ouverture/fermeture/déverrouillage de la trappe de charge, climatisation `ON/OFF` et consigne (`15 °C` à `28 °C`), verrouillage/déverrouillage, Sentinelle `ON/OFF`, coffre arrière, *Frunk*, aération/fermeture des vitres, appel de phares et klaxon.
    - Typage sémantique Jeedom Core 4.2+ complet (`POWER` -> famille `Energy`, catégorie par défaut `energy`, migration sans usure eMMC `ensureAllEquipmentsTyped()`).
  - **Widgets « Dark Glass » `v1.4` (`core/template/dashboard/altTesla.html`, `core/template/mobile/altTesla.html`) & Compatibilité Kiosk TV (`altTvDashboard`)** :
    - Support des **9 thèmes de couleur**, de l'option `widgetCategoryHeader` (coloration de la barre de titre selon la catégorie Jeedom), des boutons d'en-tête circulaires `26x26 px` et de 3 onglets interactifs (*Charge*, *Climat*, *Accès*).
    - Implémentation native du contrat 10-Foot UI `getKioskWidgetData()` pour **Alt Dashboard & Kiosk TV (`altTvDashboard`)**.
  - **Conformité stricte aux CGU du Jeedom Market** : zéro secret, clé ni `--apikey` dans `ps aux`, installation des dépendances en priorité basse (`nice -n 19` / `ionice -c 3`) et zéro dépendance Copyleft GPL/AGPL.
