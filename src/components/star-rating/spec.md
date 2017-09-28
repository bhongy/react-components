#Star Rating Component

##Features:
[X] flexible number of stars -> use HOC to "configure" `maxRating`
[X] render max to `maxRating` in `__DEV__` warn if rating is < 0 or > `maxRating`
[X] flexible styling API (can be provided with any css-in-js or CSS Modules)
  - how the stars look -> use HOC to "configure" `Star` component to use (handle empty vs filled stars)
  - size of the stars
  - spacing between stars
[\] easy to use as "read-only" stars (no hover, submission) -> `props.readonly` (boolean)
[TBD] accepts onClick handler for the whole rating (e.g. link to "Reviews" page)

- when user did not submit rate
  [ ] display average rate (across users) on idle `crowdRating`

- when user is submitting rate
  [ ] display "intended" rate `myRating` to submit on hover (highlight up to the hovered star)
  [ ] clicking on a star will submit the rate for that star ... behavior submitting, submit success, submit failure
  [ ] [optional] show indication of "submitting"

- when user submitted rate
  [ ] no longer show "intended" rate to submit on hover
  [ ] display user's rate `myRating`
  [ ] [optional] an API to display average rate (across users) (compare to user's submitted rate)
   ... what's the good, expected UX ?



... brain dump
- id for the rating set (identify entity it belongs to)
- on submit, on submit success, on submit failure hooks
- do we want to allow "changing" the ratings (multiple submit, mutative)
- on rate changes
- previous value, next value
