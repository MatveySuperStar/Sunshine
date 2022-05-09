import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../scss/About.scss'
import foto from '../image/Foto1.jpg'
import foto2 from '../image/Foto2.jpg'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { 
  updateEmailEmailAction, 
  updateEmailErrorsAction, 
  updateEmailKursAction, 
  updateEmailMessageAction, 
  updateEmailNameAction, 
  updateEmailPhoneAction 
} from '../store/reducers/emailReducer';
import { addPlacesAction } from '../store/reducers/placesReducer';
import { sendMessageEmail } from '../../http/emailAPI';
import { getAllPlacesWithPage } from '../../http/placesAPI';

const About = ({refAbout}) => {
  const emailData = useSelector(state => state.email.email)
  const dispatch = useDispatch()
  const places = useSelector(state => state.places.places)

  const clickHandler = async (e) => {
    e.preventDefault()

    const data = await sendMessageEmail(emailData)

    if(data.errors) {
      dispatch(updateEmailErrorsAction(data.errors))
    } else {
      alert('сообщение отправлено')
    }
  }

  useEffect(async ()=>{
    const places = await getAllPlacesWithPage(1)
    dispatch(addPlacesAction(places))
  }, [])
  return (
    <section ref={refAbout} id='about_us' className='about_us'>
      <div className='container'>
        <h2>О нас</h2>

        <div className='about_us__text'>
          <p>
            Обучение по коммуникативной методике, грамотный и внимательный подход к каждому студенту, 
            подготовка к международным экзаменам, подготовка к ЦТ, работа с аутентичными учебниками и материалами, 
            комплексное развитие навыков в процессе обучения, 
            грамотные и внимательные преподаватели, наличие у представителей кэмбриджиских сертификатов.
          </p>
        </div>
        <div className='row about_us__foto'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <img src={foto} />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <img src={foto2}></img>
          </div>
        </div>
        <div className='row about_us_form'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 map'>
              <YMaps>
                <Map width={"100%"} height={"578.59px"} defaultState={{ center: [53.902283, 27.561805], zoom: 6 }} >
                  {places.data.map( place => {
                    return <Placemark geometry={[place.latitude, place.longitude]} />
                  })}
                </Map>
              </YMaps>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
            <form className='row'>
              <h3> Форма связи с нами </h3>
              <div className='col-md-6'>
                <p>Имя</p>
                <input type='text' value={emailData.name} onChange={(e) => dispatch(updateEmailNameAction(e.target.value))} />
                <span className='error'>{emailData.errors.name}</span>
              </div>
              <div className='col-md-6'>
                <p>Предпочитаемый курс</p>
                <input list='kursdatalist'  value={emailData.kurs.value} onChange={(e) => dispatch(updateEmailKursAction(e.target.value))}/>
                <datalist id='kursdatalist'>
                  {
                    emailData.kurs.datalist.map(item => <option value={item}>{item}</option>)
                  }
                </datalist>
              </div>
              <div className='col-md-6'>
                <p>Email</p>
                <input type='email' value={emailData.email} onChange={(e) => dispatch(updateEmailEmailAction(e.target.value))}/>
                <span className='error'>{emailData.errors.email}</span>
              </div>
              <div className='col-md-6'>
                <p>Номер телефон</p>
                <input type='phone' value={emailData.phone} onChange={(e) => dispatch(updateEmailPhoneAction(e.target.value))}/>
                <span className='error'>{emailData.errors.phone}</span>
              </div>
              <div className='col-md-12'>
                <p>Ваше сообщение</p>
                <textarea style={{overflow: "hidden"}} onKeyUp={(e) => {
                  if(e.target.scrollTop > 0){
                    e.target.style.height = e.target.scrollHeight + "px";
                  }
                }} value={emailData.message} onChange={(e) => dispatch(updateEmailMessageAction(e.target.value))}/>
                <span className='error'>{emailData.errors.message}</span>
              </div>
              <div className='col-md-12'>
                <p>Заполняя форму, Вы даете свое согласие на обработку персональных данных.</p>
                <input type='submit' onClick={(e) => clickHandler(e)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;