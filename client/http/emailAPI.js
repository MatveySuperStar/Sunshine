import $api from "."

export const sendMessageEmail = async ({name, phone, message, email, kurs}) => {
  try {
    const data = await $api.post(`api/email/send`, {
      name: name, 
      phone: phone, 
      message: message, 
      email: email,
      kurs: kurs.value
    })
    .catch((e) => {
       return e.response.data.errors
    })
 
 /*return jwt_decode(data.token)*/
 return {errors: data.errors || [data]}
    /*return jwt_decode(data.token)*/
    return {data: data} 
  } catch(e) {
    console.log(e)
  }
}
