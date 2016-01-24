import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded, setSelectedVenue } from '../actions/actions'
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
    console.log("Props:", this.props)
    return (
      <div>
        <p>Artists</p>
          <EventFilter venues={venues} setSelectedVenue={(venue) => dispatch(setSelectedVenue(venue))}/>
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
