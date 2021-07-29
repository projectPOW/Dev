// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.1;

//import "@openzeppelin/contracts/utils/Context.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract POWTournament /*is Context, ERC20 is Ecran1*/{

    //mappings
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _faucet;
    mapping (address => staked) public _userStaking;

    //variables
    uint256 public _duration;
    string public _quizType;

    uint8 _decimals;
    uint256 _totalSupply;
    string _name;
    string _symbol;
    address _owner;
    uint8 public penalty;

    //array
    stakingPack[] public tabStakingPack;

    //structs
    struct staked {
        bool isStaked;
        uint timestamp;
        uint amount;
        uint reward;
        uint stakingPackID;
    }

    struct stakingPack {
        uint rate;
        uint period;
    }

    //events
    event Transfer(address addressSender, address origin, uint amountEvent);

    //constructor
    constructor() {
        _name = "POWTournament";
        _symbol = "POW";
        //_quizType = "Geography";
        _decimals = 4;
        _totalSupply = 10000000000000000;
        _balances[msg.sender] = _totalSupply;
        _owner = msg.sender;
    }

    //modifier
    modifier onlyOwner() {
        require(msg.sender == _owner, "You are not admin of the contract!");
        _;
    }

    /**
     * title: setPenalty
     * @notice Set a penalty for a player
     * @param penaltyRate : rate of the penalty
     * @return boolean
     */
    function setPenalty(uint8 penaltyRate) external onlyOwner returns (bool) {
        penalty = penaltyRate;
        return true;
    }

    /**
     * title: addStakingPack
     * @notice add in the stackingPack a rate and a period
     * @param packRate : rate of the rate
     * @param packPeriod : the period of the pack
     * @return boolean
     */
    function addStakingPack(uint packRate, uint packPeriod) external onlyOwner returns (bool) {
        tabStakingPack.push(stakingPack(packRate, packPeriod));
        return true;
    }

    /**
    * title: totalSupply
    * @notice Get the total supply
    * @return uint256
    */
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    /**
    * title: decimals
    * @notice Get the decimals of an amount
    * @return uint8
    */
    function decimals() external view returns (uint8) {
        return _decimals;
    }

    /**
    * title: symbol
    * @notice Get the symbol of the money
    * @return string
    */
    function symbol() external view returns (string memory) {
        return _symbol;
    }

    /**
    * title: name
    * @notice Get the name
    * @return string
    */
    function name() external view returns (string memory) {
        return _name;
    }

    /**
    * title: getOwner
    * @notice Get the owner of the contract
    * @return address
    */
    function getOwner() external view returns (address) {
        return _owner;
    }

    /**
    * title: balanceOf
    * @notice Get the balance of the account
    * @return uint256
    */
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    /**
     * title: setDuration
     * @notice Set the duration of a tournament
     * @param duration : This is the duration of a tournament
     */
    function setDuration(uint256 duration) onlyOwner public{
        _duration = duration;
    }

    /**
     * title: getDuration
     * @notice Get the duration of a tournament
     * @return the duration of the tournament set by the POW system 
     */
    function getDuration() public view returns(uint256){
        return _duration;
    }

    /**
     * title: setQuizType
     * @notice Get the type of the quiz of the tournament
     * @param quizType: the type of the quiz
     */
    function setQuizType(string memory quizType ) onlyOwner public{
        _quizType = quizType;
    }

    /**
     * title: getRewards TODO AGAIN
     * @notice Get the type of the quiz of the tournament
     * @param amount: the amount given in order to calculate a new reward
     * @param stakingPackID: the ID of the stakingPack
     */
    function getRewards(uint amount, uint stakingPackID) public view returns (uint) {
        uint rate = tabStakingPack[stakingPackID].rate;
        uint period = tabStakingPack[stakingPackID].period;


        uint newPeriod = period * 10000;

        uint timeRatio = newPeriod / 365;

        uint reward = timeRatio * (rate * (amount));

        reward = reward / 1000000;
        return reward;
    }

    /**
     * title: stake TODO
     * @notice
     * @dev
     * @param _amount : amount to be staked
     * @param _stakingPackID : ID of the staking pack
     * @return boolean
     */
    /*
    function stake(uint _amount, uint _stakingPackID) external returns (bool) {
        require(tabStakingPack.length > _stakingPackID, "Invalid Pack Id");
        require(_userStaking[msg.sender].isStaked == false, "address already staking");
        require(_balances[msg.sender] >= _amount, "no sufficient funds");
        uint reward = getRewards(_amount, _stakingPackID);

        // remove amount from totalsupply to cover the reward, if the totalSupply was locked
        _userStaking[msg.sender] = staked(true, block.timestamp, _amount, reward, _stakingPackID);
        _balances[msg.sender] = _balances[msg.sender].sub(_amount);
        return true;
    }
    */

    //TODO
    /*
    function withdraw() external returns (bool) {
        require(_userStaking[msg.sender].isStaked, "not yet staked");

        uint period = tabStakingPack[_userStaking[msg.sender].stakingPackID].period;
        if (_userStaking[msg.sender].timestamp.add(period) >= block.timestamp) {
            mint(msg.sender, _userStaking[msg.sender].reward);
            _balances[msg.sender] = _balances[msg.sender].add(_userStaking[msg.sender].amount);
            emit Transfer(address(this), msg.sender, _userStaking[msg.sender].amount);
            delete _userStaking[msg.sender];
        } else {
          uint appliedPenalty = _userStaking[msg.sender].amount.mul(penalty).div(100);
          _balances[msg.sender] = _balances[msg.sender].add(_userStaking[msg.sender].amount);
          burn(appliedPenalty);
        }
        return true;
    }
    */

    //TODO
    /*
    function sendFaucet() external {
        require(_faucet[msg.sender] == false, "already received faucet");
        mint(msg.sender, 100);
        _faucet[msg.sender] = true;
    }
    */

    //TODO
    /*
    function mint(address recipient, uint256 amount) internal {
        require(recipient != address(0), "mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(address(0), recipient, amount);
    }
    */

    /**
      * title: burn
      * @notice Subtract the amount of the balance of the owner
      * @param amount: the amount given in order to calculate a new supply
      */
    /*
       function burn(uint256 amount) public {
            _balances[msg.sender] = _balances[msg.sender] - amount;
            _totalSupply = _totalSupply - (amount);

            emit Transfer(msg.sender, address(0), amount);
       }
    */

    //TODO
    /*
    function transfer(address recipient, uint256 amount) override external returns (bool) {
        require(recipient != address(0), "BEP20: transfer to the zero address");

        _balances[msg.sender] = _balances[msg.sender].sub(amount, "no sufficient funds");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
*/




}
