import { MarketActions } from './../actions/market';
import { request } from '@gilbarbara/helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getItems, getItemsSuccess, getItemsFailure } from '../actions';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getReposSaga({ payload }: ReturnType<typeof getItems>): any {
  try {
    const data = yield call(request, `https://api.github.com/search/repositories?q=${payload}&sort=stars`);

    yield put(getItemsSuccess(data.items));
  } catch (error: any) {
    yield put(getItemsFailure(error.message, payload));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(MarketActions.MARKET_GET_ITEMS_REQUEST, getReposSaga)]);
}
