import { useEffect } from "react";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Timeline from "@/components/Product/Timeline";
import { useRouter } from "next/router";
import Spinner from "@/components/Loading/Spinner";
import {
  ExclamationCircleIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
// web3
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";
import { useContractRead } from "wagmi";
import ContractJson from "@/contracts/OrganizationAuthenticator.json";
import Head from "next/head";
import type { BigNumber } from "ethers";
import useLocalProductStorage from "@/hooks/useLocalProductStorage";
import { usetransformOrganizationDatas } from "@/hooks/useTransformOrganizationData";
import { OrganizationDataSnakeCase } from "@/interfaces/Organization";
import OrganizationCard from "@/components/Organization/OrganizationCard";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const isHydrationSafe = useHydrationSafeCall();
  const {
    data: rawData,
    error,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: ContractJson.networks[1337].address as `0x${string}`,
    abi: ContractJson.abi,
    functionName: "getRequestedRegistrations",
  });

  const { storedValue, toggleProduct } = useLocalProductStorage();

  const data = usetransformOrganizationDatas(
    rawData as OrganizationDataSnakeCase[] | null
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SPECK Hack",
          text: "Check out the tracing of SPECK!",
          url: `${window.location.href}/product/${id}`,
        });
        console.log("Successfully shared 📫");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Copied to clipboard!");
    }
  };

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Registration Requests 🪪</title>
      </Head>
      <h2 className="mb-2 flex justify-between">
        <div>Organization Requests</div>
        <div className="flex justify-between gap-2 md:gap-4">
          <button onClick={handleShare}>
            <ShareIcon className="w-4 md:w-5" />
          </button>
        </div>
      </h2>

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
            {isSuccess && data && data.length && (
              <OrganizationCard organizations={data} />
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
