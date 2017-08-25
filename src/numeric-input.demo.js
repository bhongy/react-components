// @flow

import React, { Component } from 'react';
import NumericInput from './numeric-input';

type State = { value: ?number };

class NumericInputDemo extends Component<*, State> {
  state = { value: 3.141593 };

  handleChange = (args: { value: ?number }): void =>
    this.setState({ value: args.value });

  render() {
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

export default NumericInputDemo;
