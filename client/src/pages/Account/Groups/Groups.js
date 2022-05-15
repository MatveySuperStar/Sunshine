import React, { useEffect, useState } from 'react';
import FormAdmin from '../Components/FormAdmin';
import FormQuery from './FormQuery';
import Table from '../Components/Table';
import { getAllGroupsWithPageAction, updateAllGroupsAction } from '../../../store/reducers/groupsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroup, getGroups, putGroup, addGroup } from '../../../../http/groupAPI';
import TableNested from './TableNested';
import { getUsersInGroups } from '../../../../http/userAPI';
import { updateAllUsersAction } from '../../../store/reducers/usersReducer';
import { defaultGroupAction, updateGroupAction, updateGroupNameAction } from '../../../store/reducers/groupReducer';
import { addCurrentPageGroupsAction } from '../../../store/reducers/groupsReducer';
import { updateDataListUserLikeLike } from '../../../store/reducers/userReducer';

const Groups = () => {

  const dispatch = useDispatch()
  const groups = useSelector(state => state.groups.groups)
  const group = useSelector(state => state.group.group)
  const user = useSelector(state => state.groups.user)
  const DataList = useSelector(state => state.user.userForLike)
  const users = useSelector(state => state.users.users)
  
  const [isSubStatusUpdate, setIsSubStatusUpdate] = useState(false)

  useEffect(async()=> {
    dispatch(getAllGroupsWithPageAction(await getGroups(1)))
  }, []) 

  const params = [
    {label: 'Название группы', type: 'text', value: group.name, action: updateGroupNameAction},  
  ]

  const getUsers = async (item) => {
    dispatch(updateAllUsersAction(await getUsersInGroups(item.id)))
  } 

  const addUpdateGroup = (group) => {
    /*dispatch(defaultErrorUserAction())*/
    dispatch(updateDataListUserLikeLike(false))
    dispatch(updateAllUsersAction({data: [], idGroup: 0}))
    dispatch(updateGroupAction({
      ...group,
      update: true  
    }))
  }

  const activeRow = (id) => {
    return group.id === id
  }

  const legends = [
    'Название группы',
    'Количество учеников'
  ]

  const items = {
      data: groups.data.map( item => {
        return { id: item.id, name: item.name, count: item.count}
      }),
      legends: [
        'Имя',
        'Фамилия',
        'Отчество',
        'статус'
      ],
      items: users.data,
      idGroup: users.idGroup
    }

  const statusUpdate = group.update ? 'active' : 'noActive'
    
  const currentPage = async(value) =>{
    dispatch(updateDataListUserLikeLike(false))
    dispatch(addCurrentPageGroupsAction({currentPage: value}))
    dispatch(updateAllGroupsAction(await getGroups(value)))
  }

  const openSubItem = async() => {
    dispatch(updateDataListUserLikeLike(!DataList.update))
    dispatch(updateAllUsersAction(await getUsersInGroups(group.id)))

    if(DataList.update) {
      dispatch(updateAllUsersAction({data: [], idGroup: 0}))
    }
  }

  const deleteItem = async() => {
    dispatch(updateAllGroupsAction(await deleteGroup(group.id, groups.currentPage)))

    dispatch(updateDataListUserLikeLike(false))
    dispatch(updateAllUsersAction({data: [], idGroup: 0}))
    dispatch(defaultGroupAction())
  }

  const putItem = async() => {
    dispatch(updateAllGroupsAction(await putGroup({...group, page: groups.currentPage})))
  }

  const addItem = async() => {
    const groupData = await addGroup({...group, page: groups.currentPage})
    
    if(groupData.errors) {
      
    } else {
    
    dispatch(updateAllGroupsAction({data: groupData.data, countPage: users.countPage}))
    }
  }

  const exitItem = async() => {
    dispatch(updateDataListUserLikeLike(false))
    dispatch(updateAllUsersAction({data: [], idGroup: 0}))
    dispatch(defaultGroupAction())
  }


  return (
    <div className='container'>
      <div className='row header_table'>
        <div className='col-md-6'>
          <h3>Таблица Групп</h3>
        </div>
      </div>
      <div className='row'>
        <div className='add_form col-md-3'>
          <div>
          <FormAdmin  
            params={params} 
            exitItem={exitItem} 
            statusUpdate={statusUpdate} 
            openSubItem={openSubItem}
            addItem={addItem}
            putItem={putItem}
            deleteItem={deleteItem}
            isSubItem={true}
          />
          </div>
          <div className={`${DataList.update ? 'active' : 'noActive'}`}>
          <FormQuery  
            params={params}  
            group={group}
            statusUpdate={isSubStatusUpdate} 
            openSubItem={openSubItem} 
            setIsSubStatusUpdate={setIsSubStatusUpdate}
            />
          </div>
        </div>
        <div className='col-md-9'>
          <TableNested 
            activeRow={activeRow} 
            currentPage={currentPage}
            items={items}  
            countPage={groups.countPage}
            legends={legends} 
            addUpdate={addUpdateGroup}
            statusUpdate={statusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Groups;