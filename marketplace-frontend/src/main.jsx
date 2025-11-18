import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./utils/axiosConfig";
import { setupAxiosInterceptors } from "./utils/axiosConfig";

const initialToken = localStorage.getItem("token");
setupAxiosInterceptors(initialToken);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
