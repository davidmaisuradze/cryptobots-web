import app, { appState } from './app';
import market, { marketState } from './market';
import user, { userState } from './user';

export const initialState = {
  app: appState,
  market: marketState,
  user: userState,
};

export default {
  ...app,
  ...market,
  ...user,
};
