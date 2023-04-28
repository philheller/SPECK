import { Product } from "@/interfaces/Product";
import Card from "../Card";

const Timeline = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  return (
    <div className={`${className || ""}`}>
      {products.map((product, index) => (
        <div key={product.tokenId} className="flex flex-nowrap gap-4 md:gap-6">
          <div
            className={`relative w-1 bg-gray-500 ${
              index === 0 ? "mt-8 rounded-t-full" : ""
            } ${
              index === products.length - 1
                ? "rounded-b-full bg-gradient-to-b from-gray-500 to-gray-200 dark:to-gray-800"
                : ""
            }`}
          >
            <div
              className={`absolute left-1/2 ${
                index === 0 ? "top-0" : "top-8"
              } h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500 ring-[0.5rem] ring-gray-200 dark:ring-gray-800`}
            />
          </div>
          <div className="my-2 flex-1">
            <div className="relative">
              <div className="absolute top-2 h-0 w-0 border-b-[1rem] border-r-[1rem] border-t-[1rem] border-solid border-gray-300 border-b-transparent border-t-transparent dark:border-r-gray-700" />
              <Card className="ml-3 bg-gray-300 p-3 shadow-sm shadow-gray-800 dark:bg-gray-700 md:p-5">
                <h3>
                  {product.productType} #{product.tokenId}
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                  blanditiis debitis id asperiores adipisci nihil perspiciatis,
                  nulla cumque est aliquam!
                </p>
                {index === 1 && (
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae hic laudantium in. Reiciendis quod iusto mollitia
                    minima culpa a, quo doloremque cupiditate nam illo
                    asperiores eum quidem porro dolor eligendi?
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Timeline;
