import Card from "@/components/Card";
import DefaultPaddingXnY from "@/components/Layout/DefaultPaddingXnY";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  // todo change this to be a timeline and not necessarily card-like (no wrap)

  // todo head

  const products = [
    {
      id: 1,
      name: "Product 1",
      date: "2021-01-01",
      description: "This is a product",
      custodian: "Custodian 1",
      enteredOn: "2021-01-01",
      expiringOn: "2021-01-01",
    },
    {
      id: 2,
      name: "Product 2",
      date: "2021-01-01",
      description: "This is a product",
      custodian: "Custodian 1",
      enteredOn: "2021-01-01",
      expiringOn: "2021-01-01",
    },
    {
      id: 3,
      name: "Product 3",
      date: "2021-01-01",
      description: "This is a product",
      custodian: "Custodian 1",
      enteredOn: "2021-01-01",
      expiringOn: "2021-01-01",
    },
  ];
  return (
    <DefaultPaddingXnY>
      <h2>Product #{id}</h2>
      <section className="flex flex-col gap-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="w-full p-4 shadow-[0.2rem_0.2rem_2rem_rgba(0,0,0,0.15),_0.1rem_0.1rem_0.4rem_rgba(0,0,0,0.2)] dark:bg-gray-700 dark:shadow-slate-900"
          >
            <h3 className="relative">
              {product.name}
              <span className="relative ml-6 text-sm font-extralight before:absolute before:-left-3 before:top-1/2 before:inline-block before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-['']">
                {product.date}
              </span>
            </h3>
          </Card>
        ))}
      </section>
    </DefaultPaddingXnY>
  );
};
export default index;
