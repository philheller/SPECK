import DefaultPaddingXnY from "@/components/layout/DefaultPaddingXnY";
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
      <div className="px-2 py-1 text-gray-100 bg-green-800 rounded my-3 inline-block">
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
            <div className="flex gap-4 mt-3">
              <div className="bg-gray-600 rounded">
                <Jdenticon size="48" value={address} />
              </div>
              <div>
                <div>{address}</div>
                <div>Connected to {connector?.name}</div>
              </div>
            </div>
            <button
              className="px-3 py-1 m-2 bg-gray-900 text-gray-100 rounded hover:bg-gray-950 transition-colors duration-200"
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
                  className="px-3 py-1 m-2 bg-gray-900 text-gray-100 rounded hover:bg-gray-950 transition-colors duration-200"
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
