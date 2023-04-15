const Speck = artifacts.require("./Specl.sol");

contract("Speck", (accounts) => {
  let Speck;

  before(async () => {
    Speck = await Speck.deployed();
  });
});
