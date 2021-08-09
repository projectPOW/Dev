## `interfaceMultiverseNFT`

This contract allows the adnministrator and the player to register an enthereum account and link 
it to a POW Login.


For now, the update is made by the adnministrator only but in the future, an oracle will do that


### `setMultiversePlayer(address _addressPlayer, string _login)` (public)



link a login with a player. The login must be the exact same one than the one used in POW

### `updateMultiversePlayer(string _login, uint8 _rewardLv1, uint8 _rewardLv2)` (public)



Update the data of a registered player. The adnministrator Only can set this. In the future, the oracle will do that


### `NewPlayerRegistered(address addressPlayer, string loginPlayer)`





### `playerUpdated(string login)`





