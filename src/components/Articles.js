import React, { Component } from "react";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";
import {
  getAllArticles,
  postAnArticle,
  postAComment,
  updateVote
} from "../api";
import { backendApiBaseUrl } from "../config";
import PropTypes from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    comment: "",
    newArticle: {
      title: "",
      body: "",
      created_by: "",
      topic: "coding"
    },
    topics: {
      coding: "5ae309fef1ad7b2cf6a3afcd",
      cooking: "5ae309fef1ad7b2cf6a3afcf",
      football: "5ae309fef1ad7b2cf6a3afce"
    },
    addAnArticle: false,
    sortByVotes: true,
    error: false
  };

  componentDidMount() {
    return getAllArticles(
      `${backendApiBaseUrl}${this.props.match.url}`
    )
      .then(response => {
        const articles = response.data;
        this.setState({
          articles: this.sortArticles(articles.articles, "votes")
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.url !== this.props.match.url) {
      return getAllArticles(
        `${backendApiBaseUrl}${this.props.match.url}`
      )
        .then(response => {
          const articles = response.data;
          this.setState({
            articles: this.sortArticles(articles.articles, "votes")
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: true });
        });
    }
  }

  render() {
    const { articles, error } = this.state;
    if (error)
      return (
        <div>
          <Link to="/">
            <h1>Article not found</h1>
          </Link>
          <NotFound {...this.props} />
        </div>
      );
    else
      return (
        <div>
          {this.state.addAnArticle === true ? (
            <div id="add-an-article">
              <form>
                <div className="form-group">
                  <label htmlFor="article-title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="article-title"
                    placeholder="My new Artice"
                    onChange={this.changeArticleTitle}
                  />
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select your topic
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={this.addTopic}
                    >
                      coding
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={this.addTopic}
                    >
                      football
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={this.addTopic}
                    >
                      cooking
                    </a>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="article-body">Article</label>
                  <textarea
                    className="form-control"
                    id="article-body"
                    rows="5"
                    onChange={this.articleBody}
                  />
                </div>
                <button onClick={this.addArticle}>submit</button>
              </form>
            </div>
          ) : null}{" "}
          {this.state.addAnArticle === false ? (
            <div>
              <h1>Articles</h1>
              <button
                className="btn btn-secondary"
                onClick={this.sortArticlesbyComments}
                disabled={
                  !this.state.sortByVotes || this.state.articles.length === 1
                }
              >
                sort by comments
              </button>
              <button
                className="btn btn-secondary"
                onClick={this.sortArticlesbyVotes}
                disabled={
                  this.state.sortByVotes || this.state.articles.length === 1
                }
              >
                sort by votes
              </button>
              <button className="btn btn-secondary" onClick={this.handleClick}>
                Share an article with us
              </button>
              {articles.map((article, i) => {
                const {
                  _id,
                  title,
                  body,
                  votes,
                  comments,
                  belongs_to: { slug },
                  created_by: { name, avatar_url }
                } = article;

                return (
                  <div key={i} className="card my-card">
                    <div className="card-header text-centre">
                      <Link to={`/articles/${_id}`}>
                        <strong>
                          <h2 className="title-header">{title}</h2>
                        </strong>
                      </Link>
                    </div>
                    <div className="text-centre">
                      Posted by- <strong>{name} </strong>
                      <img
                        className="article-writer"
                        src={avatar_url}
                        alt=""
                        onError={event =>
                          (event.target.src =
                            "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg")
                        }
                      />
                    </div>

                    <h5 className="text-centre">Topic: {slug}</h5>

                    <div id="vote-up-down">
                      <h5>
                        votes: <button>{votes}</button>
                        <button
                          className="btn btn-secondary"
                          id={_id}
                          onClick={this.voteUpOrDown}
                        >
                          ⇑
                        </button>
                        <button
                          className="btn btn-secondary"
                          id={_id}
                          onClick={this.voteUpOrDown}
                        >
                          ⇓
                        </button>
                      </h5>
                    </div>

                    <div className="card-body">
                      <p className="card-text">{body}</p>

                      <Link to={`/articles/${_id}/comments`}>
                        <button className="btn btn-info">
                          Comments... {comments}
                        </button>
                      </Link>
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button
                          id={_id}
                          className="btn btn-secondary"
                          onClick={this.addComment}
                        >
                          {" "}
                          Share your thoughts
                        </button>
                      </div>
                      <textarea
                        className="form-control"
                        aria-label="Comment textarea"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      );
  }

  handleClick = event => {
    this.setState({
      ...this.state,
      addAnArticle: true
    });
  };

  addTopic = event => {
    let topicName = event.target.innerText;
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        topic: this.state.topics[topicName],
        created_by: this.props.user
      }
    });
  };

  changeArticleTitle = event => {
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        title: event.target.value
      }
    });
  };

  articleBody = event => {
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        body: event.target.value
      }
    });
  };

  addArticle = event => {
    event.preventDefault();
    const topicid = this.state.newArticle.topic;
    const newObj = {
      title: this.state.newArticle.title,
      body: this.state.newArticle.body,
      created_by: this.state.newArticle.created_by
    };

    return postAnArticle(
      `${backendApiBaseUrl}/topics/${topicid}/articles`,
      newObj
    )
      .then(response => {
        this.setState({
          articles: [response.data.articles[0], ...this.state.articles],
          newArticle: {
            title: "",
            body: "",
            created_by: "",
            topic: ""
          },
          addAnArticle: false
        });
      })
      .catch(err => {
        console.log(err);
        alert(
          "Oopss....Article cannot be posted, check if you have added all the information"
        );
      });
  };

  addComment = event => {
    const id = event.target.id;
    const newComment = {
      body: this.state.comment,
      created_by: this.props.user
    };

    return postAComment(
      `${backendApiBaseUrl}/articles/${id}/comments`,
      newComment
    )
      .then(res => {
        let updatedArray = this.state.articles.map(article => {
          if (article._id === id) {
            article.comments += 1;
          }
          return article;
        });

        this.setState({ articles: updatedArray, comment: "" });
      })
      .catch(err => {
        console.log(err);
        alert(
          "Sorry, comment cannot be add, please check if you have entered any comment"
        );
      });
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  voteUpOrDown = event => {
    let upOrDown = event.target.innerText === "⇑" ? "up" : "down";
    let id = event.target.id;

    return updateVote(
      `${backendApiBaseUrl}/articles/${id}?vote=${upOrDown}`
    )
      .then(res => {
        let updatedArray = this.state.articles.map(article => {
          if (article._id === id) {
            upOrDown === "up" ? (article.votes += 1) : (article.votes -= 1);
          }
          return article;
        });

        this.setState({
          articles: updatedArray
        });
      })
      .catch(err => {
        console.log(err);
        alert("Vote is not updated, please try again later");
      });
  };

  sortArticles = (articles, sortBy) => {
    const sortedArticles = articles.sort((a, b) => {
      return sortBy === "votes" ? b.votes - a.votes : b.comments - a.comments;
    });
    return sortedArticles;
  };

  sortArticlesbyComments = event => {
    const sortedArticles = this.state.articles.sort((a, b) => {
      return b.comments - a.comments;
    });
    this.setState({ articles: sortedArticles, sortByVotes: false });
  };

  sortArticlesbyVotes = event => {
    const sortedArticles = this.state.articles.sort((a, b) => {
      return b.votes - a.votes;
    });
    this.setState({ articles: sortedArticles, sortByVotes: true });
  };
}

Articles.propTypes = {
  match: PropTypes.object,
  user: PropTypes.string
};
export default Articles;
