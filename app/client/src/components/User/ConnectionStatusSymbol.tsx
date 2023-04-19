// @ts-ignore
import Spinner from "../Loading/Spinner";
// svg
import { LinkIcon, XCircleIcon } from "@heroicons/react/24/solid";

const ConnectionStatus = ({
  address,
  isConnecting,
  isError,
  className,
}: {
  address?: `0x${string}`;
  isConnecting?: boolean;
  isError?: boolean;
  className?: string;
}) => {
  return (
    <div className={`rounded bg-gray-500 dark:bg-gray-600 ${className || ""}`}>
      {isError ? (
        <div>
          <XCircleIcon />
        </div>
      ) : isConnecting ? (
        <div>
          <Spinner />
        </div>
      ) : address ? (
        <div>
          <LinkIcon />
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default ConnectionStatus;
