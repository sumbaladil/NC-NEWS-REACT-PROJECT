import React, { Component } from "react";
import { Link } from "react-router-dom";

class PopularUsers extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>Most Active users</h1>
        <div className="card-deck bg-light">
          {users.map((user, i) => {
            const { name, avatar_url, articles } = user;
            return (
              <div key={name} className="card my-card">
                <div className="card-body">
                  <h3 className="title-header">
                    <strong>Shared {articles} articles 🎉</strong>
                  </h3>

                  <hr />
                  <div className="text-centre">
                    <h5>
                      <strong>{name}</strong>
                    </h5>
                  </div>

                  <p className="card-text">
                    <small className="text-muted">
                      <strong>{name}</strong>
                    </small>
                    <Link to={`/users`}>
                      <img
                        className="card-img-top user-article"
                        src={avatar_url}
                        alt=""
                        onError={event =>
                          (event.target.src =
                            "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg")
                        }
                      />
                    </Link>
                  </p>
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
