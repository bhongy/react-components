// @flow

/*
Features:
  - support "controlled" input only (require `props.value` and `props.onChange`)
  - support custom styling with global CSS or CSS modules
*/

/*
TODO:
  - disable state
  - error state
  - multiple-lines
  - icon (left)
  - action icon/text (right - e.g. clear button, dropdown icon)
  - autofocus: how to handle multiple elements on page with autofocus={true} ?
  - support css-in-js style API
*/

import React from 'react';
import { noop, omit, uniqueId } from 'lodash';
import classnames from 'classnames';
import s from './text-field.css';

type InputEvent = SyntheticInputEvent<HTMLInputElement>;
export type EventHandler = (event: InputEvent) => void;

type Props = {
  label: string,
  value: string,
  helperText?: string,
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
  border: ClassName,
  helperText?: ClassName,
};

const mapPropsToInput = (props: Props) => omit(props, ['label', 'helperText', 'onBlur', 'onFocus']);

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
        // error: state.errorMessage,
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
          <hr className={style.border} />
          {props.helperText &&
            <p className={style.helperText}>
              {props.helperText}
            </p>}
        </div>
      );
    }
  };
}

/*
TODO: better handle (design) conditional styling based on state
  ---
  e.g. always apply "move" style on label based on filled state
  but if disabled or error - ignore "focus (color)" state
  and focus also use (compose) "move" style
*/
const defaultTheme: StateToClassNames = ({ hasFocus, hasValue }) => ({
  container: s.container,
  label: classnames(s.label, {
    [s.label__move]: hasFocus || hasValue,
    [s.label__color]: hasFocus,
  }),
  input: classnames(s.input, {
    [s.input__show]: hasFocus || hasValue,
  }),
  border: classnames(s.border, {
    [s.border__color]: hasFocus,
  }),
  helperText: s.helperText,
});

export default factory(defaultTheme);
export { factory as customizeTextField };
