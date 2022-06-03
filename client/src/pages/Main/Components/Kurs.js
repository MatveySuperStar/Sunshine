import React, { useCallback, useEffect, useState } from 'react';
import './Kurs.scss'
import backgroundImage from '../../../image/Walves3.png'
import { useDispatch } from 'react-redux';
import { updateEmailDatalistKursAction, updateEmailKursAction } from '../../../store/reducers/emailReducer';
import { motion } from 'framer-motion';
import { getKurs } from '../../../../http/kursAPI';


const Kurs = ({refKurs, refAbout, refMenu}) => {

  const dispatch = useDispatch()
  const [kurs, setKurs] = useState([]) 

  useEffect(async()=>{
    const textKurs = kurs.map(item => item.text)
    dispatch(updateEmailDatalistKursAction(textKurs))
    const nowKurs = await getKurs();
    setKurs(nowKurs.data.map( state => {return {...state, active: false}}))
  }, [])
  
  const clickHandler = useCallback((title)=>{
    dispatch(updateEmailKursAction(title));
    window.scrollTo(0, refMenu.current.offsetTop - 100);
  }, [refAbout, window, updateEmailKursAction])

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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      ref={refKurs} 
      className='kurs' 
      id='kurs'>
      <div className='container'>
        <h2>Наши услуги</h2>
        <div className='row kurs_boxes'>
          {kurs.map( (item, index) => {
            return (
            <motion.div custom={index} variants={topAnimation} key={item.title} 
            className={`col-12 ${item.active ? 'col-sm-12 col-md-6 col-lg-6 col-xl-6 active' : 'col-sm-6 col-md-6 col-lg-4 col-xl-3'}`}>
              <div className={`${item.active ? 'active' : ''}`} 
              onClick={()=>setKurs(kurs.map(state => state.id === item.id ? {...state, active: !state.active} : {...state, active: false}))}>
                <p className='title_desc'>
                  <span>{item.title}</span> 
                  {item.active && <span>{item.time ? `${item.time} мин - ` : ''} {item.price} руб</span>}</p>
                {item.active && <p className='desc'>{item.description}</p>}
                {item.active ? 
                  <button onClick={() => clickHandler(item.title)}>Записаться</button> : 
                  <p>{item.time ? `${item.time} мин - ` : ''} {item.price} руб</p>}
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
      <div className='walve' style={{background: `url(${backgroundImage}) no-repeat`}}></div>
    </motion.section >
  );
};

export default Kurs;