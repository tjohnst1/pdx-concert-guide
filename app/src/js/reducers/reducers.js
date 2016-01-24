import { combineReducers } from 'redux'
import { REQUEST_LISTINGS, RECEIVE_LISTINGS, SELECT_VENUE, SELECT_DATE } from '../constants/constants'

let initialState = {listings: [], isFetching: false}

function isFetching(state = false, action){
  switch (action.type) {
    case REQUEST_LISTINGS:
      return true
    case RECEIVE_LISTINGS:
      return false
    default:
      return state
  }
}

function listings(state = [], action){
  switch (action.type){
    case RECEIVE_LISTINGS:
      return action.listings
    default:
      return state
  }
}

function selectedVenue(state = 'All', action){
  switch (action.type) {
    case SELECT_VENUE:
      return action.venue
    default:
      return state
  }
}

function selectedDate(state = 'All', action){
  switch (action.type){
    case SELECT_DATE:
      return {
        startDate: action.startDate,
        endDate: action.endDate
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isFetching,
  listings,
  selectedVenue,
  selectedDate
})

export default rootReducer
