import $api from "."

export const getAllTests = async (idUser=NaN) => {
  const {data} = await $api.get(`api/test/?idUser=${idUser}`)
  console.log(data)
  return data
}

export const getTest = async (id) => {
  const {data} = await $api.get(`api/test/getOne?id=${id}`)
  
  return data 
}


export const getOneTest = async (id) => {
  const {data} = await $api.get(`api/test/?id=${id}`)
  console.log('data')
  return data 
}

export const addTest = async (tests, title, description, idUser) => {
  const {data} = await $api.post('api/test/add', {tests: tests, title: title, description: description, idUser: idUser})
  
  return data
}

export const deleteTest = async (id) => {
  const {data} = await $api.delete('api/test/delete', {id})
  
  return data
}

export const putTest = async (tests, title, description, id) => {
  const {data} = await $api.put('api/test/put', {tests: tests, title: title, description: description, id: id})
  
  return data
}

