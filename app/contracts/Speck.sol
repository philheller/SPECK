// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Speck is ERC721 {
    uint256 private next_id;

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

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        next_id = 1;
    }

    function createNewProduct(Product memory _product_data) public {
        _safeMint(msg.sender, next_id);
        _products[next_id] = _product_data;
        next_id++;
    }

    function getProductData(
        uint256 _token_id
    ) public view returns (Product memory) {
        return _products[_token_id];
    }
}
