# Changelog — Alt Téléphonie, MMS & Portail GSM (`altCellular`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

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
