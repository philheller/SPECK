import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
// web3
import { useAccount, useContractEvent, useContractRead } from "wagmi";
// contract
import MyStringStoreAbi from "../../contracts/MyStringStore.json";
import { useEffect, useState } from "react";

const index = () => {
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    setIsSetup(true);
    console.log(MyStringStoreAbi.networks[1337].address);
  }, []);

  const {
    data: currentStringValue,
    refetch,
    isRefetching,
  } = useContractRead({
    address: MyStringStoreAbi.networks[1337].address as `0x${string}`,
    abi: MyStringStoreAbi.abi,
    functionName: "getMyString",
  });
  const { isConnected } = useAccount();
  useContractEvent({
    address: MyStringStoreAbi.networks[1337].address as `0x${string}`,
    abi: MyStringStoreAbi.abi,
    eventName: "StringSet",
    listener: (node, label, owner) => {
      console.log(node, label, owner);
      refetch();
    },
    chainId: 1337,
  });

  return (
    <DefaultPaddingXnY>
      <h2>Read from contract</h2>
      <h3>How useContractRead works</h3>
      <div className="my-3 inline-block rounded bg-green-800 px-2 py-1 text-gray-100">
        DONE
      </div>
      {isSetup ? (
        isConnected ? (
          <>
            <div>Current string value: {currentStringValue?.toString()}</div>
            {isRefetching && <div>Currently refetching newest value...</div>}
          </>
        ) : (
          <div>Need to connect to wallet...</div>
        )
      ) : (
        "Loading..."
      )}
    </DefaultPaddingXnY>
  );
};
export default index;
