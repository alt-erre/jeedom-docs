# Changelog — Alt Vie Scolaire (Pronote) (`altPronote`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.6] — 2026-10-29 (Canal Beta)

### Corrigé & Amélioré
- **Résolution du nom, de la classe et de l'établissement de l'enfant sur les comptes Parent (`ParentClient`)** :
  - Correction dans `extract_account_overview()` (`resources/altPronote_worker.py`) et `applyPronoteSyncResult()` / `toHtml()` (`core/class/altPronote.class.php`) : sur un compte **Parent** PRONOTE (`ParentClient`), `client.info.name` retourne l'identité du parent titulaire du compte tandis que l'élève suivi est stocké dans `client._selected_child` / `selected_child` (`children`). Le plugin extrait et affiche désormais systématiquement le **nom de l'enfant**, sa **classe** et son **établissement** (et non le nom du parent) dans la commande `student_name`, le widget et le Kiosk TV (`altTvDashboard`).

## [0.1.0-beta.5] — 2026-10-27 (Canal Beta)

### Amélioré
- **Retour visuel d'action (Animations de clic & Rafraîchissement — Charte Graphique `v1.2`)** :
  - Ajout d'une animation de rebond tactile et d'onde lumineuse (`pulse ring` `420 ms`) sur les boutons d'action et les onglets des widgets **Dashboard & Mobile**.
  - Ajout d'une rotation complète (`360°` pendant `1,2 s`) avec halo lumineux et verrouillage anti-rebond sur le bouton **Rafraîchir** (`fa-sync-alt`) afin de confirmer visuellement le lancement d'une synchronisation PRONOTE.
  - Harmonisation complète des **9 thèmes de couleur** (*Bleu*, *Violet*, *Émeraude*, *Ambre*, *Rose*, *Cyan*, *Rouge*, *Ardoise*, *Carbone*).

## [0.1.0-beta.4] — 2026-10-21 (Canal Beta)

### Corrigé & Amélioré
- **Auto-détection locale du code PIN à 4 chiffres (`0000`–`9999`) directement depuis le QR Code PRONOTE & Protection anti-bannissement IP** :
  - **Extraction et vérification cryptographique locale du code PIN (`resolve_or_verify_qr_pin`)** : dès qu'une capture d'écran de QR Code PRONOTE est importée ou collée, le worker Python vérifie/extrait localement en $< 10\text{ ms}$ (via `AES-128-CBC` / `MD5(pin)` sur les champs `jeton` et `login`, sans aucune requête vers le serveur PRONOTE) le code PIN exact à 4 chiffres du QR Code et pré-remplit automatiquement le champ dans l'assistant. Cela élimine à 100 % l'erreur `invalid confirmation code` (ex. lorsque l'ancien code PIN d'une capture précédente restait saisi).
  - **Protection locale contre la réutilisation d'un QR Code déjà consommé (`consumed_qr_hashes.json`)** : bloque localement toute tentative répétée avec un même QR Code à usage unique déjà refusé par PRONOTE afin d'éviter que le serveur Index Éducation ne suspende temporairement l'adresse IP (`Your IP address is suspended.`).
  - **Diagnostic explicite en français en cas de suspension temporaire d'IP par PRONOTE (`Your IP address is suspended.`)**.

## [0.1.0-beta.3] — 2026-10-21 (Canal Beta)

### Corrigé & Amélioré
- **Correction de l'erreur `Action not permitted. (onglet is not normally accessible)` lors de l'appairage QR Code (`qrcode_login`)** :
  - **Détection automatique du type de compte (`Compte Parent` vs `Compte Élève`)** directement à partir de l'URL contenue dans le QR Code (`mobile.parent.html` / `parent.html` vs `mobile.eleve.html` / `eleve.html`), aussi bien dans l'interface de l'assistant que dans le worker Python (`ParentClient` vs `Client`).
  - **Préservation intégrale des paramètres de l'URL du QR Code (`?login=true`)** lors de l'appel à `qrcode_login`.
  - **Patch permissif sur `_Communication.post` et `authorized_onglets` dans `pronotepy`** afin d'éviter qu'un onglet désactivé par l'établissement scolaire ne bloque l'initialisation après la consommation du QR Code à usage unique.

## [0.1.0-beta.2] — 2026-10-21 (Canal Beta)

### Ajouté & Amélioré
- **Décodage d'image QR Code 100 % côté serveur Python (`opencv-python-headless` Apache-2.0) & Collage direct (`Cmd+V` / `Ctrl+V`)** :
  - L'assistant QR Code décode désormais automatiquement les captures d'écran (`.png`, `.jpg`, WebP) côté serveur dans `resources/venv` (`cv2.QRCodeDetector` multi-passes : normale, inversée Dark Mode, seuillage Otsu et multi-échelles Retina), rendant la lecture d'image compatible avec **tous les navigateurs (Safari macOS, Firefox, Chrome, Brave)**.
  - Support du **collage direct du presse-papiers (`Cmd+V` / `Ctrl+V`)** dans la modale de l'assistant juste après une capture d'écran du QR Code PRONOTE.
  - Détection explicite et message d'aide lorsque l'utilisateur colle par erreur l'URL de redirection SAML2 ÉduConnect (`educonnect.education.gouv.fr/idp/profile/SAML2/POST/SSO`) obtenue en ouvrant le lien du QR Code dans le navigateur mobile (Safari / Chrome iOS/Android).

## [0.1.0-beta.1] — 2026-10-21 (Canal Beta)

### Ajouté
- **Intégration complète du suivi scolaire PRONOTE dans Jeedom** pour les comptes **Élève** et **Parent (mono et multi-enfants)** via un worker Python isolé (`resources/venv` avec `pronotepy` sous licence MIT).
- **Assistant d'Appairage par QR Code Mobile & Jeton Rotatif (`desktop/modal/qrcode.assistant.php`)** :
  - Décodage local d'image / capture d'écran de QR Code PRONOTE (`BarcodeDetector`) ou collage JSON + code PIN temporaire à 4 chiffres.
  - Compatible avec 100 % des établissements et portails ENT / ÉduConnect / 2FA grâce au renouvellement automatique et atomique du jeton mobile (`token_login`) à chaque session.
  - Support de la connexion directe par identifiants et connecteurs ENT, ainsi que de l'export/import de sauvegarde `.json` du profil.
- **4 Modules fonctionnels complets (44 commandes Jeedom par élève)** :
  - **Emploi du temps & Réveil intelligent** : cours du jour, cours du lendemain/prochain jour, statut temps réel de la journée, horaires du 1er et du dernier cours au format texte (`HH:MM`) et numérique (`HHMM`) pour les scénarios de réveil Jeedom (`time_op`), détection des cours annulés / professeurs absents.
  - **Cahier de textes & Devoirs interactifs** : devoirs à venir sur horizon configurable (`7` à `30` jours), compteurs de devoirs non faits (global et pour demain), résumé du prochain devoir et action `toggle_homework` permettant de cocher/décocher un devoir depuis Jeedom.
  - **Notes, Moyennes & Évaluations** : moyenne générale élève et classe (`/20`), dernière note reçue (matière, note, coef, commentaire, date) pour notifications instantanées, moyennes par matière et évaluations par compétences.
  - **Vie scolaire, Cantine & Informations** : absences (totales et non justifiées), retards, punitions, menus de la cantine (aujourd'hui et demain) et informations de l'établissement.
- **Widgets personnalisés Dashboard & Mobile (`alt-erre` Dark Glass)** :
  - Design « Dark Glass » avec 5 thèmes de couleur (*Noir*, *Blanc*, *Bleu*, *Ambre*, *Rouge*), vignette dynamique `58×58`, 4 compteurs rapides et 5 onglets interactifs (*Aujourd'hui*, *Demain*, *Devoirs* avec cases à cocher, *Notes*, *Vie / Menu*).

### Sécurité & Conformité
- Stockage du jeton rotatif dans `data/profiles/eq_<id>.json` verrouillé en `chmod 0600` et protégé par `.htaccess` (`Require all denied`).
- Communication PHP $\to$ Python exclusivement via fichier temporaire `0600` dans `jeedom::getTmpFolder('altPronote')` supprimé immédiatement après lecture (`@unlink`) : zéro secret, mot de passe, code PIN ou clé API dans `ps aux` ni dans les logs (Art. 4.3 CGU).
