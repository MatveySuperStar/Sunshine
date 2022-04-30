import React, {useState, useEffect} from 'react';
import Test from  './Test/Test'
import {Link, Route, Routes,  useNavigate} from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux';
import {getTest, getAllTests } from '../../http/testAPI';
import { addAllTestsAction } from '../store/reducers/testsReducer';
import DateTimePicker from 'react-datetime-picker';
import { getAllTestsGroup } from '../../http/accessTestAPI';
import { getAllGroupsAction } from '../store/reducers/groupsReducer';
import { updateAccessDateAction, updateAccessUpdateAction } from '../store/reducers/testReducer';
import { useCookies } from 'react-cookie';

const Tests = () => {
  const tests = useSelector(state => state.tests.tests)
  const groups = useSelector(state => state.groups.groups.data)
  const accessTest = useSelector(state => state.test.accessTest)
  const [cookies, setCookie, removeCookie] = useCookies();

  const history =  useNavigate()

  const dispatch = useDispatch()

  const [nav, useNav] = useState([{name: 'all', active: false},{name: 'my', active: true}, {name: 'search', active: true}])

  const changeActive = async(e, name) => {
    e.preventDefault()

    useNav(nav.map(item => {
      if(item.name === name) {
        return {...item, active: item.active = true}
      } else {
        return {...item, active: item.active = false}
      }
    }))

    if(name === 'all') {
      const testsData = await getAllTests()

      dispatch(addAllTestsAction(testsData))
    } else if(name === 'my') {
      const testsData = await getAllTests(cookies.user.id)
      
      dispatch(addAllTestsAction(testsData))
    }
  }

  const returnActive = (name) => {
    return nav.find(item => item.name === name).active
  }

  const accessTestGroup = async(e, idTest, access) => {
    e.stopPropagation()
    dispatch(updateAccessUpdateAction({idTest: idTest, update: !accessTest.update}))
    const groups = await getAllTestsGroup(idTest)

   dispatch(getAllGroupsAction({data: groups}))
  }

  useEffect(async()=>{
    dispatch(getAllGroupsAction({data: []}))
    
    const testsData = await getAllTests(cookies.user.id)

    dispatch(addAllTestsAction(testsData))
  }, [])

  const newTest = () => {
    history('/account/test')
  }

  const updateTest = (idTest) => {
    history(`/account/test?idTest=${idTest}`)
  }

  const activeAccess = (idTest) => {
    console.log( accessTest.idTest)
    return accessTest.idTest === idTest && accessTest.update === true ? 'd-flex' : 'd-none'
  }
  return (
    <div className='container'>
      <div className='test_add'>
       <div className='row justify-content-center wrapper_add'>
         <div className='col-md-5' onClick={newTest}>
          <h3>+ Создать тест</h3>
         </div>
       </div>
      </div>
      <div className='tests_navigation'>
        <nav className=''>
          <div>
            <a className={`${returnActive('all') ? 'active' : ''}`} onClick={async(e) => changeActive(e,'all')}>Все тесты</a>
          </div>
          <div>
            <a className={`${returnActive('my') ? 'active' : ''}`} onClick={async(e) => changeActive(e, 'my')}>Мои тесты</a>
          </div>
            <input className={`${returnActive('search') ? 'active' : ''}`} onClick={async(e) => changeActive(e, 'search')} type='text'></input>
        </nav>
      </div>
      <div className='row tests_items'>
      { tests.map( test => {
        return (
        <div className='col-md-12'>
          <div className='row item' onClick={()=>updateTest(test.id)}>
            <div className='col-md-1'> <img src='https://img.icons8.com/dotty/30/000000/test.png'/></div>
            <div className='col-md-7'> {test.title} </div>
            <div className='col-md-2'> 
              <div className='add' onClick={async(e)=> accessTestGroup(e, test.id, test)}>Доступ</div>
            </div>
            <div className='col-md-2'> 
              <div className='delete' onClick={async(e)=> accessTestGroup(e, test.id)}>Удалить</div>
            </div>
          </div>


          <div className={`row item-group ${activeAccess(test.id)}`}>
            <div className='col-md-4'>
              <div className='col-md-12'>
                <label> Управление доступом к тесту </label>
              </div>
              <div className='col-md-12'>
                <DateTimePicker onChange={(value)=>dispatch(updateAccessDateAction(value))} value={accessTest.date} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='col-md-12'>
                <label>Доступ к группе</label>
              </div>
              <div className='col-md-12'>
                <input list='groupDataList' type='text' value={accessTest.idgroup}/>
                <datalist>
                  <option> </option>
                </datalist>
              </div>
            </div>
            <div className='col-md-2 d-flex justify-content-center align-items-end'>
              <button>
                Сохранить
              </button>
            </div>
            <div className='col-md-2 d-flex justify-content-center align-items-end'>
              <button onClick={() =>dispatch(updateAccessUpdateAction({idTest: test.id, update: !accessTest.update}))}>
                Выйти
              </button>
            </div>
          </div>
        </div>)
      })}
      </div>
      {/*<Test />*/}
    </div>
  );
};

export default Tests;