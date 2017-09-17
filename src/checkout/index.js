import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import EnterCode from './enter-code';
import Offer from './offer';

/*
<p className={s.invalidCode}>(╯°□°）╯︵ ┻━┻</p>;
<Button>Back</Button>
.invalidCode {
  font-size: 4rem;
}
*/

const CheckoutDemo = ({ match }) => (
  <Provider store={configureStore()}>
    <article>
      <Route path={`${match.url}/:offerCode`} component={Offer} />
      <Route exact path={match.url} component={EnterCode} />
    </article>
  </Provider>
);

export default CheckoutDemo;
