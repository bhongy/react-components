// @flow

import React from 'react';
import AutocompleteDemo from './autocomplete';
import NumericInputDemo from './numeric-input.demo';
import TextFieldDemo from './text-field.demo';
import s from './app.css';

const App = () => (
  <div className={s.app}>
    <AutocompleteDemo />
    <NumericInputDemo />
    <TextFieldDemo />
  </div>
);

export default App;
