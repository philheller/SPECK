const MyStringStore = artifacts.require("./MyStringStore.sol");

contract("MyStringStore", (accounts) => {
  let myStringStore;

  before(async () => {
    myStringStore = await MyStringStore.deployed();
  });

  it("should allow me to get the current string", async () => {
    // Get myString from public variable getter
    const storedString = await myStringStore.getMyString.call();

    expect(storedString, "The string does not get fetched.").to.exist;
    expect(storedString, "The fetched value is not a string.").to.be.a(
      "string"
    );
  });

  it("should store the string 'Hey there!'", async () => {
    // Set myString to "Hey there!"
    await myStringStore.set("Hey there!", { from: accounts[0] });

    // Get myString from public variable getter
    const storedString = await myStringStore.getMyString.call();

    expect(storedString).to.equal("Hey there!", "The string was not stored");
  });
});
