import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { capitalize } from '../util/utilities'
import moment from 'moment'
import classNames from 'classnames'
import { fetchVenueInfoIfNeeded, fetchArtistInfoIfNeeded } from '../actions/actions'
import IndividualListingInfo from './IndividualListingInfo'

class IndividualListing extends Component {
  constructor(){
    super()
    this.state = {
      open: false
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
    const {event, venueInfo, artistInfo} = this.props
    const date = moment(event.start.date).format("ddd Do")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    const lat = event.venue.lat
    const lng = event.venue.lng
    let listingHeadlineClasses = classNames({
      "listing-headline": true,
      "row": true,
      "hidden": this.state.open
    })
    return (
      <div className="row listing" onClick={() => this.toggleOpen()}>
        <div className={listingHeadlineClasses}>
          <div className="col-sm-2">
            <p className="listing-date">{date}</p>
          </div>
          <div className="col-sm-5">
            <p className="listing-artists">{artists}</p>
          </div>
          <div className="col-sm-5">
            <p className="listing-venue">{venue}</p>
          </div>
        </div>
        <IndividualListingInfo lat={lat} lng={lng} event={event} venueInfo={venueInfo} artistInfo={artistInfo} open={this.state.open}/>
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
