import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../structures';

export enum UserActions {
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
}

export const login = createAction(UserActions.USER_LOGIN_REQUEST);
export const loginSuccess = createAction(
  UserActions.USER_LOGIN_SUCCESS,
  (payload: IUser) => ({ payload }),
);

export const logOut = createAction(UserActions.USER_LOGOUT_REQUEST);
export const logOutSuccess = createAction(UserActions.USER_LOGOUT_SUCCESS);
