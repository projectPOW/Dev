## `POWStakingTournament`

This  contract set staking tournament. The player stake an amount and can get it at the end of the tournament


Create several tournaments of staking with duration, theme and reward


### `constructor(uint256 _levelOfXpToReward, uint256 _initialSupply)` (public)





### `setTournament(string _subjectTournament, uint256 _stakeRequested, uint256 _durationTournament, uint256 _rewardTournament)` (public)



Set a new tournament

### `endTournament(uint256 _idTournament)` (public)



End the game

### `setWinner(uint256 _idTournament, address _winner)` (public)



Close the tournament and set the winner

### `registerPlayer(uint256 _idTournament)` (public)



Register a new player

### `withdrawStaking(uint256 _idTournament)` (public)



Every player withdraw their staking at the end of the tournament

### `withdrawReward()` (public)



the winner withdraw his rewards


### `newTournament(uint256 idTournament)`





### `endPlayTournament(uint256 idTournament)`





### `winnerSet(uint256 idTournament, address winner)`





