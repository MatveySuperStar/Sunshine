import $api from "."
import jwt_decode from 'jwt-decode'
import axios from "axios"

export const getKurs = async (page = 1) => {
  const {data} = await $api.get(`api/kurs/?page=${page}`)
  console.log(data)
  /*return jwt_decode(data.token)*/
  return {data: data.kurs, countPage: data.countPage, currentPage: 1}
}


export const deleteKurs = async (id, page) => {
  
  const {data} = await $api.delete('api/kurs/delete', {data: {id: id, page: page}})
  /*return jwt_decode(data.token)*/
  return {data: data.kurs, countPage: data.countPage}
}

export const addKurs = async ({title, description, price, time, page}) => {

  const {data} = await $api.post('api/kurs/add', {
    title: title, 
    description: description, 
    price: price, 
    time: time,
    page: page})


  /*return jwt_decode(data.token)*/
  return {data: data.kurs, countPage: data.countPage}

}

export const putKurs = async ({title, description, price, time, page}) => {
  const {data} = await $api.put('api/kurs/put', {
    title: title, 
    description: description, 
    price: price, 
    time: time,
    page: page})
  /*return jwt_decode(data.token)*/

  return {data: data.kurs, countPage: data.countPage}
}

