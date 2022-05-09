import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnswerQuestionAction } from '../../store/reducers/testReducer';

const TryQuestion = ({id_form, type, img, activeImg, question, questions=[], addAnswerCheckbox, addAnswerRadio, addAnswerText}) => {
  
  const dispatch = useDispatch()
  const checkString = type === "string"

  const clickAnswer = () => {
    if(type === "radio") {
      addAnswerRadio(id_form, question.id)
    } else if(type === "checkbox") {
      addAnswerCheckbox(id_form, question.id)
    } 
  }

  const addAnswer = (e) => {
    dispatch(addAnswerText(id_form, e.target.value))
  }

  return (
    <div>
      <div className='row questions try_question'>
        <div className='col-md-1'>
          <img src={img}/>
        </div>
        { ! checkString ?
          <div className={`${'col-md-8 d-flex justify-content-start'} ${question.answer ? 'answerActive' : ''} `} 
          onClick={clickAnswer}>
            <span>{question.label}</span>
          </div> 
          : 
          <div className={`${'col-md-12'} ${question.answer ? 'answerActive' : ''} `}>
            <textarea rows={1} onChange={(e) => addAnswer(e)}/>
          </div>   
        }
      </div>
    </div>
  );
};

export default TryQuestion;