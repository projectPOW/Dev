// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./itemsFactory.sol";

/**
 * @title Change the cases in items
 * @notice This contract allows players to change the reward earned for NFT
 * @dev The selected items given to the players come from the data base create in the factory by the administrator.
 * Only unlock items can be distributed 
 */
contract convertRewardNFT is itemsFactory {
    
   ///@dev RandNonce for the random Item 
    uint private randNonce = 1;
    
    event rewardWithdrawn(uint tokenId);
    
    ///@dev Transform the reward as a NFT
    function getReward () public {
        require (balanceOf(_administrator) != 0, "None available item for now");
        require (multiverseData[msg.sender].isRegistered, "Not a regitered player");
        require (multiverseData[msg.sender].rewardLv1 != 0 || multiverseData[msg.sender].rewardLv2 != 0, "You have no rewards to get");
        
        randNonce ++;
        
        if (multiverseData[msg.sender].rewardLv1 != 0){
          for (uint i = multiverseData[msg.sender].rewardLv1; i > 0; i-- ){
            uint idItem =  getAvailableItem(1); 
             _transfer(_administrator, msg.sender, idItem);
             emit rewardWithdrawn(idItem);
          }
          multiverseData[msg.sender].rewardLv1 = 0;
        }
        
        if (multiverseData[msg.sender].rewardLv2 != 0){
          for (uint i = multiverseData[msg.sender].rewardLv2; i > 0; i-- ){
            uint idItem =  getAvailableItem(2); 
            _transfer(_administrator, msg.sender, idItem);
            emit rewardWithdrawn(idItem);
          }
          multiverseData[msg.sender].rewardLv2 = 0;
        }
    }
    
    /**
     * @dev Get an available item in the main database of unlock items.
     * First we create the size of an array, then we fill it with the eligible token 
     * and at the end we send the Id of the won token
     */
    function getAvailableItem(uint8 _level) private view returns(uint){
   
        uint sizeArray;
        uint Id;
        
        for (uint k; k < balanceOf(_administrator); k++){
            if (!items[tokenOfOwnerByIndex(_administrator,k)].locked && items[tokenOfOwnerByIndex(_administrator,k)].levelItem == _level){
              sizeArray++;
            }
          }
    
        if (sizeArray == 0){
          revert('There is not enough item availbale, please come back later');
        } else {
    
          uint[] memory availableItem = new uint[](sizeArray);   
    
          for (uint k; k <balanceOf(_administrator); k++){
            if (!items[tokenOfOwnerByIndex(_administrator,k)].locked && items[tokenOfOwnerByIndex(_administrator,k)].levelItem == _level){
              availableItem[Id] = tokenOfOwnerByIndex(_administrator,k);
              Id++;
            }
          }
          uint randReward = uint(keccak256 (abi.encodePacked(block.timestamp, msg.sender, randNonce))) % availableItem.length;
          return availableItem[randReward];
        }
    }
}
