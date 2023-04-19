const DefaultPaddingX = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`m-auto w-full max-w-[1440px] px-[calc(5%+0.3rem)] ${className}`}
    >
      {children}
    </div>
  );
};
export default DefaultPaddingX;
