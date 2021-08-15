import React, { Component } from "react";
import ProfileFeed from "./ProfileFeed";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error:false
    };
  }

  componentDidMount() {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}`
    )
      .then((data) => {
        if (data.statusText === "Not Found") {
          console.log("error if");
          this.setState({
            user: null,
            error:true
          });
        } else {
          return data.json();
        }
      })
      .then((data) => {
        if (data) {
          this.setState({
            user: data.profile,
          });
        }
      });
  }

  render() {
 
    return (
      <>
      
        {this.state.user ? (
          <>
            <div className="hero is-dark is-small py-6">
              <div className="hero-body has-text-centered mx-6">
                <div className="level">
                  <div className="level-item">
                    <figure class="image is-128x128 ">
                      <img
                        className="is-rounded"
                        src={this.state.user.image}
                        alt="profile"
                      />
                    </figure>
                  </div>
                </div>
                <div className="is-size-1">{this.state.user.username}</div>

                <div className="subtitle has-text-success">
                  {" "}
                  {this.state.user.bio}
                </div>
              </div>
            </div>
            <ProfileFeed user={this.state.user} loggedInUser={this.props.userInfo} />
          </>
        ) : (
         this.state.error? <div className="has-text-danger-dark mt-6 container title has-text-centered">
        No User Found!
        </div>: <div className="has-text-info-dark mt-6 container title has-text-centered">
         Loading...
        </div>
        )}
      </>
    );
  }
}

export default withRouter(Profile);
