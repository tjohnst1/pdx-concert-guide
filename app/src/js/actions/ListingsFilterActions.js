import { SELECT_VENUE, SELECT_DATE } from '../constants/constants'

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
