import "@bable/styles/globals.css";
import Layout from "@bable/components/layouts/Layout";
import { Provider } from "react-redux";
import store from "@bable/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";
// import 'animate.css';

const persister = persistStore(store);

export default function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
     <PersistGate persistor={persister}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </PersistGate>
    </Provider>
  );
}
