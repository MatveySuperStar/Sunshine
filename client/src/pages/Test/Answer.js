import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnswerQuestionAction } from '../../store/reducers/testReducer';

const Answer = ({id_form, type, img, question, questions=[]}) => {
  
  const dispatch = useDispatch()
  const checkString = type === "string"

  const clickAnswer = (answer='') => {
    dispatch(addAnswerQuestionAction({idForm: id_form, id: question.id, type: type, answer: answer}))
  }

  return (
    <div>
      <div className='row questions'>
        <div className='col-md-1'>
          <img src={img}/>
        </div>
        <div className={`${ checkString ? 'col-md-12' : 'col-md-8'} ${question.answer ? 'answerActive' : ''} `} 
        onClick={clickAnswer}>
          <textarea value={question.label} rows={1}/>
        </div> 
        <div className={`col-md-3 justify-content-start ${question.answer ? 'd-flex' : 'd-none'}`}>
          <img src="https://img.icons8.com/emoji/30/000000/check-mark-emoji.png"/>
        </div>
      </div>
    </div>
  );
};

export default Answer;