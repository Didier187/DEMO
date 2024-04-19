import { useQuery } from "@tanstack/react-query";
import Order from "./Order";

export interface OrderI {
  id: string;
  description: string;
  userId: number;
  live: boolean;
}

export default function Orders() {
  const getOrders = async () => {
    const response = await fetch("http://localhost:9001/api/orders");
    return response.json();
  };
  const { data, status, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }
  return (
    <div>
      Orders
      <br />
      {isFetching ? <span>...refreshing...</span> : <span></span>}
      <ul>
        {data.map((order: OrderI) => (
          <Order key={order.id} {...order} />
        ))}
      </ul>
    </div>
  );
}
