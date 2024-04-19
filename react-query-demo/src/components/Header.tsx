import ApproveAllOrders from "./ApproveAllOrders";
import { useQuery } from "@tanstack/react-query";
import { OrderI } from "./Orders";

export default function Header() {
  const { data, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:9001/api/orders");
      return response.json();
    },
  });

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
        #orders: {data?.length} {isFetching ? "!" : "-"}
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
