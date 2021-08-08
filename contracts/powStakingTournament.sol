// SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

import "./POWToken.sol";

/** 
 * @title Tournament staking
 * @dev Create several tournaments of staking with duration, theme and reward
 */
contract POWStakingTournament is POWToken {

    constructor(uint _levelOfXpToReward, uint _initialSupply) POWToken(_levelOfXpToReward, _initialSupply) {}

    /** 
     * @dev Status of tournament
     * @param NotSetup the tournament has'nt been created yer
     * @param IsOn the tournament is currently running 
     * @param IsCountingWinner The tournament is closed, the admin is setting the winner
     * @param WinnerSet the tournament is finished and the winner is set. Everyone can withdraw his staking
     */
    enum TournamentStatus {
        NotSetup,
        IsOn,
        IsCountingWinner,
        WinnerSet
    }


    /** 
     * @dev Structure of a tournament
     * @param idTournament of the tournament. The number is choose on the front side 
     * @param stakeRequested the amount of stake needed to participate to the tournament  
     * @param durationTournament the time the tournament is going to last
     * @param rewardTournament the reward given to the winner
     * @param subjectTournament the subject of the tournament
     * @param isActive Tournament is still active or not
     * @param tournamentStatus status of the tournament
     * @param winner address of the winner
     */

   struct Tournament {
        uint idTournament;
        uint stakeRequested;
        uint durationTournament;
        uint rewardTournament;
        string subjectTournament;
        bool isActive;
        TournamentStatus tournamentStatus;
        address winner;
    }

     /** 
     * @dev Structure of a player
     * @param stake amount stake by the player to participate to the tournament
     * @param isRegistered staus of a player on a tournament  
     * @param hasWithdrawn player has withdrawn his staking
     */

    struct PlayerTournament {
        uint stake;
        bool isRegistered;
        bool hasWithdrawn;
    } 



    /** 
     * @dev Mapping adress player => id tournament => player. The player can play to several tournament
     */
    mapping (address => mapping (uint => PlayerTournament)) public balanceStaking;

    ///@dev Mapping of all the tournaments
    mapping (uint => Tournament) public tournaments;

    ///@dev Mapping of all the reward 
    mapping (address => uint) public rewards;

    event newTournament (uint idTournament);
    event endPlayTournament (uint idTournament);
    event winnerSet (uint idTournament, address winner);

    ///@dev Set a new tournament
    function setTournament (string memory _subjectTournament, uint _stakeRequested, uint _durationTournament, uint _idTournament, uint _rewardTournament) onlyOwner public {
        require (!tournaments[_idTournament].isActive, "Please choose another Id");

        uint durationInDays = _durationTournament * 1 days;
        uint counterTimeTournament = block.timestamp + durationInDays; 

        tournaments[_idTournament] = Tournament(_idTournament, _stakeRequested, counterTimeTournament,_rewardTournament,_subjectTournament, true, TournamentStatus.IsOn, address(0));
        emit newTournament (_idTournament);
    }

    ///@dev End the game 
    function endTournament(uint _idTournament) public onlyOwner {

        require (tournaments[_idTournament].isActive, "this tournament doesn't exist");
        require (block.timestamp > tournaments[_idTournament].durationTournament, "Please wait for the time set to finish");
        require (tournaments[_idTournament].tournamentStatus == TournamentStatus.IsOn, "The tournament is not in the playing status");

        tournaments[_idTournament].tournamentStatus = TournamentStatus.IsCountingWinner;

        emit endPlayTournament(_idTournament);
    }

    ///@dev Close the tournament and set the winner
    function setWinner(uint _idTournament, address _winner) public onlyOwner {
        require (tournaments[_idTournament].isActive, "this tournament doesn't exist");
        require (tournaments[_idTournament].tournamentStatus == TournamentStatus.IsCountingWinner, "Tournament not in the right status");

        tournaments[_idTournament].winner = _winner;
        tournaments[_idTournament].tournamentStatus = TournamentStatus.WinnerSet;
        rewards[_winner] += tournaments[_idTournament].rewardTournament;
        tournaments[_idTournament].isActive = false;

        emit winnerSet (_idTournament, _winner);
    }

    ///@dev Register a new player
    function registerPlayer(uint _idTournament, uint _amount) public {
        require (tournaments[_idTournament].isActive, "this tournament doesn't exist");
        require (tournaments[_idTournament].tournamentStatus == TournamentStatus.IsOn, "Tournament not in the right status");
        require (balanceOf(msg.sender) >= tournaments[_idTournament].stakeRequested, "balance too low");
        require (!balanceStaking[msg.sender][_idTournament].isRegistered, "Player already registered");

        _burn(msg.sender, _amount);

        balanceStaking[msg.sender][_idTournament] = PlayerTournament(_amount, true, false);
    }

    ///@dev Every player withdraw their staking at the end of the tournament
    function withdrawStaking(uint _idTournament) public {
        require (tournaments[_idTournament].tournamentStatus == TournamentStatus.WinnerSet, "Tournament not in the right status");
        require (balanceStaking[msg.sender][_idTournament].isRegistered, "you didn't participate this tournement");
        require (!balanceStaking[msg.sender][_idTournament].hasWithdrawn, "Stake already withdrawn");

        balanceStaking[msg.sender][_idTournament].hasWithdrawn = true;
        _mint(msg.sender, balanceStaking[msg.sender][_idTournament].stake);
        balanceStaking[msg.sender][_idTournament].stake = 0;
    }

    ///@dev the winner withdraw his rewards
    function withdrawReward() public{
       require (rewards[msg.sender] > 0, "No reward to withdraw");

       uint amount = rewards[msg.sender];
       rewards[msg.sender] = 0;
       _mint(msg.sender, amount);
    }

}

   