import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParametrs } from '../../http/parametrsAPI';
import Navbar from './Account/Navbar';
import { useCookies } from 'react-cookie';

import './account.scss'
import { updateAccountParametrsAction } from '../store/reducers/parametrsReducer';

const Account = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch()
  const parametrs = useSelector(state => state.parametrs.parametrs)
  const isAuth = localStorage.getItem('tokenUser')
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(async() => {
    const isAuth = localStorage.getItem('tokenUser')
    console.log(cookies)
    const parametrs = await getAllParametrs()
    dispatch(updateAccountParametrsAction(parametrs))
  }, [])

  return (
    <>
      <div className='container'>
        <div className='characteristic'>
          <div className={`row ${cookies.user.status === 'Преподаватель' ? 'd-flex' : 'd-none'}`}>
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
      </div>
    </>
  );
};

export default Account;