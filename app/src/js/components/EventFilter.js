import React, {Component, PropTypes} from 'react'

class EventFilter extends Component {

  render(){
    const venues = this.props.venues.map((venue) => <option value={venue}>{venue}</option>)
    return (
      <div>
        <select>
          <option value="all">Venues</option>
          {venues}
        </select>
      </div>
    )
  }

}

export default EventFilter
