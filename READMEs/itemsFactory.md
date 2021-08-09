## `itemsFactory`

In this contract the administrator creates items and set them in the data base. 


The itemsFactory contract create the basics NFT ERC721 and attribute them to the administrator balance.
Two levels of items can be created. Level 1 represesent card of the item, level 2 is items in paper or stone of material


### `constructor()` (public)



Contructor with the address of the interfaceMultiverse contract and the name and symbol of the NFT

### `createItem(uint256 _type, string _name, uint8 _continent)` (public)



Function allowing to create items. Only the adminstrator can make one

### `getCodeMonument(string _nameMonument) → uint256` (internal)



Get the three first digit for the name of the monument. If we create an item, this number will be 000
The front format the writing

### `getCodeMaterial(string _nameMaterial) → uint256` (internal)



Get the three digit of the material name

### `getCodeBaseComposition(uint256 _codeItem, uint256 _codeMaterial) → uint256` (internal)



Get the six first digit of the item

### `getCodeComposition(uint256 _codeItem, uint256 _codeMaterial, uint256 _codeExemplaire) → uint256` (internal)



Get the entire composition of the item


