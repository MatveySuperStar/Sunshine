import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnswerQuestionAction } from '../../store/reducers/testReducer';
import './tryQuestions.scss'

const TryQuestion = ({
  id_form, 
  type, img, 
  activeImg, 
  question, 
  questions=[], 
  addAnswerCheckbox, 
  addAnswerRadio, 
  addAnswerText, 
  activeAnswer=[]}) => {
  
  const dispatch = useDispatch();
  const checkString = type === "string";
  const checkLast = questions[questions.length - 1].id === question.id;

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
      <div className='row try_question'>
        { !checkString &&
        !checkLast &&
        <div className='col-md-1'>
          <img src={activeAnswer?.answer?.findIndex( state => state.id === question.id ) === -1 || activeAnswer.length === 0 ? img : activeImg} />
        </div>}
        { !checkString ?
          !checkLast &&
          <div className={`${'col-md-8 d-flex justify-content-start'} ${question.active ? 'answerActive' : ''} `} 
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