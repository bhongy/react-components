// @flow

import { RESET_OFFER, CHECK_OFFER_CODE, VALID_OFFER_CODE, INVALID_OFFER_CODE } from './actions';

export type AppState = {};
type Action = { type: string, payload: { isValid: boolean, data?: string } };

const initialState: AppState = {
  isFetching: false,
  data: null,
  error: null,
};

function rootReducer(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case RESET_OFFER:
      return initialState;
    case CHECK_OFFER_CODE:
      return { ...state, isFetching: true };
    // TODO: separate "isFetching" flag from data, error handling
    //   by composing reducers
    case VALID_OFFER_CODE:
      return { ...state, isFetching: false, data: action.payload, error: null };
    case INVALID_OFFER_CODE:
      return { ...state, isFetching: false, data: null, error: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
