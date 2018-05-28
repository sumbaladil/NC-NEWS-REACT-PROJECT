import React, { Component } from "react";
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
    ).then(response => {
      const articles = response.data;

      let sortedArticles = articles.articles.sort(function(a, b) {
        return b.votes - a.votes;
      });
      const users = this.UsersArticles(articles);
      let sortedUsers = users.sort(function(a, b) {
        return b.articles - a.articles;
      });

      this.setState({
        articles: sortedArticles.slice(0, 3),
        users: sortedUsers.slice(0, 3)
      });
    });
  };

  render() {
    const { articles, users } = this.state;
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
                  <img id="nc-logo" src="logo.png" alt="" />
                </a>
              </h1>
            </div>
          </h1>
        </div>
        <PopularArticles articles={articles} onClick={this.handleClick} />
        <hr />
        <PopularUsers users={users} />
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
