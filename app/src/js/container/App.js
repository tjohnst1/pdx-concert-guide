import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded } from '../actions/actions'
import EventListings from '../components/EventListings'
import EventFilter from '../components/EventFilter'

export default class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(fetchListingsIfNeeded())
  }

  componentWillReceiveProps(nextProps){
  }

  render(){
    const {listings, isFetching, venues} = this.props
    console.log('Venues:', venues)
    return (
      <div>
        <p>Artists</p>
          <EventFilter venues={venues}/>
          <EventListings listings={listings} isFetching={isFetching}/>
      </div>
    )
  }
}

App.propTypes = {
  listings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  venues: PropTypes.array.isRequired
}

function mapStateToProps(state){
  const { listings, isFetching } = state
  const venues = listings.map((event) => event.venue.displayName).filter((venue, index, arr) => arr.indexOf(venue) === index)
  return { listings, isFetching, venues }
}

export default connect(mapStateToProps)(App)
