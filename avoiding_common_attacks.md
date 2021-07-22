#Common attacks

##Retrait des fonds sur le staking tournament

Dans la Dapp, le joueur a accès a un tournois staking. Pour participer à ce tournois, le joueur doit bloquer une partie de ses actifs pendant une période prédéterminée. 

Une fois le temps écoulé, tous les joueurs récupèrent leur mise. Le joueur gagnant lui, récupère en plus une partie des intérêts générés. 

Même si aujourd'hui ce ne sont pas des ethers qui sont utilisés, nous appliquons le principe du push over pull pour la récupération des fonds.

##Array

Tous les items de notre jeu sont stokés dans un tableau. Ceci rend le système particulièrement sensible aux attaques DOS. 

Pour éviter que ceci ne puisse avoir lieu, nous avons limite l'écriture dans le tableau au owner seulement et toutes les fonctions permettant de lire dans ce tableau sont en view.

##Nombre aléatoire

Le choix de l'item se fait avec une notion de hasard. Nous utilisons une variable randNonce dans le calcul rendant la tâche plus compliquée pour une quelconque manipulation des résultats.


