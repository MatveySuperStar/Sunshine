import React from 'react'; 
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store'; 
import './index.scss';
import {BrowserRouter} from 'react-router-dom'
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