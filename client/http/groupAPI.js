import $api from "."

export const getGroups = async () => {
  const {data} = await $api.get('api/group/')
  console.log(data)
  /*return jwt_decode(data.token)*/
  return data
}

