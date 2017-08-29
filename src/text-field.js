// @flow

/*
Features:
  - support "controlled" input only (require `props.value` and `props.onChange`)
  - support custom styling with global CSS or CSS modules
*/

/*
TODO:
  - autofocus: how to handle multiple elements on page with autofocus={true} ?
  - support css-in-js style API
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

type ClassName = string;
type StateToClassNames = (
  state: State & { hasValue: boolean }
) => {
  container: ClassName,
  label: ClassName,
  input: ClassName,
};

const mapPropsToInput = (props: Props) => omit(props, ['label', 'onBlur', 'onFocus']);
function factory(mapStateToClassNames: StateToClassNames) {
  return class TextField extends React.PureComponent<Props, State> {
    static defaultProps = {
      onBlur: noop,
      onFocus: noop,
    };

    state = {
      hasFocus: false,
    };

    id: string = uniqueId('TextFieldId_');

    handleInputBlur: EventHandler = (event) => {
      this.setState({ hasFocus: false });
      this.props.onBlur(event);
    };

    handleInputFocus: EventHandler = (event) => {
      this.setState({ hasFocus: true });
      this.props.onFocus(event);
    };

    render() {
      const { id, props, state } = this;
      const hasValue = typeof props.value === 'string' && props.value.length > 0;
      const style = mapStateToClassNames({
        hasFocus: state.hasFocus,
        hasValue,
        // error: state.error,
      });

      return (
        <div className={style.container}>
          <label className={style.label} htmlFor={id}>
            {props.label}
          </label>
          <input
            {...mapPropsToInput(props)}
            className={style.input}
            id={id}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
          />
        </div>
      );
    }
  };
}

const defaultTheme: StateToClassNames = ({ hasFocus, hasValue }) =>
  (hasFocus && hasValue
    ? { container: '**container**', label: '**label**', input: '**input**' }
    : { container: 'container', label: 'label', input: 'input' });

export default factory(defaultTheme);
export { factory as customizeTextField };
