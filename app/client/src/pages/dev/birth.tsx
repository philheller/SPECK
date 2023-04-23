import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";
import { XCircleIcon } from "@heroicons/react/24/solid";
// accessiblity
import * as Label from "@radix-ui/react-label";
// web3
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ContractJson from "@/contracts/Speck.json";
import Link from "next/link";
import { useState } from "react";
import Spinner from "@/components/Loading/Spinner";

type pig = {
  id: string;
  rfid: string;
  genetics: string;
  gender: number;
  slaughter_method: number;
  findings: string;
  ph_value: number;
  previous_product: number;
  product_type: string;
  animal_weight_g: number;
  fat_percentage: number;
  feed: string;
  medication: string;
  timestamp: string;
};

const birth = () => {
  const [bornTokenId, setBornTokenId] = useState("");
  const [toBeBornId, setToBeBornId] = useState("125");
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  const pig: pig = {
    id: toBeBornId,
    rfid: "TestRFID",
    genetics:
      "GAAACGCGCCCAACTGACGCTAGGCAAGTCAGTGCAGGCTCCCGTGTTAGGATAAGGGTAAACATACAAGTCGATAGAAGATGGGTAGGGGCCTTCAATT",
    gender: 1,
    slaughter_method: 2,
    findings: "",
    ph_value: 7,
    previous_product: 0,
    product_type: "Pig",
    animal_weight_g: 26000,
    fat_percentage: 17,
    feed: "Corn",
    medication: "Iboprofen",
    timestamp: new Date().toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  };

  const isHydrationSafe = useHydrationSafeCall();
  const { config } = usePrepareContractWrite({
    address: ContractJson.networks[1337].address as `0x${string}`,
    abi: ContractJson.abi,
    functionName: "createNewProduct",
    args: [pig],
    enabled: Boolean(pig),
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
    eventName: "NewProductCreated",
    listener(node, label, owner) {
      console.log("🐖✅ New pig born");
      // @ts-ignore
      console.log("Node:", parseInt(node));
      // @ts-ignore
      console.log("Label (wallet address):", label);
      // @ts-ignore
      console.log("Topics:", owner.args);
      // @ts-ignore
      setBornTokenId(parseInt(node).toString());
      setWaitingForEvent(false);
    },
  });

  const handleBirth = async (e: any) => {
    e.preventDefault();
    pig.id = "TestID" + Math.floor(Math.random() * 1000);
    write?.();
    setWaitingForEvent(true);
  };

  const ifHydrationSafe = (
    <div>
      <form className="mb-3" onSubmit={(e) => handleBirth(e)}>
        <div className="mb-3 flex flex-wrap items-center gap-1">
          <Label.Root className="mr-3 font-medium md:mr-4" htmlFor="pigId">
            Pig Id
          </Label.Root>
          <div className="relative w-full flex-1 basis-52">
            <input
              className="w-full appearance-none rounded-lg bg-gray-300 px-2 py-1 pr-14 outline-none ring-gray-600 ring-offset-gray-200 focus:ring-2 focus:ring-offset-2 dark:bg-gray-900 dark:ring-gray-400 dark:ring-offset-gray-800 md:px-3 md:py-2 md:pr-16"
              type="text"
              id="pigId"
              value={toBeBornId}
              placeholder="Peter"
              onChange={(e) => setToBeBornId(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 md:right-3"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setToBeBornId("");
              }}
            >
              <XCircleIcon className="h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-400 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        <button
          className={`rounded-md bg-pink-600 px-3 py-2 text-black disabled:bg-gray-400`}
          type="submit"
          disabled={isLoading}
        >
          Give birth ✨
        </button>
      </form>
      {isLoading && <p> Loading... </p>}
      {isError && <p> Error: {error?.message} </p>}
      {isSuccess && (
        <div>
          <h3 className="mt-4">Success!</h3>
          <h4>Transaction Details</h4>
          <p>
            <span className="font-bold">Transaction hash:</span>{" "}
            {txReceipt?.transactionHash}
          </p>
          <p>
            <span className="font-bold">Block number:</span>{" "}
            {txReceipt?.blockNumber}
          </p>
          <p>To see the pig data, visit:</p>
          {waitingForEvent ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5">
                <Spinner />
              </div>
            </div>
          ) : (
            <Link className="underline" href={`/product/${bornTokenId}`}>
              localhost:3000/product/{bornTokenId}
            </Link>
          )}
        </div>
      )}
    </div>
  );

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>🚧 Dev: Birth</title>
      </Head>
      <h2>Give birth to a new pig</h2>

      {isHydrationSafe ? ifHydrationSafe : <p> Loading... </p>}
    </DefaultPaddingXnY>
  );
};
export default birth;
