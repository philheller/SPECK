function useTransformOrganizationData(data) {
  const organizationDataFromArray = data;

  const organizationData = {
    id: organizationDataFromArray.id,
    name: organizationDataFromArray.name,
    type_: organizationDataFromArray.type_,
    organization_type: organizationDataFromArray.organization_type,
    email: organizationDataFromArray.email,
    institution_type: organizationDataFromArray.institution_type,
    address_: organizationDataFromArray.address_,
    tax_id: organizationDataFromArray.tax_id,
    animal_welfare_score_1: organizationDataFromArray.animal_welfare_score_1,
    animal_welfare_score_2: organizationDataFromArray.animal_welfare_score_2,
    animal_welfare_score_3: organizationDataFromArray.animal_welfare_score_3,
    environment_score_1: organizationDataFromArray.environment_score_1,
    environment_score_2: organizationDataFromArray.environment_score_2,
    environment_score_3: organizationDataFromArray.environment_score_3,
    creation_right: organizationDataFromArray.creation_right,
  };

  return organizationData;
}

function useTransformOrganizationsData(data) {
  const result = [];
  const productsLength = data.length;

  for (let i = 0; i < productsLength; i++) {
    const organizationDataFromArray = data[i];

    const organization = {
      id: organizationDataFromArray.id,
      name: organizationDataFromArray.name,
      type_: organizationDataFromArray.type_,
      organization_type: organizationDataFromArray.organization_type,
      email: organizationDataFromArray.email,
      institution_type: organizationDataFromArray.institution_type,
      address_: organizationDataFromArray.address_,
      tax_id: organizationDataFromArray.tax_id,
      animal_welfare_score_1: organizationDataFromArray.animal_welfare_score_1,
      animal_welfare_score_2: organizationDataFromArray.animal_welfare_score_2,
      animal_welfare_score_3: organizationDataFromArray.animal_welfare_score_3,
      environment_score_1: organizationDataFromArray.environment_score_1,
      environment_score_2: organizationDataFromArray.environment_score_2,
      environment_score_3: organizationDataFromArray.environment_score_3,
      creation_right: organizationDataFromArray.creation_right,
    };

    result.push(organization);
  }

  return result;
}

module.exports = {
  useTransformOrganizationData,
  useTransformOrganizationsData,
};
