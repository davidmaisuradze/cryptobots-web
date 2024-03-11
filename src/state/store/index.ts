import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistCombineReducers, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';
import rootSaga from '../sagas';
import { IRootState } from '../../structures';

declare module 'redux' {
  export interface Store {
    sagaTask: any
  }
}

const rootReducer = persistCombineReducers<IRootState>(
  {
    key: 'rrsb',
    stateReconciler: autoMergeLevel2,
    storage,
    blacklist: ['alerts'],
    timeout: 0,
  },
  reducers,
);

const USE_DEV_TOOLS = process.env.NODE_ENV !== 'production';

export const configStore = (context: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {},
    middleware: [sagaMiddleware],
    devTools: USE_DEV_TOOLS,
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};
