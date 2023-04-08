import DefaultPaddingXnY from "@/components/layout/DefaultPaddingXnY";
// web3
import { useContractRead } from "wagmi";
// contract
import MyStringStoreAbi from "../../contracts/MyStringStore.json";
import { useEffect, useState } from "react";

const index = () => {
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    setIsSetup(true);
    console.log(MyStringStoreAbi.networks[1337].address);
  }, []);

  const { data: balance, error: balanceError } = useContractRead({
    address: MyStringStoreAbi.networks[1337].address as `0x${string}`,
    abi: MyStringStoreAbi.abi,
    functionName: "getMyString",
  });

  return (
    <DefaultPaddingXnY>
      <h2>Read from contract</h2>
      <h3>How useContractRead works</h3>
      <div className="px-2 py-1 text-gray-100 bg-red-800 rounded my-3 inline-block">
        TODO: fix error wo error msg :'(
      </div>
      {isSetup ? (
        <>
          <div>Balance: {balance?.toString()}</div>
        </>
      ) : (
        "Loading..."
      )}
    </DefaultPaddingXnY>
  );
};
export default index;
