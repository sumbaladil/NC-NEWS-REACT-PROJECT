import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getAllArticles } from "./api";
import PopularArticles from "./PopularArticles";
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
            <br />
          </p>
          <h1 className="jumbotron-heading">
            <div>
              <h1>
                <a href="https://northcoders.com/">
                  <img
                    id="nc-logo"
                    src="logo.png"
                    alt="Northcoders logo image"
                  />
                </a>
              </h1>
            </div>
          </h1>
          <a className="btn btn-info btn-lg" href="#" role="button">
            Register with us
          </a>
        </div>
        <PopularArticles
          articles={this.state.articles}
          onClick={this.handleClick}
        />
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
