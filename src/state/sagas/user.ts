import { all, call, delay, put, takeLatest } from 'redux-saga/effects';

import { loginSuccessAction, logOutSuccessAction, registerSuccessAction, UserActions } from '../actions';
import { getProfile, loginUser, registerUser } from '../../services/user.service';
import { IUser } from '../../structures';

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
  const user: IUser = yield call(registerUser, action.payload);

  yield put(
    registerSuccessAction({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
  );
}

export function* loginSaga(action: any) {
  const user: IUser = yield call(loginUser, action.payload);

  yield put(
    loginSuccessAction({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
  );
}

export function* logoutSaga() {
  yield delay(200);

  yield put(logOutSuccessAction());
}

export default function* root() {
  yield all([
    takeLatest(UserActions.GET_PROFILE_REQUEST, getProfileSaga),
    takeLatest(UserActions.USER_REGISTER_REQUEST, registerSaga),
    takeLatest(UserActions.USER_LOGIN_REQUEST, loginSaga),
    takeLatest(UserActions.USER_LOGOUT_REQUEST, logoutSaga),
  ]);
}
