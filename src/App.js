import React, { Component } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Users from "./components/Users";
import Topics from "./components/Topics";
import Comments from "./components/Comments";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    // Using a user id for guest user created in the database
    // Todo: Add support for adding new user accounts
    loggedInUser: "63c4700c35590378be54f843"
  };
  render() {
    return (
      <div className="App container">
        <Header />
        <Nav />
        <Switch>
          <Route
            path="/articles/:article_id/comments"
            render={props => {
              return <Comments {...props} user={this.state.loggedInUser} />;
            }}
          />

          <Route
            path="/articles/:article_id"
            render={props => {
              return <Articles {...props} user={this.state.loggedInUser} />;
            }}
          />

          <Route
            path="/articles"
            render={props => {
              return <Articles {...props} user={this.state.loggedInUser} />;
            }}
          />

          <Route
            exact
            path="/users/:user_id"
            render={props => {
              return <Users {...props} />;
            }}
          />

          <Route
            exact
            path="/users"
            render={props => {
              return <Users {...props} />;
            }}
          />

          <Route
            path="/topics/:topic_id/articles"
            render={props => {
              return <Articles {...props} user={this.state.loggedInUser} />;
            }}
          />

          <Route
            exact
            path="/topics"
            render={props => {
              return <Topics {...props} />;
            }}
          />

          <Route exact path="/" component={Home} />

          <Route path="/" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
