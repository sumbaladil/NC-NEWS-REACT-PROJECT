import React, { Component } from "react";
import { Link } from "react-router-dom";

class PopularUsers extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>
          Popular Users
          <button
            className="btn btn-warning sort-button"
            onClick={this.handleClick}
          >
            by Votes
          </button>
          <button
            className="btn btn-warning sort-button"
            onClick={this.handleClick}
          >
            by Comments
          </button>
        </h1>
        <div className="card-deck bg-light">
          {users.map((user, i) => {
            const { username, name, avatar_url } = user;
            return (
              <div key={name} className="card">
                <div className="card-body">
                  <h3 className="title-header">
                    <strong>{username}</strong>
                  </h3>

                  <hr />
                  <div className="text-centre">
                    <h5>
                      <strong>{name}</strong>
                    </h5>
                  </div>

                  <p className="card-text">
                    <small className="text-muted">
                      Posted by: <strong>{name}</strong>
                    </small>
                    <Link to={`/users`}>
                      <img
                        className="card-img-top user-article"
                        src={avatar_url}
                        alt=""
                        onError={event =>
                          event.target.setAttribute(
                            "src",
                            "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg"
                          )
                        }
                      />
                    </Link>
                  </p>
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  handleClick = event => {
    this.props.onClick(event);
  };
}

export default PopularUsers;
