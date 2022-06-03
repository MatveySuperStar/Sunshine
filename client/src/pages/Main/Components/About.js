import React, {useEffect, useCallback, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './About.scss'
import foto1 from '../../../image/Foto1.jpg'
import foto2 from '../../../image/Foto2.jpg'
import foto3 from '../../../image/Foto3.jpg'
import foto4 from '../../../image/Foto4.jpg'
import foto5 from '../../../image/Foto5.jpg'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { 
  updateEmailEmailAction, 
  updateEmailErrorsAction, 
  updateEmailKursAction, 
  updateEmailMessageAction, 
  updateEmailNameAction, 
  updateEmailPhoneAction 
} from '../../../store/reducers/emailReducer';
import { addPlacesAction } from '../../../store/reducers/placesReducer';
import { sendMessageEmail } from '../../../../http/emailAPI';
import { getAllPlacesWithPage } from '../../../../http/placesAPI';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { text } from '../Constants';

const About = ({refAbout, refMenu}) => {
  const [activeButton, setActiveButton] = useState(false);
  const emailData = useSelector(state => state.email.email);
  const places = useSelector(state => state.places.places);
  const kursRef = useRef();

  const dispatch = useDispatch();
  const mapRef = useRef();

  useEffect(() => {
    kursRef.current.style.height = kursRef.current.scrollHeight + "px";
  }, [emailData.kurs.value, kursRef.current])

  const clickHandler = useCallback(async(e) => {
    e.preventDefault()

    const data = await sendMessageEmail(emailData)

    if(data.errors) {
      dispatch(updateEmailErrorsAction(data.errors))
    } else {
      alert('сообщение отправлено')
    }
  }, [emailData])

  const downKeyUp = useCallback((e) => {
    if(e.target.scrollTop > 0){
      e.target.style.height = e.target.scrollHeight + "px";
    } 
  }, [])

  useEffect(async ()=>{
    const places = await getAllPlacesWithPage(1)
    dispatch(addPlacesAction(places))
  }, [])

  const leftAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: custom => ({
      x: 0,
      opacity: 1,
      transition: {delay: custom * 0.2}
    })
  }
  
  const rightAnimation = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: custom => ({
      x: 0,
      opacity: 1,
      transition: {delay: custom * 0.2}
    })
  }

  const topAnimation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: custom => ({
      y: 0,
      opacity: 1,
      transition: {delay: custom * 0.2}
    })
  }

  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: '300px',
    slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '12px',
          slidesToShow: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '12px',
          slidesToShow: 1,
          infinite: true,
            arrows : false
        }
      },
    ]
    
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      ref={refAbout} 
      id='about_us' 
      className='about_us'
    >
      <div className='container'>
        <h2>О нас</h2>

        <motion.div custom={1} variants={topAnimation} className='about_us__text'>
          <p>
            { activeButton ? text : text.slice(0, 100)+"..."}
          </p>
          <button 
            className={`${activeButton ? 'active' : ''}`} 
            onClick={() => setActiveButton(!activeButton)}>
            <div>
              {activeButton ?
              <img src="https://img.icons8.com/metro/ffffff/collapse-arrow.png"/>
              :
              <img src="https://img.icons8.com/metro/FF8000/expand-arrow--v1.png"/>
              }
            </div>
          </button>
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }} 
          className='row about_us__foto'
        >
          <motion.div custom={2} variants={topAnimation} className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
            <Slider {...settings}>
              <div className='foto-img'>
                <img  src={foto1} />
              </div >
              <div className='foto-img'>
                <img  src={foto2} />
              </div>                
              <div className='foto-img'>
                <img  src={foto3} />
              </div>                
              <div className='foto-img'>
                <img  src={foto4} />
              </div>
              <div className='foto-img'>
                <img  src={foto5} />
              </div>
            </Slider>
          </motion.div>
        </motion.div>
        <motion.div  
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }} 
          className='row about_us_form'
          >
          <motion.div custom={2} variants={leftAnimation} className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 map' ref={mapRef} >
              <YMaps>
                <Map width={'100%'} height={mapRef.current?.offsetWidth} defaultState={{ center: [53.902283, 27.561805], zoom: 6 }} >
                  {places.data.map( (place, index) => {
                    return <Placemark key={index} geometry={[place.latitude, place.longitude]} />
                  })}
                </Map>
              </YMaps>
          </motion.div>
          <motion.div ref={refMenu} custom={2} variants={rightAnimation} className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
            <form className='row'>
              <h3> Форма связи с нами </h3>
              <div className='col-md-6'>
                <p>Имя</p>
                <input type='text' value={emailData.name} onChange={(e) => dispatch(updateEmailNameAction(e.target.value))} />
                <span className='error'>{emailData.errors.name}</span>
              </div>
              <div className='col-md-6'>
                <p>Предпочитаемый курс</p>
                <textarea ref={kursRef} list='kursdatalist' value={emailData.kurs.value} onChange={(e) => dispatch(updateEmailKursAction(e.target.value))}/>
                <datalist id='kursdatalist'>
                  {
                    emailData.kurs.datalist.map(item => <option key={item} value={item}>{item}</option>)
                  }
                </datalist>
              </div>
              <div className='col-md-6'>
                <p>Email</p>
                <textarea type='email' onKeyUp={downKeyUp} value={emailData.email} onChange={(e) => dispatch(updateEmailEmailAction(e.target.value))}/>
                <span className='error'>{emailData.errors.email}</span>
              </div>
              <div className='col-md-6'>
                <p>Номер телефон</p>
                <input type='phone' value={emailData.phone} onChange={(e) => dispatch(updateEmailPhoneAction(e.target.value))}/>
                <span className='error'>{emailData.errors.phone}</span>
              </div>
              <div className='col-md-12'>
                <p>Ваше сообщение</p>
                <textarea className='message' style={{overflow: "hidden"}} onKeyUp={downKeyUp} value={emailData.message} onChange={(e) => dispatch(updateEmailMessageAction(e.target.value))}/>
                <span className='error'>{emailData.errors.message}</span>
              </div>
              <div className='col-md-12'>
                <p>Заполняя форму, Вы даете свое согласие на обработку персональных данных.</p>
                <input type='submit' onClick={(e) => clickHandler(e)}/>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;