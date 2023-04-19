// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrganizationAuthenticator is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _orgIds;
    Counters.Counter private _requestAmount;
    Counters.Counter private _registeredAmount;

    event Authenticate(string _msg);
    event Register(string _msg);

    uint256 private next_id;

    mapping(uint256 => bool) private _authenticated;
    mapping(uint256 => Organization) private _organizationData;
    mapping(uint256 => bool) private _requestedRegistration;
    mapping(address => uint256) private _addressToId;

    struct Organization {
        string id;
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

    constructor() {}

    function authenticate(address _address) public view returns (bool) {
        return authenticateById(_addressToId[_address]);
    }

    function authenticateById(uint256 _orgId) internal view returns (bool) {
        return _authenticated[_orgId];
    }

    function request_registration(Organization memory _data) public {
        require(
            _addressToId[msg.sender] == 0,
            "Registration was already requested or accepted"
        );

        _orgIds.increment();
        uint256 newOrgId = _orgIds.current();

        _addressToId[msg.sender] = newOrgId;
        _requestedRegistration[newOrgId] = true;
        _organizationData[newOrgId] = _data;
        _registeredAmount.increment();

        _authenticated[_addressToId[msg.sender]] = true;
    }

    // function register() public onlyOwner {}

    // function getRequestedRegistrations()
    //     public
    //     view
    //     returns (Organization[] memory)
    // {
    //     uint256 totalAmount = totalRequestedOrganizationAmount();
    //     Organization[] memory organizations = new Organization[](totalAmount);
    //     uint256 index = 0;
    //     uint256[] memory keys = new uint256[](totalAmount);

    //     // Store keys of _requestedRegistration where the value is true
    //     for (uint256 i = 1; i <= mapLength(_requestedRegistration); i++) {
    //         if (_requestedRegistration[i]) {
    //             keys[index] = i;
    //             index++;
    //         }
    //     }

    //     // Retrieve corresponding organization_data for each key
    //     for (uint256 i = 0; i < index; i++) {
    //         organizations[i] = _organizationData[keys[i]];
    //     }

    //     return organizations;
    // }

    function getMyData() public view returns (Organization memory) {
        return _organizationData[_addressToId[msg.sender]];
    }

    function amIRegistered() public view returns (bool) {
        return _authenticated[_addressToId[msg.sender]];
    }

    //TODO: SET TO INTERNAL
    function totalRequestedOrganizationAmount() public view returns (uint256) {
        return _requestAmount.current();
    }

    //TODO: SET TO INTERNAL
    function totalRegisteredOrganizationAmount() public view returns (uint256) {
        return _registeredAmount.current();
    }

    function mapLength(
        mapping(uint256 => bool) storage _map
    ) private view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i <= 2 ** 256 - 1; i++) {
            // iterate over all possible uint256 keys
            if (_map[i]) {
                count++;
            }
        }
        return count;
    }
}
