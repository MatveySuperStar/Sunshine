import React, { Children } from 'react'; 
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import Account from './pages/Account';
import Test from './pages/Test';
import {Provider} from 'react-redux';
import {store} from './store'; 
import Navbar from './pages/Account/Navbar';
import './index.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { publicRoutes } from './routes';
import { CookiesProvider } from 'react-cookie';
import App from './App';

ReactDOM.render(
  
  <BrowserRouter>
    <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);