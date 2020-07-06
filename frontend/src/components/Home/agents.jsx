import React from 'react'
import { Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus, faDollarSign, faAddressCard, faSeedling, faLaptop, faTabletAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Clients, Header, Footer } from './index'
import { qubiclesAgent, ipads, agentWorkFlow } from '../../assets/images/landingPage'

const Agents = () => (
  <div>
    <div className='hero product-hero parallax is-cover is-relative is-default is-bold bg-for-agents'>
      <Header />
      {/* Hero image */}
      <div id='main-hero' className='hero-body'>
        <div className='container has-text-centered'>
          <div className='columns is-vcentered pt-80 pb-80'>
            <div className='column is-5 signup-column has-text-left'>
              <h1 className='title main-title text-bold is-2'>
                Easily find work, establish your rep and get paid
              </h1>
              <h2 className='subtitle is-5 light-text no-margin-bottom'>
                Become an independent agent and work from the comfort of your own home - in a marketplace powered by the
                same technology behind Bitcoin, with no middlemen involved.
              </h2>
              <br />
              <Link
                to='/signup'
                className='button btn-align secondary-btn raised steps-button-color'
              >
                Join for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Clients */}
    <Clients />
    <Divider variant='middle' />
    {/* /Clients */}
    {/* Services */}
    <div className='section is-medium'>
      <div className='container'>
        {/* Title */}
        <div className='section-title-wrapper'>
          <div className='bg-number'>1</div>
          <h2 className='title section-title has-text-centered dark-text'> It's easy to get started</h2>
          <div className='subtitle has-text-centered is-tablet-padded'>
            All you need is a reliable Internet connection and some training to get started on the path of being your
            own boss.
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='columns is-vcentered is-multiline has-text-centered'>
            <div className='column is-4 is-offset-2'>
              {/* Icon block */}
              <div className='startup-icon-box'>
                <div>
                  <FontAwesomeIcon icon={ faUserPlus } className='LP-step-1-icons' />
                </div>
                <div className='box-title'>Create an account for Free</div>
                <p
                  className='box-content is-tablet-padded'
                >
                  With just a few clicks, you can create a free account to explore job openings and available courses.
                </p>
              </div>
              {/* Icon block */}
              <div className='startup-icon-box'>
                <div>
                  <FontAwesomeIcon icon={ faAddressCard } className='LP-step-1-icons' />
                </div>
                <div className='box-title'>Setup your Professional Profile</div>
                <p
                  className='box-content is-tablet-padded'
                >
                  Update your profile by completing a background check and adding your skills, education, and work
                  history.
                </p>
              </div>
            </div>
            <div className='column is-4'>
              {/* Icon block */}
              <div className='startup-icon-box'>
                <div>
                  <FontAwesomeIcon icon={ faDollarSign } className='LP-step-1-icons mt-10 mb-10' />
                </div>
                <div className='box-title'>Purchase a Subscription</div>
                <p
                  className='box-content is-tablet-padded'
                >
                  Once you've created an account and setup a profile, simply pay for a subscription to begin accepting
                  work.
                </p>
              </div>
              {/* Icon block */}
              <div className='startup-icon-box'>
                <div>
                  <FontAwesomeIcon icon={ faSeedling } className='LP-step-1-icons' />
                </div>
                <div className='box-title'>Learn, Earn and Grow</div>
                <p
                  className='box-content is-tablet-padded'
                >
                  Stand out from the crowd, increase your rank and earn crypto by taking courses and exceeding campaign
                  goals.
                </p>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className='has-text-centered pt-40 pb-40'>
            <Link
              to='/signup'
              className='button button-cta primary-btn rounded raised is-title-reveal steps-button-color'
            >
              Sign up for a Free account
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* UI section */}
    <div className='section section-feature-grey is-medium'>
      <div className='container'>
        {/* Title */}
        <div className='section-title-wrapper'>
          <div className='bg-number'>2</div>
          <h2 className='title section-title has-text-centered dark-text'> Contact center in a box</h2>
          <div className='subtitle has-text-centered is-tablet-padded'>
            A paid monthly subscription grants you full access to our all-in-one contact center software in a box, with
            no limits.
          </div>
        </div>
        <div className='content-wrapper'>
          {/* UI block */}
          <div className='columns is-vcentered'>
            {/* Content */}
            <div className='column is-4'>
              <FontAwesomeIcon icon={ faLaptop } className='color-blue is-size-3' />
              <h2 className='title section-subtitle dark-text text-bold is-2'>
                Easy-to-use agent portal
              </h2>
              <span className='section-feature-description'>
                Our agent portal allows you to handle incoming calls from client-specific queues or easily place
                outgoing calls and emails to customers. Its built-in web phone lets you perform these actions directly
                within a browser with nothing to install on your device.
                <br />
                <br />
                Some of the core features include working with multiple clients on inbound, outbound and blended
                campaigns; blind and warm transfers; 3-way conferencing; call scripting and CRM access with detailed
                interaction histories; and a dedicated phone number.
              </span>
              <div className='pt-20 pb-20'>
                <Link
                  to='/signup'
                  className='button button-cta primary-btn rounded raised steps-button-color'
                >
                  Access portal now
                </Link>
              </div>
            </div>
            {/* Large UI */}
            <div className='column is-9 is-offset-2'>
              <img src={ qubiclesAgent } alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Slanted feature Section */}
    <div
      id='business-types'
      className='section  bg-color-blue section-primary is-small is-skewed-sm is-relative huge-pb mt-20'
    >
      <div className='container slanted-container is-reverse-skewed-sm'>
        <div className='columns is-vcentered'>
          {/* Content */}
          <div className='column is-5 '>
            <div className='content padding-20'>
              <h2 className='parallax-title light-text text-bold'>Our keys to your success</h2>
              <p className='light-text'>
                As you establish a reputation in the network by completing assigned tasks and meeting or exceeding
                campaign goals, smart contracts automatically reward you with our Qubicle (QBE) cryptocurrency token.
              </p>
              <p className='light-text'>
                Backgroud checks are required to satisfy the various security needs of contact centers. Access to
                results are determined by agents and only visible to employers with permission.
              </p>
              <p className='light-text'>
                Finally, to avoid the bureaucracy commonly seen in traditional contact centers, positions are assigned
                based on objective data including training scores and completion rates; key performance
                indicators met; total interactions and positive/negative outcome ratios; plus years of experience.
              </p>
              <div className='pb-10 pt-10'>
                <a href='/signup' className='button button-cta light-btn btn-outlined rounded is-bold is-title-reveal'>
                  See how it works
                </a>
              </div>
            </div>
          </div>
          {/* Featured image */}
          <div className='column is-6 is-offset-1'>
            <img className='featured-svg' src={ agentWorkFlow } alt='' />
          </div>
        </div>
      </div>
    </div>
    {/* Responsive Section */}
    <div className='section is-medium'>
      <div className='container'>
        {/* Title */}
        <div className='section-title-wrapper'>
          <div className='bg-number'>3</div>
          <h2 className='title section-title has-text-centered dark-text'>Detailed analytics</h2>
          <div className='subtitle has-text-centered is-tablet-padded'>
            Reports are available to help you analyze performance, view crypto rewards and increase your overall
            productivity.
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='columns is-vcentered'>
            {/* Image */}
            <div className='column is-7'>
              <div className>
                <figure className='image is-4-by-3'>
                  <img className='first' src={ ipads } alt='' />
                </figure>
              </div>
            </div>
            {/* Content */}
            <div className='column is-4 is-offset-1'>
              <div className='icon-subtitle'>
                <FontAwesomeIcon icon={ faTabletAlt } className='color-blue is-size-3' />
              </div>
              <h2 className='title section-subtitle dark-text text-bold is-2'>
                Real-time monitoring
              </h2>
              <span className='section-feature-description'>
                Our built-in reports help you access metrics to increase productivity, view
                job payments and cryptocurrency rewards, and improve your chances of receiving constant
                job opportunities in the network.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Pricing Section */}
    <div className='section section-light-grey is-medium'>
      <div className='container'>
        <div className='section-title-wrapper'>
          <div className='bg-number'>4</div>
          <h2 className='title section-title has-text-centered dark-text'> Affordable pricing</h2>
          <div className='subtitle has-text-centered is-tablet-padded'>
            We eliminate the middlemen and connect agents directly to contact centers. That's why our prices are simple
            and affordable.
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='classic-pricing'>
            <div className='pricing-table'>
              {/* Pricing Plan */}
              <div className='pricing-plan is-rounded'>
                <div className='plan-header'>Free Spirit</div>
                <div className='plan-price'>
                  <span className='plan-price-amount'>
                    <span className='plan-price-currency'>$</span>
                    0
                  </span>
                  /month
                </div>
                <div className='plan-items'>
                  <div className='plan-item'>Forever free for browsing</div>
                  <div className='plan-item'>View available courses</div>
                  <div className='plan-item'>View job openings</div>
                  <div className='plan-item'>-</div>
                  <div className='plan-item'>-</div>
                  <div className='plan-item'>-</div>
                </div>
                <div className='plan-footer' />
              </div>
              {/* Pricing Plan */}
              <div className='pricing-plan is-primary'>
                <div className='plan-header color-blue'>Go Getter</div>
                <div className='plan-price'>
                  <span className='plan-price-amount color-blue'>
                    <span className='plan-price-currency color-blue'>$</span>
                    19.99
                  </span>
                  /month
                </div>
                <div className='plan-items'>
                  <div className='plan-item'>1 free background check</div>
                  <div className='plan-item'>20 Qubicle (QBE) tokens</div>
                  <div className='plan-item'>Agent portal and reports</div>
                  <div className='plan-item'>Create, host or attend courses</div>
                  <div className='plan-item'>Cryptocurrency rewards</div>
                  <div className='plan-item'>View and apply to jobs</div>
                </div>
                <div className='plan-footer' />
              </div>
            </div>
          </div>
        </div>
        <div className='has-text-centered pt-80 pb-40'>
          <Link
            to='/signup'
            className='button button-cta primary-btn rounded raised steps-button-color'
          >
            Give it a try!
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default Agents
