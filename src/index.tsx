import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './app';

const container = document.getElementById('root');
const root = createRoot(container!); // Use a nova API createRoot

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
