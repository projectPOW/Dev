// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./fusion.sol";

/** 
 * @title Lock and unlock items
 * @dev This contract allows the administrator to unlock or lock items in the database
 */
 
contract unlockItems is fusion { 
 
    ///@dev Gives to the administrator a list of tokenId locked
    function getLockedItems() onlyOwner public view returns(uint[] memory) {
        require (balanceOf(_administrator) != 0, "No more items in the database");
        
        uint sizeLocked;  
        uint maxSize = balanceOf(_administrator);
        uint count;
        uint[] memory ownedItems = new uint[](maxSize);
        
    
        for (uint i = 0; i < maxSize; i++ ){
          ownedItems[i] = tokenOfOwnerByIndex(_administrator,i);
          if (items[ownedItems[i]].locked){
            sizeLocked ++;
          }
        }
        
        uint[] memory lockedItems = new uint[](sizeLocked);
    
        if (lockedItems.length != 0){
          for(uint i = 0; i < maxSize; i++){
            if(items[ownedItems[i]].locked){
              lockedItems[count] = items[ownedItems[i]].tokenId;
              count ++;
            }
          }
        }else{
          revert("No lockedItems");
        }
        return lockedItems;
      }

    ///@dev Administrator unlocks items
    function unlock(uint _Id) public onlyOwner {
        require (ownerOf(_Id) == msg.sender, "Error , token owned or non existent");
        items[_Id].locked = false;
    }
    
    ///@dev Administrator locks items
    function lock(uint _Id) public onlyOwner {
        require (ownerOf(_Id) != msg.sender, "Error , token owned or non existent");
        items[_Id].locked = true;
   
    }
}