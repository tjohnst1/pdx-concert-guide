import React, { Component, PropTypes } from 'react'
import IndividualListing from './IndividualListing'

class EventListings extends Component {
  render(){
    let eventList = this.props.listings.map((event) => {
      return (
        <IndividualListing event={event} key={event.id}/>
      )
    })
    return (
      <div className="row">
        {this.props.isFetching ? <p>Loading...</p> : null}
        {!this.props.isFetching ? eventList : null}
      </div>
    )
  }
}

export default EventListings
