const Speck = artifacts.require("./Speck.sol");

contract("Speck", (accounts) => {
  let speckInstance;
  let tokenId;

  before(async () => {
    speckInstance = await Speck.deployed();
  });

  it("should store a new product", async () => {
    const productData = {
      id: "ABC123",
      rfid: "TestRFID",
      genetics:
        "GAAACGCGCCCAACTGACGCTAGGCAAGTCAGTGCAGGCTCCCGTGTTAGGATAAGGGTAAACATACAAGTCGATAGAAGATGGGTAGGGGCCTTCAATT",
      gender: 1,
      slaughter_method: 2,
      findings: "",
      ph_value: 7,
      previous_product: 0,
      product_type: "Pig",
      animal_weight_g: 26000,
      fat_percentage: 17,
      feed: "Corn",
      medication: "Iboprofen",
    };

    const res = await speckInstance.createNewProduct(productData, {
      from: accounts[0],
    });

    tokenId = res.logs[0].args[2].toNumber();
  });

  it("should have a total amount of tokens greater than 0", async () => {
    const totalTokenAmount = (
      await speckInstance.totalTokenAmout.call()
    ).toNumber();
    expect(totalTokenAmount).to.be.above(0);
  });

  it("should allow to retrieve the new product data", async () => {
    const productData = await speckInstance.getProductData.call(tokenId);
    expect(productData).to.not.be.empty;
  });
});
