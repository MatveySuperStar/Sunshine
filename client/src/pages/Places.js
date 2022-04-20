import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addPlace, deletePlace, getAllPlacesWithPage, putPlace } from '../../http/placesAPI';
import { 
  addCurrentPagePlacesAction, 
  addPlaceAction, 
  addPlacesAction, 
  defaultPlaceAction, 
  updatePlaceLatitudeAction,
   updatePlaceLongitudeAction, 
   updatePlaceNameAction, 
   updatePlacesAction } from '../store/reducers/placesReducer';
import Table from './Test/Table';
import FormAdmin from './Test/FormAdmin';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const Places = () => {

  const dispatch = useDispatch()
  const places = useSelector(state => state.places.places)
  const place = useSelector(state => state.places.place)

  useEffect(async() => {
    const places = await getAllPlacesWithPage(1)
    dispatch(addPlacesAction(places))
  }, [])

  const addUpdate = (placeData) => {
    
    dispatch(addPlaceAction({
      id: placeData[0],
      name: placeData[1], 
      latitude: placeData[2], 
      longitude: placeData[3],
      update: true  
    }))
  }

  const currentPage = async(page) =>{
    console.log(page)
    dispatch(addPlacesAction(await getAllPlacesWithPage(page)))
  }

  const activeRow = (id) => {
    return place.id === id
  }

  const statusUpdate = place.update ? 'active' : 'noActive'

  const params = [
    {label: 'Город', type: 'text', action: updatePlaceNameAction, value: place.name, /*error: userError.name*/},
    {label: 'Длина', type: 'text', action: updatePlaceLatitudeAction, value: place.latitude, /*error: userError.surname*/},
    {label: 'Ширина', type: 'text', action: updatePlaceLongitudeAction, value: place.longitude, /*error: userError.patronymic*/},
  ]

  const legends = [
    ...params.map(item => item.label),
  ]

 
  const items = places.data.map( item => {
      return [ item.id, item.name, item.latitude, item.longitude]
    })
 
  const exitItem = () => {
    dispatch(defaultPlaceAction())
  }

  const addItem = async() => {
    const placesData = await addPlace({...place, page: places.currentPage})
    
    dispatch(updatePlacesAction({places: placesData.places, countPage: placesData.countPage}))
  }

  const putItem = async() => {
    dispatch(updatePlacesAction(await putPlace({...place, page: places.currentPage})))
  }

  const deleteItem = async() => {
    dispatch(updatePlacesAction(await deletePlace(place.id, places.currentPage)))
    dispatch(defaultPlaceAction())
  }

  return (
    <div className='container'>
      <div className='row header_table'>
        <div className='col-md-6'>
          <h3>Таблица Местоположений</h3>
        </div>
      </div>
      <div className='row'>
        <div className='add_form col-md-3'>
          <div>
            <FormAdmin  
              params={params} 
              exitItem={exitItem} 
              statusUpdate={statusUpdate} 
              addItem={addItem}
              putItem={putItem}
              deleteItem={deleteItem}
            />
          </div>
        </div>
          <Table 
          activeRow={activeRow} 
          items={items}  
          legends={legends} 
          addUpdate={addUpdate} 
          classBoot="col-md-4"
          countPage={places.countPage}
          currentPage={currentPage}
             />
        <div className='col-md-5'>
        <YMaps>
          <Map width={"100%"} height={"100%"} defaultState={{ center: [53.902283, 27.561805], zoom: 6 }} >
            {places.data.map( place => {
              return <Placemark geometry={[place.latitude, place.longitude]} />
            })}
          </Map>
        </YMaps>
        </div>
      </div>
    </div>
  );
};

export default Places;