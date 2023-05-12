import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css";
import "./styles/responsive.css"
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from "./states/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
); 