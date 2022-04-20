import React from 'react';

const TryFrom = () => {
  return (
     <div className='col-md-8 form'>
      <div className='row'>
        <div className='col-md-6'>
          <textarea name='description' placeholder='Описание' rows={1}
          value={form.title} onChange={(e)=>dispatch(updateQuestionTitle({id: form.id, title: e.target.value}))}/>
        </div>
        <div className='col-md-1'>
          <img src="https://img.icons8.com/small/32/000000/gallery.png"/>
        </div>
        <div className='col-md-5'>
          <div className='all_type'>
            <div className={`burger_type ${activeTypes ? 'active' : 'noActive'}`}>
              {allTypes()}
            </div>
            {activeType()}
          </div>
        </div>
      </div>
      {Questions()}
    </div>
  );
};

export default TryFrom;