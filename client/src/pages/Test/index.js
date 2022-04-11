/*import React, { useEffect, useState } from 'react';
import Navbar from '../Account/Navbar'
import './Test.scss'
import Test from './Test'
import Table from './Table'
import { getUsers } from '../../../http/userAPI';
import './Table.scss'
import { getAllUsersAction } from '../../store/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { 
  updateNameAction, 
  updateEmailAction, 
  updateSurnameAction, 
  updatePatronymicAction,
  updatePasswordAction,
  updatePhoneAction,
  updateStatusAction,
  updateGroupAction, 
  updateUserAction
} from '../../store/reducers/userReducer';

const index = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const user = useSelector(state => state.user.user)

  useEffect(async() => {
    
    dispatch(getAllUsersAction(await getUsers()))
  }, [])

  const addUpdateUser = (item) => {
    dispatch(updateUserAction({
      name: item[0], 
      surname: item[1], 
      patronymic: item[2],
      email: item[3],
      phone: item[4],
      status: item[5],
      group: item[6],
      update: true  
    }))
  }

  const params = [
    {label: 'Имя', type: 'text', action: updateNameAction, value: user.name},
    {label: 'Фамилия', type: 'text', action: updateSurnameAction, value: user.surname},
    {label: 'Отчество', type: 'text', action: updatePatronymicAction, value: user.patronymic},
    {label: 'Email', type: 'email', action: updateEmailAction, value: user.email},
    {label: 'Пароль', type: 'password', action: updatePasswordAction, value: user.password},
    {label: 'Телефон', type: 'phone', action: updatePhoneAction, value: user.phone},
    {label: 'Статус', type: 'select', action: updateStatusAction, value: user.status, options: ['Ученик', 'Преподаватель']},
    {label: 'Группа', type: 'select', action: updateGroupAction, value: user.group, options: ['1', '2', '4']}
  ]

  const legends = [
    ...params.filter( item => item.label !== 'Пароль').map(item => item.label),
  ]

  const items = users.filter((item, index) => index === 0).flat().map( item => {
      return [ item.first_name, item.second_name, item.patronymic, item.mail, item.phone, item.status, item.id_group]
    })
   
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/users' element={<Table addUpdateUser={addUpdateUser} items={items} legends={legends} params={params}/>}  />
      </Routes>
    </>
  );
};

export default index;*/