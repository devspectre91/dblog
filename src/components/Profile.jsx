import React, { Component } from "react";
import Articles from "./Articles";

class Profile extends Component {
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <>
        <div className="hero is-dark is-small py-6">
          <div className="hero-body has-text-centered mx-6">
            <div className="level">
              <div className="level-item">
                <figure class="image is-128x128 ">
                  <img
                    className="is-rounded"
                    src={this.props.userInfo.image}
                    alt="profile"
                  />
                </figure>
              </div>
            </div>
            <div className="is-size-1">{this.props.userInfo.username}</div>

            <div className="subtitle has-text-success">
              {" "}
              {this.props.userInfo.bio}
            </div>

          
          </div>
        </div>

        {/* personal feed ui */}
        <Articles />
      </>
    );
  }
}

export default Profile;
