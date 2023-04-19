const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`rounded ${className}`}>{children}</div>;
};
export default Card;
