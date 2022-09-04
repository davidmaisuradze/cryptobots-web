import { UserActions } from './../actions/user';
import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { loginSuccess, logOutSuccess } from '../actions';

export function* loginSaga() {
  yield delay(400);

  yield put(
    loginSuccess({
      isAuthenticated: true,
      firstName: 'testF',
      lastName: 'testL',
    }),
  );
}

export function* logoutSaga() {
  yield delay(200);

  yield put(logOutSuccess());
}

export default function* root() {
  yield all([
    takeLatest(UserActions.USER_LOGIN_REQUEST, loginSaga),
    takeLatest(UserActions.USER_LOGOUT_REQUEST, logoutSaga),
  ]);
}
