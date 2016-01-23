import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded } from '../actions/actions'
import EventListings from '../components/EventListings'
import EventFilter from '../components/EventFilter'

import { visibleListings } from '../selectors/visibleListingsSelector'

export default class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(fetchListingsIfNeeded())
  }

  render(){
    const {dispatch, listings, isFetching, selectedVenue, visibleListings} = this.props
    console.log(this.props)
    return (
      <div>
        <p>Artists</p>
          <EventListings listings={listings} isFetching={isFetching} />
      </div>
    )
  }
}

App.propTypes = {
  listings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default connect(visibleListings)(App)
