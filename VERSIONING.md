# Politique de Numérotation de Version (`alt-erre`)

Tous les plugins Jeedom du catalogue **`alt-erre`** (**`altAirMedia`**, **`altBambuLab`**, **`altCambridgeAudio`**, **`altDenon`**, **`altJvcProjector`**, **`altRoborock`**, **`altSamsungTv`**, **`altSiemens`**) suivent une politique stricte de **Versionnement Sémantique ([SemVer 2.0.0](https://semver.org/lang/fr/))** adaptée aux deux canaux de distribution du **Jeedom Market** (**Beta** et **Stable**).

---

## 1. Format de version : `MAJEUR.MINEUR.CORRECTIF[-beta.N]`

Chaque version est identifiée par un numéro unique de la forme :

- **Canal Beta :** `X.Y.Z-beta.N` (ex. `0.1.0-beta.1`, `0.1.0-beta.2`, `0.2.0-beta.1`)
- **Canal Stable :** `X.Y.Z` (ex. `1.0.0`, `1.1.0`, `1.1.1`)

| Segment | Rôle | Quand l'incrémenter ? |
| :--- | :--- | :--- |
| **`MAJEUR` (`X`)** | Architecture / Rupture | `0` pendant la phase Beta initiale. Passe à `1` (`1.0.0`) lors de la première publication sur le canal **Stable** du Jeedom Market, puis s'incrémente en cas de refonte majeure ou de changement de prérequis (ex. nouvelle version minimale de Jeedom Core ou Debian). |
| **`MINEUR` (`Y`)** | Nouvelles fonctionnalités | Ajout d'appareils supportés, nouvelles commandes Jeedom, nouvelles options de widget ou améliorations substantielles rétrocompatibles. Remet `CORRECTIF` à `0`. |
| **`CORRECTIF` (`Z`)** | Corrections & Sécurité | Correction de bug, optimisation de performance (RAM/CPU), durcissement de sécurité ou mise à jour de traduction sans ajout fonctionnel. |
| **`-beta.N`** | Pré-version (Canal Beta) | Indique une version publiée sur le canal **Beta** du Jeedom Market. L'indice `N` (`1`, `2`, `3`...) est incrémenté à chaque itération de test sur une même cible `X.Y.Z`. |

---

## 2. Cycle de vie actuel : Phase Beta Initiale (`0.x.y-beta.N`)

Actuellement, l'ensemble des plugins du catalogue `alt-erre` est en **phase Beta** (`0.1.0-beta.1`) :

1. **`0.1.0-beta.1`** : Version Beta initiale de référence (architecture complète, démon Python asynchrone, widgets dédiés et conformité CGU Jeedom Market).
2. **`0.1.0-beta.2`, `0.1.0-beta.3`...** : Correctifs rapides suite aux retours des testeurs sur la branche `0.1.0`.
3. **`0.2.0-beta.1`** : Ajout d'une nouvelle fonctionnalité ou d'un nouveau modèle d'équipement pendant la période Beta.
4. **`1.0.0`** : Première version **Stable** officielle publiée sur le Jeedom Market une fois la phase Beta validée.

---

## 3. Traçabilité dans chaque dépôt de plugin

Dans chaque dépôt privé de code, la version courante est synchronisée à **4 endroits** :
1. Le fichier **`VERSION`** à la racine du dépôt (contenant uniquement la chaîne de version, ex. `0.1.0-beta.1`).
2. Le champ **`"pluginVersion"`** dans **`plugin_info/info.json`**.
3. Le fichier **`CHANGELOG.md`** du dépôt (et sa copie publique dans `jeedom-docs/<plugin>/changelog.md`).
4. Le **tag Git** annoté correspondant (ex. `v0.1.0-beta.1`).
