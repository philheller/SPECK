import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import { useEffect, useState } from "react";
// web3
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
// @ts-ignore
import Jdenticon from "react-jdenticon";
import ConnectionStatus from "@/components/User/ConnectionStatusSymbol";

const index = () => {
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    setIsSetup(true);
  }, []);

  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();

  useEffect(() => {
    console.log(`Address: ${address}`);
  }, [address]);

  return (
    <DefaultPaddingXnY>
      <h2>Connect here</h2>
      <h3>Information about page 1</h3>
      <div className="my-3 inline-block rounded bg-green-800 px-2 py-1 text-gray-100">
        DONE
      </div>
      {isSetup ? (
        <div>
          <p>
            Current Chain: {chain?.name} (#{chain?.id})
          </p>
          {chains.map((chain) => (
            <div key={chain.name}>
              {chain.name} (#{chain.id})
            </div>
          ))}
        </div>
      ) : (
        "Loading..."
      )}
      {isSetup ? (
        isConnected ? (
          <>
            <div className="mt-3 flex gap-4">
              <div className="rounded bg-gray-600">
                <ConnectionStatus address={address} />
              </div>
              <div>
                <div>{address}</div>
                <div>Connected to {connector?.name}</div>
              </div>
            </div>
            <button
              className="m-2 rounded bg-gray-900 px-3 py-1 text-gray-100 transition-colors duration-200 hover:bg-gray-950"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </>
        ) : (
          <div>
            <div>
              {connectors.map((connector) => (
                <button
                  className="m-2 rounded bg-gray-900 px-3 py-1 text-gray-100 transition-colors duration-200 hover:bg-gray-950"
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </button>
              ))}

              {error && <div>{error.message}</div>}
            </div>
          </div>
        )
      ) : (
        <div>loading...</div>
      )}
    </DefaultPaddingXnY>
  );
};
export default index;
