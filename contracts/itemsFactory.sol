// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./interfaceMultiverseNFT.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/access/Ownable.sol";


/**
 * @title Administrator factory for Items
 * @notice In this contract the administrator creates items and set them in the data base. 
 * @dev The itemsFactory contract create the basics NFT ERC721 and attribute them to the administrator balance.
 * Two levels of items can be created. Level 1 represesent card of the item, level 2 is items in paper or stone of material
 */
contract itemsFactory is ERC721Enumerable, Ownable, interfaceMultiverseNFT{
  
    ///@dev Contructor with the address of the interfaceMultiverse contract and the name and symbol of the NFT
    constructor () ERC721("powUniq","POW"){
    }

    ///@dev Those are the differents types of items which can be created 
    uint _monument = 1;
    uint _material = 2;
    uint _card = 3;

    /**
     * @dev This is the stucture of an item. 
     * @param Name is the name of the item 
     * @param levelItem is the level of the item 1 or 2 at this stage
     * @param continent is the continent where this items is located 
     *  -here the list of continent by number: 1:North America, 2:South America, 3: Antarctique, 4:Asia, 5:Europe, 6:Africa ,
     *  7:Oceania, 8:None(for material)
     * @parma tokenIdId is the Id of the token, 
     * @param compostion represesent the item on a number format: ex 123 456 789 where
     *  -123 is the name of the monument (ex "tour eiffel") 
     *  -456 is the material type (ex Gold)
     *  -789 is the number of exemplaire of this item (ex with 3 exemplaire in the game this code will be 003)
     * 
     */
    struct Item{
        string name;
        uint8 levelItem;
        uint8 continent;
        uint tokenId;
        uint composition;
        bool locked;
        bool onSold;
    }

    //Array with all the items of the game
    
    Item[] public items;
    
    //Mapping counting the number of exemplaire of each item. The 6 first digits only are taken into account
    mapping (uint => uint) public exemplaireNumbers;
    
    ///@dev Function allowing to create items. Only the adminstrator can make one
    function createItem(uint _type,string memory _name, uint8 _continent) public onlyOwner {
    
        uint codeFirstPart;
        uint codeSecondPart;
        uint codeThirdPart;
        uint codeComposition;
        uint tokenId = items.length;
        uint8 level;
        
        if (_type == _monument) {
          codeFirstPart =  getCodeMonument(_name);
          codeSecondPart = getCodeMaterial ("paper");
          level = 2;
        } 
        if (_type == _material){
          codeSecondPart = getCodeMaterial(_name);
          level = 2;
        }
        if (_type == _card){
          codeFirstPart =  getCodeMonument(_name);
          level = 1;
        }
        
        codeThirdPart = exemplaireNumbers[getCodeBaseComposition(codeFirstPart,codeSecondPart)]+1;
        codeComposition = getCodeComposition(codeFirstPart,codeSecondPart,codeThirdPart);
        exemplaireNumbers[getCodeBaseComposition(codeFirstPart,codeSecondPart)] = codeThirdPart;    
        
        _safeMint(msg.sender, tokenId);
        items.push(Item(_name, level, _continent, tokenId, codeComposition, false, false));
    }
    
    /**@dev Get the three first digit for the name of the monument. If we create an item, this number will be 000
     * The front format the writing
     */
    function getCodeMonument(string memory _nameMonument) internal pure returns (uint){
        return uint(keccak256(abi.encodePacked(_nameMonument))) % 1000;
    }
    
    ///@dev Get the three digit of the material name
    function getCodeMaterial(string memory _nameMaterial) internal pure returns (uint){
        return (uint(keccak256(abi.encodePacked(_nameMaterial))) % 999)+1;
    }
    
    ///@dev Get the six first digit of the item
    function getCodeBaseComposition(uint _codeItem ,uint _codeMaterial) internal pure returns (uint){
        return (_codeItem*1000)+_codeMaterial;
    }
    
    ///@dev Get the entire composition of the item
    function getCodeComposition( uint _codeItem, uint _codeMaterial, uint _codeExemplaire) internal pure returns(uint){
        return (getCodeBaseComposition(_codeItem,_codeMaterial)*1000) + _codeExemplaire;
    }

}
