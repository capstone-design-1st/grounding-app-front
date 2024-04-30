import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import "./style/global.css";

function App() {
  return (
    <div className="container">
      <div className="content">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
