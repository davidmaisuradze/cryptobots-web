import market, { marketState } from "./market";
import user, { userState } from "./user";

export const initialState = {
  market: marketState,
  user: userState,
};

export default {
  ...market,
  ...user,
};
