const Speck = artifacts.require("./Specl.sol");

contract("Speck", (accounts) => {
  let Speck;

  before(async () => {
    Speck = await Speck.deployed();
  });

  it("should store a new product", async () => {
    const productData = {};

    await Speck.set("Hey there!", { from: accounts[0] });
  });
});
