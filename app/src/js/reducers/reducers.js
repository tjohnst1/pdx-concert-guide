import { combineReducers } from 'redux'
import { REQUEST_LISTINGS, RECEIVE_LISTINGS } from '../constants/constants'

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

const rootReducer = combineReducers({
  isFetching,
  listings
})

export default rootReducer
