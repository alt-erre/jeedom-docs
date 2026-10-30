# Changelog — Alt Caméras & Sécurité (Arlo) (`altArlo`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la convention [Semantic Versioning (SemVer)](https://semver.org/lang/fr/).

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
