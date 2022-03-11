# Projet 6 de la formation Dev web Openclassrooms

Projet terminé

🔨 Installation

- Cloner ce projet depuis GitHub.

💡 Fichier ".env"

- Renommer le fichier ".env base" en ".env"
- Entrer votre identifiant et mot de pass MongoDB
- Veuillez entrer votre Token
- Veuillez entrer votre Port

💡 Mise en route du Frontend

- Ouvrir le terminal sur le dossier frontend et exécuter npm install pour
  installer les dépendances.
- Le projet a été généré avec Angular.
- Démarrer npm start pour avoir accès au serveur de développement.
- Rendez-vous sur <http://localhost:8080>.
- L'application va se recharger automatiquement si vous modifiez un fichier
  source.

💡 Mise en route du Backend

- Ouvrir le terminal sur le dossier Backend.
- Pour utiliser le serveur, chargez le package nodemon : npm install -g nodemon.
- Puis lancez le serveur: nodemon.

💡 Sinon

- Si les packages sont déja installés, ces commandes suffisent à démarrer les
  serveurs.

- npm start via le terminal sur le frontend
- nodemon server via le terminal sur le backend
- Se connecter à l'url : <http://localhost:8080>

🖥 Connexion

- Ouvrir <http://localhost:8080> dans votre navigateur.
- Pour s'inscrire sur l'application, l'utilisateur doit fournir un email et un
  mot de passe contenant 8 caractères minimum et 20 maximum (dont 1 majuscule, 1
  minuscule, 1 chiffre, pas de symbole, pas d'espaces).

## Scénario

Vous avez passé la dernière année en tant que développeur back-end indépendant
et vous avez travaillé sur plusieurs projets de tailles et de difficultés
variées.

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance
vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de
plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones »
. C’est pourquoi ce nouveau client, la marque de condiments à base de piment
Piiquante, veut développer une application web de critique des sauces piquantes
appelée « Hot Takes » .

<p align="center">
 <img src="https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png" width="200px"/>
</p>
<p align="center">Piiquante : Marque de sauces piquantes</p>

Si la responsable produit de Piiquante souhaite à terme transformer
l'application d'évaluation en une boutique en ligne, elle souhaite que la
première version soit une « galerie de sauces » permettant aux utilisateurs de
télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces
que d'autres partagent. Le front-end de l'application a été développé à l'aide
d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin
d'un développeur back-end pour construire l'API.

Le délai est raisonnable, vous décidez donc d'accepter le projet. Après avoir
rencontré Paula, la cheffe de produit de Piiquante, elle vous envoie l’email
suivant :

> De : Paula Z À : Me Sujet : Besoins pour l'API
>
> Bonjour,
>
> Nous sommes ravis que vous contribuiez à cette nouvelle application web ! Nous
> sommes une petite marque, donc ce projet aura un > impact important sur notre
> croissance.
>
> Vous trouverez ci-joint les spécifications pour l'API. Vous pouvez également
> trouver un
> [lien vers le repo du projet ici](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)
> où vous > aurez accès à l'interface.
>
> Merci de faire particulièrement attention aux exigences en matière de
> sécurité. Nous avons récemment été victimes d'attaques sur > notre site web et
> nous voulons être sûrs que l'API de cette application est construite selon des
> pratiques de code sécurisées. > Tous les mots de passe des utilisateurs
> recueillis par l'application doivent être protégés !
>
> Cordialement,
>
> Paula Z Cheffe de produit Piiquante
>
> Pièce jointe :
>
> - [Requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf)

Vous êtes prêt à vous lancer dans l'API ! C’est parti !

# Remarques sur l'évaluation

## Compétences évaluées

1. Implémenter un modèle logique de données conformément à la réglementation

Validé

Commentaires :

- Le backend de l'application ne tombe pas en panne lors de son exécution : ✔
- Il n'y a pas d'erreurs dans la console lors de l'exécution de l'application :
  ✔
- L'application utilise toutes les routes énumérées dans le document
  «spécifications » : ✔
- Le projet utilise le framework Express Node.js : ✔
- Le projet est articulé autour d’un serveur Node.js : ✔
- Le projet utilise une base de données MongoDB (sur MongoDB Atlas ou un service
  similaire) : ✔

2. Stocker des données de manière sécurisée

Validé

Commentaires :

- Les mots de passe utilisateurs sont stockés dans la base de données en
  utilisant un hachage des données : ✔
- L'application oblige strictement à une authentification sur toutes les routes
  requises : ✔
- L'application utilise un plugin Mongoose approprié pour garantir que les
  adresses électroniques stockées dans la base de données sont uniques : ✔
- La configuration de la sécurité dans la base de données MongoDB permet à
  l'évaluateur d'exécuter avec succès l'application sur sa propre machine : ✔
- L'application utilise un plugin Mongoose approprié pour s'assurer que toute
  erreur dans la base de données est signalée :✔
- Les versions les plus récentes de Mongoose et de Node.js sont utilisées avec
  des correctifs de sécurité mis à jour : ✔
- L'utilisateur ajoute le contenu du dossier images à gitignore, afin que les
  images ne soient pas téléchargées sur GitHub : ✔

3. Mettre en œuvre des opérations CRUD de manière sécurisée

Validé

Commentaires :

- L'application effectue des opérations de création, de lecture, de mise à jour
  et de suppression telles que définies dans les spécifications de l'API : ✔

## Livrable

Points forts :

- travail sérieux
- utilisation d'extensions pertinentes comme helmet ou dotenv

Axes d'amélioration :

- dès que vous aurez le temps approfondir un peu plus les notions abordées dans ce
projet

### Soutenance

Remarques :

- Assez bonne soutenance de la part de Grégory : la posture était
  professionnelle, les explications claires appuyées sur un support de
  présentation, les réponses globalement justes et le temps imparti assez bien
  respecté (18 minutes).

Donnez une ⭐️ si ce projet vous a plu !
