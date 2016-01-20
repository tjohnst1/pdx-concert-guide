import React, { Component, PropTypes } from 'react'

class EventListings extends Component {
  render(){
    let artists = this.props.listings.map((event) => <li key={event.id}>{event.performance[0].artist.displayName}</li>)
    return (
      <ul>
        {artists}
      </ul>
    )
  }
}

export default EventListings
