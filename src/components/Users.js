import React, { Component } from "react";
import { getAllUsers } from "../api";
import { backendApiBaseUrl } from "../config";
import PropTypes from "prop-types";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    return getAllUsers(
      `${backendApiBaseUrl}${this.props.match.url}`
    ).then(response => {
      const users = response.data;
      this.setState(users);
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.url !== this.props.match.url) {
      return getAllUsers(
        `${backendApiBaseUrl}${this.props.match.url}`
      ).then(response => {
        const users = response.data;
        this.setState(users);
      });
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Users</h1>
        {users.map((user, i) => {
          const { username, name, avatar_url } = user;
          return (
            <div key={i} className="card my-card user">
              <img
                className="card-img-top img-fluid"
                onError={event =>
                  (event.target.src =
                    "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg")
                }
                src={avatar_url}
                alt=""
              />
              <hr />
              <div className="card-body">
                <h6 className="text-centre">
                  User name: <strong>{username}</strong>
                </h6>
                <h6 className="text-centre">
                  Name: <strong>{name}</strong>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Users.propTypes = {
  match: PropTypes.object
};
export default Users;
