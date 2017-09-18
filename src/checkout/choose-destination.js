import React from 'react';
import { connect } from 'react-redux';
import { actions } from './store';
import { FlatButton, RaisedButton } from '../components/buttons';

const destinationsForContinent = {
  '': ['Seattle', 'San Francisco', 'New York City'],
  europe: ['Paris', 'Cinque Terre', 'Zermatt', 'Geneva'],
};

class Option extends React.PureComponent {
  handleClick = () => {
    this.props.onSelect(this.props.children);
  };

  render() {
    const { isActive, children } = this.props;
    const Button = isActive ? RaisedButton : FlatButton;
    return <Button onClick={this.handleClick}>{children}</Button>;
  }
}

const ChooseDestination = ({ continent, selectedDestination, chooseDestination }) => {
  const destinations = destinationsForContinent[continent];
  return (
    <article>
      <h1>Destination</h1>
      <p>{continent ? `continent: ${continent}` : '(Domestic)'}</p>
      {Array.isArray(destinations) &&
        destinations.map(dest => (
          <Option key={dest} isActive={dest === selectedDestination} onSelect={chooseDestination}>
            {dest}
          </Option>
        ))}
    </article>
  );
};

const mapState = state => ({ continent: state.continent, selectedDestination: state.destination });
const mapActions = { chooseDestination: actions.chooseDestination };
export default connect(mapState, mapActions)(ChooseDestination);
