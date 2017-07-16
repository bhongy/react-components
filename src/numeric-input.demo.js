import React, { Component } from 'react';
import NumericInput from './numeric-input';

class NumericInputDemo extends Component {
  state: { value: ?number } = { value: 3.141593 };

  handleChange = (args: { value: ?number }): void =>
    this.setState({ value: args.value });

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

export default NumericInputDemo;
