import { useEffect } from "react";
import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
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

const products = [
  {
    id: 327485,
    name: "Steak",
    date: "2021-01-01",
    description: "This is a product",
    custodian: "Supermarkt Taart",
    enteredOn: "2021-01-01",
    expiringOn: "2021-01-01",
  },
  {
    id: 156354,
    name: "Haxe",
    date: "2021-01-01",
    description: "This is a product",
    custodian: "Lalldi",
    enteredOn: "2021-01-01",
    expiringOn: "2021-01-01",
  },
  {
    id: 215,
    name: "Patty",
    date: "2021-01-01",
    description: "This is a product",
    custodian: "Preal",
    enteredOn: "2021-01-01",
    expiringOn: "2021-01-01",
  },
  {
    id: 123,
    name: "Burger",
    date: "2021-01-01",
    description: "This is a product",
    custodian: "Lidl",
    enteredOn: "2021-01-01",
    expiringOn: "2021-01-01",
  },
  {
    id: 64513,
    name: "Burger",
    date: "2021-01-01",
    description: "This is a product",
    custodian: "Lidl",
    enteredOn: "2021-01-01",
    expiringOn: "2021-01-01",
  },
  {
    id: 282874,
    name: "Burger",
    date: "2021-01-01",
    description: "This is a product",
    custodian: "Lidl",
    enteredOn: "2021-01-01",
    expiringOn: "2021-01-01",
  },
];
export default function Home() {
  const isHydrationSafe = useHydrationsafeCall();
  const { storedValue, removeProduct } = useLocalProductStorage();

  const { data, error, isLoading, isSuccess, refetch } = useContractRead({
    address: SpeckContract.networks[1337].address as `0x${string}`,
    abi: SpeckContract.abi,
    functionName: "getMultipleProductData",
    args: [storedValue.map((product) => product.tokenId)],
    enabled: !!storedValue && !!storedValue.length,
  });

  useEffect(() => {
    console.log(isLoading, data, storedValue);
  }, [data, isLoading, storedValue]);

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
        <section className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="w-full"
            >
              <Card className=" p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] dark:bg-gray-700 dark:shadow-slate-900">
                <h3 className="-mb-1 text-xl">
                  {product.name} #{product.id}
                </h3>
                <h4 className="font-normal">{product.custodian}</h4>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li>
                    <QrCodeIcon className="mr-1 inline-block h-4 w-4" />{" "}
                    {product.enteredOn}
                  </li>
                  <li>
                    <ClockIcon className="mr-1 inline-block h-4 w-4" />{" "}
                    {product.expiringOn}
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
        <h2>🚧 Overview Products (from contracts)</h2>
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
          ) : data ? (
            <section className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 xl:grid-cols-4">
              {
                // @ts-ignore
                // todo add the date of addition when token_id is included in responses
                data.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="w-full"
                  >
                    <Card className=" p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] dark:bg-gray-700 dark:shadow-slate-900">
                      <h3 className="-mb-1 flex flex-nowrap items-center justify-between text-xl">
                        <span>
                          {product.product_type} #{product.id}
                        </span>
                        <button
                          className="w-4 md:w-5"
                          // todo: use tokenId for deletion
                          // onClick={() => removeProduct(product.id)}
                        >
                          <XCircleIcon />
                        </button>
                      </h3>
                      <h4 className="font-normal">{product.custodian}</h4>
                      <ul className="text-gray-600 dark:text-gray-400">
                        <li>
                          <QrCodeIcon className="mr-1 inline-block h-4 w-4" />{" "}
                          {/*  {} */}
                        </li>
                        <li>
                          <ClockIcon className="mr-1 inline-block h-4 w-4" />{" "}
                          {product.timestamp}
                        </li>
                      </ul>
                    </Card>
                  </Link>
                ))
              }
            </section>
          ) : (
            <div>No data</div>
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
