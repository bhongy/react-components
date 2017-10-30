/* eslint-disable */
// @flow

import * as React from 'react';
import { get, memoize } from 'lodash';
import s from './tabs.css';

class TabControl extends React.PureComponent<*, *> {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    const { children, isActive } = this.props;
    const className = isActive ? s.control__active : s.control;
    return (
      <button onClick={this.handleClick} className={className}>
        {children}
      </button>
    );
  }
}

const TabPanel = ({ children, isActive }) => {
  const className = isActive ? s.panel__active : s.panel;
  return <div className={className}>{children}</div>;
};

export type Item = {
  id: string,
  label: React.Node,
  content: React.Node,
};

type Props = {
  data: Item[],
  // selectedId: string,
  // onChange: (nextId) => void,
};

type State = {
  selectedId: string,
};

// ! brittle: couple to React element structure and CSS !
const getPanelOffset = memoize((i: number): { transform: string } => {
  // TODO: use a css-in-js lib for:
  //   1) better perf
  //   2) handle vendor prefixes
  //   3) improve coherence (colocate all css related to "switching" panels)
  return { transform: `translateX(-${100 * i}%)` };
});

class Tabs extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedId: get(props, 'data.0.id', ''),
    };
  }

  handleControlClick = (nextId: string) => {
    this.setState({ selectedId: nextId });
  };

  render() {
    const { data } = this.props;
    if (data.length < 1) {
      return null;
    }

    const { selectedId } = this.state;
    const i = data.findIndex(item => item.id === selectedId);
    return (
      <div>
        <div className={s.controls_wrapper}>
          {data.map(o => (
            <TabControl
              key={o.id}
              id={o.id}
              onClick={this.handleControlClick}
              isActive={o.id === selectedId}
            >
              {o.label}
            </TabControl>
          ))}
        </div>
        <div className={s.panels_wrapper}>
          <div className={s.panels_track} style={getPanelOffset(i)}>
            {data.map(o => (
              <TabPanel key={o.id} isActive={o.id === selectedId}>
                {o.content}
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
