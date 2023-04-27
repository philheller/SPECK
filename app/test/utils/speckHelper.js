function useTransformProductData(data) {
  const productDataFromArray = data[0];

  const productData = {
    token_id: data[1].toNumber(),
    owner: data[2],
    id: productDataFromArray.id,
    rfid: productDataFromArray.rfid,
    genetics: productDataFromArray.rfid,
    gender: productDataFromArray.gender,
    slaughter_method: productDataFromArray.slaughter_method,
    findings: productDataFromArray.findings,
    ph_value: productDataFromArray.ph_value,
    previous_product: productDataFromArray.previous_product,
    product_type: productDataFromArray.product_type,
    animal_weight_g: productDataFromArray.animal_weight_g,
    fat_percentage: productDataFromArray.fat_percentage,
    feed: productDataFromArray.feed,
    medication: productDataFromArray.medication,
    timestamp: productDataFromArray.timestamp,
  };

  return productData;
}

function useTransformProductDatas(data) {
  const result = [];
  const productsLength = data[1].length;

  for (let i = 0; i < productsLength; i++) {
    const productData = data[0][i];
    const tokenId = data[1][i];
    const owner = data[2][i];

    const product = {
      token_id: tokenId.toNumber(),
      owner,
      id: productData.id,
      rfid: productData.rfid,
      genetics: productData.rfid,
      gender: productData.gender,
      slaughter_method: productData.slaughter_method,
      findings: productData.findings,
      ph_value: productData.ph_value,
      previous_product: productData.previous_product,
      product_type: productData.product_type,
      animal_weight_g: productData.animal_weight_g,
      fat_percentage: productData.fat_percentage,
      feed: productData.feed,
      medication: productData.medication,
      timestamp: productData.timestamp,
    };

    result.push(product);
  }

  return result;
}

module.exports = {
  useTransformProductData,
  useTransformProductDatas,
};
