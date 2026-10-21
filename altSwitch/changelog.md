# Changelog — Alt Contrôle Parental (Nintendo Switch) (`altSwitch`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

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
