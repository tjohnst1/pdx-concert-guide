import fetch from 'isomorphic-fetch'
import { RECEIVE_LISTINGS, REQUEST_LISTINGS } from '../constants/constants'

export function fetchListingsIfNeeded() {
  return (dispatch) => {
    return dispatch(fetchListings())
  }
}

function fetchListings(){
  const url = "http://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?apikey=ewhKf5A1zoFbcx0A"
  return (dispatch) => {
    dispatch(requestListings())
    return fetch(url)
      .then((response) => response.json())
      .then((eventArr) => dispatch(recieveListings(eventArr.resultsPage.results.event)))
  }
}

function requestListings(){
  return {
    type: REQUEST_LISTINGS
  }
}

function recieveListings(eventArr){
  return {
    type: RECEIVE_LISTINGS,
    listings: eventArr
  }
}
