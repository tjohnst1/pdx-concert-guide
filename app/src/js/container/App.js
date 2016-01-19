import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions/actions'

export default class App extends Component {

  render(){
    const { listings, isFetching } = this.props
    return (
      <h1>Hello World</h1>
    )
  }

}

App.propTypes = {
  listings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state){
  console.log(state);
  return {
    listings: state.listings,
    isFetching: state.fetching
  }
}

export default connect(mapStateToProps)(App)
