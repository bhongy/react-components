// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header';
import ComponentsDemo from './components-demo-entry';
import CheckoutDemo from './checkout';
import s from './app.css';

const App = () => (
  <div className={s.app}>
    <Header />
    <section className={s.content}>
      <Route exact path="/" component={ComponentsDemo} />
      <Route path="/checkout" component={CheckoutDemo} />
    </section>
  </div>
);

export default App;
