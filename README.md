# Documentation & Support — Plugins Jeedom `alt-erre`

Bienvenue sur le dépôt public de **documentation**, de **suivi des versions (Changelogs)** et de **support (Issues)** des plugins Jeedom développés par **Aurélien Léovant (`alt-erre`)**.

> **Note :** Conformément à la licence des plugins `alt-erre`, le code source est hébergé dans des dépôts privés dédiés au déploiement sur le **Jeedom Market**. Ce dépôt public centralise toute la documentation utilisateur ainsi que le suivi des tickets (bugs et demandes d'évolution).

---

## Catalogue des Plugins & État des Versions

Tous les plugins suivent notre [Politique de Numérotation de Version (SemVer)](VERSIONING.md) et sont actuellement distribués en **canal Beta (`0.1.0-beta.1`)**.

| Plugin | ID Market | Catégorie | Version actuelle | Canal | Liens rapides |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Alt Air Média** | `altAirMedia` | Multimédia | `0.1.0-beta.5` | `Beta` | [Documentation](altAirMedia/) · [Changelog](altAirMedia/changelog) |
| **Alt Caméras & Sécurité (Arlo)** | `altArlo` | Sécurité | `0.1.0-beta.2` | `Beta` | [Documentation](altArlo/) · [Changelog](altArlo/changelog) |
| **Alt Print 3D (Bambu Lab)** | `altBambuLab` | Objets connectés | `0.1.0-beta.4` | `Beta` | [Documentation](altBambuLab/) · [Changelog](altBambuLab/changelog) |
| **Alt Audio (Cambridge)** | `altCambridgeAudio` | Multimédia | `0.1.0-beta.6` | `Beta` | [Documentation](altCambridgeAudio/) · [Changelog](altCambridgeAudio/changelog) |
| **Alt AVR Control (Denon / Marantz)** | `altDenon` | Multimédia | `0.1.0-beta.4` | `Beta` | [Documentation](altDenon/) · [Changelog](altDenon/changelog) |
| **Alt Vie Scolaire (Educartable)** | `altEducartable` | Organisation | `0.1.0-beta.5` | `Beta` | [Documentation](altEducartable/) · [Changelog](altEducartable/changelog) |
| **Alt Éclairage & Ambiance (Philips Hue)** | `altHue` | Lumière | `0.1.0-beta.1` | `Beta` | [Documentation](altHue/) · [Changelog](altHue/changelog) |
| **Alt Ciné Projector (JVC D-ILA)** | `altJvcProjector` | Multimédia | `0.1.0-beta.5` | `Beta` | [Documentation](altJvcProjector/) · [Changelog](altJvcProjector/changelog) |
| **Alt Serrure & Accès (Nuki)** | `altNuki` | Sécurité | `0.1.0-beta.1` | `Beta` | [Documentation](altNuki/) · [Changelog](altNuki/changelog) |
| **Alt Contrôle Parental (PlayStation)** | `altPlaystation` | Multimédia | `0.1.0-beta.1` | `Beta` | [Documentation](altPlaystation/) · [Changelog](altPlaystation/changelog) |
| **Alt Vie Scolaire (Pronote)** | `altPronote` | Organisation | `0.1.0-beta.6` | `Beta` | [Documentation](altPronote/) · [Changelog](altPronote/changelog) |
| **Alt Robot Vacuum (Roborock)** | `altRoborock` | Objets connectés | `0.1.0-beta.2` | `Beta` | [Documentation](altRoborock/) · [Changelog](altRoborock/changelog) |
| **Alt Frame & Smart TV (Samsung)** | `altSamsungTv` | Multimédia | `0.1.0-beta.16` | `Beta` | [Documentation](altSamsungTv/) · [Changelog](altSamsungTv/changelog) |
| **Alt Café & Home Connect (Siemens)** | `altSiemens` | Objets connectés | `0.1.0-beta.11` | `Beta` | [Documentation](altSiemens/) · [Changelog](altSiemens/changelog) |
| **Alt Multiroom Audio (Sonos)** | `altSonos` | Multimédia | `0.1.0-beta.4` | `Beta` | [Documentation](altSonos/) · [Changelog](altSonos/changelog) |
| **Alt Contrôle Parental (Nintendo Switch)** | `altSwitch` | Multimédia | `0.1.0-beta.6` | `Beta` | [Documentation](altSwitch/) · [Changelog](altSwitch/changelog) |
| **Alt Dashboard & Kiosk TV** | `altTvDashboard` | Multimédia | `0.1.0-beta.11` | `Beta` | [Documentation](altTvDashboard/) · [Changelog](altTvDashboard/changelog) |
| **Alt Éclairages & Effets LED (Twinkly)** | `altTwinkly` | Lumière | `0.1.0-beta.1` | `Beta` | [Documentation](altTwinkly/) · [Changelog](altTwinkly/changelog) |
| **Alt Habitat & Domotique (Delta Dore Tydom)** | `altTydom` | Protocole domotique | `0.1.0-beta.16` | `Beta` | [Documentation](altTydom/) · [Changelog](altTydom/changelog) |
| **Alt Contrôle Parental (Xbox)** | `altXbox` | Multimédia | `0.1.0-beta.7` | `Beta` | [Documentation](altXbox/) · [Changelog](altXbox/changelog) |

---

## Signaler un bug ou proposer une amélioration (Issues)

Vous pouvez ouvrir un ticket directement dans l'onglet **[Issues](../../issues)** de ce dépôt :

1. **[Signaler un bug (Bug Report)](../../issues/new?template=bug_report.yml)** : sélectionnez le plugin concerné dans le menu déroulant, indiquez sa version (ex. `0.1.0-beta.1`) et joignez les logs Jeedom en mode `Debug`.
2. **[Proposer une amélioration / Nouveau matériel (Feature Request)](../../issues/new?template=feature_request.yml)** : suggérez l'ajout d'une fonctionnalité ou la prise en charge d'un nouvel appareil.

Les tickets sont automatiquement catégorisés à l'aide des **labels par plugin** (`plugin:altAirMedia`, `plugin:altArlo`, `plugin:altBambuLab`, `plugin:altCambridgeAudio`, `plugin:altDenon`, `plugin:altEducartable`, `plugin:altHue`, `plugin:altJvcProjector`, `plugin:altNuki`, `plugin:altPlaystation`, `plugin:altPronote`, `plugin:altRoborock`, `plugin:altSamsungTv`, `plugin:altSiemens`, `plugin:altSonos`, `plugin:altSwitch`, `plugin:altTvDashboard`, `plugin:altTwinkly`, `plugin:altTydom`, `plugin:altXbox`) et **par canal** (`canal:beta`, `canal:stable`).
