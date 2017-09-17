// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './header.css';

const navLinkProps = {
  className: s.navLink,
  activeClassName: s.navLink__active,
};

const Header = () => (
  <header className={s.header}>
    <div className={s.content}>
      <span className={s.label}>Demos:</span>
      <NavLink {...navLinkProps} to="/" exact>Components</NavLink>
      <NavLink {...navLinkProps} to="/checkout">Check Out</NavLink>
    </div>
  </header>
);

export default Header;
