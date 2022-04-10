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

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar />
      <Routes>
        {publicRoutes.map(({path, childRoutes, Component}) => {
          if(childRoutes) {
            console.log(childRoutes)
            return (
            <Route key={path} path={path} >
              
              {childRoutes.map(({path, Component}) => {
                return  <Route key={path} path={path} element={<Component />}/>
              })}
            </Route>
            )
          } else {
            return <Route key={path} path={path} element={<Component />} />
          }
        })}
      </Routes>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);