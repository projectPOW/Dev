// SPDX-License-Identifier: MIT

pragma solidity 0.8.1;
import "./interfaceMultiverseERC20.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/openzeppelin-contracts-master/contracts/access/Ownable.sol";

/** 
 * @title POWToken
 * @dev Implements a ERC-20 token with owner mint process
 */
contract POWToken is ERC20, Ownable, interfaceMultiverseERC20 {

    address public _owner;
    uint levelOfXPReward;
    uint amountRewarded;

    
    /** 
     * @dev Create a ERC-20 token with ERC20 OpenZeppelin setup
     * @param _levelOfXpToReward is the threshold to get a reward
     * @param _initialSupply is the amount of token created and attributate to the owner 
     */
    constructor(uint _levelOfXpToReward, uint _initialSupply) ERC20("PowToken", "POW") {
        _owner = msg.sender;
        levelOfXPReward = _levelOfXpToReward;
        _mint(_owner, _initialSupply);
    }
    
    event rewardWithdrawn();
    event newAmountReward();

    /**
     * @dev define the mint function
     * @param target address of target
     * @param amount amount POWToken to mint
     */    
    function myMint (address target, uint amount) public onlyOwner  {

        _mint(target, amount);
    }
    ///@dev Administrator can burn token
    function burnPow(address _account, uint _amount)  public onlyOwner {
        _burn(_account,_amount);
    }
    
    ///@dev Administrator, set the amount rewarded for each step
    function setReward (uint _rewardOfEachLevel) public onlyOwner {
        amountRewarded = _rewardOfEachLevel;
        emit newAmountReward();
    }
    
    /**
     * @dev Players can get there reward function of there XP. If the threshold to get the next
     * reward is not achieve player will be reverted
     */
     
    function getReward() public {
        require(multiverseData[msg.sender].isRegistered, "You are not eligible, please register first");
        require(amountRewarded != 0, "Pow is currently setting rewards, please come back later");

        uint rewardMultiplier;
        uint rewardLevelRequested;
        uint reward;
        
        rewardLevelRequested = multiverseData[msg.sender].XP / levelOfXPReward;

        if(rewardLevelRequested == 0 || (rewardLevelRequested - multiverseData[msg.sender].lastLevelErc20Reward == 0)){
            revert("nothing to withdraw for now");
        }else{
            rewardMultiplier = rewardLevelRequested - multiverseData[msg.sender].lastLevelErc20Reward;  
            reward = rewardMultiplier * amountRewarded;
             multiverseData[msg.sender].lastLevelErc20Reward = rewardLevelRequested;
            _mint(msg.sender, reward);
        }
        
        emit rewardWithdrawn();
    }
}