// @flow

import React from 'react';
import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import NumericInput from './numeric-input';

const expectResult = (rootWrapper: ShallowWrapper) =>
  expect({
    state: rootWrapper.state('value'),
    inputValue: rootWrapper.find('input').prop('value'),
  });

describe('Components: Numeric Input', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<NumericInput />);
  });

  // design as a thin wrapper around HTMLInputElement
  it('should export Numeric Input with "input" component', () => {
    expect(rendered.name()).toBe('input');
  });

  describe('... handle initialValue to component state', () => {
    it('should treat non-numeric values as if `initialValue` is not provided', () => {
      [
        undefined,
        null,
        { a: 'foo' },
        ['1'],
        '',
        'bar',
        true,
        false,
      ].forEach((value) => {
        // $FlowExpectError
        rendered = shallow(<NumericInput initialValue={value} />);

        expectResult(rendered).toEqual({
          state: null,
          inputValue: '',
        });
      });
    });

    it('should treat NaN and Infinity as if `initialValue` is not provided', () => {
      [NaN, Infinity, -Infinity].forEach((value) => {
        rendered = shallow(<NumericInput initialValue={value} />);

        expectResult(rendered).toEqual({
          state: null,
          inputValue: '',
        });
      });
    });

    it('should take a number and pass it to the input as a string', () => {
      rendered = shallow(<NumericInput initialValue={13.92} />);

      expectResult(rendered).toEqual({
        state: 13.92,
        inputValue: '13.92',
      });
    });
  });
});
