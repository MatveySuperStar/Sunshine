import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParametrs } from '../../../http/parametrsAPI';
import { useCookies } from 'react-cookie';
import {Link, Route, Routes,  useNavigate} from 'react-router-dom'
import './account.scss'
import { updateAccountParametrsAction } from '../../store/reducers/parametrsReducer';
import Calendar from './Components/Calendar';
import TryTest from '../TryTest';
import { authUserAction } from '../../store/reducers/authUserReducer';
import { checkAuth } from '../../../http/userAPI';
import { getAllTests } from '../../../http/testAPI';
import { addAllTestsAction } from '../../store/reducers/testsReducer';
import { getUserTest } from '../../../http/accessTestAPI';

const Account = () => {
  const dispatch = useDispatch()
  const history =  useNavigate()

  const parametrs = useSelector(state => state.parametrs?.parametrs)
  const authUser = useSelector(state => state.authUser?.authUser)
  const tests = useSelector(state => state.tests.tests)
  
  const personalInfo = [
    {title: "ФИО", value: `${authUser.user.surname} ${authUser.user.name} ${authUser.user.patronymic}`},
    {title: "Почта", value: authUser.user.email},
    {title: "Телефон", value: authUser.user.phone},
    {title: "Роль", value: authUser.user.status},
    {title: "Группа", value: authUser.user.id_group},
    {title: "ФИО преподавателя", value: `${authUser.user.surname} ${authUser.user.name} ${authUser.user.patronymic}`},
    {title: "Почта преподавателя", value: authUser.user.email},
    {title: "Телефон преподавателя", value: authUser.user.phone},
  ];

  useEffect(async() => {
    if(authUser.user.status === 'Админ') {
      const parametrs = await getAllParametrs()
      dispatch(updateAccountParametrsAction(parametrs))
    }
    const testsData = await getUserTest(authUser.user.id_group)
    
    const dateNow = new Date();
    const filterTests = testsData.filter( test => +new Date(test.date) <= +dateNow)

    dispatch(addAllTestsAction(filterTests))
  }, [])

  return (
    <div className='container'>
    {
      authUser.user.status === 'Админ' ?
        <div className='characteristic'>
          <h2>Статистика</h2>
          <div className="row">
            {
              parametrs.map( parametr => {
                return (
                  <div className='col-12 dol-sm-6 col-md-6 col-lg-6 col-xl-4'>
                    <div className='row'>
                      <div className='col-3'>
                        <img src={parametr.img}/>
                      </div>
                      <div className='col-9'>
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
        : ""
      }
      <div className='personal_info'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='row'>
              <h3>Личные данные</h3>
              { 
                personalInfo.filter((info, index) => index <= 3).map( info => {
                  return (
                    <div>
                      <label>{info.title}:</label>
                      <p>{info.value}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          { !authUser.id_group &&
          <div className='col-md-6'>
            <div className='row'>
              <h3>Информация по группе</h3>
              { 
                personalInfo.filter((info, index) => index > 3).map( info => {
                  return (
                    <div>
                      <label>{info.title}:</label>
                      <p>{info.value}</p>
                    </div>
                  )
                })
              }
            </div>
          </div> }
        </div>    
      </div>
      { !authUser.id_group &&
      <div>
        <h2>Доступные тесты</h2>
        <div className='row tests_box'>
          {
            tests.map( test => {
              console.log(test)
              return (
                <div onClick={() => {
                  history(`/account/tryTest?idTest=${test.id}`)}
                } className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                  <div className='row d-flex align-items-center'>
                    <div className='col-12'>
                      <h3>{test.title}</h3>
                      <p>{test.description}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div> }
      <div>
        <h2>Календарь</h2>
        <Calendar user={authUser.user}/>
      </div>
    </div>
  );
};

export default Account;