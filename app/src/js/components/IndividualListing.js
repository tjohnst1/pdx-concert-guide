import React, { Component, PropTypes } from 'react'
import {capitalize} from '../util/utilities'

class IndividualListing extends Component {
  render(){
    const {event} = this.props
    const date = event.start.date
    const time = event.start.time
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    return (
      <div className="row">
        <div className="col-sm-2">{date} @ {time}</div>
        <div className="col-sm-5">{artists}</div>
        <div className="col-sm-5">{venue}</div>
      </div>
    )
  }
}

export default IndividualListing
