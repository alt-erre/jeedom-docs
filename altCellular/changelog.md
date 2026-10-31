# Changelog — Alt Téléphonie, MMS & Portail GSM (`altCellular`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.7] — 2026-10-31 (Canal Beta)

### Corrigé
- **Qualité vocale claire sur le pont Voice-over-USB Quectel (`AT+QPCMV=1,0`, `resources/altCellulard.py`)** :
  - **Cadencement Uplink officiel Quectel (`1600 octets` toutes les `100 ms`)** : remplacement des blocs de 640 octets / 40 ms (taille des paquets descendants *downlink*) par des trames montantes *uplink* strictes de **1600 octets toutes les 100 ms** conformément à la note d'application *Quectel EC2x & EG9x Voice Over USB Application Note*, éliminant les sous-alimentations de tampon DMA qui transformaient la voix en bruits hachés.
  - **Mode POSIX `termios` 100 % brut (`cfmakeraw`) et écriture atomique 16-bit** : désactivation explicite de `OPOST` / `ONLCR` (`c_oflag = 0`, `c_iflag = 0`, `c_lflag = 0`) sur `/dev/ttyUSB1` pour empêcher le noyau Linux de convertir l'octet PCM `0x0A` en `0x0D 0x0A` (ce qui décalait tout le flux 16-bit Little-Endian d'un octet et produisait du bruit blanc).
  - **Session audio continue sans coupure et gain nominal téléphonique (`-6 dBFS`)** : maintien du port `/dev/ttyUSB1` ouvert pendant toute la durée de l'appel (avec trames de silence `0x00` entre les répétitions), suppression de la collision avec `AT+QPSND` lorsque `AT+QPCMV=1,0` est actif et normalisation audio à `16000` (`AT+QAUDMOD=0`, `AT+QAUDPLAYGAIN=8192`) sans saturation du codec GSM AMR / VoLTE.

---

## [0.1.0-beta.6] — 2026-10-31 (Canal Beta)

### Sécurité & Conformité CGU Jeedom Market
- **Encapsulation de `apikey` dans le corps JSON POST des callbacks (`resources/altCellulard.py`, `core/php/jeeAltCellular.php`)** :
  - Suppression du paramètre `?apikey=...` de l'URL de callback HTTP (`jeeAltCellular.php`) au profit d'une transmission dans le corps JSON `POST` (`payload["apikey"]`) et l'en-tête HTTP `X-Jeedom-Apikey`, garantissant que la clé API interne n'apparaisse jamais ni dans les logs du plugin ni dans les journaux d'accès Apache (Art. 4.3 CGU).
- **Confinement strict des opérations `apt` au script `dependancy_install` (`resources/altCellulard.py`, `core/class/altCellular.class.php`)** :
  - Toute installation de paquet système (`espeak-ng`, `libttspico-utils`, `sox`, `alsa-utils`) est strictement confinée à `resources/install_apt.sh` lors de l'exécution explicite des dépendances par Jeedom Core (`dependancy_install()`), et l'arrêt du démon s'appuie exclusivement sur l'API officielle `system::kill()` du Core Jeedom (Art. 4.4 CGU).

---

## [0.1.0-beta.5] — 2026-10-31 (Canal Beta)

### Corrigé
- **Détection d'état du démon lancé via `sudo` (`deamon_info` / `isDaemonRunning`) et masquage `urllib3` dans les logs (`core/class/altCellular.class.php`, `resources/altCellulard.py`)** :
  - Correction de `deamon_info()` : lorsque `altCellulard.py` est exécuté sous `root` (via `system::getCmdSudo()`), l'appel PHP `posix_kill($pid, 0)` exécuté par `www-data` retournait `false` (`EPERM`) et supprimait par erreur `deamon.pid` alors que le démon venait de démarrer. La vérification s'appuie désormais sur `/proc/<pid>`, le code `EPERM` (`posix_get_last_error() === 1`) et la table des processus (`ps auxww`).
  - Masquage des logs internes `DEBUG` de `urllib3` / `requests` afin que la clé API interne ne figure jamais dans le fichier de log en mode `Debug` (conformité Art. 4.3 CGU).

---

## [0.1.0-beta.4] — 2026-10-31 (Canal Beta)

### Corrigé
- **Moteur Voice-over-USB Quectel (`AT+QPCMV=1,0` / `AT+QPCMV=1,2`) pour modems 4G sans puce codec externe (`resources/altCellulard.py`, `core/class/altCellular.class.php`, `plugin_info/install.php`, `resources/install_apt.sh`)** :
  - **Injection PCM directe sur USB (`AT+QPCMV=1,0` + `/dev/ttyUSB1`)** : sur la Jeedom Luna 4G (Dusun DSGW-210 / Quectel EC25 / EG25-G) et les clés 4G USB dépourvues de puce codec audio matérielle I2S externe, activation automatique du pont numérique **Voice-over-USB** (`AT+QGPSCFG="outport","none"` + `AT+QPCMV=1,0` + `AT+QAUDMOD=3`), détection automatique de l'interface USB #01 (`/dev/ttyUSB1`) et injection en temps réel des trames PCM 8000 Hz 16-bit signées mono (640 octets toutes les 40 ms) avec drainage simultané du flux descendant.
  - **Support USB Audio Class ALSA (`AT+QPCMV=1,2` + `aplay`) & Correction `<ulmute>=1` sur `AT+QPSND` / `AT+QAUDPLAY`** : correction du paramètre `<ulmute>` (`1` = ne pas couper l'émission uplink vers l'appelant distant, au lieu de `0` qui coupait l'uplink), correction de la syntaxe 2/4 paramètres de `AT+QAUDPLAY` et prise en charge des cartes son USB UAC (`alsa-utils`).
  - **Exécution du démon avec privilèges système (`system::getCmdSudo()`) et redémarrage automatique** : lancement du démon via `sudo` dans `deamon_start()` pour garantir l'accès immédiat aux ports `/dev/ttyUSB*`, `/dev/ttyLuna*`, `/dev/snd/*` et à la détection `fuser` des processus `root` (`ModemManager` / `smsd`), et arrêt/relance automatique de l'ancienne instance du démon à la fin de `install_apt.sh` et `altCellular_update()`.

---

## [0.1.0-beta.3] — 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

---

## [0.1.0-beta.2] - 2026-10-31

### Corrigé
- **Synthèse vocale TTS et injection audio dans l'appel sur Quectel EC25 / EG25-G (`resources/altCellulard.py`, `core/class/altCellular.class.php`, `resources/install_apt.sh`)** :
  - **Téléversement vers le modem via `AT+QFUPL`** : correction de la commande de téléversement du fichier audio WAV et des pièces jointes MMS vers le stockage interne du modem Quectel (`AT+QFUPL` au lieu de `AT+QFDWL` qui correspond au sens inverse modem $\rightarrow$ hôte), avec pré-téléversement avant la numérotation `ATD` et cache d'empreinte SHA-256 pour éviter tout re-transfert série inutile lors des répétitions.
  - **Diffusion dans le flux montant de l'appel via `AT+QPSND`** : utilisation des commandes officielles Quectel `AT+QPSND=1,"alt_tts.wav",0,0,0` / `AT+QPSND=1,"alt_tts.wav",0,1,0` / `AT+QPSND=1,"alt_tts.wav",0` (avec repli automatique vers `AT+QAUDPLAY`, `AT+QPLAY` et `AT+QTTS` ASCII/UCS-2) et déblocage systématique du microphone (`AT+CMUT=0`).
  - **Normalisation WAV 8 kHz 16-bit PCM mono canonique (en-tête RIFF 44 octets strict)** : ajout d'un convertisseur et rééchantillonneur Python natif (`wave` + `array`) supprimant les chunks parasites (`LIST`/`fact`) rejetés par le décodeur matériel Quectel, normalisant le gain audio pour le codec GSM AMR et ajoutant une amorce de silence de `250 ms` pour éviter toute coupure de la première syllabe au décroché.
  - **Fiabilisation de la détection de décroché (`AT+CLCC`) et des moteurs TTS locaux** : tolérance aux réponses `AT+CLCC` transitoires pendant l'établissement d'appel VoLTE/CSFB, calcul dynamique de l'intervalle de répétition selon la durée réelle du fichier WAV, raccrochage automatique propre en fin de diffusion et vérification/installation résiliente de `espeak-ng` / `pico2wave` dans `dependancy_info()` et `install_apt.sh`.

---

## [0.1.0-beta.1] - 2026-10-31

### Ajouté
- **Version initiale Beta (`0.1.0-beta.1`) du plugin `Alt Téléphonie, MMS & Portail GSM` (`altCellular`)** :
  - **Démon Python Zero-Trust (`resources/altCellulard.py`, port TCP `55104`)** :
    - Auto-détection intelligente des ports AT sur **Jeedom Luna 4G (Quectel EC25 / EG25-G)** et modems 4G USB (`/dev/ttyUSB*`, `/dev/ttyACM*`) avec cohabitation sans conflit avec `ModemManager` et le plugin `SMS` officiel.
    - **Moteur « Ping d'Appel Portail GSM (CLIP) »** : surveillance temps réel `AT+CLCC` de l'état de sonnerie distante (`stat=3 Alerting`), détection de l'acquittement par rejet d'appel des relais GSM type **RTU5024**, coupure automatique après la durée de sonnerie configurée et sécurité anti-facturation en cas de décroché.
    - **Appels vocaux d'alerte avec synthèse vocale hors-ligne (TTS) & Serveur Vocal Interactif (DTMF)** : génération locale de fichiers WAV 8 kHz 16-bit mono (`pico2wave` / `espeak-ng` + `sox`), injection audio numérique Quectel (`AT+QFDWL` / `AT+QAUDPLAY` / `AT+QTTS`) et décodage temps réel des touches DTMF (`AT+QTONEDET=1`) avec validation de code PIN DTMF.
    - **Double moteur d'envoi de MMS Photos** : encodeur natif **OMA MMS binaire (`M-Send.req`)** avec profils MMSC pré-configurés (Orange, Free Mobile, SFR, Bouygues Telecom) + repli sur la pile matérielle Quectel (`AT+QMMS*`) et compression/assainissement automatique des images via `Pillow`.
    - **Envoi et réception de SMS sécurisés en mode PDU hexadécimal (`AT+CMGF=0` UCS-2 / GSM 7-bit)** avec interrupteur de désactivation permettant de cohabiter avec le plugin `SMS` officiel.
  - **Bouclier de Sécurité Anti-Injection & Conformité CGU Jeedom Market** :
    - Validation E.164 stricte des numéros, encodage PDU hexadécimal intégral, exécution TTS sans shell (`shell=False`), protection anti-LFI par `realpath()` et vérification des Magic Bytes sur les pièces jointes MMS, liste blanche des numéros entrants et quotas glissants anti-hors-forfait.
    - Zéro secret dans `ps aux` (`daemon_config.json` en permissions `0600` supprimé à l'arrêt) et 100 % de dépendances sous licences permissives (`pyserial`, `Pillow`, `requests`, `certifi`).
  - **Widgets « Dark Glass » (`alt-erre` v1.2)** pour Dashboard et Mobile (9 thèmes de couleur) + compatibilité **Kiosk TV 10-Foot (`getKioskWidgetData`)**.
