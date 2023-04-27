import { BigNumber } from "ethers";
import type { Product, ProductDataSnakeCase } from "@/interfaces/Product";
import { useEffect, useState } from "react";

const useTransformProductData = (
  data: [ProductDataSnakeCase, BigNumber, string]
) => {
  const [transformedData, setTransformedData] = useState<Product>();

  useEffect(() => {
    if (!data) return;
    setTransformedData(transformProduct(data));
  }, [data]);

  return transformedData;
};

const useTransformProductDatas = (
  data: [ProductDataSnakeCase[], BigNumber[], string[]]
) => {
  const [transformedData, setTransformedData] = useState<Product[]>();

  useEffect(() => {
    console.log("transforming this data: ", data);
    if (!data) return;
    setTransformedData(transformProducts(data));
  }, [data]);

  return transformedData;
};

const toProduct = (
  productData: ProductDataSnakeCase,
  tokenId: BigNumber,
  owner: string
) => {
  const transformedProduct: Product = {
    tokenId: tokenId.toNumber(),
    owner,
    id: productData.id,
    rfid: productData.rfid,
    genetics: productData.rfid,
    gender:
      typeof productData.gender === "number"
        ? productData.gender
        : parseInt(productData.gender.toString()),
    slaughterMethod:
      typeof productData.slaughter_method === "number"
        ? productData.slaughter_method
        : parseInt(productData.slaughter_method.toString()),
    findings: productData.findings,
    phValue:
      typeof productData.ph_value === "number"
        ? productData.ph_value
        : parseInt(productData.ph_value.toString()),
    previousProduct:
      typeof productData.previous_product === "number"
        ? productData.previous_product
        : parseInt(productData.previous_product.toString()),
    productType: productData.product_type,
    animalWeightInG:
      typeof productData.animal_weight_g === "number"
        ? productData.animal_weight_g
        : parseInt(productData.animal_weight_g.toString()),
    fatPercentage:
      typeof productData.fat_percentage === "number"
        ? productData.fat_percentage
        : parseInt(productData.fat_percentage.toString()),
    feed: productData.feed,
    medication: productData.medication,
    timestamp: productData.timestamp,
  };

  return transformedProduct;
};

const transformProduct = (data: [ProductDataSnakeCase, BigNumber, string]) =>
  toProduct(...data);

function transformProducts(
  data: [ProductDataSnakeCase[], BigNumber[], string[]]
) {
  const result = [];
  const productsLength = data[1].length;

  for (let i = 0; i < productsLength; i++) {
    const product = toProduct(data[0][i], data[1][i], data[2][i]);
    result.push(product);
  }

  return result;
}

export { useTransformProductData, useTransformProductDatas };
