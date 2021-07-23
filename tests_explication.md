# Test explication

Pour réaliser nos smart contract nous avons décidé d'utiliser le TDD afin de réduire au maximum le temps de debug et d'optimiser le code

## Test ERC721

Nous commençons par vérifier quelques fonctions de base de l'ERC721 afin de nous assurer que notre NFT est conforme, Name et Symbole

## Test création des items

La base de notre jeu est les items crées par l'entreprise POW. Pour être reconnaissables ces items sont décrit par un code appelé composition (ex :294509001). Les 3 premiers digits représentent le code du monument, les trois suivant la matière et les trois derniers le numéro de l'exemplaire.

Dans notre démarche TDD, nous construisons petit à petit notre code en nous assurant la création d'un code tour Eiffel, d'une tour Eiffel en papier puis du premier exemplaire.
Ce code est ensuite dupliqué sur les différents éléments pouvant être créé dans le jeu.

Pour finir, nous avons choisi que tous les items crées soient affectés au propriétaire du contrat. Nous le vérifions que cela se fait correctement.

## Test ajout joueur

Pour que le joueur off Chain soit reconnu sur la Dapp, il doit être enregistré. Il pourra le faire lui-même via l'address injecte sur son navigateur ou il pourra demander au Owner du contract de le faire pour lui.
Nous devons donc dans un premier temps vérifier que le joueur est bien enregistré quand cela est demandé.

Ensuite, lorsque le joueur joue sur la partie off-Chain, il doit pouvoir avoir accès aux récompenses obtenues. Si dans la pratique le client pense utiliser un oracle type ChainLink, dans le cadre du POC ce renseignement sera fait par le Owner.

Nous vérifions donc que le joueur est bien renseigné avec ses récompenses

## Test Get Reward

Selon le niveau du joueur dans le jeu off-Chain, il peut avoir des récompenses de niveau 1 ex : des cartes de monuments, ou des récompenses de niveau 2 ex : des monuments ou des pierres précieuses.

Dans le contexte TDD nous construisons notre code en vérifiant la récupération du tableau des Items disponibles à la récolte (ceux appartenant aux owner), la récupération de l'indice des tokens du tableau au hasard puis l'affectation de l'item au joueur selon les récompenses qu'il peut débloquer.

## Test Fusion Card

Le joueur a la possibilité de fusionner deux items de type matériel et item.

Pour construire notre code, nous vérifions les étapes suivantes :

1. Vérifier les conditions d'entrer, propriétaires des items et items modifiable
2. Décomposition de deux items et fusion
3. Vérification du nombre d'exemplaires et affectation du bon nombre. Verrouillage des items de base et transfert de ceux-ci au owner
5. Affecter le nouvel item au msg. sender

Une fois toutes ces étapes validées, nous aurons le code optimal nous permettant de fusionner deux items selon notre model

## Tests marketPlace

Ce contrat nous permettra d'effectuer des échanges NFT vs ERC 20 entre les addresse possédant des assets.
Il est doté d'une partie permettant d'afficher les ordres de vente avec leur statuts open ou close et d'une autre partie permettant le d'effectuer les échanges.

Pour écrire ce code nous allons utiliser des contrats Uniswap déjà configurer. Les tests sont à venir.


## Classe POWTournament.sol

## Test ERC20

Nous commençons par vérifier quelques fonctions de base de l’ERC20 afin de nous assurer que notre token est conforme, Name et Symbole

## Test du type et de la durée du quizz

Dans nos spécifications, le système de jeu POW doit permettre à l’administrateur de fixer la durée du quizz ainsi que le thème de ce dernier.

En suivant la méthode TDD, nous construisons progressivement nos deux méthodes pour configurer notre tournoi.

D’autre part, nous nous assurons que seul le système POW, donc l’administrateur peut utiliser ses fonctions.

