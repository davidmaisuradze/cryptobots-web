import { Dispatch } from "redux";
import { IUser, IMarketState } from ".";

export interface IRootState {
  market: IMarketState & IReducerMetaState;
  user: IUser;
}

export interface WithDispatch {
  dispatch: Dispatch;
}

export interface IReducerMetaState {
  error?: string;
  loading?: boolean;
}
