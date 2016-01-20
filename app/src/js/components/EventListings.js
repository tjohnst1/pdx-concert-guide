import React, { Component, PropTypes } from 'react'

class EventListings extends Component {
  render(){
    let artistsList = this.props.listings.map((event) => <li key={event.id}>{event.performance[0].artist.displayName}</li>)
    return (
      <ul>
        {this.props.isFetching ? <p>Loading...</p> : artistsList}
      </ul>
    )
  }
}

export default EventListings
