var POWStakingTournament = artifacts.require("./powStakingTournament.sol");

module.exports = function(deployer) {
  deployer.deploy(POWStakingTournament, 200, new web3.utils.BN(3125000).mul(new web3.utils.BN(1000000000)).mul(new web3.utils.BN(1000000000)));
};
