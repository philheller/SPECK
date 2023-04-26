const Speck = artifacts.require("./Speck.sol");
const {
  transformSingleProductArray,
  transformProductsArray,
} = require("../utils/helpers.js");

contract("Speck", (accounts) => {
  let speckInstance;

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
      timestamp: getCurrentTime(),
    };

    const res = await speckInstance.createNewProduct(productData, {
      from: accounts[0],
    });

    expect(res.receipt.status).to.be.true;
  });

  it("should allow to retrieve the new product data", async () => {
    let productData = await speckInstance.getProductData.call(1);
    productData = transformSingleProductArray(productData);
    expect(productData).to.not.be.empty;
  });

  it("should allow to add a second product connected to the first product", async () => {
    const productData = {
      id: "ABC123",
      rfid: "TestRFID",
      genetics:
        "GAAACGCGCCCAACTGACGCTAGGCAAGTCAGTGCAGGCTCCCGTGTTAGGATAAGGGTAAACATACAAGTCGATAGAAGATGGGTAGGGGCCTTCAATT",
      gender: 1,
      slaughter_method: 2,
      findings: "",
      ph_value: 7,
      previous_product: 1,
      product_type: "Pig",
      animal_weight_g: 32000,
      fat_percentage: 17,
      feed: "Corn",
      medication: "Iboprofen",
      timestamp: getCurrentTime(),
    };

    const res = await speckInstance.createNewProduct(productData, {
      from: accounts[0],
    });

    tokenId = res.logs[0].args[2].toNumber();
  });

  it("should allow to add a separate product not connected to any product", async () => {
    const productData = {
      id: "Peter1",
      rfid: "A934B",
      genetics:
        "GAAACGCGCCCAACTGACGCTAGGCAAGTCAGTGCAGGCTCCCGTGTTAGGATAAGGGTAAACATACAAGTCGATAGAAGATGGGTAGGGGCCTTCAATT",
      gender: 0,
      slaughter_method: 1,
      findings: "",
      ph_value: 6,
      previous_product: 0,
      product_type: "Pig",
      animal_weight_g: 16000,
      fat_percentage: 17,
      feed: "Corn",
      medication: "",
      timestamp: getCurrentTime(),
    };

    const res = await speckInstance.createNewProduct(productData, {
      from: accounts[0],
    });

    tokenId = res.logs[0].args[2].toNumber();
  });

  it("should allow to retrieve the product history of the last product", async () => {
    let productsHistory = await speckInstance.getProductHistory.call(2);
    productsHistory = transformProductsArray(productsHistory);
    expect(productsHistory).to.not.be.empty;
  });

  it("should allow to retrieve multiple products at once", async () => {
    let productsData = await speckInstance.getMultipleProductData.call([1, 2]);
    productsData = transformProductsArray(productsData);
    expect(productsData).to.not.be.empty;
  });

  it("should have a total amount of tokens of 3", async () => {
    const totalTokenAmount = (
      await speckInstance.totalProductAmount.call()
    ).toNumber();
    expect(totalTokenAmount).to.be.equal(3);
  });
});

function getCurrentTime() {
  const timestamp = Date.now();
  const dateObj = new Date(timestamp);
  const dateString = dateObj.toISOString();

  return dateString;
}
