import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {

   validateEmail=(email)=> {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    
  render() {
    return (
      <div className="columns is-centered py-5">
        <div className="box m-6 py-5 pb-6 px-4 column is-half ">
          <div className="title has-text-centered my-1">Login</div>
          <Link to='/register'><div className='has-text-centered mb-4 has-text-success'>Need an account?</div></Link> 
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Password" />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control level">
                <div className="level-left"></div>
              <button class="button is-success level-right">Login</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
