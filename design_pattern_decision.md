# Design pattern decision

Cette Dapp tourne autour de trois contrat un peu plus importants que les autres par les donnees sensibles qu'ils traitent. Il s'agit des contrats Update, POWToken et ConvertReward. 
Ces contrats permettent respectivement la mise a jour des droits de joueurs concernant leur recompense, l'attribution des ERC721 et l'attribution desERC20. 
Ceux-ci ne peuvent donc contenir aucune faille evidente de securité. 

Pour palier cet imperatif, nous avons decider d'utiliser un architecture avec deux lignes predefinies a savoir la ligne ERC20 et la ligne ERC721. Tous les contrats de ces lignes 
utilisent des heritage et limite les fonctions ouvertent au minimum requis. 

La liaison entre ces 2 contrats correspondant a la mise a jours sera effectue par l'oracle dans le futur et par l'admin uniquement aujourd'hui. 
