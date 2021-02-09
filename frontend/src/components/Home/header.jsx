import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccountSettings from '../Navbar/userMenu'
import CustomLink from './customLink'
import ROUTE_PATHS from '../../routes/routesPath'

const Header = () => {
  const { userDetails } = useSelector((state) => state.login)

  return (
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
            {!(userDetails && userDetails.user_id) ? (
              <div className='navbar-end'>
                {/* Sign up button */}
                <div className='navbar-item'>
                  <CustomLink
                    to='http://manager.qubicles.io/account/logon'
                    className='custom-login-button'
                  >
                    Login
                  </CustomLink>
                </div>
                <div className='navbar-item'>
                  <CustomLink
                    to='/signup'
                    className='custom-signup-button'
                  >
                    Signup
                  </CustomLink>
                </div>
              </div>
            )
              : (
                <div className='display-inline-flex align-items-center'>
                  <div className='navbar-end'>
                    {/* Sign up button */}
                    <div className='navbar-item'>
                      <Link
                        to={ userDetails.is_post_signup_completed ? ROUTE_PATHS.DASHBOARD : ROUTE_PATHS.POST_SIGN_UP }
                        className='custom-login-button'
                      >
                        My Account
                      </Link>
                    </div>
                  </div>
                  {userDetails.is_post_signup_completed && <AccountSettings />}
                </div>
              )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
