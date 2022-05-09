import { defaultState } from "../state"

const ADD_ANSWER_RADIO_USER = "ADD_ANSWER_RADIO_USER"
const ADD_ANSWER_CHECKBOX_USER = "ADD_ANSWER_CHECKBOX_USER"
const ADD_ANSWER_STRING_USER = "ADD_ANSWER_STRING_USER"


export const answerReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_ANSWER_RADIO_USER : {
      const isPut = state.answerUser.findIndex(item => item.id === action.payload.idForm)
      console.log(isPut)
      if(isPut != -1) {
        return {...state, answerUser: state.answerUser.map( form => {
          if(form.id === action.payload.idForm) {
            return {...form, answer: {id: action.payload.idAnswer }}
          } else {
            return form
          }
        }) }
      } else {
        return {...state, answerUser: [ ...state.answerUser, {id: action.payload.idForm, answer: [{id: action.payload.idAnswer}]} ]}
      }
    }
    case ADD_ANSWER_CHECKBOX_USER : {
      const isCheck = state.answerUser.findIndex(item => item.id === action.payload.idForm )

      if(isCheck != -1) {
        const answerId = state.answerUser.answer.findIndex(item => item.id === action.payload.idAnswer)

        if(answerId != -1) {
          return {...state, answerUser: state.answerUser.map(form => {
            if(form.id === action.payload.idForm) {
              return { ...form, answer: form.answer.map( question => {
                if(question.id === action.payload.idAnswer) {
                
                } else {
                  return question
                }
              })}
            } else {
              return form
            }
          })}
        } else {
          return {...state, answerUser: state.answerUser.map(form => {
            if(form.id === action.payload.idForm) {
              return { ...form, answer: [ ...form.answer, {id: action.payload.idAnswer} ]}
            } else {
              return form
            }
          })}
        }
      } else {
        return {...state, answerUser: [ ...state.answerUser, {id: action.payload.idForm, answer: [{id: action.payload.idAnswer}]} ]}
      }
    }
    case ADD_ANSWER_STRING_USER : {
      const isPut = state.answerUser.findIndex(item => item.id === action.payload.idForm)

      if(isPut != -1) {
        return {...state, answerUser: state.answerUser.map( form => {
          if(form.id === action.payload.idForm) {
            return {...form, answer: {label: action.payload.label }}
          } else {
            return form
          }
        }) }
      } else {
        return {...state, answerUser: [ ...state.answerUser, {id: action.payload.idForm, answer: [{label: action.payload.label}]} ]}
      }
    }
    default: 
    return {...state};
  }
}

export const addAnswerRadioUserAction = (payload) => ({type: ADD_ANSWER_RADIO_USER, payload})
export const addAnswerCheckboxUserAction = (payload) => ({type: ADD_ANSWER_CHECKBOX_USER, payload})
export const addAnswerStringUserAction = (payload) => ({type: ADD_ANSWER_STRING_USER, payload})