# Design pattern decision

Dans cette DApp il existe 3 contrats sensibles en raison des donnees qu'ils traitent. Il s'agit des contrats 2 contrats interfacesMultiverse, POWToken et ConvertReward. 
Ces contrats permettent respectivement la mise à jour des droits de joueurs concernant leur recompense et XP, l'attribution des ERC721 et l'attribution des ERC20.

Ces contrats doivent etre totalement securisés. 

Pour remplir cette condition, nous avons decidé d'une part de n'inclure aucune fonction uniquement public dans ces contrats et d'autre part d'utiliser un architecture avec deux lignes predefinies; la ligne ERC20 et la ligne ERC721. 
Tous les contrats de ces lignes utilisent des heritages et limite les fonctions publique au minimum necessaire. 

La liaison entre ces 2 contrats correspondant à la mise a jours des joueurs sera effectuée par l'oracle dans le futur et par l'admin uniquement aujourd'hui. 
