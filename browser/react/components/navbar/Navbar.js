import React from 'react';
import { Link } from 'react-router';

export default ({ currentUser, logout }) => (
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/"><img src="/logo.png" /></Link>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/users" activeClassName="active">users</Link>
          </li>
          <li>
            <Link to="/stories" activeClassName="active">stories</Link>
          </li>
        </ul>
       
            <ul className="nav navbar-nav navbar-right">
              <li>
               <Link to="/signup" activeClassName="active">signup</Link>
              </li>
              <li>
                <Link to="/login" activeClassName="active">login</Link>
              </li>
            </ul>
          
      </div>
    </div>
  </nav>
);
