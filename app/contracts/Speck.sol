// SPDX-License-Identifier: MIT
pragma solidity >=0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./OrganizationAuthenticator.sol";

/**
 * @title Speck
 * @dev This contract is an ERC721 token that represents a product, or a "speck".
 * It allows authenticated organizations to create and transfer products, and stores
 * product metadata including RFID, genetics, gender, slaughter method, findings, pH value,
 * previous product, product type, animal weight, fat percentage, feed, medication, and
 * timestamp. Additionally, it allows anyone to retrieve product data, retrieve the history
 * of a given product, and retrieve data for multiple products at once.
 */
contract Speck is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Event emitted when a new product is created
    event NewProductCreated(uint256 indexed tokenId, address indexed owner);

    /**
     * @dev Modifier that restricts function calls to authenticated organizations.
     * TODO: Change to true once authentication is implemented.
     */
    modifier onlyRegistered() {
        require(
            _organizationAuthenticator.authenticate(msg.sender) == false,
            "ORGANIZATION AUTHENTICATOR: You are not authenticated."
        );
        _;
    }

    /**
     * @dev Modifier that checks if the previous product in the chain exists and belongs to the
     * caller.
     * @param _product_data Product struct containing metadata for the new product being created.
     */
    modifier previousProductCheck(Product memory _product_data) {
        if (_product_data.previous_product != 0) {
            uint256 previousProductId = _product_data.previous_product;
            // Check if previous product exists
            require(
                bytes(_products[previousProductId].id).length > 0,
                "SPECK: Previous product does not exist."
            );
            // Check if caller is owner of previous product
            require(
                ownerOf(_product_data.previous_product) == msg.sender,
                "SPECK: You are not the owner of the previous product."
            );
        }
        _;
    }

    // Instance of the OrganizationAuthenticator contract.
    OrganizationAuthenticator private _organizationAuthenticator;

    // Struct for storing product information.
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

    // Mapping for storing product data.
    mapping(uint256 => Product) private _products;

    // Mapping for storing the owner of a product.
    mapping(uint256 => address) private _tokenOwner;

    /**
     * @dev Constructor function that sets the name and symbol of the ERC721 token, and initializes the OrganizationAuthenticator contract.
     * @param name The name of the ERC721 token.
     * @param symbol The symbol of the ERC721 token.
     */
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _organizationAuthenticator = new OrganizationAuthenticator();
    }

    /**
     * @dev Creates a new product on the Speck network.
     * @param _product_data The Product struct containing the details of the new product to be created.
     */

    function createNewProduct(
        Product memory _product_data
    ) public onlyRegistered previousProductCheck(_product_data) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _products[newItemId] = _product_data;

        emit NewProductCreated(newItemId, msg.sender);
        return;
    }

    /**
     * @dev Transfers ownership of a product to a new owner.
     * @param _product_data The Product struct containing the details of the product to be transferred.
     * @param _to The address of the new owner of the product.
     */
    function transferProduct(
        Product memory _product_data,
        address _to
    ) public onlyRegistered previousProductCheck(_product_data) {
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

    /**
     * @dev Returns the details of a product, including its Product struct, its token ID, and its current owner.
     * @param _tokenId The ID of the product to retrieve data for.
     * @return A tuple containing the Product struct of the product, its token ID, and its current owner.
     */
    function getProductData(
        uint256 _tokenId
    ) public view returns (Product memory, uint256, address) {
        return (_products[_tokenId], _tokenId, ownerOf(_tokenId));
    }

    /**
     * @dev Returns the details of multiple products, including their Product structs, their token IDs, and their current owners.
     * @param _token_ids An array of product IDs to retrieve data for.
     * @return A tuple containing arrays of Product structs, token IDs, and current owners for the specified products.
     */
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

    /**
     * @dev Returns the full history of a product, including all previous versions of the product in reverse chronological order.
     * @param _tokenId The ID of the product to retrieve the history for.
     * @return A tuple containing arrays of Product structs, token IDs, and current owners for each version of the product in reverse chronological order.
     */
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

    /**
     * @dev Recursively calculates the depth of the history of a product.
     * @param _tokenId The ID of the product to calculate the history depth for.
     * @param _counter A counter variable used to keep track of the depth.
     * @return The depth of the product history.
     */
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

    /**
     * @dev Returns the total number of products that have been created on the Speck network.
     * @return The total number of products.
     */
    function totalProductAmount() public view returns (uint256) {
        return _tokenIds.current();
    }

    /**
     * @dev Returns the address of the current owner of a product.
     * @param _tokenId The ID of the product to retrieve the owner for.
     * @return The address of the current owner of the product.
     */
    function getOwnerOf(uint256 _tokenId) public view returns (address) {
        return ownerOf(_tokenId);
    }
}
