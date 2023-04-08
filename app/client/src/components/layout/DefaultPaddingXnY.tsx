import DefaultPaddingX from "./DefaultPaddingX";

const DefaultPaddingXnY = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <DefaultPaddingX className="my-4 lg:my-6 2xl:my-8">
      {children}
    </DefaultPaddingX>
  );
};
export default DefaultPaddingXnY;
