# Solution NestJS, GraphQL, Next.js, MySQL

Ce projet est une application CRUD complète utilisant **NestJS** pour l'API backend avec GraphQL et **Next.js** pour le frontend. Le but de ce projet est de permettre la gestion des animaux de compagnie et de leurs propriétaires à travers une interface utilisateur moderne.

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou plus récente)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) (pour la base de données)

## Installation, Configuration et Démarrage

1. **Créer la base de données et les tables dans MySQL :**

   Connectez-vous à votre serveur MySQL et créez la base de données ainsi que les tables nécessaires :

   ```sql
   -- Créer la base de données
   CREATE DATABASE database_name;
   
  use database_name;
  
   -- Créer la table des personnes
   CREATE TABLE person (
       id INT AUTO_INCREMENT PRIMARY KEY,
       lastName VARCHAR(100) NOT NULL,
       firstName VARCHAR(100) NOT NULL,
       email VARCHAR(150) NOT NULL UNIQUE,
       phoneNumber VARCHAR(20) NOT NULL
   );

   -- Créer la table des animaux
   CREATE TABLE animal (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       dateOfBirth DATE NOT NULL,
       species VARCHAR(100) NOT NULL,
       breed VARCHAR(150) NOT NULL,
       color VARCHAR(50) NOT NULL,
       weight DECIMAL(5, 2) NOT NULL,
       ownerId INT,
       FOREIGN KEY (ownerId) REFERENCES person(id) ON DELETE SET NULL
   );

   ```

**"Insère les données du fichier `data-sql.txt` dans ta base de données."**


2. **Cloner le projet et installer les dépendances :**

   git clone https://github.com/guylain237/Solution_Nest_Graphql_Next.git

Accédez au répertoire du projet sur vscode ou autres:

### Installation et Configuration du Backend (NestJS)

3. **Accédez au dossier NestJS :**

   cd Nest_Test_Api
   npm install

### Configurez l'environnement  de variable .env

.env
HOST=localhost
PORT=3306
DATABASE=database_name
DB_USERNAME=root
DB_PASSWORD=

APP_PORT=3001
ORIGIN_URL_FRONT=http://localhost:3000

### Demarrer nestjs

npm run start:dev

uri:[### le port peut changer si 3000 est déjà occupé ](http://localhost:3001/graphql)

### Installation et Configuration du Frontend (NextJS)

ouvrir un deuxieme terminal
cd next_test_front
npm install

### Configurez l'environnement de variable .env

.env
NEXT_PUBLIC_API_URL=http://localhost:3000/graphql

### Demarrer nextjs

npm run dev
uri:[### le port peut changer si 3000 est déjà occupé ](http://localhost:3000/)


### Technologies Utilisées

**NestJS** : Framework Node.js pour créer une API robuste et évolutive.
**GraphQL** : Langage de requête pour des interactions flexibles avec l'API.
**Next.js** : Framework React pour créer des applications frontend modernes et performantes.
**MySQL** : Système de gestion de base de données relationnelle pour stocker les données.

### Fonctionnalités

CRUD Complet : Gestion des propriétaires et des animaux.
Requêtes GraphQL : Utilisation de GraphQL pour des requêtes avancées et personnalisées.
Interface Moderne : Navigation fluide et intuitive pour un accès facile aux données.
