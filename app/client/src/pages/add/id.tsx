import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import useLocalProductStorage from "@/hooks/useLocalProductStorage";
import FullProductCard from "@/components/Product/FullProductCard";
// accessiblity
import * as Label from "@radix-ui/react-label";
// web3
import useHydrationsafeCall from "@/hooks/useHydrationSafeCall";
import { useContractRead } from "wagmi";
import SpeckContract from "@/contracts/Speck.json";
import Spinner from "@/components/Loading/Spinner";
import { Product, ProductDataSnakeCase } from "@/interfaces/Product";
import { useTransformProductData } from "@/hooks/useTransformContractData";
import { BigNumber } from "ethers";

const index = () => {
  const isHydrationSafe = useHydrationsafeCall();
  const [id, setId] = useState("");

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

  const handleSubmitId = (e: any) => {
    e.preventDefault();
    refetch();
  };

  const { storedValue, clearProducts } = useLocalProductStorage();

  const data = useTransformProductData(
    rawData as [ProductDataSnakeCase, BigNumber, string] | null
  );

  useEffect(() => {
    console.log("detected data: ", data);
  }, [data]);

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Add by id 🪪</title>
      </Head>
      <h2>Add by ID</h2>
      <form onSubmit={(e) => handleSubmitId(e)}>
        <div className="flex flex-wrap items-center gap-1">
          <Label.Root className="mr-3 font-medium md:mr-4" htmlFor="productId">
            Product ID
          </Label.Root>
          <div className="relative w-full flex-1 basis-52">
            <input
              className="w-full appearance-none rounded-lg bg-gray-300 px-2 py-1 pr-14 outline-none ring-gray-600 ring-offset-gray-200 focus:ring-2 focus:ring-offset-2 dark:bg-gray-900 dark:ring-gray-400 dark:ring-offset-gray-800 md:px-3 md:py-2 md:pr-16"
              type="number"
              id="productId"
              value={id}
              placeholder="Enter product #ID"
              onChange={(e) => setId(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-8 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 md:right-9"
              onClick={(e) => {
                e.preventDefault();
                setId("");
              }}
            >
              <XCircleIcon className="h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-400 md:h-6 md:w-6" />
            </button>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 md:right-3"
              onClick={(e) => handleSubmitId(e)}
            >
              <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-400 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </form>
      {/* <div className="my-3 text-gray-600 dark:text-gray-400">
        // todo delete
        <div>
          Currently tracking:
          {isHydrationSafe ? (
            <span className="px-1 md:px-2">{storedValue.length}</span>
          ) : (
            <span className="inline-block w-3 px-1 md:w-4 md:px-2">
              <Spinner />
            </span>
          )}
          products
        </div>
        <button
          className={`mt-2 rounded-md bg-amber-600 px-3 py-2 text-black disabled:bg-gray-400`}
          type="button"
          disabled={isLoading}
          onClick={() => clearProducts()}
        >
          Clear Products 🧹
        </button>
      </div> */}
      {isHydrationSafe && (
        <section className="mt-6">
          <h3>
            Results
            {isLoading && (
              <span className="ml-2 inline-block w-4 md:ml-3">
                <Spinner />
              </span>
            )}
          </h3>
          <div>
            {!data ? (
              <div className="flex h-24 flex-col items-center justify-center">
                <p className="italic text-gray-500 dark:text-gray-500">
                  No data
                </p>
                <p className="italic text-gray-500 dark:text-gray-500">
                  Enter your product ID and hit
                  <kbd className="mx-2 rounded-lg border border-gray-600 bg-gray-500 px-1 py-0.5 text-xs font-semibold not-italic text-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 md:text-sm">
                    Enter
                  </kbd>
                </p>
              </div>
            ) : (
              <FullProductCard product={data as Product} className="" />
              // <Card className="bg-gray-300 p-3 shadow-md dark:bg-gray-700 md:p-5">
              //   <h3 className="flex justify-between">
              //     <span>This is a card</span>
              //     <button
              //       className={` ${
              //         // @ts-ignore
              //         storedValue.some((product) => product.tokenId == id)
              //           ? "text-gray-900 dark:text-gray-100"
              //           : "text-gray-500 dark:text-gray-500"
              //       }`}
              //       onClick={
              //         // @ts-ignore
              //         (e) => handleBookmarkProduct(e, id)
              //       }
              //     >
              //       <BookmarkIcon className="w-4 md:w-5" />
              //     </button>
              //   </h3>
              //   <p>This card will show details of the product</p>
              //   {/* {
              //     // todo this will be changed to object eventually
              //     data.map((product) => {
              //       return (
              //         <div key={product.id}>
              //         <p>{product.id}</p>
              //         <p>{product.name}</p>
              //         <p>{product.description}</p>
              //         <p>{product.price}</p>
              //         <p>{product.image}</p>
              //         <p>{product.owner}</p>
              //         </div>
              //         );
              //       })
              //   } */}
              // </Card>
            )}
          </div>
        </section>
      )}
    </DefaultPaddingXnY>
  );
};
export default index;
