import './App.css';
import GetRouter from "./tool/router";
import RouteGuard from "./tool/routeGuard";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <RouteGuard>
          <GetRouter />
        </RouteGuard>
      </BrowserRouter>
    </div>
  );
}

export default App;
