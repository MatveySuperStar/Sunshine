import { defaultState } from "../state"

function randomInt() {
  return parseInt(Math.random() * 1000)
}

const ADD_FORM = "ADD_FORM"
const DELETE_FORM = "DELETE_FORM"
const CHANGE_TYPE = "CHANGE_TYPE"
const CHANGE_QUESTION_LABEL = "CHANGE_QUESTION_LABEL"
const ADD_QUESTION = "ADD_QUESTION"
const DELETE_QUESTION = "DELETE_QUESTION"
const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION"
const ACTIVE_ANSWER = "ACTIVE_ANSWER"

const defaultForm = () => { 
  return  {
    id: randomInt(),
    types: [
      { 
        type: "radio", 
        rusType: "Один из списка", 
        img: "https://img.icons8.com/ios-glyphs/30/000000/circled.png", 
        activeImg: "https://img.icons8.com/ios-glyphs/30/000000/circled.png",
        active: true, 
        questions: [
          {id: randomInt(), label: "Вопрос 1", answer: false, active: false},
          {id: randomInt(), label: "Вопрос 2", answer: false, active: false}
        ]
      },
      {
        type: "checkbox", 
        rusType: "Множество из списка", 
        img: "https://img.icons8.com/ios-filled/30/000000/unchecked-checkbox.png", 
        activeImg: "https://img.icons8.com/ios/30/000000/checked-checkbox--v1.png",
        active: false, 
        questions: [
          {id: randomInt(), label: "Вопрос 1", answer: false, active: false},
          {id: randomInt(), label: "Вопрос 2", answer: false, active: false}
        ]
      }, 
      {
        type: "string", 
        rusType: "Строка", 
        img: "https://img.icons8.com/ios-filled/30/000000/multiline-text.png", 
        active: false, 
        questions: {
          label: ' ',
          answer: ''
        }
      }
    ],
  }
}


export const testReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_FORM : {
      return {...state, test: [...state.test, defaultForm()]}
    }
    case DELETE_FORM : {
      return {...state, test: state.test.filter( item => item.id !== action.payload.id )}
    }
    case CHANGE_TYPE : {
      return {...state, test: state.test.map( item => {
        if(item.id === action.payload.id) {
          return { ...item, types: item.types.map( type => {
            if(type.type === action.payload.type) {
              return {...type, active: true}
            } else {
              return {...type, active: false}
            }
          })}
        } else {
          return item
        }
      } )}
    }
    case ADD_QUESTION : {
      return {...state, test: state.test.map(item => {
        if(item.id === action.payload.id) {
          return { ...item, types: item.types.map( type => {
            if(type.type === action.payload.type) {
              return {...type, questions: [...type.questions, {id: randomInt(), label: "Новый вопрос"}]}  
            } else {
              return type
            }
          })}
        } else {
          return item
        }
      })} 
    }

    case DELETE_QUESTION : {
      return {...state, test: state.test.map(item => {
        if(item.id === action.payload.idForm) {
          return { ...item, types: item.types.map( type => {
            if(type.type === action.payload.type) {
              return {...type, questions: type.questions.filter(questionData => questionData.id !== action.payload.id)} 
            } else {
              return type
            }
          })
        }} else {
          return item
        }
      })}
    }

    case CHANGE_QUESTION_LABEL : {
      return {...state, test: state.test.map(item => {
        if(item.id === action.payload.idForm) {
          return { ...item, types: item.types.map( type => {
            if(type.type === action.payload.type) {
              return {...type, questions: type.questions.map( question => {
                if(question.id === action.payload.id) {
                  return {...question, label: action.payload.label}
                } else {
                  return question
                }
              })
            }} else {
              return type
            }
          })}
        } else {
          return item
        }
      })}
    }
    case ACTIVE_ANSWER : {
      return { ...state, test: state.test.map( item => {
        if(item.id === action.payload.id) {
          return {...item, answer: !item.answer}
        } else {
          return {...item, answer: false}
        }
      })}
    }
    case ADD_ANSWER_QUESTION : {
      return {...state, test: state.test.map(item => {
        if(item.id === action.payload.idForm) {
          return { ...item, types: item.types.map( type => {
            if(type.type === action.payload.type && action.payload.type === 'radio') {
              return {...type, questions: type.questions.map( question => {
                if(question.id === action.payload.id) {
                  return {...question, answer: !question.answer}
                } else {
                  return {...question, answer: false}
                }
              })}
            }
            if(type.type === action.payload.type && action.payload.type === 'checkbox') {
              return {...type, questions: type.questions.map( question => {
                if(question.id === action.payload.id) {
                  return {...question, answer: !question.answer}
                } else {
                  return question
                }
              })}
            }
            if(type.type === action.payload.type && action.payload.type === 'string') {
              return {...type, questions: type.questions.map( question => {
                return {...question, answer: action.payload.answer}
              })}
            } else {
              return type
            }
          })}
        } else {
          return item
        }
      })}
    }
    default: 
      return {...state};
  }
}

export const addFormAction = (payload) => ({type: ADD_FORM, payload})
export const deleteFormAction = (payload) => ({type: DELETE_FORM, payload})
export const changeTypeAction = (payload) => ({type: CHANGE_TYPE, payload})
export const addQuestionAction = (payload) => ({type: ADD_QUESTION, payload})
export const deleteQuestionAction = (payload) => ({type: DELETE_QUESTION, payload})
export const changeQuestionLabelAction = (payload) => ({type: CHANGE_QUESTION_LABEL, payload})
export const activeAnswerAction = (payload) => ({type: ACTIVE_ANSWER, payload})
export const addAnswerQuestionAction = (payload) => ({type: ADD_ANSWER_QUESTION, payload})