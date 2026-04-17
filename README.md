# 📚 Documentation Complète - Netflim DATA API

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Installation et configuration](#installation-et-configuration)
3. [Architecture](#architecture)
4. [Authentification](#authentification)
5. [Endpoints résumé](#endpoints-résumé)
6. [Modèles de données](#modèles-de-données)
7. [Exemples d'utilisation](#exemples-dutilisation)
8. [Codes HTTP](#codes-http)
9. [Cas d'erreur courants](#cas-derreur-courants)
10. [Bonnes pratiques](#bonnes-pratiques)

---

## Vue d'ensemble

### À propos du service

**Netflim DATA** est un microservice conçu pour gérer l'intégralité du catalogue vidéo de la plateforme Netflim.

**Informations clés:**
- **Version**: 1.0.0
- **Type**: REST API (Express.js + Node.js)
- **Base de données**: MySQL (Sequelize ORM)
- **Authentification**: JWT + Service Token
- **Documentation**: Swagger/OpenAPI 3.0

### Fonctionnalités principales

✅ **Gestion des catégories** - Organiser le contenu par catégories  
✅ **Gestion des films** - Films avec métadonnées complètes  
✅ **Gestion des séries** - Structure hiérarchique (Série → Saison → Épisode)  
✅ **Gestion des saisons** - Organiser les séries par saisons  
✅ **Gestion des épisodes** - Épisodes avec vidéos associées  
✅ **Intégration FILE** - Gestion des références de fichiers  
✅ **Authentification JWT** - Opérations protégées  
✅ **Documentation Swagger** - Interface interactive complète

---

## Installation et configuration

### Prérequis

- Node.js >= 16
- npm ou yarn
- MySQL 8.0+
- Git

### Installation

```bash
# 1. Cloner le repository
git clone git@github.com:ClemLy/Netflim_DATA.git
cd Netflim_DATA

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
touch .env
```

### Configuration `.env`

```bash
# Serveur
PORT=4000
NODE_ENV=development

# Base de données
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=
DB_NAME=...
DB_DIALECT=mysql

# Sécurité
JWT_SECRET=<VOTRE_SECRET_JWT>
JWT_EXPIRES_IN=1d

# Inter-services
AUTH_SERVICE_URL=http://localhost:3000
SERVICE_TOKEN=<VOTRE_SERVICE_TOKEN>
```

### Démarrage

```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

L'API sera disponible à: `http://localhost:4000`

### Accéder à la documentation Swagger

**Interface interactive**: `http://localhost:4000/api/docs`  
**Spec JSON**: `http://localhost:4000/api/docs.json`  
**Health check**: `http://localhost:4000/health`

---

## Architecture

### Structure du projet

```
src/
├── app.js                          # Configuration Express
├── server.js                       # Point d'entrée
├── config/
│   ├── database.js                # Connexion MySQL
│   └── env.js                     # Variables d'environnement
├── controllers/                   # Logique métier
│   ├── category.controller.js
│   ├── movie.controller.js
│   └── series/
│       ├── series.controller.js
│       ├── season.controller.js
│       └── episode.controller.js
├── models/                        # Modèles Sequelize
│   ├── category.model.js
│   ├── movie.model.js
│   ├── file.model.js
│   └── series/
│       ├── series.model.js
│       ├── season.model.js
│       └── episode.model.js
├── repositories/                  # Accès données
│   ├── category.repository.js
│   ├── movie.repository.js
│   └── series/
│       ├── series.repository.js
│       ├── season.repository.js
│       └── episode.repository.js
├── routes/                        # Définition routes
│   ├── category.routes.js
│   ├── movie.routes.js
│   ├── series.routes.js
│   └── file.routes.js
├── services/                      # Logique métier avancée
│   ├── category.service.js
│   ├── movie.service.js
│   └── series/
│       ├── series.service.js
│       ├── season.service.js
│       └── episode.service.js
├── validators/                    # Validation Joi
│   ├── category.validator.js
│   ├── movie.validator.js
│   └── series.validator.js
├── middlewares/                   # Middlewares Express
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── not-found.middleware.js
│   └── validate.middleware.js
└── docs/
    └── swagger.yaml              # Documentation Swagger
```

### Architecture en couches

```
Routes (*.routes.js)
    ↓ (appels HTTP)
Controllers (*.controller.js)
    ↓ (orchestration)
Services (*.service.js)
    ↓ (logique métier)
Repositories (*.repository.js)
    ↓ (requêtes)
Models (*.model.js) ← Sequelize ORM
    ↓ (SQL)
MySQL Database
```

---

## Authentification

### 1. JWT Bearer Token (pour utilisateurs)

**Utilisation**: Créer, modifier, supprimer des ressources

**En-tête requis**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Exemple avec cURL**:
```bash
curl -X POST http://localhost:4000/api/categories \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Action"}'
```

### 2. Service Token (inter-service)

**Utilisation**: Routes `/api/files` uniquement (communication service FILE)

**En-tête requis**:
```
x-service-token: your_service_token_here
```

**Exemple avec cURL**:
```bash
curl -X POST http://localhost:4000/api/files \
  -H "x-service-token: YOUR_SERVICE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Endpoints publics (sans authentification)

- `GET /api/categories` - Lister catégories
- `GET /api/movies` - Lister films
- `GET /api/movies/{id}` - Détails film
- `GET /api/series` - Lister séries
- `GET /api/series/{id}` - Détails série (avec saisons/épisodes)

---

## Endpoints résumé

### 📋 Catégories (4 endpoints)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/categories` | Lister toutes les catégories |
| POST | `/api/categories` | Créer une catégorie |
| PUT | `/api/categories/{id}` | Mettre à jour une catégorie |
| DELETE | `/api/categories/{id}` | Supprimer une catégorie |

### 🎬 Films (5 endpoints)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/movies` | Lister tous les films |
| GET | `/api/movies/{id}` | Détails d'un film |
| POST | `/api/movies` | Créer un film |
| PUT | `/api/movies/{id}` | Mettre à jour un film |
| DELETE | `/api/movies/{id}` | Supprimer un film |

### 📺 Séries (5 endpoints)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/series` | Lister toutes les séries |
| GET | `/api/series/{id}` | Détails série + saisons + épisodes |
| POST | `/api/series` | Créer une série |
| PUT | `/api/series/{id}` | Mettre à jour une série |
| DELETE | `/api/series/{id}` | Supprimer une série |

### 🎭 Saisons (3 endpoints)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/series/{seriesId}/seasons` | Créer une saison |
| PUT | `/api/series/seasons/{seasonId}` | Mettre à jour une saison |
| DELETE | `/api/series/seasons/{seasonId}` | Supprimer une saison |

### 📹 Épisodes (3 endpoints)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/series/seasons/{seasonId}/episodes` | Créer un épisode |
| PUT | `/api/series/episodes/{episodeId}` | Mettre à jour un épisode |
| DELETE | `/api/series/episodes/{episodeId}` | Supprimer un épisode |

### 💾 Fichiers (3 endpoints inter-service)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/files` | Créer référence fichier |
| GET | `/api/files/{id}` | Récupérer métadonnées |
| DELETE | `/api/files/{id}` | Supprimer référence |

**Total: 23 endpoints**

---

## Modèles de données

### Category

```json
{
  "id": 1,
  "name": "Action",
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:00:00Z"
}
```

**Champs**:
- `id` (INTEGER, PK, auto-increment)
- `name` (STRING, unique, 2-50 caractères)
- Timestamps automatiques

### Movie

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Inception",
  "description": "Un film de science-fiction",
  "releaseDate": "2010-07-16",
  "duration": 148,
  "category_id": 1,
  "poster_id": "a47ac10b-58cc-4372-a567-0e02b2c3d479",
  "video_id": "b47ac10b-58cc-4372-a567-0e02b2c3d479",
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:00:00Z"
}
```

**Champs**:
- `id` (UUID, PK)
- `title` (STRING, required)
- `description` (TEXT)
- `releaseDate` (DATE)
- `duration` (INTEGER, minutes)
- `category_id` (INTEGER, FK)
- `poster_id`, `video_id` (UUID, références FILE)
- Timestamps

### Series

```json
{
  "id": "e47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Breaking Bad",
  "description": "Une série dramatique",
  "category_id": 2,
  "poster_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:00:00Z"
}
```

### Season

```json
{
  "id": "g47ac10b-58cc-4372-a567-0e02b2c3d479",
  "number": 1,
  "description": "La première saison",
  "series_id": "e47ac10b-58cc-4372-a567-0e02b2c3d479",
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:00:00Z"
}
```

### Episode

```json
{
  "id": "h47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Pilot",
  "number": 1,
  "duration": 58,
  "video_id": "i47ac10b-58cc-4372-a567-0e02b2c3d479",
  "season_id": "g47ac10b-58cc-4372-a567-0e02b2c3d479",
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:00:00Z"
}
```

### File

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "filename": "movie_poster.jpg",
  "mimetype": "image/jpeg",
  "size": 1024000,
  "url": "/uploads/f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "createdAt": "2024-02-09T10:00:00Z"
}
```

---

## Exemples d'utilisation

### 1. Créer une catégorie

```bash
curl -X POST http://localhost:4000/api/categories \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Science-Fiction"
  }'
```

**Réponse (201)**:
```json
{
  "id": 1,
  "name": "Science-Fiction",
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:00:00Z"
}
```

### 2. Créer un film

```bash
curl -X POST http://localhost:4000/api/movies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "description": "Un thriller de science-fiction captivant",
    "releaseDate": "2010-07-16",
    "duration": 148,
    "category_id": 1,
    "poster_id": "a47ac10b-58cc-4372-a567-0e02b2c3d479",
    "video_id": "b47ac10b-58cc-4372-a567-0e02b2c3d479"
  }'
```

### 3. Créer une série complète

```bash
# 1. Créer la série
curl -X POST http://localhost:4000/api/series \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Breaking Bad",
    "description": "Une série dramatique",
    "category_id": 2,
    "poster_id": "poster-uuid"
  }'

# Sauvegarder l'ID obtenu
SERIES_ID="e47ac10b-58cc-4372-a567-0e02b2c3d479"

# 2. Créer une saison
curl -X POST http://localhost:4000/api/series/$SERIES_ID/seasons \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "number": 1,
    "description": "La première saison"
  }'

# Sauvegarder l'ID obtenu
SEASON_ID="g47ac10b-58cc-4372-a567-0e02b2c3d479"

# 3. Créer un épisode
curl -X POST http://localhost:4000/api/series/seasons/$SEASON_ID/episodes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pilot",
    "number": 1,
    "duration": 58,
    "video_id": "i47ac10b-58cc-4372-a567-0e02b2c3d479"
  }'
```

### 4. Récupérer une série avec tous ses détails

```bash
curl -X GET http://localhost:4000/api/series/e47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Content-Type: application/json"
```

**Réponse (200)**:
```json
{
  "id": "e47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Breaking Bad",
  "description": "Une série dramatique",
  "category_id": 2,
  "poster_id": "poster-uuid",
  "Seasons": [
    {
      "id": "g47ac10b-58cc-4372-a567-0e02b2c3d479",
      "number": 1,
      "description": "La première saison",
      "series_id": "e47ac10b-58cc-4372-a567-0e02b2c3d479",
      "Episodes": [
        {
          "id": "h47ac10b-58cc-4372-a567-0e02b2c3d479",
          "title": "Pilot",
          "number": 1,
          "duration": 58,
          "video_id": "i47ac10b-58cc-4372-a567-0e02b2c3d479",
          "season_id": "g47ac10b-58cc-4372-a567-0e02b2c3d479"
        }
      ]
    }
  ]
}
```

---

## Codes HTTP

| Code | Sens | Exemple |
|------|------|---------|
| **200** | OK | Requête réussie |
| **201** | Created | Ressource créée |
| **204** | No Content | Suppression réussie (sans réponse) |
| **400** | Bad Request | Données invalides ou manquantes |
| **401** | Unauthorized | Token manquant ou invalide |
| **403** | Forbidden | Accès refusé (inter-service) |
| **404** | Not Found | Ressource inexistante |
| **500** | Server Error | Erreur serveur |

---

## Cas d'erreur courants

### Erreur 400 - Validation échouée

```bash
# ❌ Manque le champ requis 'category_id'
curl -X POST http://localhost:4000/api/movies \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Mon Film", "duration": 120}'

# Réponse
{
  "message": "\"category_id\" is required",
  "statusCode": 400
}
```

**Solutions**:
- Vérifier tous les champs requis
- Contrôler les types de données
- Consulter la documentation Swagger

### Erreur 401 - Non authentifié

```bash
# ❌ Pas de token JWT fourni
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{...}'

# Réponse
{
  "message": "Authentification requise",
  "statusCode": 401
}
```

**Solutions**:
- Ajouter l'en-tête `Authorization: Bearer YOUR_TOKEN`
- Vérifier que le token est valide et non expiré
- Contacter l'administrateur pour obtenir un token

### Erreur 404 - Ressource non trouvée

```bash
# ❌ Film inexistant
curl -X GET http://localhost:4000/api/movies/wrong-id

# Réponse
{
  "message": "Film non trouvé",
  "statusCode": 404
}
```

**Solutions**:
- Vérifier l'ID de la ressource
- S'assurer que la ressource a bien été créée
- Lister les ressources avec GET sans ID

---

## Bonnes pratiques

### 1. Sauvegarder et réutiliser les IDs

```bash
# Créer un film et sauvegarder l'ID
MOVIE_ID=$(curl -s -X POST http://localhost:4000/api/movies \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{...}' | jq -r .id)

echo "Film créé avec ID: $MOVIE_ID"

# Utiliser l'ID dans une requête suivante
curl -X GET http://localhost:4000/api/movies/$MOVIE_ID
```

### 2. Formater les réponses avec jq

```bash
# Afficher uniquement certains champs
curl -s http://localhost:4000/api/movies | jq '.[] | {id, title, duration}'

# Filtrer par critère
curl -s http://localhost:4000/api/movies | jq '.[] | select(.duration > 100)'
```

### 3. Gérer les erreurs

```bash
# Vérifier le code HTTP
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/movies/invalid)
if [ $HTTP_CODE != 200 ]; then
  echo "Erreur HTTP: $HTTP_CODE"
fi
```

### 4. Paginer les résultats (si implémenté)

```bash
# Récupérer les films avec limit et offset
curl http://localhost:4000/api/movies?limit=10&offset=0
```

### 5. Valider avant de soumettre

```bash
# Vérifier que les données sont valides en local avant envoi
# Utiliser la documentation Swagger pour connaître les contraintes
```

---

## Relations entre ressources

```
Category (1:N) Movies
Category (1:N) Series
    └─ (1:N) Seasons
        └─ (1:N) Episodes
            └─ (N:1) File (video_id)
    └─ (N:1) File (poster_id)

Movie
├─ (N:1) Category
├─ (N:1) File (poster_id)
└─ (N:1) File (video_id)
```

---

## Notes importantes

- Le `JWT_SECRET` doit être **identique** dans AUTH, DATA, FILE et SMTP
- `GET /api/series` et `GET /api/series/:id` retournent les saisons et épisodes imbriqués
- Les routes DELETE retournent un `200` avec un message de confirmation
- `video_id` est optionnel à la création d'un épisode — associer via `PUT /api/series/episodes/:id`

## Support et contact

**GitHub**: https://github.com/ClemLy/Netflim_DATA  
**Issues**: https://github.com/ClemLy/Netflim_DATA/issues  
**Documentation Swagger**: http://localhost:4000/api/docs