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

    uint256[] _requestedRegistrationArray;

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

    function requestRegistration(Organization memory _data) public {
        require(
            _addressToId[msg.sender] == 0,
            "ORGANIZATION AUTHENTICATOR: Registration was already requested or accepted"
        );

        _orgIds.increment();
        uint256 newOrgId = _orgIds.current();

        _addressToId[msg.sender] = newOrgId;
        _requestedRegistration[newOrgId] = true;
        _organizationData[newOrgId] = _data;
        _requestAmount.increment();
        _requestedRegistrationArray.push(newOrgId);
    }

    function register(uint256 _orgId) public onlyOwner {
        require(
            _requestedRegistration[_orgId] == true,
            "ORGANIZATION AUTHENTICATOR: Organization ID does not have an active registration request."
        );

        _authenticated[_orgId] = true;
        _requestAmount.decrement();
        _requestedRegistration[_orgId] = false;
        // removeOrgAtIndex(_orgId);
    }

    function getRequestedRegistrations()
        public
        view
        returns (Organization[] memory)
    {
        uint256 totalRequestedAmount = _requestAmount.current();
        Organization[] memory organizations = new Organization[](
            totalRequestedAmount
        );

        Organization memory currentOrg;
        uint256 currentOrgId;

        for (uint256 i = 0; i < _requestedRegistrationArray.length; i++) {
            currentOrgId = _requestedRegistrationArray[i];
            if (currentOrgId != 0) {
                currentOrg = _organizationData[currentOrgId];
                organizations[i] = currentOrg;
            }
        }

        return organizations;
    }

    function getMyData() public view returns (Organization memory) {
        require(
            bytes(_organizationData[_addressToId[msg.sender]].id).length > 0,
            "ORGANIZATION AUTHENTICATOR: You do not have registered data."
        );
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

    // function removeOrgAtIndex(uint256 _orgId) internal {
    //     require(_orgId < _requestedRegistrationArray.length, "Invalid index");

    //     uint256 orgIndex;
    //     for (uint256 i = 0; i < _requestedRegistrationArray.length; i++) {
    //         if (_requestedRegistrationArray[i] == _orgId) {
    //             orgIndex = i;
    //         }
    //     }

    //     for (
    //         uint256 i = orgIndex;
    //         i < _requestedRegistrationArray.length - 1;
    //         i++
    //     ) {
    //         _requestedRegistrationArray[i] = _requestedRegistrationArray[i + 1];
    //     }

    //     _requestedRegistrationArray.pop();
    // }
}
