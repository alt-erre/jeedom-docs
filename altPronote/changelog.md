# Changelog — Alt Vie Scolaire (Pronote) (`altPronote`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

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
