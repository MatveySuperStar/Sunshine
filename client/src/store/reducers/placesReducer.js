import { defaultState } from "../state"

const ADD_PLACES = "ADD_PLACES"
const ADD_PLACE = "ADD_PLACE"
const DEFAULT_PLACE = "DEFAULT_PLACE"
const ADD_CURRENT_PAGE_PLACES = "ADD_CURRENT_PAGE_PLACES"
const UPDATE_PLACES = "UPDATE_PLACES"
const UPDATE_PLACE_NAME = "UPDATE_PLACES_NAME"
const UPDATE_PLACE_LATITUDE = "UPDATE_PLACES_LATITUDE"
const UPDATE_PLACE_LONGITUDE = "UPDATE_PLACES_LONGITUDE"

export const placesReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_PLACES :
      return {...state, places: {data: action.payload.places, currentPage: action.payload.currentPage, countPage: action.payload.countPage }}
    case UPDATE_PLACES :
      return {...state, places: {...state.places, data: action.payload.places, countPage: action.payload.countPage }}
    case ADD_PLACE :
      return {...state, place: action.payload}
    case ADD_CURRENT_PAGE_PLACES :
      return {...state, places: { ...state.places, currentPage: action.payload.currentPage}}
    case UPDATE_PLACE_NAME :
      return {...state, place: {...state.place, name: action.payload}}
    case UPDATE_PLACE_LATITUDE :
      return {...state, place: {...state.place, latitude: action.payload}}
    case UPDATE_PLACE_LONGITUDE :
      return {...state, place: {...state.place, longitude: action.payload}}
    case DEFAULT_PLACE : 
      return {...state, place: {name: '', latitude: '', longitude: '', update: false}}
    default: 
      return {...state};
  }
}

export const addPlacesAction = (payload) => ({type: ADD_PLACES, payload})
export const addPlaceAction = (payload) => ({type: ADD_PLACE, payload})
export const defaultPlaceAction = (payload) => ({type: DEFAULT_PLACE, payload})
export const addCurrentPagePlacesAction = (payload) => ({type: ADD_CURRENT_PAGE_PLACES, payload})
export const updatePlacesAction = (payload) => ({type: UPDATE_PLACES, payload})
export const updatePlaceNameAction = (payload) => ({type: UPDATE_PLACE_NAME, payload})
export const updatePlaceLatitudeAction = (payload) => ({type: UPDATE_PLACE_LATITUDE, payload})
export const updatePlaceLongitudeAction = (payload) => ({type: UPDATE_PLACE_LONGITUDE, payload})
export const updateDefaultPlaceAction = (payload) => ({type: DEFAULT_PLACE, payload})