import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartBar, faCoins, faUniversity, faTabletAlt,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const Steps = ({ history }) => (
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
                  <FontAwesomeIcon icon={ faChartBar } className="LP-step-1-icons" />
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
                  <FontAwesomeIcon icon={ faCoins } className="LP-step-1-icons" />
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
                  <FontAwesomeIcon icon={ faUniversity } className="LP-step-1-icons mt-10 mb-10" />
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
                  <FontAwesomeIcon icon={ faTabletAlt } className="LP-step-1-icons mt-10 mb-10" />
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
            <button
              type="button"
              className="button button-cta primary-btn rounded raised mb-10 mr-20 steps-button-color"
              onClick={ () => history.push('/agents') }
            >
              For Independent Agents
            </button>
            <button
              type="button"
              className="button button-cta primary-btn rounded raised steps-button-color"
              onClick={ () => history.push('/contactcenters') }
            >
              For Contact Centers
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)

Steps.propTypes = {
  history: PropTypes.instanceOf({
    push: PropTypes.func,
  }).isRequired,
}

export default Steps
