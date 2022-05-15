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
