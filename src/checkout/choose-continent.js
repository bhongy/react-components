import React from 'react';
import { actions } from './store';
import SelectAndRoute from './select-and-route';

const Option = ({ children, continent }) => (
  <SelectAndRoute next="choose-destination" action={actions.chooseContinent(continent)}>
    {children}
  </SelectAndRoute>
);

const ChooseContinent = () => (
  <article>
    <h1>Continent</h1>
    <ul>
      <li>
        <Option continent="europe">Europe</Option>
      </li>
      <li>
        <p>Asia</p>
      </li>
      <li>
        <p>Africa</p>
      </li>
      <li>
        <p>Australia</p>
      </li>
    </ul>
  </article>
);

export default ChooseContinent;
