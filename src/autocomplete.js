/*
  Autocomplete Component Prototype (definitely not production ready)
  ---
  Accepts a function that fetches data anytime the input value changes
  debounce interval can be provided to minimize API calls

  Handles keyboard shortcut only when the autocomplete search input has focus
  Hit up/down arrow to move the highlighted item (selection)
  Hit enter to simulate submission of the selected item (see console)
  Clicking on the item <li> also submits the corresponding item

  @flow
*/

import React, { PureComponent } from 'react';
import { compact, debounce, findIndex, flowRight, get, last } from 'lodash';
import s from './autocomplete.css';

const KEY_CODE: { [key: string]: number } = {
  arrowUp: 38,
  arrowDown: 40,
  enter: 13,
};

type Entry = {
  id: string,
  name: string,
};

type State = {
  results: Array<Entry>,
  searchTerm: string,
  selection: ?Entry,
};

// Use HOC rather than passing `props.endpoint` or `props.configuration`
// so the data dependencies at initialization time (config) and runtime (props) are clear
function configureAutocomplete({ fetchData, debounceInterval }) {
  return class Autocomplete extends PureComponent<*, State> {
    input: HTMLInputElement;
    state = {
      results: [],
      searchTerm: '',
      selection: null,
    };

    // TODO: improve `fetchData` API - so all related complexity
    //   about fetching data and performance concerns are
    //   co-located at the initialization
    fetchData = debounceInterval > 0
      ? debounce((searchTerm: string): void => {
        fetchData(searchTerm).then((results) => {
          this.setState({
            results,
            selection: results[0],
          });
        });
      }, debounceInterval)
      : fetchData;

    // eslint-plugin-flowtype should handle this - probably not up-to-date
    // with flow 0.53 yet
    // eslint-disable-next-line no-undef
    handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
      // TODO: productionize
      //   if event is `null` how it should fail here without crashing JS runtime
      const { value } = event.currentTarget;

      this.setState({ searchTerm: value });
      this.fetchData(value);
    };

    handleFocus = () => {
      document.addEventListener('keyup', this.handleKeyup);
    };

    handleBlur = () => {
      document.removeEventListener('keyup', this.handleKeyup);
    };

    handleKeyup = (event: KeyboardEvent): void => {
      const { results, selection } = this.state;
      const selectionIndex = findIndex(results, o => o.id === get(selection, 'id'));
      const lastIndex = results.length - 1;

      // eslint-disable-next-line default-case
      switch (event.keyCode) {
        case KEY_CODE.arrowUp:
          this.setState({
            selection: results[Math.max(selectionIndex - 1, 0)],
          });
          break;

        case KEY_CODE.arrowDown:
          this.setState({
            selection: results[Math.min(selectionIndex + 1, lastIndex)],
          });
          break;

        case KEY_CODE.enter:
          if (selection) {
            this.submitSelection(selection);
          }
          break;
      }
    };

    submitSelection = (selection: Entry) => {
      // eslint-disable-next-line no-console
      console.log(`%c Submit selection: ${selection.name}`, 'color: #ff69b4');
    };

    refInput = (node: HTMLInputElement) => {
      this.input = node;
    };

    render() {
      const { results, searchTerm, selection } = this.state;

      return (
        <div>
          <h3>Autocomplete</h3>
          <input
            type="search"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            // $FlowFixMe
            ref={this.refInput}
            value={searchTerm}
          />
          {Array.isArray(results) &&
            <ul className={s.menu}>
              {results.map((o) => {
                const isSelected = o.id === get(selection, 'id');

                return (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    key={o.id}
                    className={isSelected ? s.menu_item__selected : s.menu_item}
                    // TODO: for production, do not create new functions
                    //   in each re-render
                    onClick={() => this.submitSelection(o)}
                  >
                    <pre>
                      {JSON.stringify(o, null, 2)}
                    </pre>
                  </li>
                );
              })}
            </ul>}
        </div>
      );
    }
  };
}

// parse `id` inelegantly because the API does not provide it with the response
function parseIdInelegantlyBecauseResponseDoesNotProvide(urlWithId: string): string {
  return flowRight([last, compact])(urlWithId.split('/'));
}

const ExampleAutocomplete = configureAutocomplete({
  debounceInterval: 360,
  fetchData(searchTerm: string) {
    if (!searchTerm) {
      return Promise.resolve([]);
    }

    return fetch(
      // note: SWAPI limits 10,000 requests per day per IP
      `http://swapi.co/api/people/?search=${encodeURIComponent(searchTerm)}`
    )
      .then(res => res.json())
      .then(data =>
        data.results.map(o => ({
          id: parseIdInelegantlyBecauseResponseDoesNotProvide(o.url),
          name: o.name,
        }))
      );
  },
});

export default ExampleAutocomplete;
