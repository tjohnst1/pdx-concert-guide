import fetch from 'isomorphic-fetch'
import {RECEIVE_LISTINGS, REQUEST_LISTINGS} from '../constants/constants'

export function fetchListingsIfNeeded() {
  return (dispatch) => {
    return dispatch(fetchListings())
  }
}

function fetchListings(){
  return (dispatch) => {
    dispatch(requestListings())
    return fetch('http://www.reddit.com/r/reactjs.api')
      .then((response) => response.json())
      .then((json) => dispatch(recieveListings(json)))
  }
}

function requestListings(){
  return {
    type: REQUEST_LISTINGS
  }
}

function recieveListings(json){
  return {
    type: RECEIVE_LISTINGS,
    listings: json
  }
}
