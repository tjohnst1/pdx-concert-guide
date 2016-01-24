import fetch from 'isomorphic-fetch'
import {RECEIVE_LISTINGS, REQUEST_LISTINGS, SELECT_VENUE, SELECT_DATE} from '../constants/constants'

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
    listings: json.resultsPage.results.event
  }
}

export function setVenueFilter(venue){
  return {
    type: SELECT_VENUE,
    venue: venue
  }
}

export function setDateFilter(startDate, endDate){
  return {
    type: SELECT_DATE,
    startDate: startDate,
    endDate: endDate
  }
}
