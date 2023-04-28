import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Add by scanning 📷</title>
      </Head>
      <h2>Add w QR-Code</h2>
      <div className="flex h-40 items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">
          <p>Coming soon...</p>
          <p>
            For now, pls use{" "}
            <Link href="id" className="underline">
              the input field 📝
            </Link>
          </p>
        </div>
      </div>
    </DefaultPaddingXnY>
  );
};
export default index;
