// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity 0.7.6;

/**
 * The itemsFactory contract does this and that...
 */
contract itemsFactory is ERC721 {
  
  constructor () ERC721("PowItems","POW"){}

  struct items{
  	string name;
  	uint composition;
  }
}
