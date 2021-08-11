import React, { Component } from "react";
import {Link } from "react-router-dom";

class Header extends Component {


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
      <nav className="navbar is-light px-6 py-1" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
         <div className='navbar-item '> <Link to='/' className='has-text-dark brand'> Dblog !</Link></div>
          <div
            role="button"
            className="navbar-burger has-text-white"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
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
              <Link to='/login' className="button   ">Log in</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
