import { Dispatch } from 'redux';
import { IUser, IMarketState, IAppState } from '.';

export interface IRootState {
  app: IAppState;
  user: IUser;
}

export interface WithDispatch {
  dispatch: Dispatch;
}

export interface IReducerMetaState {
  error?: string;
  loading?: boolean;
}
