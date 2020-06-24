import React from 'react'

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
              <li><a href='/'>Home</a></li>
              <li><a href='/agents'>For Agents</a></li>
              <li><a href='/contactcenters'>For Contact Centers</a></li>
            </ul>
          </div>
        </div>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-header'>
              <h3>Company</h3>
            </div>
            <ul className='link-list'>
              <li><a href='/about'>About</a></li>
              <li><a href='/contactus'>Contact Us</a></li>
              <li><a href='/signup'>Sign Up</a></li>
            </ul>
            <div style={ { marginTop: '5px' } }>
              <a href='https://www.getapp.com/it-communications-software/a/fenero/reviews/' target='_blank'><img alt='Read Fenero Reviews on GetApp.com' src='https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application' srcSet='https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application, https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application@2x 2x, https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application@3x 3x' title='Read Qubicles Reviews on GetApp.com' /></a>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-header'>
              <h3>Resources</h3>
            </div>
            <ul className='link-list'>
              <li><a href='http://support.fenero.com'>Support</a></li>
              <li><a href='/termsofuse'>Terms of Use</a></li>
              <li><a href='/privacypolicy'>Privacy Policy</a></li>
            </ul>
            <div style={ { marginTop: '5px' } }>
              <a href='https://www.capterra.com/reviews/161183/Fenero?utm_source=vendor&utm_medium=badge&utm_campaign=capterra_reviews_badge' target='_blank'>
                {' '}
                <img border={ 0 } src='https://assets.capterra.com/badge/54c78f6565f4030db187353d12a99c33.png?v=2112709&p=161183' />
              </a>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='footer-column'>
            <div className='footer-logo'>
              <img src='img/logos/qbe-dark.png' alt='' />
            </div>
            <div className='footer-header'>
              <nav className='level is-mobile'>
                <div className='level-left level-social'>
                  <a target='_blank' className='level-item' href='https://www.facebook.com/Qubicles.io'>
                    <span className='icon'><i className='fa fa-facebook' /></span>
                  </a>
                  <a target='_blank' className='level-item' href='https://twitter.com/Qubicles'>
                    <span className='icon'><i className='fa fa-twitter' /></span>
                  </a>
                  <a target='_blank' className='level-item' href='https://www.linkedin.com/company/qubiclesio'>
                    <span className='icon'><i className='fa fa-linkedin' /></span>
                  </a>
                  <a target='_blank' className='level-item' href='https://medium.com/@qubicles'>
                    <span className='icon'><i className='fa fa-medium' /></span>
                  </a>
                </div>
              </nav>
            </div>
            <div className='copyright'>
              <span className='moto light-text'>
                Copyright 2020
                {' '}
                <i className='fa fa-copyright' />
                {' '}
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
