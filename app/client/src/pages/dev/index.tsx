import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  return (
    <DefaultPaddingXnY>
      <Head>
        <title>🚧 Dev page</title>
      </Head>
      <h2>This page is for dev purposes</h2>
      <p>
        Any kind of dev stuff is listed here. This page is not part of the final
        product.
      </p>
      <ul className="mt-4">
        <li>
          <Link className="underline" href="/dev/birth">
            Pig birth ✨🐖
          </Link>
        </li>
        <li>
          <Link className="underline" href="/dev/change">
            Change pig properties 🐗
          </Link>
        </li>
        <li>
          <Link className="text-red-600 underline" href="/dev/ownership">
            Change ownership/custody of pig 📃
          </Link>{" "}
          (coming soon)
        </li>
      </ul>
    </DefaultPaddingXnY>
  );
};
export default index;
