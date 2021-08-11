import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    //state of login component

    this.state = {
      status: null,
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
    };
  }
  handleChange = (e) => {
    if (e.target.name === "email") {
      this.setState({
        email: e.target.value,
      });
    } else {
      this.setState({
        password: e.target.value,
      });
    }
  };

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
                email: this.state.email,
                password: this.state.password,
              },
            }),
          };

          fetch(
            "https://mighty-oasis-08080.herokuapp.com/api/users/login",
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
                    passwordError: res.errors.password,
                    status: null,
                  },
                  () => {
                    this.props.history.push("/login");
                  }
                );
              } else if ("user" in res) {
                localStorage.setItem("userInfo", JSON.stringify(res.user));

                this.setState(
                  {
                    emailError: "",
                    passwordError: "",
                  },
                  () => {
                    this.props.history.push("/dashboard");
                  }
                );
              }
            });
        }
      );
    }
  };

  render() {
    return (
      <div className="columns is-centered py-5">
        {/* checking if the status id loading or not */}
        {this.state.status === "loading" ? (
          <div className=" py-5 pb-6 px-4 column articles-loading is-half is-size-2 has-text-centered has-text-info-dark">
            {" "}
            "Logging in..."
          </div>
        ) : (
          <div className="box m-6 py-5 pb-6 px-4 column is-half ">
            <div className="title has-text-centered my-1">Login</div>
            <Link to="/register">
              <div className="has-text-centered mb-4 has-text-success">
                Need an account?
              </div>
            </Link>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
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
                  placeholder="Password"
                  onChange={this.handleChange}
                  name="password"
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
            <div class="field">
              <p class="control level">
                <div className="level-left"></div>
                <button
                  class="button is-success level-right"
                  onClick={this.handleClick}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Login);
