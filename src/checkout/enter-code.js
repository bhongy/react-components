import React from 'react';
import TextField from '../text-field';
import { RaisedButton as Button } from '../buttons';
import s from './enter-code.css';

class EnterCode extends React.PureComponent {
  state = { value: '' };

  handleInputChange = (event) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.value, event.currentTarget);
  };

  render() {
    return (
      <div className={s.page}>
        <form className={s.form} onSubmit={this.handleFormSubmit}>
          <div className={s.inputContainer}>
            <TextField
              label="Offer Code"
              value={this.state.value}
              onChange={this.handleInputChange}
              helperText="Please enter your offer code. Demo code: 37b1f90e03"
            />
          </div>
          <div className={s.buttonContainer}>
            <Button primary type="submit">
              Go
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default EnterCode;
