# Changelog — Alt Dashboard & Kiosk TV (`altTvDashboard`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier.
Ce projet respecte la [Politique de Numérotation de Version (SemVer)](../VERSIONING.md).

---

## [0.1.0-beta.13] — 2026-10-30

### Ajouté
- **Architecture Multi-Posture Adaptative pour iPhone Duo (Replié `1-Foot UI` & Déplié `2-Foot Dual-Pane UI`), Tablette et Mobile (`core/php/kiosk.php`, `desktop/css/kiosk.css`, `desktop/js/kiosk.js`, `core/class/altTvDashboard.class.php`, `desktop/php/altTvDashboard.php`)** :
  - **Détection automatique de la posture d'écran (`data-posture="tv" | "duo" | "mobile"`)** (et choix explicite dans la configuration Kiosk ou dans la vue *Studio & Réglages*) :
    1. **Posture iPhone Duo Replié / Smartphone (`data-posture="mobile"`, `1-Foot UI`)** :
       - **Rail de Navigation Vertical Droit au Pouce (`Right-Edge Thumb Rail`, `62px`)** : la barre des 8 vues est positionnée verticalement le long de la tranche droite de l'écran, directement sous l'arc naturel du pouce droit, libérant 100 % de la hauteur verticale à gauche pour les cartes d'équipements.
       - **En-tête compact mono-ligne** avec pilules de synthèse défilables horizontalement au doigt et prise en charge des zones de sécurité `env(safe-area-inset-*)` (Dynamic Island & barre d'accueil iOS).
       - **Modales en Tiroir Inférieur (*Bottom Sheet*)** : toucher le corps d'une carte ouvre ses réglages détaillés en tiroir glissant depuis le bas de l'écran (à portée immédiate du pouce), refermable en touchant l'arrière-plan flouté.
    2. **Posture iPhone Duo Déplié / Tablette (`data-posture="duo"`, `2-Foot UI` Master-Detail à 2 Volets)** :
       - **Disposition Double-Volet *Hinge-Safe* + Rail Droit Constant (`grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 68px`, gouttière centrale `env(fold-width, 16px)`)** : aucune carte ni bouton n'est jamais coupé en deux par la charnière centrale.
       - **Continuité musculaire Replié $\leftrightarrow$ Déplié** : le rail de navigation vertical reste exactement au même endroit sur le bord extérieur droit de l'écran, que l'iPhone Duo soit replié ou déplié.
       - **Volet Gauche (`#altKioskContent` — *Master*)** : navigation dans les vues, pièces et grilles de cartes.
       - **Volet Droit (`#altKioskInspector` — *Volet Compagnon / Inspecteur Permanent*)** : affiche par défaut le *Volet Compagnon* (flux caméra en direct, lecteur multimédia actif, équipements allumés et scénarios rapides) et, dès que l'utilisateur touche une carte sur le volet gauche, affiche instantanément tous ses contrôles détaillés (volets, thermostat, couleurs Hue/Twinkly, cahier de textes Pronote/Educartable, caméra) dans le volet droit sans masquer le volet gauche.
       - **Transition fluide au dépliage** : si une *Bottom Sheet* d'équipement ou de caméra était ouverte sur l'écran replié, déplier l'iPhone Duo transfère automatiquement l'équipement dans le Volet Droit et referme la modale.
  - **Ergonomie Tactile Native & Bascule Directe `1-Tap` sur l'icône des cartes** :
    - Sur appareil tactile (`pointer: coarse`), le piège de curseur Tizen (`dpadCursorTrap`) et le badge TV `OK ↵` sont automatiquement désactivés au profit du défilement inertiel natif.
    - **Toucher l'icône (`.alt-kcard-icon`)** d'une carte exécute immédiatement l'action principale en **1-Tap** (Allumer/Éteindre, Ouvrir/Fermer, Play/Pause), tandis que **toucher le reste de la carte** ouvre ses réglages complets dans le Volet Droit (en mode Duo) ou en *Bottom Sheet* (en mode Replié).

---

## [0.1.0-beta.12] — 2026-10-30

### Ajouté
- **Association optionnelle d'un Kiosk à un Profil Utilisateur Jeedom (`Droits r / w / n`) (`desktop/php/altTvDashboard.php`, `core/class/altTvDashboard.class.php`, `desktop/js/kiosk.js`, `desktop/js/altTvDashboard.js`)** :
  - Ajout du sélecteur **« Profil utilisateur Jeedom associé (Droits r / w) »** (`kioskUserId`) dans la configuration de chaque équipement Kiosk TV (*Par défaut : « Aucun (Droits complets du Kiosk) »*).
  - **Conservation de l'URL Kiosk dédiée à jeton (`token`) sans connexion** : l'accès depuis le téléviseur reste instantané et sans saisie de mot de passe, tandis que le serveur Jeedom applique automatiquement la matrice de droits de l'utilisateur sélectionné :
    - **`Aucun (n)`** : équipements et scénarios non autorisés totalement filtrés côté serveur (`checkUserEquipmentRight('r')` / `checkUserScenarioRight('r')`).
    - **`Visualisation (r)` (ou profil *Visiteur*)** : affichage des cartes et modales en **Mode Lecture seule (`👁️ Lecture seule`)** (`stripDescriptorActionsForReadOnly()`) et verrouillage strict côté serveur dans `executeKioskCommand()` et `executeKioskScenario()`.
    - **`Action (w)`** : consultation et exécution normales des commandes et scénarios (avec traçabilité `kiosk_tv:<login>` lors du lancement des scénarios).
    - Si le compte utilisateur Jeedom associé est désactivé dans Jeedom (`getEnable() == 0`), l'accès aux équipements et actions du Kiosk est automatiquement suspendu.

---

## [0.1.0-beta.11] — 2026-10-30

### Corrigé & Optimisé (Protection des Ressources CPU / RAM / Apache de la Box Jeedom)
- **Suppression du blocage des workers Apache dans `core/php/mediaProxy.php` (Cause principale de saturation serveur sur la vue *Studio Frame*)** :
  - `mediaProxy.php` n'appelle plus `$tvEq->ensureLocalThumbnail()` de manière synchrone et ne fait plus la boucle bloquante `10 × usleep(120000)` (`1,2 s` par vignette manquante) qui saturait les workers Apache (`mpm_prefork`) lorsque la galerie *Studio Frame* chargeait 25 vignettes simultanément.
  - Ajout d'en-têtes `Cache-Control: private, max-age=3600` sur les miniatures JPEG servies et `Cache-Control: private, max-age=300` sur le placeholder SVG de secours afin que le navigateur de la TV les mette en cache localement au lieu de les redemander à chaque cycle.
- **Suppression de `cmd::all()` (`preloadAllEqCmds`) et de `jeeObject::byId()` en boucle dans `buildKioskPayload()` (`core/class/altTvDashboard.class.php`)** :
  - Suppression de l'appel global `cmd::all()` à chaque poll (qui hydratait en mémoire les 2 000 à 5 000 commandes de toute la base Jeedom, y compris les équipements désactivés) au profit du chargement paresseux par équipement actif `ensureEqCmdsLoaded($eq)`.
  - Pré-indexation unique des pièces via `jeeObject::all()` au lieu d'exécuter `jeeObject::byId()` dans la boucle des équipements.
  - Restriction de `enrichDescriptorWithVisibleCmds()` aux seuls équipements génériques Jeedom (`default:`) et aux widgets Kiosk délégués (`getKioskWidgetData()`), évitant de ré-exécuter `$cmd->execCmd()` sur toutes les commandes secondaires des plugins natifs `alt*` (ex. les dizaines de commandes `art_item_*` de `altSamsungTv`).
- **Cache serveur court (`3 s`) de `buildKioskPayload()` avec invalidation immédiate sur action (`core/class/altTvDashboard.class.php`, `core/ajax/altTvDashboard.ajax.php`)** :
  - Mise en cache mémoire Jeedom (`altTvDashboard::payload::<id>`, TTL `3 s`) du payload Kiosk calculé : si plusieurs écrans (TV + navigateur PC) interrogent le Kiosk ou si un poll se rapproche, la réponse est servie en `< 0,5 ms` avec `0` requête SQL et `0` `execCmd()`.
  - Toute action exécutée depuis le Kiosk (`execKioskCmd`, `execMasterAction`, `execScenario`, `updateKioskSetting`) invalide immédiatement ce cache (`invalidateKioskPayloadCache()`).
- **Polling séquentiel anti-empilement (`pollInFlight`) et rendu DOM différentiel par signature dans `desktop/js/kiosk.js`** :
  - Remplacement du `setInterval` aveugle par une boucle `setTimeout` séquentielle protégée par un verrou `state.pollInFlight` et un `xhr.timeout = 8000 ms` : aucune requête `getKioskState` ne peut plus s'empiler si la box Jeedom ou le Wi-Fi de la TV ralentit, et le polling se met automatiquement en pause lorsque l'onglet est en arrière-plan (`document.hidden`) ou ralentit à `12 s` en mode veille *Tableau d'Art*.
  - Ajout d'une signature d'état légère (`computePayloadSignature(p)`) dans `applyPayload()` : tant qu'aucun état d'équipement, de pièce ou de configuration n'a changé depuis le poll précédent, `renderAll()` (**reconstruction complète du DOM et rechargement des 25 images du Studio Frame**) n'est plus appelé toutes les 3 secondes.

---

## [0.1.0-beta.10] — 2026-10-29

### Corrigé
- **Élimination du crénelage typographique global sur tout l'écran (`desktop/css/kiosk.css`, `desktop/js/kiosk.js`)** :
  - **Suppression de la surface géante `20000×20000px` (`.kiosk-scroll-arena`)** : remplacée par une micro-marge invisible de `+80px` (`calc(100vw + 80px) × calc(100vh + 80px)`, centrée sur `(40, 40)`), évitant que le compositeur GPU (Chromium / WebKit / Samsung Internet) ne réduise l'échelle de rastérisation de la page (`low_res_raster_scale_factor`) pour économiser la mémoire vidéo.
  - **Héritage typographique sur `<button>`, `<input>`, `<select>` et pile de polices multi-OS complète** : ajout de `button, input, select, textarea { font-family: inherit; ... }` (les dizaines de boutons `.kiosk-nav-btn`, `.kiosk-summary-pill`, `.kiosk-chip`, `.alt-pill-btn` n'héritaient pas de `font-family` et utilisaient la police système brute des contrôles navigateur) et enrichissement de la pile avec `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "SamsungOne", "Noto Sans", "Helvetica Neue", Arial, sans-serif`.
  - **Lissage sous-pixel adaptatif selon la densité de l'écran (`1x` vs `HiDPI 2x`)** : utilisation de `-webkit-font-smoothing: subpixel-antialiased; text-rendering: optimizeLegibility;` sur les écrans `1x` (Smart TV 1080p/4K à viewport `1920×1080` et moniteurs standards) où le mode `antialiased` en niveaux de gris amincissait et crénelait les petits textes blancs sur fond sombre, tout en conservant `antialiased` uniquement sous `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx)`.
  - **Suppression des calques `backdrop-filter: blur(18px)` sur `.kiosk-header` et `.kiosk-nav` et ancrage entier `(0,0)` en rotation Portrait** : évite la création de textures GPU RGBA hors-écran (qui désactivent le lissage sous-pixel du texte) et tout décalage de `0,5 px` lié à `top: 50%; left: 50%; transform: translate(-50%, -50%)`.

---

## [0.1.0-beta.9] — 2026-10-29

### Corrigé
- **Netteté 100 % des cartes en surbrillance (`.is-focused`) (`desktop/css/kiosk.css`)** :
  - Suppression du `transform: translateY(-2px) scale(1.018)` et du `backdrop-filter: blur(14px)` sur `.alt-kcard` / `.is-focused` qui forçaient le compositeur GPU du navigateur (WebKit / Chromium / Tizen) à étirer une texture bitmap de `1,8 %` en sous-pixels et rendaient le texte et les icônes de la carte sélectionnée flous. La surbrillance utilise désormais uniquement l'anneau lumineux `box-shadow` et l'élévation de contraste `background` à l'échelle exacte `1:1`.

---

## [0.1.0-beta.8] — 2026-10-29

### Ajouté & Amélioré
- **Moteur Universel de Widgets Kiosk par Défaut (par Lot) — Extraction automatique de toutes les commandes visibles (`core/class/altTvDashboard.class.php`, `desktop/js/kiosk.js`, `desktop/css/kiosk.css`)** :
  - Correction des cartes d'équipements génériques ou sondes/chauffages qui s'affichaient sans aucune commande lorsque leurs actions ne portaient pas les noms standards `on/off` ou `up/down` : `enrichDescriptorWithVisibleCmds()` inspecte désormais automatiquement toutes les commandes visibles (`isVisible == 1`) de chaque équipement :
    - **Commandes `action / other`** : génèrent automatiquement de grands boutons 10-Foot (`.kiosk-modal-big-btn`) dans la modale ouverte (avec détection de l'état actif via la commande `info` liée `getValue()`) ainsi qu'une pilule d'aperçu des actions en bas de la carte.
    - **Commandes `action / slider`** : génèrent automatiquement des barres de réglage par paliers rapides 10-Foot (`-`, `+`, paliers `0 % / 25 % / 50 % / 75 % / 100 %` ou consignes `°C`) avec lecture automatique de l'unité et des bornes `minValue`/`maxValue`.
    - **Commandes `action / select`** : lisent automatiquement la configuration `listValue` (`valeur|libellé;...`) pour afficher des rangées de puces sélectionnables à la télécommande (`.kiosk-chip`) avec mise en surbrillance de l'option active (idéal pour les modes Fil Pilote *Confort / Éco / Hors-Gel / Arrêt*, programmes, sources…).
    - **Commandes `action / color`** : affichent la palette de couleurs rapide 10-Foot.
    - **Commande `refresh`** : ajoute un bouton **`🔄 Actualiser`** dans l'en-tête de la modale.
    - **Commandes `info` visibles (`kpis`)** : affichées sous forme de pastilles synthétiques sur la carte et dans une grille dédiée **« Informations & Mesures » (`.kiosk-kpi-grid`)** dans la modale.
- **Système de Délégation de Widgets Kiosk aux Plugins (`getKioskWidgetData`) & Charte de Compatibilité Kiosk TV (`core/class/altTvDashboard.class.php`, `_charte_graphique/CHARTE_COMPATIBILITE_KIOSK_TV.md`)** :
  - Tout plugin `alt*` (ou tiers) peut désormais implémenter la méthode publique `$eqLogic->getKioskWidgetData(array $kioskContext)` sur sa classe `eqLogic` pour fournir son propre descripteur de carte et de modale 10-Foot (`action_buttons`, `sliders`, `selects`, `kpis`, `custom_modal_html`) tout en bénéficiant nativement de la navigation télécommande D-Pad, du piège à curseur Tizen, du code PIN et des 9 thèmes *Dark Glass*.

---

## [0.1.0-beta.7] — 2026-10-29

### Amélioré & Corrigé
- **Correction de l'onglet `🖼️ Studio Frame` sur le téléviseur (`desktop/js/kiosk.js`)** :
  - Correction de l'erreur `ReferenceError: Can't find variable: p` dans `buildFrameStudioView()` qui empêchait l'affichage du Studio Frame et du configurateur de vues/pièces/widgets sur le téléviseur.
- **Épuration visuelle des cartes ouvertes (Modales 10-Foot) sur le Dashboard TV (`desktop/js/kiosk.js`)** :
  - Suppression de la rangée de puces `🔑 Code PIN par commande` et du bouton PIN dans le pied de page des modales d'équipement sur le téléviseur (la configuration fine du PIN par équipement, commande et scénario restant centralisée dans le Back-Office Jeedom). Le pied de modale conserve uniquement les deux actions rapides essentielles : **`⭐ Épingler sur l'Accueil`** et **`🚫 Masquer ce widget`**.
- **Accélération drastique de l'exécution des commandes et du retour d'état sur les grandes installations Jeedom (`200+` équipements) (`core/class/altTvDashboard.class.php`, `core/ajax/altTvDashboard.ajax.php`, `desktop/js/kiosk.js`)** :
  - **Cache mémoire $O(1)$ des commandes Jeedom (`preloadAllEqCmds`)** : préchargement groupé en une seule requête SQL (`cmd::all()`) au lieu de ~3 000 requêtes SQL individuelles `$eq->getCmd()` lors de la construction du payload sur une installation de plus de 220 équipements, et court-circuitage des équipements masqués avant normalisation.
  - **Retour visuel optimiste instantané (`0 ms`)** : mise à jour immédiate de la carte, de la modale ouverte et des compteurs de synthèse d'en-tête (`💡 Lumières`, `🪟 Volets`, pièces) dès l'appui sur `OK`, sans attendre l'aller-retour réseau.
  - **Réponse AJAX ciblée ultra-rapide (`buildFastCommandUpdatePayload` / `getFastEqState`, `< 15 ms`)** : `execKioskCmd` ne reconstruit plus l'intégralité des 220+ équipements de la maison de façon synchrone mais rafraîchit uniquement l'équipement ciblé, suivi d'une confirmation d'état matériel asynchrone à `380 ms` et `1 100 ms` ainsi que du maintien du polling temps réel même lorsqu'une carte d'équipement est ouverte.

---

## [0.1.0-beta.6] — 2026-10-29

### Ajouté
- **Protection par Code PIN à 4 chiffres entièrement personnalisable par Équipement, par Commande et par Scénario (`core/class/altTvDashboard.class.php`, `core/ajax/altTvDashboard.ajax.php`, `desktop/php/altTvDashboard.php`, `desktop/js/altTvDashboard.js`, `desktop/js/kiosk.js`)** :
  - **Niveau Équipement (`pinRequiredEqIds` / `pinExemptEqIds`)** : possibilité d'exiger le code PIN sur toutes les actions de n'importe quel équipement (ex. portail, porte de garage, chauffage, appareil multimédia) ou inversement de désactiver le code PIN par défaut sur un équipement (ex. serrure `altNuki` ou console `altSwitch` / `altPlaystation` / `altXbox`).
  - **Niveau Commande individuelle (`pinRequiredCmdIds` / `pinExemptCmdIds`)** : bouton **`🔑 Commandes`** sur chaque ligne d'équipement dans le Back-Office (ainsi qu'en bas de chaque modale d'équipement sur le téléviseur) permettant d'activer (`🔒`) ou de désactiver (`🔓`) le code PIN **commande par commande** (ex. protéger uniquement la commande *Ouvrir* d'un portail tout en laissant *Fermer* libre).
  - **Niveau Scénario (`pinRequiredScenarioIds`)** : bouton **`🔒 PIN`** en face de chaque scénario (dans le Back-Office et dans la vue *Studio & Réglages* de la TV) permettant d'exiger la saisie du code PIN à la télécommande avant l'exécution du scénario.
  - **Sécurité anti-contournement sur la TV** : toute modification des règles de protection PIN depuis l'interface du téléviseur exige la saisie préalable du code PIN Kiosk actif.

---

## [0.1.0-beta.5] — 2026-10-29

### Ajouté
- **Configuration fine des Widgets, Pièces, Scénarios & Vues visibles par Téléviseur (`core/class/altTvDashboard.class.php`, `core/ajax/altTvDashboard.ajax.php`, `desktop/php/altTvDashboard.php`, `desktop/js/altTvDashboard.js`, `desktop/js/kiosk.js`)** :
  - **Nouvel onglet Back-Office Jeedom `🎛️ Widgets, Pièces & Scénarios visibles`** (indépendant pour chaque équipement Kiosk TV, permettant par exemple d'afficher un tableau de bord différent au Salon, dans la Cuisine ou dans la Chambre) :
    - **Onglets / Vues de la barre de navigation** : possibilité d'afficher ou masquer individuellement chaque vue (*Pièces*, *Éclairages*, *Volets & Accès*, *Climat & Énergie*, *Multimédia*, *Sécurité & Caméras*, *Famille & Maison*, *Scénarios*).
    - **Pièces (Objets Jeedom)** : sélection en 1 clic des pièces à afficher sur ce téléviseur.
    - **Équipements & Widgets (`alt*` et génériques Jeedom)** : liste complète groupée par pièce avec recherche instantanée, filtre par catégorie, compteur de widgets actifs, boutons d'action rapide (*Tout afficher*, *Tout masquer*, *Réinitialiser par défaut*), case **`👁️ Visible`** pour afficher/masquer chaque widget (y compris la possibilité de forcer l'affichage sur la TV d'un équipement masqué sur le Dashboard web Jeedom), et bouton **`⭐ Accueil`** pour épingler ses widgets favoris en tête de la vue *Accueil*.
    - **Scénarios Jeedom** : sélection individuelle des scénarios affichés sur le téléviseur.
  - **Configuration directe sur le Téléviseur à la télécommande (10-Foot UI)** :
    - **Dans chaque modale d'équipement (appui sur `OK` sur une carte)** : barre de personnalisation rapide en bas de la modale permettant d'**`⭐ Épingler sur l'Accueil`** ou de **`🚫 Masquer ce widget du Dashboard`** directement avec la télécommande TV.
    - **Dans la vue `🖼️ Studio & Réglages` sur le téléviseur** : nouvelle section **« Personnalisation des Vues, Pièces & Widgets affichés »** permettant de réafficher ou masquer à tout moment n'importe quel onglet, pièce ou widget d'un simple appui sur `OK`.
  - **Nouvelle section `⭐ Mes Widgets Épinglés sur l'Accueil`** en haut de la vue *Accueil* lorsqu'au moins un widget est marqué en favori.

---

## [0.1.0-beta.4] — 2026-10-29

### Amélioré & Corrigé
- **Cartes Vie Scolaire (`altPronote` / `altEducartable`) — Affichage du prénom/nom de l'enfant & Modale Scolaire Complète 10-Foot (`core/class/altTvDashboard.class.php`, `desktop/js/kiosk.js`)** :
  - **Résolution prioritaire du nom de l'enfant** : sur les comptes **Parent** PRONOTE, le Kiosk privilégie désormais systématiquement l'enfant suivi (`childName` / `childrenListJson` / correspondance avec le nom de l'équipement Jeedom) afin de ne plus jamais afficher le nom du parent titulaire du compte.
  - **Enrichissement des cartes Pronote / Educartable** : affichage direct de la classe, de l'établissement, de la moyenne générale (`/20`), de la dernière note, des horaires de début/fin de journée (`08:00 → 16:30`), de l'aperçu des cours du jour et des prochains devoirs.
  - **Nouvelle Modale Vie Scolaire Grand Écran (`renderSchoolModal`, `980 px`) à l'appui sur `OK`** :
    - Bandeau de 4 indicateurs synthétiques (*Horaires & cours annulés*, *Devoirs à faire/faits*, *Moyenne élève/classe & dernière note*, *Assiduité & Vie scolaire*).
    - **5 onglets navigables à la télécommande TV (`▲▼◀▶` + `OK`)** : *Vue d'ensemble*, *Emploi du temps (Aujourd'hui & Demain)*, *Devoirs interactifs* (cocher/décocher un devoir comme fait directement avec `OK`), *Notes & Moyennes par matière*, et *Cantine & Vie scolaire* (menus du jour et du lendemain, absences, retards, punitions, informations établissement et carnet de liaison).
    - Bouton **`🔄 Actualiser`** intégré pour déclencher une synchronisation immédiate avec Pronote / Educartable depuis le téléviseur.

---

## [0.1.0-beta.3] — 2026-10-29

### Amélioré & Corrigé
- **Pont Télécommande Tizen — Conversion du pointeur virtuel *Samsung Internet* en vrai D-Pad (`desktop/js/kiosk.js`, `desktop/css/kiosk.css`, `core/php/kiosk.php`)** :
  - Dans le navigateur natif *Samsung Internet* (`org.tizen.browser`) des téléviseurs Samsung *The Frame*, les flèches physiques de la télécommande déplacent par défaut un pointeur souris virtuel au lieu d'émettre des touches clavier `ArrowUp/Down/Left/Right`.
  - Ajout du **Piège à Curseur D-Pad (`dpadCursorTrap`, actif par défaut)** : dès la première impulsion directionnelle (`5 px`) de la télécommande, le focus `.is-focused` saute instantanément d'une carte à la suivante sans avoir à déplacer le pointeur jusqu'à la cible.
  - Ajout d'une **arène de défilement invisible (`20000×20000 px`, `#altKioskScrollArena`)** centrée automatiquement afin de continuer à capter les appuis directionnels (`▲▼◀▶`) même lorsque le pointeur virtuel du navigateur Tizen arrive en butée contre l'un des 4 bords de l'écran TV.
  - **Routage intelligent du bouton `OK` de la télécommande** : un appui sur `OK` déclenche toujours l'élément actuellement en surbrillance (`.is-focused`), quelle que soit la position où stationne le pointeur virtuel à l'écran.
  - **Interception du bouton physique `Retour` (`↩`) de la télécommande (`popstate`)** pour fermer une modale ou revenir à la barre de navigation latérale sans quitter la page Kiosk.
  - Ajout d'un bouton **`🎮 Télécommande D-Pad` $\leftrightarrow$ `🖱️ Mode Pointeur`** dans l'en-tête pour basculer librement si le dashboard est ouvert sur un PC avec souris.
- **Navigation 10-Foot simplifiée (`1 Carte = 1 Saut D-Pad`) & Modale de Contrôle TV Grand Format** :
  - Suppression des mini-boutons intermédiaires focusables dans la grille principale : chaque carte d'équipement représente désormais **un seul arrêt D-Pad** pour traverser l'écran en un minimum de clics.
  - Appuyer sur **`OK`** sur une carte ouvre une **Modale de Contrôle TV Grand Format** dotée de larges boutons 10-Foot (action principale pré-sélectionnée pour qu'un double `OK` bascule immédiatement l'état, paliers directs `0 % / 25 % / 50 % / 75 % / 100 %`, commandes `Ouvrir / Stop / Fermer / Favori`, consignes thermostat, couleurs et scènes).

---

## [0.1.0-beta.2] — 2026-10-29

### Corrigé
- **Rendu du Kiosk sur navigateur TV Tizen / Smart TV (`core/php/kiosk.php`, `desktop/js/kiosk.js`, `desktop/css/kiosk.css`, `core/class/altTvDashboard.class.php`)** :
  - Sécurisation complète de l'encodage JSON initial (`safeJsonEncode` avec nettoyage UTF-8 récursif, filtrage `NAN`/`INF`, échappement `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT` et balise `<script id="altKioskInitData" type="application/json">`) empêchant toute coupure de bloc `<script>` ou erreur de syntaxe JS sur le navigateur TV.
  - Intégration directe (*inline*) de `kiosk.css` et `kiosk.js` dans `kiosk.php` pour éviter tout blocage `.htaccess` ou problème de cache sur Samsung Internet (Tizen).
  - Remplacement de `fetch` / `URLSearchParams` / `closest` par `XMLHttpRequest` et parcours DOM natif compatibles avec toutes les générations de navigateurs Tizen.
  - Enrichissement de la vue **Accueil** pour afficher également la grille des équipements principaux de la maison lorsqu'aucun éclairage n'est allumé, et élargissement de la détection automatique des équipements génériques Jeedom visibles.

---

## [0.1.0-beta.1] — 2026-10-28

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Dashboard & Kiosk TV (`altTvDashboard`)** pour Jeedom v4.
- **Interface plein écran « 10-Foot UI » & Galerie d'Art (`core/php/kiosk.php`)** spécialement conçue pour le navigateur intégré des téléviseurs **Samsung The Frame (Tizen)**, Smart TV et écrans muraux :
  - **Moteur de Navigation Spatiale 2D (`SpatialNav`)** pilotable à 100 % avec la télécommande du téléviseur (flèches `▲▼◀▶`, `OK`, `Retour`, `Play/Pause`, `CH+/CH-`) avec anneau de focus lumineux haute visibilité à 3 mètres et conservation du focus lors des rafraîchissements temps réel.
  - **Mode Réglage de Curseur au D-Pad (`Slider Lock`)** : appui sur `OK` sur une jauge (luminosité, volet, thermostat, volume) pour verrouiller le réglage avec `◀` / `▶`, validation par `OK` et annulation par `Retour`.
- **Adaptation automatique Paysage (`16:9`) $\leftrightarrow$ Portrait (`9:16`) & Support motorisé Samsung (`VG-ARAB22WMT` / `VG-ARAB43STD`)** :
  - Mise en page responsive basculant entre le format panoramique `16:9` (barre latérale) et le format affiche/totem vertical `9:16`.
  - Mode **Rotation CSS forcée (`-90°` / `+90°`)** avec **inversion automatique de la matrice directionnelle D-Pad** pour les téléviseurs Samsung *The Frame* sur support motorisé dont le navigateur Tizen conserve un tampon vidéo `1920×1080` en mode vertical.
  - Synchronisation automatique de l'orientation et de l'œuvre d'art en cours avec un équipement **`altSamsungTv`** associé.
- **Agrégation native de l'écosystème `alt-erre` (19 plugins `alt*`) et des équipements génériques Jeedom** répartis en **8 vues thématiques** :
  1. **Accueil (Hub Maison)** : Horloge grand format, météo intérieure/extérieure, pilules de synthèse interactives, commandes générales rapides, lecteur multimédia actif et caméra principale.
  2. **Par Pièce (Objets Jeedom)** : Filtrage par pièce avec température/humidité et actions groupées par pièce.
  3. **Par Catégorie / Métier (Classé par Pièce)** : Vue filtrée par type (*Éclairages*, *Volets & Ouvrants*, *Climat & Énergie*, *Sécurité & Accès*, *Audio & TV*, *Famille & Gaming*, *Robots, Café & 3D*) avec **barre de commandes générales en tête** (*Tout éteindre*, *Ambiance Soirée 35 %*, *Tout ouvrir*, *Mi-hauteur 50 %*, *Tout fermer*, *Mode Confort / Éco*, *Pause générale*) et classement par pièce.
  4. **Caméras & Sécurité (Mur CCTV)** : Grille `16:9` des caméras `altArlo` avec zoom plein écran à la télécommande, serrures `altNuki` et alarme `altTydom` Tyxal+.
  5. **Audio, TV & Home-Cinéma** : Pilotage `altSonos`, `altCambridgeAudio`, `altDenon`, `altAirMedia`, `altSamsungTv`, `altJvcProjector` avec respect du plafond de volume dynamique (`volume_max` / `volume_max_set`).
  6. **Famille, École & Gaming** : Emploi du temps, devoirs et cantine `altPronote` & `altEducartable` + contrôle parental `altSwitch`, `altPlaystation` et `altXbox` (`+15 min`, `+30 min`, `Illimité`, `Bloquer`).
  7. **Scénarios & Modes** : Lancement en 1 clic des scénarios Jeedom par groupe.
  8. **Studio The Frame** : Sélection d'œuvre en direct, rotation du support motorisé, choix parmi **10 styles de Passe-partout (*Matte*)** et **9 thèmes `alt-erre`**.
- **Mode Veille Galerie / Tableau d'Art (Ambient Screensaver)** avec mise en veille automatique sur inactivité, horloge, météo, musique en cours et *pixel-shift* anti-marquage.
- **Notifications Toast / Picture-in-Picture (PiP)** sur la TV depuis les scénarios Jeedom avec support d'aperçu caméra `altArlo`.
- **Sécurité Kiosk conforme à l'Art. 4.3 des CGU du Jeedom Market** : jeton Kiosk 256-bit révocable et code PIN à 4 chiffres haché (`HMAC-SHA256`) dans `data/profiles/` (`0600` + `.htaccess`), passerelle `mediaProxy.php` sécurisée et widgets Dashboard/Mobile Dark Glass.
