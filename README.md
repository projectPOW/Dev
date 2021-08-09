# Part of the world Dapp

## Introduction

POW est une application off chain permettant à des joueurs de découvrir le monde au travers des quizz. Dans la version actuelle de ce jeu, les joueurs peuvent acquérir des items après plusieurs parties et personnaliser leur MAP avec ceux-ci.
Dans une volonté d'évolution, l'entreprise souhaite implémenter une interface blockchain permettant aux joueurs de gagner des items sous forme de NFT et de les customiser, ainsi que créer une Token economy au travers la création d'un tokenERC20 et d'une market place.

Le centre du jeu est le quizz et le jeu POW qui est basé sur un server off-chain. Dans le futur, l'interaction avec la blockchain se fera via un oracle Chainlink afin de mettre à jour le statut des joueurs.
Dans le cadre de cette première version de la Dapp, seul l'Admin du contrat possède l'habilitation requise permettant de mettre à jour les joueurs. Ceux-ci peuvent tout de même s'enregistrer d'eux même.

## Parcours du joueur

### Collecte des items

A son arrivée sur l'interface, s'il est déjà enregistré et qu'il a gagné des items ou case dans le jeu off chain, le jouer peut aller collecter ses items NFT et ERC20. En arrivant sur la page de collecte des rewards, il verra affiché son nombre de reward et pourra effectuer la collecte.

Joueur ou non-joueur peuvent tous accéder a une market place. Une option dans laquelle ils peuvent s'échanger leur Items contre des Eth. Les joueurs souhaitant vendre peuvent effectuer des ordres de vente, avec le prix de leur choix et les personnes souhaitant acheter peuvent y consulter les ordres de vente disponible. A noter qu'il y également la possibilité de d'indexer les ordres pour une adresse particulière.

### Tournois

Via la blockchain, les joueurs pourront avoir acccès a des tournois sponsorise leur permettant de remporter des tokens a l'effigie de grande marque, leur donnant ainsi accès à des avantages chez les partenaires.

Les joueurs auront également la possibilité de participer à des tournois Staking, dans lesquels ils devront stake une partie de leurs ERC20 pour jouer et le vainqueur remportera une partie des intérêts générés.

## Parcours Admin

### Enregistrement des joueurs

La Dapp étant pour le moment déconnectée de son oracle futur, l'Admin est en charge de la mise a jour du joueur de POW vers la multivers.

### Création des items

Pour que les items soient disponibles, ils doivent être créés. C'est le rôle de l'Admin. Tous les Items seront générés en base papier.

### Lock et Unlock

S'il le souhaite, l'Admin a la possibilité de rendre certains Item qu'il possède bloqués, ou alors en débloquer d'autres. Ceci rend les NFT indisponible à la recuperation.

## Technologie

<li>Les Standards ERC20 et ERC721
<li>Le Front utilise React et Semantic UI
<li>Le back on-chain utilise solidity compiler 0.8.1
<li>Le back off-chain est en PHP

## Launch

1. Pour lancer le projet par le télécharger a partir de ce gitHub
2. Run la commande ```$ npm install @openzeppelin/contracts``` afin de telecharger les contrats.(En cas de problème lies à ces contrats, télécharger les contrats à partir du gitHub OppenZeppelin " https://github.com/OpenZeppelin/openzeppelin-contracts" . Vous aurez besoin de ERC20, ERC721Enumerable et Ownable. Installez les dans vos fichier @oppenZeppelin.
3. Créez un fichier ".env" avec vos codes


Et le tour est joué !
