import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar'
import { getUsers, deleteUser, addUser, putUser } from '../../../../http/userAPI';
import '../Components/Table.scss'
import { addCurrentPageAction, initUsersAction, updateUsersAction} from '../../../store/reducers/usersReducer';
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
  updateUserAction,
  defaultUserAction,
} from '../../../store/reducers/userReducer';
   
import Table from '../Components/Table';
import FormAdmin from '../Components/FormAdmin';
import { getAllGroupsAction } from '../../../store/reducers/groupsReducer';
import { getAllGroups } from '../../../../http/groupAPI';
import { defaultErrorUserAction } from '../../../store/reducers/userErrorReducer';


import { userErrorAction } from '../../../store/reducers/userErrorReducer';

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const user = useSelector(state => state.user.user)
  const groups = useSelector(state => state.groups.groups)
  const authUser = useSelector(state => state.authUser.authUser)
  const userError = useSelector(state => state.userError.userError)

  useEffect(async() => {
    dispatch(getAllGroupsAction(await getAllGroups()))
    const users = await getUsers()
    dispatch(initUsersAction(users))
  }, [])

  const addUpdateUser = (user) => {
    const group = groups.data.find(group => group.name === user[7])
    dispatch(defaultErrorUserAction())
    dispatch(updateUserAction({
      id: user[0],
      name: user[1], 
      surname: user[2], 
      patronymic: user[3],
      email: user[4],
      phone: user[5],
      status: user[6],
      groupId: group !== undefined ? group.id : 0,
      update: true  
    }))
  }

  const accessRole = () => {
    if(authUser.user.status === "Админ") {
      return [
        {value: 'Ученик', name: 'Ученик'},
        {value: 'Преподаватель', name: 'Преподаватель'}
      ]
    } else if(authUser.user.status === "Преподаватель") {
      return [
        {value: 'Ученик', name: 'Ученик'},
      ]
    }
  }

  const currentPage = async(value) =>{
    dispatch(addCurrentPageAction({currentPage: value}))
    dispatch(updateUsersAction(await getUsers(value)))
  }

  const activeRow = (id) => {
    return user.id === id
  }

  const statusUpdate = user.update ? 'active' : 'noActive'

  const params = [
    {label: 'Имя', type: 'text', action: updateNameAction, value: user.name, error: userError.name},
    {label: 'Фамилия', type: 'text', action: updateSurnameAction, value: user.surname, error: userError.surname},
    {label: 'Отчество', type: 'text', action: updatePatronymicAction, value: user.patronymic, error: userError.patronymic},
    {label: 'Email', type: 'text', action: updateEmailAction, value: user.email, error: userError.email},
    {label: 'Пароль', type: 'password', action: updatePasswordAction, value: user.password, error: userError.password},
    {label: 'Телефон', type: 'phone', action: updatePhoneAction, value: user.phone, error: userError.phone},
    {label: 'Статус', type: 'select', action: updateStatusAction, value: user.status, options: accessRole()},
    {label: 'Группа', type: 'select', action: updateGroupAction, value: user.groupId, options: 
    [{value: 0, name: 'По умолчанию'}, 
    ...groups.data.map( group => 
      {
        return {value: group.id, name: group.name }
      }
    )]
    }
  ]

  const legends = [
    ...params.filter( item => item.label !== 'Пароль').map(item => item.label),
  ]

 
  const items = users.data.map( item => {
      return [ item.id, item.name, item.surname, item.patronymic, item.email, item.phone, item.status, item.groupName]
    })
 
  const exitItem = () => {
    dispatch(defaultUserAction())
  }

  const addItem = async() => {
    const usersData = await addUser({...user, page: users.currentPage})
    
    console.log(usersData)
    if(usersData.errors.length) {
      dispatch(userErrorAction(usersData.errors))
    } else {
    
    dispatch(updateUsersAction({data: usersData.data, countPage: usersData.countPage}))
    }
  }

  const putItem = async() => {
    dispatch(updateUsersAction(await putUser({...user, page: users.currentPage})))
  }

  const deleteItem = async() => {
    dispatch(updateUsersAction(await deleteUser(user.id, users.currentPage)))
    dispatch(defaultUserAction())
  }

  return (
    <div className='container'>
      <div className='row header_table'>
        <div className='col-md-6'>
          <h3>Таблица пользователей</h3>
        </div>
      </div>
      <div className='row'>
        <div className='add_form col-md-3'>
          <FormAdmin  
            params={params} 
            statusUpdate={statusUpdate} 
            exitItem={exitItem} 
            addItem={addItem}
            putItem={putItem}
            deleteItem={deleteItem}/>
        </div>
        <div className='col-md-9'>
          <Table 
            addUpdate={addUpdateUser} 
            items={items} 
            legends={legends} 
            countPage={users.countPage}
            currentPage={currentPage}
            activeRow={activeRow}
          />
        </div> 
      </div>
    </div>
  );
};

export default Users;