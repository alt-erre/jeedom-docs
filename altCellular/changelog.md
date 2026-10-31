# Changelog — Alt Téléphonie, MMS & Portail GSM (`altCellular`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

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
