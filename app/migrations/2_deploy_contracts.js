const MyStringStore = artifacts.require("MyStringStore");
const Speck = artifacts.require("Speck");
const Authenticator = artifacts.require("Authenticator");

module.exports = function (deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Authenticator);
  deployer.deploy(Speck, "SPECK", "SPX");
};
