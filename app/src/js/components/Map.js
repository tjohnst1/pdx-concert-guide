import React, {Component} from "react"
import {GoogleMap} from "react-google-maps"

export default class Map extends Component {
  render(){
    const { lat, lng } = this.props
    return (
      <GoogleMap containerProps={{style: {height: "100px", width: "100px"}}}
      defaultZoom={15} defaultCenter={{lat: lat, lng: lng}} />
    )
  }
}
