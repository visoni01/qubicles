import React from 'react'

const Header = () => (
  <div className='navbar-placeholder'>
    <nav className='navbar navbar-wrapper navbar-fade navbar-light is-transparent'>
      <div className='container'>
        {/* Brand */}
        <div className='navbar-brand'>
          <a className='navbar-item' href='/'>
            <img className='light-logo' src='img/logos/qbe-light.png' alt='' />
            <img className='dark-logo' src='img/logos/qbe-dark.png' alt='' />
          </a>
          {/* Responsive toggle */}
          <div className='custom-burger' data-target='is-cloned'>
            <a id className='responsive-btn' href='javascript:void(0);'>
              <span className='menu-toggle'>
                <span className='icon-box-toggle'>
                  <span className='rotate'>
                    <i className='icon-line-top' />
                    <i className='icon-line-center' />
                    <i className='icon-line-bottom' />
                  </span>
                </span>
              </span>
            </a>
          </div>
          {/* /Responsive toggle */}
        </div>
        {/* Navbar menu */}
        <div id='is-cloned' className='navbar-menu'>
          {/* Navbar Start */}
          <div className='navbar-start'>
            {/* Navbar item */}
            <a className='navbar-item is-slide' href='/agents'>
              For Agents
            </a>
            {/* Navbar item */}
            <a className='navbar-item is-slide' href='/contactcenters'>
              For Contact Centers
            </a>
            {/* Navbar item
        <a class="navbar-item is-slide" href="https://medium.com/@qubicles" target="_blank">
            Blog
        </a> */}
            {/* Navbar item */}
            <a className='navbar-item is-slide' href='/about'>
              About
            </a>
            {/* Navbar item */}
            <a className='navbar-item is-slide' href='/contactus'>
              Contact Us
            </a>
          </div>
          {/* Navbar end */}
          <div className='navbar-end'>
            {/* Navbar item */}
            <a className='navbar-item is-slide' href='/login'>
              Login
            </a>
            {/* Sign in button */}
            <div className='navbar-item'>
              <a id='#signup-btn' href='/login' className='button button-signup btn-outlined is-bold btn-align light-btn rounded raised'>
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
)

export default Header
