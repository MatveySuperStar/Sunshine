import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParametrs } from '../../http/parametrsAPI';
import Navbar from './Account/Navbar';
import { useCookies } from 'react-cookie';

import './account.scss'
import { updateAccountParametrsAction } from '../store/reducers/parametrsReducer';
import Calendar from './Calendar';
import TryTest from './TryTest';
import { authUserAction } from '../store/reducers/authUserReducer';
import { checkAuth } from '../../http/userAPI';


const Account = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch()
  const parametrs = useSelector(state => state.parametrs.parametrs)
  const authUser = useSelector(state => state.authUser?.authUser)
  const [cookies, setCookie, removeCookie] = useCookies();
  

  useEffect(async() => {
    if(localStorage.getItem('token')) {
      const data = await checkAuth()
      localStorage.setItem('token', data.data.accessToken)  
      console.log(data.data.user)
      dispatch(authUserAction({isAuth: true, user: data.data.user}))
    } else {
      console.log('sss')
    }
    const parametrs = await getAllParametrs()
    dispatch(updateAccountParametrsAction(parametrs))
  }, [])

  return (
    <>
      <div className='container'>
        <div className='characteristic'>
          <div className={`row ${authUser === 'Преподаватель' || 'Админ' ? 'd-flex' : 'd-none'}`}>
            {
              parametrs.map( parametr => {
                return (
                  <div className='col-md-4'>
                    <div className='row'>
                      <div className='col-md-3'>
                        <img src={parametr.img}/>
                      </div>
                      <div className='col-md-9'>
                        <div className='title'>
                          <p>{ parametr.title }</p>
                        </div>
                        <div className='number'>
                          <h2>{ parametr.number } </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/*<TryTest />*/}
        <Calendar />
      </div>
    </>
  );
};

export default Account;