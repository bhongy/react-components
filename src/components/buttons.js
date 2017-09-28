/* eslint-disable import/prefer-default-export */

import React from 'react';
import cx from 'classnames';
import s from './buttons.css';

const RaisedButton = ({ className, disabled, ...otherProps }) => {
  const baseClassName = disabled ? s.raised__disabled : s.raised__active;
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={cx(baseClassName, className)}
    />
  );
};

// needs to provide displayName to avoid "Unknown" stateless component names
// when running --coverage (issue with istanbul)
// https://github.com/facebook/jest/issues/1824
RaisedButton.displayName = 'RaisedButton';

const FlatButton = ({ className, disabled, ...otherProps }) => {
  const baseClassName = disabled ? s.flat__disabled : s.flat;
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={cx(baseClassName, className)}
    />
  );
};

FlatButton.displayName = 'FlatButton';

export { FlatButton, RaisedButton };
