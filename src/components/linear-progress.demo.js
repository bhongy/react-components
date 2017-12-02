import React, { Fragment } from 'react';
import LinearProgress from './linear-progress';
import { FlatButton as Button } from './buttons';
import s from './linear-progress.demo.css';

const Card = ({ children }) => (
  <div className={s.card}>{children}</div>
);

const Demo = ({ children }) => (
  <Fragment>
    <Card>
      <header className={s.header}>
        <LinearProgress percentCompleted={60} />
      </header>
      {children}
    </Card>
    <Button>Load</Button>
  </Fragment>
);

class LinearProgressDemo extends React.PureComponent {
  state = {};
  render() {
    return (
      <div>
        <h3>LinearProgress</h3>
        <div className={s.demosContainer}>
          <Demo />
        </div>
      </div>
    );
  }
}

export default LinearProgressDemo;
