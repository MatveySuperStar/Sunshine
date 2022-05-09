import { defaultState } from "../state"

function randomInt() {
  return parseInt(Math.random() * 1000)
}

const GET_TEST = "GET_TEST"
const DEFAULT_FORM = "DEFAULT_FORM"
const ADD_FORM = "ADD_FORM"
const DELETE_FORM = "DELETE_FORM"
const CHANGE_TYPE = "CHANGE_TYPE"
const CHANGE_QUESTION_LABEL = "CHANGE_QUESTION_LABEL"
const ADD_QUESTION = "ADD_QUESTION"
const DELETE_QUESTION = "DELETE_QUESTION"
const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION"
const ACTIVE_ANSWER = "ACTIVE_ANSWER"
const UPDATE_RAITING_QUESTION = "UPDATE_RAITING_QUESTION"
const UPDATE_QUESTION_TITLE = "UPDATE_QUESTION_TITLE"
const UPADATE_TEST_TITLE = "UPADATE_TEST_TITLE"
const UPDATE_TEST_DESCRIPTION = "UPDATE_TEST_DESCRIPTION"

const DEFAULT_TEST_HEADER = "DEFAULT_TEST_HEADER"

const ADD_ACCESS = "ADD_ACCESS"
const UPDATE_ACCESS_DATE = "UPDATE_ACCESS_DATE"
const UPDATE_ACCESS_GROUP = "UPDATE_ACCESS_GROUP"
const UPDATE_ACCESS_ACCESS = "UPDATE_ACCESS_ACCESS"
const DEFAULT_ACCESS = "DEFAULT_ACCESS"
const UPDATE_ACCESS_UPDATE = "UPDATE_ACCESS_UPDATE"

const defaultForm = () => { 
  return  {
    id: randomInt(),
    raiting: 0,
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
        questions: [{
          label: ' ',
          answer: ''
        }]
      }
    ],
  }
}

const defaultAccess = {
  id: 0,
  date: new Date(),
  access: false,
  id_group: 0,
  update: false
}

export const testReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_FORM : {
      return {...state, test: [...state.test, defaultForm()]}
    }

    case DEFAULT_FORM : {
      return {...state, test: [defaultForm()]}
    }

    case DELETE_FORM : {
      return {...state, test: state.test.filter( item => item.id !== action.payload.id )}
    }

    case GET_TEST : {
      return {...state, testHeader: {title: action.payload.title, description: action.payload.description},
      test: JSON.parse(action.payload.test)}
    }

    case UPDATE_QUESTION_TITLE : {
      return {...state, test: state.test.map( item => {
        if(item.id === action.payload.id) {
          return {...item, title: action.payload.title}
        } else {
          return item
        }
      })}
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

    case UPDATE_RAITING_QUESTION : {
      
      return {...state, test: state.test.map( item => {
        if(item.id === action.payload.id) {
          return {...item, raiting: action.payload.raiting}
        } else {
          return item
        }
      })}
    }

    case UPADATE_TEST_TITLE : {
      return {...state, testHeader: {...state.testHeader, title: action.payload}}
    }

    case UPDATE_TEST_DESCRIPTION : {
      return {...state, testHeader: {...state.testHeader, description: action.payload}}
    }

    case DEFAULT_TEST_HEADER : {
      return {...state, testHeader: {
        title: '',
        description: ''
      }}
    }

    case ADD_ACCESS : {
      return {...state, accessTest: action.payload}
    }

    case UPDATE_ACCESS_DATE : {
      return {...state, accessTest: {...state.accessTest, date: action.payload}}
    }

    case UPDATE_ACCESS_GROUP : {
      return {...state, accessTest: {...state.accessTest, idGroup: action.payload}}
    }

    case UPDATE_ACCESS_ACCESS : {
      return {...state, accessTest: {...state.accessTest, access: action.payload}}
    }

    case DEFAULT_ACCESS : {
      return {...state, accessTest: defaultAccess}
    }

    case UPDATE_ACCESS_UPDATE : {
      return {...state, accessTest: {...state.accessTest, idTest: action.payload.idTest ,update: action.payload.update}}
    }

    default: 
      return {...state};
  }
}

export const getTestAction = (payload) => ({type: GET_TEST, payload})
export const defaultFormAction = (payload) => ({type: DEFAULT_FORM, payload})

export const addFormAction = (payload) => ({type: ADD_FORM, payload})
export const deleteFormAction = (payload) => ({type: DELETE_FORM, payload})
export const changeTypeAction = (payload) => ({type: CHANGE_TYPE, payload})
export const updateQuestionTitle = (payload) => ({type: UPDATE_QUESTION_TITLE, payload})
export const addQuestionAction = (payload) => ({type: ADD_QUESTION, payload})
export const deleteQuestionAction = (payload) => ({type: DELETE_QUESTION, payload})
export const changeQuestionLabelAction = (payload) => ({type: CHANGE_QUESTION_LABEL, payload})
export const activeAnswerAction = (payload) => ({type: ACTIVE_ANSWER, payload})
export const addAnswerQuestionAction = (payload) => ({type: ADD_ANSWER_QUESTION, payload})
export const updateRaitingQuestionAction = (payload) => ({type: UPDATE_RAITING_QUESTION, payload})

export const defaultTestHeaderAction = (payload) => ({type: DEFAULT_TEST_HEADER, payload})
export const updateTestTitleAction = (payload) => ({type: UPADATE_TEST_TITLE, payload})
export const updateTestDescriptionAction = (payload) => ({type: UPDATE_TEST_DESCRIPTION, payload})

export const addAccessAction = (payload) => ({type: ADD_ACCESS, payload})
export const updateAccessDateAction = (payload) => ({type: UPDATE_ACCESS_DATE, payload})
export const updateAccessGroupAction = (payload) => ({type: UPDATE_ACCESS_GROUP, payload})
export const updateAccessAccessAction = (payload) => ({type: UPDATE_ACCESS_ACCESS, payload})
export const defaultAccessAction = (payload) => ({type: DEFAULT_ACCESS, payload})
export const updateAccessUpdateAction = (payload) => ({type: UPDATE_ACCESS_UPDATE, payload})