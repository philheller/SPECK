import { Product } from "@/interfaces/Product";
import Card from "../Card";
import { intlFormat, parseISO } from "date-fns";
import Link from "next/link";
import { CakeIcon } from "@heroicons/react/24/solid";

const Timeline = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  return (
    <div className={`${className || ""}`}>
      {products.map((product, index) => (
        <div key={product.tokenId} className="flex flex-nowrap gap-4 md:gap-6">
          <div
            className={`relative w-1 bg-gray-500 ${
              index === 0 ? "mt-8 rounded-t-full" : ""
            } ${
              index === products.length - 1
                ? "rounded-b-full bg-gradient-to-b from-gray-500 to-gray-200 dark:to-gray-800"
                : ""
            }`}
          >
            <div
              className={`absolute left-1/2 ${
                index === 0 ? "md:top-2" : "top-8 md:top-10"
              } h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500 ring-[0.5rem] ring-gray-200 dark:ring-gray-800`}
            />
          </div>
          <div className="my-2 flex-1 md:my-4">
            <div className="relative">
              <div className="absolute top-2 h-0 w-0 border-b-[1rem] border-r-[1rem] border-t-[1rem] border-solid border-gray-300 border-b-transparent border-t-transparent dark:border-r-gray-700" />
              <Card className="ml-3 bg-gray-300 p-3 dark:bg-gray-700 md:p-5">
                <header>
                  <h3 className="mb-0">
                    {products.at(-1)?.tokenId == product.tokenId && (
                      <span>
                        <CakeIcon className="mb-2 inline h-5" /> Birth:{" "}
                      </span>
                    )}
                    {product.productType}
                    <div className="inline-block">
                      <span className="ml-2 text-lg font-normal md:text-xl">
                        #{product.tokenId}
                      </span>
                      <span className="relative ml-2 text-sm font-thin md:ml-4 md:text-base">
                        {intlFormat(
                          parseISO(product.timestamp),
                          {
                            day: "2-digit",
                            month: "short",
                          },
                          {
                            locale: "de-DE",
                          }
                        )}
                      </span>
                    </div>
                  </h3>
                  <h4 className="-mt-1.5 text-sm font-light text-gray-600 dark:text-gray-400 md:text-base">
                    <Link
                      href={`/organization/${product.owner}`}
                      className="underline md:hidden"
                    >
                      {product.owner.slice(0, 5)}...{product.owner.slice(-5)}
                    </Link>
                    <Link
                      href={`/organization/${product.owner}`}
                      className="hidden underline md:inline"
                    >
                      {product.owner.slice(0, 6)}...{product.owner.slice(-6)}
                    </Link>{" "}
                    (Custody)
                  </h4>
                </header>
                <main className="flex flex-wrap gap-3 md:gap-5 lg:gap-8">
                  <div className="my-2 flex-1 basis-52">
                    <h5 className="mb-1 text-base font-extrabold md:text-lg">
                      Data
                    </h5>
                    <div className="grid grid-cols-2 [&>*:nth-child(4n-2)]:bg-gray-400 dark:[&>*:nth-child(4n-2)]:bg-gray-800 [&>*:nth-child(4n-3)]:bg-gray-400 dark:[&>*:nth-child(4n-3)]:bg-gray-800">
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        ⚖️ Weight
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.animalWeightInG / 1000} kg
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        💯 Fat
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.fatPercentage} %
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🥬 Food
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.feed}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        💊 Medication
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.medication}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        👀 Slaughter
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.slaughterMethod}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🐽 Gender
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.gender ? "♀️" : "♂️"}
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        🧬 DNA
                      </div>
                      <div className="p-1 px-2 odd:rounded-l odd:font-bold even:justify-stretch even:rounded-r even:text-right">
                        {product.genetics}
                      </div>
                    </div>
                  </div>
                  <div className="my-2 flex flex-1 basis-28 flex-col">
                    <h5 className="mb-1 text-center text-base font-extrabold md:text-lg">
                      Findings
                    </h5>
                    <div className="relative h-full w-full rounded-lg border-2 border-solid border-gray-400 p-4 dark:border-gray-600">
                      {product.findings.length > 0 ? (
                        <div className="max-h-48 overflow-y-auto">
                          {product.findings}
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center dark:text-gray-400">
                          No findings noted
                        </div>
                      )}
                    </div>
                  </div>
                </main>
                <footer></footer>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Timeline;
