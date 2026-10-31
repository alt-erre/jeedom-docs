# Changelog — Alt Caméras & Sécurité (Arlo) (`altArlo`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la convention [Semantic Versioning (SemVer)](https://semver.org/lang/fr/).

## [0.1.0-beta.13] — 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.12] — 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.12` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.11] - 2026-10-31

### Ajouté
- **Exploitation native du Stockage Local de la Base SmartHub Arlo (Carte microSD / Clé USB — `VMB5000`, `VMB4540`, `VMB4500`, `VMB4000`)** :
  - **Commandes & Bouton Widget sur la Station SmartHub (`basestation`)** :
    - `local_storage_state` (**« État stockage local (SD/USB) »**, `info/string`) et `local_storage_enabled` (**« Enregistrement local SD/USB actif »**, `info/binary`) synchronisés en temps réel via les notifications SSE `basestation` et `storage` ;
    - `local_storage_on` / `local_storage_off` (**« Activer / Désactiver enregistrement local SD/USB »**, `action/other`) configurant automatiquement `recordLocally: true`, `overwrite: true` (écrasement circulaire automatique des vidéos les plus anciennes) et `bestLocalResolution: true` (meilleure résolution 2K/4K) sur la base Arlo, avec bouton dédié **<i class="fas fa-sd-card"></i> Stockage local SD/USB** sur le widget de la station.
  - **Lecture & Streaming LAN direct depuis la Base Arlo (*Direct Storage Access / RATLS*)** :
    - Négociation automatique du jeton et du port local RATLS (`ratls/connectivity/{hubId}` et `ratls/token/{hubId}`) dans `altarlod.py` (`_fetch_hub_ratls_library`) pour interroger directement le serveur HTTPS local de la base Arlo (`https://<ip_locale_base>:<port_ratls>/hmsweb/users/library`) sur votre réseau local.
    - Ajout d'un proxy de streaming LAN sécurisé dans `core/php/snapshot.php?type=hub_stream` (validation stricte RFC1918 de l'IP privée LAN et streaming cURL par blocs, **0 Mo stocké sur Jeedom**).
  - **Modale Galerie Hybride (Cloud Arlo + Base Locale SD/USB)** : fusion automatique et dédoublonnage des enregistrements provenant du **💾 Stockage Local Base SD/USB** et du **☁️ Cloud Arlo**, permettant de visionner et télécharger les vidéos même sans abonnement Cloud Arlo ou après expiration de la rétention Cloud.

## [0.1.0-beta.10] - 2026-10-31

### Amélioré & Sobriété Matérielle
- **Stockage 100 % Cloud Arlo pour les vidéos & Galerie en Streaming direct (Zéro saturation du disque Jeedom)** :
  - Suppression de l'archivage local des vidéos `.mp4` et de l'historique multi-photos dans `data/media/` : les vidéos déclenchées via le bouton ** Vidéo** (`record_video`) restent **exclusivement hébergées sur le Cloud Arlo** (`my.arlo.com`).
  - Sur la box Jeedom, seule **1 vignette `.jpg` unique par caméra** (`data/snapshots/<deviceId>.jpg`, ~80 Ko écrasée atomiquement) est conservée pour l'aperçu 16:9 du widget, garantissant une empreinte disque fixe ($< 1\text{ Mo}$ au total) et zéro usure eMMC.
  - La modale **Galerie** (clic sur l'image du widget) interroge désormais en direct la **Bibliothèque Cloud Arlo (`/hmsweb/users/library`)** (`fetch_cloud_library`) et lit les vidéos `.mp4` en streaming directement depuis les serveurs Arlo.

## [0.1.0-beta.9] - 2026-10-31

### Ajouté
- **Bouton « Vidéo » (`record_video`) & Enregistrement de clips MP4** :
  - Ajout de la commande action **`record_video`** (**« Enregistrer une vidéo »**) et du bouton **<i class="fas fa-video"></i> Vidéo** à côté du bouton **Photo** sur les widgets Dashboard et Mobile.
  - Réveil de la caméra (`/hmsweb/users/devices/startStream` + `startRecord` pendant 15 s puis `stopRecord`) et téléchargement automatique du clip `.mp4` et de sa vignette `.jpg` depuis la bibliothèque Cloud Arlo.
- **Archivage local (`data/media/<deviceId>/`) & Modale Galerie Photos & Vidéos intégrée** :
  - Chaque photo ou vidéo capturée est archivée avec son horodatage dans `/var/www/html/plugins/altArlo/data/media/<deviceId>/` (rotation automatique sur les 20 dernières captures par caméra, protégées par `.htaccess` et servies via `core/php/snapshot.php`).
  - Clic sur l'aperçu 16:9 du widget ou sur le bouton **Galerie** pour ouvrir une fenêtre modale permettant de visualiser les photos, lire les vidéos `.mp4` et les télécharger en un clic.

### Corrigé
- **Affichage des vignettes (Snapshots) sur toutes les caméras** :
  - Correction des droits d'accès (`0755` sur `data/`, `data/snapshots/` et `data/media/`, `0644` sur les images créées par le démon `root`) qui empêchaient Apache (`www-data`) de lire les snapshots existants.
  - Validation binaire stricte des en-têtes JPEG/PNG (`\xff\xd8\xff` / `\x89PNG`) lors du téléchargement pour ne plus jamais enregistrer une réponse XML d'expiration AWS S3 (`AccessDenied`) à la place d'une image `.jpg`.
  - Récupération automatique de secours depuis la bibliothèque Cloud Arlo (`/hmsweb/users/library` sur 30 jours) lorsque l'URL `presignedLastImageUrl` d'une caméra en veille a expiré sur AWS S3, et prise en charge de l'événement SSE `mediaUploadNotification`.
- **Lisibilité et contraste des textes sur les widgets (`core/template/dashboard/altArlo.html`)** :
  - Forçage explicite de `color: var(--alt-text) !important` sur tous les textes, badges d'alimentation/signal (`#badge_1#`, `#badge_2#`), statuts (`Surveillance active`, `Batterie critique`) et pourcentages de luminosité afin d'empêcher le thème clair de Jeedom (`core2019_Light`) d'appliquer un texte gris foncé sur le fond sombre *Dark Glass*.

## [0.1.0-beta.8] - 2026-10-31

### Ajouté & Sécurité
- **Prise en charge sécurisée de l'expéditeur SMS alphanumérique « `Arlo` » lorsque le plugin officiel `SMS` de Jeedom filtre les numéros non autorisés** :
  - Ajout d'un lecteur de secours en lecture seule native (`pollSmsPluginLogsForArloOtp()` dans `altArlo.class.php`) capable d'extraire le code 2FA à 6 chiffres envoyé par `Arlo` (y compris avec bourrage PDU GSM 7-bit) directement depuis les entrées récentes du journal du plugin `sms` (`Message venant d'un numéro non autorisé : Arlo...` et `Send to jeedom : {'devices': {'Arlo': ...}}`) sans obliger l'utilisateur à autoriser les numéros inconnus dans son plugin `SMS`.
  - **Durcissement anti-injection de bout en bout** :
    - Zéro exécution de commande shell (`fopen`/`fseek` binaire borné aux 32 derniers Ko sur liste blanche stricte de logs) ;
    - Protection mathématique contre le *Log Forging* multi-lignes par vérification de l'apostrophe ASCII littérale `'` hors `secureXSS()` dans `jeeSMS.php` et de l'échappement `repr()` mono-ligne dans `smsd.py`, doublée d'une garde temporelle anti-collision ;
    - Rejet strict de tout numéro de téléphone mobile personnel (`+336`/`+337`/`06`/`07`) tentant d'usurper le mot-clé `Arlo` dans le corps d'un SMS ;
    - Validation stricte en sortie (`^\d{6}$`, exclusivement 6 chiffres ASCII `0-9`, taille d'entrée bornée à 512 octets contre tout risque de ReDoS).
  - **Auto-remplissage du code 2FA SMS lors de la connexion interactive (Méthode 1)** : détection automatique du SMS Arlo entrant dans la page de configuration et pré-remplissage du champ de validation à 6 chiffres.

## [0.1.0-beta.7] - 2026-10-31

### Ajouté
- **Reconnexion Automatique 2FA 100 % autonome (Module 4G / SMS Jeedom & E-mail IMAP SSL)** :
  - Ajout d'un moteur de renouvellement automatique de session dans `altarlod.py` déclenché dès que les serveurs Arlo révoquent ou font expirer le jeton (`error: 2015 - Invalid Token` ou événement SSE `action: logout`).
  - **Exploitation native du Module 4G / SMS Jeedom** (`poll_sms_otp`) : déclenchement de l'envoi du SMS 2FA Arlo et lecture automatique du code à 6 chiffres reçu sur la commande Info SMS de Jeedom (sélectionnable via `#[Objet][Modem 4G][Message]#` ou auto-détectée parmi les équipements SMS/4G/Modem/Gammu actifs et leur historique).
  - **Lecteur E-mail IMAP SSL intégré** (`imaplib.IMAP4_SSL`) : extraction automatique du code à 6 chiffres dans les e-mails de vérification envoyés par `do_not_reply@arlo.com`.
  - **Double canal avec bascule automatique (Fallback)** : modes *SMS 4G en priorité puis E-mail IMAP en secours*, *E-mail IMAP en priorité puis SMS 4G en secours*, *SMS uniquement* ou *IMAP uniquement*.
  - Stockage chiffré/isolé des paramètres d'auto-reconnexion dans `data/profiles/auto_auth.json` (`chmod 0600` + `.htaccess`, zéro secret dans `ps aux`) et bouton **« Tester le renouvellement automatique maintenant »** dans la configuration du plugin.

## [0.1.0-beta.6] - 2026-10-31

### Corrigé
- **Protection anti-révocation du jeton Cloud Arlo (`error: 2015 - Invalid Token`) lors de la synchronisation** : suppression de l'ouverture d'un second flux SSE concurrent (`/hmsweb/client/subscribe`) dans `synchronizeDevices()` qui entrait en collision avec le flux SSE déjà maintenu par le démon `altarlod.py` et provoquait la déconnexion immédiate de la session par les serveurs Arlo (`action: logout`).
- **Détection temps réel de l'expiration de session & Maintien de session (`keep-alive`)** :
  - Détection automatique des événements SSE `action: logout` et des erreurs `2015 / Invalid Token`, marquage immédiat dans `session.json` et passage du statut du démon en `NOK` avec message explicite dans Jeedom et dans la page de configuration.
  - Ajout d'un appel périodique de maintien de session (`/hmsweb/users/session/v2` toutes les 15 minutes) dans `altarlod.py` et démarrage automatique du démon dès la validation du code 2FA ou l'import de token.
- **Exécution des actions et rafraîchissement des widgets Dashboard (`altArlo.class.php` / `altarlod.py`)** :
  - Correction du cache de rendu dans `toHtml()` via `$this->postToHtml(...)` pour garantir la mise à jour instantanée des widgets en Jeedom v4.4+.
  - Ajout d'un fallback CLI automatique (`exec_cmd`) dans `sendToDaemon()` pour exécuter les actions des widgets même si le démon est en cours de redémarrage, et affichage d'une alerte immédiate sur le Dashboard si la session Arlo a expiré.
  - Prise en charge complète des stations SmartHub partagées (`uniqueId` propriétaire distinct et double envoi `automation/active` + `notify/{station_id}`) dans `set_station_mode()`.
  - Amélioration de la capture d'instantané (`take_snapshot` via `/hmsweb/users/devices/fullFrameSnapshot` + polling différé 4 s / 8 s et droits de lecture `0644` dans `data/snapshots/` protégé par `.htaccess`).

## [0.1.0-beta.5] - 2026-10-30

### Corrigé
- **Élimination des timeouts sur le callback interne vers Jeedom (`jeeAltArlo.php` / `altarlod.py`)** :
  - Rafraîchissement différentiel des widgets (`$this->refreshWidget()`) et de l'état de batterie (`$this->batteryStatus()`) dans `applyDeviceProperties()` et `applyStationModeUpdate()`, déclenché uniquement lorsqu'une valeur a réellement changé (ou toutes les heures pour le suivi de batterie Jeedom), divisant par 20 le temps de traitement des lots SSE de 15+ caméras.
  - Suppression des appels redondants à `$eqLogic->save()` et `$cmd->save()` dans `inventory_refresh` et `createOrUpdateCmd()` lorsque les définitions de modes et de commandes sont inchangées.
  - Sérialisation asynchrone des callbacks dans `altarlod.py` (`_callback_lock`, timeout étendu à 45 s, contournement de proxy système et retry automatique en cas de pic de charge Apache/PHP).

## [0.1.0-beta.4] - 2026-10-30

### Corrigé
- **Authentification 2FA Cloud (`ocapi-app.arlo.com`) sous Linux/Debian** : intégration de l'émulation d'empreinte TLS JA3/JA4 et HTTP/2 navigateur via `curl_cffi` (profils Chrome/Safari avec pré-chauffage et persistance des cookies `__cf_bm` entre les étapes `/api/auth`, `/api/getFactors`, `/api/startAuth` et `/api/finishAuth`) et `cloudscraper` en secours pour éviter le blocage Cloudflare (`403 Forbidden`) lors de la demande de code 2FA sur VM Linux.
- **Auto-installation transparente** de `curl_cffi` et `cloudscraper` (licences MIT) dans `resources/venv` dès la première requête 2FA si la mise à jour du plugin est appliquée sans relancer manuellement les dépendances.

## [0.1.0-beta.3] - 2026-10-30

### Corrigé
- **Port socket interne dédié `55102` (`core/class/altArlo.class.php`, `plugin_info/install.php`)** : attribution du port TCP local dédié **`55102`** au démon `altarlod.py` et migration automatique de l'ancien port `55095` (réservé par `altSonos` dans la gamme `alt-erre`).

## [0.1.0-beta.2] - 2026-10-27

### Amélioré
- **Retour visuel d'action & Protection anti-double-clic (Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (Modes de sécurité *Armé* / *Désarmé*, *Capture*, *Flux Direct*, *Sirène*, *Projecteur*).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Ajout d'une protection anti-double-clic (`1,5 s`) sur les commandes asynchrones d'armement, de capture et de sirène afin d'éviter l'envoi de requêtes doublons vers le Cloud Arlo.
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.1] - 2026-10-23

### Ajouté
- **Première version Beta (`0.1.0-beta.1`)** du plugin **Alt Caméras & Sécurité (Arlo)** (`altArlo`) pour Jeedom v4.
- **Moteur Python natif (`altarlod.py`) 100 % indépendant** (zéro dépendance sous licence GPL/AGPL) avec gestion du flux temps réel **SSE (`/hmsweb/client/subscribe`)** et reconnexion automatique.
- **Double méthode d'authentification Cloud Arlo** :
  - Assistant interactif **2FA (Email / SMS)** directement intégré dans la page de configuration du plugin ;
  - Import rapide de session / commande `Copy as cURL` depuis `my.arlo.com`.
- **Auto-découverte complète du parc matériel Arlo** :
  - Stations **SmartHub / Base Station** (`VMB5000`, `VMB4540`, `VMB4500`, `VMB4000`, `VMB3000`) ;
  - Caméras **Arlo Ultra / Ultra 2 4K** (`VMC5040`), **Arlo Pro 5S 2K** (`VMC4060B`), **Arlo Pro 4** (`VMC4041PB`), **Arlo Pro 2** (`VMC4030P`), **Arlo Wire-Free** (`VMC3030`) et gamme **Essential** ;
  - Projecteurs **Arlo Pro 3 Floodlight** (`FB1001B`) avec contrôle ON/OFF et variateur de luminosité (`0–100 %`) ;
  - Sonnettes vidéo **Arlo Video Doorbell** (`AVD2001B`) avec remontée d'appui bouton et mode silence ;
  - Caméras **Arlo Baby** (`ABC1000`).
- **Support dynamique des Modes Personnalisés (*Custom Modes*) & Plannings** : création automatique des commandes d'action pour chaque mode personnalisé défini dans l'application Arlo (ex. `mode2` *« Activé à domicile »*).
- **Gestion avancée de l'alimentation (`chargerTech` & `chargingState`)** : distinction entre alimentation **Secteur** (`Regular`), **Panneau Solaire** (`SolarCharger`) et **Batterie** (`None`), même lorsque la batterie est maintenue à 100 %.
- **Widgets personnalisés « Dark Glass » (Dashboard & Mobile)** avec aperçu 16:9 sécurisé du dernier snapshot (via proxy HMAC interne `core/php/snapshot.php`), prise de photo à la demande et 5 thèmes de couleur.
- **Sécurité renforcée** : zéro secret dans `ps aux`, fichiers de session et snapshots protégés en `0600` avec `.htaccess`.
