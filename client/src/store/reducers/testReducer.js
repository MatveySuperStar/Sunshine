import { defaultState } from "../state"

function RandomInt() {
  return parseInt(Math.random() * 1000)
}

const ADD_FORM = "ADD_FORM"
const CHANGE_TYPE = "CHANGE_TYPE"
const CHANGE_QUESTION_LABEL = "CHANGE_QUESTION_LABEL"
const ADD_QUESTION = "ADD_QUESTION"
const DELETE_QUESTION = "DELETE_QUESTION"
const defaultForm = () => { return {
  id: RandomInt(),
  types: [
    {type: "radio", img: "https://img.icons8.com/ios-glyphs/30/000000/circled.png", active: true},
    {type: "checkbox", img: "https://img.icons8.com/ios-filled/30/000000/unchecked-checkbox.png", active: false}, 
    {type: "list", img: "https://img.icons8.com/ios-filled/30/000000/drag-list-down.png", active: false}
  ],
  questions: [
    {type: 'text', data: {
      label: ''
    }},
    {type: 'string', data: 
      [ 
        {id: RandomInt(), label: "Ряд 1"},
        {id: RandomInt(), label: "Ряд 2"}
      ]},
    {type: 'button', data: 
      [
        {id: RandomInt(), label: "Вопрос 1"},
        {id: RandomInt(), label: "Вопрос 2"}
      ]},
  ]
}
}


export const testReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_FORM : {
      return {...state, test: [...state.test, defaultForm()]}
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
          return { ...item, questions: item.questions.map( question => {
            if(question.type === action.payload.type) {
              return {...question, data: [...question.data, {id: RandomInt(), label: "Новый вопрос"}]} 
            } else {
              return question
            }
          })
        }} else {
          return item
        }
      })}
    }
    case DELETE_QUESTION : {
      return {...state, test: state.test.map(item => {
        if(item.id === action.payload.idForm) {
          return { ...item, questions: item.questions.map( question => {
            if(question.type === action.payload.type) {
              return {...question, data: question.data.filter(questionData => questionData.id !== action.payload.id)} 
            } else {
              return question
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
          return { ...item, questions: item.questions.map( question => {
            if(question.type === action.payload.type) {
              return {...question, data: question.data.map( questionData => {
                if(questionData.id === action.payload.id) {
                  return {...questionData, label: action.payload.label}
                } else {
                  return questionData
                }
              })}
            } else {
              return question
            }
          })
        }} else {
          return item
        }
      })}
    }
    default: 
      return {...state};
  }
}

export const addFormAction = (payload) => ({type: ADD_FORM, payload})
export const changeTypeAction = (payload) => ({type: CHANGE_TYPE, payload})
export const addQuestionAction = (payload) => ({type: ADD_QUESTION, payload})
export const deleteQuestionAction = (payload) => ({type: DELETE_QUESTION, payload})
export const changeQuestionLabelAction = (payload) => ({type: CHANGE_QUESTION_LABEL, payload})