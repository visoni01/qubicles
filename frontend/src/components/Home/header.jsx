/* eslint-disable complexity */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccountSettings from '../Navbar/userMenu'
import CustomLink from './customLink'
import ROUTE_PATHS from '../../routes/routesPath'

const Header = () => {
  const { userDetails } = useSelector((state) => state.login)
  const [ openNavButtons, setOpenNavButtons ] = useState(false)

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
            <span
              className={ `navbar-burger burger nav-bar-burger ${ openNavButtons ? 'is-active' : '' }` }
              onClick={ () => setOpenNavButtons((curr) => !curr) }
            >
              <span />
              <span />
              <span />
            </span>
            {/* /Responsive toggle */}
          </div>
          {/* Navbar menu */}
          <div id='is-cloned' className={ `navbar-menu ${ openNavButtons ? 'is-active nav-bar-menu-faded' : '' }` }>
            {/* Navbar Start */}
            <div className='navbar-start'>
              {/* Navbar item */}
              <Link
                className={ `navbar-item is-slide ${ openNavButtons ? 'is-active' : '' }` }
                to='/agents'
              >
                For Agents
              </Link>
              {/* Navbar item */}
              <Link
                className={ `navbar-item is-slide ${ openNavButtons ? 'is-active' : '' }` }
                to='/contactcenters'
              >
                For Contact Centers
              </Link>
              {/* Navbar item */}
              <Link
                className={ `navbar-item is-slide ${ openNavButtons ? 'is-active' : '' }` }
                to='/about'
              >
                About
              </Link>
              {/* Navbar item */}
              <Link
                className={ `navbar-item is-slide ${ openNavButtons ? 'is-active' : '' }` }
                to='/contactus'
              >
                Contact Us
              </Link>
            </div>
            {/* Navbar end */}
            {!(userDetails && userDetails.user_id) ? (
              <div className='navbar-end display-inline-flex justify space-between is-fullwidth padding-15'>
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
