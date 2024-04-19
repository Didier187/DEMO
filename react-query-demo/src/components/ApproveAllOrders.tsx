import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderI } from "./Orders";

export default function ApproveAllOrders() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:9001/api/orders");
      return response.json();
    },
  });

  const approveOrders = async (id:string) => {
    await fetch(`http://localhost:9001/api/orders/${id}`, {
      method: "PATCH",
    });
  };
  const mutation = useMutation({
    mutationFn: approveOrders,
    mutationKey: ["approveOrders"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    },
    onSettled: async () => {
      console.log("onSettled: after success or error");
    },
  });

  return (
    <div>
      <button
        onClick={async () => {
          data.map((order: OrderI) => {
            mutation.mutateAsync(order.id);
          });
        }}
      >
        Approve All Orders
      </button>
      <p>{mutation.isPending ? "Approving Orders..." : ""}</p>
    </div>
  );
}
