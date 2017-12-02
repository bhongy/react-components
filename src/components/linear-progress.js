// @flow
import * as React from 'react';
// import { Motion, spring } from 'react-motion';
import s from './linear-progress.css';

// class ProgressFill extends React.PureComponent<*, *> {
//   state = {};
//   render() {
//     return null;
//   }
// }

type Props = {
  percentCompleted: number,
  height?: number,
};

class LinearProgress extends React.PureComponent<Props, {}> {
  // static PropTypes = {};
  static defaultProps = {
    height: 4,
  };

  state = {};

  render() {
    const { height, percentCompleted } = this.props;
    const width = `${percentCompleted}%`;
    return (
      <div className={s.container}>
        <i className={s.bar} style={{ width, height }} />
      </div>
    );
  }
}

export default LinearProgress;
