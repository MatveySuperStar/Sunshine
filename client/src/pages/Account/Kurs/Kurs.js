import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKurs } from '../../../../http/kursAPI';
import { initKursAction } from '../../../store/reducers/kursReducer';
import { updateOneKursAction } from '../../../store/reducers/oneKursReducer';
import FormKurs from './FormKurs';
import TableKurs from './TableKurs';

const Kurs = () => {
  const dispatch = useDispatch()
  const allKurs = useSelector(state => state?.kurs?.kurs)
  const oneKurs = useSelector(state => state?.oneKurs?.oneKurs)

  useEffect(async()=>{
    dispatch(initKursAction(await getKurs()))
  }, [])

  const legends = [
    'наименование курса',
    'цена',
    'время'
  ]


  const addUpdate = (kurs) => {
    dispatch(updateOneKursAction({
      ...kurs,
      update: true  
    }))
  }

    const activeRow = (id) => {
      return oneKurs.id === id
    }
  
  return (
    <div className='container'>
      <div className='row header_table'>
        <div className='col-md-6'>
          <h3>Таблица услуг</h3>
        </div>
      </div>
      <div className='row'>
        <div className='add_form col-12 col-md-12 col-xl-3'>
          <FormKurs oneKurs/>
        </div>
        <div className='col-12 col-md-12 col-xl-9'>
          <TableKurs items={allKurs.data} legends={legends} activeRow={activeRow} addUpdate={addUpdate}/>
        </div> 
      </div>
    </div>
  );
};
  

export default Kurs;