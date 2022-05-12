import React, { useState, useEffect, useRef, useCallback} from 'react';
import './Head.scss';
import backgroundImage from '../../../image/Back.jpg' 
import peopleImage from '../../../image/People.png' 
import walves1Image from '../../../image/Walves1.png' 
import originalLogo from '../../../image/original_logo.png' 
import whiteLogo from '../../../image/logo_white.png' 
import { useDispatch, useSelector } from 'react-redux';
import BurgerMenu from './BurgerMenu';
import exit from '../../../image/icons/exit.png';
import { login } from '../../../../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { customErrorAction, defaultCustomErrorAction } from '../../../store/reducers/errorReducer';
import { authUserAction } from '../../../store/reducers/authUserReducer';
import { linksData } from '../Constants';

const Head = ({refBenefits, refKurs, refAbout}) => {
  const errors = useSelector(state => state.error?.customError)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [scroll, setScroll] = useState(0);
  const [links, setLinks] = useState(linksData);
  const [activeModal, setActiveModal] = useState(false);

  const dispatch = useDispatch()
  const history =  useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies();

  const authIn = useCallback(async (e) => {
    e.preventDefault();
    
    const data = await login(email, password)
    
    if(data.status === 200) {
      setCookie('refreshToken', data.data.refreshToken)
      dispatch(defaultCustomErrorAction())
      localStorage.setItem('token', data.data.accessToken)
      dispatch(authUserAction({isAuth: true, user: data.data.user}))
      history('/account/')
    } else {
      dispatch(customErrorAction(data.errors))
    }
  }, [email, password, localStorage])

  const handleScroll = useCallback(() => {
    setScroll(window.scrollY)   
  }, [window.scrollY]);

  const moveScrollClick = useCallback((id) => {
    if('#'+refBenefits.current.className === id) {
      window.scrollTo(0, refBenefits.current.offsetTop);
    }
    if('#'+refKurs.current.className === id) {
      window.scrollTo(0, refKurs.current.offsetTop);
    }
    if('#'+refAbout.current.className === id) {
      window.scrollTo(0, refAbout.current.offsetTop);
    }
  }, [refBenefits, refKurs, refAbout])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])
  
  useEffect(() => {

    if(refBenefits.current.offsetTop - 100 > scroll) {
      setLinks( links.map( item => { return {...item, exact: false} }))
    }
  if( links[0].exact != true ) {
    if(refKurs.current.offsetTop - 100 > scroll && refBenefits.current.offsetTop - 100 < scroll) {
      setLinks( links.map( item => item.path === '#benefits' ? {...item, exact: true} : {...item, exact: false}) )
    }
  } 
  if( links[1].exact != true ) {
    if(refAbout.current.offsetTop - 100 > scroll && refKurs.current.offsetTop - 100 < scroll) {
      setLinks( links.map( item => item.path === '#kurs' ? {...item, exact: true} : {...item, exact: false}) )
    }
  }
  if( links[2].exact != true ) {
    if(refAbout.current.offsetTop - 100 < scroll) {
      setLinks( links.map( item => item.path === '#about_us' ? {...item, exact: true} : {...item, exact: false}) )
    }
  }
  }, [scroll])

  return (
    <section className='head' style={{background: `url(${backgroundImage}) no-repeat`}}>
      <nav className={scroll < 600 ? 'noActive' : 'active'}>
        <div className='container'>
          <div className='row'>
            <div className='col-7 col-sm-6 col-md-3 col-lg-3 logo'>
              <a><img onClick={() => window.scrollTo(0,0)} src={`${scroll < 600 ? whiteLogo : originalLogo}`} /></a>
            </div>
            <div className='col-5 col-sm-6 col-md-9 col-lg-9'>
              <ul>
                {
                  links.map( item => <li key={item.path}><a className={item.exact ? 'active' : ''} onClick={() => moveScrollClick(item.path)} >{item.label}</a></li>)
                }
                <div className='button_enter'>
                  <li><a onClick={() => setActiveModal(!activeModal)}>Войти</a></li>
                </div>
              </ul>
              <BurgerMenu scroll={scroll} activeAuth={() => setActiveModal(!activeModal)} />
            </div> 
          </div>
        </div>
      </nav>
      <div className='modalAuth' style={{display: activeModal || 'none'}}>
        <div className='container'>
          <form className='row'>
            <img onClick={() => setActiveModal(!activeModal)} src={exit} />
            <h3>Авторизация</h3>
            <div className='col-md-12'>
              <p>Логин</p>
              <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className='error'>{errors.find( error => error.param === 'email')?.msg}</p>
            </div>
            <div className='col-md-12'>
              <p>Пароль</p>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <p className='error'>{errors.find( error => error.param === 'password')?.msg}</p>
            </div>
            <div className='col-md-12'>
              <input type='submit' onClick={authIn}/>
            </div>
          </form>
        </div>
      </div>
      <div className='container main_text'>
        <div className='row '>
          <div className='col-sm-10 col-md-9 col-lg-7'>
            <h1>Пройдите пробный тест<p> ПРЯМО СЕЙЧАС ;)</p></h1>
            <div className='col-md-7'>
              <p>Начните оттуда, где вы сейчас находитесь.
              Используйте то, что у вас есть, и делайте все, что можете</p>
            </div>
            <div className='col-md-5 col-lg-3'>
              <button> Пройти </button>
            </div>
          </div>
        </div>
      </div>    
      <img className='people' src={peopleImage} />
      <div className='walve' style={{background: `url(${walves1Image}) no-repeat`}}></div>
    </section>
  );
};

export default Head;