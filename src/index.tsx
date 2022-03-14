import { render } from 'react-dom';
import App from '@view/app';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@store/store';
import { Web3ContextProvider } from '@services/hooks';

const RootEl: HTMLElement | null = document.getElementById('root');

render(
  <Provider store={store}>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </Provider>,
  RootEl,
);