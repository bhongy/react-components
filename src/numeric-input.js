// @flow

import React, { Component } from 'react';
import { invoke } from 'lodash';

type NumericValue = number;
type InputChangeEvent = Event & {  // is there a way to declare close to `handleChange` ?
  currentTarget: HTMLInputElement & { value: string, name?: string },
};

type Props = {
  initialValue?: NumericValue,
  onChange?: (obj: { value: NumericValue, name?: string }) => void,
  precision?: number,
};

export type State = {
  inputValue: string,
  value: NumericValue | null,
};

function handleInitialValue(value?: NumericValue): State {
  // `Number.isFinite` is better but no pre-edge IE support
  // ? how to avoid checking type and use only `Number.isFinite` with Flow ?
  if (typeof value === 'number' && isFinite(value)) {
    return {
      value,
      inputValue: value.toString(),
    };
  }

  return {
    value: null,
    inputValue: '',
  };
}

export function truncateInputValueToPrecision(
  inputValue: string,
  precision?: number
): string {
  if (
    typeof precision !== 'number' ||
    precision % 1 !== 0 ||
    precision < 0
  ) {
    return inputValue; // invalid use, should throw instead ?
  }

  const [integer, decimals]: Array<string> = inputValue.split('.');

  if (precision === 0 || typeof decimals === 'undefined') {
    return integer;
  }

  return [integer, decimals.slice(0, precision)].join('.');
}

class NumericInput extends Component<void, Props, State> {
  state: State; // don't know why I need to do this

  constructor(props: Props): void {
    super(props);
    this.state = handleInitialValue(props.initialValue);
  }

  handleChange = (event: InputChangeEvent): void => {
    // create a copy of "name" value because React synthetic event is re-used
    // hence we cannot rely on the reference like `event.currentTarget.name`
    const { name, value: inputValue } = event.currentTarget;
    const numericValue: NumericValue = +inputValue;

    // bail early if input is invalid
    if (isNaN(numericValue)) {
      return;
    }

    if (!this.props.hasOwnProperty('precision')) {
      this.handleStateUpdate(numericValue, inputValue, name);
      return;
    }

    // precision handler assumes that the inputValue
    // can be safely converted to float and without multiple
    // periods (e.g. "01a" or "01.10."), so it must be called
    // after the "bail" check in the beginning of the onChange handler
    const precisionedInputValue: string = truncateInputValueToPrecision(
      inputValue,
      this.props.precision
    );

    if (this.state.inputValue !== precisionedInputValue) {
      this.handleStateUpdate(+precisionedInputValue, precisionedInputValue, name);
      return;
    }
  };

  handleStateUpdate = (value: NumericValue, inputValue: string, name?: string): void => {
    this.setState({ value, inputValue }, (): void => {
      // TODO: figure out how to fix Flow uncovered code here
      // prefer to avoid ad-hoc null coalescing function
      invoke(this.props, 'onChange', { value, name });
    })
  };

  render() {
    return (
      <input
        {...this.props}
        onChange={this.handleChange}
        value={this.state.inputValue}
      />
    );
  }
}

export default NumericInput;
