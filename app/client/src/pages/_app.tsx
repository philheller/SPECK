import "@/styles/globals.css";
import type { AppProps } from "next/app";
// wagmi
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { hardhat, localhost } from "@wagmi/chains";
// add Layout
import Layout from "../components/Layout";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, hardhat, localhost],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || "" }),
    // infuraProvider({ apiKey: process.env.INFURA_API_KEY || "" }),
    publicProvider(),
  ]
);

const client = createClient({
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: (name) =>
          `Injected (${typeof name === "string" ? name : name.join(", ")})`,
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
  ],
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
}
