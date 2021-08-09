## `marketPlace`

Here you can sell your items against ETH. You create a selling order and when someone buys it,
you can come and withdraw your ETH. You can emit whitlested selling orders


This contract allows the player to exchange his NFT against ETH. Here he can make selling order
whitlested or not.


### `getRankByContinent(uint256 _numContinent) → address[]` (public)



Get a list of all the owners by continent of items. On the front this will make a rank

### `getItemsOfPlayer(address _itemsOwner) → uint256[]` (public)



Get access to the customized map of a player

### `setMarketOrder(uint256 _amountWhished, uint256 _idItemSold)` (public)



Allows owners to set a market order for selling

### `setMarketOrderWhitelisted(uint256 _amountWhished, uint256 _idItemSold, address _whitelistAddress)` (public)



Allows owners to set a whitelisted market order

### `getOrder(uint256 _idOrder)` (public)



Allows anyone to buy an existing selling

### `getWhitelistedOrder(uint256 _idOrder)` (public)



Allows the whitlisted address only to get the item

### `cancelOrder(uint256 _idOrder)` (public)



A seller can cancel a pending selling order

### `withdrawAmount()` (public)



Allows the seller withdraw all his money from selling


### `myNewMarketOrder(address _from)`





### `myNewMarketOrderWithlisted(address _from)`





### `newMarketOrder(uint256 tokenId)`





### `newMarketOrderWithlisted(uint256 tokenId)`





### `soldMade(uint256 tokenId)`





### `soldMadeWhitelisted(uint256 tokenId)`





### `orderCanceled(uint256 tokenId, address _from)`





### `moneyWithdrawn(uint256 amount, address _from)`





