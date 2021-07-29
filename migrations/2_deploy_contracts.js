var MarketPlace = artifacts.require("./marketPlace.sol");

module.exports = function(deployer) {
  deployer.deploy(MarketPlace);
};
