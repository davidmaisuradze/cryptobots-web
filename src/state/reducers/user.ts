import { IUser } from './../../structures/user';
import { createReducer } from '@reduxjs/toolkit';

import { getProfileAction, getProfileSuccessAction, loginAction, loginSuccessAction, logOutAction, logOutSuccessAction } from '../actions';
import { IReducerGlobalState } from '../../structures';

type UserStateType = IReducerGlobalState & IUser;
export const userState: UserStateType = {
  firstName: '',
  lastName: '',
  email: ''
};

export default {
  user: createReducer<UserStateType>(userState, (builder) => {
    builder
      .addCase(getProfileAction, (state) => {
        state = {
          ...state,
          loading: true,
          error: ''
        }
      })
      .addCase(getProfileSuccessAction, (state, { payload }) => {
        state = {
          loading: false,
          error: '',
          ...payload,
        }
      });

    builder
      .addCase(loginAction, (state) => {
        state.loading = true;
      })
      .addCase(loginSuccessAction, (state, { payload }) => {
        state = {
          loading: false,
          error: '',
          ...payload,
        };
      });

    builder
      .addCase(logOutAction, (state) => {
        state = {
          ...state,
          loading: false,
          error: ''
        }
      })
      .addCase(logOutSuccessAction, (state) => {
        state = {
          loading: false,
          error: '',
          firstName: '',
          lastName: '',
          email: '',
        };
      });
  }),
};
