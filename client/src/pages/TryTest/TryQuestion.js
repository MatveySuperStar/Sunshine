import React, {useState} from 'react';
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
  const [text, setText] = useState('');
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
        <div className='col-2 col-sm-1 col-md-1' onClick={clickAnswer}>
          <img src={activeAnswer?.answer?.findIndex( state => state.id === question.id ) === -1 || activeAnswer?.length === 0 ? img : activeImg} />
        </div>}
        { !checkString ?
          !checkLast &&
          <div className={`${'col-10 col-sm-11 col-md-11 d-flex justify-content-start'} 
          ${activeAnswer?.answer?.findIndex( state => state.id === question.id ) === -1 || activeAnswer?.length === 0  ? '' : 'answerActive'} `} 
          onClick={clickAnswer}>
            <span>{question.label}</span>
          </div> 
          : 
          <div className={`col-12 col-md-12 ${text.length ===  0 ? '' : 'answerActive'}  `}>
            <textarea placeholder='Ваш ответ' rows={1} onChange={(e) => {
              setText(e.target.value)
              addAnswer(e)}} value={text}
              onKeyUp={(e)=> {  
                if(e.target.scrollTop > 0){
                  e.target.style.height = e.target.scrollHeight + "px";
                }
              }}/>
          </div>   
        }
      </div>
    </div>
  );
};

export default TryQuestion;