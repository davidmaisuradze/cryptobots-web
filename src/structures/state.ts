import { Dispatch } from 'redux';
import { IUser, IAppState } from '.';

export interface IRootState {
  app: IAppState;
  user: IUser;
}

export interface WithDispatch {
  dispatch: Dispatch;
}

export interface IReducerGlobalState {
  loading?: boolean;
  error?: string;
}
