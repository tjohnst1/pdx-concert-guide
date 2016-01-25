import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { capitalize } from '../util/utilities'
import classNames from 'classnames'
import Map from './Map'

export default class IndividualListingInfo extends Component {
  render(){
    const {lat, lng, event, venueInfo, open} = this.props
    const date = moment(event.start.date).format("ddd Do")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    let listingInfoClasses = classNames({
      "listing-info": true,
      "row": true,
      "open": open,
    })
    let closedRow = classNames({
      "col-sm-12": true,
      "closed-row": !open
    })
    return (
      <div className={listingInfoClasses}>
        <div className="closedRow">
          <h2 className="listing-artists">{artists}</h2>
          <p className="listing-date">{date}</p>
          <p className="listing-venue">{venue}</p>
          <div>
            <p className="listing-venue">{venueInfo.houseNumber} {venueInfo.road}</p>
            <p className="listing-venue">{venueInfo.city || "Portland"}, OR {venueInfo.postcode}</p>
          </div>
          <Map lat={lat} lng={lng}/>
        </div>
      </div>
    )
  }
}
