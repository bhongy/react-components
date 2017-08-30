// @flow

import React from 'react';
import TextField from './text-field';
import type { EventHandler } from './text-field';

type State = { [key: string]: string };

class TextFieldDemo extends React.PureComponent<{}, State> {
  state = { demo: '' };

  handleInputChange: EventHandler = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h3>TextField</h3>
        <TextField
          name="demo"
          label="Label"
          value={this.state.demo}
          onChange={this.handleInputChange}
          placeholder="placeholder text ..."
          helperText="Helper text"
        />
        <pre>
          state.demo = {JSON.stringify(this.state.demo)}
        </pre>
      </div>
    );
  }
}

export default TextFieldDemo;
