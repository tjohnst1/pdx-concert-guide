import React from 'react';

export default (props) => {

  return (
    <nav className="row">
      <div className="col-sm-2">
        <p>Logo</p>
      </div>
      <div className="col-sm-6">
        <p className="nav-link">Upcoming Gigs</p>
        <p className="nav-link">Venues</p>
        <p className="nav-link">Search</p>
      </div>
      <div className="col-sm-4">
        <form className="navbar-form">
          <div className="form-group">
            <input type="text" placeholder="Search for a band or venue" className="form-control"/>
          </div>
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
    </nav>
  )

}
