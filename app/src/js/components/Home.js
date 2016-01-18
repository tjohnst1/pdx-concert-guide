import React from 'react';
import NavBar from './NavBar';
import ConcertStore from '../stores/ConcertStore';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      concerts: []
    }
  }
  conponentDidMount(){
    if (this.isMounted()) {
      this.setState({
        username: ConcertStore.getConcerts()
      });
    };
  }
  render(){
    return (
      <div className="fluid-container">
        <NavBar />
      </div>
    )
  }
}
