// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./interfaceMultiverse.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/access/Ownable.sol";


/**
 * The itemsFactory contract does this and that...
 */
contract itemsFactory is ERC721, Ownable, interfaceMultiverse {
  
  address _owner;
  
  constructor () ERC721("PowItems","POW"){

    _owner = msg.sender;
  }

  string _monument = "Monument";
  string _material = "Material";
  string _card = "Card";
  uint randNonce = 1;

 
  struct Item{
  	string name;
  	uint composition;
    uint levelItem;
    bool locked;
  }

  Item[] public items;
  mapping (uint => uint) public exemplaire;

  
  function createItem(string memory _type,string memory _name) public onlyOwner {
    
    uint codeFirstPart;
    uint codeSecondPart;
    uint codeThirdPart;
    uint codeComposition;
    uint tokenId = items.length;
    uint level;

    if ((keccak256 (bytes(_type))) == (keccak256 (bytes(_monument)))) {

      codeFirstPart =  getCodeMonument(_name);
      codeSecondPart = getCodeMaterial ("paper");
      level = 2;
    } 

    if ((keccak256 (bytes(_type))) == (keccak256 (bytes(_material)))){
      codeSecondPart = getCodeMaterial(_name);
      level = 2;
    }

    if ((keccak256 (bytes(_type))) == (keccak256 (bytes(_card)))){
      codeFirstPart =  getCodeMonument(_name);
      level = 1;
    }
    codeThirdPart = exemplaire[getCodeBaseComposition(codeFirstPart,codeSecondPart)]+1;
    codeComposition = getCodeComposition(codeFirstPart,codeSecondPart,codeThirdPart);

    exemplaire[getCodeBaseComposition(codeFirstPart,codeSecondPart)] = codeThirdPart;
    
    items.push(Item(_name, codeComposition,level, false));
    _safeMint(msg.sender, tokenId);
    
  }

  function getReward () public returns(Item memory){

    require (multiverseData[msg.sender].rewardLv1 != 0 || multiverseData[msg.sender].rewardLv2 != 0, "You have no rewards to get");

    Item memory myItem;

    if (multiverseData[msg.sender].rewardLv1 != 0){
      for (uint i = multiverseData[msg.sender].rewardLv1; i > 0; i-- ){
        uint idItem =  getAvailableItem(1); 
         _transfer(_owner, msg.sender, idItem);
      }
      multiverseData[msg.sender].rewardLv1 = 0;
    }

    if (multiverseData[msg.sender].rewardLv2 != 0){
      for (uint i = multiverseData[msg.sender].rewardLv2; i > 0; i-- ){
        uint idItem =  getAvailableItem(2); 
        _transfer(_owner, msg.sender, idItem);
      }
      multiverseData[msg.sender].rewardLv2 = 0;
    }
    return myItem;
  }
  

  
  function getAvailableItem(uint _level) public view returns(uint){

    uint sizeArray;
    uint Id;
    randNonce ++;

    for (uint k; k < items.length; k++){
      if (ownerOf(k) == _owner ){
        if (!items[k].locked && items[k].levelItem == _level){
          sizeArray++;
        }
      }
    }

    uint[] memory availableItem = new uint[](sizeArray);
   
   for (uint k; k < items.length; k++){
      if (ownerOf(k) == _owner ){
        if (!items[k].locked && items[k].levelItem == _level){
         availableItem[Id] = k;
         Id++;
        }
      }
    }

    if (availableItem.length == 0){
      revert('There is not enough item availbale, please come back later');
    } else {

    uint randReward = uint(keccak256 (abi.encodePacked(block.timestamp, msg.sender, nonce))) % availableItem.length;

    return availableItem[randReward];
    }
  }

  function getCodeMonument(string memory _nameMonument) internal returns (uint){
    return uint(keccak256(abi.encodePacked(_nameMonument))) % 1000;
  }

  function getCodeMaterial(string memory _nameMaterial) internal returns (uint){
    return (uint(keccak256(abi.encodePacked(_nameMaterial))) % 999)+1;
  }

  function getCodeBaseComposition(uint _codeItem ,uint _codeMaterial) internal returns (uint){
    return (_codeItem*1000)+_codeMaterial;
  }

  function getCodeComposition( uint _codeItem, uint _codeMaterial, uint _codeExemplaire) internal returns(uint){
    return (getCodeBaseComposition(_codeItem,_codeMaterial)*1000) + _codeExemplaire;
  }
  
}
