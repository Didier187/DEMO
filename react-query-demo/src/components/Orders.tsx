import Order from "./Order";
import useOrders from "../hooks/useOrders";
import { useAutoAnimate } from '@formkit/auto-animate/react'
export interface OrderI {
  id: string;
  description: string;
  userId: number;
  live: boolean;
}

export default function Orders() {
  const [parent] = useAutoAnimate()
  const { data, isError, isLoading } = useOrders();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div>
      Orders
      <br />
      <ul ref={parent}>
        {data?.map((order: OrderI) => (
          <Order key={order.id} {...order} />
        ))}
      </ul>
    </div>
  );
}


