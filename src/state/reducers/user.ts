import { IUser } from "./../../structures/user";
import { createReducer } from "@reduxjs/toolkit";

import { login, loginSuccess, logOut, logOutSuccess } from "../actions";

export const userState: IUser = {
  isAuthenticated: false,
  firstName: "",
  lastName: "",
};

export default {
  user: createReducer<IUser>(userState, (builder) => {
    builder
      .addCase(login, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(loginSuccess, (state, { payload }) => {
        const { firstName, lastName } = payload || {};

        state = {
          isAuthenticated: true,
          firstName,
          lastName,
        };
      });

    builder
      .addCase(logOut, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logOutSuccess, (state) => {
        state = {
          isAuthenticated: false,
          firstName: "",
          lastName: "",
        };
      });
  }),
};
