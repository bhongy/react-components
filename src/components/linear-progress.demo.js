import React, { Fragment } from 'react';
import LinearProgress from './linear-progress';
import { FlatButton as Button } from './buttons';
import s from './linear-progress.demo.css';

const Card = ({ children }) => <div className={s.card}>{children}</div>;

class SimpleUseCaseDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.intervalId = null;
    this.state = { isLoading: false, value: 0 };
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startLoading = () => {
    this.setState({ isLoading: true, value: 0 });

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.setState(prevState => {
        const { completeAt } = this.props;
        const delta = Math.random() * (completeAt / 2);
        const nextValue = prevState.value + delta;
        if (nextValue < completeAt) {
          return { value: nextValue };
        }
        return { value: 300, isLoading: false };
      });
    }, 600);
  };

  componentDidUpdate(_, prevState) {
    if (prevState.isLoading && !this.state.isLoading) {
      clearInterval(this.intervalId);
      console.log('Done!');
      // this.props.onLoadingDidEnd();
    }
  }

  render() {
    const { completeAt } = this.props;
    const { value } = this.state;
    return (
      <Fragment>
        <Card>
          <header className={s.header}>
            <LinearProgress percentCompleted={value / completeAt} />
          </header>
        </Card>
        <Button className={s.button} onClick={this.startLoading}>
          Load
        </Button>
      </Fragment>
    );
  }
}

class LinearProgressDemo extends React.PureComponent {
  state = { v: 1.60 };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ v: 2.30 });
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
