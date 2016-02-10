import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded, setVenueFilter, setDateFilter, getEvents } from '../actions/actions'
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
      </div>
    )
  }
}

App.propTypes = {
  listings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default connect(filteredListings)(App)
