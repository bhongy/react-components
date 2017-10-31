// @flow

import * as React from 'react';
import { get, mapValues, memoize } from 'lodash';
import { Motion, spring } from 'react-motion';
import s from './tabs.css';

class TabControl extends React.PureComponent<*, null> {
  componentWillUnmount() {
    this.props.onUnmount(this.props.id);
  }

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  ref = (element) => {
    this.props.refElement(this.props.id, element);
  };

  render() {
    const { children, isActive } = this.props;
    const className = isActive ? s.control__active : s.control;
    return (
      <button onClick={this.handleClick} className={className} ref={this.ref}>
        {children}
      </button>
    );
  }
}

const SPRING_CONFIG = { stiffness: 860, damping: 48 };
const TabControlIndicator = (props: {| left: number, width: number |}) => (
  <Motion style={mapValues(props, v => spring(v, SPRING_CONFIG))}>
    {interpolatingStyle => (
      // TODO: evaluate if using transform: translate3d would actually be faster than `left`
      //   even when positioning absolutely
      <span className={s.control_indicator} style={interpolatingStyle} />
    )}
  </Motion>
);

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
  // TODO: make possible to use as controlled or uncontrolled component
  // selectedId?: string,
  // onChange?: (nextId: string) => void,
};

type State = {
  selectedId: string,
};

const getPanelOffset = memoize((x: number): { transform: string } =>
  // TODO: colocate all css relating to "switching" panels together
  ({ transform: `translateX(-${100 * x}%)` }));

// eslint-disable-next-line react/no-multi-comp
class Tabs extends React.PureComponent<Props, State> {
  // TODO: specify type more strictly -> wrapper element from TabControl component
  controlElements: Map<string, HTMLElement>;

  constructor(props: Props) {
    super(props);
    this.controlElements = new Map(); // keep track of DOM nodes
    this.state = {
      // keep track of id might be better than the index
      // because `props.data` could be dynamic and the index
      // for the same `id` could change (edge-case?)
      selectedId: get(props, 'data.0.id', ''),
    };
  }

  componentDidMount() {
    // TODO: don't hack - how to re-render indicator when all Controls are ref'ed
    //   and we know the correct size of the first control
    //   currently, only work if schedule for next tick
    window.setTimeout(() => this.forceUpdate(), 0);
  }

  refControlElement = (id: string, element: HTMLElement) => {
    this.controlElements.set(id, element);
  };

  handleControlClick = (nextId: string) => {
    this.setState({ selectedId: nextId });
  };

  handleControlUnmount = (id: string) => {
    this.controlElements.delete(id);
  };

  render() {
    const { data } = this.props;
    if (data.length < 1) {
      return null;
    }

    const { selectedId } = this.state;
    const activeControlElement = this.controlElements.get(selectedId);
    const activeIndex = data.findIndex(item => item.id === selectedId);
    return (
      <div>
        <div className={s.controls_wrapper}>
          {data.map(o => (
            <TabControl
              key={o.id}
              id={o.id}
              onClick={this.handleControlClick}
              isActive={o.id === selectedId}
              refElement={this.refControlElement}
              onUnmount={this.handleControlUnmount}
            >
              {o.label}
            </TabControl>
          ))}
          {activeControlElement && (
            <TabControlIndicator
              // always re-query for element's size because:
              //   1) no need to listen to resize (imperative)
              //   2) element content can change via props without window resizing
              //      so this approach is safer
              // also cannot rely only on componentWillReceiveProps
              // because other element resizing/window resizing can cause
              // the size, position of the element to change
              left={activeControlElement.offsetLeft}
              width={activeControlElement.offsetWidth}
            />
          )}
        </div>
        <div className={s.panels_wrapper}>
          <div className={s.panels_track} style={getPanelOffset(activeIndex)}>
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
