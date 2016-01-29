import React, { Component, PropTypes } from 'react'
import IndividualListing from './IndividualListing'
import { fetchVenueInfoIfNeeded } from '../actions/VenueInfoActions'
import { uniqueId } from '../util/utilities'


class EventListings extends Component {
  constructor(){
    super()
    this.state = {
      openId: false
    }
  }
  setOpenId(id){
    this.setState({ openId: id })
  }
  render(){
    let eventList = this.props.listings.map((event) => {
      return (
        <IndividualListing event={event} eventId={event.id} key={event.id} setOpenId={(id) => this.setOpenId(id)} openId={this.state.openId}/>
      )
    })
    return (
      <div className="listings-container">
        {this.props.isFetching ? <p>Loading...</p> : null}
        {!this.props.isFetching ? eventList : null}
      </div>
    )
  }
}

export default EventListings
