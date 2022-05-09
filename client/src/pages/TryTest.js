import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TryForm from './TryTest/TryForm'
import { 
  updateTestDescriptionAction, 
  updateTestTitleAction, 
  getTestAction, 
  defaultFormAction,
  defaultTestHeaderAction 
} from '../store/reducers/testReducer';
import { addTest, getTest, putTest } from '../../http/testAPI';

const TryTest = () => {
  const dispatch = useDispatch()
  const tests = useSelector(state => state.test.test)
  const header = useSelector(state => state.test.testHeader)

  useEffect(async() => {
    await getTestinReact(6)
  }, [])

  const getTestinReact = async(id) => {
    const testData = await getTest(id)
    
    dispatch(getTestAction({
      title: testData.title, 
      description: testData.description,
      test: testData.questions
    }))
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-8 row headers'>
          <div className='col-md-12'>
            <textarea name='title' type='text' placeholder='Новый тест' rows={1} value={header.title}
            readOnly={true}/>
          </div>
          <div className='col-md-12'>
            <textarea name='description' data-initial-dir="auto" placeholder='Описание' rows={1} value={header.description} readOnly={true}/>
          </div>
        </div>
      </div>
    {tests.map( item => {
      return <TryForm form={item}/>
      })}
    </div>
  );
};

export default TryTest;