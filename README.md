Installation :

Cloner le repo git

ouvrir la console à la racine du BACK et exécuter la commande : npm install
ouvrir la console à la racine du FRONT et exécuter la commande : npm install

créer un fichier .env au même niveau que le fichier app.js / server.js...

dans ce fichier copier/coller la ligne suivante:
TOKEN = 'RANDOM_TOKEN_SECRET' 


Créer votre BDD mysql :

Lancer le back-end en ouvrant la console à la racine du dossier "back" et en entrant la commande suivante : node server

Dans un invit de commande connectez vous avec vos identifiants MYSQL (par exemple mysql -u root -p) 
Créer une nouvelle BDD à l'aide de la commante CREATE DATABASE nom_database
Ensuite accéder à cette dernière en utilisant USE nom_database

Ouvrer le fichier joint "Gori_Teo_2_bdd_062022" 
copier la première ligne "INSERT INTO `users`..." 
coller cette-dernière dans votre invit de commande

*Vous possédez désormais un utilisateur administrateur*

Lancer le front en utilisant la console à sa racine, entrer la commande : npm run start

*Au chargement de la page vous vous retrouverez sur la page Login*

les identifiants du compte admin se trouvent dans le fichier.txt "Gori_Teo_3_compte_admin_062022"

