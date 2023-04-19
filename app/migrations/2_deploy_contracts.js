const MyStringStore = artifacts.require("MyStringStore");
const Speck = artifacts.require("Speck");
const OrganizationAuthenticator = artifacts.require(
  "OrganizationAuthenticator"
);

module.exports = function (deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(OrganizationAuthenticator);
  deployer.deploy(Speck, "SPECK", "SPX");
};
