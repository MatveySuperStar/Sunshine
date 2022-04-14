function randomInt() {
  return parseInt(Math.random() * 1000)
}


export const defaultState = {
  isAuth: false,
  email: {name: '', kurs: {value: '', datalist: []}, email: '', phone: '', message: '', errors: {
    name: '', kurs: '', email: '', phone: '', message: ''
  }},
  user: {id: 0, email: '', name: '', surname: '', patronymic: '', phone: '', id_group: 0, status: '', update: false},
  userForLike: {id: 0, fio: '', phone: '', id_group: '', update: false},
  userError: {password: '', email: '', name: '', surname: '', patronymic: '', phone: ''},
  group:  {id: 0, name: '', update: false},
  groups: {data:[], cointPage: 0, currentPage: 0},
  users: {data: [], countPage: 0, currentPage: 0},
  dataListUsers: [],
  test: [
    {
      id: randomInt(),
      raiting: 1,
      answer: false,
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
          ],
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
  ]
}