import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { capitalize } from '../util/utilities'
import moment from 'moment'
import classNames from 'classnames'
import { fetchVenueInfoIfNeeded } from '../actions/actions'

class IndividualListing extends Component {
  constructor(){
    super()
    this.state = {
      open: false
    }
  }
  toggleOpen(){
    const { dispatch, event } = this.props
    dispatch(fetchVenueInfoIfNeeded({lat: event.venue.lat, lon: event.venue.lng}))
    this.setState({open: !this.state.open})
  }
  render(){
    const {event} = this.props
    const {venueInfo} = this.props
    const date = moment(event.start.date).format("ddd Do")
    const artists = event.performance.map((artist) => capitalize(artist.displayName)).join(", ")
    const venue = event.venue.displayName
    let listingInfoClasses = classNames({
      "listing-info": true,
      "row": true,
      "open": this.state.open,
    })
    let listingHeadlineClasses = classNames({
      "listing-headline": true,
      "row": true,
      "hidden": this.state.open
    })
    let closedRow = classNames({
      "col-sm-12": true,
      "closed-row": !this.state.open
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
        <div className={listingInfoClasses}>
          <div className="closedRow">
            <h2 className="listing-artists">{artists}</h2>
            <p className="listing-date">{date}</p>
            <p className="listing-venue">{venue}</p>
            <p className="listing-venue">{venueInfo.houseNumber} {venueInfo.road}</p>
            <p className="listing-venue">{venueInfo.city || "Portland"}, OR {venueInfo.postcode}</p>
          </div>
        </div>
      </div>
    )
  }
}

var mapStateToProps = function(state){
  return { venueInfo:state.venueInfo };
};

export default connect(mapStateToProps)(IndividualListing)
