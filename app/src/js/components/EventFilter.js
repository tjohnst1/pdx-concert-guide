import React, {Component, PropTypes} from 'react'
import {uniqueId} from '../util/utilities'

class EventFilter extends Component {
  constructor(){
    super()
    this.state = {
      venue: "All",
      startDate: null,
      endDate: null
    }
  }
  setDateFilter(type, e){
    if (type.toString() === "start"){
      this.setState({startDate: e.target.value})
      this.props.setDateFilter({startDate: e.target.value, endDate: this.state.startDate})
    } else {
      this.setState({endDate: e.target.value})
      this.props.setDateFilter({startDate: this.state.startDate, endDate: e.target.value})
    }
  }
  setVenueFilter(e){
    this.setState({venue: e.target.value})
    this.props.setVenueFilter(e.target.value)
  }
  render(){
    const venues = this.props.venues.map((venue) => <option value={venue} key={uniqueId()}>{venue}</option>)
    return (
      <div className="filter">
        Start: <input type="date" value={this.state.startDate} onChange={this.setDateFilter.bind(this, "start")}/>
        End: <input type="date" value={this.state.endDate} onChange={this.setDateFilter.bind(this, "end")}/>
        <select value={this.state.venue} onChange={(e) => this.setVenueFilter(e)}>
          <option value="All">All Venues</option>
          {venues}
        </select>
      </div>
    )
  }

}

export default EventFilter
