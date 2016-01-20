import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListingsIfNeeded } from '../actions/actions'

export default class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(fetchListingsIfNeeded())
  }

  componentWillReceiveProps(nextProps){
  }

  render(){
    const {listings} = this.props
    console.log('listings: ', listings);
    return (
      <div>
        <p>Testing</p>
        <ul>
          
        </ul>
      </div>
    )
  }
}

// App.propTypes = {
//   listings: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired
// }

function mapStateToProps(state){
  const { listings, isFetching } = state
  return { listings, isFetching }
}

export default connect(mapStateToProps)(App)
