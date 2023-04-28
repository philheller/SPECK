import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Spinner from "@/components/Loading/Spinner";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import FullProductCard from "@/components/Product/FullProductCard";
// accessiblity
import * as Label from "@radix-ui/react-label";
// web3
import {
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";
import SpeckContract from "@/contracts/Speck.json";
import { useRandomProduct } from "@/hooks/useRandomProduct";
import { useTransformProductData } from "@/hooks/useTransformContractData";
// types
import type { ProductDataSnakeCase } from "@/interfaces/Product";
import type { BigNumber } from "ethers";
import useLocalProductStorage from "@/hooks/useLocalProductStorage";
import Link from "next/link";

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

const changes = () => {
  const router = useRouter();
  const { id } = router.query;

  const isHydrationSafe = useHydrationSafeCall();

  const [bornTokenId, setBornTokenId] = useState("");
  const [toBeBornType, setToBeBornType] = useState(
    exampleTypes.at(Math.floor(Math.random() * 12)) || "Döner"
  );
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  const { randomProduct, recreateRandomProduct } =
    useRandomProduct(toBeBornType);

  const {
    data: rawData,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useContractRead({
    address: SpeckContract.networks[1337].address as `0x${string}`,
    abi: SpeckContract.abi,
    functionName: "getProductData",
    args: [id?.toString()],
    enabled: !!id,
  });

  const previousProduct = useTransformProductData(
    rawData as [ProductDataSnakeCase, BigNumber, string] | null
  );

  useEffect(() => {
    console.log("Previous product:", previousProduct);
  }, [previousProduct]);

  const { config } = usePrepareContractWrite({
    address: SpeckContract.networks[1337].address as `0x${string}`,
    abi: SpeckContract.abi,
    functionName: "createNewProduct",
    args: [
      {
        ...randomProduct,
        previous_product: parseInt(id ? id?.toString() : "0") || 0,
      },
    ],
    enabled: Boolean(!!randomProduct && !!id),
  });
  const { write, data } = useContractWrite(config);
  const {
    isLoading: isLoadingReceipt,
    isSuccess: isSuccessReceipt,
    error: errorReceipt,
    isError: isErrorReceipt,
    data: txReceipt,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  useContractEvent({
    address: SpeckContract.networks[1337].address as `0x${string}`,
    abi: SpeckContract.abi,
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

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    write?.();
    recreateRandomProduct();
    setWaitingForEvent(true);
  };

  const handleRandomizePig = () => {
    setToBeBornType(exampleTypes.at(Math.floor(Math.random() * 12)) || "Döner");
  };

  useEffect(() => {
    console.log("This is the page id:", id);
  }, [id]);

  useEffect(() => {
    if (randomProduct)
      console.log("new product:", {
        ...randomProduct,
        previous_product: id,
      });
  }, [randomProduct, id]);

  const contractRender = (
    <div>
      {isLoading && (
        <div className="flex justify-center">
          <div className="w-4 md:w-5">
            <Spinner />
          </div>
        </div>
      )}
      {isSuccess && previousProduct && (
        <div>
          <section>
            <h3>Product #{previousProduct.tokenId}'s last entry:</h3>
            <FullProductCard product={previousProduct} />
          </section>
          <section className="mt-4 md:mt-6">
            <h3>Keep processing product</h3>
            <form className="mb-3" onSubmit={(e) => handleAddProduct(e)}>
              <div className="mb-3 flex flex-wrap items-center gap-1">
                <Label.Root
                  className="mr-3 font-medium md:mr-4"
                  htmlFor="productType"
                >
                  Next Product type
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
                  Add product step ⚒️
                </button>
                <button
                  className={`rounded-md bg-gray-400 px-3 py-2 text-black disabled:bg-gray-400`}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRandomizePig()}
                >
                  Randomize next product 👀
                </button>
              </div>
            </form>
            {isLoadingReceipt && (
              <div className="mt-4 w-4 md:w-5">
                <Spinner />
              </div>
            )}
            {isErrorReceipt && (
              <p className="mt-4"> Error: {error?.message} </p>
            )}
            {isSuccessReceipt && (
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
          </section>
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
    </div>
  );

  return (
    <DefaultPaddingXnY>
      <h2>Add to product chain</h2>
      {isHydrationSafe ? (
        contractRender
      ) : (
        <div className="flex justify-center">
          <Spinner className="w-4 md:w-5" />
        </div>
      )}
    </DefaultPaddingXnY>
  );
};
export default changes;
