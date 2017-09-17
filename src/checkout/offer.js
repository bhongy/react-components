import React from 'react';
import { connect } from 'react-redux';

class Offer extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    this.props.checkOfferCode(match.params.offerCode);
  }

  render() {
    const { match } = this.props;
    return <p>Check out for offer: {match.params.offerCode}</p>;
  }
}

const mapDispatchToProps = dispatch => ({
  checkOfferCode(code) {
    dispatch({ type: 'CHECK_OFFER_CODE', payload: code });
    setTimeout(() => {
      dispatch({ type: 'RECEIVE_OFFER_CODE', payload: 'no good' });
    }, 3000);
  },
});

export default connect(s => s, mapDispatchToProps)(Offer);
