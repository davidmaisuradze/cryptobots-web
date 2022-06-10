/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    env: any;
    HIDE_LOGS: boolean;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    store: any;
  }

  const VERSION: string;
}

export {};
