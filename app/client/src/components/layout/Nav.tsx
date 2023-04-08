import Link from "next/link";
import DefaultPaddingX from "./DefaultPaddingX";

const Nav = ({ className }: { className?: string }) => {
  return (
    <header
      className={`w-100 flex items-center bg-gray-900 bg-opacity-95 backdrop-blur-sm text-sky-100 ${className}`}
    >
      <DefaultPaddingX className="flex justify-between my-0">
        <h1>Title</h1>
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
