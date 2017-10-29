// @flow

import {
  RESET_OFFER,
  CHECK_OFFER_CODE,
  VALID_OFFER_CODE,
  INVALID_OFFER_CODE,
  CHOOSE_CONTINENT,
  CHOOSE_DESTINATION,
} from './actions';

export type AppState = {};
type Action = { type: string, payload: { isValid: boolean, data?: string } };

const initialState: AppState = {
  isFetching: false,
  data: null,
  error: null,
  continent: null,
  destination: null,
};

function rootReducer(state: AppState = initialState, action: Action): AppState {
  const { payload } = action;
  switch (action.type) {
    case RESET_OFFER:
      return initialState;
    case CHECK_OFFER_CODE:
      return { ...state, isFetching: true };
    // TODO: separate "isFetching" flag from data, error handling
    //   by composing reducers
    case VALID_OFFER_CODE:
      return {
        ...state,
        isFetching: false,
        data: payload,
        error: null,
      };
    case INVALID_OFFER_CODE:
      return {
        ...state,
        isFetching: false,
        data: null,
        error: payload,
      };
    case CHOOSE_CONTINENT:
      return {
        ...state,
        continent: payload,
      };
    case CHOOSE_DESTINATION:
      return { ...state, destination: payload };
    default:
      return state;
  }
}

export default rootReducer;
