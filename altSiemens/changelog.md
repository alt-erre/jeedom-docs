# Changelog — Alt Siemens (`altSiemens`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément au [Versionnement Sémantique (SemVer)](../VERSIONING.md).

## [0.1.0-beta.1] — 2026-10-19 (Canal Beta)

### Ajouté
- Pilotage 100 % en local des appareils électroménagers **Siemens / BSH Home Connect** et en particulier de la machine à café expresso broyeur **Siemens EQ900** (`TQ903`, `TQ905`, `TQ907`...) via connexion WebSocket locale chiffrée (**AES-CBC + HMAC-SHA256** port `80` et **TLS-PSK** port `443`).
- Catalogue complet des boissons Specialty & CoffeeWorld, paramètres Barista (`BeanAmount`, volume `FillQuantity` en ml, température, sélection du bac à grains `DualBean`, vitesse d'extraction `FlowRate`, mode 2 tasses, chauffe-tasses) et capteurs d'alertes/entretien.
- Prise en charge des autres appareils électroménagers Siemens (lave-vaisselle, four, lave-linge, sèche-linge, réfrigérateur, cave à vin, hotte) avec synchronisation dynamique des commandes depuis le profil XML/JSON de l'appareil.
- Assistant intégré de récupération unique des clés locales (`PSK` / `IV`) via OAuth2 PKCE SingleKey ID ou import d'archive `.zip`/`.json`.

### Sécurité & Conformité
- Protection du répertoire `data/profiles` par `.htaccess` (`Require all denied`) et permissions `chmod 0600` sur les profils locaux et sur le fichier `devices.json` du démon.
- Avis de confidentialité intégré dans la modale de l'assistant PKCE et dans la documentation (conformité CGU Jeedom Market).
