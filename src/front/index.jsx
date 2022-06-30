import React from 'react'
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import { BrowserRouter } from 'react-router-dom';
import Data from './Data';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Data/>
    </BrowserRouter>
);