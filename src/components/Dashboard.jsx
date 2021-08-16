import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Feed from "./Feed";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Feed
        maxArticles={this.props.maxArticles}
        userInfo={this.props.userInfo}
      />
    );
  }
}

export default withRouter(Dashboard);
