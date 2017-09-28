import React from 'react';
import { shallow } from 'enzyme';
import { FlatButton, RaisedButton } from './buttons';

describe('Flat Button', () => {
  it('renders default button', () => {
    expect(shallow(<FlatButton />)).toMatchSnapshot();
  });

  it('renders disabled button', () => {
    expect(shallow(<FlatButton disabled />)).toMatchSnapshot();
  });
});

describe('Raised Button', () => {
  it('renders default button', () => {
    expect(shallow(<RaisedButton />)).toMatchSnapshot();
  });

  it('renders disabled button', () => {
    expect(shallow(<RaisedButton disabled />)).toMatchSnapshot();
  });
});
