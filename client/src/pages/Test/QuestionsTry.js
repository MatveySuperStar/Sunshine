import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuestionAction, changeQuestionLabelAction, deleteQuestionAction } from '../../store/reducers/testReducer';

const QuestionsTry = () => {
  
  const dispatch = useDispatch()
  const checkLast = questions[questions.length - 1].id === question.id
  const checkTwo = questions.length <= 2
  const checkString = type === "string"

  const clickHandler = () => {
    if(checkLast && !checkString) {
      dispatch(addQuestionAction({id: id_form, type: type}))
    }
  }

  const changeLabel = (e) => {
    dispatch(changeQuestionLabelAction({idForm: id_form, id: question.id, type: type, label: e.target.value}))
  }

  const clickDelete = () => {
    dispatch(deleteQuestionAction({idForm: id_form, id: question.id, type: type}))
  }

  return (
    <div className='row questions'>
      {!checkString ? <div className='col-md-1'>
        <img src={img}/>
      </div> : ''}
      <div className={`${ checkString ? 'col-md-12' : 'col-md-8'}`}>
        {checkLast ?
        <textarea placeholder='Новый вопрос' onClick={clickHandler} rows={1}/>
        :
        <textarea value={question.label} onChange={(e) => {changeLabel(e)}} rows={1}/>
        }
      </div>  
    </div>
  );
};

export default QuestionsTry;