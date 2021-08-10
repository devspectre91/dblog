import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className='has-text-centered hero'>
              
                    <div className="is-size-1 has-text-black has-text-weight-bold mt-6">Welcome to <span className='has-text-danger-dark'>Dblog!</span></div>
                    <div className="is-size-3 has-text-dark">Browse articles by amazing authors or publish one.</div>

                    <Link to='/articles' exact> <div className="button is-dark feed-button">Articles Feed</div></Link>
               
            </div>

   );
    }
}

export default Home;
