import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./style/global.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="content">
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
