// @flow

import React from 'react';
import Header from './header';
import AutocompleteDemo from './autocomplete';
import NumericInputDemo from './numeric-input.demo';
import StarRatingDemo from './star-rating';
import TextFieldDemo from './text-field.demo';
import s from './app.css';

const App = () => (
  <div className={s.app}>
    <Header />
    <section className={s.content}>
      <AutocompleteDemo />
      <NumericInputDemo />
      <StarRatingDemo />
      <TextFieldDemo />
    </section>
  </div>
);

export default App;
