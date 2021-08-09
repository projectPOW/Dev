# Test explication

Pour réaliser nos smart contract nous avons décidé d'utiliser le TDD afin de réduire au maximum le temps de debug et d'optimiser le code

## Test ERC721

Nous commençons par vérifier quelques fonctions de base de l'ERC721 afin de nous assurer que notre NFT est conforme, Name et Symbole

## Test création des items

La base de notre jeu est constituée des items ERC721 crées par l'entreprise POW. Pour être reconnaissables ces items sont décrit par un code appelé composition (ex :294509001). Les 3 premiers digits représentent le code du monument, les trois suivant la matière et les trois derniers le numéro de l'exemplaire.

Dans notre démarche TDD, nous construisons notre code  etape par etape: 

1. Nous créons un code pour le nom "Tour Eiffel" 
2. Nous creons un code pour une "Tour Eiffel en papier" 
3. Nous creons un code pour le "premier exemplaire d'une Tour Eiffel en papier".

Ce code est ensuite dupliqué et testé pour la creation des différents éléments du jeu (matiere et carte).

Pour finir, nous avons choisi que tous les items crées soient affectés au propriétaire du contrat. Nous vérifions que cela se fait correctement.

## Test ajout joueur

Pour que le joueur off Chain soit reconnu sur la Dapp, il doit être enregistré. Il pourra le faire lui-même via l'address injectée sur son navigateur ou il pourra demander à l'admin de le faire pour lui.

1. Nous commencons par vérifier que l'enregistrement se fait correctement.

Ensuite, lorsque le joueur joue sur la partie off-Chain, il doit pouvoir avoir accès aux récompenses obtenues. Si dans le futur un oracle type ChainLink effecuera cette fonction, dans le cadre du POC ce renseignement est fait par l'Admin.

2. Nous vérifions donc que le joueur est bien renseigné avec ses récompenses

## Test Get Reward

Selon le niveau du joueur dans le jeu off-Chain, il peut avoir des récompenses de niveau 1 (des cartes), ou des récompenses de niveau 2 (des monuments ou des matieres).

Dans le contexte TDD nous construisons notre code en vérifiant 
1. la récupération du tableau des Items disponibles à la récolte (ceux appartenant a l'Admin), 
2. la récupération de l'indice des tokens du tableau au hasard
3. L'affectation de l'item au joueur selon les récompenses qu'il peut débloquer.

## Test Fusion Card

Le joueur a la possibilité de fusionner deux items de type matériel et item.

Pour construire notre code, nous vérifions les étapes suivantes :

1. Vérifier les conditions d'entrer, propriétaires des items et items modifiable
2. Décomposition de deux items et fusion
3. Vérification du nombre d'exemplaires et affectation du bon nombre. Verrouillage des items de base et transfert de ceux-ci au owner
5. Affecter le nouvel item au msg. sender

Une fois toutes ces étapes validées, nous aurons le code optimal nous permettant de fusionner deux items selon notre model

## Tests marketPlace

Ce contrat permet les echanges d'asset. Afin de nous assurer que tout se passe bien, nous suivons la methode TDD en verifiant:
1. La bonne recuperation des tableaux, des items appartenant aux joueur. 
2. Nous construisons l'emission des ordres de ventes ouverts et privés
3. Nous verifions que l'achat des ordres disponibles se fait correctement 
4. La suppression des registres de ventes
5. Le retrait des eth par le vendeur


## Test POWToken 

Ce contrat gere la creation des ERC20 et l'attribution des tokens aux joueurs selon leur niveau d'exprience. Pour le realiser, nous verifions : 

1. La recupation du montant correct selon l'experience
2. Le rejet de deux tentatives de recuperation selon le meme nombre de XP 
3. La recuperation de deux montant avant et apres une mise a jour

## Test powStakingTournament

Ce contrat gere la realisation des tournois de staking. Grace à lui, l'Admin peut creer des tournois, les faire evoluer et attribuer des recompense aux vainqueurs. Le joueur lui peut s'enregistrer et recupere son staking. Pour construire ce code, nous verifions: 

1. La bonne creation d'un tournoi
2. La bonne finalisation d'un tournois
3. L'attribution d'un vainqueur
4. L'enregistrement d'un joueur
5. Le retrait du staking une fois le tournoi terminé
6. La recuperation du staking et de la recompense pour le vainqueur.
