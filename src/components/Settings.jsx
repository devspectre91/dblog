import React, { Component } from "react";
import { withRouter} from "react-router-dom";

class Settings extends Component {
  constructor(props) {
    super(props);

    //state of register component

    this.state = {
      status: null,
      username: null,
      email: null,
      bio: null,
      image:null,
      password: "",
      error:null
    };
  }
  componentDidMount(){
    if (!this.props.userInfo) {
      this.props.history.push("/");
    }else{
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.userInfo.token}`,
      }
    };

    this.setState({
        status:'loading'
    },()=>{
        fetch(
            "https://mighty-oasis-08080.herokuapp.com/api/user",
            requestOptions
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res.user);
              if(res.user){
               this.setState({
                status: null,
                username: res.user.username,
                email: res.user.email,
                bio: res.user.bio,
                image:res.user.image,
             
               })
              }
            });
    })}
  }
  handleChange = (e) => {
    if (e.target.name === "email") {
      this.setState({
        email: e.target.value,
      });
    } else if (e.target.name === "username") {
      this.setState({
        username: e.target.value,
      });
    } else if (e.target.name === "bio") {
      this.setState({
        bio: e.target.value,
      });
    } else if (e.target.name === "image") {
      this.setState({
        image: e.target.value,
      });
    } else if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }
  };


  handleClick = (e) => {
console.log(this.props.userInfo.token)
      this.setState(
        {
          status: "loading",
        },
        () => {
          const requestOptions = this.state.password?{
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.props.userInfo.token}` },
            body: JSON.stringify({
              user: {
                username: this.state.username,
                email: this.state.email,
               password:this.state.password,
                bio: this.state.bio,
                image: this.state.image,
              },
            }),
          }:{
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.props.userInfo.token}` },
            body: JSON.stringify({
              user: {
                username: this.state.username,
                email: this.state.email,
                bio: this.state.bio,
                image: this.state.image,
              },
            }),
          };

          fetch(
            "https://mighty-oasis-08080.herokuapp.com/api/user",
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
                    status: null,
                  },
                  () => {
                    this.props.history.push("/settings");
                  }
                );
              } else if ("user" in res) {
                this.props.logIn(res.user);
               

                this.setState(
                  {
                    error: "",
                  },
                  () => {
                    this.props.history.push(`/profiles/${res.user.username}`);
                  }
                );
              }
            });
        }
      );
    
  };
  render() {
    return (
      <div className="columns is-centered py-0">
        {/* checking if the status id loading or not */}
        {this.state.status === "loading" ? (
          <div className=" py-5 pb-6 px-4 column articles-loading is-half is-size-2 has-text-centered has-text-info-dark">
            {" "}
            "Updating User Settings..."
          </div>
        ) : (
          <div className="box m-6 py-5 pb-6 px-4 column is-half has-background-light">
            <div className="title has-text-centered my-1 mb-4">Settings</div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="image"
                  value={this.state.image?this.state.image:this.props.userInfo.image}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-camera"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
             
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <textarea
                  className="textarea px-4"
                  type="textarea"
                  name="bio"
                  rows="5"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  placeholder="Write a few words about your here..."
                />
              </p>
            </div>
            <div className="field ">
              <p className="control level ">
                <div className="level-left"></div>
                <button
                  className="button level-right is-success"
                  onClick={this.handleClick}
                >
                  Update
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Settings);
