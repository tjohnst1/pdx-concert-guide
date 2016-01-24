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
  if (date !== "All"){
    const selectedStartDate = moment(dateObj.startDate)
    const selectedEndDate = moment(dateObj.endDate)
    return events.filter((event) => {
      let eventStart = moment(event.start.date)
      return (selectedStartDate.isBefore(eventStart) || selectedStartDate.isSame(eventStart)) && (selectedEndDate.isAfter(eventStart) || selectedStartDate.isSame(eventStart)) 
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
const selectedDateSelector = (state) => state.selectedVenue
const venueSelector = createSelector(
  listingsSelector,
  (listings) =>  getVenues(listings)
)

export const filteredListings = createSelector(
  listingsSelector,
  selectedVenueSelector,
  selectedDateSelector,
  isFetchingSelector,
  venueSelector,
  (listings, selectedVenue, selectedDate, isFetching, venues) => {
    return {
      listings,
      selectedVenue,
      selectedDate,
      isFetching,
      venues,
      filteredListings: eventsByVenue(listings, selectedVenue)
    }
  }
)
