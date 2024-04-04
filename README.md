# To-Do List

## 🪧 À propos

Conception d'une application desktop de to-do list, axée sur la simplicité et l'esthétique pour une intégration fluide dans la routine de travail des utilisateurs.

## 📚 Table des matières

- 🪧 [À propos](#à-propos)
- 🚀 [Installation](#installation)
- 🛠️ [Langages & Frameworks](#langages--frameworks)
- ⚠️ [Warning](#warning)

## 🚀 Installation

### 📂 Téléchargement du dossier

- Récupérez le dossier zip depuis GitHub.
- Créez un nouveau dossier avec le fichier zip dedans.
- Dézipper le fichier et ouvrez le nouveau dossier dans votre éditeur de code.

### 💻 Lancement du serveur

- Une fois dans votre éditeur de code, ouvrez le dossier du projet ainsi que votre terminal pour vous rendre dans le dossier api avec la commande `$ cd api`.
- Exécuter ensuite la commande `$ npm install` pour installer les dépendances du projet.
- Une fois cette étape réalisée, vous pouvez maintenant lancer le serveur avec la commande `$ npm run start`.
- Normalement votre serveur est bien lancé sur le port indiqué dans le terminal.

### 🚛 Compilation de l'application

- On ouvre maintenant un nouveau terminal, puis on se dirige cette fois vers le dossier app `$ cd app`.
- Exécuter de nouveau la commande `$ npm install` pour installer les dépendances du projet.
- Et on peut maintenant construire notre application en utilisant au choix l'une des commandes ci-dessous.


### 🍏 Application Mac

- Pour les utilisateurs mac, il faut exécuter la commande `$ npm run build:mac`.
- Un dossier dist se crée à l’intérieur on retrouve un dossier mac-arm64 avec l’application crypto-app.app à l’intérieur.

### 🖥️ Application Win

- Pour les utilisateurs mac, il faut exécuter la commande `$ npm run build:win`.
- Un dossier dist se crée à l’intérieur on retrouve un dossier win-arm64-unpacked avec l’application crypto-app.exe à l’intérieur.

### 🐧 Application Linux

- Pour les utilisateurs mac, il faut exécuter la commande `$ npm run build:linux`.
- Un dossier dist se crée à l’intérieur on retrouve un dossier linux-arm64-unpacked avec l’application crypto-app à l’intérieur.

## 🛠️ Langages & Frameworks

<img src="https://img.shields.io/badge/Tools-Electron-47848F?style=flat&logo=electron&logoColor=white" />
<img src="https://img.shields.io/badge/Code-JavaScript-yellow?style=flat&logo=javascript&logoColor=white" />
<img src="https://img.shields.io/badge/Framework-Express.js-yellow?style=flat&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Code-Node.js-darkgreen?style=flat&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Style-CSS-blue?style=flat&logo=css3&logoColor=white" />


## ⚠️ Warning

L'application n'est malheureusement pas encore complètement fonctionnelle. Un problème survient lors de l'affichage des images une fois le projet compilé. De plus, l'application ne fonctionne qu'avec le serveur lancé manuellement en ligne de commande.