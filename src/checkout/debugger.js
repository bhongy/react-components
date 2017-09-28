import React from 'react';
import { connect } from 'react-redux';
import s from './debugger.css';

const Debugger = ({ applicationState }) => (
  <div className={s.container}>
    <pre>appState = {JSON.stringify(applicationState, null, 2)}</pre>
  </div>
);

export default connect(state => ({ applicationState: state }))(Debugger);
