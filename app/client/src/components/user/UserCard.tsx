// web3
import { useAccount } from "wagmi";
import UserAvatar from "./UserAvatar";

const UserCard = () => {
  const { address, connector, isConnected } = useAccount();

  return (
    <div className="flex gap-4 p-2">
      <UserAvatar address={address} />
      <div>
        <div>
          {address
            ? address?.slice(0, 8) + "..." + address?.slice(-9, -1)
            : "Not connected"}
        </div>

        {isConnected && <div>Connected to {connector?.name || "None"}</div>}
      </div>
    </div>
  );
};
export default UserCard;
