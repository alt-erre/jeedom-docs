# Changelog Beta - Alt Éclairages, Rubans RGBIC & Ambiances (Govee) (`altGovee`)

## [0.1.0-beta.4] - 2026-11-23

- **Mise à jour de la résolution matricielle Govee Curtain Lights Pro (`30×32` par rideau)** :
  - Ajustement des dimensions matricielles exactes des panneaux Curtain Lights Pro (`30×32 = 960 LEDs` pour 1 rideau, `60×32 = 1920 LEDs` pour 2 rideaux associés et `90×32 = 2880 LEDs` pour 3 rideaux associés) ainsi que de la présélection du routage Maître.

## [0.1.0-beta.3] - 2026-11-23

- **Correction d'erreur SQL lors de l'enregistrement des commandes** :
  - Nettoyage automatique des éventuelles commandes orphelines en base de données empêchant l'erreur `Duplicate entry ...-Éteindre` lors de la création d'un équipement Govee.

## [0.1.0-beta.2] - 2026-11-23

- **Correction de la création automatique des équipements lors du scan réseau** :
  - Correction d'une erreur empêchant l'enregistrement d'un nouvel éclairage ou rideau Govee détecté pour la première fois lors du scan LAN, et lecture immédiate de son état après la découverte.

## [0.1.0-beta.1] - 2026-11-22

- **Première version Beta du plugin Alt Éclairages, Rubans RGBIC & Ambiances (Govee)** :
  - Découverte et pilotage 100 % en local des éclairages Govee via le réseau local (LAN UDP) avec enrichissement optionnel via la clé API officielle Govee.
  - **Prise en charge native des rideaux matriciels Govee Curtain Lights Pro associés par 2 ou par 3** (jusqu'à 2880 LEDs en fresque panoramique unifiée 60×48) avec assistant d'assemblage en 1 clic et aperçu visuel 2D.
  - **Studio RGBIC Multi-Segments** intégré au widget et **24 ambiances & animations panoramiques locales** (*Cyberpunk Neon*, *Aurore Boréale*, *Coucher de Soleil*, *Feu de Cheminée*, *Féerie de Noël*, *Mode Cinéma*).
  - Synchronisation en 1 clic des **Scènes Govee**, des **Scènes DIY** et des **Modes Musicaux**.
  - **Plafond dynamique de luminosité par mode** (idéal pour les modes *Nuit* ou *Cinéma*), gestion d'un **interrupteur physique amont** (avec indicateur `AMONT OFF`), **flash de notification visuelle** et **Dashboard global de supervision** dans le menu Accueil.
