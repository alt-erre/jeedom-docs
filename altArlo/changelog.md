# Changelog — Alt Caméras & Sécurité (Arlo) (`altArlo`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la convention [Semantic Versioning (SemVer)](https://semver.org/lang/fr/).

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
