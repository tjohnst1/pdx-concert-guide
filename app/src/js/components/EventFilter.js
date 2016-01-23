import React, {Component, PropTypes} from 'react'

class EventFilter extends Component {
  constructor(){
    super()
    this.state = {
      venue: "All"
    }
  }
  setFilter(e){
    this.setState(e.target.value)
    this.props.selectedVenue(this.state.venue)
  }
  render(){
    return (
      <div>
        <select onChange={(e) => this.setFilter(e)}>
          <option value="All">Venues</option>
          {venues}
        </select>
      </div>
    )
  }

}

export default EventFilter
