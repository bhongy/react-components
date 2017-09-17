import React from 'react';
import { Route } from 'react-router-dom';
import EnterCode from './enter-code';

/*
<p className={s.invalidCode}>(╯°□°）╯︵ ┻━┻</p>;
<Button>Back</Button>
.invalidCode {
  font-size: 4rem;
}
*/

const CheckoutOffer = ({ match }) => <p>Check out for offer: {match.params.offerCode}</p>;
const CheckoutDemo = ({ match }) => (
  <article>
    <Route path={`${match.url}/:offerCode`} component={CheckoutOffer} />
    <Route exact path={match.url} component={EnterCode} />
  </article>
);

export default CheckoutDemo;
