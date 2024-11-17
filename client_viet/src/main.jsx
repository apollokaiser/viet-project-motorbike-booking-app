import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import Router from "./router/Router";
import { Provider } from 'react-redux'
import store from "./redux/store";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <Router/>
    </Provider>
  </GoogleOAuthProvider>
);
