const MyStringStore = artifacts.require("MyStringStore");
const Speck = artifacts.require("Speck");

module.exports = function (deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Speck);
};
