import $api from "."

export const addRaiting = async ({idTest, idUser, raiting = 0, answers = []}) => {
  const {data} = await $api.post(`api/raiting/add`, {
    idTest: idTest, 
    idUser: idUser,
    raiting: raiting,
    answers: answers
  })
  
  return data
}

export const getAllRaiting = async () => {
  const {data} = await $api.get(`api/raiting/`)
  console.log(data)
  return data
}

export const getGroupRaiting = async (idGroup) => {
  const {data} = await $api.get(`api/raiting/getGroupRating?idGroup=${idGroup}`)
  
  return data
}

export const getUserRating = async (idUser) => {
  const {data} = await $api.get(`api/raiting/getUserRating?idUser=${idUser}`)
  
  return data
}

export const getGroupUsersRating = async(idTest, idGroup, date) => {
  const {data} = await $api.get(`api/raiting/getGroupUsersRating?idGroup=${idGroup}&idTest=${idTest}&date=${date}`)
  
  return data
}

export const getMyRaiting = async (idUser) => {
  const {data} = await $api.get(`api/raiting/getMyRating?idUser=${idUser}`)
  
  return data
}

export const deleteAllRating = async (date, nameGroup, idTest) => {
  
  const {data} = await $api.delete(`api/raiting/deleteAllGroupRating`, {data: {date: date, nameGroup: nameGroup, idTest: idTest}})
  
  return data
}

export const deleteOneRating = async (idRating) => {

  const {data} = await $api.delete(`api/raiting/deleteOneGroupRating`, {data: {id: idRating}})
  
  return data
}