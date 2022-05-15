import React, {useMemo} from 'react';
import { useDispatch} from 'react-redux';

const FormAdmin = ({params, statusUpdate, openSubItem, exitItem, addItem, putItem, deleteItem, isSubItem=false}) => {
  
  const dispatch = useDispatch();

  const itemsForm = useMemo(() => {
    return params.map( param => {
      return(
        param.type === 'select' ?
        <div key={param.label} className='col-md-12'>
          <label>{param.label}</label>
          <select name="select" value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}>
            {param.options.map( option => <option 
            value={option.value}>{option.name}</option>)}
          </select>
        </div>
        : 
        <div key={param.label}  className='col-md-12'>
          <label>{param.label}</label>
          <input type={param.type} value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}/>
          <span className='error'>{param.error}</span>
        </div>
      )
    })
  }, [params, dispatch]);

  const buttonsForm = useMemo(() => {
    return (
      statusUpdate === "noActive" ?   
        <div className='row buttons'>
          <div className={`col-md-12`}>
            <button onClick={addItem}>
              Добавить</button>
          </div>
        </div>
      :
        <div className='row buttons'>
          <div className={`col-md-6 `}>
            <button onClick={putItem}>
              Изменить
            </button>
          </div>
          <div className={`col-md-6`}>
            <button onClick={deleteItem}>
              Удалить
            </button>
          </div>
          {
            !!isSubItem &&
            <div className={`col-md-6`}>
              <button onClick={() => dispatch(openSubItem())}>Состав</button>
            </div>
          }
          <div className={`col-md-6`}>
            <button onClick={exitItem}>Выйти</button>
          </div>
        </div>
    )
  }, [statusUpdate, addItem, putItem, deleteItem, exitItem, dispatch, isSubItem, openSubItem]);

  return (
    <>
      {itemsForm}
      {buttonsForm}
    </>
  );
};

export default FormAdmin;