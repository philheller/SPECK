import DefaultPaddingXnY from "@/components/layout/DefaultPaddingXnY";
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
                className="my-1 text-gray-400 underline"
                href="https://nextjs.org/"
                target="_blank"
              >
                Next.js
              </a>
            </li>
            <li>
              <a
                className="my-1 text-gray-400 underline"
                href="https://www.typescriptlang.org/"
                target="_blank"
              >
                Typescript
              </a>
            </li>
            <li>
              <a
                className="my-1 text-gray-400 underline"
                href="https://tailwindcss.com/"
                target="_blank"
              >
                Tailwind CSS
              </a>
            </li>
          </ul>
        </section>
      </article>
    </DefaultPaddingXnY>
  );
}
