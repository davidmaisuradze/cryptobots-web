import { createAction } from '@reduxjs/toolkit';
import { IMarketState } from '../../structures';

export enum MarketActions {
  MARKET_GET_ITEMS_REQUEST = 'MARKET_GET_ITEMS_REQUEST',
  MARKET_GET_ITEMS_SUCCESS = 'MARKET_GET_ITEMS_SUCCESS',
  MARKET_GET_ITEMS_FAILURE = 'MARKET_GET_ITEMS_FAILURE',
}

export const getItems = createAction<string>(
  MarketActions.MARKET_GET_ITEMS_REQUEST,
);

export const getItemsSuccess = createAction(
  MarketActions.MARKET_GET_ITEMS_SUCCESS,
  (payload: IMarketState) => ({ payload }),
);

export const getItemsFailure = createAction(
  MarketActions.MARKET_GET_ITEMS_FAILURE,
  (payload: string, query: string) => ({ payload }),
);
