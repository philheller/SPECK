import { BigNumber } from "ethers";
import type { Organization, OrganizationDataSnakeCase } from "@/interfaces/Organization";
import { useEffect, useState } from "react";

const usetransformOrganizationData = (
  data: OrganizationDataSnakeCase
) => {
  const [transformedData, setTransformedData] = useState<Organization | null>(null);

  useEffect(() => {
    if (!data) return;
    setTransformedData(transformOrganization(data));
  }, [data]);

  return transformedData;
};

const usetransformOrganizationDatas = (
  data: OrganizationDataSnakeCase[]
) => {
  const [transformedData, setTransformedData] = useState<Organization[] | null>(null);

  useEffect(() => {
    console.log("transforming this data: ", data);
    if (!data) return;
    setTransformedData(transformOrganizations(data));
  }, [data]);

  return transformedData;
};

const toOrganization = (
  organizationData: OrganizationDataSnakeCase,
) => {
  const transformedOrganization: Organization = {
    id: organizationData.id,
    name: organizationData.name,
    type_: organizationData.type_,
    organization_type: organizationData.organization_type,
    email: organizationData.email,
    institution_type: organizationData.institution_type,
    address_: organizationData.address_, 
    tax_id:
      typeof organizationData.tax_id === "number"
        ? organizationData.tax_id
              : parseInt(organizationData.tax_id.toString()),
    
    animal_welfare_score_1:
      typeof organizationData.animal_welfare_score_1 === "number"
        ? organizationData.animal_welfare_score_1
              : parseInt(organizationData.animal_welfare_score_1.toString()),
              
              animal_welfare_score_2:
      typeof organizationData.animal_welfare_score_2 === "number"
        ? organizationData.animal_welfare_score_2
              : parseInt(organizationData.animal_welfare_score_2.toString()),
              
              animal_welfare_score_3:
      typeof organizationData.animal_welfare_score_3 === "number"
        ? organizationData.animal_welfare_score_3
              : parseInt(organizationData.animal_welfare_score_3.toString()),

    environment_score_1:
      typeof organizationData.environment_score_1 === "number"
        ? organizationData.environment_score_1
              : parseInt(organizationData.environment_score_1.toString()),
              
              environment_score_2:
      typeof organizationData.environment_score_2 === "number"
        ? organizationData.environment_score_2
              : parseInt(organizationData.environment_score_2.toString()),
              
              environment_score_3:
      typeof organizationData.environment_score_3 === "number"
        ? organizationData.environment_score_3
              : parseInt(organizationData.environment_score_3.toString()),
              

    
    creation_right: organizationData.creation_right,
  };

  return transformedOrganization;
};

const transformOrganization = (data: OrganizationDataSnakeCase) =>
  toOrganization(data);

function transformOrganizations(
  data: OrganizationDataSnakeCase[]
) {
  const result = [];
  const organizationsLength = data.length;

  for (let i = 0; i < organizationsLength; i++) {
    const organization = toOrganization(data[i]);
    result.push(organization);
  }

  return result;
}

export { usetransformOrganizationData, usetransformOrganizationDatas };
