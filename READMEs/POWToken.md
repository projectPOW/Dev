## `POWToken`



Implements a ERC-20 token with owner mint process


### `constructor(uint256 _levelOfXpToReward, uint256 _initialSupply)` (public)



Create a ERC-20 token with ERC20 OpenZeppelin setup


### `myMint(address target, uint256 amount)` (public)



define the mint function


### `burnPow(address _account, uint256 _amount)` (public)



Administrator can burn token

### `setReward(uint256 _rewardOfEachLevel)` (public)



Administrator, set the amount rewarded for each step

### `getReward()` (public)



Players can get there reward function of there XP. If the threshold to get the next
reward is not achieve player will be reverted


### `rewardWithdrawn()`





### `newAmountReward()`





