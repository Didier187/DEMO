import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "../key";
interface OrderI {
  description: string;
  status: string;
  live: boolean;
  id: string;
}
const useOrderMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newOrder: OrderI) =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      }),
    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({ queryKey: [keys.ORDERS] });
      const previousOrders = queryClient.getQueryData([keys.ORDERS]);
      queryClient.setQueryData([keys.ORDERS], (old: Array<OrderI>) => {
        return [...old, newOrder];
      });
      return { previousOrders };
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.ORDERS] });
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    },
  });
  return mutation;
};

export default useOrderMutation;
