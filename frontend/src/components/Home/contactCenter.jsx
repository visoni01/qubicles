import React from 'react'
import { Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserGraduate, faCertificate, faChartBar, faLaptop, faTabletAlt, faUserClock,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Clients, Header, Footer, CustomLink } from './index'
import { uiPeopleDash, bars, uiTalent } from '../../assets/images/landingPage'
import '../../containers/Home/style.scss'

const ContactCenter = () => {
  const { userDetails } = useSelector((state) => state.login)
  const isLoggedin = Boolean(userDetails && userDetails.user_id)

  return (
    <div>
      <div className='hero product-hero parallax is-cover is-relative is-default is-bold bg-for-center'>
        <Header />
        {/* Hero image */}
        <div id='main-hero' className='hero-body'>
          <div className='container has-text-centered'>
            <div className='columns is-vcentered pt-80 pb-80'>
              <div className='column is-5 signup-column has-text-left'>
                <h1 className='title main-title text-bold is-2'>
                  Find talent and revenue streams for your center
                </h1>
                <h2 className='subtitle is-5 light-text no-margin-bottom'>
                  Looking for contact center software or seasonal talent for campaigns?
                  Or seeking a way to generate revenue for existing agents during idle time? Come join us.
                </h2>
                <br />
                {/* Signup form */}
                {!isLoggedin && (
                  <CustomLink to='/signup' className='button btn-align button-cta secondary-btn steps-button-color raised rounded'>Try for Free</CustomLink>
                )}
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
            <h2 className='title section-title has-text-centered dark-text'> Great people, solid technology</h2>
            <div className='subtitle has-text-centered is-tablet-padded'>
              Focus your team's energy and company resources on what makes you unique. Leave the people and technology
              up
              to us.
            </div>
          </div>
          <div className='content-wrapper'>
            <div className='columns is-vcentered is-multiline has-text-centered'>
              <div className='column is-4 is-offset-2'>
                {/* Icon block */}
                <div className='startup-icon-box'>
                  <div>
                    <FontAwesomeIcon icon={ faUserGraduate } className='LP-step-1-icons' />
                  </div>
                  <div className='box-title'>Instant access to talent</div>
                  <p className='box-content is-tablet-padded'>
                    Using our global network of contact center professionals gives you access to a massive pool of
                    proven and vetted talent 24x7x365.
                  </p>
                </div>
                {/* Icon block */}
                <div className='startup-icon-box'>
                  <div>
                    <FontAwesomeIcon icon={ faCertificate } className='LP-step-1-icons' />
                  </div>
                  <div className='box-title'>Training and development</div>
                  <p className='box-content is-tablet-padded'>
                    Contact center agents are required to complete specific training before qualifying for work, as well
                    as ongoing development for personal growth.
                  </p>
                </div>
              </div>
              <div className='column is-4'>
                {/* Icon block */}
                <div className='startup-icon-box'>
                  <div>
                    <FontAwesomeIcon icon={ faChartBar } className='LP-step-1-icons' />
                  </div>
                  <div className='box-title'>Reporting, QA and analytics</div>
                  <p className='box-content is-tablet-padded'>
                    Reporting and analytics are key to running a successful contact center. Plus, quality auditing and
                    monitoring comes standard.
                  </p>
                </div>
                {/* Icon block */}
                <div className='startup-icon-box'>
                  <div>
                    <FontAwesomeIcon icon={ faLaptop } className='LP-step-1-icons' />
                  </div>
                  <div className='box-title'>Integrated contact center software</div>
                  <p className='box-content is-tablet-padded'>
                    Powerful contact center software serves as the core to our platform, with support for inbound,
                    outbound and blended campaigns.
                  </p>
                </div>
              </div>
            </div>
            {/* CTA */}
            <div className='has-text-centered pt-40 pb-40'>
              {!isLoggedin && (
              <CustomLink
                to='/signup'
                className='button button-cta primary-btn rounded raised is-title-reveal steps-button-color'
              >
                Get started for Free
              </CustomLink>
              )}
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
            <h2 className='title section-title has-text-centered dark-text'> Built for contact centers</h2>
            <div className='subtitle has-text-centered is-tablet-padded'>
              We've combined our 20+ years of experience in contact center software to deliver something beautiful, yet
              powerful.
            </div>
          </div>
          <div className='content-wrapper'>
            {/* UI block */}
            <div className='columns is-vcentered'>
              {/* Content */}
              <div className='column is-4'>
                <div className='icon-subtitle'>
                  <FontAwesomeIcon icon={ faTabletAlt } className='color-blue is-size-3' />
                </div>
                <h2 className='title section-subtitle dark-text text-bold is-2'>
                  A new standard
                </h2>
                <span className='section-feature-description'>
                  As previous users of contact center software, we have seen them all. That's why we embarked on a
                  journey to create a new standard for contact center software. Something powerful, yet simple for the
                  average user.
                </span>
                <br />
                <br />
                <div className='content section-feature-description'>
                  <ul>
                    <li className='mb-10'>Acquire DIDs from almost anywhere in the world</li>
                    <li className='mb-10'>Build simple or advanced inbound IVRs</li>
                    <li className='mb-10'>Click-to-dial, manual, and predictive options</li>
                    <li className='mb-10'>Configure inbound queues in a matter of minutes</li>
                    <li className='mb-10'>Create scripts for almost all interaction types</li>
                    <li className='mb-10'>Powerful lead management at your fingertips</li>
                    <li className='mb-10'>Support more than calls with live chat aueues</li>
                    <li>And lots of other features to run your business</li>
                  </ul>
                </div>
                <div className='pt-20 pb-20'>
                  {!isLoggedin && (
                  <CustomLink
                    to='/signup'
                    className='button button-cta primary-btn rounded raised steps-button-color'
                  >
                    Try it now
                  </CustomLink>
                  )}
                </div>
              </div>
              {/* Large UI */}
              <div className='column is-9 is-offset-2'>
                <img src={ uiPeopleDash } alt='center dashboard' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slanted feature Section */}
      <div
        id='business-types'
        className='section section-primary is-small is-skewed-sm is-relative huge-pb mt-20 color-blue bg-color-blue'
      >
        <div className='container slanted-container is-reverse-skewed-sm'>
          <div className='columns is-vcentered'>
            {/* Content */}
            <div className='column is-5 '>
              <div className='content padding-20'>
                <h2 className='parallax-title light-text text-bold'>Always on visibility</h2>
                <p className='light-text'>
                  We provide detailed insight and analytics in your operations while you focus on the core competencies
                  of your business. With over 30 standard reports and the ability to request custom reports, never miss
                  important metrics that will help you deliver exceptional customer experiences.
                </p>
                <div className='pb-10 pt-10'>
                  {!isLoggedin && (
                  <CustomLink
                    to='/signup'
                    className='button button-cta light-btn btn-outlined rounded is-bold is-title-reveal'
                  >
                    Take a look
                  </CustomLink>
                  )}
                </div>
              </div>
            </div>
            {/* Featured image */}
            <div className='column is-6 is-offset-1'>
              <img className='featured-svg' src={ bars } alt='bars' />
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
            <h2 className='title section-title has-text-centered dark-text'>Turn idle into profit</h2>
            <div className='subtitle has-text-centered is-tablet-padded'>
              According to Aberdeen, agents spend 25% of their time in idle. Convert this cost into a profit center by
              leasing agent idle time to the network.
            </div>
          </div>
          <div className='content-wrapper'>
            <div className='columns is-vcentered'>
              {/* Image */}
              <div className='column is-7'>
                <div>
                  <figure className='image is-4-by-3'>
                    <img className='first' src={ uiTalent } alt='Idle usage' />
                  </figure>
                </div>
              </div>
              {/* Content */}
              <div className='column is-4 is-offset-1'>
                <div className='icon-subtitle'>
                  <FontAwesomeIcon icon={ faUserClock } className='color-blue is-size-3' />
                </div>
                <h2 className='title section-subtitle dark-text text-bold is-2'>
                  Reduce labor costs
                </h2>
                <span className='section-feature-description'>
                  Excess capacity and low call volume means more agents spending nearly a quarter of their time in idle.
                  Our network allows contact centers to turn this loss into a profit center by leasing existing staff to
                  our network.
                  <br />
                  <br />
                  With resources leased and trained appropriately, every second of idle time is tracked and calls
                  automatically routed in the event of overflow from other participants.
                  <br />
                  <br />
                  It's a perfect means to offset idle time in payroll. Brilliant.
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
            <h2 className='title section-title has-text-centered dark-text'> Pay-per-use Pricing</h2>
            <div className='subtitle has-text-centered is-tablet-padded'>
              Relieve your company from long-term contracts. Our pay-per-use pricing allows the most flexibility by
              paying as you grow.
            </div>
          </div>
          <div className='content-wrapper'>
            <div className='classic-pricing'>
              <div className='pricing-table'>
                {/* Pricing Plan */}
                <div className='pricing-plan is-rounded'>
                  <div className='plan-header'>Free Support</div>
                  <div className='plan-price'>
                    <span className='plan-price-amount'>
                      <span className='plan-price-currency'>$</span>
                      0
                    </span>
                    /month
                  </div>
                  <div className='plan-items'>
                    <div className='plan-item'>$0.02 cents per minute</div>
                    <div className='plan-item'>-</div>
                    <div className='plan-item'>Core features available</div>
                    <div className='plan-item'>Unlimited users</div>
                    <div className='plan-item'>Self-service knowledgebase</div>
                    <div className='plan-item'>Self service support</div>
                    <div className='plan-item'>-</div>
                    <div className='plan-item'>-</div>
                  </div>
                </div>
                {/* Pricing Plan */}
                <div className='pricing-plan is-primary'>
                  <div className='plan-header color-blue'>Silver Support</div>
                  <div className='plan-price'>
                    <span className='plan-price-amount color-blue'>
                      <span className='plan-price-currency color-blue'>$</span>
                      249
                    </span>
                    /month
                  </div>
                  <div className='plan-items'>
                    <div className='plan-item'>$0.02 cents per minute</div>
                    <div className='plan-item'>250 Qubicle (QBE) tokens</div>
                    <div className='plan-item'>All features available</div>
                    <div className='plan-item'>Unlimited users</div>
                    <div className='plan-item'>One-time onboarding &amp; live training</div>
                    <div className='plan-item'>Chat, email &amp; phone support</div>
                    <div className='plan-item'>1 professional service hour</div>
                    <div className='plan-item'>4 hour response time guarantee</div>
                  </div>
                </div>
                {/* Pricing Plan */}
                <div className='pricing-plan is-secondary is-active'>
                  <div className='plan-header'>Gold Support</div>
                  <div className='plan-price'>
                    <span className='plan-price-amount'>
                      <span className='plan-price-currency'>$</span>
                      999
                    </span>
                    /month
                  </div>
                  <div className='plan-items'>
                    <div className='plan-item'>$0.02 cents per minute</div>
                    <div className='plan-item'>1000 Qubicle (QBE) tokens</div>
                    <div className='plan-item'>All features available</div>
                    <div className='plan-item'>Unlimited users</div>
                    <div className='plan-item'>Onboarding &amp; on-demand training</div>
                    <div className='plan-item'>Silver support &amp; in-person option*</div>
                    <div className='plan-item'>2 professional service hours</div>
                    <div className='plan-item'>2 hour response time guarantee</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='has-text-centered pt-80'>
              {!isLoggedin && (
              <CustomLink
                to='/signup'
                className='button button-cta primary-btn rounded raised steps-button-color'
              >
                Try now, with no obligation
              </CustomLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactCenter
