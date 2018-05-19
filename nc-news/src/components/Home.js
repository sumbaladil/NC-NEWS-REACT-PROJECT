import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getAllArticles } from "./api";
class Home extends Component {
  state = {
    users: [],
    articles: []
  };

  componentDidMount = () => {
    return getAllArticles(
      `https://northcoders-news-1.herokuapp.com/api/articles`
    ).then(articles => {
      let newArr = articles.articles.sort(function(a, b) {
        return b.votes - a.votes;
      });

      this.setState({ ...this.state, articles: newArr.slice(0, 3) });
    });
  };
  render() {
    const { articles } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <p>
            <br />
          </p>
          <h1 className="jumbotron-heading">Welcome to Northcoders News</h1>
          <a className="btn btn-info btn-lg" href="#" role="button">
            Register with us
          </a>
        </div>

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
    const sort = event.target.innerText;
    const sortedArray =
      sort === "by Comments"
        ? this.state.articles.sort(function(a, b) {
            return b.comments - a.comments;
          })
        : this.state.articles.sort(function(a, b) {
            return b.votes - a.votes;
          });
    this.setState({ articles: sortedArray.slice(0, 3) });
  };
}

export default Home;
