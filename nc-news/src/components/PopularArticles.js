import React, { Component } from "react";
import { Link } from "react-router-dom";
class PopularArticles extends Component {
  render() {
    const { articles } = this.props;
    return (
      <div>
        <h1>
          Popular Articles
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
          {articles.map((article, i) => {
            const {
              _id,
              title,
              body,
              votes,
              comments,
              belongs_to: { slug },
              created_by: { _id: user, name, avatar_url }
            } = article;

            return (
              <div key={_id} className="card">
                <div className="card-body">
                  <Link to={`/articles/${_id}`}>
                    <h3 className="title-header">
                      <strong>{title}</strong>
                    </h3>
                  </Link>
                  <hr />
                  <div className="text-centre">
                    <h5>
                      <strong>{slug}</strong>
                    </h5>
                  </div>
                  <p className="card-text truncate">{body}</p>
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
                  <h5 className="text-centre color-grey">
                    votes <strong>{votes}</strong>
                  </h5>
                  <h5 className="text-centre color-blue">
                    comments <strong>{comments}</strong>
                  </h5>
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

export default PopularArticles;
