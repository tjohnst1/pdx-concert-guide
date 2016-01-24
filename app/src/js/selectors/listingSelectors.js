import { createSelector } from 'reselect'
import { utilities } from '../util/utilities'
import moment from 'moment'

function eventsByVenue(events, venue){
  if (venue !== "All"){
    return events.filter((event) => event.venue.displayName === venue)
  } else {
    return events
  }
}

function eventsByDate(events, dateObj){
  if ((dateObj.startDate !== null) && (dateObj.endDate !== null)){
    const selectedStartDate = moment(dateObj.startDate)
    const selectedEndDate = moment(dateObj.endDate)
    return events.filter((event) => {
      let eventDate = moment(event.start.date)
      return (eventDate.isAfter(selectedStartDate) || eventDate.isSame(selectedStartDate, 'day')) && (eventDate.isBefore(selectedEndDate) || eventDate.isSame(selectedEndDate, 'day'))
    })
  } else {
    return events
  }
}

function getVenues(events){
  return events.map((event) => event.venue.displayName).filter((venue, index, venueArr) => venueArr.indexOf(venue) === index)
}

const listingsSelector = (state) => state.listings
const isFetchingSelector = (state) => state.isFetching
const selectedVenueSelector = (state) => state.selectedVenue
const selectedDateSelector = (state) => state.selectedDate

const venueSelector = createSelector(
  listingsSelector,
  (listings) =>  getVenues(listings)
)

const filteredByVenue = createSelector(
  listingsSelector,
  selectedVenueSelector,
  (listings, selectedVenue) => eventsByVenue(listings, selectedVenue)
)

export const filteredListings = createSelector(
  listingsSelector,
  selectedVenueSelector,
  selectedDateSelector,
  isFetchingSelector,
  venueSelector,
  filteredByVenue,
  (listings, selectedVenue, selectedDate, isFetching, venues, filteredByVenue) => {
    return {
      listings,
      selectedVenue,
      selectedDate,
      isFetching,
      venues,
      filteredListings: eventsByDate(filteredByVenue, selectedDate)
    }
  }
)
