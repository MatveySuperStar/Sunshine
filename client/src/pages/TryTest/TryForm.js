import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from '../Account/Tests/Test/Question';
import { activeAnswerAction, addFormAction, changeTypeAction, deleteFormAction, updateQuestionTitle } from '../../store/reducers/testReducer';
import TryQuestion from './TryQuestion';
import { addAnswerCheckboxUserAction, addAnswerRadioUserAction, addAnswerStringUserAction } from '../../store/reducers/answerReducer';

const TryForm = ({form = {title: ''}, userAnswers}) => {
  const dispatch = useDispatch()
  const [activeTypes, setActiveTypes] = useState(false)
/*

  const changeType = (type) => {
    setActiveTypes(!activeTypes)
    dispatch(changeTypeAction({id: form.id, type: type}))
  }
/*
  const allTypes = () => {
    return form.types.map( type => {
      return (
      <div className={`question_type`} onClick={() => {changeType(type.type)}}>
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
*/

  const addAnswerCheckbox = (idForm, idAnswer) => {
    dispatch(addAnswerCheckboxUserAction({idForm: idForm, idAnswer: idAnswer}))
  }

  const addAnswerRadio = (idForm, idAnswer) => {
    dispatch(addAnswerRadioUserAction({idForm: idForm, idAnswer: idAnswer}))
  }

  const addAnswerText = (idForm, label) => {
    dispatch(addAnswerStringUserAction({idForm: idForm, label: label}))
  }

  const Questions = () => {
    return form.types.map( type => {
      if(type.active) {
        return type.questions.map( question => {
          return <TryQuestion
            activeAnswer={userAnswers}
            id_form={form.id}
            activeImg={type.activeImg}
            img={type.img}
            type={type.type}
            questions={type.questions || []}
            question={question}
            addAnswerCheckbox={addAnswerCheckbox}
            addAnswerRadio={addAnswerRadio}
            addAnswerText={addAnswerText}
            />
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
     <div className='col-md-8 form'>
      <div className='row'>
        <div className='col-md-12'>
          <textarea name='description' placeholder='Вопрос' rows={1}
          value={form.title} readOnly={true}/>
        </div>
      </div>
      {Questions()}
    </div>
  );
};

export default TryForm;