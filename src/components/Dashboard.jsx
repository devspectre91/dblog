import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Articles from "./Articles";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.history.push("/");
    }
  }

  render() {
    return <Articles />;
  }
}

export default withRouter(Dashboard);
