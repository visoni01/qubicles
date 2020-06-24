import React from 'react'
import PropTypes from 'prop-types'
import Slider from './slider'
import { Clients, Steps } from '../../components/LandingPage'
import './style.scss'

const IndexPage = ({ history }) => (
  <div>
    {/* &lt;% layout('layout') -%&gt; */}
    {/* Hero and nav */}
    <div className="hero is-cover is-relative is-fullheight is-default is-bold">
      {/* &lt;% include partials/header %&gt; */}
      {/* Hero Wallop Slider */}
      <Slider />
    </div>
    {/* Clients */}
    <Clients />
    <Steps history={ history } />
    {/* Static Testimonials */}
    <section
      id="card-testimonials"
      className="section parallax is-relative is-medium"
      data-background
      data-color="#000"
      data-color-opacity={ 0.0 }
    >
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">7</div>
          <h2 className="title section-title has-text-centered dark-text">
            {' '}
            Our clients love us
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            Wondering what it's like to work with us? Just hear what some our
            valued customers have to say.
          </div>
        </div>
        <div className="content-wrapper">
          <div className="columns is-vcentered">
            <div className="column" />
            <div className="column is-10">
              {/* Testimonials */}
              <div className="columns is-vcentered">
                <div className="column is-6">
                  {/* Testimonial item */}
                  <div className="flex-card testimonial-card light-bordered light-raised padding-20">
                    <div className="testimonial-title">
                      My experience has been great
                    </div>
                    <div className="testimonial-text">
                      Overall my experience has been great. I have found a
                      solution which is functional, priced well, with great
                      customer service. Exactly what I was looking for.
                    </div>
                    <div className="user-id">
                      <img className src="img/icons/chat-user.png" alt="" />
                      <div className="info">
                        <div className="name">Jennifer Thorne</div>
                        <div className="position">COO</div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial item */}
                  <div className="flex-card testimonial-card light-bordered light-raised padding-20">
                    <div className="testimonial-title">User friendly UI</div>
                    <div className="testimonial-text">
                      Per minute billing and easy to set up. User friendly UI,
                      takes just one sys-admin on our end to manage the
                      software.
                    </div>
                    <div className="user-id">
                      <img className src="img/icons/chat-user.png" alt="" />
                      <div className="info">
                        <div className="name">Abhishek Verma</div>
                        <div className="position">IT Manager</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  {/* Testimonial item */}
                  <div className="flex-card testimonial-card light-bordered light-raised padding-20">
                    <div className="testimonial-title">
                      Easy to use and very affordable
                    </div>
                    <div className="testimonial-text">
                      It is very easy to use like a, b, c.. Very user
                      friendly. It was easy to use and very affordable.
                    </div>
                    <div className="user-id">
                      <img className src="img/icons/chat-user.png" alt="" />
                      <div className="info">
                        <div className="name">Bella Martin</div>
                        <div className="position">Appointment Setter</div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial item */}
                  <div className="flex-card testimonial-card light-bordered light-raised padding-20">
                    <div className="testimonial-title">
                      The support is awesome!
                    </div>
                    <div className="testimonial-text">
                      The support is awesome! Easy to navigate, has self help
                      knowledge base, real time reporting, easy to create
                      stations and users, ...everything!
                    </div>
                    <div className="user-id">
                      <img className src="img/icons/chat-user.png" alt="" />
                      <div className="info">
                        <div className="name">Carlo Angelo Pablo</div>
                        <div className="position">Sr. Project Manager</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Testimonials */}
            </div>
            <div className="column" />
          </div>
        </div>
        <h2 className="title has-text-centered is-title-reveal pt-80">
          <a
            href="/signup"
            className="button button-cta btn-align rounded raised primary-btn"
          >
            Get Started for Free
          </a>
        </h2>
      </div>
    </section>
    {/* /Static Testimonials */}
    {/* &lt;% include partials/footer %&gt; */}
  </div>
)

Steps.propTypes = {
  history: PropTypes.instanceOf({}).isRequired,
}

export default IndexPage
