import { all, call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';

import {
  loginSuccessAction,
  logOutSuccessAction,
  registerSuccessAction,
  loginFailedAction,
  registerFailedAction,
  UserActions, 
  logOutFailedAction,
  requestPasswordResetSuccessAction,
  requestPasswordResetFailedAction 
} from '../actions';
import { getProfile, loginUser, logoutUser, registerUser, requestPasswordReset } from '../../services/user.service';
import { IUser } from '../../structures';
import { cookieAuthService } from '../../services';
import { AnyAction } from 'redux';

export function* getProfileSaga(): Generator<CallEffect<IUser> | PutEffect<AnyAction>, void, IUser> {
  try {
    const user: IUser = yield call(getProfile);

    yield put(
      loginSuccessAction({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }),
    );
  } catch(error: any) {
    yield put(loginFailedAction(error.message));
  }
}

export function* registerSaga(action: any) {
  try{
    const { data: user } = yield call(registerUser, action.payload);

    yield put(
      registerSuccessAction({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }),
    );

    yield call(Router.push, '/auth/login');
  } catch(error: any) {
    yield put(registerFailedAction(error.message));
  }
}

export function* loginSaga(action: any) {
  try{
    const { data: user } = yield call(loginUser, action.payload);

    console.log(user, 'user');
    yield put(
      loginSuccessAction({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }),
    );

    if (user.token){
      yield call(cookieAuthService.setTokens, user.token?.accessToken, user.token?.refreshToken);
    }

    yield call(Router.push, '/dashboard');
  } catch(error: any) {
    yield put(loginFailedAction(error.message));
  }
}

export function* logoutSaga() {
  try {
    yield call(logoutUser);
  
    yield put(logOutSuccessAction());
    yield call(cookieAuthService.unsetTokens);
    yield call(Router.push, '/');
  } catch(error: any) {
    yield put(logOutFailedAction(error.message));
  }
}

export function* requestPasswordResetSaga(action: any) {
  try{
    const { data: user } = yield call(requestPasswordReset, action.payload);

    yield put(
      requestPasswordResetSuccessAction(),
    );
  } catch(error: any) {
    yield put(requestPasswordResetFailedAction(error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(UserActions.GET_PROFILE_REQUEST, getProfileSaga),
    takeLatest(UserActions.USER_REGISTER_REQUEST, registerSaga),
    takeLatest(UserActions.USER_LOGIN_REQUEST, loginSaga),
    takeLatest(UserActions.USER_LOGOUT_REQUEST, logoutSaga),
    takeLatest(UserActions.REQUEST_PASSWORD_RESET_REQUEST, requestPasswordResetSaga),
  ]);
}
