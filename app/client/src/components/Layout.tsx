import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={`${roboto.variable} font-sans`}>{children}</div>;
};
export default Layout;
