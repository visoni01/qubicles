import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Slide = ({
  heading, detail, buttonName, bgImage,
}) => (
  <div
    className="Wallop-item Wallop-item--current has-background-image"
    style={ { backgroundImage: `url(${ bgImage })` } }
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
  bgImage: PropTypes.string.isRequired,
}

export default Slide
