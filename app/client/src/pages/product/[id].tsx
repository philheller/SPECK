import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import { useRouter } from "next/router";
import Spinner from "@/components/Loading/Spinner";
// web3
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";
import { useContractRead } from "wagmi";
import ContractJson from "@/contracts/Speck.json";
import Head from "next/head";
import { useTransformProductDatas } from "@/hooks/useTransformContractData";
import type { ProductDataSnakeCase } from "@/interfaces/Product";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Timeline from "@/components/Product/Timeline";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
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
    functionName: "getProductHistory",
    args: [id?.toString()],
    enabled: !!id,
  });

  const data = useTransformProductDatas(
    rawData as [ProductDataSnakeCase[], BigNumber[], string[]] | null
  );

  useEffect(() => {
    console.log("New data:", data);
  }, [data]);
  useEffect(() => {
    console.log(isSuccess, data, data?.length);
  }, [isSuccess, data]);

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Product #{id} 🪪</title>
      </Head>
      <h2>Product #{id}</h2>

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
            {isSuccess && data && data.length && <Timeline products={data} />}
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
