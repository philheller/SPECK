// @ts-ignore
import Jdenticon from "react-jdenticon";

const UserAvatar = ({
  address,
  size,
}: {
  address?: `0x${string}`;
  size?: number;
}) => {
  return (
    <div className={`bg-gray-400 dark:bg-gray-600 rounded`}>
      <div className={`${address ? "" : "blur-[2px]"}`}>
        <Jdenticon size={(size || 48).toString()} value={address || "?"} />
      </div>
    </div>
  );
};
export default UserAvatar;
