import React from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
import "./VoiceTexnology.scss";
import { useDispatch } from 'react-redux';
import { addFormFileAction, updateFormFileAction } from '../../../../store/reducers/testReducer';

const VoiceStream = ({idFile, form, audioFile}) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({ audio: true });

  const dispatch = useDispatch()
  return (
    
    <div className='row voice_techology'>
      <div className='col-md-8'>
        <audio
          controls
          src={audioFile !== null ? audioFile : mediaBlobUrl}>
              Your browser does not support the
              <code>audio</code> element.
        </audio>
      </div>
      <div className='col-md-2'>
        <button onClick={startRecording}>Запись</button>
      </div>
      <div className='col-md-2'>
        <button onClick={() => {
          dispatch(updateFormFileAction({idForm: form.id, idFile: idFile, href: mediaBlobUrl}))
          stopRecording()}}>Stop</button>
      </div>
    </div>
  );
};

export default VoiceStream;