import React from 'react';
import ReactDOM from 'react-dom';
// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';
import App from './app';

const rootElement = document.getElementById('react-root');
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootElement,
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  // for Webpack 2, do not need to re-import module for HMR
  // https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
  module.hot.accept('./app', renderApp);
}
