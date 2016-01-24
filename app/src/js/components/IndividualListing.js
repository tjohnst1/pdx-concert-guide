import React, { Component, PropTypes } from 'react'
import {capitalize} from '../util/utilities'
import moment from 'moment'

class IndividualListing extends Component {
  render(){
    const {event} = this.props
    const date = moment(event.start.date).format("ddd Do")
    // const time = moment(event.start.datetime).format("hh:mm a")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    return (
      <div className="row">
        <div className="col-sm-2">{date}</div>
        <div className="col-sm-5">{artists}</div>
        <div className="col-sm-5">{venue}</div>
      </div>
    )
  }
}

export default IndividualListing
