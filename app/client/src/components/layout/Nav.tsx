import Link from "next/link";
import DefaultPaddingX from "./DefaultPaddingX";
import { useAccount } from "wagmi";
import UserAvatar from "../user/UserAvatar";

const Nav = ({ className }: { className?: string }) => {
  const { address } = useAccount();
  return (
    <header
      className={`w-100 flex items-center bg-gray-900 bg-opacity-95 backdrop-blur-sm text-sky-100 ${className}`}
    >
      <DefaultPaddingX className="flex justify-between my-0">
        <h1 className="text-xs">
          <UserAvatar address={address} size={32} />
        </h1>
        <nav className="flex items-center">
          <ul className="flex h-full items-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-14">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/connect">
              <li>Connect Wallet</li>
            </Link>
            <Link href="/read-from-contract">
              <li>Read from Contract</li>
            </Link>
            <Link href="/use-contract">
              <li>Use Contract function</li>
            </Link>
          </ul>
        </nav>
      </DefaultPaddingX>
    </header>
  );
};
export default Nav;
