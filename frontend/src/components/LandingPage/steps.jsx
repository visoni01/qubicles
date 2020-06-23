import React from 'react'

const Steps = () => (
  <>
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
              className="button button-cta primary-btn rounded raised mb-10 mr-20"
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
  </>
)

export default Steps
