import { useState } from "react";
import { useRouter } from "next/router";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
// accessiblity
import * as Label from "@radix-ui/react-label";
import { XCircleIcon } from "@heroicons/react/24/solid";

const index = () => {
  const [toBeAppendedId, setToBeAppendedId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    if (toBeAppendedId === "") return;
    e.preventDefault();
    router.push(`/dev/transfer/${toBeAppendedId}`);
  };

  return (
    <DefaultPaddingXnY>
      <form className="mb-3" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3 flex flex-wrap items-center gap-1">
          <Label.Root
            className="mr-3 font-medium md:mr-4"
            htmlFor="productType"
          >
            Product to be transferred
          </Label.Root>
          <div className="relative w-full flex-1 basis-52">
            <input
              className="w-full appearance-none rounded-lg bg-gray-300 px-2 py-1 pr-14 outline-none ring-gray-600 ring-offset-gray-200 focus:ring-2 focus:ring-offset-2 dark:bg-gray-900 dark:ring-gray-400 dark:ring-offset-gray-800 md:px-3 md:py-2 md:pr-16"
              type="number"
              id="productType"
              value={toBeAppendedId}
              onChange={(e) => setToBeAppendedId(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 md:right-3"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setToBeAppendedId("");
              }}
            >
              <XCircleIcon className="h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-400 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className={`hover: rounded-md bg-gray-900 px-3 py-2 text-gray-100 disabled:bg-gray-400 dark:bg-gray-100 dark:text-gray-900`}
            disabled={toBeAppendedId === ""}
            type="submit"
          >
            Prepare this product for transfer 🤝
          </button>
        </div>
      </form>
    </DefaultPaddingXnY>
  );
};
export default index;
