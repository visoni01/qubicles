import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLaptop, faVolumeUp, faDollarSign, faHeadset, faGlobe, faUsers, faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { TwitterIcon, LinkedinIcon } from 'react-share'
import { useSelector } from 'react-redux'
import {
  marlonJudWarren,
  teamMarlon,
  teamJudson,
  teamRob,
  teamWarren,
  teamTerpin,
  teamKate,
} from '../../assets/images/landingPage'
import { Header, Footer, ClientReviews } from './index'

const AboutUs = () => {
  const { userDetails } = useSelector((state) => state.login)
  const isLoggedin = Boolean(userDetails && userDetails.user_id)

  return (
    <div>
      {/* Hero (Parallax) and nav */}
      <div className='hero parallax is-cover is-relative is-default is-bold bg-for-about-us'>
        <Header />
        {/* Hero text */}
        <div id='main-hero' className='hero-body pt-80 pb-80'>
          <div className='container has-text-centered'>
            <div className='columns is-vcentered'>
              <div className='column is-6 is-offset-3 has-text-centered'>
                <h1 className='title main-title text-bold is-2'>
                  Learn more about us
                </h1>
                <h2 className='subtitle is-5 light-text pt-10 pb-10'>
                  We are experienced contact center professionals on a mission to enable greater customer experiences
                  across the globe.
                </h2>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Founders section */}
      <div className='section is-medium no-padding-bottom'>
        <div className='container'>
          {/* Title */}
          <div className='section-title-wrapper'>
            <div className='bg-number'>1</div>
            <h2 className='title section-title has-text-centered dark-text'> Our founder speaks</h2>
            <div
              className='subtitle has-text-centered is-tablet-padded'
            >
              We started with a simple concept - increase access to contact center jobs and technology, and reward people
              for their hard work.
            </div>
          </div>
          <div className='content-wrapper'>
            <div className='columns'>
              {/* Image */}
              <div className='column is-7 pt-80 mobile-padding-20'>
                <img className='is-block img-rounded img-border mt-80' alt='' src={ marlonJudWarren } />
              </div>
              {/* Content */}
              <div className='column is-4 is-offset-1 pt-20 huge-pb mobile-padding-20'>
                <div className='icon-subtitle'>
                  <FontAwesomeIcon icon={ faVolumeUp } className='color-blue is-size-3' />
                </div>
                <h2 className='title section-subtitle dark-text text-bold is-2'>
                  A word from Marlon
                </h2>
                <span className='section-feature-description'>
                  For a decade, I spent my career leading technology services for a large contact center and one of the
                  Best Places to Work in Miami, Florida.
                  <br />
                  <br />
                  That experience proved invaluable to what would end up becoming an important part of my journey:
                  creating an award-winning contact center software startup, Fenero,
                  that offered small and medium businesses the same features and functionality as the big boys -
                  all while helping them lower costs and increase their sales, customer satisfaction, and retention rates.
                  <br />
                  <br />
                  Today, as Chief Executive of Qubicles and Founding Member of the
                  <a href='https://telos.net' target='_blank' rel='noopener noreferrer'> Telos </a>
                  blockchain,
                  we're bringing extensive experience in contact center services and blockchain to usher in a new phase
                  for our industry: a trusted network for contact center professionals to find or create jobs, network
                  and learn, and deliver exceptional customer experiences across the globe.
                  <br />
                  <br />
                  Welcome to the future. Welcome to Qubicles!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card section */}
      <div className='section section-feature-grey is-medium'>
        <div className='container'>
          <div className='columns values-cards is-minimal is-vcentered is-gapless is-multiline'>
            {/* Card */}
            <div className='column'>
              <div className='feature-card card-md hover-inset has-text-centered mb-20'>
                <div className='card-icon'>
                  <FontAwesomeIcon icon={ faHeadset } className='color-blue LP-step-1-icons mb-20' />
                </div>
                <div className='card-title'>
                  <h4>Global Network of Talented Professionals</h4>
                </div>
                <div className='card-feature-description'>
                  <span>
                    We are the largest and only decentralized network for global contact center professionals.
                  </span>
                </div>
              </div>
            </div>
            {/* Card */}
            <div className='column'>
              <div className='feature-card card-md hover-inset has-text-centered mb-20'>
                <div className='card-icon'>
                  <FontAwesomeIcon icon={ faDollarSign } className='color-blue LP-step-1-icons mb-20' />
                </div>
                <div className='card-title'>
                  <h4>Cryptocurrency Rewards and Incentives</h4>
                </div>
                <div className='card-feature-description'>
                  <span>
                    Our platform is built on smart contracts that reward agents using our Qubicle (QBE) crypto token.
                  </span>
                </div>
              </div>
            </div>
            {/* Card */}
            <div className='column'>
              <div className='feature-card card-md hover-inset has-text-centered mb-20'>
                <div className='card-icon'>
                  <FontAwesomeIcon icon={ faLaptop } className='color-blue LP-step-1-icons mb-20' />
                </div>
                <div className='card-title'>
                  <h4>All in One Cloud-based Contact Center Software</h4>
                </div>
                <div className='card-feature-description'>
                  <span>
                    All features and functionality needed to operate or work for a contact center comes built into our
                    solution.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='has-text-centered pt-40 pb-40 is-title-reveal'>
            {!isLoggedin && (
            <Link
              className='button is-bold btn-outlined rounded button-color-blue-hover color-blue '
              to='/signup'
            >
              Sign Up Today for FREE
            </Link>
            )}
          </div>
        </div>
      </div>
      {/* Team section */}
      <div className='section is-medium'>
        <div className='container'>
          {/* Title */}
          <div className='section-title-wrapper'>
            <div className='bg-number'>2</div>
            <h2 className='title section-title has-text-centered dark-text'> Meet the Team</h2>
            <div className='subtitle has-text-centered is-tablet-padded'>
              Our team consists of experienced contact center, technology, and business professionals who have worked
              together for over a decade.
            </div>
          </div>
          {/* Title */}
          <div className='content-wrapper'>
            <div className='modern-team startup-team'>
              {/* Team member */}
              <article className='modern-team-item circle-mask zoom-effect'>
                <div className='item-wrapper'>
                  <div className='item-img'>
                    <img className='member-avatar' alt='' src={ teamMarlon } />
                  </div>
                  <div className='overlay-wrapper'>
                    <div>
                      <a
                        target='_blank'
                        href='https://twitter.com/MarlonWilliams'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <TwitterIcon className='social-icons-about-us' />
                      </a>
                      <a target='_blank' href='https://linkedin.com/in/marlonwilliams' rel='noopener noreferrer'>
                        <LinkedinIcon className='social-icons-about-us' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3 className='member-name'>
                    Marlon
                    <strong> Williams</strong>
                  </h3>
                  <span className='member-position color-blue'>Founder, CEO</span>
                </div>
              </article>
              {/* Team member */}
              <article className='modern-team-item circle-mask zoom-slide-effect'>
                <div className='item-wrapper'>
                  <div className='item-img'>
                    <img className='member-avatar' alt='' src={ teamWarren } />
                  </div>
                  <div className='overlay-wrapper'>
                    <div>
                      <a
                        target='_blank'
                        href='https://twitter.com/WarrenWhitlock'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <TwitterIcon className='social-icons-about-us' />
                      </a>
                      <a
                        target='_blank'
                        href='https://www.linkedin.com/in/books'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <LinkedinIcon className='social-icons-about-us' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3 className='member-name'>
                    Warren
                    <strong> Whitlock</strong>
                  </h3>
                  <span className='member-position color-blue'>Strategic Advisor</span>
                </div>
              </article>
              {/* Team member */}
              <article className='modern-team-item circle-mask zoom-effect'>
                <div className='item-wrapper'>
                  <div className='item-img'>
                    <img className='member-avatar' alt='' src={ teamJudson } />
                  </div>
                  <div className='overlay-wrapper'>
                    <div>
                      <a
                        target='_blank'
                        href='https://twitter.com/JudNoel01'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <TwitterIcon className='social-icons-about-us' />
                      </a>
                      <a
                        target='_blank'
                        href='https://www.linkedin.com/in/judson-noel-11a53667'
                        rel='noopener noreferrer'
                      >
                        <LinkedinIcon className='social-icons-about-us' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3 className='member-name'>
                    Judson
                    <strong> Noel</strong>
                  </h3>
                  <span className='member-position color-blue'>Customer Success</span>
                </div>
              </article>
              {/* Team member */}
              <article className='modern-team-item circle-mask rotate-zoom-effect'>
                <div className='item-wrapper'>
                  <div className='item-img'>
                    <img className='member-avatar' alt='' src={ teamTerpin } />
                  </div>
                  <div className='overlay-wrapper'>
                    <div>
                      <a
                        target='_blank'
                        href='https://twitter.com/michaelterpin'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <TwitterIcon className='social-icons-about-us' />
                      </a>
                      <a
                        target='_blank'
                        href='https://www.linkedin.com/in/michaelterpin'
                        rel='noopener noreferrer'
                      >
                        <LinkedinIcon className='social-icons-about-us' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3 className='member-name'>
                    Michael
                    <strong> Terpin</strong>
                  </h3>
                  <span className='member-position color-blue'>Blockchain Advisor</span>
                </div>
              </article>
              {/* Team member */}
              <article className='modern-team-item circle-mask zoom-effect'>
                <div className='item-wrapper'>
                  <div className='item-img'>
                    <img className='member-avatar' alt='' src={ teamKate } />
                  </div>
                  <div className='overlay-wrapper'>
                    <div>
                      <a
                        target='_blank'
                        href='https://twitter.com/katecroberts'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <TwitterIcon className='social-icons-about-us' />
                      </a>
                      <a
                        target='_blank'
                        href='https://www.linkedin.com/in/kateconlonroberts'
                        rel='noopener noreferrer'
                      >
                        <LinkedinIcon className='social-icons-about-us' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3 className='member-name'>
                    Kate
                    <strong> Roberts </strong>
                  </h3>
                  <span className='member-position color-blue'>Growth Marketing</span>
                </div>
              </article>
              {/* Team member */}
              <article className='modern-team-item circle-mask zoom-effect'>
                <div className='item-wrapper'>
                  <div className='item-img'>
                    <img className='member-avatar' alt='' src={ teamRob } />
                  </div>
                  <div className='overlay-wrapper'>
                    <div>
                      <a
                        target='_blank'
                        href='https://twitter.com/omniinteraction'
                        className='mr-10'
                        rel='noopener noreferrer'
                      >
                        <TwitterIcon className='social-icons-about-us' />
                      </a>
                      <a
                        target='_blank'
                        href='https://www.linkedin.com/in/rob-duncan-7059291'
                        rel='noopener noreferrer'
                      >
                        <LinkedinIcon className='social-icons-about-us' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3 className='member-name'>
                    Rob
                    <strong> Duncan</strong>
                  </h3>
                  <span className='member-position color-blue'>Industry Advisor</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      {/* Counters section */}
      <div className='section is-medium parallax is-cover is-relative bg-for-about-us'>
        <div className='container'>
          {/* Title */}
          <div className='section-title-wrapper'>
            <div className='bg-number'>3</div>
            <h2 className='title section-title has-text-centered light-text'> Our reach is global</h2>
            <div className='subtitle has-text-centered light-text is-tablet-padded'>
              We live in a world with no borders. That's why we work with centers
              and customer service, sales and support reps all over the world.
            </div>
          </div>
          {/* Title */}
          {/* Counters */}
          <div className='content-wrapper'>
            <div className='columns is-vcentered has-text-centered'>
              <div className='column is-4'>
                <div className='parallax-counter is-primary'>
                  <div className='counter-icon'>
                    <FontAwesomeIcon icon={ faGlobe } className='color-blue is-size-2' />
                  </div>
                  <div className='counter counter-number text-bold'>15</div>
                  <div className='counter-text'>Countries</div>
                </div>
              </div>
              <div className='column is-4'>
                <div className='parallax-counter is-primary'>
                  <div className='counter-icon'>
                    <FontAwesomeIcon icon={ faUsers } className='color-blue is-size-2' />
                  </div>
                  <div className='counter counter-number text-bold'>8,407</div>
                  <div className='counter-text'>Users and counting</div>
                </div>
              </div>
              <div className='column is-4'>
                <div className='parallax-counter is-primary'>
                  <div className='counter-icon'>
                    <FontAwesomeIcon icon={ faPhoneAlt } className='color-blue is-size-2' />
                  </div>
                  <div className='counter counter-number text-bold'>700,000,000</div>
                  <div className='counter-text'>Customer interactions+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vertical Testimonials section */}
      <div className='section is-medium'>
        <div className='container'>
          {/* Title */}
          <div className='section-title-wrapper'>
            <div className='bg-number'>4</div>
            <h2 className='title section-title has-text-centered dark-text'> We love our customers</h2>
            <div className='subtitle has-text-centered is-tablet-padded'>
              Take a look at what some of our customers have to say about us. We strive to go above and beyond for every
              single one of them.
            </div>
          </div>
          {/* Title */}
          <div className='columns'>
            <div className='column is-8 is-offset-2 is-12-mobile'>
              {/* Vertical testimonials */}
              <div className='vertical-testimonials'>
                <ClientReviews />
              </div>
            </div>
          </div>
        </div>
        <div className='has-text-centered pt-80'>
          {!isLoggedin && (
          <Link
            to='/signup'
            className='button button-cta primary-btn rounded raised steps-button-color'
          >
            Join the movement today!
          </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
