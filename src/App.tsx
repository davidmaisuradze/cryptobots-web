import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Footer } from "./components/layout/Footer";
import { BlockchainProvider } from "./context";
import { MarketRoutes } from "./routes";
import { configStore } from "./state/store";
const { store, persistor } = configStore({});

const App = () => {
  return (
    <BlockchainProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <MarketRoutes />
        <Footer />
      </Provider>
    </BlockchainProvider>
  );
};

export default App;
