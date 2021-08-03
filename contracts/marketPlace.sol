 // SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./unlockItems.sol";
/**
 * @title Market 
 * @notice Here you can sell your items against ETH. You create a selling order and when someone buys it,
 * you can come and withdraw your ETH. You can emit whitlested selling orders
 * @dev This contract allows the player to exchange his NFT against ETH. Here he can make selling order
 * whitlested or not.
 */
contract marketPlace is unlockItems{
    
    ///@dev The basis one which the sold are made.Here everithing is in Ether
	uint base = 1 ether;
	
    /**
     * @dev The structure of a market order.
     * @param name is the name of the item
     * @param idItem is the tokenId, 
     * @param price requested is the price wished for the items
     * param level is the level of the item 
     * @param active indicate if the order is on or off
     */
	struct MarketOrder{
	    string name;
	    uint8 level;
		uint idItem;
		uint priceRequested;
		bool active; 
	}
    
     /**
     * @dev whitelisted Order structure, 
     * @param the adress whitelisted
     * @param active indicate if the order is on or off
     */
	struct whitelistOrder{
	    string name;
	    uint8 level;
		uint idItem;
		uint priceRequested;
		address	whitelistAddress;
		bool active;
	}
	
	///@dev Mapping linking the orderId and the whitelistOrder structure.
	mapping (uint => whitelistOrder) public orderWithWithelist;
	
	///@dev Mapping of the accounts of sellers
	mapping (address => uint ) public balancePlayer;
	
	///@dev Mapping of all the selling orders
	mapping (uint => MarketOrder) public marketOrders;

	event newMarketOrder (uint tokenId);
	event newMarketOrderWithlisted (uint tokenId);
	event soldMade(uint tokenId);
	event soldMadeWhitelisted(uint tokenId);
	event orderCanceled(uint tokenId);

    ///@dev Get a list of all the owners by continent of items. On the front this will make a rank
	function getRankByContinent(uint _numContinent) public view returns(address[] memory) {

		uint numberItemsOnContinent;
		uint counterOwner;

		for (uint i = 0; i < items.length ;i++ ){
			if((ownerOf(items[i].tokenId) != _administrator) && items[i].continent == _numContinent ){
				numberItemsOnContinent ++;
			}
		}

		address[] memory ownerOfItem = new address[](numberItemsOnContinent);

		for (uint i = 0; i < items.length ;i++ ){
			if((ownerOf(items[i].tokenId) != _administrator) && items[i].continent == _numContinent ){
				ownerOfItem[counterOwner] = ownerOf(items[i].tokenId);
				counterOwner ++;
			}
		}
		return ownerOfItem;
	}
    
    ///@dev Get access to the customized map of a player
	function getItemsOfPlayer(address _itemsOwner) public view returns(uint[] memory){

		uint numberItem = balanceOf(_itemsOwner);
		uint[] memory idsItemsOwned = new uint[](numberItem);

		for (uint i=0; i < numberItem; i++){
			idsItemsOwned[i] = tokenOfOwnerByIndex(_itemsOwner,i);
		}

		return idsItemsOwned;
	}
    
    ///@dev Allows owners to set a market order for selling
    function setMarketOrder(uint _amountWhished, uint _idItemSold) public{
		require(ownerOf(_idItemSold) == msg.sender, "Not the owner of the item");
		require(!items[_idItemSold].onSold, "this item is already on sold");

		string memory nameItem = items[_idItemSold].name;
	    uint8 levelOrder = items[_idItemSold].levelItem;

		marketOrders[_idItemSold] = MarketOrder(nameItem,levelOrder,_idItemSold,_amountWhished, true);
		items[_idItemSold].onSold = true;
		
		emit newMarketOrder (_idItemSold);
	}
    
    ///@dev Allows owners to set a whitelisted market order
	function setMarketOrderWhitelisted(uint _amountWhished, uint _idItemSold, address _whitelistAddress) public{
		require(ownerOf(_idItemSold) == msg.sender, "Not the owner of the item");
		require(!items[_idItemSold].onSold, "this item is already on sold");

		string memory nameItem = items[_idItemSold].name;
        uint8 levelOrder = items[_idItemSold].levelItem;
		
		orderWithWithelist[_idItemSold] = whitelistOrder(nameItem,levelOrder,_idItemSold,_amountWhished, _whitelistAddress, true);
		items[_idItemSold].onSold = true;
		
		emit newMarketOrderWithlisted(_idItemSold);
	}
	
	///@dev Allows anyone to buy an existing selling  
	function getOrder(uint _idOrder) public payable{
		require(!orderWithWithelist[_idOrder].active, "order whitlisted" );
		require(marketOrders[_idOrder].active, "this order does not exist");
		require(msg.value == (marketOrders[_idOrder].priceRequested * base), "price not exact");

		items[_idOrder].onSold = false;

		balancePlayer[ownerOf(_idOrder)] = balancePlayer[ownerOf(_idOrder)] + msg.value;
		_transfer(ownerOf(_idOrder),msg.sender, _idOrder);
		_endOrder(_idOrder);

		emit soldMade(_idOrder);
	}
	
    ///@dev Allows the whitlisted address only to get the item 
    function getWhitelistedOrder(uint _idOrder) public payable{
		require(!marketOrders[_idOrder].active, "this order is in the open market");
		require(orderWithWithelist[_idOrder].active, "This address doesn't exist" );
		require(orderWithWithelist[_idOrder].whitelistAddress == msg.sender , "Not the selected reiceiver");
		require(msg.value == (marketOrders[_idOrder].priceRequested * base), "price not exact");

		items[_idOrder].onSold = false;

		balancePlayer[ownerOf(_idOrder)] = balancePlayer[ownerOf(_idOrder)] + msg.value;
		_transfer(ownerOf(_idOrder),msg.sender, _idOrder);
		_endOrder(_idOrder);

		emit soldMadeWhitelisted(_idOrder);
	}
    
    ///@dev A seller can cancel a pending selling order
	function cancelOrder(uint _idOrder) public {
		require (ownerOf(_idOrder) == msg.sender);

		items[_idOrder].onSold = false;

		 _endOrder(_idOrder);

		emit orderCanceled(_idOrder);
	}
	
	///@dev End an order
	function _endOrder(uint _idOrder) private {
		
		delete marketOrders[_idOrder];
		delete orderWithWithelist[_idOrder];
	}
    
    ///@dev Allows the seller withdraw all his money from selling
	function withdrawAmount() public {
		require (balancePlayer[msg.sender] != 0, "nothing to withdraw");
		(bool success, ) = msg.sender.call{value: balancePlayer[msg.sender]}("");
      	require(success, 'transfer failed');
      	balancePlayer[msg.sender] = 0;
	}
}