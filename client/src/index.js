import React from 'react'; 
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import Account from './pages/Account';
import Test from './pages/Test';
import {Provider} from 'react-redux';
import {store} from './store'; 
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Test/>
  </Provider>,
  document.getElementById('root')
);