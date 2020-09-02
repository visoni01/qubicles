import React from 'react'
import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Footer = () => (
  <footer className='footer footer-dark'>
    <div className='container'>
      <div className='columns'>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-header'>
              <h3>Product</h3>
            </div>
            <ul className='link-list'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/agents'>For Agents</Link></li>
              <li><Link to='/contactcenters'>For Contact Centers</Link></li>
            </ul>
          </div>
        </div>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-header'>
              <h3>Company</h3>
            </div>
            <ul className='link-list'>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/contactus'>Contact Us</Link></li>
              <li><Link to='/login'>Sign Up</Link></li>
            </ul>
            <div style={ { marginTop: '5px' } }>
              <a
                href='https://www.getapp.com/it-communications-software/a/fenero/reviews/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  alt='Read Qubicles Reviews on GetApp.com'
                  src='https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application'
                  title='Read Qubicles Reviews on GetApp.com'
                />
              </a>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-header'>
              <h3>Resources</h3>
            </div>
            <ul className='link-list'>
              <li><a href='http://support.qubicles.io'>Support</a></li>
              <li><Link to='/termsofuse'>Terms of Use</Link></li>
              <li><Link to='/privacypolicy'>Privacy Policy</Link></li>
            </ul>
            <div style={ { marginTop: '5px' } }>
              <a
                href={ `https://www.capterra.com/reviews/161183/Fenero?utm_source=vendor&utm_medium=badge
                &utm_campaign=capterra_reviews_badge` }
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  border={ 0 }
                  src='https://assets.capterra.com/badge/54c78f6565f4030db187353d12a99c33.png?v=2112709&p=161183'
                  alt=''
                />
              </a>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-logo'>
              <img src='https://i.imgur.com/Ap2GB30.png' alt='' />
            </div>
            <div className='footer-header'>
              <nav className='level is-mobile'>
                <div className='level-left level-social'>
                  <a
                    target='_blank'
                    className='level-item'
                    href='https://www.facebook.com/Qubicles.io'
                    rel='noopener noreferrer'
                  >
                    <span className='icon'><FacebookIcon /></span>
                  </a>
                  <a
                    target='_blank'
                    className='level-item'
                    href='https://twitter.com/Qubicles'
                    rel='noopener noreferrer'
                  >
                    <span className='icon'><TwitterIcon /></span>
                  </a>
                  <a
                    target='_blank'
                    className='level-item'
                    href='https://www.linkedin.com/company/qubiclesio'
                    rel='noopener noreferrer'
                  >
                    <span className='icon'><LinkedinIcon /></span>
                  </a>
                </div>
              </nav>
            </div>
            <div>
              <span className='moto light-text'>
                Copyright 2020
                <FontAwesomeIcon icon={ faCopyright } className='ml-5 mr-5' />
                Qubicles, Inc.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
