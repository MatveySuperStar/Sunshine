function randomInt() {
  return parseInt(Math.random() * 1000)
}


export const defaultState = {
  kurs: {data:[], cointPage: 0, currentPage: 0},
  oneKurs: {id:0, title: '', description: '', price: 0, time: 60, update: false},
  authUser: {
    isAuth: false,
    user: {}
  },
  answerUser: [
 
  ],
  customError: [],
  places: {data:[], cointPage: 0, currentPage: 0},
  place: {name: '', latitude: '', longitude: '', update: false},
  parametrs : [
    {
      title: "Студенты", 
      img: "https://img.icons8.com/ios/100/000000/student-male--v1.png", 
      number: 0
    },
    {
      title: "Школы", 
      img: "https://img.icons8.com/small/100/000000/city-buildings.png", 
      number: 0
    },
    {
      title: "Преподаватели", 
      img: "https://img.icons8.com/ios/100/000000/training.png", 
      number: 0
    }
  ],
  email: {name: '', kurs: {value: '', datalist: []}, email: '', phone: '', message: '', errors: {
    name: '', kurs: '', email: '', phone: '', message: ''
  }},
  user: {id: 0, email: '', name: '', surname: '', patronymic: '', phone: '', id_group: null, status: 'Ученик', update: false},
  userForLike: {id: 0, fio: '', phone: '', id_group: '', update: false},
  userError: {password: '', email: '', name: '', surname: '', patronymic: '', phone: ''},
  group:  {id: 0, name: '', update: false},
  groups: {data:[], cointPage: 0, currentPage: 0},
  users: {data: [], countPage: 0, currentPage: 0},
  dataListUsers: [],
  testHeader: {
    title: '',
    description: ''
  },
  tests: [
    
  ],
  accessTest : {
    id: 0,
    date: new Date(),
    access: false,
    id_group: 0,
    update: false
  },
  test: [
    {
      id: randomInt(),
      title: '',
      raiting: 0,
      answer: false, 
      files: [],
      types: [
        { 
          type: "radio", 
          rusType: "Один из списка", 
          img: "https://img.icons8.com/ios-glyphs/30/000000/circled.png", 
          activeImg: "https://img.icons8.com/ios-glyphs/30/000000/circled.png",
          active: true, 
          questions: [
            {id: randomInt(), label: "Вопрос 1", answer: false, active: false, files: []},
            {id: randomInt(), label: "Вопрос 2", answer: false, active: false, files: []}
          ],
        },
        {
          type: "checkbox", 
          rusType: "Множество из списка", 
          img: "https://img.icons8.com/ios-filled/30/000000/unchecked-checkbox.png", 
          activeImg: "https://img.icons8.com/ios/30/000000/checked-checkbox--v1.png",
          active: false, 
          questions: [
            {id: randomInt(), label: "Вопрос 1", answer: false, active: false, files: []},
            {id: randomInt(), label: "Вопрос 2", answer: false, active: false, files: []}
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
  ]
}