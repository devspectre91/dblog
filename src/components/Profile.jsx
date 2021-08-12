import React, { Component } from 'react';

class Profile extends Component {

    componentDidMount() {
        if (!this.props.userInfo) {
          this.props.history.push("/");
        }
      }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Profile;
