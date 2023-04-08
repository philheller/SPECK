const DefaultPaddingX = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`w-full max-w-[1440px] px-[calc(5%+0.3rem)] m-auto ${className}`}
    >
      {children}
    </div>
  );
};
export default DefaultPaddingX;
