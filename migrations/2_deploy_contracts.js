var ItemsFactory = artifacts.require("./itemsFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(ItemsFactory);
};
