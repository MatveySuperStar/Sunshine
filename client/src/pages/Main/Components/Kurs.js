import React, { useEffect, useState } from 'react';
import './Kurs.scss'
import backgroundImage from '../../../image/Walves3.png'
import { useDispatch } from 'react-redux';
import { updateEmailDatalistKursAction } from '../../../store/reducers/emailReducer';
import { motion } from 'framer-motion';
import { getKurs } from '../../../../http/kursAPI';


const Kurs = ({refKurs}) => {

  const dispatch = useDispatch()
  const [kurs, setKurs] = useState([]) 

  useEffect(async()=>{
    const textKurs = kurs.map(item => item.text)
    dispatch(updateEmailDatalistKursAction(textKurs))
    const nowKurs = await getKurs();
    setKurs(nowKurs.data)
  }, [])
  

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
            <motion.div custom={index} variants={topAnimation} key={item.title} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
              <div><p>{item.title}</p><p>{item.time ? `${item.time} мин - ` : ''} {item.price} руб</p></div>
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