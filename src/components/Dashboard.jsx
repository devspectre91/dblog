import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.history.push("/");
    }
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(Dashboard);
