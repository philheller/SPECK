import { Roboto_Flex } from "next/font/google";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`min-h-screen flex flex-col ${roboto.variable} font-sans`}>
      <Nav className="basis-14 sticky top-0" />
      <main className="flex-1 basis">{children}</main>
      {/* comment footer in if needed */}
      {/* <Footer className="basis-14" /> */}
    </div>
  );
};
export default Layout;
