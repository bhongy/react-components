// @flow

import React from 'react';
import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import type { State } from './numeric-input';
import NumericInput from './numeric-input';

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
});
