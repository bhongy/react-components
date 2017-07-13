import React from 'react';
import { shallow } from 'enzyme';
import NumericInput from './numeric-input';

describe('Components: Numeric Input', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<NumericInput />);
  });

  // design as a thin wrapper around HTMLInputElement
  it('should export Numeric Input with "input" component', () => {
    expect(rendered.name()).toBe('input');
  });
});
