import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { capitalize } from '../util/utilities'
import classNames from 'classnames'
import Map from './Map'

export default class IndividualListingInfo extends Component {
  render(){
    const {lat, lng, event, venueInfo, artistInfo, open} = this.props
    const date = moment(event.start.date).format("ddd Do")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    const genres = (artistInfo.genres !== undefined) ? artistInfo.genres.map((genre) => <p className="listing-genres">{genre}</p>) : null
    let listingInfoClasses = classNames({
      "listing-info": true,
      "open": open,
    })
    let closedRow = classNames({
      "col-sm-12": true,
      "closed-row": !open
    })
    // <Map lat={lat} lng={lng}/>
    return (
      <div className={listingInfoClasses}>
        <div className="artist-info-container">
          <p className="listing-date">{date}</p>
          <h2 className="listing-artists">{artists}</h2>
            {genres}
            <img src={artistInfo.imageUrl} />
            <p>Spotify: {artistInfo.spotifyUrl}</p>
        </div>
        <div className="venue-info-container">
          <p className="listing-venue">{venue}</p>
          <div>
            <p className="listing-venue">{venueInfo.houseNumber} {venueInfo.road}</p>
            <p className="listing-venue">{venueInfo.city || "Portland"}, OR {venueInfo.postcode}</p>
          </div>
        </div>
      </div>
    )
  }
}
