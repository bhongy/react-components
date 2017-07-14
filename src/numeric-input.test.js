// @flow

import React from 'react';
import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import type { State } from './numeric-input';
import NumericInput, {
  truncateInputValueToPrecision as handlePrecision,
} from './numeric-input';

const createInputEvent = (value: string, name?: string) => ({
  currentTarget: { name, value },
});

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

  describe('... handle input `onChange` to component state', () => {
    let onChangeHandler;

    beforeEach(() => {
      onChangeHandler = jest.fn();
      rendered = shallow(<NumericInput name="Gdańsk" onChange={onChangeHandler} />);
    });

    it('should call `props.onChange` when a numeric input value is provided', () => {
      const inputName: string = rendered.find('input').prop('name');

      rendered.simulate('change', createInputEvent('1921.856', inputName));

      expect(onChangeHandler).toHaveBeenCalledTimes(1);
      expect(onChangeHandler).toHaveBeenCalledWith({
        name: 'Gdańsk',
        value: 1921.856,
      });
    });

    it('should ignore a non-numeric input value', () => {
      const initialState: State = rendered.state();

      rendered.simulate('change', createInputEvent('a'));

      // do not create new state object
      // use `toBe` to check identity
      expect(rendered.state()).toBe(initialState);

      // do not call the `onChange` handler
      expect(onChangeHandler).toHaveBeenCalledTimes(0);
    });

    it('should not wipe the current numeric value when receiving a non-numeric input value', () => {
      rendered.simulate('change', createInputEvent('01'));

      expectResult(rendered).toEqual({
        state: 1,
        inputValue: '01',
      });

      expect(onChangeHandler).toHaveBeenCalledTimes(1);

      const stateBeforeInvalidValue: State = rendered.state();

      // type in a non-numeric value "a"
      rendered.simulate('change', createInputEvent('01a'));

      // the previous state is not wiped
      expectResult(rendered).toEqual({
        state: 1,
        inputValue: '01',
      });

      // do not create a new state object
      expect(rendered.state()).toBe(stateBeforeInvalidValue);

      // do not call the `onChange` handler
      expect(onChangeHandler).toHaveBeenCalledTimes(1);
    });

    it('should allow one trailing period', () => {
      rendered.simulate('change', createInputEvent('12.'));

      expect(onChangeHandler).toHaveBeenCalledTimes(1);
      expectResult(rendered).toEqual({
        state: 12,
        inputValue: '12.',
      });
    });

    it('should allow numeric inputs after period', () => {
      rendered.simulate('change', createInputEvent('83.100'));

      expect(onChangeHandler).toHaveBeenCalledTimes(1);
      expectResult(rendered).toEqual({
        state: 83.1,
        inputValue: '83.100',
      });

      rendered.simulate('change', createInputEvent('83.1000'));

      expect(onChangeHandler).toHaveBeenCalledTimes(2);
      expectResult(rendered).toEqual({
        state: 83.1,
        inputValue: '83.1000',
      });
    });

    it('should ignore other period inputs after the first one', () => {
      rendered.simulate('change', createInputEvent('72.'));

      expectResult(rendered).toEqual({
        state: 72,
        inputValue: '72.',
      });

      rendered.simulate('change', createInputEvent('72..'));

      // unchanged
      expectResult(rendered).toEqual({
        state: 72,
        inputValue: '72.',
      });

      rendered.simulate('change', createInputEvent('72.1'));

      expectResult(rendered).toEqual({
        state: 72.1,
        inputValue: '72.1',
      });

      rendered.simulate('change', createInputEvent('72.1.0'));

      // unchanged
      expectResult(rendered).toEqual({
        state: 72.1,
        inputValue: '72.1',
      });
    });
  });

  describe('... handle precision (function)', () => {
    it('should treat all non-positive integer values as if precision is not provided', () => {
      [
        2.9,
        -2,
        NaN,
        Infinity,
        '2',
        undefined,
        null,
        { foo: 2 },
      ].forEach((precision) => {
        const val = '48.123456789';

        // $FlowExpectError
        expect(handlePrecision(val, precision)).toBe(val);
      });
    });

    it('should handle integer inputValue for precision more than 0 correctly', () => {
      const precision = 5;

      expect(handlePrecision('300', precision)).toBe('300');
      expect(handlePrecision('300.123456789', precision)).toBe('300.12345');
    });

    it('should not allow trailing period for precision 0', () => {
      const precision = 0;

      expect(handlePrecision('90.', precision)).toBe('90');
      expect(handlePrecision('65.360', precision)).toBe('65');
    });

    it('should allow one trailing period for precision more than 0', () => {
      const precision = 2;

      expect(handlePrecision('300.', precision)).toBe('300.');
    });
  });

  describe('... handle precision (in component)', () => {
    /*
      Known issue: precision is ignored during initialization
      because I'm not sure what's the good, expected behavior
      - i.e. we might not want to change the controlled state
        on mount (only do so on input change) or maybe we do?
    */

    it('should not handle precision if precision is not provided', () => {
      rendered.simulate('change', createInputEvent('89.99500000000000000'));

      expectResult(rendered).toEqual({
        state: 89.995,
        inputValue: '89.99500000000000000',
      });
    });

    it('should limit the number of decimals in both state and inputValue to the precision', () => {
      rendered = shallow(<NumericInput precision={2} />);
      rendered.simulate('change', createInputEvent('63.9876'));

      expectResult(rendered).toEqual({
        state: 63.98,
        inputValue: '63.98',
      });
    });

    it('should ignore further input once the number of decimals reaches the precision', () => {
      rendered = shallow(<NumericInput precision={1} />);
      rendered.simulate('change', createInputEvent('77.1'));

      expectResult(rendered).toEqual({
        state: 77.1,
        inputValue: '77.1',
      });

      const state: State = rendered.state();

      rendered.simulate('change', createInputEvent('77.12'));

      expectResult(rendered).toEqual({
        state: 77.1,
        inputValue: '77.1',
      });

      // should ignore and do not change state
      expect(rendered.state()).toBe(state);
    });

    it('should only allow one period when precision is more than 0', () => {
      rendered = shallow(<NumericInput precision={2} />);
      rendered.simulate('change', createInputEvent('10.12'));

      expectResult(rendered).toEqual({
        state: 10.12,
        inputValue: '10.12',
      });

      rendered.simulate('change', createInputEvent('10.12.'));

      expectResult(rendered).toEqual({
        state: 10.12,
        inputValue: '10.12',
      });
    });
  });
});
