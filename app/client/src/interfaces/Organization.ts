import { BigNumber } from "ethers";

export type Organization = OrganizationData;

type OrganizationData = {
    id: string;
    name: string;
    type_: string;
    organization_type: string;
    email: string;
    institution_type: string;
    address_: string;
    tax_id: number;
    animal_welfare_score_1: number;
    animal_welfare_score_2: number;
    animal_welfare_score_3: number;
    environment_score_1: number;
    environment_score_2: number;
    environment_score_3: number;
    creation_right: boolean;
};

export type OrganizationDataSnakeCase = {
    id: string;
    name: string;
    type_: string;
    organization_type: string;
    email: string;
    institution_type: string;
    address_: string;
    tax_id: BigNumber | number;
    animal_welfare_score_1: BigNumber | number;
    animal_welfare_score_2: BigNumber | number;
    animal_welfare_score_3: BigNumber | number;
    environment_score_1: BigNumber | number;
    environment_score_2:BigNumber | number;
    environment_score_3: BigNumber | number;
    creation_right: BigNumber | number;
};
