// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Speck is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Product {
        string id;
        string rfid;
        string genetics;
        uint256 gender;
        uint256 slaughter_method;
        string findings;
        uint256 ph_value;
        uint256 previous_product;
        string product_type;
        uint256 animal_weight_g;
        uint256 fat_percentage;
        string feed;
        string medication;
    }

    mapping(uint256 => Product) private _products;
    mapping(uint256 => address) private _tokenOwner;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function createNewProduct(
        Product memory _product_data
    ) public returns (uint256) {
        //Incremented tokenId for starting the tokenId from 1.
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _products[newItemId] = _product_data;
        return newItemId;
    }

    function getProductData(
        uint256 _tokenId
    ) public view returns (Product memory) {
        return _products[_tokenId];
    }

    function totalTokenAmout() public view returns (uint256) {
        return _tokenIds.current();
    }
}
