# Netflim_DATA
Microservice de gestion du catalogue (Films, Séries, Épisodes) pour la plateforme Netflim. Construit avec Node.js, Express et Sequelize.
# Netflim - Service DATA

Ce microservice gère l'intégralité du catalogue de vidéos (Movies, Series, Seasons, Episodes) ainsi que les métadonnées associées.

## Architecture
Le service suit une architecture en couches (**Layered Architecture**) pour assurer la maintenabilité :
- **Routes** : Définition des points d'entrée API.
- **Controllers** : Gestion de la logique de requête/réponse.
- **Services** : Logique métier (orchestration).
- **Repositories** : Abstraction de l'accès aux données.
- **Models** : Définition des schémas Sequelize (MySQL).

## Stack Technique
- **Node.js** (ESM)
- **Express**
- **Sequelize** (ORM) & **MySQL**
- **Joi** (Validation)

## Installation

1. Cloner le dépôt :
   ```bash
   git clone [https://github.com/ton-username/Netflim_DATA.git](https://github.com/ton-username/Netflim_DATA.git)

2. Installer les dépendances :
   ```bash
   npm install

3. Configurer le fichier .env (voir .env.example).

4. Lancer le service :
   ```bash
   npm run dev
