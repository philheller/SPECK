const OrganizationAuthenticator = artifacts.require(
  "./OrganizationAuthenticator.sol"
);

contract("OrganizationAuthenticator", (accounts) => {
  let organizationAuthenticatorInstance;

  before(async () => {
    organizationAuthenticatorInstance =
      await OrganizationAuthenticator.deployed();
  });

  it("should not be registered before requested registration", async () => {
    const authenticated =
      await organizationAuthenticatorInstance.authenticate.call(accounts[0]);
    expect(authenticated).to.be.false;
  });

  it("should store a new registration request for an organization", async () => {
    const organizationData = {
      id: "ID1",
      name: "Schlafthof Meier",
      type_: "Schlachthof",
      organization_type: "Schlafthof",
      email: "meier@schlachthoefe.pig",
      institution_type: "Schlachthof",
      address_: "Am Schlachthof 1; 12345 Karlsruhe",
      tax_id: 123578765,
      animal_welfare_score_1: 1,
      animal_welfare_score_2: 2,
      animal_welfare_score_3: 3,
      environment_score_1: 1,
      environment_score_2: 2,
      environment_score_3: 3,
      creation_right: false,
    };

    const res = await organizationAuthenticatorInstance.requestRegistration(
      organizationData,
      {
        from: accounts[0],
      }
    );

    expect(res.receipt.status).to.be.true;
  });

  it("should be not be registered after requested registration", async () => {
    const authenticated =
      await organizationAuthenticatorInstance.authenticate.call(accounts[0]);
    expect(authenticated).to.be.false;
  });

  it("should allow to retrieve own organization data", async () => {
    const organizationData =
      await organizationAuthenticatorInstance.getMyData.call();

    expect(organizationData).to.not.be.empty;
  });

  it("should allow to retrieve own registration status", async () => {
    const registered =
      await organizationAuthenticatorInstance.amIRegistered.call();

    expect(registered).to.be.false;
  });

  it("should retrieve all requested registrations", async () => {
    const requestedRegistration =
      await organizationAuthenticatorInstance.getRequestedRegistrations.call();

    expect(requestedRegistration.length).to.be.greaterThan(0);
  });

  it("should allow to accept of requested registration", async () => {
    const registered = await organizationAuthenticatorInstance.register(1, {
      from: accounts[0],
    });
    expect(registered.receipt.status).to.be.true;
  });

  it("should have removed registration request after register", async () => {
    const requestedRegistration =
      await organizationAuthenticatorInstance.getRequestedRegistrations.call();
    expect(requestedRegistration.length).to.be.equal(0);
  });

  it("should return authenticated", async () => {
    const authenticated =
      await organizationAuthenticatorInstance.authenticate.call(accounts[0]);
    expect(authenticated).to.be.true;
  });
});
