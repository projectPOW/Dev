// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./convertRewardNFT.sol";

/**
 * @title Create a super monument level 3 by fusion
 * @notice Create a new item from 2 level 2 monument and matrial
 * @dev This contrat create a super monument with a new composition on the basis of a monument and a material. 
 * once the new Item is created, it is sent to the player and the basis item are sent to the date database
 * with a lock status
 */
contract fusion is convertRewardNFT {
    
    event fusionnedItemCreate(uint tokenId, address indexed _to);
    event lockItem(uint tokenId);
    
    ///@dev Make the fusion between two items, create the composition, the new name, continent and tokenId
	function fusionItem(uint _myItemId1, uint _myItemId2) public {
  
	    require (ownerOf(_myItemId1) == msg.sender && ownerOf(_myItemId2) == msg.sender, "Not the owner of the item");
	    require (items[_myItemId1].levelItem == 2 && items[_myItemId2].levelItem == 2, "Non fusionnable elements");
	    require ((_isAnItemFusionable(_myItemId1) && !_isAnItemFusionable(_myItemId2)) || 
	      (!_isAnItemFusionable(_myItemId1) && _isAnItemFusionable(_myItemId2)) , "Combination not possible");
	    
	    uint newComposition;
	    uint tokenId = items.length;
	    uint8 newContinent;
	    string memory newName;
	    string memory espace = " ";

	    if (_isAnItemFusionable(_myItemId1)){
	      newComposition = _fusion(_myItemId1,_myItemId2);
	      newContinent = items[_myItemId1].continent;
	    }else{
	      newComposition = _fusion(_myItemId2,_myItemId1);
	      newContinent = items[_myItemId2].continent;
	    }

	    newName = string(abi.encodePacked(items[_myItemId1].name ,espace,items[_myItemId2].name));

	    _lockItem(_myItemId1);
	    _lockItem(_myItemId2);

	    items.push(Item(newName,3, newContinent,tokenId,newComposition, false, false));
	    _safeMint(msg.sender,tokenId);
	    
	    emit fusionnedItemCreate(tokenId, msg.sender);   
  	}
    
    ///@dev Check if the tokenId is a fusionnable monument
 	function _isAnItemFusionable (uint _tokenId) private view returns(bool){
	  
	    if ((items[_tokenId].composition)/1000000 != 0 ){
	      return true;
	    }else {
	      return false;
	    }
  	}
    
    ///@dev Compute the composition of the new super monument
  	function _fusion(uint _tokenId1, uint _tokenId2) private view returns (uint){
  		uint compositionIntermediate = ((items[_tokenId1].composition / 1000000) * 1000000) + items[_tokenId2].composition;
     	uint codeThirdPart = exemplaireNumbers[compositionIntermediate % 1000000] + 1;
     	return (((compositionIntermediate /1000) * 1000) + codeThirdPart); 
  	}
    
    ///@dev Send the basis momunent and material to the data base with the locked status  
  	function _lockItem(uint _tokenId) private {
  		items[_tokenId].locked = true;
	    _transfer(msg.sender,_administrator, _tokenId);
	    emit lockItem(_tokenId);
  	}
}