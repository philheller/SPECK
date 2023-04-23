import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
// icons
import { QrCodeIcon, HashtagIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  return (
    <DefaultPaddingXnY className="flex flex-1 flex-col">
      <Head>
        <title>Add product</title>
      </Head>
      <h2 className="mb-4">Add</h2>
      <section className="flex flex-1 flex-col justify-between gap-6 sm:flex-initial sm:flex-row sm:flex-wrap sm:gap-8">
        <Link
          href="/add/id"
          className="flex w-full flex-1 basis-48 flex-col sm:min-h-[20rem] sm:basis-56 lg:min-h-[30rem]"
        >
          <Card className="flex-1 p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] transition-transform duration-150 hover:scale-[101%]  dark:bg-gray-700 dark:shadow-slate-900">
            <h3>Add by ID</h3>
            <div className="flex h-full flex-col items-center justify-center text-gray-600 dark:text-gray-400">
              <HashtagIcon className="h-20 w-20" />
              <p>Enter a 6-digit ID</p>
            </div>
          </Card>
        </Link>
        <Link
          href="/add/qr"
          className="flex w-full flex-1 basis-48 flex-col sm:min-h-[20rem] sm:basis-60 lg:min-h-[30rem]"
        >
          <Card className="flex-1 p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] transition-transform duration-150 hover:scale-[101%] dark:bg-gray-700 dark:shadow-slate-900">
            <h3>Add by scanning</h3>
            <div className="flex h-full flex-col items-center justify-center text-gray-600 dark:text-gray-400">
              <QrCodeIcon className="h-20 w-20" />
              <p>Scan a QR code</p>
            </div>
          </Card>
        </Link>
      </section>
    </DefaultPaddingXnY>
  );
};
export default index;
