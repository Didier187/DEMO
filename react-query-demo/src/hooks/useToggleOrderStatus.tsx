import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "../key";
import { OrderI } from "../components/Orders";
export default function useApproveAllOrdersMutation() {
  const queryClient = useQueryClient();
  const approveOrders = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`, {
      method: "PATCH",
    });
  };
  const mutation = useMutation({
    mutationFn: approveOrders,
    mutationKey: [keys.APPROVE_ORDERS],
    onMutate: async (id:string) => {
      await queryClient.cancelQueries({ queryKey: [keys.ORDERS] });
      const previousOrders = queryClient.getQueryData([keys.ORDERS]);
      queryClient.setQueryData([keys.ORDERS], (old: Array<OrderI>) => {
        return old.map((order: OrderI) => {
            if (order.id === id) {
                return { ...order, live: !order.live };
            } else {
                return order;
            }
        });
      });
      return { previousOrders };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.ORDERS] });
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    },
    onSettled: async () => {
      console.log("onSettled: after success or error");
    },
  });
  return mutation;
}
