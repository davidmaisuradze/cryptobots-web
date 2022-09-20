import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../structures';
import { IRequestResetPasswordDto, IUserLoginDto, IUserRegisterDto } from '../../services/user.service';

export enum UserActions {
  GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILED = 'GET_PROFILE_FAILED',

  USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAILED = 'USER_REGISTER_FAILED',

  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',

  USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
  USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED',

  REQUEST_PASSWORD_RESET_REQUEST = 'REQUEST_RESET_PASSWORD_REQUEST',
  REQUEST_PASSWORD_RESET_SUCCESS = 'REQUEST_RESET_PASSWORD_SUCCESS',
  REQUEST_PASSWORD_RESET_FAILED = 'REQUEST_RESET_PASSWORD_FAILED',
}

export const getProfileAction = createAction(UserActions.GET_PROFILE_REQUEST);
export const getProfileSuccessAction = createAction(UserActions.GET_PROFILE_SUCCESS, (payload: IUser) => ({ payload }));
export const getProfileFailedAction = createAction(UserActions.GET_PROFILE_FAILED, (payload: string) => ({ payload }));

export const registerAction = createAction(UserActions.USER_REGISTER_REQUEST, (payload: IUserRegisterDto) => ({ payload }));
export const registerSuccessAction = createAction(UserActions.USER_REGISTER_SUCCESS, (payload: IUser) => ({ payload }));
export const registerFailedAction = createAction(UserActions.USER_REGISTER_FAILED, (payload: string) => ({ payload }));

export const loginAction = createAction(UserActions.USER_LOGIN_REQUEST, (payload: IUserLoginDto) => ({ payload }));
export const loginSuccessAction = createAction(UserActions.USER_LOGIN_SUCCESS, (payload: IUser) => ({ payload }));
export const loginFailedAction = createAction(UserActions.USER_LOGIN_FAILED, (payload: string) => ({ payload }));

export const logOutAction = createAction(UserActions.USER_LOGOUT_REQUEST);
export const logOutSuccessAction = createAction(UserActions.USER_LOGOUT_SUCCESS);
export const logOutFailedAction = createAction(UserActions.USER_LOGOUT_FAILED, (payload: string) => ({ payload }));

export const requestPasswordResetAction = createAction(UserActions.REQUEST_PASSWORD_RESET_REQUEST, (payload: IRequestResetPasswordDto) => ({ payload }));
export const requestPasswordResetSuccessAction = createAction(UserActions.REQUEST_PASSWORD_RESET_SUCCESS);
export const requestPasswordResetFailedAction = createAction(UserActions.REQUEST_PASSWORD_RESET_FAILED, (payload: string) => ({ payload }));
