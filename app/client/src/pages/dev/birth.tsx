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
import ContractJson from "@/contracts/Speck.json";
import { useRandomProduct } from "@/hooks/useRandomProduct";

const exampleTypes = [
  "Schnitzel",
  "Pork",
  "Steak",
  "Bacon",
  "Ham",
  "Sausage",
  "Pork Belly",
  "Pork Chop",
  "Pork Loin",
  "Pork Ribs",
  "Pork Shoulder",
  "Pork Tenderloin",
];

const birth = () => {
  const [bornTokenId, setBornTokenId] = useState("");
  const [toBeBornType, setToBeBornType] = useState(
    exampleTypes.at(Math.floor(Math.random() * 12)) || "Döner"
  );
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  const { randomProduct, recreateRandomProduct } =
    useRandomProduct(toBeBornType);

  const { clearProducts } = useLocalProductStorage();

  const isHydrationSafe = useHydrationSafeCall();
  const { config } = usePrepareContractWrite({
    address: ContractJson.networks[1337].address as `0x${string}`,
    abi: ContractJson.abi,
    functionName: "createNewProduct",
    args: [randomProduct],
    enabled: Boolean(randomProduct),
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
    recreateRandomProduct();
    write?.();
    setWaitingForEvent(true);
  };

  const handleRandomizePig = () => {
    setToBeBornType(exampleTypes.at(Math.floor(Math.random() * 12)) || "Döner");
  };

  const ifHydrationSafe = (
    <div>
      <form className="mb-3" onSubmit={(e) => handleBirth(e)}>
        <div className="mb-3 flex flex-wrap items-center gap-1">
          <Label.Root
            className="mr-3 font-medium md:mr-4"
            htmlFor="productType"
          >
            Product type
          </Label.Root>
          <div className="relative w-full flex-1 basis-52">
            <input
              className="w-full appearance-none rounded-lg bg-gray-300 px-2 py-1 pr-14 outline-none ring-gray-600 ring-offset-gray-200 focus:ring-2 focus:ring-offset-2 dark:bg-gray-900 dark:ring-gray-400 dark:ring-offset-gray-800 md:px-3 md:py-2 md:pr-16"
              type="text"
              id="productType"
              value={toBeBornType}
              placeholder="e.g. Steak"
              onChange={(e) => setToBeBornType(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 md:right-3"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setToBeBornType("");
              }}
            >
              <XCircleIcon className="h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-400 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className={`rounded-md bg-pink-600 px-3 py-2 text-black disabled:bg-gray-400`}
            type="submit"
            disabled={isLoading}
          >
            Give birth ✨
          </button>
          <button
            className={`rounded-md bg-gray-400 px-3 py-2 text-black disabled:bg-gray-400`}
            type="button"
            disabled={isLoading}
            onClick={() => handleRandomizePig()}
          >
            Randomize Pig 👀
          </button>
          <button
            className={`rounded-md bg-amber-600 px-3 py-2 text-black disabled:bg-gray-400`}
            type="button"
            disabled={isLoading}
            onClick={() => clearProducts()}
          >
            Clear Products 🧹
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
          <p>To see the pig data, visit:</p>
          {waitingForEvent ? (
            <div className="flex items-center">
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
