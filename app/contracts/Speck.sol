// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Speck is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewProductCreated(uint256 indexed tokenId, address indexed owner);

    //TODO: USE ENUMS FOR GENDER AND SLAUGHTER METHOD
    //TODO: ACCESS CONTROL FOR createNewProduct
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
        string timestamp;
    }

    mapping(uint256 => Product) private _products;
    mapping(uint256 => address) private _tokenOwner;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function createNewProduct(Product memory _product_data) public {
        //Incremented tokenId for starting the tokenId from 1.
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _products[newItemId] = _product_data;

        emit NewProductCreated(newItemId, msg.sender);
        return;
    }

    function getProductData(
        uint256 _tokenId
    ) public view returns (Product memory, uint256, address) {
        return (_products[_tokenId], _tokenId, ownerOf(_tokenId));
    }

    function getMultipleProductData(
        uint256[] memory _token_ids
    )
        public
        view
        returns (Product[] memory, uint256[] memory, address[] memory, uint256)
    {
        uint256 tokenIdAmount = _token_ids.length;

        Product[] memory products = new Product[](tokenIdAmount);
        uint256[] memory tokenIds = new uint256[](tokenIdAmount);
        address[] memory owners = new address[](tokenIdAmount);

        uint256 currentTokenId;

        for (uint256 i = 0; i < tokenIdAmount; i++) {
            currentTokenId = _token_ids[i];
            require(
                bytes(_products[currentTokenId].id).length > 0,
                "Speck: Product-ID does not exist."
            );
            products[i] = _products[currentTokenId];
            tokenIds[i] = currentTokenId;
            owners[i] = ownerOf(currentTokenId);
        }

        return (products, tokenIds, owners, tokenIdAmount);
    }

    function getProductHistory(
        uint256 _tokenId
    )
        public
        view
        returns (Product[] memory, uint256[] memory, address[] memory, uint256)
    {
        require(
            bytes(_products[_tokenId].id).length > 0,
            "Speck: Product-ID does not exist."
        );
        uint256 totalAmount = totalProductAmount();
        Product[] memory products = new Product[](totalAmount);
        uint256[] memory tokenIds = new uint256[](totalAmount);
        address[] memory owners = new address[](totalAmount);

        Product memory currentProduct = _products[_tokenId];
        products[0] = currentProduct;

        uint256 currentTokenId = _tokenId;
        tokenIds[0] = currentTokenId;
        owners[0] = ownerOf(currentTokenId);

        uint256 index = 1;

        while (currentProduct.previous_product != 0) {
            currentTokenId = currentProduct.previous_product;
            currentProduct = _products[currentTokenId];
            products[index] = currentProduct;
            tokenIds[index] = currentTokenId;
            owners[index] = ownerOf(currentTokenId);
            index++;
        }

        return (products, tokenIds, owners, index);
    }

    function totalProductAmount() public view returns (uint256) {
        return _tokenIds.current();
    }
}
