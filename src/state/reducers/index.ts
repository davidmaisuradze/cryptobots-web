import app, { appState } from './app';
import user, { userState } from './user';

export const initialState = {
  app: appState,
  user: userState,
};

export default {
  ...app,
  ...user,
};
