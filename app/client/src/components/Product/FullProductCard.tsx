import type { Product } from "@/interfaces/Product";
import Card from "../Card";
import { useEffect } from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import useLocalProductStorage from "@/hooks/useLocalProductStorage";
import { format, intlFormat, parseISO } from "date-fns";
import Link from "next/link";

const FullProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { storedValue, toggleProduct } = useLocalProductStorage();

  const handleBookmarkProduct = (e: any, tokenId: number) => {
    e.preventDefault();

    console.log("Attempting to toggle", tokenId);

    toggleProduct({ tokenId, date: new Date().toISOString() });
  };

  return (
    <Card
      className={`bg-gray-300 p-3 dark:bg-gray-700 md:p-5 ${className || ""}`}
    >
      <header>
        <h3 className="mb-0 flex justify-between md:mb-2">
          <div className="flex items-end">
            <span>
              {product.productType} #{product.tokenId}
            </span>
            <span className="relative hidden text-base font-extralight text-gray-600 dark:text-gray-400 md:inline-block">
              <span className="relative inline-block -translate-y-1.5 px-3">
                .
              </span>
              last updated:{" "}
              {intlFormat(
                parseISO(product.timestamp),
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                },
                {
                  locale: "de",
                }
              )}
            </span>
          </div>
          <button
            className={` ${
              // @ts-ignore
              storedValue.some((prod) => prod.tokenId == product.tokenId)
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-500"
            }`}
            onClick={
              // @ts-ignore
              (e) => handleBookmarkProduct(e, product.tokenId)
            }
          >
            <BookmarkIcon className="w-4 md:w-5" />
          </button>
        </h3>
        <div className="inline-block -translate-y-0.5 text-sm font-extralight text-gray-600 dark:text-gray-400 md:hidden">
          last updated:{" "}
          {intlFormat(
            parseISO(product.timestamp),
            {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            },
            {
              locale: "de",
            }
          )}
        </div>
      </header>
      <main className="my-5 md:my-8">
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-3">
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Weight
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.animalWeightInG / 1000}kg
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Fat
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.fatPercentage}%
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Gender
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.gender > 0 ? "female" : "male"}
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Slaughter method
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.slaughterMethod}
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Food
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.feed}
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Medication
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.medication}
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            Owner
          </div>
          <div className="odd:font-bold even:justify-self-end md:even:justify-self-auto">
            {product.owner.slice(0, 5)}...{product.owner.slice(-5)}
          </div>
        </div>
        {product.findings && (
          <div className="mt-6 md:mt-10">
            <span className="block font-extrabold">Findings:</span>
            {product.findings}
          </div>
        )}
      </main>
      <footer className="flex justify-center pb-2 pt-4">
        <Link
          href={`/product/${product.tokenId}`}
          className="rounded bg-gray-800 px-2 py-1 font-bold text-gray-100 shadow-md dark:bg-gray-200 dark:text-gray-900"
        >
          Full history
        </Link>
      </footer>
    </Card>
  );
};
export default FullProductCard;
