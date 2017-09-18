import React from 'react';
import s from './spinner.css';

const Spinner = () => (
  <div className={s.spinner}>
    <div className={s.bounce1} />
    <div className={s.bounce2} />
  </div>
);

export default Spinner;
