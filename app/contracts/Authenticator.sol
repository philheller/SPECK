// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

// TODO: Make contract Ownable
contract Authenticator {
    event Authenticate(string _msg);
    event Register(string _msg);

    uint256 private next_id;

    mapping(uint256 => Organization_registration) private authenticated;
    mapping(uint256 => Organization_registration) private requested;
    mapping(address => uint256) private address_to_id;

    struct Organization {
        string id;
        string key_pub;
        string name;
        string type_;
        string organization_type;
        string email;
        string institution_type;
        string address_;
        uint256 tax_id;
        uint256 animal_welfare_score_1;
        uint256 animal_welfare_score_2;
        uint256 animal_welfare_score_3;
        uint256 environment_score_1;
        uint256 environment_score_2;
        uint256 environment_score_3;
        bool creation_right;
    }

    constructor() {
        next_id = 0;
    }

    function authenticate(address _organization_id) public returns (bool) {
        emit Authenticate("Message");
        return authenticated[_organization_id];
    }

    function request_registration(
        Organization memory _organization_data
    ) public {
        address_to_id[msg.sender] = next_id;
        authenticated[msg.sender] = _organization_data;
        next_id++;
        emit Register("Message");
    }

    function register()
}
