import { BigNumber } from "ethers";

export type Product = ProductData & TokenId & Owner;

type ProductData = {
  id: string;
  rfid: string;
  genetics: string;
  gender: number;
  slaughterMethod: number;
  findings: string;
  phValue: number;
  previousProduct: number;
  productType: string;
  animalWeightInG: number;
  fatPercentage: number;
  feed: string;
  medication: string;
  timestamp: string;
};

export type ProductDataSnakeCase = {
  id: string;
  rfid: string;
  genetics: string;
  gender: BigNumber | number;
  slaughter_method: BigNumber | number;
  findings: string;
  ph_value: BigNumber | number;
  previous_product: BigNumber | number;
  product_type: string;
  animal_weight_g: BigNumber | number;
  fat_percentage: BigNumber | number;
  feed: string;
  medication: string;
  timestamp: string;
};

export type TokenId = {
  tokenId: number;
};

export type Owner = {
  owner: string;
};
