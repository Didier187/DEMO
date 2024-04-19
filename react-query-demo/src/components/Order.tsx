import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderI } from "./Orders";

const Order = (order: OrderI) => {
  const queryClient = useQueryClient();
  const deleteOrder = async (id: string) => {
    await fetch(`http://localhost:9001/api/orders/${id}`, {
      method: "DELETE",
    });
  };

  const publishOrder = async (id: string) => {
    await fetch(`http://localhost:9001/api/orders/${id}`, {
      method: "PATCH",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteOrder,
    mutationKey: ["deleteOrder"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    // onMutate: async () => {
    //   await queryClient.cancelQueries({ queryKey: ["orders"] });
    //   const previousOrders = queryClient.getQueryData(["orders"]);
    //   queryClient.setQueryData(["orders"], (old: OrderI[]) => {
    //     return old.filter((o: OrderI) => o.id !== order.id);
    //   });
    //   return { previousOrders };
    // },
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    },
    onSettled: async () => {
      //   await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishOrder,
    mutationKey: ["publishOrder"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      //when succeeded, invalidate the query
    },
    onError: (err, variables, context) => {
      console.log("onError: only when there is error", err, variables, context);
    },
    onSettled: async () => {
      console.log("onSettled: after success or error");
    },
  });

  return (
    <li key={order.id}>
      {order.description}
      <br />
      <div>
        <strong
          style={{
            color: order.live ? "green" : "red",
          }}
        >
          {order.live ? "Live" : "Not Live"}
        </strong>
        <br />
        <button
          style={{
            marginRight: "1rem",
            marginLeft: "auto",
          }}
          onClick={async () => mutation.mutate(order.id)}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </button>
        <button onClick={async () => publishMutation.mutate(order.id)}>
          {publishMutation.isPending ? "(un)Publishing..." : "(un)Publish"}
        </button>
      </div>
    </li>
  );
};

export default Order;
