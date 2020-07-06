import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCity, faEnvelope, faMobileAlt, faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons'
import GoogleMapReact from 'google-map-react'
import { Header, Footer } from './index'

const ContactUs = () => (
  <div>
    {/* Hero (Parallax) and nav */}
    <div className='hero parallax is-cover is-relative is-default is-bold bg-for-contact-us'>
      <Header />
      {/* Hero text */}
      <div id='main-hero' className='hero-body pt-80 pb-80'>
        <div className='container has-text-centered'>
          <div className='columns is-vcentered'>
            <div className='column is-6 is-offset-3 has-text-centered'>
              <h1 className='title main-title text-bold is-2'>
                Contact us
              </h1>
              <h2 className='subtitle is-4 light-text pt-10 pb-10'>
                As pioneers charting a new course for the contact center industry, we love to connect and engage.
              </h2>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Form section */}
    <div className='section section-feature-grey is-medium'>
      <div className='container'>
        {/* Title */}
        <div className='section-title-wrapper'>
          <div className='bg-number contact-us-icon'>
            <FontAwesomeIcon icon={ faCity } />
          </div>
          <h2 className='title section-title has-text-centered dark-text'> Get in Touch.</h2>
          <div className='subtitle has-text-centered'>
            <b>Call </b>
            or
            <b> send us </b>
            a message
            <b> at anytime</b>
            .
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='columns'>
            {/* Side content */}
            <div className='column is-5 is-offset-1'>
              <p
                className='mb-20'
              >
                Use one of the following contact methods if you'd like to learn more about our services, have questions
                about what we do, or would simply like to reach out and drop us a note.
              </p>
              {/* Contact info */}
              <div className='content'>
                {/* Card */}
                <div className='flex-card contact-card light-bordered hover-inset padding-15 mb-20'>
                  <div className='icon'>
                    <FontAwesomeIcon icon={ faEnvelope } className='color-blue is-size-4 ml-10' />
                  </div>
                  <div className='contact-info'>
                    <div className='contact-name'>Email</div>
                    <div className='contact-details'>
                      <span className='details-text'><b>info@qubicles.io</b></span>
                    </div>
                  </div>
                </div>
                {/* Card */}
                <div className='flex-card contact-card light-bordered hover-inset padding-15 mb-20'>
                  <div className='icon'>
                    <FontAwesomeIcon icon={ faMobileAlt } className='color-blue is-size-4 ml-10' />
                  </div>
                  <div className='contact-info'>
                    <div className='contact-name'>Phone</div>
                    <div className='contact-details'>
                      <span className='details-text'><b>+1 (833) QUBICLE</b></span>
                    </div>
                  </div>
                </div>
                {/* Card */}
                <div className='flex-card contact-card light-bordered hover-inset padding-15'>
                  <div className='icon'>
                    <FontAwesomeIcon icon={ faMapMarkedAlt } className='color-blue is-size-4 ml-10' />
                  </div>
                  <div className='contact-info'>
                    <div className='contact-name'>Address</div>
                    <div className='contact-details'>
                      <span className='details-text'>
                        <b>
                          400 West Peachtree St. NW
                          <br />
                          Suite #4-1150
                          <br />
                          Atlanta, GA 30308
                        </b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact form */}
            <div className='column is-5 is-offset-1'>
              <form>
                {/* Input */}
                <div className='field pb-10'>
                  <div className='control'>
                    <label>
                      <b>First name *</b>
                    </label>
                    <input className='input is-medium mt-5 mb-5' type='text' />
                  </div>
                </div>
                {/* Input */}
                <div className='field pb-10'>
                  <div className='control'>
                    <label>
                      <b>Last name *</b>
                    </label>
                    <input className='input is-medium mt-5 mb-5' type='text' />
                  </div>
                </div>
                {/* Input */}
                <div className='field pb-10'>
                  <div className='control'>
                    <label>
                      <b>Email *</b>
                    </label>
                    <input className='input is-medium mt-5 mb-5' type='email' />
                  </div>
                </div>
                {/* Input */}
                <div className='field pb-10'>
                  <div className='control'>
                    <label><b>Company</b></label>
                    <input className='input is-medium mt-5 mb-5' type='text' />
                  </div>
                </div>
                {/* textarea */}
                <div className='field pb-10'>
                  <div className='control'>
                    <textarea
                      className='textarea is-default-focus mt-5 mb-5'
                      rows={ 5 }
                      placeholder='Your message ...'
                      defaultValue=''
                    />
                  </div>
                </div>
                {/* Submit */}
                <button
                  type='submit'
                  className='button button-cta btn-align secondary-btn raised no-lh is-fullwidth rounded btn-outlined
                    is-bold mt-10 mb-10'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Map */}
    <div style={ { height: '80vh', width: '100%' } }>
      <GoogleMapReact
        bootstrapURLKeys={ { key: process.env.REACT_APP_GOOGLE_API_KEY } }
        defaultCenter={ {
          lat: 33.748997,
          lng: -84.387985,
        } }
        defaultZoom={ 13 }
      />
    </div>
    <Footer />
  </div>
)

export default ContactUs
