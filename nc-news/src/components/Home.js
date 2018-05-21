import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getAllArticles } from "./api";
import PopularArticles from "./PopularArticles";
import PopularUsers from "./PopularUsers";
class Home extends Component {
  state = {
    users: [],
    articles: []
  };

  componentDidMount = () => {
    return getAllArticles(
      `https://northcoders-news-1.herokuapp.com/api/articles`
    ).then(articles => {
      let sortedArticles = articles.articles.sort(function(a, b) {
        return b.votes - a.votes;
      });

      const users = this.UsersArticles(articles);
      //console.log(users);
      let sortedUsers = users.sort(function(a, b) {
        return b.articles - a.articles;
      });
      //console.log(sortedUsers);
      this.setState({
        articles: sortedArticles.slice(0, 3),
        users: sortedUsers.slice(0, 3)
      });
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
        <hr />
        <PopularUsers users={this.state.users} />
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
  UsersArticles = articles => {
    const userObj = articles.articles.reduce((acc, article) => {
      const {
        created_by: { _id: user, name, avatar_url }
      } = article;

      if (acc[user]) {
        acc[user].articles += 1;
      } else {
        acc[user] = {
          user,
          name,
          avatar_url,
          articles: 1
        };
      }

      return acc;
    }, {});

    const userArr = Object.keys(userObj).map(i => userObj[i]);
    return userArr;
  };
}

export default Home;
