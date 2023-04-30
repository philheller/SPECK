import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import { useRouter } from "next/router";
import Spinner from "@/components/Loading/Spinner";
// web3
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";
import { useContractRead } from "wagmi";
import ContractJson from "@/contracts/OrganizationAuthenticator.json";
import Head from "next/head";
import { useTransformProductDatas } from "@/hooks/useTransformContractData";

import { OrganizationDataSnakeCase } from "@/interfaces/Organization";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { usetransformOrganizationData } from "@/hooks/useTransformOrganizationData";

const index = () => {
  const router = useRouter();
  const { orgAddress } = router.query;
  // todo change this to be a timeline and not necessarily card-like (no wrap)

  const isHydrationSafe = useHydrationSafeCall();
  const {
    data: rawData,
    error,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: ContractJson.networks[1337].address as `0x${string}`,
    abi: ContractJson.abi,
    functionName: "getOrganizationDataByAddress",
    args: [orgAddress?.toString()],
    enabled: !!orgAddress,
  });

  const data = usetransformOrganizationData(
    rawData as OrganizationDataSnakeCase | null
  );

  useEffect(() => {
    console.log("New data:", data);
  }, [data]);
  useEffect(() => {
    console.log(isSuccess, data);
  }, [isSuccess, data]);

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Organization 🪪</title>
      </Head>
      <h2>Organization Details</h2>

      <section>
        {isHydrationSafe ? (
          <>
            {isLoading && (
              <div className="flex justify-center">
                <div className="w-4 md:w-5">
                  <Spinner />
                </div>
              </div>
            )}
            {error && (
              <div className="">
                <h3 className="flex flex-nowrap items-center text-red-800 dark:text-red-400">
                  <span className="mr-1 w-4 md:mr-2 md:w-5">
                    <ExclamationCircleIcon className="w-4 sm:w-5" />
                  </span>
                  Error
                </h3>
                <h4>Something went wrong...</h4>
                <p>{error.name}</p>
                <p>{error.message}</p>
              </div>
            )}
            {isSuccess && data && (
              <div>
                <div className="my-2 flex-1 md:my-4">
                  <div className="relative">
                    <Card className="ml-3 bg-gray-300 p-3 dark:bg-gray-700 md:p-5">
                      <header>
                        <h3 className="mb-0">
                          <div className="inline-block">
                            <span className="ml-2 text-lg font-normal md:text-xl">
                              {data.name}
                            </span>
                          </div>
                        </h3>
                      </header>
                      <main className="flex flex-wrap gap-3 md:gap-5 lg:gap-8">
                        <div className="my-2 flex-1 basis-52">
                          <h5 className="mb-1 text-base font-extrabold md:text-lg">
                            Data
                          </h5>
                          <div className="grid grid-cols-2 [&>*:nth-child(4n-2)]:bg-gray-400 dark:[&>*:nth-child(4n-2)]:bg-gray-800 [&>*:nth-child(4n-3)]:bg-gray-400 dark:[&>*:nth-child(4n-3)]:bg-gray-800">
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🆔 ID
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.id}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              👤 Name
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.name}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🔤 Type
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.type_}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              💼 Organization Type
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.organization_type}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              ✉️ Email
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              <a href={`mailto:${data.email}`}>{data.email}</a>
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              💵 Tax ID
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.tax_id}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🐷 Animal Welfare Score 1
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.animal_welfare_score_1}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🐷 Animal Welfare Score 2
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.animal_welfare_score_2}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🐷 Animal Welfare Score 3
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.animal_welfare_score_3}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🌿 Environment Score 1
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.environment_score_1}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🌿 Environment Score 2
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.environment_score_2}
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              🌿 Environment Score 3
                            </div>
                            <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                              {data.environment_score_3}
                            </div>
                          </div>
                        </div>
                        <div className="my-2 flex flex-1 basis-28 flex-col">
                          <h5 className="mb-1 text-center text-base font-extrabold md:text-lg">
                            Address
                          </h5>
                          <div className="relative h-full w-full rounded-lg border-2 border-solid border-gray-400 p-4 dark:border-gray-600">
                            {data.address_.length > 0 ? (
                              <div className="max-h-48 overflow-y-auto">
                                {data.address_}
                              </div>
                            ) : (
                              <div className="flex h-full w-full items-center justify-center dark:text-gray-400">
                                No address noted
                              </div>
                            )}
                          </div>
                        </div>
                      </main>
                      <footer></footer>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5">
              <Spinner />
            </div>
          </div>
        )}
      </section>
    </DefaultPaddingXnY>
  );
};
export default index;
