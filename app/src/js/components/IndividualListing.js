import React, { Component, PropTypes } from 'react'

class IndividualListing extends Component {

  render(){
    const {event} = this.props
    return (
      <div className="row">
        <div className="col-sm-2">{event.start.date} @ {event.start.time}</div>
        <div className="col-sm-5">{event.performance[0].artist.displayName}</div>
        <div className="col-sm-5">{event.venue.displayName}</div>
      </div>
    )
  }
}

export default IndividualListing
