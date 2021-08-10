import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
      
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
       console.log("clicked")
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }

    }
  render() {
    return (
      <nav className="navbar px-6 py-2" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
         <div className='navbar-item  is-size-4 has-text-weight-bold'> <Link to='/' className='has-text-light'> Dblog </Link></div>
          <Link
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        {/* <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to='/' className="navbar-item py-4">Home</Link>
          </div>
        </div> */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons is-centered ">
              <Link to='/register' className="button is-dark mr-4">
                <strong>Sign up</strong>
              </Link>
              <Link to='/login' className="button is-light ">Log in</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
