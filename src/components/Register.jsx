import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
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
          } else{
            this.setState({
                passwordError:'',
              });  
          }
        }
      );
    }
    else{
        this.setState({
            passwordError:'Must contain an alphabet and a digit'
        })
    }
  };
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

  render() {
    return (
      <div className="columns is-centered py-0">
        <div className="box m-6 py-5 pb-6 px-4 column is-half ">
          <div className="title has-text-centered my-1">Sign Up</div>
          <Link to="/login">
            <div className="has-text-centered mb-4 has-text-success">
              Have an account?
            </div>
          </Link>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="text" placeholder="Username" />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
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
                <div className="has-text-danger">{this.state.passwordError}</div>
              ) : null}
            </p>
          </div>
          <div class="field ">
            <p class="control level ">
              <div className="level-left"></div>
              <button class="button level-right is-success">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
