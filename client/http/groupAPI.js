import $api from "."

export const getGroups = async (page = 1) => {
  const {data} = await $api.get(`api/group/?page=${page}`)
  /*return jwt_decode(data.token)*/
  return {data: data.groups, countPage: data.countPage, currentPage: 1}
}

export const likeGroup = async (nameGroup, idTest) => {
  const {data} = await $api.post(`api/group/likeGroup`, {nameGroup: nameGroup, idTest: idTest})
  /*return jwt_decode(data.token)*/
  console.log(data)
  return {data: data.groups, accessGroups: data.accessGroups}
}

export const addGroup = async ({name, page}) => {
  console.log(page)
  const {data} = await $api.post(`api/group/add`, {name: name, page: page})
  /*return jwt_decode(data.token)*/
  return {data: data.groups, countPage: data.countPage}
}

export const putGroup = async ({id, name, page}) => {
  const {data} = await $api.put(`api/group/put`, {id: id, name: name, page: page})
  /*return jwt_decode(data.token)*/
  return {data: data.groups, countPage: data.countPage}
}

export const deleteGroup = async (id, page) => {
  const {data} = await $api.delete(`api/group/delete`, {data: {id: id, page: page}})
  /*return jwt_decode(data.token)*/
  return {data: data.groups, countPage: data.countPage}
}

export const getAllGroups = async () => {
  const {data} = await $api.get(`api/group/?page="all"`)
  /*return jwt_decode(data.token)*/
  return {data: data.groups}
}
