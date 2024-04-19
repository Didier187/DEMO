import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Orders from "./components/Orders";
import AddOrder from "./components/AddOrder";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>React Query Demo</h1>
        <Header />
        <hr />
        <br />
        <Orders />
        <br />
        <AddOrder />
      </div>
    </QueryClientProvider>
  );
}

export default App;
