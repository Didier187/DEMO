import useOrderMutation from "../hooks/useOrderMutation";
export default function AddOrder() {
  const mutation = useOrderMutation();
  console.log(mutation);

  return (
    <button
      onClick={async () => {
        await mutation.mutateAsync({
          description: "New Order",
          status: "New",
          live: false,
          id: Math.random().toString(),
        });
      }}
    >
      Add Order
    </button>
  );
}
