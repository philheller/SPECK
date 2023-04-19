import DefaultPaddingX from "./DefaultPaddingX";

const DefaultPaddingXnY = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <DefaultPaddingX
      className={`mb-6 mt-4 lg:my-6 2xl:my-8 ${className || ""}`}
    >
      {children}
    </DefaultPaddingX>
  );
};
export default DefaultPaddingXnY;
