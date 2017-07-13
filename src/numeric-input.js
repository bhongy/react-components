// @flow

import React, { Component } from 'react';

type Value = number;

type Props = {
  initialValue?: Value,
  // onChange: (value: Value, name?: string) => void,
  // precision: number,
};

type State = {
  value: Value | null,
  inputValue: string,
};

function handleInitialValue(value?: Value): State {
  // `Number.isFinite` is better but no pre-edge IE support
  // Flow: how to avoid checking type and use only `Number.isFinite` ?
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

  render() {
    return <input value={this.state.inputValue} />;
  }
}

export default NumericInput;
