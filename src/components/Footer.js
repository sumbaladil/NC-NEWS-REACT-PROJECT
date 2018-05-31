import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="card-footer text-centre">
          <small className="text-muted">Created by Sumbal Adil</small>
          <div>
            <small className="text-muted">
              <a href="https://www.linkedin.com/in/sumbal-adil" target="_blank">
                Visit my Linkedin profile
              </a>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
