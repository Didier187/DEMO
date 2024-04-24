import ApproveAllOrders from "./ApproveAllOrders";
import { OrderI } from "./Orders";
import useOrders from "../hooks/useOrders";

export default function Header() {
const {data} = useOrders();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <span>
        #orders: {data?.length} 
      </span>
      <span>||</span>
      <span>Live Orders: {data?.filter((o: OrderI) => o.live)?.length} </span>
      <span>||</span>
      <span>
        Not Live Orders: {data?.filter((o: OrderI) => !o.live)?.length}{" "}
      </span>
      <ApproveAllOrders />
    </div>
  );
}
