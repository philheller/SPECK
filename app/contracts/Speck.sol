// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./OrganizationAuthenticator.sol";

contract Speck is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewProductCreated(uint256 indexed tokenId, address indexed owner);

    //TODO: CHANGE TO TRUE
    modifier onlyRegistered() {
        require(
            _organizationAuthenticator.authenticate(msg.sender) == false,
            "ORGANIZATION AUTHENTICATOR: You are not authenticated."
        );
        _;
    }

    OrganizationAuthenticator private _organizationAuthenticator;
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

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _organizationAuthenticator = new OrganizationAuthenticator();
    }

    function createNewProduct(
        Product memory _product_data
    ) public onlyRegistered {
        if (_product_data.previous_product != 0) {
            uint256 previousProductId = _product_data.previous_product;
            //     Check if previous product exists
            require(
                bytes(_products[previousProductId].id).length > 0,
                "SPECK: Previous product does not exist."
            );
            require(
                ownerOf(_product_data.previous_product) == msg.sender,
                "SPECK: You are not the owner of the previous product."
            );
        }

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _products[newItemId] = _product_data;

        emit NewProductCreated(newItemId, msg.sender);
        return;
    }

    function transferProduct(
        Product memory _product_data,
        address _to
    ) public onlyRegistered {
        if (_product_data.previous_product != 0) {
            uint256 previousProductId = _product_data.previous_product;
            //     Check if previous product exists
            require(
                bytes(_products[previousProductId].id).length > 0,
                "SPECK: Previous product does not exist"
            );
            require(
                ownerOf(_product_data.previous_product) == msg.sender,
                "SPECK: You are not the owner of the previous product."
            );
        }

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(_to, newItemId);
        _products[newItemId] = _product_data;

        emit NewProductCreated(newItemId, _to);
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
        returns (Product[] memory, uint256[] memory, address[] memory)
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

        return (products, tokenIds, owners);
    }

    function getProductHistory(
        uint256 _tokenId
    )
        public
        view
        returns (Product[] memory, uint256[] memory, address[] memory)
    {
        require(
            bytes(_products[_tokenId].id).length > 0,
            "SPECK: Product-ID does not exist."
        );
        uint256 arrayLength = getHistoryDepth(_tokenId, 0);
        Product[] memory products = new Product[](arrayLength);
        uint256[] memory tokenIds = new uint256[](arrayLength);
        address[] memory owners = new address[](arrayLength);

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

        return (products, tokenIds, owners);
    }

    function getHistoryDepth(
        uint256 _tokenId,
        uint8 _counter
    ) internal view returns (uint8) {
        _counter++;
        Product memory currentProduct = _products[_tokenId];
        if (currentProduct.previous_product == 0) {
            return _counter;
        }
        return getHistoryDepth(currentProduct.previous_product, _counter);
    }

    function totalProductAmount() public view returns (uint256) {
        return _tokenIds.current();
    }
}
