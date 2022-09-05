import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../../structures';

export const selectApp = createSelector(
  (state: IRootState) => state.app,
  (app) => app,
);

export const selectUser = createSelector(
  (state: IRootState) => state.user,
  (user) => user,
);
