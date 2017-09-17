/* eslint-disable import/prefer-default-export */

import React from 'react';
import cx from 'classnames';
import s from './buttons.css';

export const RaisedButton = ({ className, primary, ...otherProps }) => (
  <button {...otherProps} className={cx(s.raised, className, primary && s.primary)} />
);
