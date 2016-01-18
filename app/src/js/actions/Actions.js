import fetch from 'isomorphic-fetch'
import {RECEIVE_LISTINGS, REQUEST_LISTINGS} from '../constants/constants'

export function requestListings(){
  type: REQUEST_LISTINGS
}

export function recieveListings(json){
  type: RECEIVE_LISTINGS,
  listings: json
}

export function fetchListings(){
  return (dispatch) => {
    dispatch(requestListings())
    return fetch('http://api.bandsintown.com/artists/Common/events/recommended?location=PORTLAND&radius=150&app_id=anid&api_version=2.0&format=json')
      .then((response) => response.json())
      .then((json) => dispatch(recieveListings(json)))
  }
}
