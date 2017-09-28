import React from 'react';
import { shallow } from 'enzyme';
import { FlatButton, RaisedButton } from './buttons';

describe('Flat Button', () => {
  it('renders button', () => {
    expect(shallow(<FlatButton />).type()).toBe('button');
  });

  it('renders disabled button with correct props', () => {
    expect(shallow(<FlatButton disabled />)).toMatchSnapshot();
  });
});

describe('Raised Button', () => {
  it('renders button', () => {
    expect(shallow(<RaisedButton />).type()).toBe('button');
  });

  it('renders disabled button with correct props', () => {
    expect(shallow(<RaisedButton disabled />)).toMatchSnapshot();
  });
});
