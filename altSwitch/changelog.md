# Changelog — Alt Contrôle Parental (Nintendo Switch) (`altSwitch`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.4] — 2026-10-22 (Canal Beta)

### Corrigé & Amélioré
- **Correction de l'erreur `HTTP 403` (`GET users/.../devices`) lors de la découverte des consoles (`resources/altSwitch_worker.py`)** :
  - **Migration complète de `DirectMoonClient` vers l'API Nintendo `znma` v2/v3 (`https://app.lp1.znma.srv.nintendo.net`, build `700`)** : remplacement des anciens points de terminaison `api-lp1.pctl.srv.nintendo.net/moon/v1` (désormais rejetés en `HTTP 403` par Nintendo) par les routes officielles `v2/actions/user/fetchOwnedDevices`, `v2/actions/parentalControlSetting/fetchParentalControlSetting`, `v2/actions/playSummary/fetchDailySummaries`, `v2/actions/device/updateExtraPlayingTime`, `v2/actions/device/confirmExtraPlayingTime`, `v3/actions/parentalControlSetting/updatePlayTimer` et `v2/actions/parentalControlSetting/updateUnlockCode`.
  - **Gestion automatique du temps bonus actif lors d'une modification de limite ou d'heure du coucher** : annulation transparente (`TO_CANCELED`) d'un éventuel `extraPlayingTime` actif avant l'appel à `updatePlayTimer` afin d'éviter le refus serveur Nintendo.
  - **Détection matérielle officielle Switch 2 (`platformGeneration: "P01"`)** et agrégation multi-profils des jeux lancés (`whitelistedApplicationList` + `dailySummaries`).
  - **Réutilisation automatique du `session_token` déjà enregistré dans l'Assistant (`desktop/modal/auth.assistant.php`)** : ajout d'un bouton 1-clic *« Découvrir mes Consoles Switch / Switch 2 maintenant »* lorsque le jeton de session a déjà été échangé et stocké sur la box Jeedom, évitant de devoir refaire l'Étape 1 sur `accounts.nintendo.com`.

## [0.1.0-beta.3] — 2026-10-22 (Canal Beta)

### Amélioré
- **Appairage sur iPad / iPhone (iOS / iPadOS) & Android (`desktop/modal/auth.assistant.php`)** :
  - Prise en charge native du **Glisser-Déposer (*Drag & Drop*)** du bouton rouge **« Sélectionner »** depuis `accounts.nintendo.com` vers le champ de l'assistant Jeedom sur iPadOS et iOS (où WebKit bloque le menu contextuel *Copier le lien* sur les schémas d'URL d'applications `npf54789befb391a838://`).
  - Tolérance accrue de l'extracteur `extract_session_token_code()` dans `altSwitch_worker.py` (accepte l'URL complète, un dépôt Drag & Drop `text/uri-list` ou un extrait HTML).

## [0.1.0-beta.2] — 2026-10-22 (Canal Beta)

### Corrigé & Amélioré
- **Correction du statut `NOK` des dépendances après l'installation (`resources/install_apt.sh` & `dependancy_info`)** :
  - **Résolution du conflit `pip` (`ResolutionImpossible`) entre `pynintendoparental` et `pynintendoauth`** : `pynintendoparental` épinglant une version exacte de `pynintendoauth` (`pynintendoauth==1.0.3`), l'installation groupée `pip install --upgrade pynintendoparental pynintendoauth` provoquait un conflit de résolution et interrompait l'installation du `venv`. Les bibliothèques `requests`, `aiohttp` et `certifi` sont désormais installées en première passe dédiée, suivies de `pynintendoparental` en passe séparée.
  - **Compatibilité multi-versions Python (`Python 3.9` Debian 11 Bullseye $\to$ `Python 3.13`)** : injection automatique de `from __future__ import annotations` dans les modules du `venv` utilisant la syntaxe d'union PEP 604 (`X | Y`) sur Python 3.9, et ajout d'un client REST direct autonome (`DirectMoonClient` via `requests`) dans `altSwitch_worker.py`.
  - **Fiabilisation de `dependancy_info()`** dans `altSwitch.class.php` avec vérification directe de l'environnement virtuel (`shell_exec`) et droits `755` sur `resources/venv`.

## [0.1.0-beta.1] — 2026-10-21 (Canal Beta)

### Ajouté
- **Support complet du Contrôle Parental Nintendo Switch dans Jeedom** pour toute la gamme **Nintendo Switch (V1/V2), Switch Lite, Switch OLED et Switch 2** via un worker Python isolé (`resources/venv` avec bibliothèques permissives MIT / Apache-2.0).
- **Assistant d'Appairage OAuth2 PKCE Nintendo (`desktop/modal/auth.assistant.php`)** :
  - Génération locale du couple PKCE (`code_verifier` / `code_challenge` S256) vers le portail officiel `accounts.nintendo.com` sans jamais exposer ni stocker le mot de passe Nintendo.
  - Échange automatique du lien `npf54789befb391a838://auth#session_token_code=...` contre un `session_token` longue durée et **découverte automatique de toutes les consoles Switch / Switch 2** rattachées au compte parent.
  - Support de l'export et de l'import de sauvegarde `.json` du profil de la console.
- **37 Commandes Jeedom par console (Actions & Infos)** :
  - **Pilotage du temps d'écran** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)`, `Mode illimité aujourd'hui`, `Verrouiller aujourd'hui (0 min)`, `Définir limite quotidienne (0 à 360 min)`.
  - **Restrictions & Coucher** : `Activer suspension forcée`, `Désactiver suspension forcée (Alarme seule)`, `Définir heure du coucher (HH:MM)`, `Désactiver heure du coucher`, `Modifier code PIN console`.
  - **Infos Temps & Activité** : `Temps joué aujourd'hui` (min et formaté), `Temps restant aujourd'hui` (min et formaté), `Limite quotidienne active`, `Temps bonus accordé aujourd'hui`, `Suspension forcée active`, `Heure du coucher` (`HH:MM` et numérique `HHMM`), `Code PIN parental console`, `Jeu principal aujourd'hui`, `Jaquette du jeu principal (URL)`, `Joueur principal aujourd'hui`, `Nombre de jeux joués aujourd'hui`, `Jours joués ce mois-ci`, `Temps joué ce mois-ci`, détails JSON des jeux et des profils joueurs.
- **Widgets personnalisés Dashboard & Mobile (`alt-erre` Dark Glass)** :
  - Design « Dark Glass » avec 5 thèmes de couleur (*Noir*, *Blanc*, *Bleu*, *Ambre*, *Rouge*), vignette dynamique `58×58` avec jaquette du jeu en cours ou badge du modèle (*SWITCH*, *OLED*, *LITE*, *SWITCH 2*), jauge de progression colorée, boutons d'action rapides (*Bloquer*, *+15 min*, *+30 min*, *+60 min*, *Illimité*), curseur de limite quotidienne, sélecteur d'heure du coucher et **4 onglets interactifs** (*Contrôles*, *Jeux*, *Profils*, *PIN / Infos*).

### Sécurité & Conformité
- Stockage du `session_token` dans `data/profiles/` verrouillé en `chmod 0600` et protégé par `.htaccess` (`Require all denied`).
- Communication PHP $\to$ Python exclusivement via fichier temporaire `0600` dans `jeedom::getTmpFolder('altSwitch')` supprimé immédiatement après exécution (`@unlink`) : zéro secret, jeton ou clé API dans `ps aux` ni dans les logs (Art. 4.3 CGU).
