import Head from 'next/head';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '../styles/globals.css';
import { configStore } from '../state/store';
import { Layout } from '../components';

const { store, persistor } = configStore({});

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
