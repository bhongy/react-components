// @flow
/* eslint-disable react/no-multi-comp */

import * as React from 'react';
import customizeStarRating from './star-rating';
import type { SetRatingHandler } from './star-rating';
import StarIcon from './star-icon';
import s from './star-rating.demo.css';

// rendering of the icon is completely in control of the user
// we just pass the value for each icon between 0 to 1 (inclusively)
// user can choose to render completely different icons or choose to
// use any techniques to render "partial", "filled", "empty"
//
// didn't use callback children because I think this API is simpler
// and less "wiring" that could go wrong
const Wrapper = ({ children }) => <div className={s.wrapper}>{children}</div>;
const StarRating = customizeStarRating({ maxRating: 5, RatingIcon: StarIcon, Wrapper });

class ChangeDemoRatingOption extends React.PureComponent<*, *> {
  handleClick = () => this.props.onClick(this.props.rating);
  render() {
    const { rating, isActive } = this.props;
    return (
      <button className={isActive ? s.button__active : s.button} onClick={this.handleClick}>
        {rating}
      </button>
    );
  }
}

class StarRatingDemo extends React.PureComponent<*, *> {
  state = {
    rating: 1.2,
  };

  handleRatingClick: SetRatingHandler = (rating) => {
    // eslint-disable-next-line no-console
    console.log(`Submit rating for "demo" with value: ${rating}`);
  };

  demoRatings = [-1, 0, 1, 1.2, 2.5, 3.3, 4.8, 5, 6];
  handleDemoRatingClick = (rating: number) => this.setState({ rating });

  render() {
    const { rating } = this.state;
    return (
      <div>
        <h3>StarRating</h3>
        <StarRating rating={rating} onRatingClick={this.handleRatingClick} />
        <p>Change Demo Rating to:</p>
        <div>
          {this.demoRatings.map(val => (
            <ChangeDemoRatingOption
              key={val}
              rating={val}
              onClick={this.handleDemoRatingClick}
              isActive={rating === val}
            />
          ))}
        </div>
        <pre>state.rating = {rating}</pre>
      </div>
    );
  }
}

export default StarRatingDemo;
