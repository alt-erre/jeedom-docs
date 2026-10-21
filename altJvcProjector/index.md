# Plugin Jeedom — Alt Ciné Projector (JVC D-ILA) (`altJvcProjector`)

**Auteur :** Aurélien Léovant (`alt-erre`)  
**Licence :** Propriétaire — Tous droits réservés  
**Catégorie :** Multimédia / Home-Cinéma  

---

## Présentation

Le plugin **Alt JVC Projector (`altJvcProjector`)** permet de piloter et superviser **100 % en local** (sans aucun cloud) les vidéoprojecteurs Home-Cinéma **JVC D-ILA**, avec une prise en charge complète du vaisseau amiral **JVC DLA-NZ9 (RS4100)** ainsi que de l'ensemble des gammes Laser BLU-Escent et Lampe NSH :

- **Série NZ Laser BLU-Escent 8K e-shiftX / e-shift :** **JVC DLA-NZ9** (`RS4100`), **DLA-NZ8** (`RS3100`), **DLA-NZ7** (`RS2100`)
- **Série NZ Gen3 Laser BLU-Escent (2024+) :** **DLA-NZ900** (`RS4200`), **DLA-NZ800** (`RS3200`), **DLA-NZ700** (`RS2200`), **DLA-NZ500** (`RS1200`)
- **Série NP / N / NX 4K Natif :** **DLA-NP5** (`RS1100`), **DLA-NX9** (`RS3000`), **DLA-N7** (`RS2000`), **DLA-N5** (`RS1000`)
- **Série Z1 & Série X :** **DLA-Z1** (`RS4500`), **DLA-X5000 / X7000 / X9000 / X5900 / X7900 / X9900**

---

## Fonctionnalités principales (spécial JVC DLA-NZ9)

1. **Protocole officiel JVC External Control TCP/IP (Port `20554`) :**
   - Handshake complet `PJ_OK` &rarr; `PJREQ` &rarr; `PJACK`.
   - Support natif de l'authentification **SHA-256 (`password` + `JVCKWPJ`)** introduite sur les **DLA-NZ9 / NZ8 / NZ7 / NP5 / NZ900 / NZ800**, avec bascule automatique sur l'authentification 16 octets ou sans mot de passe pour les générations précédentes.
   - Regroupement intelligent des lectures sur **une seule session TCP** afin de respecter la contrainte matérielle JVC (une seule connexion TCP simultanée autorisée).
2. **Double mode de fonctionnement au choix :**
   - **Mode Socket TCP Direct (par défaut, sans dépendance Python) :** Jeedom interroge et commande directement le vidéoprojecteur en PHP.
   - **Mode Démon Python Temps Réel :** Maintient une file d'attente asynchrone (`asyncio.Lock`) garantissant zéro collision TCP entre le rafraîchissement périodique et les ordres de scénarios.
3. **Contrôle complet du JVC DLA-NZ9 :**
   - **Alimentation :** Allumer (`PW1`), Éteindre (`PW0`), retour d'état précis (`Veille`, `Préchauffage`, `Allumé`, `Refroidissement`, `Erreur`, `Hors ligne`).
   - **Entrées & Signal Vidéo :** Bascule `HDMI 1` / `HDMI 2`, détection du signal actif, lecture de la **Résolution & Fréquence source** (jusqu'à **8K 60Hz** et **4K 120Hz**), **Format HDR** (`SDR`, `HDR10`, `HDR10+`, `HLG`), **Profondeur couleur** (`8/10/12-bit`), **Espace colorimétrique** (`RGB`, `YCbCr 4:4:4 / 4:2:2 / 4:2:0`) et **Colorimétrie** (`BT.2020`, `DCI-P3`, `BT.709`).
   - **Laser BLU-Escent :** Compteur d'heures Laser (`IFLT`), réglage de la **Puissance Laser** (`Bas / Moyen / Haut`) et du **Contrôle Dynamique Laser** (`Off`, `Mode 1`, `Mode 2`, `Mode 3`).
   - **Optique motorisée & Installation :** Rappel direct des **10 Mémoires d'Installation (Lens Memory 1 à 10)** (`INML` avec délai étendu 30s pour le déplacement motorisé de l'optique 100 mm du DLA-NZ9), **Modes Anamorphiques (`Off`, `A`, `B`, `C`, `D`)**, **Ratio d'aspect (`Zoom`, `Auto`, `Native`)**, **Hide (Masquage image)**.
   - **Traitement d'image & HDR :** Sélection du **Mode Image** (`Frame Adapt HDR 1/2/3`, `Filmmaker Mode`, `Cinema`, `Film`, `Natural`, `HDR10`, `HDR10+`, `HLG`, `Pana PQ`, `User 1..6`), **Profil Couleur** (`DCI-P3`, `BT.2020 Wide/Normal`, `BT.709`, `Cinema`, `Film 1/2`, `Custom 1..6`), **8K e-shiftX** (`On`/`Off`), **Theater Optimizer** (`On`/`Off`), **Niveau HDR Frame Adapt** (`Auto`, `Auto Wide`, `-2` à `+2`), **Traitement Frame Adapt** (`Image par image` / `Scène par scène`), **Clear Motion Drive (`CMD`)**, **Motion Enhance**, **Mode Faible Latence (`Low Latency` 4K120)**.
   - **Télécommande OSD intégrée :** Navigation complète (`Menu`, `Haut`, `Bas`, `Gauche`, `Droite`, `OK`, `Retour`, `Info`, `Lens Control`, `Setting Memory`, `MPC`, `CMD`, `Menu Avancé`).

---

## Confidentialité, Protection des Données & Mesures de Sécurité

Conformément aux règles de confidentialité et de sécurité du Jeedom Market (Articles 4.3 et 4.8) :

- **Fonctionnement 100 % local (Zéro Cloud)** : Toutes les communications s'effectuent directement sur votre réseau local (LAN) entre votre box Jeedom et votre vidéoprojecteur JVC sur le port TCP `20554`. Aucune information ne transite par Internet ni par un serveur tiers.
- **Avis de confidentialité et protection du mot de passe réseau JVC** :
  - Si votre vidéoprojecteur (ex. série DLA-NZ / NP5) requiert un code/mot de passe de contrôle réseau (`Network Password`), celui-ci est utilisé exclusivement pour générer le condensat d'authentification locale (`SHA-256(password + "JVCKWPJ")` ou `PJREQ`) lors du handshake TCP avec le projecteur.
  - Ce mot de passe est conservé uniquement en local dans la configuration Jeedom de l'équipement et, lorsque le démon Python est actif, dans un fichier temporaire sécurisé (`chmod 0600`, accessible au seul processus système Jeedom et supprimé à l'arrêt du démon). Il est définitivement effacé lors de la suppression de l'équipement.
- **Mesures de sécurité réseau recommandées** :
  - Le démon Python écoute uniquement sur `127.0.0.1` (port `55091` par défaut) et vérifie la clé API interne Jeedom à chaque commande.
  - Il est recommandé d'activer un mot de passe réseau dans le menu *Réseau* du vidéoprojecteur JVC et de ne jamais exposer le port TCP `20554` sur Internet.

---

## Auteur & Licence

- **Auteur** : Aurélien Léovant (`alt-erre`)
- **Copyright** : © 2026 Aurélien Léovant (`alt-erre`) — Création originale et indépendante (non affiliée à Jeedom SAS ni à JVCKENWOOD Corporation).
- **Licence** : Propriétaire — Tous droits réservés (voir le fichier [LICENSE](LICENSE)). Toute reproduction, redistribution ou revente du code source sans l'autorisation écrite de l'auteur est interdite.

