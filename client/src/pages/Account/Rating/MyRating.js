import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getMyRaiting } from '../../../../http/raitingAPI';

const MyRating = () => {
  const [tests, setTest] = useState([{}])
  const authUser = useSelector(state => state.authUser?.authUser);

  useEffect(async() => {
    setTest(await getMyRaiting(authUser.user.id))
  },[])

  return (
      <div className='row tests_box'>
        {
          tests.map( test => {
            return (
              <div onClick={() => {
                history(`/account/tryTest?idTest=${test.idTest}`)}
              } className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                <div className='row d-flex align-items-center'>
                  <div className='col-12'>
                    <h3>Оценка - {test.rating}</h3>
                    <p>{test.nameTest}</p>
                    <p>{`${new Date(test.date).getFullYear()}-${new Date(test.date).getMonth()+1}-${new Date(test.date).getDate()}`}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
  );
};

export default MyRating;