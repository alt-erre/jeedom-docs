# Changelog — Alt Contrôle Parental (PlayStation) (`altPlaystation`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.1] — 2026-10-28 (Canal Beta)

### Ajouté
- **Support complet du Contrôle Parental PlayStation Family, de la supervision PlayStation Network (PSN) et de la détection locale LAN (DDP) dans Jeedom** pour toute la gamme **PS5 (Standard / Digital), PS5 Slim, PS5 Pro, PS4 et PS4 Pro** via un worker Python isolé (`resources/venv` avec bibliothèques permissives `requests` Apache-2.0, `aiohttp` Apache-2.0, `psnfamily` MIT et `psnawp-api` MIT).
- **Assistant d'Appairage Compte PlayStation & Scanner Réseau Local DDP (`desktop/modal/auth.assistant.php`)** :
  - Connexion sécurisée via le jeton SSO officiel Sony (`https://ca.account.sony.com/api/v1/ssocookie` $\to$ `npsso`) sans jamais exposer ni stocker le mot de passe Sony ou les codes 2FA.
  - Rafraîchissement automatique des jetons OAuth2 (`refresh_token` longue durée) et **découverte automatique des profils enfants supervisés (PlayStation Family) ainsi que du profil PSN principal**.
  - **Scanner Réseau Local DDP intégré** (broadcast UDP port `9302` version `00030010` pour PS5 / PS5 Pro et port `987` version `00020020` pour PS4) permettant de détecter les consoles sur le sous-réseau local, leur état électrique temps réel (`Allumée 200 Ok`, `Mode Repos 620 Standby`, `Éteinte`) et le jeu en cours d'exécution en direct.
  - Support de l'export et de l'import de sauvegarde `.json` du profil PlayStation.
- **43 Commandes Jeedom par équipement (Actions & Infos)** :
  - **Pilotage du temps d'écran & quotas** : `Bonus +15 min`, `Bonus +30 min`, `Bonus +60 min`, `Ajouter temps bonus (slider)`, `Mode illimité aujourd'hui`, `Verrouiller aujourd'hui (0 min)`, `Définir limite quotidienne (0 à 360 min)`.
  - **Restrictions, Coucher & Réseau Local** : `Activer déconnexion forcée (Fin de temps)` (`FORCE_LOGOUT`), `Désactiver déconnexion forcée (Notification seule)` (`NOTIFY_ONLY`), `Définir heure du coucher (HH:MM)`, `Désactiver heure du coucher`, `Définir niveau d'âge PEGI (1 à 11)`, `Réveiller console (Wake-on-LAN / DDP)`.
  - **Infos Temps, Jeux, Trophées & LAN** : `Statut connexion Cloud PSN`, `État matériel console (LAN)`, `Console allumée` (binaire), `Statut contrôle parental`, `Modèle de console`, `ID en ligne (PSN GamerTag)`, `Type de compte`, `Niveau restriction d'âge (PEGI)`, `Temps joué aujourd'hui` (min et formaté), `Temps restant aujourd'hui` (min et formaté), `Limite quotidienne active`, `Temps bonus accordé aujourd'hui`, `Déconnexion forcée active`, `Heure du coucher` (`HH:MM` et numérique `HHMM`), `Jeu principal / actif`, `Jaquette du jeu principal (URL)`, `Temps cumulé sur le jeu principal`, `Joueur actif (PSN)`, `Nombre de jeux récents`, `Niveau Trophées PSN`, `Total Trophées PSN`, `Résumé Trophées PSN`, détails JSON du catalogue des jeux et des profils famille.
- **Widgets personnalisés Dashboard & Mobile (`alt-erre` Dark Glass v1.2)** :
  - Design « Dark Glass » avec **9 thèmes de couleur** (*Noir*, *Blanc*, *Bleu Profond*, *Cyan*, *Vert Émeraude*, *Ambre*, *Orange*, *Rouge*, *Violet*).
  - Vignette dynamique `58×58` avec jaquette officielle du jeu actif ou badge du modèle (*PS5*, *PS5 SLIM*, *PS5 PRO*, *PS4*, *PS4 PRO*), jauge de progression colorée, micro-interactions tactiles (`.is-triggered`, `.is-refreshing`, `.is-confirmed` avec protection anti-double-clic de 2 secondes sur les ajouts de temps bonus) et **4 onglets interactifs** (*Contrôles*, *Jeux*, *Profils*, *Trophées / LAN*).

### Sécurité & Conformité
- Stockage des jetons `npsso` et OAuth2 dans `data/profiles/` verrouillé en `chmod 0600` et protégé par `.htaccess` (`Require all denied`).
- Communication PHP $\to$ Python exclusivement via fichier temporaire `0600` dans `jeedom::getTmpFolder('altPlaystation')` supprimé immédiatement après exécution (`@unlink`) : zéro secret, jeton ou clé API dans `ps aux` ni dans les logs (Art. 4.3 CGU).
