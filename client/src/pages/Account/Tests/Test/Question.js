import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuestionAction, changeQuestionLabelAction, deleteQuestionAction, addAnswerQuestionAction } from '../../../../store/reducers/testReducer';

const Question = ({id_form, type, img, question, questions=[]}) => {
  
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

  const addAnswer = (e) => {
    dispatch(addAnswerQuestionAction({idForm: id_form, id: question.id, type: type, answer: e.target.value}))
  }

  const panel = () => {
    return (

        <div className='col-12 col-sm-3 col-md-3'>
          <div className='row justify-content-end'>
            <div className={`col-4 col-md-4 ${question.answer ? 'visible' : 'invisible'}`}>
              <img src="https://img.icons8.com/emoji/30/000000/check-mark-emoji.png"/>
            </div>
            <div className='col-4 col-md-4'>
              <img src="https://img.icons8.com/small/30/000000/gallery.png"/>
            </div>
            <div className='col-4 col-md-4'>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png" onClick={clickDelete}/>
            </div>
          </div>
        </div>

    )
  }

  return (
    <div className='row questions'>
      {!checkString ? <div className='col-1  col-md-1'>
        <img src={img}/>
      </div> : ''}
      <div className={`${ checkString ? 'col-11 col-sm-11' : 'col-11 col-sm-8 col-md-8'}`}>
       {checkString ?
        <textarea value={question.answer} onChange={(e) => addAnswer(e)} rows={1}/>
        :
        checkLast ?
        <textarea placeholder='Новый вопрос' onClick={clickHandler} rows={1}/>
        :
        <textarea value={question.label} onChange={(e) => changeLabel(e)} rows={1}/>
       }
      </div>
      {checkLast || checkTwo ? '' : panel()}       
    </div>
  );
};

export default Question;