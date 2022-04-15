import { render } from 'react-dom';
import App from '@view/app';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@store/store';
import { CommonContextProvider } from '@services/hooks/network';

const RootEl: HTMLElement | null = document.getElementById('root');

render(
  <Provider store={store}>
    <CommonContextProvider>
      <App />
    </CommonContextProvider>
  </Provider>,
  RootEl,
);