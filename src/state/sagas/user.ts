import { all, call, put, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';

import { loginSuccessAction, logOutSuccessAction, registerSuccessAction, UserActions } from '../actions';
import { getProfile, loginUser, logoutUser, registerUser } from '../../services/user.service';
import { IUser } from '../../structures';
import { cookieAuthService } from '../../services';

export function* getProfileSaga() {
  const user: IUser = yield call(getProfile);

  yield put(
    loginSuccessAction({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
  );


}

export function* registerSaga(action: any) {
  const { data: user } = yield call(registerUser, action.payload);

  yield put(
    registerSuccessAction({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
  );

  yield call(Router.push, '/auth/login');
}

export function* loginSaga(action: any) {
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
}

export function* logoutSaga() {
  yield call(logoutUser);
  
  yield put(logOutSuccessAction());
  yield call(cookieAuthService.unsetTokens);
  yield call(Router.push, '/');
}

export default function* root() {
  yield all([
    takeLatest(UserActions.GET_PROFILE_REQUEST, getProfileSaga),
    takeLatest(UserActions.USER_REGISTER_REQUEST, registerSaga),
    takeLatest(UserActions.USER_LOGIN_REQUEST, loginSaga),
    takeLatest(UserActions.USER_LOGOUT_REQUEST, logoutSaga),
  ]);
}
