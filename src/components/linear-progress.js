// @flow
import * as React from 'react';
import { once } from 'lodash';
// import { Motion, spring } from 'react-motion';
import s from './linear-progress.css';

// class ProgressFill extends React.PureComponent<*, *> {
//   state = {};
//   render() {
//     return null;
//   }
// }

type Props = {
  // choose to use `percentCompleted` rather than `value` and `max`
  // so that when the `percentCompleted` is out of [0, 100] range
  // we know it's the logic that calculated percentage outside
  // of this component (more explicit, less magical)
  // hence by design - this component is dumb and takes value [0, 100]
  percentCompleted: number,
  height?: number,
};

const PropTypes = {
  inRange(min, max) {
    // this will log the warning once for this component
    // so we don't flood your console with the same proptype warnings
    const warn = once((propName, value) =>
      new Error(`"${propName}". Expect between [${min}, ${max}] but received: ${value}`));

    return (props, propName) => {
      const v = props[propName];
      // TODO: this is [min, max] but generally people expect [min, max) (exclude max)
      if (v < min || v > max) {
        return warn(propName, v);
      }
    };
  },
};

class LinearProgress extends React.PureComponent<Props, {}> {
  static propTypes = { percentCompleted: PropTypes.inRange(0, 100) };
  static defaultProps = {
    height: 4,
  };

  state = {};

  render() {
    const { height } = this.props;
    const percentCompleted = Math.max(0, Math.min(100, this.props.percentCompleted));
    // const width = `${percentCompleted}%`;
    const transform = `scaleX(${percentCompleted / 100})`;
    return (
      <div className={s.container}>
        <i className={s.bar} style={{ transform, height }} />
      </div>
    );
  }
}

export default LinearProgress;
