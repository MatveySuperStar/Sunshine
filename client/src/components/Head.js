import React, { useState, useEffect, useRef } from 'react';
import '../scss/Head.scss';
import backgroundImage from '../image/bacground-head.jpg' 
import BurgerMenu from './BurgerMenu';
import exit from '../image/icons/exit.png';
import { login } from '../../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Head = ({refBenefits, refKurs, refAbout}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const history =  useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies();

  const authIn = async (e) => {
    e.preventDefault();
    try {

      const data = await login(email, password)
      
      setCookie('user', data.user)
      setCookie('isAuth', {value: true})

      console.log(cookies.user)
      localStorage.setItem('tokenUser', data.user)
      history('/account/')
    } catch(e) {
      console.log('ff')
    
    }
  }

  const ar = useRef()
  const linksData = [
    {
      label: 'Преимущества',
      path: '#benefits',
      exact: false
    },
    {
      label: 'Курсы',
      path: '#kurs',
      exact: false
    },
    {
      label: 'О нас',
      path: '#about_us',
      exact: false
    }
  ]

  const [scroll, setScroll] = useState(0);
  const [links, setLinks] = useState(linksData);
  const [activeModal, setActiveModal] = useState(false);

  const handleScroll = () => {
    setScroll(window.scrollY)   
  };

  const moveScrollClick = (id) => {
    if('#'+refBenefits.current.className === id) {
      window.scrollTo(0, refBenefits.current.offsetTop);
    }
    if('#'+refKurs.current.className === id) {
      window.scrollTo(0, refKurs.current.offsetTop);
    }
    if('#'+refAbout.current.className === id) {
      window.scrollTo(0, refAbout.current.offsetTop);
    }
  }

  useEffect( ()=>{
    window.addEventListener("scroll", handleScroll);
  }, [])
  
  useEffect( ()=>{

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
            <div className='col-6 col-sm-2 col-lg-1'>
              <a><img ref={ar} src='./logo2.png' /></a>
            </div>
            <div className='col-6 col-sm-10 col-lg-11'>
              <ul>
                {
                  links.map( item => <li key={item.path}><a className={item.exact ? 'active' : ''} onClick={() => moveScrollClick(item.path)} >{item.label}</a></li>)
                }
                <div className='button_enter'>
                  <li><a onClick={() => setActiveModal(!activeModal)}>Войти</a></li>
                </div>
              </ul>
              <BurgerMenu />
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
              <p className='error'></p>
            </div>
            <div className='col-md-12'>
              <p>Пароль</p>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <p className='error'></p>
            </div>
            <div className='col-md-12'>
              <input type='submit' onClick={authIn}/>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Head;