import React, { useEffect} from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import {  useSearchParams, useNavigate } from 'react-router-dom';
import { addTest, getTest, putTest } from '../../../../../http/testAPI';
import { 
  updateTestDescriptionAction, 
  updateTestTitleAction, 
  getTestAction, 
  defaultFormAction,
  defaultTestHeaderAction 
} from '../../../../store/reducers/testReducer';
import Form from './Form';
import FormAnswer from './FormAnswer';
import { useCookies } from 'react-cookie';
import './Test.scss'

const Test = () => {
  const authUser = useSelector(state => state.authUser?.authUser)
  const tests = useSelector(state => state.test.test)
  const header = useSelector(state => state.test.testHeader)
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate()

  useEffect(async() => {
    if(params.get('idTest') > 0) {
      await getTestinReact(params.get('idTest'))
    } else {
      dispatch(defaultFormAction()) 
      dispatch(defaultTestHeaderAction())
    }
  }, [])

  const choiceAnswer = () => {
    return tests.map( item => {
      if(!item.answer) {
        return <Form key={item.id} form={item} />
      } else {
        return <FormAnswer key={item.id} form={item} />
      }
    })
  }

  const getTestinReact = async(id) => {
    const testData = await getTest(id)
    
    dispatch(getTestAction({
      title: testData.title, 
      description: testData.description,
      test: testData.questions
    }))
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-8 row headers'>
          <div className='col-12 col-sm-12'>
            <textarea name='title' type='text' placeholder='Новый тест' rows={1} value={header.title}
            onChange={(e) => dispatch(updateTestTitleAction(e.target.value))}/>
          </div>
          <div className='col-12 col-sm-12'>
            <textarea name='description' data-initial-dir="auto" placeholder='Описание' rows={1} value={header.description}
            onChange={(e) => dispatch(updateTestDescriptionAction(e.target.value))}/>
          </div>
        </div>
      </div>
      <div className='row'>
        {choiceAnswer()}
      </div>
      <div className='row d-flex justify-content-center testButtons'>
        <div className='col-12 col-sm-12 col-lg-8'>
          {
          params.get('idTest') ?
            <button className='updateTest' onClick={
              async()=>{
                await putTest(tests, header.title, header.description, params.get('idTest'));
                navigate('../../account/tests');
              }
            }>
              Изменить
            </button>
          :
          <button className='addTest' onClick={async()=>{
            await addTest(tests, header.title, header.description, authUser.user.id);
            navigate('../../account/tests');
          }}>Добавить</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Test;