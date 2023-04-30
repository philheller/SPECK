import { useEffect, useState } from "react";
import Spinner from "@/components/Loading/Spinner";
import Link from "next/link";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
import { XCircleIcon } from "@heroicons/react/24/solid";
import useLocalProductStorage from "@/hooks/useLocalProductStorage";
// accessiblity
import * as Label from "@radix-ui/react-label";
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

const exampleTypes = [
  "Production",
  "Mast",
  "Lidl",
  "Restaurant",
  "Slaughterhouse",
];

const request = () => {
  const [organizationTokenId, setorganizationTokenId] = useState("");
  const [toBeRegistered, settoBeRegistered] = useState(
    exampleTypes.at(Math.floor(Math.random() * 12)) || "Slaughterhouse"
  );
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  const { randomOrganization, recreateRandomOrganization } =
    userandomOrganization(toBeRegistered);

  const { clearProducts } = useLocalProductStorage();

  const isHydrationSafe = useHydrationSafeCall();
  const { config } = usePrepareContractWrite({
    address: ContractJson.networks[1337].address as `0x${string}`,
    abi: ContractJson.abi,
    functionName: "requestRegistration",
    args: [randomOrganization],
    enabled: Boolean(randomOrganization),
  });
  const { write, data } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
    error,
    isError,
    data: txReceipt,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  useContractEvent({
    address: ContractJson.networks[1337].address as `0x${string}`,
    abi: ContractJson.abi,
    // eventName: "RegistrationRequested",
    listener(node, label, requestAddress) {
      console.log("✅ Organization registration requested");
      // @ts-ignore
      console.log("Node:", parseInt(node));
      // @ts-ignore
      console.log("Label (wallet address):", label);
      // @ts-ignore
      setorganizationTokenId(parseInt(node).toString());
      setWaitingForEvent(false);
    },
  });

  const handleRequest = async (e: any) => {
    e.preventDefault();
    recreateRandomOrganization();
    write?.();
    setWaitingForEvent(true);
  };

  const handleRandomizeOrganization = () => {
    settoBeRegistered(
      exampleTypes.at(Math.floor(Math.random() * 12)) || "Slaughterhouse"
    );
  };

  const ifHydrationSafe = (
    <div>
      <form className="mb-3" onSubmit={(e) => handleRequest(e)}>
        <div className="mb-3 flex flex-wrap items-center gap-1">
          <Label.Root
            className="mr-3 font-medium md:mr-4"
            htmlFor="productType"
          >
            Name
          </Label.Root>
          <div className="relative w-full flex-1 basis-52">
            <input
              className="w-full appearance-none rounded-lg bg-gray-300 px-2 py-1 pr-14 outline-none ring-gray-600 ring-offset-gray-200 focus:ring-2 focus:ring-offset-2 dark:bg-gray-900 dark:ring-gray-400 dark:ring-offset-gray-800 md:px-3 md:py-2 md:pr-16"
              type="text"
              id="productType"
              value={toBeRegistered}
              placeholder="e.g. Slaughterhouse #44"
              onChange={(e) => settoBeRegistered(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 md:right-3"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                settoBeRegistered("");
              }}
            >
              <XCircleIcon className="h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-400 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className={`rounded-md bg-yellow-300 px-3 py-2 text-black disabled:bg-gray-400`}
            type="submit"
            disabled={isLoading}
          >
            Register Organization 🗞️
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="mt-4 w-4 md:w-5">
          <Spinner />
        </div>
      )}
      {isError && <p className="mt-4"> Error: {error?.message} </p>}
      {isSuccess && (
        <div>
          <h3 className="mt-4">Success!</h3>
          <h4>Transaction Details</h4>
          <p>
            <span className="font-bold">Transaction hash:</span>{" "}
            {txReceipt?.transactionHash.slice(0, 5)}...
            {txReceipt?.transactionHash.slice(-5)}
          </p>
          <p>
            <span className="font-bold">Block number:</span>{" "}
            {txReceipt?.blockNumber}
          </p>
          <p>Registration requested successfully ✅</p>
        </div>
      )}
    </div>
  );

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>🚧 Dev: Request Organization Registration</title>
      </Head>
      <h2>Request Organization Registration</h2>

      {isHydrationSafe ? ifHydrationSafe : <p> Loading... </p>}
    </DefaultPaddingXnY>
  );
};
export default request;
