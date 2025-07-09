# mongo-db-node-js

**Étudiants :** WOTOBE et ALIEBONG

## Description du projet

Ce projet est une API REST Node.js avec MongoDB, déployée sur Vercel avec une infrastructure gérée par Terraform. L'architecture utilise Docker pour le développement local et les tests.

## Architecture

- **Backend :** Node.js + Express + Mongoose
- **Base de données :** MongoDB
- **Containerisation :** Docker + Docker Compose
- **Infrastructure :** Terraform
- **Déploiement :** Vercel
- **CI/CD :** GitHub Actions

## Prérequis

- Docker et Docker Compose
- Node.js (version 18+)
- npm ou yarn
- Terraform (pour l'infrastructure)

## Installation et lancement

### 1. Cloner le repository

```bash
git clone <repository-url>
cd mongo-db-node-js
```

### 2. Lancer l'architecture Docker

```bash
# Lancer tous les services (MongoDB + Node.js)
docker-compose -f docker-compose.yml up --build --detach
```

### 3. Vérifier que l'application fonctionne

- Accéder à l'interface Docker et ouvrir le container Node.js
- Tu devrais voir "Hello World" dans le navigateur
- L'API est accessible sur `http://localhost:8000`

### 4. Vérifier les services

```bash
# Voir les conteneurs en cours d'exécution
docker ps

# Voir les logs
docker-compose logs

# Arrêter les services
docker-compose down
```

## Tests

### Tests unitaires et d'intégration

Le projet utilise Jest et supertest pour les tests backend.

#### Lancer les tests

```bash
# Installer les dépendances
npm install

# Lancer tous les tests
npm test
```

#### Structure des tests

- `tests/post.model.test.js` : Tests unitaires du modèle Mongoose Post
- `tests/posts.api.test.js` : Tests d'intégration de l'API

#### Tests dans l'environnement Docker

```bash
# Lancer l'environnement de test
docker-compose up -d

# Lancer les tests
npm test

# Arrêter l'environnement
docker-compose down
```

## API Endpoints

### GET /posts
Récupère tous les posts de la base de données.

**Réponse :**
```json
{
  "posts": [
    {
      "title": "Comprendre MongoDB avec Mongoose",
      "author": {
        "id": "60f7cbb57b9f2c1a0c123456",
        "name": "Alice Martin"
      },
      "content": "Dans cet article...",
      "summary": "Introduction à MongoDB et Mongoose pour les débutants.",
      "category": "Base de données",
      "createdAt": "2025-06-24T10:00:00Z",
      "updatedAt": "2025-06-24T10:30:00Z",
      "comments": [...],
      "likes": 12,
      "status": "published"
    }
  ]
}
```

## Infrastructure avec Terraform

### Déploiement de l'infrastructure

Le projet utilise Terraform pour gérer l'infrastructure Docker.

```bash
# Initialiser Terraform
terraform init

# Voir le plan de déploiement
terraform plan

# Appliquer la configuration
terraform apply
```

### Services gérés par Terraform

- **MongoDB Container :** Base de données avec données de test
- **Node.js Container :** Application backend
- **Réseau Docker :** Communication entre les services

## CI/CD Pipeline

### Workflow GitHub Actions

Le projet utilise GitHub Actions pour automatiser :

1. **Tests :** Jest + supertest
2. **Build :** Construction de l'application
3. **Déploiement :** Vercel
4. **Infrastructure :** Déclenchement Terraform

### Déclenchement automatique

- **Push sur main :** Lance automatiquement les tests et le déploiement
- **Pull Request :** Lance les tests pour validation
- **Déploiement :** Déclenche automatiquement l'infrastructure Terraform

## Structure du projet

```
mongo-db-node-js/
├── app.js                 # Configuration Express + routes
├── server.js              # Point d'entrée de l'application
├── model/
│   └── post.js           # Modèle Mongoose Post
├── tests/
│   ├── post.model.test.js # Tests unitaires du modèle
│   └── posts.api.test.js  # Tests d'intégration API
├── mongo-seed/
│   ├── Dockerfile        # Image pour les données de test
│   └── init.json         # Données initiales MongoDB
├── docker-compose.yml    # Configuration Docker Compose
├── Dockerfile           # Image Node.js
├── main.tf              # Configuration Terraform
├── package.json         # Dépendances Node.js
└── .github/workflows/
    └── production.yml   # Pipeline CI/CD
```

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
MONGODB_URL=mongodb://mongo_db:27017/mydatabase
PORT=8000
FRONT_URL=http://localhost:3000
```

## Développement

### Ajouter de nouvelles fonctionnalités

1. **Modifier le modèle** dans `model/post.js`
2. **Ajouter les routes** dans `app.js`
3. **Écrire les tests** dans `tests/`
4. **Tester localement** avec Docker Compose
5. **Pousser sur GitHub** pour déclencher la CI/CD

### Bonnes pratiques

- Toujours écrire des tests pour les nouvelles fonctionnalités
- Utiliser Docker pour le développement local
- Vérifier que les tests passent avant de pousser
- Documenter les nouvelles API endpoints

## Dépannage

### Problèmes courants

**Docker ne démarre pas :**
```bash
# Vérifier que Docker est lancé
docker --version

# Nettoyer les conteneurs
docker system prune -a
```

**Tests qui échouent :**
```bash
# Vérifier que MongoDB est accessible
docker ps

# Relancer l'environnement de test
docker-compose down && docker-compose up -d
```

**Terraform erreur :**
```bash
# Réinitialiser Terraform
terraform init -reconfigure
```

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence ISC.

---

**Étudiants :** WOTOBE et ALIEBONG  
**Date :** 2024

