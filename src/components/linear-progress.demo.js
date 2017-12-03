import React, { Fragment } from 'react';
import LinearProgress from './linear-progress';
import { FlatButton as Button } from './buttons';
import s from './linear-progress.demo.css';

const Card = ({ children }) => <div className={s.card}>{children}</div>;

class LinearProgressDemo extends React.PureComponent {
  state = { v: 160 };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ v: 230 });
    }, 1000);
  }

  render() {
    return (
      <div>
        <h3>LinearProgress</h3>
        <div className={s.demosContainer}>
          <Card>
            <header className={s.header}>
              <LinearProgress percentCompleted={60} />
            </header>
          </Card>
          <Button className={s.button}>Load</Button>
          <Card>
            <header className={s.header}>
              <LinearProgress percentCompleted={this.state.v} />
            </header>
            <p>Invalid proptype.</p>
          </Card>
          <Card>
            <footer className={s.footer}>
              <LinearProgress percentCompleted={35} />
            </footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default LinearProgressDemo;
