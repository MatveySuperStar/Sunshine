import React, { useState } from 'react';
import Navbar from '../Account/Navbar'
import { useSelector, useDispatch  } from 'react-redux';
import './Test.scss'
import Form from './Form';

const index = () => {

  const tests = useSelector(state => state.test.test)

  console.log(tests)
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row headers'>
          <div className='col-md-12'>
            <input name='title' type='text' placeholder='Новый тест'/>
          </div>
          <div className='col-md-12'>
            <textarea name='description' data-initial-dir="auto" placeholder='Описание'/>
          </div>
        </div>
          {tests.map( item => <Form form={item} />)}
      </div>
    </div>
  );
};

export default index;