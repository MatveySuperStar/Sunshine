import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnswerQuestionAction } from '../../../../store/reducers/testReducer';

const Answer = ({id_form, type, img, question, questions=[]}) => {
  
  const dispatch = useDispatch()
  const checkString = type === "string"

  const clickAnswer = (answer='') => {
    dispatch(addAnswerQuestionAction({idForm: id_form, id: question.id, type: type, answer: answer}))
  }

  const addAnswer = (e) => {
    dispatch(addAnswerQuestionAction({idForm: id_form, id: question.id, type: type, answer: e.target.value}))
  }

  console.log(question)
  return (
      <div className='row answer'>
        {!checkString &&
        <div className='col-md-1'>
          <img src={img}/>
        </div>}
        { !checkString ?
          <div className='col-md-8'
          onClick={clickAnswer}>
            <textarea className={`${question.answer ? 'answerActive' : ''} `} value={question.label} rows={1}/>
          </div> 
          : 
          <div className='col-md-11' >
            <textarea className={`${question.answer ? 'answerActive' : ''} `} value={question.answer} onChange={(e) => addAnswer(e)} rows={1}/>
          </div>   
        }
        <div className={`${checkString ? 'col-md-1' : 'col-md-3'} justify-content-start ${question.answer ? 'd-flex' : 'd-none'}`}>
          <img src="https://img.icons8.com/emoji/30/000000/check-mark-emoji.png"/>
        </div>
      </div>
  );
};

export default Answer;