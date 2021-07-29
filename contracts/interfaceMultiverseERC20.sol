// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;


/**
 * @title Link the player from POW to the blockchain
 * @notice This contract allows the adnministrator and the player to register an enthereum account and link 
 * it to a POW Login.
 * @dev For now, the update is made by the adnministrator only but in the future, an oracle will do that
 */

contract interfaceMultiverseERC20{
    
    address _administrator;
    
    constructor(){
        _administrator = msg.sender;
    }

    /**
     * @dev structure of a player on ERC20 side 
     * @param Login is the exact same than the one used in POW
     * @param lastLevelErc20Reward, is the last level of the reward obtain for his XP obtain
     * @param XP is the amount of experience point accumulated by the player 
     * @param Registred tells if the player is known this DAPP
     */
	struct Player {
		string login; 
		uint lastLevelErc20Reward; 
		uint XP;
		bool isRegistered;
	}
	
	event NewPlayerRegistered(address addressPlayer, string loginPlayer);
	event playerUpdated(string login);
	
    //Mapping linking the login to an Ethereum address
	mapping (string => address) public multiverseIds;
	
	//Mapping linking an Ethereum address to a player structure
	mapping (address => Player) public multiverseData;
  
    
    /** 
     * @dev link a login with a player. The login must be the exact same one than the one used in POW
     */
	function setMultiversePlayer(address _addressPlayer, string memory _login) public {
	    require(msg.sender == _administrator || msg.sender == _addressPlayer, "you are not authorized to set this account");
		require(!multiverseData[multiverseIds[_login]].isRegistered, "this player is already registered");

		multiverseIds[_login] = _addressPlayer;
		multiverseData[_addressPlayer].isRegistered = true; 
		
		emit NewPlayerRegistered(_addressPlayer,_login);
	}
	
	 /** 
     * @dev Update the data of a registered player. The adnministrator Only can set this. In the future, the oracle will do that
     */
	function updateMultiversePlayer(string memory _login, uint _XP) public {
	    require(msg.sender == _administrator, "you are not authorized to update a player");
		require(multiverseData[multiverseIds[_login]].isRegistered == true, "please set first an Ethereum address for this player");
		
		multiverseData[multiverseIds[_login]] = Player(_login, multiverseData[multiverseIds[_login]].lastLevelErc20Reward, _XP,true);
		emit playerUpdated(_login);
	}
}