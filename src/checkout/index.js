import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import EnterCode from './enter-code';
import Offer from './offer';
import Debugger from './debugger';

const CheckoutDemo = ({ match }) => (
  <Provider store={configureStore()}>
    <section>
      <Route path={`${match.url}/:offerCode`} component={Offer} />
      <Route exact path={match.url} component={EnterCode} />
      <Debugger />
    </section>
  </Provider>
);

export default CheckoutDemo;
