// @flow

/*
TODO:
  - autofocus: how to handle multiple elements on page with autofocus={true} ?
*/

import React from 'react';
import { noop, omit, uniqueId } from 'lodash';

type InputEvent = SyntheticInputEvent<HTMLInputElement>;
type EventHandler = (event: InputEvent) => void;

type Props = {
  label: string,
  value: string,
  onBlur: EventHandler,
  onChange: EventHandler,
  onFocus: EventHandler,
};

type State = {
  hasFocus: boolean,
};

const mapPropsToInput = (props: Props) => omit(props, ['label', 'onBlur', 'onFocus']);
class TextField extends React.PureComponent<Props, State> {
  static defaultProps = {
    onBlur: noop,
    onFocus: noop,
  };

  id: string = uniqueId('TextFieldId_');

  handleInputBlur: EventHandler = (event) => {
    this.setState({ hasFocus: false });
    this.props.onBlur(event);
  };

  handleInputFocus: EventHandler = (event) => {
    this.setState({ hasFocus: false });
    this.props.onFocus(event);
  };

  render() {
    const { id, props, state } = this;

    return (
      <div className={state.hasFocus && 'has-focus'}>
        <label htmlFor={id}>
          {props.label}
        </label>
        <input
          {...mapPropsToInput(props)}
          id={id}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
        />
      </div>
    );
  }
}

export default TextField;
