import React, {useState, useEffect} from 'react';
import Test from  './Test/Test'
import {Link, Route, Routes,  useNavigate} from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux';
import {getTest, getAllTests, deleteTest, likeTest } from '../../../../http/testAPI';
import { addAllTestsAction } from '../../../store/reducers/testsReducer';
import DateTimePicker from 'react-datetime-picker';
import { addAccessTest, getAllTestsGroup, putAccessTest, deleteAccessTest } from '../../../../http/accessTestAPI';
import { getAllGroupsAction } from '../../../store/reducers/groupsReducer';
import { updateAccessDateAction, updateAccessGroupAction, updateAccessUpdateAction } from '../../../store/reducers/testReducer';
import { useCookies } from 'react-cookie';
import { likeGroup } from '../../../../http/groupAPI';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Tests = () => {
  const tests = useSelector(state => state?.tests?.tests)
  const groups = useSelector(state => state?.groups?.groups?.data)
  const accessTest = useSelector(state => state?.test?.accessTest)
  const [cookies, setCookie, removeCookie] = useCookies();
  const authUser = useSelector(state => state.authUser?.authUser)
  const [choiceTest, setChoiceTest] = useState({name: 'my'})
  const [textSearch, setTextSearch] = useState('');

  const [accessDeleteGroup, setAccessDeleteGroup] = useState(false)

  const history =  useNavigate()

  const dispatch = useDispatch()

  const [nav, useNav] = useState([{name: 'all', active: false},{name: 'my', active: true}])
  const [search, setSearch] = useState(false)

  useEffect(async()=>{
    dispatch(getAllGroupsAction({data: []}))
    
    const testsData = await getAllTests(authUser.user.id)

    dispatch(addAllTestsAction(testsData))
  }, [])
  //actions with the tests
  const newTest = () => {
    history('/account/test')
  }

  const updateTest = (idTest) => {
    history(`/account/test?idTest=${idTest}`)
  }
  /////////////
  const changeActive = async(e, name) => {
    e.preventDefault()
    setChoiceTest({name: name})

    useNav(nav.map(item => {
      if(item.name === name) {
        return {...item, active: true}
      } else {
        return {...item, active: false}
      }
    }))

    if(name === 'all') {
      const testsData = await getAllTests()

      dispatch(addAllTestsAction(testsData))
    } else if(name === 'my') {
      const testsData = await getAllTests(authUser.user.id)
      
      dispatch(addAllTestsAction(testsData))
    }
  }

  const returnActive = (name) => {
    return nav.find(item => item.name === name).active
  }

  const accessTestGroup = async(e, idTest, access) => {
    e.stopPropagation()
    dispatch(updateAccessUpdateAction({idTest: idTest, update: !accessTest.update}))
  }

  const activeAccess = (idTest) => {
    return accessTest.idTest === idTest && accessTest.update === true ? 'd-flex' : 'd-none'
  }

  //actions with access test
  const accessGroups = async (value, id) => {
    dispatch(updateAccessGroupAction(value))
    const groups = await likeGroup(value, id)
    dispatch(getAllGroupsAction({data: groups.data}))
    setAccessDeleteGroup(groups.accessGroups)
  }

  const saveAccessTest = async(id) => {
    const idGroup = groups.find( group => group.name === accessTest.idGroup)
    const dataGroup = await addAccessTest(id, idGroup.id, accessTest.date)
    dispatch(updateAccessGroupAction(''))
    setAccessDeleteGroup(false)
  }

  const putItem = async(id) => {
    const idGroup = groups.find( group => group.name === accessTest.idGroup)
    const dataGroup = await putAccessTest(id, idGroup.id, accessTest.date)
    dispatch(updateAccessGroupAction(''))
    setAccessDeleteGroup(false)
  }

  const deleteItem = async(id) => {
    const idGroup = groups.find( group => group.name === accessTest.idGroup)
    const dataGroup = await deleteAccessTest(id, idGroup.id)
    dispatch(updateAccessGroupAction(''))
    setAccessDeleteGroup(false)
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
          <div>
            <a className={`${search ? 'active' : ''}`} onClick={async() => {
              if(search) {
                const testsData = await likeTest('', nav.find(item=> item.active).name, authUser.user.id)
                dispatch(addAllTestsAction(testsData.test))
                setTextSearch('')
              }
              setSearch(!search)}
            } type='text'>Поиск</a>
          </div>
        </nav>
      </div>
      <div className={`row ${search ? 'd-flex' : 'd-none'}`}>
        <div className='col-4'></div>
        <div className='col-4'>
          <input 
            className='search_input' 
            placeholder='Название теста'
            value={textSearch}
            onChange={async(e) => {
              setTextSearch(e.target.value)
              
              const testsData = await likeTest(e.target.value, nav.find(item=> item.active === true).name, authUser.user.id)
              
              dispatch(addAllTestsAction(testsData.test))
            }} />
        </div>
      </div>
      <div className='row tests_items'>
      { tests.map( test => {
        return (
        <div className='col-md-12'>
          <div className='row item' onClick={()=>updateTest(test.id)}>
            <div className={`col-2 col-sm-2 col-md-1 wrap_one`}> <img src='https://img.icons8.com/dotty/30/000000/test.png'/></div>
            <div className={`col-8 col-sm-8 col-md-7 wrap_one`}> {test.title} </div>
            <div className={`col-md-2 wrap_two`}   onClick={async(e)=> accessTestGroup(e, test.id, test)}> 
              <div className='add'>Доступ</div>
            </div>
            <div className={`col-md-2 wrap_three`} onClick={async(e)=> {
              e.stopPropagation()
              await deleteTest(test.id)
              if(choiceTest.name === 'all') {
                const testsData = await getAllTests()
          
                dispatch(addAllTestsAction(testsData))
              } else if(choiceTest.name === 'my') {
                const testsData = await getAllTests(authUser.user.id)
                
                dispatch(addAllTestsAction(testsData))
              }
              }}> 
              <div className='delete'>Удалить</div>
            </div>
          </div>


          <div className={`row item-group ${activeAccess(test.id)}`}>
            <div className='col-md-3'>
              <div className='col-md-12'>
                <label> Управление доступом к тесту </label>
              </div>
              <div className='col-md-12'>

                <DatePicker
                  selected={accessTest.date}
                  onChange={(value)=>dispatch(updateAccessDateAction(value))}
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd h:mm"
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='col-md-12'>
                <label>Доступ к группе</label>
              </div>
              <div className='col-md-12'>
                <input list='groupDataList' type='text' value={accessTest.idGroup} onChange={async(e) => accessGroups(e.target.value, test.id)}/>
                <datalist id='groupDataList'>
                  { groups.map( group => {
                    return <option> {group.name} </option>
                  })
                  }
                </datalist>
              </div>
            </div>
            <div className='col-md-2 d-flex justify-content-center align-items-end'>
            {
            accessDeleteGroup ? 
              <button onClick={async() => putItem(test.id)}>
                Изменить
              </button>
              :
              <button onClick={async() => saveAccessTest(test.id)}>
                Сохранить
              </button>
            }
            </div>
            {accessDeleteGroup ? 
            <div className='col-md-2 d-flex justify-content-center align-items-end'>
              <button onClick={async() => deleteItem(test.id)}>
                Удалить
              </button>
            </div> : ""}
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