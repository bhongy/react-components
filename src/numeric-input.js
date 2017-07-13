// @flow

import React, { Component } from 'react';
import { invoke } from 'lodash';

type Value = number;

type Props = {
  initialValue?: Value,
  onChange?: (obj: { value: Value, name?: string }) => void,
  // precision: number,
};

export type State = {
  value: Value | null,
  inputValue: string,
};

function handleInitialValue(value?: Value): State {
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

class NumericInput extends Component<void, Props, State> {
  state: State; // don't know why I need to do this

  constructor(props: Props) {
    super(props);
    this.state = handleInitialValue(props.initialValue);
  }

  handleChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    // create a copy of "name" value because React synthetic event is re-used
    // hence we cannot rely on the reference like `event.currentTarget.name`
    const {
      name,
      value: inputValue,
    // $FlowFixMe: how to use Flow with destructuring correctly
    }: { value: string, name?: string } = event.currentTarget;
    const numericValue: Value = +inputValue;

    if (isNaN(numericValue)) {
      return;
    }

    this.setState({ value: numericValue, inputValue }, () => {
      // TODO: figure out how to fix Flow uncovered code here
      // prefer to avoid ad-hoc null coalescing function
      invoke(this.props, 'onChange', { value: numericValue, name })
    });
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
