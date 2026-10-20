# Changelog — Alt JVC Projector (`altJvcProjector`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.4] — 2026-10-20 (Canal Beta)

### Corrigé
- **Rendu visuel fidèle à la base `altAirMedia` (Contours, Dégradés & Boutons ronds)** :
  - Alignement exact des variables CSS (`--jvc-bg`, `--jvc-card`, `--jvc-card-border`), ajout du contour extérieur `1px solid rgba(255, 255, 255, 0.20) !important` (`border-radius: 16px !important`), de la barre d'en-tête bord-à-bord avec filet de séparation et verrouillage de `border-radius: 50% !important` sur les boutons d'en-tête et le D-Pad face aux surcharges CSS de Jeedom Core.

## [0.1.0-beta.3] — 2026-10-20 (Canal Beta)

### Amélioré
- **Vignette dynamique par Entrée HDMI / État dans la Carte État (Dashboard & Mobile)** :
  - La vignette `.jvc-art-wrap` s'adapte dynamiquement selon l'entrée active (`HDMI 1`, `HDMI 2`) et l'état d'alimentation du projecteur (`CHAUFFE`, `REFROID.`, `VEILLE`) avec icône, libellé court en capitales et dégradé dédié.

## [0.1.0-beta.2] — 2026-10-20 (Canal Beta)

### Modifié
- **Harmonisation graphique des widgets Dashboard et Mobile (`alt-erre` Dark Glass)** :
  - Adoption du système de design unifié `alt-erre` (sur le modèle d'`altAirMedia`) : en-tête intégré `.jvc-header` avec boutons circulaires *Power On*, *Veille* et *Refresh*, carte statut & signal vidéo `.jvc-now-playing` (`58×58 px` + `.jvc-status-dot`), sélecteurs `.jvc-select` et télécommande OSD repliable avec **D-Pad squircle** et bouton `OK` central circulaire.
  - Ajout du sélecteur de thème couleur par équipement (`Noir Dark Glass`, `Blanc`, `Bleu`, `Jaune`, `Rouge`).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage et supervision 100 % en local des vidéoprojecteurs Home-Cinéma **JVC D-ILA** via le protocole TCP/IP officiel (port `20554`) : gammes **DLA-NZ9 / NZ8 / NZ7**, **NZ900 / NZ800 / NZ700 / NZ500**, **NP5**, **NX9 / N7 / N5**, **Z1** et **Série X**.
- Support natif de l'authentification **SHA-256 (`password` + `JVCKWPJ`)** et de l'authentification historique 16 octets / sans mot de passe.
- Double mode de fonctionnement : **Socket TCP Direct PHP** (sans démon) ou **Démon Python Temps Réel** avec verrouillage de session TCP (`asyncio.Lock`).
- Contrôle complet : alimentation, entrées HDMI 1/2, télémétrie du signal source (8K60, 4K120, HDR10/HDR10+/HLG, espace colorimétrique), puissance et contrôle dynamique du Laser BLU-Escent, 10 mémoires d'optique motorisée (`Lens Memory 1..10`), modes anamorphiques, `Frame Adapt HDR`, `Theater Optimizer`, `8K e-shiftX`, `Clear Motion Drive` et télécommande OSD.

### Sécurité & Conformité
- Stockage temporaire de la configuration du démon avec permissions restreintes (`chmod 0600`) et nettoyage automatique à l'arrêt.
- Documentation complète des mesures de sécurité et de confidentialité (conformité CGU Jeedom Market).
