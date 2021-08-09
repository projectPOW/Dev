# Common attacks

## Architecture

Les contrats interface, convert et POW Token sont les plus sensibles en raison des données qu'ils traitent. Pour eviter toutes attaques possibles, il a ete decider de realiser une integration via l'heritage. Voir le document design_decision_pattern pour plus d'informations.

## Array

Tous les items de notre jeu sont stokés dans un tableau. Ceci rend le système particulièrement sensible aux attaques DOS. 

Pour éviter que ceci ne puisse avoir lieu, nous avons limité l'écriture dans le tableau à l'Admin seulement et toutes les fonctions permettant de lire dans ce tableau sont en view.

## Retrait des fonds sur le staking tournament

Dans la Dapp, le joueur a accès a un tournois staking. Pour participer à ce tournois, le joueur doit bloquer une partie de ses actifs pendant une période prédéterminée. 

Une fois le temps écoulé, tous les joueurs récupèrent leur mise. Le joueur gagnant lui, récupère en plus une partie des intérêts générés. 

Même si aujourd'hui ce ne sont pas des ethers qui sont utilisés, nous appliquons le principe du PullPayment pour la récupération des fonds.

## Nombre aléatoire

Le choix de l'item se fait au hasard selon la liste des items disponible. Ceci rend le systeme sensible a une manipulation des time stamp par les mineurs et donc un hack sur l'attribution des NFT. 

Pour parer cette possible attaque, nous utilisons une variable randNonce implementée à chaque appel de fonction getReward. Nous utilisons egalement la fonction "block.timestamp". 


## Market Place

Dans la market place, l'echange de valeur se fait en ether. Le possesseur peut ajouter un ordre de vente et a tout moment, un acheteur peut acheter le produit. 

Afin d'eviter tout bloquage au moment de la vente et du transfert d'ether au vendeur, nous avons decidé de stoker les ethers sur le contrat  et enregistrer le balances du vendeur dans un mapping. Le retrait des fonds se fait grace a un systeme de PullPayment. 

Bien evidement dans ce processus de retrait nous veillons a : 

1. Effectuer le changement d'etat du balance avant l'appel du call
2. Nous utilions un call plutot qu'un transfert ou send

## Event

Pour pouvoir surveiller l'activite du contrat, nous avons implenter plusieurs event à differents endroits strategique. Ces events sont egalement utilise pour limiter la surcharge de code dans le contrat.


## Require et Revert

Tout au long du contrat different require sont utilise afin de limiter l'utilisation des fonctions aux ayants droit ou a des moments précis.

## Pure, Internal, Private... 

Afin de limiter l'acces a certaines fonctions strategiques, la visibilites des fonctions a ete mise en place selon leur utilisation. Pour exemple, la fonction "endOrder" permettant de mettre fin a un ordre de vente est marque en "private"

## Optimisation du code

Lors de la realisation de notre code, nous avons utilisé le pricipe du TDD. Ceci nous a permis de limiter les lignes de codes, les erreurs et surtout d'appliquer le principe de triangulation afin de reduire les doublons de fonction. 

Dans les structures, nous avons, tant que possible, utiliser des "uint8" et les avons regroupe. Vous pouvez nottament observer la structure "Item" du contrat "itemsFactory"