import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
// icons
import {
  QrCodeIcon,
  ClockIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
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

  return (
    <DefaultPaddingXnY>
      <Head>
        <title>My List</title>
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
      </article>
    </DefaultPaddingXnY>
  );
}
