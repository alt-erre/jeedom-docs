# Changelog — Alt Habitat & Domotique (Delta Dore Tydom) (`altTydom`)

Toutes les modifications notables de ce plugin sont documentées dans ce fichier conformément à notre [Politique de Numérotation de Version (SemVer)](https://github.com/alt-erre/jeedom-docs/blob/main/VERSIONING.md).

---

## [0.1.0-beta.3] - 2026-10-23

### Corrigé
- **Timeout sur les callbacks initiaux `configs_file` et `devices_data` lors de la création massive d'équipements (`resources/altTydomd.py`, `core/php/jeeAltTydom.php`, `core/class/altTydom.class.php`)** :
  - Augmentation du délai d'attente HTTP du démon Python (`send_to_jeedom`) de `10s` à `90s` et ajout de `@ignore_user_abort(true)` / `@set_time_limit(120)` dans `jeeAltTydom.php` pour éviter toute interruption lors de la création simultanée de plusieurs dizaines d'équipements et de leurs commandes au premier appairage.
  - Optimisation des méthodes `handleConfigsFile()`, `handleDevicesMeta()` et `upsertCommand()` afin de n'effectuer des écritures SQL (`$eqLogic->save()` et `$cmd->save()`) que lorsqu'un équipement ou une commande est créé ou effectivement modifié (zéro écriture SQL redondante lors des reconnexions et rafraîchissements).
  - Amélioration de la journalisation des exceptions asynchrones dans `send_to_jeedom()` (`TimeoutError` explicitement détaillé).

---

## [0.1.0-beta.2] - 2026-10-23

### Ajouté
- **Assistant ponctuel d'extraction du mot de passe local de la box Tydom (`plugin_info/configuration.php`)** :
  - Ajout du bouton **« 🔑 Récupérer via compte Delta Dore »** permettant d'extraire automatiquement en 1 clic le mot de passe technique local de la passerelle Tydom (`sites[0].gateway.password`) depuis le compte unifié de l'application mobile Tydom (`deltadoreadb2ciot.b2clogin.com` + `prod.iotdeltadore.com`).
  - **Conformité stricte Art. 4.3 CGU Market (Zéro conservation Cloud)** : l'adresse e-mail, le mot de passe du compte Delta Dore et le jeton OAuth2 éphémère sont utilisés exclusivement en mémoire le temps de la requête d'extraction puis immédiatement détruits (`unset` serveur et effacement DOM client), sans jamais être stockés ni journalisés dans Jeedom.

### Amélioré
- **Accessibilité & Ergonomie des Formulaires et Widgets (`modern-web-guidance`)** :
  - Association explicite `<label for="...">`, désactivation de la correction automatique sur les identifiants réseau (`autocorrect="off" autocapitalize="off" spellcheck="false"` sur IP, MAC et e-mail) et clavier numérique sur le code PIN d'alarme Tyxal+ (`inputmode="numeric"`).

---

## [0.1.0-beta.1] - 2026-10-22

### Ajouté
- **Première version Beta publique (`0.1.0-beta.1`)** du plugin **Alt Habitat & Domotique (Delta Dore Tydom)** (`altTydom`), développée intégralement à partir de zéro en **Python 3 natif asynchrone** et **PHP 8+**.
- **Moteur WebSocket TLS Temps Réel (`resources/altTydomd.py`)** :
  - Connexion persistante chiffrée TLS (`port 443`) avec authentification **HTTP Digest (RFC 2617)** compatible avec toutes les passerelles **Tydom 1.0**, **Tydom 2.0**, **Tydom Home**, **Tydom Pro** et **Tywell** (support natif OpenSSL `SECLEVEL=0` pour les certificats auto-signés locaux).
  - Double mode de connexion : **100 % Local LAN (`wss://<IP_TYDOM>:443`)** ou **Médiation Cloud à distance (`wss://mediation.tydom.com:443`)**.
  - Décodeur HTTP-over-WebSocket supportant les réponses `Content-Length`, l'encodage `Transfer-Encoding: chunked` et les notifications Push temps réel (`PUT /devices/data`, `PUT /devices/cdata`).
  - **Découverte automatique sur le réseau local (LAN)** des passerelles Delta Dore Tydom (inspection ARP `00:1A:25` et sonde TLS port 443).
- **Support complet des familles d'équipements Delta Dore, K-Line & Bel'M** :
  - **Passerelle Box Tydom** : supervision de la liaison temps réel, modèle, firmware, mode API, ping et déclenchement de scénarios.
  - **Volets roulants, Brise-Soleil Orientables (BSO), Volets battants & Stores** : position `0–100 %` (avec inversion globale ou par équipement), *Monter*, *Stop*, *Descendre*, *Montée/Descente lente*, *Favori 1 & 2*, inclinaison BSO (`slope` & `slope_toggle`), défauts obstacle/thermique/pile/intrusion.
  - **Portes (K-Line / Bel'M), Portails & Portes de garage** : état d'ouverture/verrouillage binaire et détaillé, commandes *Ouvrir*, *Stop*, *Fermer*, *Impulsion / Toggle*, *Piéton / Favori 1* et positionnement proportionnel.
  - **Fenêtres & Baies vitrées K-Line / Détecteurs d'ouverture** : suivi d'ouverture, oscillo-battant (`pod_position`), intrusion et niveau de pile.
  - **Éclairages, Variateurs & Prises connectées** : commandes *Allumer*, *Éteindre*, *Basculer*, variateur `0–100 %`, *Favori 1 & 2*, puissance instantanée (`W`) et consommation cumulée (`Wh`).
  - **Chauffage Fil Pilote, Chaudières, PAC & Thermostats Tybox / Tywell** : température ambiante, température extérieure, hygrométrie, ECS, consigne `5–30 °C` (`±0,5 °C`), modes CVC (`NORMAL`, `COMFORT`, `ECO`, `ANTI_FROST`, `STOP`), niveaux Fil Pilote, autorisation chaudière et mode *Boost*.
  - **Alarme Tyxal+ & Détecteurs de sécurité** : état d'armement, intrusion, autoprotection, défauts secteur/batterie/GSM, pilotage et retour d'état individuel des **8 zones (`Z1` à `Z8`)**, journal d'événements Tyxal+ traduit en français et détecteurs de mouvement / fumée DAAF.
  - **Suivi Énergétique Tywatt / Linky TIC & Solaire** : puissance instantanée et index détaillés (*Total*, *Chauffage*, *Eau Chaude*, *Prises*, *Autres*, *Gaz*, *Ensoleillement*).
  - **Scénarios Tydom** : exécution directe des scénarios enregistrés dans la box Tydom.
- **Widgets Personnalisés « Dark Glass » Adaptatifs (`dashboard` & `mobile`)** :
  - Vignettes vectorielles SVG dynamiques selon l'état réel de l'équipement, 5 thèmes de couleur (`black`, `white`, `blue`, `yellow`, `red`) et compatibilité native avec les widgets standards Jeedom Core v4.
- **Sécurité & Conformité CGU Jeedom Market** :
  - **Zéro secret dans `ps aux` (Art. 4.3)** : encapsulation de la clé API, du mot de passe Tydom et du code PIN d'alarme dans `/tmp/jeedom/altTydom/daemon_config.json` (`chmod 0600`) supprimé à l'arrêt du démon.
