import React from 'react';
import Navbar from './Account/Navbar';

const Account = () => {
  return (
    <>
      <div className='container'>
        <div className='Сharacteristic'>
          <div className='row'>
            <div className='col-md-4'>
              <div>
                <img src="https://img.icons8.com/ios/100/000000/student-male--v1.png"/>
                <div>
                  Количество студентов
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div>
                <img src="https://img.icons8.com/small/100/000000/city-buildings.png"/>
                <div>
                  Количество школ
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div>
                <img src="https://img.icons8.com/ios/100/000000/training.png"/>
                <div>
                  Количество преподавателей
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;