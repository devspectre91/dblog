import React, { Component } from "react";
import ProfileFeed from "./ProfileFeed";
import { withRouter } from "react-router-dom";
import UserContext from "./UserContext";



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: false,
      following: false,
    };
  }
  static contextType = UserContext
  componentDidMount() {
    const userInfo = this.context

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo
          ? `Bearer ${userInfo.token}`
          : null,
      },
    };

    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}`,
      requestOptions
    )
      .then((data) => {
        if (data.statusText === "Not Found") {
          console.log("error if");
          this.setState({
            user: null,
            error: true,
          });
        } else {
          return data.json();
        }
      })
      .then((data) => {
        if (data) {
          this.setState({
            user: data.profile,
            following: data.profile.following,
          });
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}`
      )
        .then((data) => {
          if (data.statusText === "Not Found") {
            console.log("error if");
            this.setState({
              user: null,
              error: true,
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
  }

  handleClick = (e) => {
    const userInfo = this.context
    if (e.target.dataset.id === "follow") {
      this.setState(
        {
          following: true,
        },
        () => {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          fetch(
            `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}/follow`,
            requestOptions
          );
        }
      );
    } else if (e.target.dataset.id === "unfollow") {
      this.setState(
        {
          following: false,
        },
        () => {
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          fetch(
            `https://mighty-oasis-08080.herokuapp.com/api/profiles/${this.props.match.params.username}/follow`,
            requestOptions
          );
        }
      );
    }
  };
  render() {
    const userInfo = this.context
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
                  {this.state.user.bio}
                </div>

                {userInfo &&
                !(userInfo.username === this.state.user.username) ? (
                  this.state.following ? (
                    <div
                      className="button"
                      data-id="unfollow"
                      onClick={this.handleClick}
                    >
                      Unfollow
                    </div>
                  ) : (
                    <div
                      className="button"
                      data-id="follow"
                      onClick={this.handleClick}
                    >
                      Follow
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <ProfileFeed
              user={this.state.user}
             
            />
          </>
        ) : this.state.error ? (
          <div className="has-text-danger-dark mt-6 container title has-text-centered">
            No User Found!
          </div>
        ) : (
          <div className="has-text-success-dark mt-6 container title has-text-centered">
            Loading  <div className="lds-ellipsis "><div></div><div></div><div></div><div></div></div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Profile);
