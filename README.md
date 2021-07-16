#Part of the world Dapp


##Introduction

POW est une application off chain permettant à des joueurs de découvrir le monde au travers des quizz. Dans la version actuelle de ce jeu, les joueurs peuvent aquérir des items apres plusieurs 
parties et personnaliser leur MAP avec ceux-ci. 

Dans une volonté d'evolution, l'entreprise souhaite implementer une interface blockchain permettant
aux joueurs de gagner des items sous forme de NFT et les customiser, ainsi que creer une Token economy au travers la creation d'un tokenERC20 et d'une market place. 

Cette Dapp est une premiere version de cette evolution. Bien qu'elle ne realise pas la connexion
 on et off chain elle realise les fonctionnalites de base attendues par l'entreprise.


##Architecture

Voici un schema representant l'architecture general de la DAPP

<img src=" " height = "" width = "" />

Le centre du jeu est le quizz et le jeu POW qui est basé sur un server off-chain. Pour interragir 
avec la blockchain, un oracle Chainlink est utilisé. 
Celui-ci nous permet de faire le lien avec le statut du joueur, son niveau, ses recompenses off-chain avec son address on-chain. 

Une fois sur la blockchain, le joueur peut recuperer ses items via une fonction de tirage au hasard.

Si ces items possedent des caracteristiques compatibles, ils pourront etre fusionnés afin de creer des supers items. Les items ayant servis à la fusion son eux lock sur le jeu et reaffecter à l'adresse ETH POW.

Le joueur a egalement la possibilite de surfer sur les map des autres joueurs et de regarder les items qu'ils possedent.

S'il possede des GC token (token du jeu), il a la possibilite d'effectuer des achats, selon les disponibilites, sur la market place. Il peut egalement effectuer des ordres de vente sur ses propres NFT.

A ce jour, pour gagner des GC Token, le joueur doit jouer a POW. Apres un certain temps de jeu, il se verra recompenser en GC.


##Technologie

-Les Standards ERC20 et ERC721
-Le Front utilise React
-Le back on-chain utilise solidity version a venir
-Le back off-chain est en PHP

##Launch 

Comment lancer le projet
