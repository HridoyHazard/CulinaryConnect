import React from "react";
import Layout from "./routes/Layout";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
        style={{ width: 250 }}
        position="bottom-left"
        hideProgressBar={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />

      {/* page layout  */}
      <Layout />
    </Provider>
  );
};

export default App;
