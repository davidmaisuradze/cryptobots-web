import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { configStore } from '../state/store';
import { BaseLayout } from '../components/UI';

const { store, persistor } = configStore({});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </PersistGate>
      </Provider>
  );
}

export default MyApp
