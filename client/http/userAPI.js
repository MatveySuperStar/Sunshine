import $api from "."
import jwt_decode from 'jwt-decode'
import axios from "axios"
import { useCookies } from 'react-cookie';

export const login = async (email, password) => {
  try {
    const data = await $api.post('api/user/login', {email:email, password: password})

    console.log(data)
    return data
  } catch(e) {
    return e.response?.data?.errors
  }
}

export const checkAuth = async (refreshToken) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/refresh?refreshToken=${refreshToken}`, {withCredentials: true})

    return response
  } catch(e) {
    console.log(e)
  }
}

export const logout = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/user/logout', {withCredentials: true})

    return response
  } catch(e) {
    console.log(e)
  }
}

export const getUsers = async (page = 1) => {
  const {data} = await $api.get(`api/user/?page=${page}`)

  /*return jwt_decode(data.token)*/
  return {data: data.users, countPage: data.countPage, currentPage: 1}
}

export const getTeacher = async (idGroup) => {
  const {data} = await $api.get(`api/user/getTeacher?idGroup=${idGroup}`)

  /*return jwt_decode(data.token)*/
  return data
}

export const getLikeUsers = async (user, idGroup) => {
  const {data} = await $api.get(`api/user/like?fio=${user.fio}&phone=${user.phone}&idGroup=${idGroup}`)

  /*return jwt_decode(data.token)*/
  return {data: data.users, existenceUser: data.existenceUser}
}


export const getUsersInGroups = async (idGroup) => {
  const {data} = await $api.get(`api/user/?idGroup=${idGroup}`)

  /*return jwt_decode(data.token)*/
  return {data: data.users, idGroup: idGroup}
}

export const deleteUser = async (id, page) => {
  
  const {data} = await $api.delete('api/user/delete', {data: {id: id, page: page}})
  /*return jwt_decode(data.token)*/
  return {data: data.users, countPage: data.countPage}
}

export const addUser = async ({email, name, surname, patronymic, phone, groupId=null, password, status, page}) => {
  try{
  const {data} = await $api.post('api/user/registration', {
    email: email, 
    name: name, 
    surname: surname, 
    patronymic: patronymic,
    phone: phone, 
    id_group: groupId, 
    password: password, 
    status: status, 
    page: page})


  /*return jwt_decode(data.token)*/
  return {data: data.users, countPage: data.countPage}
  } catch(e) {
    if(e.response.data.errors.length !== 0) {
      return e.response.data.errors
     } else {
      return {param: 'email', msg: e.response.data.message}
     }
  }
}

export const putUser = async ({id, email, name, surname, patronymic, phone, groupId, password, status, page}) => {
  const {data} = await $api.put('api/user/put', {
    id: id, 
    email: email, 
    name: name, 
    surname: surname, 
    patronymic: patronymic,
    phone: phone, 
    id_group: groupId, 
    password: password, 
    status: status,
    page: page})
    .catch((e) => {
      if(e.response.data.errors.length !== 0) {
       return e.response.data.errors
      } else {
        console.log(e)
      }})
  /*return jwt_decode(data.token)*/

  return {data: data.users, countPage: data.countPage}
}

export const putUserGroup = async (id, idGroup, isNull=false) => {
  const {data} = await $api.put('api/user/putUserGroup', {
    idUser: id,
    idGroup: idGroup,
    isNull: isNull
  })

  return {data: data.users, idGroup: idGroup}
}

