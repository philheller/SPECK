const Speck = artifacts.require("./Speck.sol");

contract("Speck", (accounts) => {
  let speckInstance; // Use a different variable name for the instance

  before(async () => {
    speckInstance = await Speck.deployed(); // Store the deployed instance in the variable
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

    await speckInstance.createNewProduct(productData, {
      from: accounts[0],
    }); // Use the stored instance for the test
  });

  it("should allow to retrieve the new product data", async () => {
    const productData = await speckInstance.getProductData.call(1);
    expect(productData).to.not.be.empty;
  });
});
