import $api from "."

export const getAllPlacesWithPage = async (page) => {
  const {data} = await $api.get(`api/places/?page=${page}`)
  console.log(data)
  return data
}

export const getAllPlaces = async () => {
  const {data} = await $api.get(`api/places/?page=${false}`)
  console.log(data)
  return data
}

export const addPlace = async ({name, latitude, longitude, page}) => {

  const data = await $api.post(`api/places/add`, {
    nameCentre: name, 
    latitude: latitude, 
    longitude: longitude, 
    page: page
  })
  
  return {data: data.places, error: data.error }
}

export const putPlace = async ({id, name, latitude, longitude, page}) => {
  const {data} = await $api.put(`api/places/put`, {
    id: id,
    nameCentre: name, 
    latitude: latitude, 
    longitude: longitude, 
    page: page
  })
  console.log(data)
  return data
}

export const deletePlace = async (id, page) => {
  const {data} = await $api.delete(`api/places/delete`, {data:{id: id, page: page}})
  console.log(data)
  return data
}