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
          <Link className="underline" href="/dev/connect">
            Connect Wallet 💸
          </Link>
        </li>
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
          <Link className="underline" href="/dev/transfer">
            Change ownership/custody of pig 🤝📃
          </Link>
        </li>
        <li>
          <Link className="underline" href="/dev/register">
            Request registration 📃
          </Link>
        </li>
        <li>
          <Link
            className="text-red-500 underline"
            href="/organization/requests"
          >
            Accept registration requests 📃 (coming soon)
          </Link>
        </li>
      </ul>
    </DefaultPaddingXnY>
  );
};
export default index;
