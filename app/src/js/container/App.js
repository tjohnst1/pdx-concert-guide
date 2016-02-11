import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded } from '../actions/ListingsActions'
import { setVenueFilter, setDateFilter } from '../actions/ListingsFilterActions'
import EventListings from '../components/EventListings'
import EventFilter from '../components/EventFilter'

import { filteredListings } from '../selectors/listingSelectors'

export default class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    getEvents()
  }

  render(){
    this.pr
    return (
      <div>
        <h1 className="logo">PDX Concert Listings</h1>
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
