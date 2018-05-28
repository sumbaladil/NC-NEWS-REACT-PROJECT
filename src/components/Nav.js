import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button className="nav-link my-nav-link">
                <NavLink className="my-nav-link" to="/">
                  Home
                </NavLink>
              </button>
            </li>
            <li className="nav-item ">
              <button className="nav-link my-nav-link">
                <NavLink className="my-nav-link" to="/articles">
                  Articles
                </NavLink>
                <span className="sr-only">(current)</span>
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link my-nav-link">
                <NavLink className="my-nav-link" to="/users">
                  Users
                </NavLink>
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link my-nav-link">
                <NavLink className="my-nav-link" to="/topics">
                  Topics
                </NavLink>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
