import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store';
import { joinPathname } from './helpers';
import Spinner from './spinner';
import InvalidCode from './invalid-code';
import s from './offer.css';

const Start = () => <p>Good to go</p>;
class Offer extends React.PureComponent {
  state = {
    isReady: false,
  };

  componentDidMount() {
    const { submitCode, match, history } = this.props;
    const { offerCode } = match.params;
    submitCode(offerCode).then(() => {
      this.setState({ isReady: true });
      // don't destructure `this.props.error` we need the value
      // at the time the callback is called
      const result = this.props.error ? 'invalid-code' : 'start';
      const redirectTo = joinPathname([match.url, result]);
      history.replace(redirectTo);
    });
  }

  render() {
    const { match } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <article className={s.spinnerContainer}>
          <Spinner />
        </article>
      );
    }

    return (
      <article>
        <Route path={`${match.url}/invalid-code`} component={InvalidCode} />
        <Route path={`${match.url}/start`} component={Start} />
      </article>
    );
  }
}

const mapActions = { submitCode: actions.checkOfferCode };
export default connect(state => state, mapActions)(Offer);
