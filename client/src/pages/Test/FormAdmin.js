import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FormAdmin = ({params, statusUpdate, openSubItem, exitItem, addItem, putItem, deleteItem}) => {
  
  const dispatch = useDispatch()

  return (
    <>
        {params.map( param => {
          return(
            param.type === 'select' ?
            <div className='col-md-12'>
              <label>{param.label}</label>
              <select name="select" value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}>
                {param.options.map( option => <option 
                value={option.value}>{option.name}</option>)}
              </select>
            </div>
            : 
            <div className='col-md-12'>
              <label>{param.label}</label>
              <input type={param.type} value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}/>
              <span className='error'>{param.error}</span>
            </div>
          )})}
        <div className='row buttons'>
          <div className={`${statusUpdate === 'noActive'  ? 'active' : 'noActive'} col-md-12`}>
            <button onClick={addItem}>
              Добавить</button>
          </div>
          <div className={`${statusUpdate} col-md-6 `}>
            <button onClick={putItem}>
              Изменить
            </button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={deleteItem}>
              Удалить
            </button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={() => dispatch(openSubItem())}>Состав</button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={exitItem}>Выйти</button>
          </div>
        </div>
      </>
  );
};

export default FormAdmin;