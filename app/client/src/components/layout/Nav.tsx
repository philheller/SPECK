import Link from "next/link";
import DefaultPaddingX from "./DefaultPaddingX";
// web3 connection
import { useAccount } from "wagmi";
import ConnectionStatus from "../User/ConnectionStatusSymbol";
import useHydrationSafeCall from "@/hooks/useHydrationSafeCall";

const Nav = ({ className }: { className?: string }) => {
  const isHydrated = useHydrationSafeCall();
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <header
      className={`w-100 flex items-center bg-gray-900 bg-opacity-95 text-sky-100 backdrop-blur-sm ${className}`}
    >
      <DefaultPaddingX className="my-0 flex justify-between">
        <h1 className="mb-0 flex items-center font-mono text-base font-normal">
          <ConnectionStatus
            address={address}
            isConnecting={isHydrated ? isConnecting : true}
            isError={isDisconnected}
            className="h-8 w-8 p-1"
          />
          <div className="flex min-h-[1.5rem] flex-nowrap items-center rounded-br rounded-tr bg-gray-600 px-2 dark:bg-gray-700">
            {isHydrated ? (
              <>
                {address && (
                  <>
                    <span className="flex h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-2 hidden sm:inline">Connected</span>
                  </>
                )}
                {isConnecting && (
                  <>
                    <span className="flex h-3 w-3 rounded-full bg-blue-600" />
                    <span className="ml-2 hidden sm:inline">Connecting...</span>
                  </>
                )}
                {isDisconnected && (
                  <>
                    <span className="flex h-3 w-3 rounded-full bg-red-500" />
                    <span className="ml-2 hidden sm:inline">Disconnected</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span className="flex h-3 w-3 rounded-full bg-blue-600" />
                <span className="ml-2 hidden sm:inline">Connecting...</span>
              </>
            )}
          </div>
        </h1>
        <nav className="flex items-center">
          <ul className="flex h-full items-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-14">
            <Link href="/">
              <li>My List</li>
            </Link>
            <Link
              className="rounded bg-gray-200 px-2 py-1 font-bold text-gray-800"
              href="/add"
            >
              <li>Add</li>
            </Link>
            {/* 
            <Link href="/read-from-contract">
              <li>Add</li>
            </Link> */}
          </ul>
        </nav>
      </DefaultPaddingX>
    </header>
  );
};
export default Nav;
