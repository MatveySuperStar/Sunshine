import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuestionAction, changeQuestionLabelAction, deleteQuestionAction } from '../../store/reducers/testReducer';

const Question = ({id_form, type, question, questions, img}) => {

  const dispatch = useDispatch()
  const checkLast = questions[questions.length - 1].id === question.id
  const checkTwo = questions.length === 2

  const clickHandler = () => {
    if(checkLast) {
      dispatch(addQuestionAction({id: id_form, type: type}))
    }
  }

  const changeLabel = (e) => {
    dispatch(changeQuestionLabelAction({idForm: id_form, id: question.id, type: type, label: e.target.value}))
  }

  const clickDelete = () => {
    dispatch(deleteQuestionAction({idForm: id_form, id: question.id, type: type}))
  }

  const panel = () => {
    return (
      <div className='col-md-2'>
          <img src="https://img.icons8.com/small/32/000000/gallery.png"/>
          <img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png" onClick={clickDelete}/>
    </div>
    )
  }

  return (
    <div className='row qustion'>
      <div className='col-md-1'>
        <img src={img}/>
      </div>
      <div className='col-md-9'>
        <textarea value={question.label} onClick={clickHandler} onChange={(e) => {changeLabel(e)}}/>
      </div>
       {checkLast || checkTwo ? '' : panel()}       
    </div>
  );
};

export default Question;