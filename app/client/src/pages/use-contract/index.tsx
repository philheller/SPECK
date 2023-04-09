import DefaultPaddingXnY from "@/components/layout/DefaultPaddingXnY";
import { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import StringStore from "../../contracts/MyStringStore.json";

const index = () => {
  const [stringValue, setStringValue] = useState("");
  const { config } = usePrepareContractWrite({
    address: StringStore.networks[1337].address as `0x${string}`,
    abi: StringStore.abi,
    functionName: "set",
    args: [stringValue],
    enabled: Boolean(stringValue),
  });
  const { write, data } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
    error,
    isError,
    data: txReceipt,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <DefaultPaddingXnY>
      <h2>Use contract</h2>
      <h3>Demo of wagmi & useContract</h3>
      <div className="my-3 inline-block rounded bg-orange-600 px-2 py-1 text-gray-900">
        Not debounced
      </div>
      <div>
        <p>
          Be aware, that not debouncing mean that all new input will be checked
          and immediately sent to the contract even if the button for sending
          the contents is not pressed. To avoid rate limiting and spamming
          endpoints, take a look at tools such as:
        </p>
        <ul className="mb-3 mt-2">
          <li className="my-1 list-inside list-disc">
            <a
              target="_blank"
              className="text-gray-600 underline dark:text-gray-400"
              href="https://usehooks-ts.com/react-hook/use-debounce"
            >
              useDebounce Hook
            </a>
            , lightweight for debouncing queries
          </li>
          <li className="my-1 list-inside list-disc">
            <a
              target="_blank"
              className="text-gray-600 underline dark:text-gray-400"
              href="https://tanstack.com/query/v3/docs/react/overview"
            >
              React query
            </a>
            , more advanced functionalities around data fetching
          </li>
        </ul>
      </div>
      <div>
        <p className="mb-4">
          You have the option to set a string to the contract from below.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            write?.();
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center">
            <label htmlFor="newString" className="mr-5 ">
              New String
            </label>
            <input
              type="text"
              id="newString"
              className="block-inline rounded px-2 py-1 text-gray-800"
              value={stringValue}
              onChange={(e) => setStringValue(e.target.value)}
            />
          </div>
          <button
            disabled={!write}
            className="self-center rounded bg-green-700 px-6 py-2 font-bold text-white transition-colors duration-300 disabled:bg-gray-700 dark:text-white"
          >
            {isLoading ? "loading..." : "Set new string"}
          </button>
          <div>
            {isSuccess && (
              <div
                className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  Transaction hash: {data?.hash}
                </span>
                <div>
                  <h4>TX receipt:</h4>
                  <div>{JSON.stringify(txReceipt)}</div>
                </div>
              </div>
            )}
            {isError && (
              <div
                className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error?.message}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </DefaultPaddingXnY>
  );
};
export default index;
