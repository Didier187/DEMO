import { OrderI } from "./Orders";
import useOrders from "../hooks/useOrders";
import useToggleOrderStatus from "../hooks/useToggleOrderStatus";

export default function ApproveAllOrders() {
  const { data } = useOrders();
  const mutation = useToggleOrderStatus();

  return (
    <div>
      <button
        onClick={async () => {
          if (!data) return;
        data.map(async(order: OrderI) => {
           await mutation.mutateAsync(order.id);
          });
        }}
      >
        Approve All Orders
      </button>
    </div>
  );
}
