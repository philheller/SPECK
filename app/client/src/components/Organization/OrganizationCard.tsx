import { Organization } from "@/interfaces/Organization";
import Card from "../Card";

// web3
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ContractJson from "@/contracts/OrganizationAuthenticator.json";
import { userandomOrganization } from "@/hooks/useRandomOrganization";

const OrganizationCard = ({
  organizations,
  className,
}: {
  organizations: Organization[];
  className?: string;
}) => {
  return (
    <div className={`${className || ""}`}>
      {organizations.map((organization, index) => (
        <div key={organization.id}>
          <div className="my-2 flex-1 md:my-4">
            <div className="relative">
              <Card className="ml-3 bg-gray-300 p-3 dark:bg-gray-700 md:p-5">
                <header>
                  <h3 className="mb-0">
                    <div className="inline-block">
                      <span className="ml-2 text-lg font-normal md:text-xl">
                        {organization.name}
                      </span>
                    </div>
                  </h3>
                </header>
                <main className="flex flex-wrap gap-3 md:gap-5 lg:gap-8">
                  <div className="my-2 flex-1 basis-52">
                    <div className="grid grid-cols-2 [&>*:nth-child(4n-2)]:bg-gray-400 dark:[&>*:nth-child(4n-2)]:bg-gray-800 [&>*:nth-child(4n-3)]:bg-gray-400 dark:[&>*:nth-child(4n-3)]:bg-gray-800">
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🆔 ID
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.id}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        👤 Name
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.name}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🔤 Type
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.type_}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        💼 Organization Type
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.organization_type}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        ✉️ Email
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        <a href={`mailto:${organization.email}`}>
                          {organization.email}
                        </a>
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        💵 Tax ID
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.tax_id}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🐷 Animal Welfare Score 1
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.animal_welfare_score_1}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🐷 Animal Welfare Score 2
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.animal_welfare_score_2}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🐷 Animal Welfare Score 3
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.animal_welfare_score_3}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🌿 Environment Score 1
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.environment_score_1}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🌿 Environment Score 2
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.environment_score_2}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🌿 Environment Score 3
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {organization.environment_score_3}
                      </div>
                    </div>
                  </div>
                  <div className="my-2 flex flex-1 basis-28 flex-col">
                    <h5 className="mb-1 text-center text-base font-extrabold md:text-lg">
                      Address
                    </h5>
                    <div className="relative h-full w-full rounded-lg border-2 border-solid border-gray-400 p-4 dark:border-gray-600">
                      {organization.address_.length > 0 ? (
                        <div className="max-h-48 overflow-y-auto">
                          {organization.address_}
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center dark:text-gray-400">
                          No address noted
                        </div>
                      )}
                    </div>
                  </div>
                </main>
                <footer>
                  <button
                    className={`rounded-md bg-green-300 px-3 py-2 text-black disabled:bg-gray-400`}
                    type="submit"
                    disabled={true}
                  >
                    Accept Registration 🗞️ (coming soon)
                  </button>
                </footer>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrganizationCard;
