import React, { Component, PropTypes } from 'react'
import {capitalize} from '../util/utilities'
import moment from 'moment'
import classNames from 'classnames'

class IndividualListing extends Component {
  constructor(){
    super()
    this.state = {
      open: false
    }
  }
  toggleOpen(){
    this.setState({open: !this.state.open})
  }
  render(){
    const {event} = this.props
    const date = moment(event.start.date).format("ddd Do")
    // const time = moment(event.start.datetime).format("hh:mm a")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    let listingInfoClasses = classNames({
      "listing-info": true,
      "row": true,
      "open": this.state.open,
    })
    return (
      <div className="row listing" onClick={() => this.toggleOpen()}>
        <div className="col-sm-2">
          <p className="listing-date">{date}</p>
        </div>
        <div className="col-sm-5">
          <p className="listing-artists">{artists}</p>
        </div>
        <div className="col-sm-5">
          <p className="listing-venue">{venue}</p>
        </div>
        <div className={listingInfoClasses}>
          <h2>{artists}</h2>
          <p>{venue}</p>
        </div>
      </div>
    )
  }
}

export default IndividualListing
