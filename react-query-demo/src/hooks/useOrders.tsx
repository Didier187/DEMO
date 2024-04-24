import { useQuery } from "@tanstack/react-query";
import keys from "../key";
import { OrderI } from "../components/Orders";

export default function useOrders() {
  const getOrders = async ():Promise<OrderI[]> => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/orders`
    );
    return response.json();
  };
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: [keys.ORDERS],
    queryFn: getOrders,
    staleTime: 1000,
  });

  return { data, isFetching, isError, isLoading };
}
