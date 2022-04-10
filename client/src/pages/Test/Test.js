import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import Form from './Form';
import FormAnswer from './FormAnswer';

const Test = () => {
  const tests = useSelector(state => state.test.test)

  const choiceAnswer = () => {
    return tests.map( item => {
      if(!item.answer) {
        return <Form form={item} />
      } else {
        return <FormAnswer form={item} />
      }
    })
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 row headers'>
          <div className='col-md-12'>
            <textarea name='title' type='text' placeholder='Новый тест' rows={1}/>
          </div>
          <div className='col-md-12'>
            <textarea name='description' data-initial-dir="auto" placeholder='Описание' rows={1}/>
          </div>
        </div>
      </div>
      <div className='row'>
        {choiceAnswer()}
      </div>
    </div>
  );
};

export default Test;