// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

import "./interfaceMultiverse.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/access/Ownable.sol";


/**
 * The itemsFactory contract does this and that...
 */
contract itemsFactory is ERC721, Ownable, interfaceMultiverse {
  
  constructor () ERC721("PowItems","POW"){}

  string _monument = "Monument";
  string _material = "Material";
  string _card = "Card";

 
  struct Item{
  	string name;
  	uint composition;
  }

  Item[] public items;
  mapping (uint => uint) public exemplaire;

  
  function createItem(string memory _type,string memory _name) public onlyOwner returns (uint) {
    
    uint codeFirstPart;
    uint codeSecondPart;
    uint codeThirdPart;
    uint codeComposition;
    uint tokenId = items.length;

    if ((keccak256 (bytes(_type))) == (keccak256 (bytes(_monument)))) {

      codeFirstPart =  getCodeMonument(_name);
      codeSecondPart = getCodeMaterial ("paper");
    } 

    if ((keccak256 (bytes(_type))) == (keccak256 (bytes(_material)))){
      codeSecondPart = getCodeMaterial(_name);
    }

    if ((keccak256 (bytes(_type))) == (keccak256 (bytes(_card)))){
      codeFirstPart =  getCodeMonument(_name);
    }
    codeThirdPart = exemplaire[getCodeBaseComposition(codeFirstPart,codeSecondPart)]+1;
    codeComposition = getCodeComposition(codeFirstPart,codeSecondPart,codeThirdPart);

    exemplaire[getCodeBaseComposition(codeFirstPart,codeSecondPart)] = codeThirdPart;
    
    items.push(Item(_name, codeComposition));
    _safeMint(msg.sender, tokenId);

    return codeComposition;
    
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
