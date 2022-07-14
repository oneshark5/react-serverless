import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import { BrowserRouter } from 'react-router-dom';
import Data from './Data';
import store from './redux/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Data />
    </BrowserRouter>
  </Provider>
);