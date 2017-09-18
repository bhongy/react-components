// @flow

import * as React from 'react';
import { get, invoke, memoize } from 'lodash';

import InvalidCode from './invalid-code';

// these maps to location param
const ENTRY = 'enter-code';
const CHOOSE_TRIP_TYPE = 'start';
const CHOOSE_CONTINENT = 'choose-continent';
const CHOOSE_DESTINATION = 'choose-destination';
const CHOOSE_FLIGHT = 'choose-flight';
const REVIEW_ORDER = 'review';
const CONFIRM_ORDER = 'confirm';
const INVALID_CODE = 'invalid-code';

type AppState = {};
type StepKey = string; /* CHECKOUT | INVALID_CODE ... */
type CheckoutStep = { step: StepKey, next: StepKey, Component: React.ComponentType<*, *> };
type CheckoutFlow = CheckoutStep[];

// mock validator
const isCodeValid = state => get(state, 'data.code') === '37b1f90e03';
const checkoutFlowDefinition = {
  [ENTRY]: {
    next(state) {
      return isCodeValid(state) ? CHOOSE_TRIP_TYPE : INVALID_CODE;
    },
  },

  [CHOOSE_TRIP_TYPE]: {
    next(state) {
      return state.type = 'international' ?
    },
  },

  [INVALID_CODE]: {
    component: InvalidCode,
    next: () => null,
  },
};

function getFirstStep(state: AppState): StepKey {
  return ENTRY;
}

function getCheckoutFlowHelper<R: CheckoutFlow>(state: AppState, step: ?StepKey, result: R): R {
  if (typeof step !== 'string') {
    return result;
  }

  const def = checkoutFlowDefinition[step];
  const next: StepKey = invoke(def, 'next', state);
  result.push({ step, next, Component: def.Component });
  return getCheckoutFlowHelper(state, next, result);
}

const getCheckoutFlow = memoize((state: AppState): CheckoutFlow => {
  const start = getFirstStep(state);
  return getCheckoutFlowHelper(state, start, []);
});

export default getCheckoutFlow;
