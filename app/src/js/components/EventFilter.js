import React, {Component, PropTypes} from 'react'
import {uniqueId} from '../util/utilities'

class EventFilter extends Component {
  constructor(){
    super()
    this.state = {
      venue: "All"
    }
  }
  setFilter(e){
    this.setState({venue: e.target.value})
    this.props.setSelectedVenue(e.target.value)
    console.log('Venue:', this.state.venue)
  }
  render(){
    const venues = this.props.venues.map((venue) => <option value={venue} key={uniqueId()}>{venue}</option>)
    return (
      <div>
        <select value={this.state.venue} onChange={(e) => this.setFilter(e)}>
          <option value="All">Venues</option>
          {venues}
        </select>
      </div>
    )
  }

}

export default EventFilter
