const Speck = artifacts.require("Speck");
const OrganizationAuthenticator = artifacts.require(
  "OrganizationAuthenticator"
);

module.exports = function (deployer) {
  deployer.deploy(OrganizationAuthenticator);
  deployer.deploy(Speck, "SPECK", "SPX");
};
