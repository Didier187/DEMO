import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function AddOrder() {
  const queryClient = useQueryClient();
  const addOrder = async () => {
    await fetch("http://localhost:9001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description:
          "Luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est. Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti.",
        userId: 1,
        live: false,
        id: Math.random().toString(36).substring(7),
      }),
    });
  };
  const mutation = useMutation({
    mutationFn: addOrder,
    mutationKey: ["addOrder"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context);
    }
  });

  return (
    <button
      onClick={async () => {
        await mutation.mutateAsync();
      }}
    >
      {mutation.isPending ? "Adding Order..." : "Add Order"}
    </button>
  );
}
