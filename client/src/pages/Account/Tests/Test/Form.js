import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Question from './Question';
import { activeAnswerAction, addFormAction, changeTypeAction, deleteFormAction, updateQuestionTitle } from '../../../../store/reducers/testReducer';

const Form = ({form}) => {
  const dispatch = useDispatch()
  const [activeTypes, setActiveTypes] = useState(false)


  const changeType = (type) => {
    setActiveTypes(!activeTypes)
    dispatch(changeTypeAction({id: form.id, type: type}))
  }

  const allTypes = () => {
    return form.types.map( type => {
      return (
      <div className={`question_type`} onClick={() => changeType(type.type)}>
        <img src={type.img} />
        <span>{type.rusType}</span>
      </div> 
      )
    })
  }

  const activeType = () => {
    return form.types.map( type => {
      if(type.active) {
        return <div className={`question_type`} onClick={() => setActiveTypes(!activeTypes)}>
          <img src={type.img} />
          <span>{type.rusType}</span>
        </div>             
      }    
     })
  }

  const Questions = () => {
    return form.types.map( type => {
      if(type.active) {
        return type.questions.map( question => {
          return <Question
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

  const activeAnswer = () => {
    dispatch(activeAnswerAction({id: form.id}))
  }
  return (
    <div className='col-12 col-sm-12 col-md-12 col-lg-8 form'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <textarea name='description' placeholder='Описание' rows={1}
          value={form.title} onChange={(e)=>dispatch(updateQuestionTitle({id: form.id, title: e.target.value}))}/>
        </div>
        <div className='col-12 col-md-1'>
          <img src="https://img.icons8.com/small/32/000000/gallery.png"/>
        </div>
        <div className='col-12 col-md-5'>
          <div className='all_type'>
            <div className={`burger_type ${activeTypes ? 'active' : 'noActive'}`}>
              {allTypes()}
            </div>
            {activeType()}
          </div>
        </div>
      </div>
      {Questions()}
      <div className='row answer'>
        <div className='col-12 col-sm-6 col-md-8'>
          <button onClick={activeAnswer}>Ответы</button>
          <span>({form.raiting} баллов)</span>
        </div>
        <div className='col-12 col-sm-3 col-md-2'>
          <button onClick={deleteForm}>Удалить</button>
        </div>
        <div className='col-12 col-sm-3 col-md-2'>
          <button onClick={() => { dispatch(addFormAction()) }}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default Form;