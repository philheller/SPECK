import { OrganizationDataSnakeCase } from "@/interfaces/Organization";
import { useEffect, useState } from "react";
import { subDays } from "date-fns";

export const userandomOrganization = (organizationName: string) => {
  const [randomOrganization, setrandomOrganization] =
    useState<OrganizationDataSnakeCase>();

  const createRandomOrganization = (): OrganizationDataSnakeCase => {
    const randomOrganization: OrganizationDataSnakeCase = {
      id: "ID1",
      name: organizationName,
      type_: "Schlachthof",
      organization_type: "Schlafthof",
      email: "meier@schlachthoefe.pig",
      institution_type: "Schlachthof",
      address_: "Am Schlachthof 1; 12345 Karlsruhe",
      tax_id: 123578765,
      animal_welfare_score_1: 1,
      animal_welfare_score_2: 2,
      animal_welfare_score_3: 3,
      environment_score_1: 1,
      environment_score_2: 2,
      environment_score_3: 3,
      // creation_right: false,
    };
    return randomOrganization;
  };

  const recreateRandomOrganization = () =>
    setrandomOrganization(createRandomOrganization());

  useEffect(() => {
    setrandomOrganization(createRandomOrganization());
  }, [organizationName]);

  return { randomOrganization, recreateRandomOrganization };
};
