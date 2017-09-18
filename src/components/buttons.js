/* eslint-disable import/prefer-default-export */

import React from 'react';
import cx from 'classnames';
import s from './buttons.css';

export const RaisedButton = ({ className, disabled, ...otherProps }) => {
  const baseClassName = disabled ? s.raised__disabled : s.raised__active;
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={cx(baseClassName, className)}
    />
  );
};

export const FlatButton = ({ className, disabled, ...otherProps }) => {
  const baseClassName = disabled ? s.flat__disabled : s.flat;
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={cx(baseClassName, className)}
    />
  );
};
