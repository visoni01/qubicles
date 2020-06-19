import React from 'react'

const IndexPage = () => (
  <div>
    &lt;% layout('layout') -%&gt;
    {/* Hero and nav */}
    <div className="hero is-cover is-relative is-fullheight is-default is-bold">
      &lt;% include partials/header %&gt;
      {/* Hero Wallop Slider */}
      <div className="Wallop Wallop--fade">
        <div className="Wallop-list">
          {/* Slide */}
          <div
            className="Wallop-item Wallop-item--current has-background-image"
            data-background="img/bg/global-network.jpg"
          >
            <div className="Wallop-overlay" />
            <div className="Wallop-caption-wrapper">
              <div className="container">
                <div className="columns is-gapless is-vcentered">
                  <div className="column is-5">
                    <div className="caption-inner">
                      <h1>
                        World's first contact center powered by blockchain
                      </h1>
                      <div className="caption-divider" />
                      <div className="caption-text">
                        <span>
                          Where talented customer service, sales and support
                          agents connect directly with contact centers for
                          work. No middlemen involved.
                        </span>
                        <div className="action">
                          <a
                            href="/signup"
                            className="button button-cta primary-btn rounded"
                          >
                            Sign Up for Free
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide */}
          <div
            className="Wallop-item has-background-image"
            data-background="img/bg/work-at-home-lady.jpg"
          >
            <div className="Wallop-overlay" />
            <div className="Wallop-caption-wrapper">
              <div className="container">
                <div className="columns is-gapless is-vcentered">
                  <div className="column is-5">
                    <div className="caption-inner">
                      <h1>
                        Run your contact center from anywhere in the world
                      </h1>
                      <div className="caption-divider" />
                      <div className="caption-text">
                        <span>
                          Welcome to the future - where you are the boss with
                          a more flexible schedule and working from the
                          comfort of your own home.
                        </span>
                        <div className="action">
                          <a
                            href="#services"
                            className="button button-cta primary-btn rounded"
                          >
                            Sign Up for FREE
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide */}
          <div
            className="Wallop-item has-background-image"
            data-background="img/bg/qbe-rewards.jpg"
          >
            <div className="Wallop-overlay" />
            <div className="Wallop-caption-wrapper">
              <div className="container">
                <div className="columns is-gapless is-vcentered">
                  <div className="column is-5">
                    <div className="caption-inner">
                      <h1>
                        Earn Qubicle cryptocurrency rewards for a job well
                        done
                      </h1>
                      <div className="caption-divider" />
                      <div className="caption-text">
                        <span>
                          We utilize blockchain technology to create a unique
                          reward-based economy, where users earn
                          cryptocurrency for meeting program KPIs.
                        </span>
                        <div className="action">
                          <a
                            href="/pricing"
                            className="button button-cta primary-btn rounded"
                          >
                            Sign Up for FREE
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide */}
          <div
            className="Wallop-item has-background-image"
            data-background="img/bg/all-in-one.jpg"
          >
            <div className="Wallop-overlay" />
            <div className="Wallop-caption-wrapper">
              <div className="container">
                <div className="columns is-gapless is-vcentered">
                  <div className="column is-5">
                    <div className="caption-inner">
                      <h1>
                        All-in-one cloud contact center software at your
                        fingertips
                      </h1>
                      <div className="caption-divider" />
                      <div className="caption-text">
                        <span>
                          Designed to meet the needs of small, mid-sized, and
                          enterprise contact centers alike, we scale as your
                          business grows.
                        </span>
                        <div className="action">
                          <a
                            href="#services"
                            className="button button-cta primary-btn rounded"
                          >
                            Sign Up for FREE
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination dots */}
        <div className="Wallop-pagination">
          <button className="Wallop-dot Wallop-dot--current">
            contact center powered by blockchain
          </button>
          <button className="Wallop-dot">earn qbe tokens</button>
          <button className="Wallop-dot">work at home contact center</button>
          <button className="Wallop-dot">
            all-in-one contact center software
          </button>
        </div>
      </div>
    </div>
    {/* Clients */}
    <div className="hero-foot is-pulled">
      <div className="container">
        <div className="tabs partner-tabs is-centered">
          <ul>
            <li>
              <a>
                <img
                  className="partner-logo"
                  src="img/logos/custom/cea2019.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  className="partner-logo"
                  src="img/logos/custom//miamiherald.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  className="partner-logo"
                  src="img/logos/custom/crm2017.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  className="partner-logo"
                  src="img/logos/custom/poty2016.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  className="partner-logo"
                  src="img/logos/custom/cio2016.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.getapp.com/it-communications-software/a/fenero/reviews/"
                target="_blank"
              >
                <img
                  className="partner-logo"
                  alt="Read Fenero Reviews on GetApp.com"
                  src="https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application"
                  srcSet="https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application, https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application@2x 2x, https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application@3x 3x"
                  title="Read Qubicles Reviews on GetApp.com"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.capterra.com/reviews/161183/Fenero?utm_source=vendor&utm_medium=badge&utm_campaign=capterra_reviews_badge"
                target="_blank"
              >
                <img
                  className="partner-logo"
                  src="https://assets.capterra.com/badge/54c78f6565f4030db187353d12a99c33.png?v=2112709&p=161183"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Services */}
    <div id="services" className="section is-medium">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">1</div>
          <h2 className="title section-title has-text-centered dark-text">
            {' '}
            The contact center, redefined
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            Qubicles is the world's first blockchain-based marketplace focused
            on matching qualified agents with contact centers on-demand.
          </div>
        </div>
        <div className="content-wrapper">
          <div className="columns is-vcentered is-multiline has-text-centered">
            {/* Icon block */}
            <div className="column is-3">
              <div className="startup-icon-box">
                <div className="is-icon-reveal">
                  <i className="im im-icon-Bar-Chart2" />
                </div>
                <div className="box-title">On-Demand Staffing</div>
                <p className="box-content is-tablet-padded">
                  A network that matches experienced agents with new or
                  established contact centers looking for talent.
                </p>
              </div>
            </div>
            {/* Icon block */}
            <div className="column is-3">
              <div className="startup-icon-box">
                <div className="is-icon-reveal">
                  <i className="im im-icon-Coins-3" />
                </div>
                <div className="box-title">Cryptocurrency Rewards</div>
                <p className="box-content is-tablet-padded">
                  Agents earn passive income in the form of Qubicle (QBE)
                  crypto tokens by exceeding performance goals.
                </p>
              </div>
            </div>
            {/* Icon block */}
            <div className="column is-3">
              <div className="startup-icon-box">
                <div className="is-icon-reveal">
                  <i className="im im-icon-Students" />
                </div>
                <div className="box-title">Contact Center Univeristy</div>
                <p className="box-content is-tablet-padded">
                  Our built-in university offers candidates support, service
                  and sales training to help them qualify for open positions.
                </p>
              </div>
            </div>
            {/* Icon block */}
            <div className="column is-3">
              <div className="startup-icon-box">
                <div className="is-icon-reveal">
                  <i className="im im-icon-Sidebar-Window" />
                </div>
                <div className="box-title">Contact Center Software</div>
                <p className="box-content is-tablet-padded">
                  Includes an easy to use cloud contact center software for
                  inbound, outbound and blended operations of all sizes.
                </p>
              </div>
            </div>
          </div>
          <div className="has-text-centered is-title-reveal pt-20 pb-20">
            <a
              href="/agents"
              className="button button-cta primary-btn rounded raised mb-10"
            >
              For Independent Agents
            </a>
            <a
              href="/contactcenters"
              className="button button-cta primary-btn rounded raised"
            >
              For Contact Centers
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* /Services */}
    {/* Video section */}
    <section className="section section-light-grey is-medium">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">2</div>
          <h2 className="title section-title has-text-centered dark-text">
            {' '}
            Customers are always right
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            Learn how we are re-defining the contact center and pioneering a
            future of excellent customer experiences for everyone.
          </div>
        </div>
        <div className="content-wrapper">
          <div className="columns">
            {/* Youtube Video player */}
            <div
              id="video"
              className="column is-6 is-offset-3 animated preFadeInUp fadeInUp is-hidden pb-20"
            >
              <div className="side-block">
                <div className="background-wrapper">
                  <div
                    id="video-embed"
                    className="video-wrapper"
                    data-url="https://www.youtube.com/watch?v=GioazWxrSnM"
                  >
                    <div className="video-overlay" />
                    <div className="playbutton">
                      <div className="icon-play">
                        <i className="im im-icon-Play-Music" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Youtube Video player */}
          </div>
        </div>
      </div>
    </section>
    {/* /Video section */}
    {/* Feature highlight */}
    <div className="section section-feature-grey is-medium">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">3</div>
          <h2 className="title section-title has-text-centered dark-text">
            A world without boundaries
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            Empowering businesses to provide better service by connecting them
            with millions of talented agents worldwide.
          </div>
        </div>
        <div className="content-wrapper">
          {/* Row */}
          <div className="columns is-vcentered">
            {/* Featured image */}
            <div className="column is-7">
              <div>
                <figure className="image is-4-by-3">
                  <img
                    className="first"
                    src="img/illustrations/UI/global-network.png"
                    alt=""
                  />
                </figure>
              </div>
            </div>
            {/* Content */}
            <div className="column is-4 is-offset-1">
              <div className="icon-subtitle">
                <i className="im im-icon-Geo-Love" />
              </div>
              <h2 className="title section-subtitle dark-text text-bold is-2">
                ...and without middlemen
              </h2>
              <span className="section-feature-description">
                Whether you're looking for work in a contact center, seeking
                cloud-based contact center software or you're in the market
                for talent, we've got you covered. Powered by blockchain smart
                contracts with no middlemen involved, our patent-pending
                technology ensures the right agent is matched to the right
                position at the right time.
              </span>
              <div className="pt-10 pb-10" style={ { display: 'none' } }>
                <a
                  href="#"
                  className="button btn-align btn-more is-link color-primary is-title-reveal"
                >
                  Learn more
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* /Row */}
        </div>
      </div>
    </div>
    {/* /Feature highlight */}
    {/* Team section */}
    <section className="section is-medium no-padding-bottom">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">4</div>
          <h2 className="title section-title has-text-centered dark-text">
            {' '}
            A wealth of knowledge
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            Our team consists of contact center and technology professionals
            with decades of experience in the industry.
          </div>
        </div>
        <div className="content-wrapper">
          <div className="columns">
            {/* Image */}
            <div className="column is-7">
              <img
                className="is-block img-border img-rounded"
                alt=""
                src="img/bg/qbe-team.jpg"
              />
            </div>
            {/* Content */}
            <div className="column is-4 is-offset-1 pt-80 pb-80 mobile-padding-20">
              <div className="icon-subtitle">
                <i className="im im-icon-Mens" />
              </div>
              <h2 className="title section-subtitle dark-text text-bold s-2">
                From the frontlines
              </h2>
              <span className="section-feature-description">
                Members of our team have been on the battlefield as agents,
                supervisors and executives. We know firsthand how irate
                customers respond, what makes employees happy, the key
                performance metrics for contact centers, and how the right
                technology can make a difference.
              </span>
              <div className="pt-10 pb-10">
                <a
                  href="/about"
                  className="btn-more is-link color-primary is-title-reveal"
                >
                  Learn more about us
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* /Team section */}
    {/* Features section */}
    <section className="section section-feature-grey is-medium">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">5</div>
          <h2 className="title section-title has-text-centered dark-text">
            {' '}
            Greater customer experiences
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            We offer a unique set of features that are key to delivering the
            best customer experiences in the world.
          </div>
        </div>
        <div className="content-wrapper">
          {/* Feature */}
          <div className="columns is-vcentered">
            {/* Featured image */}
            <div className="column is-7 has-text-centered">
              <img
                className="featured-svg"
                src="img/illustrations/UI/usersnapshot.png"
                style={ { opacity: '.5' } }
                alt=""
              />
            </div>
            {/* Content */}
            <div className="column is-5">
              <h3 className="detailed-feature-subtitle">Access to Talent</h3>
              <h2 className="title feature-title bordered dark-text">
                On-demand agents from countries across the globe
              </h2>
              <div className="title-divider" />
              <span className="section-feature-description">
                Our global reach allows
                {' '}
                <b>businesses</b>
                {' '}
                seeking customer
                service, sales and support talent to find resources to meet
                their specific needs, while
                {' '}
                <b>millions of workers</b>
                {' '}
                can
                access training, development, and staffing services without
                traditional intermediaries.
              </span>
              <br />
              <br />
              <span className="section-feature-description">
                It's a new world, powered by the trust and transparency of
                smart contracts and blockchain technology.
              </span>
              <div className="pt-10 pb-10">
                <a href="/agents" className="btn-more is-link color-primary">
                  Learn more
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* /Feature */}
          {/* Feature */}
          <div className="columns is-vcentered">
            {/* Featured image */}
            <div
              className="column is-7 has-text-centered is-hidden-desktop is-hidden-tablet"
              style={ { opacity: '.5' } }
            >
              <img
                className="featured-svg"
                src="img/illustrations/mockups/startup/project-ui.png"
                alt=""
              />
            </div>
            {/* Content */}
            <div className="column is-5 has-text-right">
              <h3 className="detailed-feature-subtitle">
                Training and development
              </h3>
              <h2 className="title feature-title bordered dark-text">
                Applying technology objectively for career advancements
              </h2>
              <div className="title-divider is-right" />
              <span className="section-feature-description">
                Training and professional development is critical to
                individual growth in the contact center. That's why our online
                university allow workers to obtain training from experienced
                trainers anywhere in the world.
              </span>
              <br />
              <br />
              <span className="section-feature-description">
                Career advancement is automatically governed by the network
                based on merit, where ranking is assigned using objective past
                performance data. Say goodbye to subjective promotions and
                hello to a new future.
              </span>
              <div className="pt-10 pb-10">
                <a href="/agents" className="btn-more is-link color-primary">
                  Learn more
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
            <div className="column is-7 has-text-centered is-hidden-mobile">
              {/* Featured image (this is a mobile only image to make feature alternate properly on small screens) */}
              <img
                className="featured-svg"
                src="img/illustrations/mockups/startup/project-ui.png"
                style={ { opacity: '.5' } }
                alt=""
              />
            </div>
          </div>
          {/* /Feature */}
          {/* Feature */}
          <div className="columns is-vcentered">
            {/* Featured image */}
            <div className="column is-7 has-text-centered">
              <img
                className="featured-svg"
                src="img/illustrations/mockups/startup/ipads.png"
                style={ { opacity: '.5' } }
                alt=""
              />
            </div>
            {/* Content */}
            <div className="column is-5">
              <h3 className="detailed-feature-subtitle">
                Inbound, Outbound, QA, and More
              </h3>
              <h2 className="title feature-title bordered dark-text">
                Forget about contact center software
              </h2>
              <div className="title-divider" />
              <span className="section-feature-description">
                With so many contact center software vendors in the market
                today, where does one begin? It quickly gets confusing, even
                for the experts.
              </span>
              <br />
              <br />
              <span className="section-feature-description">
                Our built-in contact center software solution has been proven
                to work in operations of all sizes. Based on open source
                technologies, agents and centers can handle interactions from
                anywhere. With Qubicles, you can forget about the hassle of
                choosing contact center software (or replace ours with your
                own).
              </span>
              <div className="pt-10 pb-10">
                <a
                  href="/contactcenters"
                  className="btn-more is-link color-primary"
                >
                  Learn more
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* /Feature */}
          <h2 className="title has-text-centered is-title-reveal">
            <a
              href="/signup"
              className="button button-cta btn-align rounded raised primary-btn"
            >
              Get Started for Free
            </a>
          </h2>
        </div>
      </div>
    </section>
    {/* /Features section */}
    {/* Support cards section */}
    <section className="section section-light-grey is-medium">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <div className="bg-number">6</div>
          <h2 className="title section-title has-text-centered dark-text">
            {' '}
            We are here to help
          </h2>
          <div className="subtitle has-text-centered is-tablet-padded">
            We understand the critical nature of the contact center business.
            That's why our support staff is always here to help.
          </div>
        </div>
        <div className="content-wrapper">
          <div className="columns">
            {/* Card */}
            <div className="column is-one-third">
              <div className="feature-card card-md is-startup light-bordered hover-inset has-text-centered is-card-reveal">
                {/* Card icon */}
                <div className="card-icon">
                  <img src="img/icons/lifesaver.svg" alt="" />
                </div>
                {/* Content */}
                <div className="card-title">
                  <h4>Support Portal</h4>
                </div>
                <div className="card-feature-description">
                  <span className>
                    Our support portal is a combination of ticketing system,
                    knowledgebase, and self-service tools.
                  </span>
                </div>
                <a
                  href="https://support.fenero.com"
                  className="button btn-align btn-more is-link color-primary mt-10 mb-10"
                  style={ { display: 'none' } }
                >
                  Visit
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
            {/* Card */}
            <div className="column">
              <div className="feature-card card-md is-startup light-bordered hover-inset has-text-centered is-card-reveal">
                {/* Card icon */}
                <div className="card-icon">
                  <img src="img/icons/wallet.svg" alt="" />
                </div>
                {/* Content */}
                <div className="card-title">
                  <h4>Ongoing Updates</h4>
                </div>
                <div className="card-feature-description">
                  <span className>
                    We provide frequent updates to our software and systems to
                    deliver reliable services for our global audience.
                  </span>
                </div>
                <a
                  href="#"
                  className="button btn-align btn-more is-link color-primary mt-10 mb-10"
                  style={ { display: 'none' } }
                >
                  Learn more
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
            {/* Card */}
            <div className="column">
              <div className="feature-card card-md is-startup light-bordered hover-inset has-text-centered is-card-reveal">
                {/* Card icon */}
                <div className="card-icon">
                  <img src="img/icons/building.svg" alt="" />
                </div>
                {/* Content */}
                <div className="card-title">
                  <h4>Unlimited Use</h4>
                </div>
                <div className="card-feature-description">
                  <span className>
                    With no limitations on use, agents and contact centers can
                    scale services up or down to meet their needs.
                  </span>
                </div>
                <a
                  href="#"
                  className="button btn-align btn-more is-link color-primary mt-10 mb-10"
                  style={ { display: 'none' } }
                >
                  Learn more
                  {' '}
                  <i className="sl sl-icon-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* /Support cards section */}
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
    &lt;% include partials/footer %&gt;
  </div>
)

export default IndexPage
