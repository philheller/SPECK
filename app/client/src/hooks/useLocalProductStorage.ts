import useLocalStorage from "./useLocalStorage";

type ProductBookmark = {
  tokenId: TokenId;
  date: string;
};

type TokenId = number;

const useLocalProductStorage = () => {
  const [storedValue, setValue] = useLocalStorage<ProductBookmark[]>(
    "productBookmark",
    []
  );

  const addProduct = (productBookmark: ProductBookmark) => {
    const bookmarked = new Set([...storedValue, productBookmark]);
    setValue(Array.from(bookmarked));
  };

  const removeProduct = (productBookmark: Pick<ProductBookmark, "tokenId">) => {
    const res = storedValue.filter((p) => p.tokenId != productBookmark.tokenId);
    setValue(res);
  };

  const clearProducts = () => {
    setValue([]);
  };

  /**
   *
   * @param product - only the tokenId is used for comparison
   */
  const toggleProduct = (product: ProductBookmark) => {
    const isBookmarked = storedValue.some(
      (p: ProductBookmark) => p.tokenId == product.tokenId
    );
    if (isBookmarked) {
      removeProduct(product);
    } else {
      addProduct(product);
    }
  };

  return {
    storedValue,
    addProduct,
    removeProduct,
    clearProducts,
    toggleProduct,
  };
};

export default useLocalProductStorage;
