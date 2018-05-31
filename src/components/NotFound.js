import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/");
    }, 5000);
  }
  render() {
    return (
      <div className="text-centre">
        <h1>Page Not Found</h1>
        <p>Sorry, there is nothing to see here.</p>
        <div>
          <Link to="/">
            <img
              src="http://www.clker.com/cliparts/W/G/Q/p/R/h/cartoon-house-hi.png"
              width="100px"
            />
          </Link>
        </div>
        <span>
          <strong>Let's go back to home page</strong>
        </span>
      </div>
    );
  }
}

export default NotFound;
