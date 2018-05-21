import React, { Component } from "react";

class NotFound extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/");
    }, 2000);
  }
  render() {
    console.log(this.props.history);
    return (
      <div className="404">
        <p>404</p>
      </div>
    );
  }
}

export default NotFound;
