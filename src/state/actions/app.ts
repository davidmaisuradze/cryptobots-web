import { createAction } from '@reduxjs/toolkit';

export enum AppActions {
  APP_SET_ERROR = 'APP_SET_ERROR',
}

export const setAppError = createAction(
  AppActions.APP_SET_ERROR,
  (payload: string) => ({ payload } ),
);
