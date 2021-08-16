import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    //state of login component

    this.state = {
      status: null,
      email: "",
      error: "",
    };
  }
  handleChange = (e) => {
    if (e.target.name === "email") {
      this.setState({
        email: e.target.value,
        error: "",
      });
    } else {
      this.setState({
        password: e.target.value,
      });
    }
  };

  handleClick = (e) => {
    if (!this.state.error) {
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
                    error: `Either username or password ${res.errors["email or password"]}`,

                    status: null,
                  },
                  () => {
                    this.props.history.push("/login");
                  }
                );
              } else if ("user" in res) {
                console.log(res);
                localStorage.setItem("userInfo", JSON.stringify(res.user));

                this.setState(
                  {
                    emailError: "",
                    passwordError: "",
                  },
                  () => {
                    this.props.logIn(res.user);
                    this.props.history.push("/dashboard");
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
      <div className="columns is-centered py-5">
        {/* checking if the status id loading or not */}
        {this.state.status === "loading" ? (
          <div className=" py-5 pb-6 px-4 column articles-loading is-half is-size-2 has-text-centered has-text-info-dark">
            {" "}
            "Logging in..."
          </div>
        ) : (
          <div className="box m-6 py-5 pb-6 px-4 column is-half has-background-light">
            <div className="title has-text-centered my-1">Login</div>
            <Link to="/register">
              <div className="has-text-centered mb-4 has-text-success">
                Need an account?
              </div>
            </Link>
            {this.state.error ? (
              <div className="has-text-danger">{this.state.error}</div>
            ) : null}
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  name="password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control level">
                <div className="level-left"></div>
                <button
                  className="button is-success level-right"
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
