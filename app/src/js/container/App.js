import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded, setVenueFilter, setDateFilter, fetchVenueInfoIfNeeded } from '../actions/actions'
import EventListings from '../components/EventListings'
import EventFilter from '../components/EventFilter'

import { filteredListings } from '../selectors/listingSelectors'

export default class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(fetchListingsIfNeeded())
  }

  render(){
    const {dispatch, listings, isFetching, selectedVenue, filteredListings, venues} = this.props
    return (
      <div>
        <h1 className="logo">PDX Tunes</h1>
          <EventFilter venues={venues} setVenueFilter={(venue) => dispatch(setVenueFilter(venue))}
           setDateFilter={(date, type) => dispatch(setDateFilter(date, type))} />
          <EventListings listings={filteredListings} isFetching={isFetching} />
      </div>
    )
  }
}

App.propTypes = {
  listings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default connect(filteredListings)(App)
