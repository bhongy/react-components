import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { last } from 'lodash';
import { RaisedButton } from '../components/buttons';

class SelectAndRoute extends React.PureComponent {
  static defaultProps = { Button: RaisedButton };

  handleClick = (event) => {
    event.preventDefault();
    const {
      history,
      match,
      next,
      dispatch,
      action,
    } = this.props;
    const current = last(match.url.split('/'));
    history.push(match.url.replace(current, next));

    if (action) {
      dispatch(action);
    }
  };

  render() {
    const { Button } = this.props;
    return <Button onClick={this.handleClick}>{this.props.children}</Button>;
  }
}

export default withRouter(connect(null, dispatch => ({ dispatch }))(SelectAndRoute));
