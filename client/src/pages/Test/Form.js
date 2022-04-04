import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Question from './Question';
import { addFormAction, changeTypeAction } from '../../store/reducers/testReducer';

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
      <div className={`question_type`} onClick={() => {changeType(type.type)}}>
        <img src={type.img} />
        <span>{type.type}</span>
      </div> 
      )
    })
  }

  const activeType = () => {
    return form.types.map( type => {
      if(type.active) {
        return <div className={`question_type`} onClick={() => setActiveTypes(!activeTypes)}>
          <img src={type.img} />
          <span>{type.type}</span>
        </div>             
      }    
     })
  }

  const Questions = () => {
    return form.types.map( type => {
      if(type.active) {
        return form.questions.map( questions => {
          if(questions.type === 'button') {
            return questions.data.map( question => {
              return <Question
                id_form={form.id}
                type={questions.type}
                img={type.img}
                questions={questions.data}
                question={question}/>
            })
          }
        })
      }
    })
  }


  return (
    <div className='row question'>
      <div className='col-md-6'>
        <textarea />
      </div>
      <div className='col-md-1'>
        <img src="https://img.icons8.com/small/32/000000/gallery.png"/>
      </div>
      <div className='col-md-5'>
        <div className='all_type'>
          <div className={`burger_type ${activeTypes ? 'active' : 'noActive'}`}>
            {allTypes()}
          </div>
          {activeType()}
        </div>
      </div>
      {Questions()}
      <div><button onClick={() => dispatch(addFormAction())}></button></div>
  </div>
  );
};

export default Form;