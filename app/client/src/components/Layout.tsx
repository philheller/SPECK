import { Roboto_Flex } from "next/font/google";
import Nav from "./Layout/Nav";
import Footer from "./Layout/Footer";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex min-h-screen flex-col ${roboto.variable} font-sans`}>
      <Nav className="sticky top-0 basis-14" />
      <main className="flex flex-1 flex-col">{children}</main>
      {/* comment footer in if needed */}
      {/* <Footer className="basis-14" /> */}
    </div>
  );
};
export default Layout;
