// @flow

/*
  With this design. We can package the core library without overloading it with
  view components (e.g. StarIcon) but include the views in npm package
  so users can use pick & choose to optimize their bundle size like

  ```
  import customizeStarRating
  import StarIcon from 'star-rating/star-icon';
  ```
*/

import * as React from 'react';

// TODO: type range of RatingIcon `props.value` [0, 1]
export type SetRatingHandler = (rating: number) => void;
type UnsetRatingHandler = () => void;
type RatingIconComponent = React.ComponentType<{
  rating: number,
  fill: number,
  onClick: SetRatingHandler,
  onMouseEnter: SetRatingHandler,
  onMouseLeave: UnsetRatingHandler,
}>;

type Config = {
  maxRating: number,
  RatingIcon: RatingIconComponent,
  // accepts custom Wrapper component
  // main use case is to manage space between stars
  // (e.g. using `:not(:first-of-type)` selector) -> !!!couple to structure!!!
  Wrapper?: React.ElementType,
};

type Props = {
  rating: number,
  // Clicking on each star (submit rating)
  onRatingClick?: SetRatingHandler,
  // `readonly` gives user power to modify capability to submit at runtime
  // they can set it to always true to just display the rating without interaction
  // they can also set it to true after the first submission
  // to "disable" further submissions (and can toggle it back on submission failure)
  //
  // TODO: re-evaluate if this is a good idea (convenient for "disable all", hover, cursor)
  //   but it could also lead to confusion (onClick is passed by nothing happens) ... maybe
  readonly?: boolean,
};

type State = {
  hoveredRating: ?number,
};

// TODO: move this to the proper place
declare var __DEV__: ?boolean;
/*
  input: rating->3.33, maxRating->5
  outout: [1, 1, 1, 0.33, 0]
*/
function convertRatingToFillValues(rating: number, maxRating: number): number[] {
  const isInvalidRange = rating < 0 || rating > maxRating;
  if (__DEV__ && isInvalidRange) {
    // eslint-disable-next-line no-console, max-len
    console.warn(`[StarRating] rating is outside the valid range (0 to ${maxRating} inclusive). Received: ${rating}.`);
  }

  // No IE support for Array.prototype.fill
  const values = new Array(maxRating).fill(0);
  let remainder = rating;
  let i = 0;
  while (remainder > 0 && i < maxRating) {
    values[i] = remainder < 1 ? remainder : 1;
    i += 1;
    remainder -= 1;
  }
  return values;
}

// TODO: separate the "readonly" version and the interactive version into
//   two components since in many cases, they are used very differently
//   having a clear distinction (narrow) at the component level reduces mental overhead
//   of users of the components ("what type I'm working with, things that it could do")
//   e.g. allowing both 1) clicking on the entire component (onClick) to link to Reviews page
//   and 2) clicking on a star to submit `myRating` is bad UX (if even possible)
//
//   the interactive version could delegates the "view" concerns to the "readonly" version
//   separating the display from interaction concerns will also make the runtime
//   more efficient and the extending, fixing more focused

// TODO: use React.Children to avoid needing the icon to "wire" click handler?

// Alternatively, take "renderer" function instead of RatingIcon component
//   ^ more power/flexibility but harder to use, more self wiring required

function customizeStarRating(config: Config) {
  const { maxRating, RatingIcon, Wrapper = 'div' } = config;
  return class StarRating extends React.PureComponent<Props, State> {
    state = {
      hoveredRating: null,
    };

    handleRatingClick: SetRatingHandler = (rating) => {
      const { readonly, onRatingClick } = this.props;
      if (!readonly && typeof onRatingClick === 'function') {
        onRatingClick(rating);
      }
    };

    handleRatingMouseEnter: SetRatingHandler = (rating) => {
      this.setState({ hoveredRating: rating });
    };

    handleRatingMouseLeave: UnsetRatingHandler = () => {
      this.setState({ hoveredRating: null });
    };

    render() {
      const { hoveredRating } = this.state;
      const fillValues = convertRatingToFillValues(hoveredRating || this.props.rating, maxRating);

      return (
        <Wrapper>
          {fillValues.map((fill, index) => {
            const itemRating = index + 1;
            return (
              <RatingIcon
                key={itemRating}
                rating={itemRating} // for setting, submitting a new rating
                fill={fill} // for displaying Rating item (between 0-1)
                onClick={this.handleRatingClick}
                onMouseEnter={this.handleRatingMouseEnter}
                onMouseLeave={this.handleRatingMouseLeave}
              />
            );
          })}
          <pre>state.hoveredRating = {this.state.hoveredRating || 'null'}</pre>
        </Wrapper>
      );
    }
  };
}

export default customizeStarRating;
