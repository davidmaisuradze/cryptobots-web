import { all, fork } from 'redux-saga/effects';

import market from './market';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(market), fork(user)]);
}
