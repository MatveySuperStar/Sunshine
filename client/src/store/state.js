function randomInt() {
  return parseInt(Math.random() * 1000)
}


export const defaultState = {
  test: [
    {
      id: randomInt(),
      types: [
        {type: "radio", img: "https://img.icons8.com/ios-glyphs/30/000000/circled.png", active: true},
        {type: "checkbox", img: "https://img.icons8.com/ios-filled/30/000000/unchecked-checkbox.png", active: false}, 
        {type: "list", img: "https://img.icons8.com/ios-filled/30/000000/drag-list-down.png", active: false}
      ],
      questions: [
        {type: 'text', data: {
          label: ''
        },
        },
        {type: 'string', data: 
          [ 
            {id: randomInt(), label: "Ряд 1"},
            {id: randomInt(), label: "Ряд 2"}
          ],
        },
        {type: 'button', data: 
          [
            {id: randomInt(), label: "Вопрос 1"},
            {id: randomInt(), label: "Вопрос 2"}
          ],
        },
      ]
    }
  ]
}