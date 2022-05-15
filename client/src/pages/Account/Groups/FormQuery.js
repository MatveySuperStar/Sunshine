import React, {useCallback, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFioUserLike, updatePhoneUserLike} from '../../../store/reducers/userReducer';
import { updateAllUsersAction, updateDataListUsersAction } from '../../../store/reducers/usersReducer';
import { getLikeUsers, putUserGroup } from '../../../../http/userAPI';
import { userErrorAction } from '../../../store/reducers/userErrorReducer';

const FormQuery = ({group, statusUpdate, addItem, putItem, deleteItem, setIsSubStatusUpdate}) => {
  
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.users.dataListUsers)
  const userLike = useSelector(state => state.user.userForLike)

  const changeFio = useCallback(async (e) => {
    dispatch(updateFioUserLike(e.target.value))
    const likeData = await getLikeUsers(userLike, group.id)
    dispatch(updateDataListUsersAction(likeData))
    setIsSubStatusUpdate(likeData.existenceUser) 
  },[dispatch, getLikeUsers, userLike, group, updateFioUserLike, updateDataListUsersAction, getLikeUsers, setIsSubStatusUpdate])

  const changePhone = useCallback(async (e) => {
    dispatch(updatePhoneUserLike(e.target.value))
    const likeData = await getLikeUsers(userLike, group.id)
    dispatch(updateDataListUsersAction(likeData))
    setIsSubStatusUpdate(likeData.existenceUser) 
  },[dispatch, getLikeUsers, userLike, group, setIsSubStatusUpdate])

  const putuserGroup = useCallback(async() => {
    const usersData = await putUserGroup(usersList[0].id, group.id, false) 
    dispatch(updateAllUsersAction({data: usersData.data, idGroup: group.id}))
  }, [usersList, updateAllUsersAction, group, dispatch, putUserGroup])

  const deleteUserGroup = useCallback(async() => {
    const usersData = await putUserGroup(usersList[0].id, group.id, true) 
    dispatch(updateAllUsersAction({data: usersData.data, idGroup: group.id}))
  }, [usersList, updateAllUsersAction, group, dispatch, putUserGroup])

  const buttonsForm = useMemo(() => {
    return (
      !statusUpdate ?   
        <div className='row buttons'>
          <div className={`col-md-12`}>
            <button onClick={async() => await putuserGroup()}>
              Добавить в группу</button>
          </div>
        </div>
      :
        <div className='row buttons'>
          <div className={`col-md-12`}>
            <button onClick={async() => await deleteUserGroup()}>
              Удалить из группы
            </button>
          </div>
        </div>
    )
  }, [statusUpdate, putuserGroup, deleteUserGroup]);

  return (
    <>
      <div className='col-md-12'>
        <label>Добавить пользователя в группу</label>
      </div>
      <div className='col-md-12'>
        <label>ФИО</label>
        <input list="fio" value={userLike.fio} onChange={async(e) => await changeFio(e)}/>
        <datalist id='fio'>
          {
            usersList.map( dataList => {
              return <option key={dataList.fio} value={dataList.fio}>{dataList.fio}</option>
            } )
          }
        </datalist>
      </div>
      <div className='col-md-12'>
        <label>Телефон</label>
        <input list='phone' value={userLike.phone} onChange={async(e) => await changePhone(e)}/>
        <datalist id='phone'>
          {
            usersList.map( dataList => {
              return <option key={dataList.phone} value={dataList.phone}>{dataList.phone}</option>
            } )
          }
        </datalist>
      </div>
      {buttonsForm}
    </>
  );
};

export default FormQuery;