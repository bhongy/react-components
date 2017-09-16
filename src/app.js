// @flow

import React from 'react';
import AutocompleteDemo from './autocomplete';
import NumericInputDemo from './numeric-input.demo';
import StarRatingDemo from './star-rating';
import TextFieldDemo from './text-field.demo';
import s from './app.css';

const App = () => (
  <div className={s.app}>
    <AutocompleteDemo />
    <NumericInputDemo />
    <StarRatingDemo />
    <TextFieldDemo />
  </div>
);

export default App;
