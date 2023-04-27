import { useEffect } from "react";
import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
import { format, intlFormat, isToday, parseISO } from "date-fns";
import { de } from "date-fns/locale";
// icons
import {
  QrCodeIcon,
  ClockIcon,
  PlusCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
// web3
import useHydrationsafeCall from "@/hooks/useHydrationSafeCall";
import { useContractRead } from "wagmi";
import SpeckContract from "@/contracts/Speck.json";
import Spinner from "@/components/Loading/Spinner";
import useLocalProductStorage from "@/hooks/useLocalProductStorage";
import { useTransformProductDatas } from "@/hooks/useTransformContractData";
import { ProductDataSnakeCase } from "@/interfaces/Product";
import { BigNumber } from "ethers";

export default function Home() {
  const isHydrationSafe = useHydrationsafeCall();
  const { storedValue, removeProduct } = useLocalProductStorage();

  const {
    data: rawData,
    error,
    isLoading,
    refetch,
  } = useContractRead({
    address: SpeckContract.networks[1337].address as `0x${string}`,
    abi: SpeckContract.abi,
    functionName: "getMultipleProductData",
    args: [storedValue.map((product) => product.tokenId)],
    enabled: !!storedValue && !storedValue.length,
  });

  useEffect(() => {
    refetch();
  }, [storedValue]);

  const data = useTransformProductDatas(
    rawData as [ProductDataSnakeCase[], BigNumber[], string[]]
  );

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Trace Speck 🐖</title>
        <meta
          name="description"
          content="These are the products I have in my list."
        />
      </Head>
      <article>
        <h2>Overview Products</h2>
        {isHydrationSafe ? (
          isLoading ? (
            <div className="h-10 w-full">
              <div className="w-5">
                <Spinner />
              </div>
            </div>
          ) : error ? (
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
          ) : data && data.length ? (
            <section className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 xl:grid-cols-4">
              {data.map((product) => (
                <Link
                  key={product.tokenId}
                  href={`/product/${product.tokenId}`}
                  className="w-full"
                >
                  <Card className=" p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] dark:bg-gray-700 dark:shadow-slate-900">
                    <h3 className="-mb-1 flex flex-nowrap items-center justify-between text-xl">
                      <span>
                        {product.productType} #{product.tokenId}
                      </span>
                      <button
                        className="w-4 md:w-5"
                        onClick={(e) => {
                          e.preventDefault();
                          removeProduct({ tokenId: product.tokenId });
                        }}
                      >
                        <XCircleIcon />
                      </button>
                    </h3>
                    <h4 className="font-normal">
                      {product.owner.slice(0, 5)}...{product.owner.slice(-5)}
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-400">
                      <li>
                        <QrCodeIcon className="mr-1 inline-block h-4 w-4" />
                        <span className="hidden px-1 md:inline">scanned</span>
                        {isToday(
                          parseISO(
                            storedValue.find(
                              (p) => p.tokenId == product.tokenId
                            )?.date || new Date().toISOString()
                          )
                        ) ? (
                          <span>
                            <span className="pr-1">today,</span>
                            {format(
                              parseISO(
                                storedValue.find(
                                  (p) => p.tokenId == product.tokenId
                                )?.date || new Date().toISOString()
                              ),
                              "HH:mm",
                              {
                                locale: de,
                              }
                            )}
                            h
                          </span>
                        ) : (
                          <span>
                            {intlFormat(
                              parseISO(
                                storedValue.find(
                                  (p) => p.tokenId == product.tokenId
                                )?.date || new Date().toISOString()
                              ),
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                              {
                                locale: "de-DE",
                              }
                            )}
                          </span>
                        )}
                      </li>
                      <li>
                        <ClockIcon className="mr-1 inline-block h-4 w-4" />
                        <span className="px-1">
                          {" "}
                          {intlFormat(
                            parseISO(product.timestamp),
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                            {
                              locale: "de-DE",
                            }
                          )}
                        </span>
                      </li>
                    </ul>
                  </Card>
                </Link>
              ))}
              <Link href="/add" className="w-full self-stretch">
                <Card className="flex h-full items-center justify-center p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] dark:bg-gray-700 dark:shadow-slate-900">
                  <PlusCircleIcon className="h-12 w-12 text-gray-600 dark:text-gray-400" />
                </Card>
              </Link>
            </section>
          ) : (
            <div>
              <div className="flex h-20 w-full items-center justify-center">
                <span className=" flex flex-nowrap text-gray-600 dark:text-gray-400">
                  <ExclamationCircleIcon className="mr-1 w-4 sm:w-5 md:mr-2" />
                  No data
                </span>
              </div>
              <div className="mt-8 flex items-center justify-center md:mt-12">
                Add a product to get started:
                <Link href="/add" className="ml-1 underline md:ml-2">
                  Add a product
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="h-10 w-full">
            <div className="w-5">
              <Spinner />
            </div>
          </div>
        )}
      </article>
    </DefaultPaddingXnY>
  );
}
