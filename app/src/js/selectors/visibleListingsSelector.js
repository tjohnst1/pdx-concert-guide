import { createSelector } from 'reselect'
import { utilities } from '../util/utilities'


function eventsByVenue(events, venue){
  if (venue !== false){
    return events.filter((event) => event.venue.displayName === venue)
  } else {
    return events
  }
}

function getVenues(events){
  return events.map((event) => event.venue.displayName).filter((venue, index, venueArr) => venueArr.indexOf(venue) === index)
}

const listingsSelector = (state) => state.listings
const selectedVenueSelector = (state) => state.selectedVenue
const isFetchingSelector = (state) => state.isFetching
const venueSelector = createSelector(
  listingsSelector,
  (listings) =>  getVenues(listings)
)

export const visibleListings = createSelector(
  listingsSelector,
  selectedVenueSelector,
  isFetchingSelector,
  venueSelector,
  (listings, selectedVenue, isFetching, venues) => {
    return {
      listings,
      selectedVenue,
      isFetching,
      venues,
      visibleListings: eventsByVenue(listings, selectedVenue)
    }
  }
)
