// @flow

import React from 'react';
import ReactDOM from 'react-dom';
// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css';

import App from './app';

const rootElement = document.getElementById('react-root');
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <App />
      </Router>
    </AppContainer>,
    rootElement
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  // for Webpack 2, do not need to re-import module for HMR
  // https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
  // $FlowFixMe: how to annotate types for module, module.hot
  module.hot.accept('./app', renderApp);
}
