import $api from "."

export const getAllParametrs = async () => {
  const {data} = await $api.get(`api/parametrs/`)
  console.log(data)
  return data
}