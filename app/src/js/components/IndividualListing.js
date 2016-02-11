import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { capitalize, uniqueId } from '../util/utilities'
import moment from 'moment'
import classNames from 'classnames'
import { fetchVenueInfoIfNeeded, fetchArtistInfoIfNeeded } from '../actions/VenueInfoActions'
import IndividualListingInfo from './IndividualListingInfo'

class IndividualListing extends Component {
  constructor(){
    super()
    this.state = {
      open: false,
    }
  }
  toggleOpen(){
    const { dispatch, event } = this.props
    const artist = event.performance[0].displayName
    dispatch(fetchVenueInfoIfNeeded({lat: event.venue.lat, lon: event.venue.lng}))
    dispatch(fetchArtistInfoIfNeeded(artist))
    this.setState({open: !this.state.open})
  }
  render(){
    const {event, artistInfo, venueInfo} = this.props
    const date = moment(event.start.date).format("ddd Do")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    const lat = event.venue.lat
    const lng = event.venue.lng
    let listingHeadlineClasses = classNames({
      "listing-headline": true,
      "closed": this.state.open
    })
    return (
      <div className="listing" onClick={() => this.toggleOpen()}>
        <div className={listingHeadlineClasses}>
            <p className="listing-date">{date}</p>
            <p className="listing-artists">{artists}</p>
            <p className="listing-venue">{venue}</p>
        </div>
        <IndividualListingInfo key={uniqueId()} lat={lat} lng={lng} event={event} venueInfo={venueInfo} artistInfo={artistInfo} open={this.state.open}/>
      </div>
    )
  }
}

var mapStateToProps = function(state){
  return {
    venueInfo: state.venueInfo,
    artistInfo: state.artistInfo
  };
};

export default connect(mapStateToProps)(IndividualListing)
