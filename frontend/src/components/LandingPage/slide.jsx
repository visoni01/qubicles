import React from 'react'
import PropTypes from 'prop-types'

const Slide = ({ heading, detail, buttonName }) => (
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
                {heading}
              </h1>
              <div className="caption-divider" />
              <div className="caption-text">
                <span>
                  {detail}
                </span>
                <div className="action">
                  <a
                    href="/signup"
                    className="button button-cta primary-btn rounded"
                  >
                    {buttonName}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Slide.propTypes = {
  heading: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
}

export default Slide
