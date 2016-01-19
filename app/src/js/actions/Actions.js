import fetch from 'isomorphic-fetch'
import {RECEIVE_LISTINGS, REQUEST_LISTINGS} from '../constants/constants'

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    var state = getState()
    if (state.listings.length < 1) {
      return dispatch(fetchListings())
    }
  }
}

function fetchListings(){
  return (dispatch) => {
    dispatch(requestListings())
    return fetch('http://api.bandsintown.com/events/search.json?location=Portland,OR&app_id=PDXConcertGuide')
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
