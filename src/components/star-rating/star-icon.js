// @flow

import React from 'react';
import s from './star-icon.css';

function round(num: number, decimals: number): number {
  const d = 10 ** decimals;
  return Math.round(num * d) / d;
}

function toPercentString(decimal: number): string {
  return `${round(decimal * 100, 2)}%`;
}

// memory efficient: re-use these data without
// creating new object, glyph string for each instance
const iconProps = {
  viewBox: '0 0 100 100',
  role: 'presentation',
  'aria-hidden': 'true',
  focusable: 'false',
};

const glyph =
  'M66.4 30.6s-7.3-17.3-12-25.8-8.1 0-8.1 0L33.6 30.6l-29 4.5c-7.4 3.6-1.3 8.8-1.3 8.8L23.1 64l-4.9 29.6c-1 8.8 7.7 4 7.7 4L50 84.8 74.7 98c8.4 4 6.8-4.9 6.8-4.9l-4.3-28.8 19.3-20.5c6.4-6.3-1.7-8.4-1.7-8.4l-28.4-4.8z';

// as an icon, all you have to do is:
//   1) render conditionally based on the value
//   2) wire the event handlers
class StarIcon extends React.PureComponent<*, *> {
  // TODO: figure out a better ergonomic so users don't have to "wire"
  //   handlers to `StarIcon` renderer themselves
  //   any "wiring" needs documentation and risk confusion, using it wrong
  // TODO: fix bug when style stars with space apart using margin
  //   hovering over one star to another horizotally is disjointed
  //   showing flicker of `hoveredRating: null` state
  handleClick = () => this.props.onClick(this.props.rating);
  handleMouseEnter = () => this.props.onMouseEnter(this.props.rating);
  handleMouseLeave = () => this.props.onMouseEnter();

  render() {
    const { fill } = this.props;
    const iconClassName =
      // eslint-disable-next-line no-nested-ternary
      fill <= 0 ? s.icon__empty : fill >= 1 ? s.icon__filled : s.icon__partial;

    const handlers = {
      onClick: this.handleClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

    // render partial star
    if (fill > 0 && fill < 1) {
      return (
        <div {...handlers} className={iconClassName}>
          <svg {...iconProps} className={s.glyph__empty}>
            <path d={glyph} />
          </svg>
          <svg
            {...iconProps}
            className={s.glyph__filled}
            width={toPercentString(fill)}
            preserveAspectRatio="xMinYMin slice"
          >
            <path d={glyph} />
          </svg>
        </div>
      );
    }

    return (
      <svg {...iconProps} {...handlers} className={iconClassName}>
        <path d={glyph} />
      </svg>
    );
  }
}

export default StarIcon;
