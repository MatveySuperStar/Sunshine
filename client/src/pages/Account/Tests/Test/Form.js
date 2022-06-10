import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import Question from './Question';
import { activeAnswerAction, addFormAction, addFormFileAction, changeTypeAction, deleteFormAction, updateQuestionTitle } from '../../../../store/reducers/testReducer';
import VoiceStream from './VoiceStream';

const Form = ({form}) => {
  const dispatch = useDispatch()
  const [activeTypes, setActiveTypes] = useState(false)
  const [activeMoreTypes, setActiveMoreTypes] = useState(false)
  const [img, setImg] = useState('')
  const imgRef = useRef()

  const filesType = [ 
    {type: 'voice', href: 'https://img.icons8.com/ios-glyphs/30/undefined/microphone.png'}, 
    {type: 'files', href: 'https://img.icons8.com/material-outlined/24/undefined/file.png'}
  ];

  const predImage = async(e) => {

    if (e.target.files) {

      const files = Array.from(e.target.files);

      Promise.all(files.map(file => {
          return (new Promise((resolve,reject) => {
              const reader = new FileReader();
              reader.addEventListener('load', (ev) => {
                  resolve(ev.target.result);
              });
              reader.addEventListener('error', reject);
              reader.readAsDataURL(file);
          }));
      }))
      .then(images => {
        if(e.target.files[0].type === "audio/mpeg") {
          dispatch(addFormFileAction({idForm: form.id, type: 'mp3', href: images}))
        } else {
          dispatch(addFormFileAction({idForm: form.id, type: 'image', href: images}))
        }
       
      }, error => {        
          console.error(error);
      });

    }
  
  }

  const changeType = (type) => {
    setActiveTypes(!activeTypes)
    dispatch(changeTypeAction({id: form.id, type: type}))
  }

  const allTypes = () => {
    return form.types.map( type => {
      return (
      <div className={`question_type`} onClick={() => changeType(type.type)}>
        <img src={type.img} />
        <span>{type.rusType}</span>
      </div> 
      )
    })
  }

  const allFiles = () => {
    return filesType.map( type => {
      return (
      <div className={`question_type`} onClick={() => {
        if(type.type === 'files') {
          imgRef.current.click()
        } else {
          dispatch(addFormFileAction({idForm: form.id, type: 'voice', href: ''}))
        }
        setActiveMoreTypes(!activeMoreTypes)
        }
        }>
        <img src={type.href} />
      </div> 
      )
    })
  }

  const activeType = () => {
    return form.types.map( type => {
      if(type.active) {
        return <div className={`question_type`} onClick={() => setActiveTypes(!activeTypes)}>
          <img src={type.img} />
          <span>{type.rusType}</span>
        </div>             
      }    
     })
  }

  const Questions = () => {
    return form.types.map( type => {
      if(type.active) {
        return type.questions.map( question => {
          return <Question
            id_form={form.id}
            img={type.activeImg || type.activeImg}
            type={type.type}
            questions={type.questions || []}
            question={question}/>
        })
      }
    })
  }

  const deleteForm = () =>{
    dispatch(deleteFormAction({id: form.id}))
  }

  const activeAnswer = () => {
    dispatch(activeAnswerAction({id: form.id}))
  }

  console.log(form.files)
  return (
    <div className='col-12 col-sm-12 col-md-12 col-lg-8 form'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <textarea name='description' placeholder='Описание' rows={1}
          value={form.title} onChange={(e)=>dispatch(updateQuestionTitle({id: form.id, title: e.target.value}))}/>
        </div>
        <div className='col-12 col-md-1 all_type'>
          <div className={`burger_type ${activeMoreTypes ? 'active' : 'noActive'}`}>
            {allFiles()}
          </div>
          <img 
            className='all_files'
            onClick={() => setActiveMoreTypes(!activeMoreTypes)} 
            src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/36/undefined/external-plus-user-interface-tanah-basah-detailed-outline-tanah-basah.png"/>
        </div>
        <div className='col-12 col-md-5'>
          <div className='all_type'>
            <div className={`burger_type ${activeTypes ? 'active' : 'noActive'}`}>
              {allTypes()}
            </div>
            {activeType()}
          </div>
        </div>
      </div>
      <div>
      <input hidden={true} ref={imgRef} type={"file"} onChange={async(e) => {
        await predImage(e)
        }}></input>
        {form.files.length > 0 ? form.files.map( item => {
          if(item.type === 'image') {
            return <div className='img_form'><img className='img_form' src={item.href} /></div>
          } 
        }) : ''}
        <div>
        {form.files.length > 0 ? form.files.map( item => {
          if(item.type === 'voice') {
            return <VoiceStream idFile={item.id} form={form} audioFile={item.href}/>
          } 
        }) : ''}
        </div>
        <div>
        {form.files.length > 0 ? form.files.map( item => {
          if(item.type === 'mp3') {
            return <audio controls src={item.href}/>
          } 
        }) : ''}
        </div>
      </div>
      {Questions()}
      <div className='row answer'>
        <div className='col-12 col-sm-6 col-md-8'>
          <button onClick={activeAnswer}>Ответы</button>
          <span>({form.raiting} баллов)</span>
        </div>
        <div className='col-12 col-sm-3 col-md-2'>
          <button onClick={deleteForm}>Удалить</button>
        </div>
        <div className='col-12 col-sm-3 col-md-2'>
          <button onClick={() => { dispatch(addFormAction()) }}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default Form;