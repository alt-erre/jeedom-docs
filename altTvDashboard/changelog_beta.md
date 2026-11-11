# Changelog Beta - Alt Dashboard & Kiosk TV (`altTvDashboard`)

Ce document résume les fonctionnalités en cours d'ajout et les correctifs publiés sur le **canal Beta** du plugin.
Pour les versions majeures du canal Stable, consultez le [Changelog Stable](https://alt-erre.github.io/jeedom-docs/altTvDashboard/changelog).

---

## [0.1.0-beta.25] - 2026-11-08

- Amélioration de la lisibilité et des contrastes du thème clair (Blanc / Light Glass) sur les widgets.

## [0.1.0-beta.24] - 2026-11-07

- Correction d'un problème d'accès à la page de configuration sous Jeedom 4.4+.

## [0.1.0-beta.23] - 2026-11-06

- Ajout de l'option de coloration de la barre de titre par catégorie et harmonisation de l'en-tête des widgets.

## [0.1.0-beta.22] - 2026-11-05

- Refonte visuelle et fonctionnelle du Widget Jeedom Dashboard & Mobile.

## [0.1.0-beta.21] - 2026-11-02

- Mise en valeur des Jaquettes Multimédias & Proxy sécurisé.

## [0.1.0-beta.20] - 2026-11-02

- Sélection du Fond d'écran & des Œuvres The Frame dans l'onglet Studio.

## [0.1.0-beta.19] - 2026-11-01

- Protection anti-stampede des workers Apache et déverrouillage de session PHP.

## [0.1.0-beta.18] - 2026-11-01

- Navigation Spatiale D-Pad Déterministe par Zone & par Rangée/Colonne.
- Correction de la fermeture intempestive des modales d'équipement à la validation OK sur Smart TV.

## [0.1.0-beta.17] - 2026-11-01

- Conformité Niveau 2 complète du rendu des cartes et modales Caméras 10-Foot.

## [0.1.0-beta.16] - 2026-10-31

- Attribution automatique de la catégorie et du type d'équipement Jeedom.

## [0.1.0-beta.15] - 2026-10-31

- Affichage du numéro de version du plugin dans l'interface de gestion.

## [0.1.0-beta.14] - 2026-10-30

- Capture Automatique des Notifications & Nouvel Onglet « 🔔 Centre de Notifications ».

## [0.1.0-beta.13] - 2026-10-30

- Architecture Multi-Posture Adaptative pour iPhone Duo , Tablette et Mobile.

## [0.1.0-beta.12] - 2026-10-30

- Association optionnelle d'un Kiosk à un Profil Utilisateur Jeedom.

## [0.1.0-beta.11] - 2026-10-30

- **Suppression du blocage des workers Apache dans core/php/mediaProxy.php **.
- Suppression de cmd::all() et de jeeObject::byId() en boucle dans buildKioskPayload().
- Cache serveur court de buildKioskPayload() avec invalidation immédiate sur action.
- Polling séquentiel anti-empilement et rendu DOM différentiel par signature dans desktop/js/kiosk.js.

## [0.1.0-beta.10] - 2026-10-29

- Élimination du crénelage typographique global sur tout l'écran.

## [0.1.0-beta.9] - 2026-10-29

- Netteté 100 % des cartes en surbrillance.

## [0.1.0-beta.8] - 2026-10-29

- Moteur Universel de Widgets Kiosk par Défaut - Extraction automatique de toutes les commandes visibles.
- Système de Délégation de Widgets Kiosk aux Plugins & Charte de Compatibilité Kiosk TV.

## [0.1.0-beta.7] - 2026-10-29

- Correction de l'onglet 🖼️ Studio Frame sur le téléviseur.
- Épuration visuelle des cartes ouvertes sur le Dashboard TV.
- Accélération drastique de l'exécution des commandes et du retour d'état sur les grandes installations Jeedom.

## [0.1.0-beta.6] - 2026-10-29

- Protection par Code PIN à 4 chiffres entièrement personnalisable par Équipement, par Commande et par Scénario.

## [0.1.0-beta.5] - 2026-10-29

- Configuration fine des Widgets, Pièces, Scénarios & Vues visibles par Téléviseur.

## [0.1.0-beta.4] - 2026-10-29

- Cartes Vie Scolaire - Affichage du prénom/nom de l'enfant & Modale Scolaire Complète 10-Foot.

## [0.1.0-beta.3] - 2026-10-29

- **Pont Télécommande Tizen - Conversion du pointeur virtuel *Samsung Internet* en vrai D-Pad **.
- Navigation 10-Foot simplifiée & Modale de Contrôle TV Grand Format.

## [0.1.0-beta.2] - 2026-10-29

- Rendu du Kiosk sur navigateur TV Tizen / Smart TV.

## [0.1.0-beta.1] - 2026-10-28

- Première version Beta publique.
- Interface plein écran « 10-Foot UI » & Galerie d'Art.
- Adaptation automatique Paysage $\leftrightarrow$ Portrait & Support motorisé Samsung.
- **Agrégation native de l'écosystème alt-erre et des équipements génériques Jeedom** répartis en **8 vues thématiques**.
- Mode Veille Galerie / Tableau d'Art.
- Notifications Toast / Picture-in-Picture.
- Sécurité Kiosk conforme à l'Art. 4.3 des CGU du Jeedom Market.
