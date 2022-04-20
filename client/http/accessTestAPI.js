import $api from "."

export const getAllTestsGroup = async (idTest) => {
  const {data} = await $api.get(`api/accessTest/?idTest=${idTest}`)
  console.log(data)
  return data
}

export const addAccessTest = async (idTest) => {
  const {data} = await $api.add(`api/accessTest/add?idTest=${idTest}`)
  console.log(data)
  return data
}

export const putAccessTest = async (idTest) => {
  const {data} = await $api.put(`api/accessTest/put?idTest=${idTest}`)
  console.log(data)
  return data
}

export const deleteAccessTest = async (idTest) => {
  const {data} = await $api.delete(`api/accessTest/delete?idTest=${idTest}`)
  console.log(data)
  return data
}