import React from 'react';
import { connect } from 'react-redux';
import { actions } from './store';
import { joinPathname } from './helpers';
import TextField from '../components/text-field';
import { RaisedButton as Button } from '../components/buttons';
import s from './enter-code.css';

class EnterCode extends React.PureComponent {
  state = { code: '' };

  componentDidMount() {
    this.props.resetOffer();
  }

  handleInputChange = (event) => {
    this.setState({ code: event.currentTarget.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { history, match } = this.props;
    const { code } = this.state;
    if (code) {
      const linkTo = joinPathname([match.url, code]);
      history.push(linkTo);
    }
  };

  render() {
    const { isFetching } = this.props;
    const { code } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleFormSubmit}>
        <div className={s.inputContainer}>
          <TextField
            label="Offer Code"
            value={code}
            onChange={this.handleInputChange}
            helperText="Please enter your offer code. Demo code: 37b1f90e03"
          />
        </div>
        <div className={s.buttonContainer}>
          <Button type="submit" disabled={code.length < 10 || isFetching}>
            Go
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(null, { resetOffer: actions.resetOffer })(EnterCode);
