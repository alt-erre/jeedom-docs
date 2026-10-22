# Documentation & Support — Plugins Jeedom `alt-erre`

Bienvenue sur le dépôt public de **documentation**, de **suivi des versions (Changelogs)** et de **support (Issues)** des plugins Jeedom développés par **Aurélien Léovant (`alt-erre`)**.

> **Note :** Conformément à la licence des plugins `alt-erre`, le code source est hébergé dans des dépôts privés dédiés au déploiement sur le **Jeedom Market**. Ce dépôt public centralise toute la documentation utilisateur ainsi que le suivi des tickets (bugs et demandes d'évolution).

---

## Catalogue des Plugins & État des Versions

Tous les plugins suivent notre [Politique de Numérotation de Version (SemVer)](VERSIONING.md) et sont actuellement distribués en **canal Beta (`0.1.0-beta.1`)**.

| Plugin | ID Market | Catégorie | Version actuelle | Canal | Liens rapides |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Alt Air Média** | `altAirMedia` | Multimédia | `0.1.0-beta.3` | `Beta` | [Documentation](altAirMedia/) · [Changelog](altAirMedia/changelog) |
| **Alt Print 3D (Bambu Lab)** | `altBambuLab` | Objets connectés | `0.1.0-beta.3` | `Beta` | [Documentation](altBambuLab/) · [Changelog](altBambuLab/changelog) |
| **Alt Audio (Cambridge)** | `altCambridgeAudio` | Multimédia | `0.1.0-beta.4` | `Beta` | [Documentation](altCambridgeAudio/) · [Changelog](altCambridgeAudio/changelog) |
| **Alt AVR Control (Denon / Marantz)** | `altDenon` | Multimédia | `0.1.0-beta.1` | `Beta` | [Documentation](altDenon/) · [Changelog](altDenon/changelog) |
| **Alt Ciné Projector (JVC D-ILA)** | `altJvcProjector` | Multimédia | `0.1.0-beta.4` | `Beta` | [Documentation](altJvcProjector/) · [Changelog](altJvcProjector/changelog) |
| **Alt Vie Scolaire (Pronote)** | `altPronote` | Organisation | `0.1.0-beta.4` | `Beta` | [Documentation](altPronote/) · [Changelog](altPronote/changelog) |
| **Alt Robot Vacuum (Roborock)** | `altRoborock` | Objets connectés | `0.1.0-beta.1` | `Beta` | [Documentation](altRoborock/) · [Changelog](altRoborock/changelog) |
| **Alt Frame & Smart TV (Samsung)** | `altSamsungTv` | Multimédia | `0.1.0-beta.13` | `Beta` | [Documentation](altSamsungTv/) · [Changelog](altSamsungTv/changelog) |
| **Alt Café & Home Connect (Siemens)** | `altSiemens` | Objets connectés | `0.1.0-beta.9` | `Beta` | [Documentation](altSiemens/) · [Changelog](altSiemens/changelog) |
| **Alt Multiroom Audio (Sonos)** | `altSonos` | Multimédia | `0.1.0-beta.1` | `Beta` | [Documentation](altSonos/) · [Changelog](altSonos/changelog) |
| **Alt Contrôle Parental (Nintendo Switch)** | `altSwitch` | Multimédia | `0.1.0-beta.1` | `Beta` | [Documentation](altSwitch/) · [Changelog](altSwitch/changelog) |

---

## Signaler un bug ou proposer une amélioration (Issues)

Vous pouvez ouvrir un ticket directement dans l'onglet **[Issues](../../issues)** de ce dépôt :

1. **[Signaler un bug (Bug Report)](../../issues/new?template=bug_report.yml)** : sélectionnez le plugin concerné dans le menu déroulant, indiquez sa version (ex. `0.1.0-beta.1`) et joignez les logs Jeedom en mode `Debug`.
2. **[Proposer une amélioration / Nouveau matériel (Feature Request)](../../issues/new?template=feature_request.yml)** : suggérez l'ajout d'une fonctionnalité ou la prise en charge d'un nouvel appareil.

Les tickets sont automatiquement catégorisés à l'aide des **labels par plugin** (`plugin:altAirMedia`, `plugin:altBambuLab`, `plugin:altCambridgeAudio`, `plugin:altDenon`, `plugin:altJvcProjector`, `plugin:altPronote`, `plugin:altRoborock`, `plugin:altSamsungTv`, `plugin:altSiemens`, `plugin:altSonos`, `plugin:altSwitch`) et **par canal** (`canal:beta`, `canal:stable`).
