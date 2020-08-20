import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <div className='navbar-placeholder'>
    <nav className='navbar navbar-wrapper navbar-fade navbar-light'>
      <div className='container'>
        {/* Brand */}
        <div className='navbar-brand'>
          <a className='navbar-item' href='/'>
            <img className='light-logo logo-height' src='https://i.imgur.com/y5zrESW.png' alt='' />
            <img className='dark-logo logo-height' src='https://i.imgur.com/Ap2GB30.png' alt='' />
          </a>
          {/* Responsive toggle */}
          <div className='custom-burger' data-target='is-cloned'>
            <span className='responsive-btn'>
              <span className='menu-toggle'>
                <span className='icon-box-toggle'>
                  <span className='rotate'>
                    <i className='icon-line-top' />
                    <i className='icon-line-center' />
                    <i className='icon-line-bottom' />
                  </span>
                </span>
              </span>
            </span>
          </div>
          {/* /Responsive toggle */}
        </div>
        {/* Navbar menu */}
        <div id='is-cloned' className='navbar-menu'>
          {/* Navbar Start */}
          <div className='navbar-start'>
            {/* Navbar item */}
            <Link className='navbar-item is-slide' to='/agents'>
              For Agents
            </Link>
            {/* Navbar item */}
            <Link className='navbar-item is-slide' to='/contactcenters'>
              For Contact Centers
            </Link>
            {/* Navbar item */}
            <Link className='navbar-item is-slide' to='/about'>
              About
            </Link>
            {/* Navbar item */}
            <Link className='navbar-item is-slide' to='/contactus'>
              Contact Us
            </Link>
          </div>
          {/* Navbar end */}
          <div className='navbar-end'>
            {/* Navbar item */}
            <Link className='navbar-item is-slide' to='/login'>
              Login
            </Link>
            {/* Sign in button */}
            <div className='navbar-item'>
              <Link
                to='/signup'
                className='button button-signup btn-outlined is-bold btn-align light-btn rounded raised'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
)

export default Header
