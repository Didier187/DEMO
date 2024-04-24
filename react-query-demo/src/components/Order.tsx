import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderI } from "./Orders";
import keys from "../key";
const Order = (order: OrderI) => {
  const queryClient = useQueryClient();
  const deleteOrder = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`, {
      method: "DELETE",
    });
  };

  const publishOrder = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`, {
      method: "PATCH",
    });
  };

  const mutation = useMutation({
    mutationFn: deleteOrder,
    mutationKey: [keys.DELETE_ORDER],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.ORDERS] });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [keys.ORDERS] });
      const previousOrders = queryClient.getQueryData([keys.ORDERS]);
      queryClient.setQueryData([keys.ORDERS], (old: OrderI[]) => {
        return old.filter((o: OrderI) => o.id !== order.id);
      });
      return { previousOrders };
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    },
    onSettled: async () => {
      //   await queryClient.invalidateQueries({ queryKey: [keys.ORDERS] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishOrder,
    mutationKey: [keys.PUBLISH_ORDER],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.ORDERS] });
      //when succeeded, invalidate the query
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [keys.ORDERS] });
      const previousOrders = queryClient.getQueryData([keys.ORDERS]);
      queryClient.setQueryData([keys.ORDERS], (old: OrderI[]) => {
        return old.map((o: OrderI) => {
          if (o.id === order.id) {
            return {
              ...o,
              live: !o.live,
            };
          }
          return o;
        });
      });
      return { previousOrders };
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
          Delete
        </button>
        <button onClick={async () => publishMutation.mutate(order.id)}>
          Publish
        </button>
      </div>
    </li>
  );
};

export default Order;
