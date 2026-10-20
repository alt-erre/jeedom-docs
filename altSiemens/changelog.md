# Changelog — Alt Siemens (`altSiemens`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

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
