# Changelog - Alt JVC Projector (`altJvcProjector`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.11] - 2026-11-08 (Beta)

### Corrigé
- **Lisibilité & Contraste du thème « Blanc / Light Glass » (`white` — Charte Graphique `v1.5`)** :
  - **Isolation face au thème sombre de Jeedom Core (`--txt-color` / `--link-color`)** : redéfinition locale forcée des variables du Core Jeedom (`--txt-color: #0f172a !important`, `--link-color: #0f172a !important`, `color-scheme: light !important`) empêchant `desktop.main.css` et `mobile.main.css` d'appliquer un texte gris clair (`#b9b9b9`) sur les liens, boutons, listes déroulantes et libellés du widget blanc.
  - **Tokens typographiques opaques haute lisibilité (WCAG AAA)** : passage du texte principal en encre ardoise profonde (`#0f172a`, contraste `16.2:1`) et du texte secondaire `--alt-muted` en gris ardoise franc **sans transparence alpha** (`#334155`, contraste `9.8:1`), éliminant l'effet de texte gris délavé sur les sous-titres et métadonnées.
  - **Adaptation des badges, vignettes et teintes pastel en mode clair** : conversion des fonds `rgba(255, 255, 255, ...)` en surfaces ardoise contrastées (`rgba(15, 23, 42, 0.07)`) et déclinaison des couleurs sémantiques pastel en teintes foncées haute lisibilité (`#0369a1`, `#b45309`, `#15803d`, `#b91c1c`) sur les vues Dashboard et Mobile.

## [0.1.0-beta.10] - 2026-11-07 (Canal Beta)

### Corrigé
- **Contrôle d'accès `401` compatible Jeedom 4.4+ (`plugin_info/configuration.php`)** : remplacement de l'inclusion obsolète `desktop/php/404.php` (supprimée du Core Jeedom 4.4+) et gestion propre du code HTTP `401` en appel direct (session expirée sur la page *Mises à jour*) afin d'éliminer toute erreur fatale PHP dans `http.error`.

## [0.1.0-beta.9] - 2026-11-06 (Canal Beta)

### Ajouté & Amélioré
- **Charte Graphique Widgets `v1.4` (`core/template/dashboard/altJvcProjector.html`, `core/template/mobile/altJvcProjector.html`, `core/class/altJvcProjector.class.php`, `plugin_info/`)** :
  - **Coloration optionnelle de la barre de titre par catégorie Jeedom (`widgetCategoryHeader`)** : ajout d'une option activable au niveau du plugin permettant de colorer la barre de titre des widgets Dashboard & Mobile selon la catégorie d'appartenance Jeedom de l'équipement (`Chauffage`, `Sécurité`, `Énergie`, `Lumière`, `Ouvrant`, `Automatisme`, `Multimédia`, `Autre` via `--cat-*-color`), avec invalidation automatique du cache widget.
  - **Boutons de barre de titre arrondis** : harmonisation stricte des boutons d'action et de rafraîchissement de l'en-tête (`border-radius: 50% !important`, `26x26 px`, `padding: 0 !important`) sur Dashboard et Mobile pour neutraliser les surcharges CSS du Core Jeedom.

## [0.1.0-beta.8] - 2026-11-02 (Canal Beta)

### Ajouté
- **Widget Kiosk TV 10-Foot natif avec affiche cinéma 16:9 D-ILA (`getKioskWidgetData()`, `kiosk_schema = 1`)** :
  - Intégration native Niveau 2 pour **`altTvDashboard`** générant une affiche panoramique `16:9` *JVC D-ILA BLU-Escent Laser* mettant en avant la résolution (`4K/8K e-shiftX`), le format HDR, l'entrée HDMI et la mémoire optique active.
  - Exposition 10-Foot des boutons discrets *Marche / Veille*, des entrées *HDMI 1 / 2*, des bascules *8K e-shiftX*, *Theater Optimizer* et *Cache Hide*, ainsi que des sélecteurs *Mode Image*, *Lens Memory*, *Puissance Laser* et *Niveau Frame Adapt HDR*.

## [0.1.0-beta.7] - 2026-10-31 (Canal Beta)

### Ajouté & Corrigé
- **Typage sémantique automatique des équipements et des commandes (`Outils → Types d'équipement` Jeedom Core 4.2+)** :
  - Définition automatique de la famille de type d'équipement (`$eqLogic->setGenericType(...)` via résolution dynamique `resolveEqLogicGenericType()`) et de la catégorie Jeedom par défaut (`$eqLogic->setCategory(..., 1)`) dans `preSave()` afin qu'aucun équipement n'apparaisse dans la section *« Equipements sans type »* de Jeedom.
  - Typage systématique des commandes via `$cmd->setGeneric_type(...)` (`GENERIC_INFO` / `GENERIC_ACTION` ou type métier spécifique) et migration rétroactive automatique des équipements existants (`ensureAllEquipmentsTyped()`).

## [0.1.0-beta.6] - 2026-10-31 (Canal Beta)

- **Affichage de la version SemVer & commit Git** : Ajout d'un badge de version lisible (`v0.1.0-beta.6` + hash court du commit Git) sur la page d'accueil du plugin (`Gestion`), sur la page de configuration globale (`configuration.php`) et dans le panneau *Informations* de la gestion des plugins Jeedom.

## [0.1.0-beta.5] - 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action & Protection anti-double-clic (Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur tous les boutons des widgets **Dashboard & Mobile** (Alimentation, entrées HDMI, D-Pad OSD, mémoires d'objectif, modes lampe/laser).
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`).
  - Ajout d'un verrouillage anti-double-clic (`1,5 s`) sur les commandes d'allumage, d'extinction et de rappel de mémoire d'objectif (`Lens Memory`).
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.4] - 2026-10-20 (Canal Beta)

### Corrigé
- **Rendu visuel fidèle à la base `altAirMedia` (Contours, Dégradés & Boutons ronds)** :
  - Alignement exact des variables CSS (`--jvc-bg`, `--jvc-card`, `--jvc-card-border`), ajout du contour extérieur `1px solid rgba(255, 255, 255, 0.20) !important` (`border-radius: 16px !important`), de la barre d'en-tête bord-à-bord avec filet de séparation et verrouillage de `border-radius: 50% !important` sur les boutons d'en-tête et le D-Pad face aux surcharges CSS de Jeedom Core.

## [0.1.0-beta.3] - 2026-10-20 (Canal Beta)

### Amélioré
- **Vignette dynamique par Entrée HDMI / État dans la Carte État (Dashboard & Mobile)** :
  - La vignette `.jvc-art-wrap` s'adapte dynamiquement selon l'entrée active (`HDMI 1`, `HDMI 2`) et l'état d'alimentation du projecteur (`CHAUFFE`, `REFROID.`, `VEILLE`) avec icône, libellé court en capitales et dégradé dédié.

## [0.1.0-beta.2] - 2026-10-20 (Canal Beta)

### Modifié
- **Harmonisation graphique des widgets Dashboard et Mobile (`alt-erre` Dark Glass)** :
  - Adoption du système de design unifié `alt-erre` (sur le modèle d'`altAirMedia`) : en-tête intégré `.jvc-header` avec boutons circulaires *Power On*, *Veille* et *Refresh*, carte statut & signal vidéo `.jvc-now-playing` (`58×58 px` + `.jvc-status-dot`), sélecteurs `.jvc-select` et télécommande OSD repliable avec **D-Pad squircle** et bouton `OK` central circulaire.
  - Ajout du sélecteur de thème couleur par équipement (`Noir Dark Glass`, `Blanc`, `Bleu`, `Jaune`, `Rouge`).

## [0.1.0-beta.1] - 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage et supervision 100 % en local des vidéoprojecteurs Home-Cinéma **JVC D-ILA** via le protocole TCP/IP officiel (port `20554`) : gammes **DLA-NZ9 / NZ8 / NZ7**, **NZ900 / NZ800 / NZ700 / NZ500**, **NP5**, **NX9 / N7 / N5**, **Z1** et **Série X**.
- Support natif de l'authentification **SHA-256 (`password` + `JVCKWPJ`)** et de l'authentification historique 16 octets / sans mot de passe.
- Double mode de fonctionnement : **Socket TCP Direct PHP** (sans démon) ou **Démon Python Temps Réel** avec verrouillage de session TCP (`asyncio.Lock`).
- Contrôle complet : alimentation, entrées HDMI 1/2, télémétrie du signal source (8K60, 4K120, HDR10/HDR10+/HLG, espace colorimétrique), puissance et contrôle dynamique du Laser BLU-Escent, 10 mémoires d'optique motorisée (`Lens Memory 1..10`), modes anamorphiques, `Frame Adapt HDR`, `Theater Optimizer`, `8K e-shiftX`, `Clear Motion Drive` et télécommande OSD.

### Sécurité & Conformité
- Stockage temporaire de la configuration du démon avec permissions restreintes (`chmod 0600`) et nettoyage automatique à l'arrêt.
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
