/**
 * A thin wrapper around HTMLInputElement that state as number type
 * rather than string - avoid ad-hoc string/number handling at use sites.
 * Handles precision and trailing period. See unit tests for the detail spec.
 *
 * TODO: handle formatting (could be tricky with change event value)
 *
 * @flow
 */

import React, { Component } from 'react';
import { invoke } from 'lodash';

// is there a way to declare this close to `handleChange` ?
type InputChangeEvent = SyntheticInputEvent & {
  currentTarget: HTMLInputElement & { value: string, name?: string },
};

type Props = {
  initialValue?: number,
  onChange?: (obj: { value: number | null, name?: string }) => void,
  precision?: number,
};

export type State = {
  inputValue: string,
  value: number | null,
};

function handleInitialValue(value?: number): State {
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
    // handle invalid `precision` param
    // ? should throw instead ?
    return inputValue;
  }

  const [integer, decimals]: Array<string> = inputValue.split('.');

  if (precision === 0 || typeof decimals === 'undefined') {
    return integer;
  }

  return [integer, decimals.slice(0, precision)].join('.');
}

class NumericInput extends Component<void, Props, State> {
  state: State; // don't know why I need to do this together with Generics

  constructor(props: Props): void {
    super(props);
    this.state = handleInitialValue(props.initialValue);
  }

  handleChange = (event: InputChangeEvent): void => {
    // create a copy of "name" value because React synthetic event is re-used
    // hence we cannot rely on the reference like `event.currentTarget.name`
    const { name, value: inputValue } = event.currentTarget;

    // bail early (do not change state) if input is invalid
    if (isNaN(+inputValue)) {
      return;
    }

    // transformations assume that the inputValue can be safely converted
    // to float and without multiple periods (e.g. "01a" or "01.10.")
    // keep this after the "bail" check
    const newState: State = this.handlePrecision(inputValue);

    // do not `setState` if the new inputValue is the same as the current inputValue
    // after calling `this.handlePrecision` with the new inputValue
    if (newState === this.state) {
      return;
    }

    this.setState(newState, (): void => {
      // TODO: figure out how to fix Flow uncovered code here
      // prefer to avoid ad-hoc null coalescing function
      invoke(this.props, 'onChange', { value: this.state.value, name });
    });
  };

  handlePrecision = (inputValue: string): State => {
    const truncated: string = truncateInputValueToPrecision(
      inputValue,
      this.props.precision
    );

    if (this.state.inputValue === truncated) {
      return this.state;
    }

    return truncated === ''
      ? { value: null, inputValue: '' }
      : { value: +truncated, inputValue: truncated };
  };

  render() {
    const { initialValue, ...passThroughProps } = this.props;

    return (
      <input
        {...passThroughProps}
        onChange={this.handleChange}
        value={this.state.inputValue}
      />
    );
  }
}

export default NumericInput;

export class NumericInputDemo extends Component {
  state = { value: 3.141593 };

  // $FlowFixMe: how do I type this?
  handleChange = ({ value }) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div>
        <h3>NumericInput</h3>
        <NumericInput
          initialValue={this.state.value}
          onChange={this.handleChange}
        />
        <pre>
          state.value = {JSON.stringify(this.state.value)}
        </pre>
      </div>
    );
  }
}
