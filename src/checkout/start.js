import React from 'react';
import { actions } from './store';
import glyphs, { $$viewBox as viewBox } from './glyph.json';
import SelectAndRoute from './select-and-route';
import s from './start.css';

const Option = ({ children, onClick }) => (
  <button className={s.option} onClick={onClick}>
    <div className={s.option_iconContainer}>
      <svg className={s.option_icon} viewBox={viewBox}>
        <path d={glyphs.globe} />
      </svg>
    </div>
    <p className={s.option_label}>{children}</p>
  </button>
);

const Start = () => (
  <article className={s.page}>
    <div className={s.optionsContainer}>
      <SelectAndRoute
        Button={Option}
        next="choose-destination"
        action={actions.chooseContinent('')}
      >
        Domestic
      </SelectAndRoute>
      <SelectAndRoute Button={Option} next="choose-continent">
        International
      </SelectAndRoute>
    </div>
  </article>
);

export default Start;
