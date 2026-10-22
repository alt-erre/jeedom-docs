# Changelog — Alt Siemens (`altSiemens`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.10] — 2026-10-22 (Canal Beta)

### Amélioré
- **Procédure dédiée iOS / iPadOS (iPhone & iPad) dans l'Assistant et la Documentation** :
  - Ajout des instructions spécifiques pour **iOS / iPadOS** (utilisation de l'extension Safari gratuite *Web Inspector* sur l'App Store et nécessité d'appuyer sur **« Annuler »** lorsque iOS propose *« Ouvrir dans Home Connect ? »* afin que l'application mobile Home Connect ne consomme pas le code à usage unique).

## [0.1.0-beta.9] — 2026-10-22 (Canal Beta)

### Ajouté
- **Interception automatique « Zéro-F12 » du schéma `hcauth://` (Mac / Windows) & Auto-collage** :
  - Ajout dans l'Étape 1 de l'assistant d'une option d'activation en 1 clic d'un capteur système `hcauth://` pour **macOS** (AppleScript `AltSiemensHCAuth.app`) et **Windows** (registre utilisateur `HKCU:\Software\Classes\hcauth`). Dès que la connexion SingleKey ID se termine dans n'importe quel navigateur (y compris Safari), l'adresse `hcauth://auth/prod?code=...` est interceptée automatiquement et copiée dans le presse-papiers sans jamais ouvrir `F12`.
  - Détection et insertion automatiques du contenu du presse-papiers dans le champ de l'Étape 2 dès le retour sur l'onglet Jeedom (et ajout d'un bouton **Coller**).

## [0.1.0-beta.8] — 2026-10-22 (Canal Beta)

### Amélioré
- **Assistant SingleKey ID (PKCE) & Capture de l'URL `hcauth://auth/prod?code=...`** :
  - Ajout d'un bouton **« Copier le lien (Recommandé) »** à l'Étape 1 de l'assistant pour permettre d'ouvrir manuellement un nouvel onglet vierge avec l'inspecteur (`Cmd + Option + I` sur Mac / `F12` sur PC) et **Preserve log / Conserver le journal** déjà activés avant de charger la page SingleKey ID (évitant la perte de l'historique réseau lors de l'ouverture d'un nouvel onglet).
  - Ajout de la procédure détaillée via l'onglet **Console** (`Failed to launch 'hcauth://auth/prod?code=...'`) et via l'onglet **Réseau / Network**, ainsi que l'extraction automatique du code même si toute la ligne d'erreur de la Console est collée à l'Étape 2.

## [0.1.0-beta.7] — 2026-10-21 (Canal Beta)

### Ajouté
- **Sauvegarde & Restauration Hors-Ligne des clés locales (`.json`)** : Ajout d'un bouton de téléchargement `.json` (et d'affichage/masquage `œil` des clés `PSK` et `IV`) directement sur la fiche Équipement ainsi que dans l'Assistant Clés Locales (sur le même principe qu'`altRoborock`). Le fichier `.json` exporté embarque les clés locales (`PSK` + `IV`), l'identifiant `HAID`, l'adresse IP et l'intégralité du dictionnaire XML (`features`, `programs`, `errors`), permettant de restaurer l'équipement 100 % hors-ligne en cas de réinitialisation de Jeedom.

## [0.1.0-beta.6] — 2026-10-20 (Canal Beta)

### Corrigé
- **Rendu visuel fidèle à la base `altAirMedia` (Contours, Dégradés & Boutons ronds)** :
  - Alignement exact des variables CSS (`--sie-bg`, `--sie-card`, `--sie-card-border`), ajout du contour extérieur `1px solid rgba(255, 255, 255, 0.20) !important` (`border-radius: 16px !important`), de la barre d'en-tête bord-à-bord avec filet de séparation et verrouillage de `border-radius: 50% !important` sur les boutons circulaires face aux surcharges CSS de Jeedom Core.

## [0.1.0-beta.5] — 2026-10-20 (Canal Beta)

### Amélioré
- **Vignette dynamique par Boisson / Programme dans la Carte État (Dashboard & Mobile)** :
  - La vignette `.sie-cup-wrap` adapte dynamiquement son icône, son libellé court (`ESPRESSO`, `RISTRET.`, `CAPPUC.`, `FLAT W.`, `LATTE`, `CREMA`, `AMERIC.`, `LAIT`, `EAU CH.`, `ENTRETIEN`, `VEILLE`) et son dégradé selon la boisson sélectionnée ou en cours de préparation.

## [0.1.0-beta.4] — 2026-10-20 (Canal Beta)

### Modifié
- **Harmonisation graphique des widgets Dashboard et Mobile (`alt-erre` Dark Glass)** :
  - Adoption du système de design unifié `alt-erre` (sur le modèle d'`altAirMedia`) : en-tête intégré `.sie-header` avec boutons circulaires *Power* et *Refresh*, carte Barista `.sie-status-card` (`58×58 px` + `.sie-conn-dot` + jauge de progression), barre d'actions avec bouton principal *Servir* lumineux, curseur de volume en `ml` `.sie-slider-box` et sélecteurs `.sie-select`.
  - Ajout du sélecteur de thème couleur par équipement (`Noir Dark Glass`, `Blanc`, `Bleu`, `Jaune`, `Rouge`).

## [0.1.0-beta.3] — 2026-10-19 (Canal Beta)

### Corrigé
- **Conflit de port socket local avec `altAirMedia`** : Changement du port socket interne par défaut de `55089` (déjà utilisé par le démon `altAirMedia`) vers **`55092`** (avec migration automatique de la configuration existante au démarrage du démon et lors de la mise à jour du plugin).

## [0.1.0-beta.2] — 2026-10-19 (Canal Beta)

### Corrigé
- **Démon Python & Virtualenv (`resources/venv`)** : Préservation du lien symbolique `resources/venv/bin/python3` dans `getPythonBinary()` (évitant sa résolution vers `/usr/bin/python3` par `realpath()`) et auto-injection de `resources/venv/lib/python*/site-packages` dans `altSiemensd.py` et `hc_cloud_helper.py` pour garantir le chargement de `pycryptodome` (`Crypto`) et `aiohttp`.
- **Supervision du démon & Port Socket (`55089`)** : Remplacement de `ps ax` (tronqué à 80 colonnes sous Linux) par une vérification directe `/proc/<pid>` et `ps auxww` dans `isDaemonRunning()`, reprise automatique du port `55089` si une ancienne instance est en cours d'arrêt, écriture du fichier `deamon.pid` uniquement après acquisition du socket et fermeture garantie de `aiohttp.ClientSession`.

### Modifié
- **Catégorie Jeedom** : Déplacement du plugin dans la catégorie **Objets connectés** (`devicecommunication`).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % en local des appareils électroménagers **Siemens / BSH Home Connect** et en particulier de la machine à café expresso broyeur **Siemens EQ900** (`TQ903`, `TQ905`, `TQ907`...) via connexion WebSocket locale chiffrée (**AES-CBC + HMAC-SHA256** port `80` et **TLS-PSK** port `443`).
- Catalogue complet des boissons Specialty & CoffeeWorld, paramètres Barista (`BeanAmount`, volume `FillQuantity` en ml, température, sélection du bac à grains `DualBean`, vitesse d'extraction `FlowRate`, mode 2 tasses, chauffe-tasses) et capteurs d'alertes/entretien.
- Prise en charge des autres appareils électroménagers Siemens (lave-vaisselle, four, lave-linge, sèche-linge, réfrigérateur, cave à vin, hotte) avec synchronisation dynamique des commandes depuis le profil XML/JSON de l'appareil.
- Assistant intégré de récupération unique des clés locales (`PSK` / `IV`) via OAuth2 PKCE SingleKey ID ou import d'archive `.zip`/`.json`.

### Sécurité & Conformité
- Protection du répertoire `data/profiles` par `.htaccess` (`Require all denied`) et permissions `chmod 0600` sur les profils locaux et sur le fichier `devices.json` du démon.
- Avis de confidentialité intégré dans la modale de l'assistant PKCE et dans la documentation (conformité CGU Jeedom Market).
