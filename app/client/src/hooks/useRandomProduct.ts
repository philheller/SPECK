import { ProductDataSnakeCase } from "@/interfaces/Product";
import { useEffect, useState } from "react";
import { subDays } from "date-fns";

export const useRandomProduct = (
  productType: string,
  previousProduct: number = 0
) => {
  const [randomProduct, setRandomProduct] = useState<ProductDataSnakeCase>();

  const createRandomProduct = (): ProductDataSnakeCase => {
    const randomProduct: ProductDataSnakeCase = {
      id: Math.floor(Math.random() * 1000000).toString(),
      rfid: Math.floor(Math.random() * 1000000).toString(),
      genetics: Array.from(
        { length: Math.floor(Math.random() * 20 + 5) },
        () => "GTAC"[Math.floor(Math.random() * 4)]
      ).join(""),
      animal_weight_g: Math.floor(Math.random() * 100000),
      fat_percentage: Math.floor(Math.random() * 30) + 20,
      feed: Math.floor(Math.random() * 1000000).toString(),
      medication: Math.floor(Math.random() * 1000000).toString(),
      timestamp: subDays(
        new Date(),
        Math.floor(Math.random() * 6)
      ).toISOString(),
      findings:
        Math.random() > 0.5
          ? "Some kind of finding noted here. This could be some doctor's msg. Maybe sth else..."
          : "",
      gender: Math.random() > 0.5 ? 1 : 0,
      slaughter_method: Math.floor(Math.random() * 10),
      ph_value: Math.floor(Math.random() * 8) + 2,
      previous_product: previousProduct,
      product_type: productType || "Pig",
    };
    return randomProduct;
  };

  const recreateRandomProduct = () => setRandomProduct(createRandomProduct());

  useEffect(() => {
    setRandomProduct(createRandomProduct());
  }, [productType]);

  return { randomProduct, recreateRandomProduct };
};
