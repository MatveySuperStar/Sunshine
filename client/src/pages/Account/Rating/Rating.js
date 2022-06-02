import React, {useState} from 'react';
import TableRating from './TableRating';
import { useSelector } from 'react-redux';
import MyRating from './MyRating';

const Rating = () => {
  const authUser = useSelector(state => state.authUser?.authUser);
  const [navRating, setNavRating] = useState([{active: false}, {active: true}])
  const [all, setAll] = useState(false)
  

  return (
    <div className='container'>
    <div className='row header_table'>
      { 
      authUser.user.status === 'Ученик' ?
      <div className='col-md-6'>
        <h3>Мой рейтинг</h3>
      </div>
      :
      <div className='col-md-6'>
        <h3>Рейтинги</h3>
      </div>
      }
    </div>
    { 
      authUser.user.status === 'Ученик' ?
      <MyRating />
      :
      <div className='row'>
        <nav className='navRating'>
          <a 
            className={`${navRating.find((item,index) => index === 0).active ? 'active' : ''}`}
            onClick={ ()=>{
              setNavRating(navRating.map((item, index) => index === 0 ? {active: true} : {active: false}))
              setAll(true)
            }}
          >Все рейтинги</a>
          <a 
            className={`${navRating.find((item,index) => index === 1).active ? 'active' : ''}`}
            onClick={()=>{
              setNavRating(navRating.map((item, index) => index === 1 ? {active: true} : {active: false}))
              setAll(false)
            }}
          >Рейтинги моей группы</a>
        </nav>
        <div className='col-md-12'>
          <TableRating all={all} navRating={navRating}/>
        </div>
      </div>
    }
  </div>
  );
};

export default Rating;