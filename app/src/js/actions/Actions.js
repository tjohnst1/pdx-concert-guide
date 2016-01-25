import fetch from 'isomorphic-fetch'
import { RECEIVE_LISTINGS, REQUEST_LISTINGS, SELECT_VENUE,
         SELECT_DATE, REQUEST_VENUE_INFO, RECEIVE_VENUE_INFO,
         REQUEST_ARTIST_INFO, RECEIVE_ARTIST_INFO } from '../constants/constants'

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

export function setDateFilter(dateObj){
  return {
    type: SELECT_DATE,
    startDate: dateObj.startDate,
    endDate: dateObj.endDate
  }
}

export function fetchVenueInfoIfNeeded(infoObj) {
  return (dispatch) => {
    return dispatch(fetchVenueInfo(infoObj))
  }
}

function requestVenueInfo(){
  return {
    type: REQUEST_VENUE_INFO
  }
}

function recieveVenueInfo(json){
  return {
    type: RECEIVE_VENUE_INFO,
    info: {
      houseNumber: json.address.house_number,
      road: json.address.road,
      city: json.address.city,
      postcode: json.address.postcode,
    }
  }
}

function fetchVenueInfo(infoObj){
  const lat = infoObj.lat
  const lon = infoObj.lon
  const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
  return (dispatch) => {
    dispatch(requestVenueInfo())
    return fetch(url)
      .then((response) => response.json())
      .then((json) => dispatch(recieveVenueInfo(json)))
  }
}

export function fetchArtistInfoIfNeeded(artistName) {
  return (dispatch) => {
    return dispatch(fetchArtistInfo(artistName))
  }
}

function requestArtistInfo(){
  return {
    type: REQUEST_ARTIST_INFO
  }
}

function recieveArtistInfo(json){
  return {
    type: RECEIVE_ARTIST_INFO,
    info: {
      imageUrl: json.artists.items[0].images[2].url,
      genres: json.artists.items[0].genres,
      spotifyUrl: json.artists.items[0].external_urls.spotify
    }
  }
}

function fetchArtistInfo(artistName){
  const formattedName = artistName.replace(/\s/g,'+')
  const url = `https://api.spotify.com/v1/search?q=${formattedName}&type=artist&limit=1`
  return (dispatch) => {
    dispatch(requestArtistInfo())
    return fetch(url)
      .then((response) => response.json())
      .then((json) => dispatch(recieveArtistInfo(json)))
  }
}
