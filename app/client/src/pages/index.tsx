import DefaultPaddingXnY from "@/components/layout/DefaultPaddingXnY";
import UserCard from "@/components/user/UserCard";
import Head from "next/head";

export default function Home() {
  return (
    <DefaultPaddingXnY>
      <Head>
        <title>Home page</title>
        <meta
          name="description"
          content="This description tag should be descriptive."
        />
      </Head>
      <article>
        <h2>Home Page</h2>
        <section>
          <h3>Core components</h3>
          <p>
            This is a basic structure for any eth project. Here are the core
            components used:
          </p>
          <ul>
            <li>
              <a
                className="my-1 text-gray-600 underline dark:text-gray-400"
                href="https://nextjs.org/"
                target="_blank"
              >
                Next.js
              </a>
            </li>
            <li>
              <a
                className="my-1 text-gray-600 underline dark:text-gray-400"
                href="https://www.typescriptlang.org/"
                target="_blank"
              >
                Typescript
              </a>
            </li>
            <li>
              <a
                className="my-1 text-gray-600 underline dark:text-gray-400"
                href="https://tailwindcss.com/"
                target="_blank"
              >
                Tailwind CSS
              </a>
            </li>
            <li>
              <a
                className="my-1 text-gray-600 underline dark:text-gray-400"
                href="https://wagmi.sh/"
                target="_blank"
              >
                Wagmi
              </a>
            </li>
            <li>
              <a
                className="my-1 text-gray-600 underline dark:text-gray-400"
                href="https://docs.ethers.org/v5/"
                target="_blank"
              >
                EthersJs (v5)
              </a>{" "}
              (comes with Wagmi)
            </li>
          </ul>
          <div className="mt-3 inline-block rounded-lg bg-gray-300 dark:bg-gray-700">
            <UserCard />
          </div>
        </section>
      </article>
    </DefaultPaddingXnY>
  );
}
