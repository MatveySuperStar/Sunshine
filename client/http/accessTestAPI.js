import $api from "."

export const getAllTestsGroup = async (idTest) => {
  const {data} = await $api.get(`api/accessTest/?idTest=${idTest}`)
  return data
}

export const addAccessTest = async (idTest, idGroup, date) => {
  const {data} = await $api.post(`api/accessTest/add`, {idTest:idTest, idGroup:idGroup, date:date})
  return data
}

export const putAccessTest = async (idTest, idGroup, date) => {
  const {data} = await $api.put(`api/accessTest/put`, {idTest:idTest, idGroup:idGroup, date:date})
  return data
}

export const deleteAccessTest = async (idTest, idGroup) => {
  const {data} = await $api.delete(`api/accessTest/delete`, {data: {idTest:idTest, idGroup:idGroup}})
  return data
}

export const getUserTest = async (idGroup) => {
  const {data} = await $api.get(`api/accessTest/?idGroup=${idGroup}`)
  return data
}