import React, { Fragment } from 'react';
import LinearProgress from './linear-progress';
import { FlatButton as Button } from './buttons';
import s from './linear-progress.demo.css';

const Card = ({ children }) => <div className={s.card}>{children}</div>;

const noop = () => {};
class Interval extends React.PureComponent {
  static defaultProps = {
    onUnmount: noop,
  };

  intervalId = null;

  componentDidMount() {
    const { callback, interval } = this.props;
    this.intervalId = setInterval(callback, interval);
  }

  // TODO: check the timing of callback fire, unmount
  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.props.onUnmount();
  }

  render() {
    return null;
  }
}

class SimpleUseCaseDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: props.completeAt * 0.25, // just to show a bit initially
    };
  }

  handleLoading = () => {
    this.setState((prevState) => {
      const { completeAt } = this.props;
      const delta = Math.random() * (completeAt / 2);
      const nextValue = prevState.value + delta;
      if (nextValue < completeAt) {
        return { value: nextValue };
      }
      return { value: completeAt, isLoading: false };
    });
  };

  handleButtonClick = () => {
    this.setState({ isLoading: true, value: 0 });
  };

  render() {
    const { completeAt } = this.props;
    const { isLoading, value } = this.state;
    return (
      <Fragment>
        <Card>
          <header className={s.header}>
            <LinearProgress percentCompleted={value / completeAt} />
          </header>
        </Card>
        <Button className={s.button} onClick={this.handleButtonClick}>
          Load
        </Button>
        {isLoading &&
          <Interval
            callback={this.handleLoading}
            interval={300}
            onUnmount={() => console.log('Loading is done!')}
          />
        }
      </Fragment>
    );
  }
}

class LinearProgressDemo extends React.PureComponent {
  state = { v: 1.6 };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ v: 2.3 });
    }, 1000);
  }

  render() {
    return (
      <div>
        <h3>LinearProgress</h3>
        <div className={s.demosContainer}>
          <SimpleUseCaseDemo completeAt={300} />
          <Card>
            <header className={s.header}>
              <LinearProgress percentCompleted={this.state.v} />
            </header>
            <p>Invalid proptype.</p>
          </Card>
          <Card>
            <footer className={s.footer}>
              <LinearProgress percentCompleted={0.35} />
            </footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default LinearProgressDemo;
