// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.1;

contract interfaceMultiverse{

	struct Player {

		string login; 
		uint8 rewardLv1;
		uint8 rewardLv2;
		bool isRegistered;
	}

	mapping (string => address) public multiverseIds;
	mapping (address => Player) public multiverseData;

	function setMultiversePlayer(address _addressPlayer, string memory _login) public {
		require(!multiverseData[multiverseIds[_login]].isRegistered, "this player is already registered");

		multiverseIds[_login] = _addressPlayer;
		multiverseData[_addressPlayer].isRegistered = true; 
	}

	function updateMultiversePlayer(string memory _login, uint8 _rewardLv1, uint8 _rewardLv2) public {
		require(multiverseData[multiverseIds[_login]].isRegistered == true, "please set first an Ethereum address for this player");
		
		multiverseData[multiverseIds[_login]] = Player(_login, _rewardLv1, _rewardLv2, true );
	}


}