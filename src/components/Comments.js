import React, { Component } from "react";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";
import { getAllComments, updateVote, deleteComment } from "../api";
import PropTypes from "prop-types";

class Comments extends Component {
  state = {
    comments: [],
    error: false
  };

  componentDidMount() {
    return getAllComments(
      `https://nc-news-backend-project.onrender.com/api${this.props.match.url}`
    )
      .then(response => {
        this.setState({ comments: response.data.comments.reverse() });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.url !== this.props.match.url) {
      return getAllComments(
        `https://nc-news-backend-project.onrender.com/api${this.props.match.url}`
      )
        .then(response => {
          this.setState({ comments: response.data.comments.reverse() });
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: true });
        });
    }
  }

  render() {
    const { comments, error } = this.state;
    if (error)
      return (
        <div>
          <Link to="/">
            <h1>Comment not found</h1>
          </Link>
          <NotFound {...this.props} />
        </div>
      );
    else
      return (
        <div>
          <h1>Comments</h1>
          {comments.map((comment, i) => {
            const {
              created_at,
              votes,
              _id,
              body,
              belongs_to: { title },
              created_by: { name, avatar_url, _id: userId }
            } = comment;
            return (
              <div key={i} className="my-card">
                <div className="card">
                  <div className="card-header text-centre">
                    <h3>{title}</h3>
                    <img
                      className="card-img-top user-comment"
                      src={avatar_url}
                      alt=""
                    />
                    <h6>
                      <strong>Commented by:</strong>
                    </h6>
                    <h6>{name}</h6>
                    <h6>{created_at}</h6>
                    <button
                      id={_id}
                      className="btn btn-danger"
                      style={{
                        visibility:
                          this.props.user === userId ? "visible" : "hidden"
                      }}
                      onClick={this.handleClick}
                    >
                      Delete
                    </button>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item text-centre">
                      <div>
                        <h5>{body}</h5>
                      </div>
                    </li>
                  </ul>
                  <div id="vote-up-down" className="text-centre">
                    <h5>
                      votes: <button>{votes}</button>
                      <button id={_id} onClick={this.voteUpOrDown}>
                        ⇑
                      </button>
                      <button id={_id} onClick={this.voteUpOrDown}>
                        ⇓
                      </button>
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
  }

  voteUpOrDown = event => {
    let upOrDown = event.target.innerText === "⇑" ? "up" : "down";
    let id = event.target.id;
    return updateVote(
      `https://nc-news-backend-project.onrender.com/api/comments/${id}?vote=${upOrDown}`
    )
      .then(res => {
        let updatedArray = this.state.comments.map(comment => {
          if (comment._id === id) {
            upOrDown === "up" ? (comment.votes += 1) : (comment.votes -= 1);
          }
          return comment;
        });

        this.setState({ comments: updatedArray });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };
  handleClick = event => {
    const id = event.target.id;
    return deleteComment(
      `https://nc-news-backend-project.onrender.com/api/comments/${id}`
    )
      .then(res => {
        let updatedArray = this.state.comments.filter(comment => {
          if (comment._id !== id) {
            return comment;
          }
        });

        this.setState({ comments: updatedArray });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };
}

Comments.propTypes = {
  match: PropTypes.object,
  user: PropTypes.string
};

export default Comments;
