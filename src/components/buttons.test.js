import React from 'react';
import { shallow } from 'enzyme';
import { RaisedButton } from './buttons';

describe('Raised Button', () => {
  it('renders button', () => {
    expect(shallow(<RaisedButton />).type()).toBe('button');
  });
});
