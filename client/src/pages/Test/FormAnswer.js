import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Answer from './Answer';
import { activeAnswerAction, addFormAction, changeTypeAction, deleteFormAction } from '../../store/reducers/testReducer';

const FormAnswer = ({form}) => {
  const dispatch = useDispatch()

  const Answers = () => {
    return form.types.map( type => {
      if(type.active) {
        return type.questions.map( question => {
          return <Answer
            id_form={form.id}
            img={type.activeImg || type.activeImg}
            type={type.type}
            questions={type.questions || []}
            question={question}/>
        })
      }
    })
  }

  const deleteForm = () =>{
    dispatch(deleteFormAction({id: form.id}))
  }

  return (
    <div className='col-md-8 form'>
      <div className='row'>
        <div className='col-md-6'>
          <textarea name='description' placeholder='Описание' rows={1}/>
        </div>
        <div className='col-md-1'>
          <img src="https://img.icons8.com/small/32/000000/gallery.png"/>
        </div>
        <div className='col-md-5'>
            <span>Оценка</span><input type='number' />
        </div>
      </div>
      <div>
        {Answers()}
      <div className='col-md-12'>
        <div className='row answer'>
          <div>
            <button onClick={() => {dispatch(activeAnswerAction({id: form.id}))}}>Готово</button>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FormAnswer;