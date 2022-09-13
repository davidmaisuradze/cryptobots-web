import { createReducer } from '@reduxjs/toolkit';
import { IAppState } from '../../structures';
import { setAppError } from './../actions';

export const appState: IAppState = {
  errorMessage: '',
};

export default {
  app: createReducer<IAppState>(appState, (builder) => {
    builder
      .addCase(setAppError, (state, { payload }) => ({
        ...state,
        errorMessage: payload,
      }));
  }),
};
