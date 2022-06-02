import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useSearchParams, useNavigate } from 'react-router-dom';
import TryForm from './TryTest/TryForm'
import { 
  updateTestDescriptionAction, 
  updateTestTitleAction, 
  getTestAction, 
  defaultFormAction,
  defaultTestHeaderAction 
} from '../store/reducers/testReducer';
import { getTest } from '../../http/testAPI';
import { addRaiting } from '../../http/raitingAPI';
import { addDefaultAnswerUser } from '../store/reducers/answerReducer';

const TryTest = () => {
  const dispatch = useDispatch()

  const tests = useSelector(state => state.test.test)
  const header = useSelector(state => state.test.testHeader)
  const userAnswers = useSelector(state => state.answerUser?.answerUser)
  const authUser = useSelector(state => state.authUser?.authUser)
  const [params] = useSearchParams()

  const navigate =  useNavigate()
  
  const getTestinReacts = useCallback(async(id) => {
    const testData = await getTest(id)
    
    dispatch(getTestAction({
      title: testData.title, 
      description: testData.description,
      test: testData.questions
    }))
  }, [dispatch, getTest, getTestAction])

  useEffect(async() => {
    console.log(params.get('try'))
    if(params.get('try')) {
      await getTestinReacts(params.get(16))
    }
    else if(params.get('idTest') > 0) {
     
      await getTestinReacts(params.get('idTest'))
    }
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-8 row headers'>
          <div className='col-12 col-sm-12'>
            <textarea name='title' type='text' placeholder='Новый тест' rows={1} value={header.title}
            readOnly={true}/>
          </div>
          <div className='col-12 col-sm-12'>
            <textarea name='description' data-initial-dir="auto" placeholder='Описание' rows={1} value={header.description} readOnly={true}/>
          </div>
        </div>
      </div>
    {tests.map( item => {
      return <TryForm form={item} userAnswers={userAnswers.filter(form => form.id === item.id)[0]}/>
      })}
      <div className='row d-flex justify-content-center testButtons'>
        <div className='col-12 col-sm-12 col-lg-8'>
          <button className='addTest' onClick={async()=>{
            let answers = []
            let allRaiting = 0;
            tests.map( item => {
              allRaiting += Number(item.raiting);
              item.types.map( type => {
                if(type.active && type.type === "string") {
                  const a = type.questions[0].answer;
                  const b = userAnswers?.filter( answer => answer.id === item.id)[0]?.answer;

                  if(a === b?.label) {
                    answers.push({id_form: item.id, raiting: Number(item.raiting)})
                  } else {
                    answers.push({id_form: item.id, raiting: 0})
                  }

                } else if(type.active) {
                  let col = [];
                  const a =  type.questions.filter( question => question.answer === true)
                  const b = userAnswers?.filter( answer => answer.id === item.id)[0]
                  
                  a.map( state => {
                    if(b?.answer?.findIndex( c => c.id === state.id) > -1) {
                      col.push(true)
                    } else {
                      col.push(false)
                    } 
                  })
                  
                  if(col.includes(false)) {
                    answers.push({id_form: item.id, raiting: 0})
                  } else if(col.includes(true)) {
                    answers.push({id_form: item.id, raiting: Number(item.raiting)})
                  }
                }
                })
            })
            let ball = 0;
            answers.map(state => ball += Number(state.raiting))

            let allBall = Math.round((ball/allRaiting) * 10)
            
            if(params.get('idTest') === 16) {
              alert(`Ваш балл  ${allBall}`)
              navigate('/')
        
            } else {
              await addRaiting({
                idTest: params.get('idTest'),
                idUser: authUser.user.id,
                answers: userAnswers,
                raiting: allBall
              })
              dispatch(addDefaultAnswerUser())
              alert(`Ваш балл  ${allBall}`)
              navigate('/account')
            }
          }
          }>
            Закончить тест
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryTest;