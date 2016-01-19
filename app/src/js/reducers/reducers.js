import { combineReducers } from 'redux'
import { REQUEST_LISTINGS, RECEIVE_LISTINGS } from '../constants/constants'

let initialState = {listings: [], isFetching: false}

function posts(state = initialState, action){
  switch (action.type){
    case REQUEST_LISTINGS:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_LISTINGS:
      return Object.assign({}, state, {isFetching: false, listings: action.listings})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts
})

export default rootReducer
