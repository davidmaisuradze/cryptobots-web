import { createReducer } from '@reduxjs/toolkit';
import { IMarketState, IReducerMetaState } from '../../structures';

import { getItems, getItemsFailure, getItemsSuccess } from '../actions';

type MarketState = IMarketState & IReducerMetaState;
export const marketState: MarketState = {
  data: [],
  page: 1,
  totalCount: 0,
  error: '',
  loading: false,
};

export default {
  market: createReducer<MarketState>(marketState, (builder) => {
    builder
      .addCase(getItems, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getItemsSuccess, (state, { payload }) => {
        const { data, page, totalCount } = payload || {};

        state = {
          data,
          page,
          totalCount,
          loading: false,
          error: '',
        };
      })
      .addCase(getItemsFailure, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }),
};
