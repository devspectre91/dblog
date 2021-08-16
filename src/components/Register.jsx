import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    //state of register component

    this.state = {
      status: null,
      username: "",
      userNameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
    };
  }

  //to validate email on client side
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  //to validate password on client side
  validatePassword = (password) => {
    if (password.match("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$")) {
      this.setState(
        {
          passwordError: "",
        },
        () => {
          if (password.length < 6) {
            this.setState({
              passwordError: "Must be atleast 6 characters long.",
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      );
    } else {
      this.setState({
        passwordError: "Must contain an alphabet and a digit",
      });
    }
  };

  //controlling input components here
  handleChange = (e) => {
    if (e.target.name === "email") {
      this.setState(
        {
          email: e.target.value,
        },
        () => {
          if (!this.validateEmail(this.state.email)) {
            this.setState({
              emailError: "Validation Error",
            });
          } else {
            this.setState({
              emailError: "",
            });
          }

          if (this.state.email === "") {
            this.setState({
              emailError: "Field cannot be empty",
            });
          }
        }
      );
    } else if (e.target.name === "username") {
      this.setState({
        username: e.target.value,
        usernameError: "",
      });
    } else {
      this.setState(
        {
          password: e.target.value,
        },
        () => {
          this.validatePassword(this.state.password);
        }
      );
    }
  };

  //handling click on signup buttton
  //if there is no client side error, setting status to loading, then sending a fetch request
  handleClick = (e) => {
    if (!this.state.emailError && !this.state.passwordError) {
      this.setState(
        {
          status: "loading",
        },
        () => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
              },
            }),
          };

          fetch(
            "https://mighty-oasis-08080.herokuapp.com/api/users",
            requestOptions
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);
              if ("errors" in res) {
                this.setState(
                  {
                    emailError: res.errors.email,
                    usernameError: res.errors.username,
                    status: null,
                  },
                  () => {
                    this.props.history.push("/register");
                  }
                );
              } else if ("user" in res) {
                localStorage.setItem("userInfo", res.user.token);

                this.setState(
                  {
                    emailError: "",
                    userNameError: "",
                    passwordError: "",
                  },
                  () => {
                    this.props.history.push("/login");
                  }
                );
              }
            });
        }
      );
    }
  };
  componentDidMount() {
    if (this.props.userInfo) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="columns is-centered py-0">
        {/* checking if the status id loading or not */}
        {this.state.status === "loading" ? (
          <div className=" py-5 pb-6 px-4 column articles-loading is-half is-size-2 has-text-centered has-text-info-dark">
            {" "}
            "Creating User..."
          </div>
        ) : (
          <div className="box m-6 py-5 pb-6 px-4 column is-half has-background-light">
            <div className="title has-text-centered my-1">Sign Up</div>
            <Link to="/login">
              <div className="has-text-centered mb-4 has-text-success">
                Have an account?
              </div>
            </Link>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Username"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                {this.state.usernameError ? (
                  <div className="has-text-danger">
                    {this.state.usernameError}
                  </div>
                ) : null}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                {!this.state.emailError ? (
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                ) : null}

                {this.state.emailError ? (
                  <div className="has-text-danger">{this.state.emailError}</div>
                ) : null}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                {this.state.passwordError ? (
                  <div className="has-text-danger">
                    {this.state.passwordError}
                  </div>
                ) : null}
              </p>
            </div>
            <div class="field ">
              <p class="control level ">
                <div className="level-left"></div>
                <button
                  class="button level-right is-success"
                  onClick={this.handleClick}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
// using withRouter HOC to redirect to home page
export default withRouter(Register);
