import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../structures';
import { IUserLoginDto, IUserRegisterDto } from '../../services/user.service';

export enum UserActions {
  GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',

  USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',

  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',

  USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
}

export const getProfileAction = createAction(UserActions.GET_PROFILE_REQUEST);
export const getProfileSuccessAction = createAction(UserActions.GET_PROFILE_SUCCESS, (payload: IUser) => ({ payload }));

export const registerAction = createAction(UserActions.USER_REGISTER_REQUEST, (payload: IUserRegisterDto) => ({ payload }));
export const registerSuccessAction = createAction(UserActions.USER_REGISTER_SUCCESS, (payload: IUser) => ({ payload }));

export const loginAction = createAction(UserActions.USER_LOGIN_REQUEST, (payload: IUserLoginDto) => ({ payload }));
export const loginSuccessAction = createAction(UserActions.USER_LOGIN_SUCCESS, (payload: IUser) => ({ payload }));

export const logOutAction = createAction(UserActions.USER_LOGOUT_REQUEST);
export const logOutSuccessAction = createAction(UserActions.USER_LOGOUT_SUCCESS);
