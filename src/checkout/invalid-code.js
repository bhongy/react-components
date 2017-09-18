import React from 'react';
import s from './invalid-code.css';

const InvalidCode = () => (
  <div className={s.page}>
    <p className={s.graphic}>(╯°□°）╯︵ ┻━┻</p>
    <p className={s.caption}>The offer code you&apos;re looking for doesn&apos;t exist.</p>
  </div>
);

export default InvalidCode;
