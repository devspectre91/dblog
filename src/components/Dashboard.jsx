import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Feed from "./Feed";
import UserContext from "./UserContext";

class Dashboard extends Component {
  static contextType = UserContext;
  componentDidMount() {
    const userInfo = this.context;
    if (!userInfo) {
      this.props.history.push("/");
    }
  }

  render() {
    const userInfo = this.context;
    return <Feed maxArticles={this.props.maxArticles} userInfo={userInfo} />;
  }
}

export default withRouter(Dashboard);
