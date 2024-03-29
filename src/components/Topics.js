import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../api";
import { backendApiBaseUrl } from "../config";
import PropTypes from "prop-types";

class Topics extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    return getAllTopics(
      `${backendApiBaseUrl}${this.props.match.url}`
    ).then(response => {
      const topics = response.data;
      this.setState(topics);
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.url !== this.props.match.url) {
      return getAllTopics(
        `${backendApiBaseUrl}${this.props.match.url}`
      ).then(response => {
        this.setState({ topics: response.data.articles });
      });
    }
  }

  render() {
    const { topics } = this.state;
    return (
      <div>
        <h1>Topics</h1>
        {topics.map((topic, i) => {
          const { title, _id } = topic;

          return (
            <div key={i} className="my-card">
              <div className="card">
                <div className="card-header text-centre">{title}</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-centre">
                    <Link to={`/topics/${_id}/articles`}>
                      {" "}
                      <button className="btn btn-info">
                        Read All Articles
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Topics.propTypes = {
  match: PropTypes.object
};
export default Topics;
